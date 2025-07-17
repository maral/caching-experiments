import fs from "fs/promises";
import path from "path";

const CACHE_DIR = path.resolve(".cache"); // relative to your project root

function keyToFilename(key) {
  // Replace unsafe characters with underscores and ensure human-readable filenames
  const safeKey = key.replace(/[^a-zA-Z0-9-_]/g, "_");
  return path.join(CACHE_DIR, safeKey);
}

export default class FileCacheHandler {
  constructor(options) {
    console.log("⚡ FileCacheHandler initialized");
    this.options = options;
    // ensure the cache dir exists
    fs.mkdir(CACHE_DIR, { recursive: true }).catch(() => {});
  }

  // read: return undefined on miss
  async get(key, ctx) {
    const { kind } = ctx;
    console.log("⚡ get", kind, "-", key);

    const file = keyToFilename(key);
    try {
      const raw = await fs.readFile(file, "utf-8");
      console.log("⚡ read file", file);
      const { value, expires } = JSON.parse(raw);
      console.log("⚡ value", value, "expires", expires);
      if (expires && Date.now() > expires) {
        await fs.unlink(file);
        return undefined;
      }
      return value;
    } catch {
      return undefined;
    }
  }

  async set(key, data, ctx) {
    console.log("⚡ set", key, "ctx:", ctx);
    const file = keyToFilename(key);
    const payload = JSON.stringify({
      value: data,
      lastModified: Date.now(),
      tags: ctx.fetchCache ? ctx.tags : [],
    });
    await fs.writeFile(file, payload, "utf-8");
  }

  async revalidateTag(tagsToRevalidate) {
    console.log("⚡ revalidateTag", tagsToRevalidate);
    tagsToRevalidate =
      typeof tagsToRevalidate === "string"
        ? [tagsToRevalidate]
        : tagsToRevalidate;
    // go through all files and remove those that match the tag
    const files = await fs.readdir(CACHE_DIR);
    for (const file of files) {
      const filePath = path.join(CACHE_DIR, file);
      try {
        const raw = await fs.readFile(filePath, "utf-8");
        const { tags } = JSON.parse(raw);
        if (tags && tags.length > 0) {
          // if any tag matches, delete the file
          for (const tag of tagsToRevalidate) {
            if (tags.includes(tag)) {
              await fs.unlink(filePath);
              break;
            }
          }
        }
      } catch {
        // ignore errors, just continue
      }
    }
  }

  // per-request, nothing to reset
  resetRequestCache() {}
}

// import fs from "fs/promises";
// import path from "path";
// import {
//   CacheHandler,
//   CacheHandlerContext,
// } from "next/dist/server/lib/incremental-cache";
// import {
//   IncrementalCacheValue,
//   SetIncrementalFetchCacheContext,
//   SetIncrementalResponseCacheContext,
// } from "next/dist/server/response-cache";

// const CACHE_DIR = path.resolve(".cache"); // relative to your project root

// function keyToFilename(key: string): string {
//   // Replace unsafe characters with underscores and ensure human-readable filenames
//   const safeKey = key.replace(/[^a-zA-Z0-9-_]/g, "_");
//   return path.join(CACHE_DIR, safeKey);
// }

// export default class FileCacheHandler implements CacheHandler {
//   private options: CacheHandlerContext;

//   constructor(options: CacheHandlerContext) {
//     this.options = options;
//     // ensure the cache dir exists
//     fs.mkdir(CACHE_DIR, { recursive: true }).catch(() => {});
//   }

//   // read: return undefined on miss
//   async get(...args: Parameters<CacheHandler["get"]>) {
//     const [key, ctx] = args;
//     const { kind } = ctx;
//     console.log(kind, "get", key);

//     const file = keyToFilename(key);
//     try {
//       const raw = await fs.readFile(file, "utf-8");
//       const { value, expires } = JSON.parse(raw);
//       if (expires && Date.now() > expires) {
//         await fs.unlink(file);
//         return undefined;
//       }
//       return value;
//     } catch {
//       return undefined;
//     }
//   }

//   async set(
//     key: string,
//     data: IncrementalCacheValue | null,
//     ctx: SetIncrementalFetchCacheContext | SetIncrementalResponseCacheContext
//   ) {
//     const file = keyToFilename(key);
//     const payload = JSON.stringify({
//       value: data,
//       lastModified: Date.now(),
//       tags: ctx.fetchCache ? ctx.tags : [],
//     });
//     await fs.writeFile(file, payload, "utf-8");
//   }

//   public async revalidateTag(
//     ...args: Parameters<CacheHandler["revalidateTag"]>
//   ) {
//     let [tagsToRevalidate] = args;
//     tagsToRevalidate =
//       typeof tagsToRevalidate === "string"
//         ? [tagsToRevalidate]
//         : tagsToRevalidate;
//     // go through all files and remove those that match the tag
//     const files = await fs.readdir(CACHE_DIR);
//     for (const file of files) {
//       const filePath = path.join(CACHE_DIR, file);
//       try {
//         const raw = await fs.readFile(filePath, "utf-8");
//         const { tags } = JSON.parse(raw);
//         if (tags && tags.length > 0) {
//           // if any tag matches, delete the file
//           for (const tag of tagsToRevalidate) {
//             if (tags.includes(tag)) {
//               await fs.unlink(filePath);
//               break;
//             }
//           }
//         }
//       } catch {
//         // ignore errors, just continue
//       }
//     }
//   }

//   // per-request, nothing to reset
//   resetRequestCache() {}
// }
