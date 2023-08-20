import { fetchPost } from "@/src/lib/utils/dataServices";

type PostProps = {
  params: {
    id: number;
  };
};

export default async function Post({ params }: PostProps) {
  const postData = await fetchPost(params.id);
  console.log("Post component", postData);
  return (
    <div>
      <h1>{postData.title}</h1>
      <p>{postData.content}</p>
    </div>
  );
}
