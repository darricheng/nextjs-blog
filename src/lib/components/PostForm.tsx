import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

interface PostFormProps {
  data: {
    title: string;
    content: string;
  };
  submitHandler: (post: {
    title: string;
    content: string;
  }) => Promise<Response>;
}

export default function PostForm({ submitHandler, data }: PostFormProps) {
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
  return (
    <form
      className="flex w-full flex-wrap md:flex-nowrap gap-4"
      style={{ opacity: isAdding || isPending ? 0.7 : 1 }}
    >
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
      <Button color="primary" onClick={submit}>
        Submit
      </Button>
    </form>
  );
}