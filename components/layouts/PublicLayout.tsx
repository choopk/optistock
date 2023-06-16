import React from "react";
import { ThemeProvider } from "../them-provider";
import { Chat } from "@/components/chat";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="">{children}</div>
      </div>
      <Chat />
    </>
  );
};

export default PublicLayout;
