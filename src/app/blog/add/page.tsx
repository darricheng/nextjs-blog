"use client";

import { addPost } from "@/src/lib/utils/clientDataServices";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useRef } from "react";

export default function AddPost() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const addPostHandler = () => {
    const title = titleRef.current?.value;
    let content = contentRef.current?.value;
    console.log("Add post handler", title, content);
    if (!title) {
      // Notify user that title is required
      return;
    }
    if (!content) {
      content = "";
    }
    const post = { title, content };
    const res = addPost(post);
    // TODO: Route user to the newly created post
  };
  return (
    <form className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        ref={titleRef}
        type="text"
        label="Title"
        labelPlacement="outside"
        placeholder="Enter post title here"
      />
      <Textarea
        ref={contentRef}
        label="Content"
        labelPlacement="outside"
        placeholder="Enter content here"
        className=""
      />
      <Button color="primary" onClick={addPostHandler}>
        Submit
      </Button>
    </form>
  );
}
