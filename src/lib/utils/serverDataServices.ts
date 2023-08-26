const baseUrl = process.env.BASE_URL;

export const fetchAllPosts = async () => {
  const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });
  const json = await res.json();
  return json.data;
};

export const fetchPost = async (id: number) => {
  const res = await fetch(`${baseUrl}/api/posts/${id}`);
  const json = await res.json();
  return json.data;
};
