import { PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

console.info("Starting notifications cron job...");

// This task will run every minute.
cron.schedule("* * * * *", async () => {
  // Retrieve all items.
  const items = await prisma.item.findMany();

  // Iterate over each item to check if the stock is below the threshold.
  for (const item of items) {
    if (item.quantity <= item.threshold) {
      // Retrieve the latest notification sent to the user.
      const latestNotification = await prisma.notification.findFirst({
        where: { itemId: item.id },
        orderBy: { createdAt: "desc" },
      });

      // If no previous notification was sent or if the last notification was sent more than 3 hours ago.
      if (
        !latestNotification ||
        Date.now() - new Date(latestNotification.createdAt).getTime() >=
          3 * 60 * 60 * 1000
      ) {
        // Create a new notification.
        await prisma.notification.create({
          data: {
            user: { connect: { id: "1" } },
            item: { connect: { id: item.id } },
            title: "Low Stock Alert",
            message: `The stock for item "${item.name}" is low.`,
            type: "LOW_STOCK",
          },
        });
      }
    }
  }
});
