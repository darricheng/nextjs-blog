import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

interface PostFormProps {
  data?: {
    title: string;
    content: string;
  };
  submitHandler: (post: {
    title: string;
    content: string;
  }) => Promise<Response>;
}

export default function PostForm({
  submitHandler,
  data = { title: "", content: "" },
}: PostFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const submit = async () => {
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
    const json = await res.json();
    setIsAdding(false);
    const newPostId = json.data.id;
    if (res.status === 201) {
      startTransition(() => {
        router.replace(`/blog/${newPostId}`);
      });
    }
  };
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
      <Button color="primary" onClick={submit} isLoading={isLoading}>
        Submit
      </Button>
    </form>
  );
}
