import { getVolatileData } from "../utils/data";

export default async function VolatileLastUpdated() {
  const data = await getVolatileData();

  return (
    <p className="text-red-700 text-lg mb-8">
      Volatile last update at: {data.lastUpdated}
    </p>
  );
}
