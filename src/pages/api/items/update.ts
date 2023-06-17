import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Item } from "./index";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item | Item[]>
) {
  if (req.method === "POST") {
    const { products } = req.body;
    let result = [];
    for (const product of products) {
      const item = await prisma.item.findUnique({
        where: {
          sku: product.sku,
        },
      });

      if (item) {
        const updatedItem = await prisma.item.update({
          where: {
            id: item.id,
          },
          data: {
            quantity: item.quantity - product.quantity,
          },
        });
        result.push(updatedItem);
      }
    }
    res.status(200).json(result);
  }
  res.status(204);
}
