import { fetchPost } from "@/src/lib/utils/serverDataServices";

type PostProps = {
  params: {
    id: number;
  };
};

export default async function Post({ params }: PostProps) {
  const postData = await fetchPost(params.id);
  console.log("Post component", postData);
  return (
    <article className="prose lg:prose-xl">
      <h1>{postData.title}</h1>
      <p>{postData.content}</p>
    </article>
  );
}
