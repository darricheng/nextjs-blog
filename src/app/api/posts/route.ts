import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/src/lib/prisma";
import {
  createdBody,
  createdStatus,
  invalidRequestBody,
  invalidRequestStatus,
  serverErrorBody,
  serverErrorStatus,
  successBody,
  successStatus,
} from "@/src/lib/apiResponses";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(successBody(posts, posts.length), successStatus);
  } catch (error: any) {
    return NextResponse.json(serverErrorBody(error), serverErrorStatus);
  }
}

export async function POST(req: Request) {
  try {
    const data: Prisma.PostCreateInput = await req.json();
    if (!data.title)
      return NextResponse.json(
        invalidRequestBody("title is required"),
        invalidRequestStatus
      );
    const post = await prisma.post.create({ data });
    return NextResponse.json(createdBody(post), createdStatus);
  } catch (error: any) {
    return NextResponse.json(serverErrorBody(error), serverErrorStatus);
  }
}
