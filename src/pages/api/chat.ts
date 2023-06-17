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

  let stream: ReadableStream;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/get-items`, {
    method: "POST",
    body: JSON.stringify({ query: "" }),
  });
  const inventoryStatus = await res.json();
  stream = await openAiChat.streamPrompt(body.messages, inventoryStatus);

  return new Response(stream);
};
export default handler;
