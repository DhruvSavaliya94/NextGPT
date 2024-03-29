import { SignInButton, SignOutButton, auth } from "@clerk/nextjs";

import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const { userId } = auth();

  const queries = await api.query.getAll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {userId ? <SignOutButton /> : <SignInButton />}
        <div>
          <Link href="/upload" > 
          <button className="bg-purple-700 border-spacing-2 p-4 rounded-md">{"Lets' upload files"}</button>
          </Link>
        </div>
        <div>
          {<p className="text-white"> All Queries</p>}
          <ul>
            {queries.map((query, key) => (
              <li key={key}>{query.content}</li>
            ))}
          </ul>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.query.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent query: {latestPost.content}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
