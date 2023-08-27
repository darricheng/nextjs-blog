const protocol = process.env.VERCEL_ENV !== "development" ? "https:" : "http:";
const baseUrl = `${protocol}//${process.env.VERCEL_URL}`;

export const fetchAllPosts = async () => {
  console.log("fetching all posts");
  const url = `${baseUrl}/api/posts`;
  console.log("url", url);
  const res = await fetch(url, { cache: "no-store" });
  console.log("res", res);
  const json = await res.json();
  console.log("json", json);
  return json.data;
};

export const fetchPost = async (id: number) => {
  const res = await fetch(`${baseUrl}/api/posts/${id}`);
  const json = await res.json();
  return json.data;
};
