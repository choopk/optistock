import Head from "next/head";
import React from "react";
import { Chat } from "@/components/chat";
import PublicLayout from "@/components/layouts/PublicLayout";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Optibot from Optistock</title>
        <meta
          name="description"
          content="Your best Inventory Management System Assistant"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <div className="flex-1">
          <div className="space-y-4 p-8 pt-6">
            <h2 className="text-3xl font-bold tracking-tight">Optibot</h2>
          </div>
          <Chat />
        </div>
      </PublicLayout>
    </React.Fragment>
  );
}
