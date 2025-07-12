import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

export async function getCachedConfig() {
  "use cache";
  cacheLife({
    revalidate: 20,
    stale: 20,
    expire: 3600,
  });
  cacheTag("config");

  console.log("Fetching config...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.random();
}

export async function getStableData() {
  "use cache";
  cacheLife("minutes");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name: "SuperWidget",
    description: "A revolutionary widget that will change the way you work.",
    imageUrl: "/superwidget.jpg",
    category: "Widgets",
    manufacturer: "TechCorp",
    lastUpdated: new Date().toLocaleString(),
  };
}

export async function getVolatileData() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    price: "$99.99",
    availability: "In Stock",
    lastUpdated: new Date().toLocaleString(),
    discount: "10%",
    stockCount: 42,
  };
}
