"use client";

import PostForm from "@/src/lib/components/PostForm";
import type { Post } from "@/src/lib/types";
import { addPost } from "@/src/lib/utils/clientDataServices";

export default function AddPost() {
  const addPostHandler = async (post: Post) => {
    return await addPost(post);
  };
  return (
    <>
      <h1>Add Post</h1>
      <PostForm submitHandler={addPostHandler} />
    </>
  );
}
