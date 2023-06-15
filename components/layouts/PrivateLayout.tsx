import React from "react";
import { ThemeProvider } from "../ThemeProvider";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div>
        <>
          <div>
            <div className="format w-full p-4 md:ml-64">{children}</div>
          </div>
        </>
      </div>
    </ThemeProvider>
  );
};

export default PrivateLayout;
