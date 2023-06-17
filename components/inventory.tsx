import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from '@tanstack/react-query';
import { useFetch } from "@/hooks";
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
type Item = {
    id: number;
    name: string;
    sku: string;
    description?: string | null;
    category: Category;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
};

type Category = {
    id: number;
    name: string;
};

export function Inventory() {
    const sort = "quantity,desc"; // replace with your desired sort
    const skip = 0; // replace with your desired skip
    const take = 5; // replace with your desired take

    const fetchItems = useFetch(`http://localhost:3000/api/items`, { sort, skip, take })
    const { data, isLoading } = useQuery({ queryKey: ['groups'], queryFn: fetchItems })
    const skeletalData = [1, 2, 3, 4, 5]
    return (
        <div className="space-y-8">
            {isLoading ? (
                skeletalData.map((item) =>
                    <React.Fragment key={item}>
                        <Skeleton className="h-1 w-9" />
                        <div className="ml-4 space-y-1">
                            <Skeleton className="text-sm text-muted-foreground block h-2 w-3/4" />
                            <Skeleton className="text-sm text-muted-foreground block h-2 w-1/2" />
                            <Skeleton className="text-sm text-muted-foreground block h-2 w-2/3" />
                        </div>
                    </React.Fragment>
                )
            ) : (
                data?.map((item: Item) => (
                    <div key={item.id} className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{item.name[0]}{item.name.split(' ')[1][0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <p className="text-sm text-muted-foreground">{item.sku}</p>
                            <p className="text-sm text-muted-foreground">{item.category.name}</p>
                        </div>
                        <div className="ml-auto font-medium">{item.quantity}</div>
                    </div>
                ))
            )}
        </div>
    )
}


