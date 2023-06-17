import { Notification, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

function getPaginated(query: Partial<{ [p: string]: string | string[] }>) {
  const keyValue = query.sort?.toString().split(",");
  const sort = keyValue ? Object.fromEntries([keyValue]) : undefined;
  const skip = query.skip ? parseInt(query.skip.toString()) : undefined;
  const take = query.take ? parseInt(query.take.toString()) : undefined;
  return {
    sort,
    skip,
    take,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Notification | Notification[]>
) {
  const query = req.query;
  const { sort, skip, take } = getPaginated(query);
  const notifications = await prisma.notification.findMany({
    skip,
    take,
    orderBy: [sort],
  });

  res.status(200).json(notifications);
}
