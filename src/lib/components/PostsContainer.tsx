"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const renderPosts = (data) => {
  return data.map((post) => {
    const shortContent = post.content.substring(0, 100).trim() + "...";
    return (
      <Card key={post.id}>
        <CardHeader title={post.title}>{post.title}</CardHeader>
        <CardBody>{shortContent}</CardBody>
        <CardFooter>Some buttons here</CardFooter>
      </Card>
    );
  });
};

export default function PostsContainer({ postsData }) {
  const posts = renderPosts(postsData);
  return <>{posts}</>;
}
