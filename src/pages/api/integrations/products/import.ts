import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Item } from "../../items";

export const POS_URL: string = "https://optipos.vercel.app/api";

const prisma = new PrismaClient();

function generateSKU(productName: string, category: string): string {
  const part1 = productName.slice(0, 2).toUpperCase();
  const part2 = category.slice(0, 2).toUpperCase();

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `SKU-${part1}-${part2}-${randomNumber}`;
}

export async function transformAndSaveProductsToItems(
  products: any[]
): Promise<any> {
  const items: any = products.map((product) => {
    const { title, image, stockCount, SKU } = product;

    return {
      name: title,
      description: title,
      image,
      quantity: stockCount,
      sku: SKU ?? generateSKU(title, product.categories[0].name),
      categories: {
        connectOrCreate: {
          where: {
            id: product.categories[0].id,
          },
          create: {
            id: product.categories[0].id,
            name: product.categories[0].name,
          },
        },
      },
    };
  });

  let createdItems: Item[] = [];

  for (const item of items) {
    const createdItem = await prisma.item.create({
      data: {
        ...item,
      },
      include: { categories: false },
    });
    createdItems = [...createdItems, createdItem];
  }
  return createdItems;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { data } = await axios.get(`${POS_URL}/products`);

  const result = await transformAndSaveProductsToItems(data);

  res.status(200).json(result);
}
