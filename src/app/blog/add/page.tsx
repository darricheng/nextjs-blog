"use client";

import PostForm from "@/src/lib/components/PostForm";
import { addPost } from "@/src/lib/utils/clientDataServices";

export default function AddPost() {
  const addPostHandler = async (post) => {
    return await addPost(post);
  };
  return <PostForm submitHandler={addPostHandler} />;
}
