import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Item } from "./index";
import axios from "axios";
import { POS_URL } from "../integrations/products/import";

const prisma = new PrismaClient();

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
    await axios.post(`${POS_URL}/inventory/update/product`, item);
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
      categories: true,
    },
  });

  res.status(200).json(item);
}
