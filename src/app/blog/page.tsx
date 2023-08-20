import PostsContainer from "@/src/lib/components/PostsContainer";

const fetchPosts = async () => {
  // Get data from API route without going through HTTP
  // https://github.com/vercel/next.js/issues/48344#issuecomment-1548493646
  const res = await import("@/src/app/api/posts/route");
  const json = await (await res.GET()).json();
  return json.data;
};

export default async function Blog() {
  const postsData = await fetchPosts();
  return (
    <div>
      <h1>Blog</h1>
      <PostsContainer postsData={postsData} />
    </div>
  );
}
