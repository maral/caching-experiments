import { withDelay } from "@/utils/delay";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { SecondsFrom } from "./SecondsFrom";

interface JokeData {
  value: string;
}

export async function Wrapper() {
  "use cache";

  console.log("Wrapper");

  cacheLife({
    stale: 15,
    revalidate: 15,
    expire: 15,
  });

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-800">
        Wrapper Component ({await getRandomData()})
      </h2>
      <div className="text-blue-700">
        <SuspendedComponent />
      </div>
    </div>
  );
}

async function SuspendedComponent() {
  "use cache";

  console.log("SuspendedComponent");

  cacheLife({
    stale: 5,
    revalidate: 5,
    expire: 5,
  });

  return (
    <div className="text-green-600">
      <span>
        <SecondsFrom startTime={await getRandomData()} /> seconds elapsed
      </span>
    </div>
  );
}

async function getRandomData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Date.now();
}

const ChuckNorrisJoke = async () => {
  "use cache";

  cacheLife({
    stale: 5,
    revalidate: 5,
    expire: 5,
  });

  let jokeData: JokeData | null = null;
  const response = await withDelay(
    fetch("https://api.chucknorris.io/jokes/random", {
      cache: "no-store",
    }),
    3000
  );
  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }
  jokeData = await response.json();

  console.log("ChuckNorrisJoke");

  return (
    <div className="p-2 bg-yellow-100 rounded-lg shadow-md">
      {jokeData && (
        <div className="text-gray-700 text-center">
          <span role="img" aria-label="Chuck Norris" className="text-xl">
            🤠
          </span>
          <p className="mt-2">{jokeData.value}</p>
        </div>
      )}
    </div>
  );
};

export default ChuckNorrisJoke;
