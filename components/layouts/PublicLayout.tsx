import React from "react";
import { MainNav } from "@/components/main-nav";
import { ThemeProvider } from "../theme-provider";
import Link from "next/link";
import { Bell } from "lucide-react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen">
        <div className="">
          <main>
            <div className="hidden flex-col md:flex">
              {" "}
              <div className="border-b">
                <div className="flex h-16 items-center px-4">
                  <MainNav className="mx-6" />
                  <div className="ml-auto flex items-center space-x-4">
                    <Link
                      href="/notifications"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Bell />
                    </Link>
                  </div>
                </div>
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PublicLayout;
