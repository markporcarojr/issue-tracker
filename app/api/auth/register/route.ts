import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(25),
  confirmPassword: z.string().min(5).max(25),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // Check if passwords match
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword,
      },
    });

    return NextResponse.json({ email: newUser.email }, { status: 201 });
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
