// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password"> | { message: string }>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user?.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    try {
      if (await argon2.verify(user?.password!, password)) {
        return res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          role: user.role,
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      name: "FORBIDDEN",
      message: `HTTP method ${req.method} is not supported.`,
    });
  }
}
