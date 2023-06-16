import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type Item = {
    id: number,
    name: string,
    SKU: string,
    description?: string | null,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Item[]>
) {
    const items = await prisma.item.findMany({
        include: {
            category: true
        }
    })
    res.status(200).json(items)
}