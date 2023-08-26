import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { Post } from "../types";

interface PostFormProps {
  data?: Post;
  routeHandler: (json: any) => void;
  submitHandler: (post: Post) => Promise<Response>;
  isPending: boolean;
}

export default function PostForm({
  submitHandler,
  routeHandler,
  data = { title: "", content: "" },
  isPending,
}: PostFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const submitForm = async () => {
    const title = titleRef.current?.value;
    let content = contentRef.current?.value;
    if (!title) {
      // Notify user that title is required
      return;
    }
    if (!content) {
      content = "";
    }
    const post = { title, content };
    setIsAdding(true);
    const res = await submitHandler(post);
    setIsAdding(false);
    routeHandler(res);
  };
  const cancel = () => router.replace("/blog");

  const isLoading = isAdding || isPending;

  return (
    <form
      className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4"
      style={{ opacity: isLoading ? 0.7 : 1 }}
    >
      <Input
        ref={titleRef}
        type="text"
        label="Title"
        labelPlacement="outside"
        placeholder="Enter post title here"
        defaultValue={data.title}
      />
      <Textarea
        ref={contentRef}
        label="Content"
        labelPlacement="outside"
        placeholder="Enter content here"
        defaultValue={data.content}
        minRows={8}
      />
      <div className="flex gap-4">
        <Button onClick={cancel}>Cancel</Button>
        <Button color="primary" onClick={submitForm} isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
}
