import React from "react";
import { Chat } from "@/components/chat";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="">{children}</div>
        <Chat />
      </div>
    </>
  );
};

export default PublicLayout;
