"use client";

import PostForm from "@/src/lib/components/PostForm";
import { addPost } from "@/src/lib/utils/clientDataServices";

export default function AddPost() {
  const addPostHandler = async (post: { title: string; content: string }) => {
    return await addPost(post);
  };
  return (
    <>
      <h1>Add Post</h1>
      <PostForm submitHandler={addPostHandler} />
    </>
  );
}
