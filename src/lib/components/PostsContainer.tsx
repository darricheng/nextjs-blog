"use client";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  lastModifiedAt: string;
};

const editHandler = (id: number) => {};

const deleteHandler = (id: number) => {};

const renderPosts = (data: Post[]) => {
  return data.map((post) => {
    const shortContent = post.content.substring(0, 100).trim() + "...";
    return (
      <Link href={`/blog/${post.id}`} key={post.id}>
        <Card key={post.id}>
          <CardHeader title={post.title}>{post.title}</CardHeader>
          <CardBody>{shortContent}</CardBody>
          <CardFooter>
            <Button onPress={() => editHandler(post.id)}>Edit</Button>
            <Button onPress={() => deleteHandler(post.id)}>Delete</Button>
          </CardFooter>
        </Card>
      </Link>
    );
  });
};

export default function PostsContainer({ postsData }: { postsData: Post[] }) {
  const posts = renderPosts(postsData);
  return <div className="">{posts}</div>;
}
