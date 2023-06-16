import { Category, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
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
      category: true,
    },
  });

  res.status(200).json(items);
}
