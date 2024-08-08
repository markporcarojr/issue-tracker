import { NextRequest, NextResponse } from "next/server";
import createIssueSchema from "./schema";
import prisma from "@/prisma/client";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}