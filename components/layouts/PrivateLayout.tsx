import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { ThemeProvider } from "../ThemeProvider";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div>
        <>
          <Header />
          <div>
            <Sidebar />
            <div className="format w-full p-4 md:ml-64">{children}</div>
          </div>
        </>
      </div>
    </ThemeProvider>
  );
};

export default PrivateLayout;
