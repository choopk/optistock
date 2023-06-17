import { Category, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type Item = {
  id: number;
  name: string;
  sku: string;
  description?: string | null;
  categories?: Category[];
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  threshold?: number | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item | Item[]>
) {
  if (req.method === "POST") {
    const reqItem = req.body;
    const item = await prisma.item.create({
      data: {
        ...reqItem,
        categories: {
          connect: {
            id: reqItem.categories[0].id,
          },
        },
      },
      include: {
        categories: true,
      },
    });
    res.status(201).json(item);
  }

  const query = req.query;
  const keyValue = query.sort?.toString().split(",");
  const sort = keyValue ? Object.fromEntries([keyValue]) : undefined;
  const skip = query.skip ? parseInt(query.skip.toString()) : undefined;
  const take = query.take ? parseInt(query.take.toString()) : undefined;

  const items = await prisma.item.findMany({
    skip,
    take,
    orderBy: [sort],
    include: {
      categories: true,
    },
  });

  res.status(200).json(items);
}
