import { Article } from "@/components/Article";
import { Wrapper } from "@/components/ChuckNorrisJoke";
import { revalidateTag } from "next/cache";
import { Suspense } from "react";

async function invalidateConfig() {
  "use server";
  revalidateTag("config");
}

export default async function Home() {
  console.log("Home");

  return (
    <article className="flex-grow container mx-auto px-6 py-12">
      <Suspense fallback={<div>Loading joke...</div>}>
        <Wrapper />
      </Suspense>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Welcome to My Blog
      </h1>

      <form action={invalidateConfig}>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Invalidate config
        </button>
      </form>
      <Article />
    </article>
  );
}
