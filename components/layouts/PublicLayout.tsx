import React from "react";
import Navbar from "../Navbar";
import { ThemeProvider } from "../ThemeProvider";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen">
        <Navbar />
        <div className="">{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default PublicLayout;
