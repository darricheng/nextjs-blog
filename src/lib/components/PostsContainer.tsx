"use client";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { deletePost } from "@/src/lib/utils/clientDataServices";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const deleteHandler = async (id: number) => {
    setIsDeleting(true);
    const res = await deletePost(id);
    setIsDeleting(false);
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
    <div className="" style={{ opacity: isPending || isDeleting ? 0.7 : 1 }}>
      {posts}
    </div>
  );
}
