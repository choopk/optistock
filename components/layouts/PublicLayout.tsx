import React from "react";
import { Chat } from "@/components/chat";
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen">
        <div className=""><main><div className="hidden flex-col md:flex">        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>{children}</div></main></div>
      </div>
    </>
  );
};

export default PublicLayout;
