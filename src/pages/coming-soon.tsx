import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublicLayout from "@/components/layouts/PublicLayout";
import Head from "next/head";

type AlertType = "LOW_STOCK" | "OTHER_TYPE";
interface Alert {
  id: number;
  userId: string;
  itemId: number;
  title: string;
  message: string;
  type: AlertType;
  readStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationCardProps {
  notification: Alert;
}

const NotificationCard: FC<NotificationCardProps> = ({ notification }) => {
  return (
    <Card style={{ backgroundColor: "#F3F4F6", color: "#1F2937" }}>
      <CardHeader style={{ backgroundColor: "#E5E7EB" }}>
        <CardTitle style={{ color: "#1F2937" }}>{notification.title}</CardTitle>
      </CardHeader>
      <CardContent style={{ color: "#4B5563" }}>
        <div>{notification.message}</div>
        <div>Created at: {notification.createdAt}</div>
      </CardContent>
    </Card>
  );
};

export default function ComingSoon() {
  return (
    <React.Fragment>
      <Head>
        <title>Coming Soon</title>
        <meta name="description" content="Coming Soon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <h2 className="m-auto mt-[10%] grow text-7xl font-medium uppercase">
          Coming Soon
        </h2>
      </PublicLayout>
    </React.Fragment>
  );
}
