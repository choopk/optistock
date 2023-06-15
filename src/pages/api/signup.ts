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

    // Check if user exist
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    // insert new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      return res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
        image: newUser.image,
        role: newUser.role,
      });
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
