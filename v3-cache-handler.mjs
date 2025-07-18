const cache = new Map();
const pendingSets = new Map();
// const tagsManifest = new Map();

const CacheHandler = {
  /** Retrieve a cache entry if present and not stale. */
  async get(cacheKey) {
    if (pendingSets.has(cacheKey)) {
      console.log(`⌛ Waiting on pending set for key "${cacheKey}"`);
      try {
        // Wait for any ongoing set() for this key to finish
        await pendingSets.get(cacheKey);
      } catch (e) {
        // Ignore errors from pending set – treat as cache miss if failed
        console.log(`⚠️ Pending set for "${cacheKey}" failed:`, e);
      }
    }

    const entry = cache.get(cacheKey);
    if (!entry) {
      console.log(`👉 MISS for "${cacheKey}"`);
      console.log(
        `🔍 Current cache keys:\n- ${[...cache.keys()].join("\n- ")}`
      );
      return undefined;
    }
    // Check soft tag timestamps to determine staleness
    const isStale = softTags.some((tag) => {
      const expTime = this.tagsManifest.get(tag) || 0;
      return expTime > entry.lastModified;
    });
    console.log(
      `👉 HIT for "${cacheKey}" (tags: ${JSON.stringify(
        softTags
      )}; stale? ${isStale})`
    );
    return isStale ? undefined : entry.value;
  },

  /** Store a cache entry. `pendingEntry` is awaited (it may be a still-streaming value). */
  async set(cacheKey, pendingEntry) {
    console.log(`💾 set("${cacheKey}") – start`);

    let resolvePending = () => {};
    const pendingPromise = new Promise((resolve) => {
      resolvePending = resolve;
    });
    pendingSets.set(cacheKey, pendingPromise);

    try {
      const entry = await pendingEntry;
      console.log(`💾 set("${cacheKey}") – entry resolved:`, entry);
      let size = 0;

      const [value, clonedValue] = entry.value.tee();
      entry.value = value;
      const reader = clonedValue.getReader();

      for (let chunk; !(chunk = await reader.read()).done; ) {
        const chunkSize = Buffer.from(chunk.value).byteLength;
        size += chunkSize;
        console.log(`💾 set("${cacheKey}") – read chunk of size: ${chunkSize}`);
      }

      cache.set(cacheKey, {
        entry,
        isErrored: false,
        errorRetryCount: 0,
        size,
      });

      console.log(`✅ Cached "${cacheKey}" successfully with size: ${size}`);
    } catch (err) {
      console.log(`❌ Error caching "${cacheKey}":`, err);
    } finally {
      resolvePending();
      pendingSets.delete(cacheKey);
      console.log(
        `💾 set("${cacheKey}") – finished and removed from pendingSets`
      );
    }
  },

  /** Refresh local tags state (not needed for memory cache). */
  async refreshTags() {
    // No external tags to sync in this implementation
    return;
  },

  /** Get the latest revalidation timestamp of the given tags. */
  async getExpiration(...tags) {
    // Max timestamp of any provided tag invalidation, or 0 if none
    const maxTs = Math.max(
      0,
      ...tags.map((tag) => this.tagsManifest.get(tag) ?? 0)
    );
    console.log(`🔎 getExpiration(${tags.join(", ")}) -> ${maxTs}`);
    return maxTs || 0;
  },

  /** Mark the given tags as expired (called on revalidateTag or revalidatePath). */
  async expireTags(...tags) {
    const now = Date.now();
    for (const tag of tags) {
      this.tagsManifest.set(tag, now);
    }
    console.log(`⚠️ Tags invalidated: ${tags.join(", ")} at ${now}`);
  },
};

export default CacheHandler;
