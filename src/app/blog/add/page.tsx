"use client";

import PostForm from "@/src/lib/components/PostForm";
import type { Post } from "@/src/lib/types";
import { addPost } from "@/src/lib/utils/clientDataServices";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function AddPost() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const addPostHandler = async (post: Post) => {
    return await addPost(post);
  };
  const routeHandler = async (data: any) => {
    const json = await data.json();
    const newPostId = json.data.id;
    if (data.status === 201) {
      startTransition(() => {
        router.replace(`/blog/${newPostId}`);
      });
    }
  };
  return (
    <>
      <h1>Add Post</h1>
      <PostForm
        submitHandler={addPostHandler}
        routeHandler={routeHandler}
        isPending={isPending}
      />
    </>
  );
}
