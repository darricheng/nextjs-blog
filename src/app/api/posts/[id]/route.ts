import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

type IdParam = {
  params: {
    id: string;
  };
};

export const GET = async (req: Request, context: IdParam) => {
  const postId = context.params.id;
  console.log(postId);
  return NextResponse.json(`requested id: ${postId}`, { status: 200 });
};
