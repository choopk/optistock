const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const notifications = [
  { id: 1, type: 'LOW_STOCK', title: 'Low Stock Alert', message: 'Item "Milk 1L" stock is low.', userId: "1", itemId: 1 },
  { id: 2, type: 'SCHEDULED_ORDER', title: 'Scheduled Order', message: 'Order for "Coffee Beans 2KG" is scheduled tomorrow.', userId: "1" },
  { id: 4, type: 'LOW_STOCK', title: 'Low Stock Alert', message: 'Item "Brown Sugar 1KG" stock is low.', userId: "1", itemId: 2 },
  { id: 5, type: 'SCHEDULED_ORDER', title: 'Scheduled Order', message: 'Order for "Organic Eggs 1 Dozen" is scheduled tomorrow.', userId: "1" },
  { id: 7, type: 'LOW_STOCK', title: 'Low Stock Alert', message: 'Item "Cocoa Powder 500G" stock is low.', userId: "1", itemId: 3 },
  { id: 8, type: 'SCHEDULED_ORDER', title: 'Scheduled Order', message: 'Order for "All-Purpose Flour 5KG" is scheduled tomorrow.', userId: "1" },
  { id: 10, type: 'LOW_STOCK', title: 'Low Stock Alert', message: 'Item "Unsalted Butter 500G" stock is low.', userId: "1", itemId: 4 },
  { id: 11, type: 'SCHEDULED_ORDER', title: 'Scheduled Order', message: 'Order for "Organic Honey 1KG" is scheduled tomorrow.', userId: "1" },
  { id: 13, type: 'LOW_STOCK', title: 'Low Stock Alert', message: 'Item "Ground Cinnamon 200G" stock is low.', userId: "1", itemId: 5 },
  { id: 14, type: 'SCHEDULED_ORDER', title: 'Scheduled Order', message: 'Order for "Pure Vanilla Extract 50ML" is scheduled tomorrow.', userId: "1" },
];

async function main() {
  for (let notification of notifications) {
    await prisma.notification.create({
      data: notification,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
