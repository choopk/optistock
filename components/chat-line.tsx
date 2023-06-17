import clsx from "clsx";
import Balancer from "react-wrap-balancer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BalancerWrapper = (props: any) => <Balancer {...props} />;

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            Optibot
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }
  const formattedMessage = convertNewLines(content);

  return (
    <div
      className={
        role != "assistant"
          ? "float-right clear-both ml-[10%]"
          : "float-left clear-both mr-[10%]"
      }
    >
      <BalancerWrapper>
        <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 dark:bg-gray-800 dark:ring-gray-800 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl mb-3 flex items-center space-x-2 text-gray-900">
                {role == "assistant" && (
                  <Avatar className="mr-3 h-9 w-9">
                    <AvatarImage src="/avatars/optibot.png" alt="Avatar" />
                    <AvatarFallback>OP</AvatarFallback>
                  </Avatar>
                )}
                <span className="text-lg font-bold dark:text-white">
                  {role == "assistant" ? "Optibot" : "You"}
                </span>
              </p>
              <p
                className={clsx(
                  "text font-semibold ",
                  role == "assistant" ? "font-mono" : ""
                )}
              >
                {formattedMessage}
              </p>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}
