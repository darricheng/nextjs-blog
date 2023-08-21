const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type Post = {
  title: string;
  content: string | null;
};

export const addPost = async (data: Post) => {
  return await fetch(`${baseUrl}/api/posts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deletePost = async (id: number) => {
  return await fetch(`${baseUrl}/api/posts/${id}`, { method: "DELETE" });
};
