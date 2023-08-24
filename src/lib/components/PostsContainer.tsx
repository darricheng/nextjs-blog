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
        <Card key={post.id} className="w-72 h-72">
          <CardHeader title={post.title}>
            <h2 className="m-auto">{post.title}</h2>
          </CardHeader>
          <CardBody>
            <p className="m-auto">{shortContent}</p>
          </CardBody>
          <CardFooter className="place-content-between">
            <Link href={`/blog/${post.id}`} key={post.id}>
              <Button>Read</Button>
            </Link>
            <Button onPress={() => editHandler(post.id)}>Edit</Button>
            {/* TODO: Add a confirmation modal before deleting */}
            <Button onPress={() => deleteHandler(post.id)}>Delete</Button>
          </CardFooter>
        </Card>
      );
    });
  };

  const posts = renderPosts(postsData);
  return (
    <div
      className="flex flex-row flex-wrap place-content-between gap-y-16"
      style={{ opacity: isPending || isDeleting ? 0.7 : 1 }}
    >
      {posts}
    </div>
  );
}
