import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/hooks";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Item } from "src/pages/api/items";
import clsx from "clsx";

export function Inventory() {
  const sort = "quantity,asc"; // replace with your desired sort
  const skip = 0; // replace with your desired skip
  const take = 5; // replace with your desired take

  const fetchItems = useFetch(`http://localhost:3000/api/items`, {
    sort,
    skip,
    take,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchItems,
  });
  const skeletalData = Array.from(
    { length: data?.length ?? 0 },
    (_, i) => i + 1
  );
  return (
    <div className="space-y-8">
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
        : data?.map((item: Item) => (
            <div key={item.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>
                  {item.name?.[0]}
                  {item.name?.split(" ")?.[1]?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm text-muted-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.sku}</p>
                <p className="text-sm text-muted-foreground">
                  {item.categories?.map((value) => value.name).join(", ")}
                </p>
              </div>
              <div
                className={clsx(
                  "ml-auto font-medium",
                  item.quantity < (item.threshold ?? 0)
                    ? "font-bold text-red-600 dark:text-red-300"
                    : ""
                )}
              >
                {item.quantity}/{item.threshold ?? "?"}
              </div>
            </div>
          ))}
    </div>
  );
}
