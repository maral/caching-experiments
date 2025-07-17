const cache = new Map();

export default class CacheHandler {
  constructor(options) {
    console.log("⚡ MemoryCacheHandler initialized");
    this.options = options;
  }

  async get(key) {
    // This could be stored anywhere, like durable storage
    console.log(`⚡ get '${key}'`);
    return cache.get(key);
  }

  async set(key, data, ctx) {
    console.log(`⚡ set '${key}' with ctx: ${JSON.stringify(ctx)}`);
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags ?? [],
    });
  }

  async revalidateTag(tags) {
    console.log("⚡ revalidateTag", tags);
    // tags is either a string or an array of strings
    tags = [tags].flat();
    // Iterate over all entries in the cache
    for (let [key, value] of cache) {
      console.log(
        `⚡ checking key '${key}' for tags: ${JSON.stringify(value)}`
      );
      // If the value's tags include the specified tag, delete this entry
      if (value.tags.some((tag) => tags.includes(tag))) {
        cache.delete(key);
      }
    }
  }

  // If you want to have temporary in memory cache for a single request that is reset
  // before the next request you can leverage this method
  resetRequestCache() {
    console.log("⚡ resetRequestCache");
  }
}
