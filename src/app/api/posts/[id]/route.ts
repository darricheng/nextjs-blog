import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/src/lib/utils/prisma";
import {
  invalidRequestBody,
  invalidRequestStatus,
  notFoundBody,
  notFoundStatus,
  serverErrorBody,
  serverErrorStatus,
  successBody,
  successStatus,
} from "@/src/lib/utils/apiResponses";

type IdParam = {
  params: {
    id: string;
  };
};

const invalidIdResponse = NextResponse.json(
  invalidRequestBody("invalid id"),
  invalidRequestStatus
);

export const GET = async (_req: Request, context: IdParam) => {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) return invalidIdResponse;
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) return NextResponse.json(notFoundBody, notFoundStatus);

    return NextResponse.json(successBody(post), successStatus);
  } catch (error: any) {
    return NextResponse.json(serverErrorBody(error), serverErrorStatus);
  }
};

export const PUT = async (req: Request, context: IdParam) => {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) return invalidIdResponse;
    const data: Prisma.PostUpdateInput = await req.json();
    const updatePost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
    return NextResponse.json(successBody(updatePost), successStatus);
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(notFoundBody, notFoundStatus);
    }
    return NextResponse.json(serverErrorBody(error), serverErrorStatus);
  }
};

export const DELETE = async (_req: Request, context: IdParam) => {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) return invalidIdResponse;
    const deletePost = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(successBody(deletePost), successStatus);
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(notFoundBody, notFoundStatus);
    }
    return NextResponse.json(serverErrorBody(error), serverErrorStatus);
  }
};
