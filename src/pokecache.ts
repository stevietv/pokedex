type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        const cacheEntry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };

        this.#cache.set(key, cacheEntry);
    };

    get<T>(key: string) {
        return this.#cache.get(key)?.val;
    }

    #reap() {
        const now = Date.now()
        for (const [key, entry] of this.#cache) {
            if (entry.createdAt < now - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}