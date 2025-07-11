import React from "react";
import { getVolatileData } from "../utils/data";

export default async function ProductPrice() {
  console.log("ProductPrice");
  const data = await getVolatileData();

  return <p className="text-red-700 text-lg mb-8">Price: {data.price}</p>;
}
