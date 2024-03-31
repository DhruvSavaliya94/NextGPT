import Link from "next/link";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          <Link href="/chat" > 
          <button className="bg-purple-700 border-spacing-2 p-4 rounded-md">{"Lets Chat"}</button>
          </Link>
        </div>
        
      </div>
    </main>
  );
}


