import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from "./chat-line";
import { useCookies } from "react-cookie";
import { ScrollArea } from "./ui/scroll-area";

const COOKIE_NAME = "optibot";

export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content: "Hi! I am a friendly AI assistant. Ask me anything!",
  },
];

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="clear-both flex">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-l-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:bg-gray-300 dark:text-black dark:placeholder:text-zinc-500 sm:text-sm"
      placeholder="Ask anything"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="flex-none rounded-l-none"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Say
    </Button>
  </div>
);

export function Chat() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { role: "user", content: message } as ChatGPTMessage,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10); // remember last 10 messages

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { role: "assistant", content: lastMessage } as ChatGPTMessage,
      ]);

      setLoading(false);
    }
  };

  return (
    <div className="border-coolGray-300 ml-7 mr-7 flex h-[800px] max-h-[80vh] flex-col overflow-y-auto rounded-2xl border bg-gray-100 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:bg-gray-900 dark:text-gray-300 lg:border lg:p-6">
      <ScrollArea className="flex-grow p-4">
        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} />
        ))}
        {loading && <LoadingChatLine />}
        {messages.length < 2 && (
          <span className="clear-both mx-auto flex flex-grow text-gray-600 dark:text-gray-400">
            Type a message to start the conversation
          </span>
        )}
        <div className="clear-both" ref={endOfMessagesRef} />
      </ScrollArea>
      <div className="rounded-2xl p-4">
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          transcript
        />
      </div>
    </div>
  );
}
