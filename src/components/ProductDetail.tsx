import { unstable_cacheLife as cacheLife } from "next/cache";
import React from "react";
import ProductDescription from "./ProductDescription";
import ProductTitle from "./ProductTitle";
import StableLastUpdated from "./StableLastUpdated";

export default async function ProductDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  "use cache";
  cacheLife("minutes");

  console.log("ProductDetail");

  return (
    <article className="flex-grow container mx-auto my-6 px-6 py-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
      <div className="max-w-3xl mx-auto p-8 bg-white bg-opacity-80 rounded-lg">
        <ProductTitle />
        <ProductDescription />
        <StableLastUpdated />
        {children}
      </div>
    </article>
  );
}
