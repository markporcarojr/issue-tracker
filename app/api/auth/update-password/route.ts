import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

const schema = z.object({
  password: z.string().min(5).max(25),
  confirmPassword: z.string().min(5).max(25),
});

export async function PUT(request: NextRequest) {
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

    // Extract and verify token
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json(
        { error: "Authentication token missing or invalid" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Update the password in the database
    await prisma.user.update({
      where: {
        email: token.email!,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Password Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during Password Update:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
