const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const categoryIds = await prisma.category.findMany({ select: { id: true } });

    const itemPromises = Array.from({ length: 100 }).map(async (_, i) => {
        const itemNum = i + 1;

        return prisma.item.create({
            data: {
                name: `Product Name ${itemNum}`,
                description: `Product Description ${itemNum}`,
                categoryId: categoryIds[i % categoryIds.length].id,
                sku: `SKU-${itemNum}-${Math.floor(Math.random() * 1000000) + 1}`,
                quantity: Math.floor(Math.random() * 1000) + 1,
            },
        });
    });

    await Promise.all(itemPromises);
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
