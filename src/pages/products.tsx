import Head from "next/head";
import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/hooks";
import PublicLayout from "@/components/layouts/PublicLayout";
import { Item } from "./api/items";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import Spinner from "@/components/spinner";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";

interface TableItemsProps {
  items: Item[];
  search: string;
  stockCondition: string;
  sort: string;
  asc: boolean;
}

const Table: FC<TableItemsProps> = ({
  items,
  search,
  stockCondition,
  sort,
  asc,
}) => {
  if (search) {
    search = search.toLowerCase();
    items = items.filter(
      (value) =>
        value.id.toString().toLowerCase().includes(search) ||
        value.sku.toLowerCase().includes(search) ||
        value.name.toLowerCase().includes(search) ||
        value.categories
          ?.map((value) => value.name)
          .join(" ")
          .toLowerCase()
          .includes(search)
    );
  }

  if (stockCondition === "restock") {
    items = items.filter((value) =>
      value.threshold && value.quantity - value.threshold <= 0 ? true : false
    );
  }

  switch (sort) {
    case "sku":
      items = items.sort((a, b) =>
        a.sku?.localeCompare(b.sku, undefined, { sensitivity: "base" })
      );
      break;

    case "categories":
      items = items.sort(
        (a, b) =>
          a.categories
            ?.map((value) => value.name)
            .join(" ")
            .localeCompare(
              b.categories?.map((value) => value.name).join(" ") ?? "",
              undefined,
              { sensitivity: "base" }
            ) ?? -1
      );
      break;

    case "name":
      items = items.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      break;

    case "quantity":
      items = items.sort((a, b) => a.quantity - b.quantity);
      break;

    case "threshold":
      items = items.sort((a, b) => (a.threshold ?? -1) - (b.threshold ?? -1));
      break;
  }

  if (!asc) {
    items = items.reverse();
  }

  return (
    <ScrollArea className="flex-grow p-4">
      <div className="table-wrap block max-h-[70vh] min-w-full">
        <table className="w-full min-w-[1050px] text-center text-sm font-light">
          <thead className="sticky top-0 border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th className=" px-6 py-4">SKU</th>
              <th className=" px-6 py-4">Name</th>
              <th className=" px-6 py-4">Categories</th>
              <th className=" px-6 py-4">Quantity</th>
              <th className=" px-6 py-4">Threshold</th>
            </tr>
          </thead>
          <tbody className="h-96 overflow-y-auto">
            {items.map((item) => (
              <tr
                key={item.id}
                className={clsx(
                  "hover:cursor border-b hover:bg-gray-100 active:bg-gray-200 dark:border-neutral-500 dark:hover:bg-gray-900 dark:active:bg-gray-800",
                  item.threshold && item.quantity - item.threshold <= 0
                    ? " bg-red-100 dark:bg-red-900"
                    : ""
                )}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium ">
                  {item.sku}
                </td>
                <td className="px-6 py-4 text-left capitalize">{item.name}</td>
                <td className="whitespace-nowrap px-6 py-4 capitalize">
                  {item.categories
                    ?.map((category) => category.name)
                    .join(", ") ?? "No Category"}
                </td>
                <td
                  className={clsx(
                    "whitespace-nowrap px-6 py-4 capitalize",
                    item.threshold && item.quantity - item.threshold <= 0
                      ? " font-bold text-red-600 dark:text-red-300"
                      : ""
                  )}
                >
                  {item.quantity}
                </td>
                <td className="whitespace-nowrap px-6 py-4 capitalize">
                  {item.threshold ?? "No Threshold"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  );
};

export default function Products() {
  const fetchItems = useFetch(`http://localhost:3000/api/items`);
  const [search, setSearch] = useState("");
  const [stockCondition, setStockCondition] = useState("all");
  const [sort, setSort] = useState("sku");
  const [asc, setAsc] = useState(true);
  const { data, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchItems,
  });

  return (
    <React.Fragment>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PublicLayout>
        <div className="min-w-fit flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="mr-5 text-3xl font-bold tracking-tight">
                Products
              </h2>
            </div>
            <div className="flex">
              <div className="mr-5">
                <label htmlFor="search" className="mr-2 text-lg">
                  Search:
                </label>
                <input
                  type="text"
                  id="search"
                  className="rounded-lg bg-gray-200 pl-2 pr-2 pt-1 pb-1 dark:bg-gray-800"
                  placeholder="Search Item"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="mr-5">
                <label htmlFor="stock" className="mr-2 text-lg">
                  Stock Condition:
                </label>
                <select
                  id="stock"
                  className="rounded-lg bg-gray-200 pl-2 pr-2 pt-1 pb-1 dark:bg-gray-800"
                  placeholder="Search Item"
                  onChange={(event) => setStockCondition(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="restock">Need Restock</option>
                </select>
              </div>
              <div className="mr-5 flex">
                <label htmlFor="sort" className="mr-2 text-lg">
                  Sort By:
                </label>
                <select
                  id="sort"
                  className="rounded-lg bg-gray-200 pl-2 pr-2 pt-1 pb-1 dark:bg-gray-800"
                  placeholder="Search Item"
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="sku">SKU</option>
                  <option value="name">Name</option>
                  <option value="categories">Categories</option>
                  <option value="quantity">Quantity</option>
                  <option value="threshold">Threshold</option>
                </select>
                <ArrowDownAZ
                  className="hover:cursor-pointer"
                  width={30}
                  height={30}
                  onClick={() => {
                    setAsc(true);
                  }}
                />
                <ArrowUpZA
                  className="hover:cursor-pointer"
                  width={30}
                  height={30}
                  onClick={() => {
                    setAsc(false);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <Spinner />
            ) : (
              <Table
                items={data}
                search={search}
                stockCondition={stockCondition}
                sort={sort}
                asc={asc}
              />
            )}
          </div>
        </div>
      </PublicLayout>
    </React.Fragment>
  );
}
