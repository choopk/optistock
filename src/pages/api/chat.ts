import { OpenAiChat } from "@/utils/open-ai-chat";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  if (!body.messages) {
    throw new Error("Missing Message for Chat from Request!");
  }

  const openAiChat = new OpenAiChat();
  const stream = await openAiChat.streamPrompt(body.messages);
  return new Response(stream);
};
export default handler;
