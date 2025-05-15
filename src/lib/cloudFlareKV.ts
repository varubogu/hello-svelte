import type { KVStore } from "./types";

export class CloudFlareKV implements KVStore {
    constructor(private kv: KVStore) {}

    async get(key: string) {
      return await this.kv.get(key);
    }

    async put(key: string, value: string, opts?: { expirationTtl?: number }) {
      await this.kv.put(key, value, { expirationTtl: opts?.expirationTtl });
    }

    async delete(key: string) {
      await this.kv.delete(key);
    }

    async list(opts?: { prefix?: string }): Promise<string[]> {
      const result = await this.kv.list({ prefix: opts?.prefix });
      return result.keys.map(k => k.name);
    }
  }