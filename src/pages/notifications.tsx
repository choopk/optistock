import Head from "next/head";
import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublicLayout from "@/components/layouts/PublicLayout";

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

export default function Notifications() {
  const fetchItems = useFetch(`http://localhost:3000/api/notifications`);
  const { data, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchItems,
  });
  const skeletalData = Array.from(
    { length: data?.length ?? 0 },
    (_, i) => i + 1
  );

  return (
    <React.Fragment>
      <Head>
        <title>Notifications</title>
        <meta name="description" content="Notifications" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <div className="space-y-4">
            {isLoading
              ? skeletalData.map((item) => (
                  <div key={item} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))
              : data?.map((notification: Alert) => (
                  <NotificationCard
                    notification={notification}
                    key={notification.id}
                  />
                ))}
          </div>
        </div>
      </PublicLayout>
    </React.Fragment>
  );
}
