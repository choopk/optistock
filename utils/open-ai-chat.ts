import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  BaseChatMessage,
  HumanChatMessage,
  AIChatMessage,
} from "langchain/schema";
import { PREFIX_PROMPT_INVENTORY, PREFIX_PROMPT } from "./constants";
import { Item } from "src/pages/api/items";

export type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export class OpenAiChat {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly temperature: number;
  private readonly maxTokens: number;

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("No API Key Found!");
    }
    this.apiKey = process.env.API_KEY;
    this.model = process.env.MODEL ?? "chatgpt-3.5-turbo";
    this.temperature = parseInt(process.env.TEMPERATURE ?? "0.7");
    this.maxTokens = parseInt(process.env.MAX_TOKEN ?? "256");
  }

  async streamPrompt(messages: ChatGPTMessage[], inventoryStatus?: Item[]) {
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const chat = new ChatOpenAI({
      openAIApiKey: this.apiKey,
      modelName: this.model,
      temperature: this.temperature,
      maxTokens: this.maxTokens,
      streaming: true,
      maxConcurrency: 1,
      maxRetries: 6,
      callbacks: [
        {
          async handleLLMNewToken(token) {
            await writer.ready;
            await writer.write(encoder.encode(token));
          },
        },
        {
          async handleLLMEnd() {
            await writer.ready;
            await writer.close();
          },
        },
      ],
    });

    let inventory = "\n";
    let prefixPrompt: string | undefined;
    if (inventoryStatus) {
      for (const item of inventoryStatus) {
        inventory += `${item.sku}, ${item.name}, [${
          item.categories
            ? `${item.categories.map((value) => value.name).join(",")}`
            : "No Category"
        }], ${item.quantity} item, ${item.threshold ?? "No Threshold"}\n`;
      }

      prefixPrompt = PREFIX_PROMPT_INVENTORY.replace(
        "{INVENTORY_STATUS}",
        inventory
      );
    } else {
      prefixPrompt = PREFIX_PROMPT;
    }

    const messageBlocks: BaseChatMessage[] = [
      new HumanChatMessage(prefixPrompt),
    ];

    for (const message of messages) {
      if (message.role === "assistant") {
        messageBlocks.push(new AIChatMessage(message.content));
      } else {
        messageBlocks.push(new HumanChatMessage(message.content));
      }
    }

    void chat.call(messageBlocks);

    return stream.readable;
  }
}
