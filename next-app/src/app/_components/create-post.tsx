"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
 

  
  import { api } from "@/trpc/react";
  
export function CreatePost() {
  const router = useRouter();
  const { userId  } = useAuth();
  const [content, setName] = useState("");

  const createPost = api.query.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (userId) {
          createPost.mutate({ content, userId});
        }
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Query"
        value={content}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
