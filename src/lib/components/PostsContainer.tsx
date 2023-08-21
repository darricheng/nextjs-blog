"use client";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import Link from "next/link";
import { useTransition } from "react";

import { deletePost } from "@/src/lib/utils/clientDataServices";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  lastModifiedAt: string;
};

const editHandler = (id: number) => {};

export default function PostsContainer({ postsData }: { postsData: Post[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteHandler = async (id: number) => {
    const res = await deletePost(id);
    if (res.status === 200) {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const renderPosts = (data: Post[]) => {
    return data.map((post) => {
      const shortContent = post.content.substring(0, 100).trim() + "...";
      return (
        <Card key={post.id}>
          <CardHeader title={post.title}>{post.title}</CardHeader>
          <CardBody>{shortContent}</CardBody>
          <CardFooter>
            <Link href={`/blog/${post.id}`} key={post.id}>
              <Button>Read more</Button>
            </Link>
            <Button onPress={() => editHandler(post.id)}>Edit</Button>
            <Button onPress={() => deleteHandler(post.id)}>Delete</Button>
          </CardFooter>
        </Card>
      );
    });
  };

  const posts = renderPosts(postsData);
  return (
    <div className="" style={{ opacity: isPending ? 0.7 : 1 }}>
      {posts}
    </div>
  );
}
