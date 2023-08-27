import PostsContainer from "@/src/lib/components/PostsContainer";
import { fetchAllPosts } from "@/src/lib/utils/serverDataServices";

export default async function Blog() {
  let postsData = await fetchAllPosts();
  if (!postsData) postsData = [];
  return (
    <div>
      <h1>Blog</h1>
      <PostsContainer postsData={postsData} />
    </div>
  );
}
