import dayjs from "dayjs";
import { fetchPost } from "@/src/lib/utils/serverDataServices";

type PostProps = {
  params: {
    id: number;
  };
};

export default async function Post({ params }: PostProps) {
  const postData = await fetchPost(params.id);
  const createdTime = dayjs(postData.createdAt).format("D/M/YYYY - h:mma");
  const lastModifiedTime = dayjs(postData.lastModifiedAt).format(
    "D/M/YYYY - h:mma"
  );
  const dateStyle = "my-0 text-sm text-gray-500";
  return (
    <article>
      <h1>{postData.title}</h1>
      <p className={dateStyle}>Created: {createdTime}</p>
      <p className={dateStyle}>Last Edited: {lastModifiedTime}</p>
      <hr />
      <p>{postData.content}</p>
    </article>
  );
}
