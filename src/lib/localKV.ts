import fs from 'fs/promises';
import path from 'path';
import type { KVStore } from './types';

const DB_FILE = path.resolve('./local-kv.json');

type Entry = { value: string; expireAt?: number };

export class JsonKV implements KVStore {
  private store: Record<string, Entry> = {};

  constructor() {
    this.load();
  }

  private async load() {
    try {
      const data = await fs.readFile(DB_FILE, 'utf-8');
      this.store = JSON.parse(data);
    } catch {
      this.store = {};
    }
  }

  private async persist() {
    await fs.writeFile(DB_FILE, JSON.stringify(this.store, null, 2), 'utf-8');
  }

  async get(key: string): Promise<string | null> {
    const entry = this.store[key];
    if (!entry) return null;
    if (entry.expireAt && Date.now() > entry.expireAt) {
      delete this.store[key];
      await this.persist();
      return null;
    }
    return entry.value;
  }

  async put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void> {
    const expireAt = opts?.expirationTtl ? Date.now() + opts.expirationTtl * 1000 : undefined;
    this.store[key] = { value, expireAt };
    await this.persist();
  }

  async delete(key: string): Promise<void> {
    delete this.store[key];
    await this.persist();
  }

  async list(opts?: { prefix?: string }): Promise<string[]> {
    const now = Date.now();
    return Object.keys(this.store).filter(key => {
      const entry = this.store[key];
      if (entry.expireAt && now > entry.expireAt) return false;
      return opts?.prefix ? key.startsWith(opts.prefix) : true;
    });
  }
}