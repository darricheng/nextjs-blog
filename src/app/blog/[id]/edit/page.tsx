"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import PostForm from "@/src/lib/components/PostForm";
import type { Post } from "@/src/lib/types";
import { editPost, fetchPost } from "@/src/lib/utils/clientDataServices";

export default function EditPost() {
  const params = useParams();
  const id = Number(params.id);
  const [post, setPost] = useState<Post>({ title: "", content: "" });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const editPostHandler = async (post: Post) => {
    return await editPost(id, post);
  };

  const routeHandler = async (data: any) => {
    const json = await data.json();
    if (data.status === 200) {
      startTransition(() => {
        router.replace(`/blog/${id}`);
      });
    }
  };

  useEffect(() => {
    let ignore = false;

    const getPost = async () => {
      try {
        const postData = await fetchPost(id);
        if (!ignore) setPost(postData);
      } catch (e) {
        console.error(e);
      }
    };
    getPost();

    return () => {
      ignore = true;
    };
  });

  return (
    <>
      <h1>Edit Post</h1>
      <PostForm
        submitHandler={editPostHandler}
        routeHandler={routeHandler}
        data={post}
        isPending={isPending}
      />
    </>
  );
}
