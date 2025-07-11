import React from "react";
import Image from "next/image";
import { getStableData } from "../utils/data";

export default async function ProductImage() {
  console.log("ProductImage");
  const data = await getStableData();

  return (
    <Image
      src={data.imageUrl}
      alt="Product Image"
      width={800}
      height={450}
      className="rounded-lg shadow-md my-8"
      priority={true}
    />
  );
}
