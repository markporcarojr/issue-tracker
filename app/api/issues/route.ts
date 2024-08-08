import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // const issue = await prisma.issue.findUnique({
  //   where: { id: body.id },
  // });

  // if (issue)
  //   return NextResponse.json(
  //     { error: "Issue already exists" },
  //     { status: 400 }
  //   );

  const newIssue = await prisma.issue.create({
    data: {
      content: body.content,
      title: body.title,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
