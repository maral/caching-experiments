import React from "react";
import { getVolatileData } from "../utils/data";

export default async function ProductStockCount() {
  const data = await getVolatileData();

  return (
    <p className="text-red-700 text-lg mb-8">Stock Count: {data.stockCount}</p>
  );
}
