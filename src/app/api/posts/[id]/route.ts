import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

type IdParam = {
  params: {
    id: string;
  };
};

const invalidIdBody = { status: "error", message: "Invalid ID" };
const invalidIdStatus = { status: 400 };
const notFoundBody = { status: "error", message: "Post not found" };
const notFoundStatus = { status: 404 };

export const GET = async (_req: Request, context: IdParam) => {
  const id = parseInt(context.params.id);
  if (isNaN(id)) {
    return NextResponse.json(invalidIdBody, invalidIdStatus);
  }
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!post) return NextResponse.json(notFoundBody, notFoundStatus);

  const res = {
    status: "success",
    data: {
      post,
    },
  };
  return NextResponse.json(res, { status: 200 });
};

export const PUT = async (req: Request, context: IdParam) => {
  try {
    const id = parseInt(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json(invalidIdBody, invalidIdStatus);
    }
    const data = await req.json();
    const updatePost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
    const res = { status: "success", data: { updatePost } };
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(notFoundBody, notFoundStatus);
      }
    }
    const errRes = {
      status: "error",
      message: error.message,
    };
    return NextResponse.json(errRes, { status: 500 });
  }
};

export const DELETE = async (req: Request, context: IdParam) => {};
