import React from "react";
import { getStableData } from "../utils/data";

export default async function ProductTitle() {
  const data = await getStableData();

  return (
    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
      {data.name}
    </h1>
  );
}
