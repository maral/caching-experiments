import React from "react";
import { getStableData } from "../utils/data";

export default async function StableLastUpdated() {
  const data = await getStableData();

  return (
    <p className="text-gray-700 text-lg mb-8">
      Stable last update at: {data.lastUpdated}
    </p>
  );
}
