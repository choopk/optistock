const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = [
    "Beverages",
    "Dairy Products",
    "Baked Goods",
    "Meats",
    "Seafood",
    "Fruits & Vegetables",
    "Grains & Cereals",
    "Condiments & Sauces",
    "Spices & Seasonings",
    "Frozen Foods",
    "Snacks & Confectionery",
    "Organic Foods",
    "Gluten-Free Products",
    "Specialty Foods",
    "Coffee & Tea"
  ];

  for (const name of categories) {
    await prisma.category.create({
      data: { name },
    });
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
