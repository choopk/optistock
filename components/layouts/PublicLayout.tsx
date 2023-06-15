import React from "react";
import { ThemeProvider } from "../ThemeProvider";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen">
        <div className="">{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default PublicLayout;
