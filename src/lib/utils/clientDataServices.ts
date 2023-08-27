const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

import type { Post } from "../types";

export const addPost = async (data: Post) => {
  return await fetch(`${baseUrl}/api/posts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deletePost = async (id: number) => {
  return await fetch(`${baseUrl}/api/posts/${id}`, { method: "DELETE" });
};

export const editPost = async (id: number, post: Post) => {
  return await fetch(`${baseUrl}/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
};

export const fetchPost = async (id: number) => {
  const res = await fetch(`${baseUrl}/api/posts/${id}`);
  const json = await res.json();
  return json.data;
};
