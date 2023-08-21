import PostsContainer from "@/src/lib/components/PostsContainer";
import { fetchAllPosts } from "@/src/lib/utils/serverDataServices";

export default async function Blog() {
  const postsData = await fetchAllPosts();
  return (
    <div>
      <h1>Blog</h1>
      <PostsContainer postsData={postsData} />
    </div>
  );
}
