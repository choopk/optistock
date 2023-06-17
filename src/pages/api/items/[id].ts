import { Category, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Item = {
  id?: number;
  name?: string;
  sku?: string;
  description?: string | null;
  category?: Category;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item | { message: string } | null>
) {
  const { id } = req.query;
  const idStr = id?.toString() ?? "";
  const itemId = parseInt(idStr);
  if (!itemId) {
    res.status(406).json({ message: "Invalid ID" });
  }
  if (req.method === "PUT") {
    const reqItem = req.body;
    const item = await prisma.item.update({
      where: {
        id: itemId,
      },
      data: reqItem,
    });
    res.status(200).json(item);
  }

  if (req.method === "DELETE") {
    const item = await prisma.item.delete({
      where: {
        id: itemId,
      },
    });
    res.status(200).json(item);
  }

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      category: true,
    },
  });

  res.status(200).json(item);
}
