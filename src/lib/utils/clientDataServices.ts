const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const deletePost = async (id: number) => {
  return await fetch(`${baseUrl}/api/posts/${id}`, { method: "DELETE" });
};
