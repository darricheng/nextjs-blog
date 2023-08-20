import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

type IdParam = {
  params: {
    id: string;
  };
};

export const GET = async (_req: Request, context: IdParam) => {
  const id = parseInt(context.params.id);
  if (isNaN(id)) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid ID",
      },
      { status: 400 }
    );
  }
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!post) {
    return NextResponse.json(
      {
        status: "error",
        message: "Post not found",
      },
      { status: 404 }
    );
  }
  const res = {
    status: "success",
    data: {
      post,
    },
  };
  return NextResponse.json(res, { status: 200 });
};

export const PUT = async (req: Request, context: IdParam) => {};

export const DELETE = async (req: Request, context: IdParam) => {};
