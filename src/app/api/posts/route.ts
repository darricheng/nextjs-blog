import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  const posts = await prisma.post.findMany();
  const res = {
    status: "success",
    results: posts.length,
    posts,
  };
  return NextResponse.json(res, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const data: Prisma.PostCreateInput = await req.json();
    const post = await prisma.post.create({ data });
    const res = {
      status: "success",
      data: {
        post,
      },
    };
    return NextResponse.json(res, { status: 201 });
  } catch (error: any) {
    const errRes = {
      status: "error",
      message: error.message,
    };
    return NextResponse.json(errRes, { status: 500 });
  }
}
