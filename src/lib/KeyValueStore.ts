

import { JsonKV } from './localKV';
import { CloudFlareKV } from './cloudFlareKV';
import type { KVStore } from './types';

let kv: KVStore;

if (process.env.KV_MODE === 'cloudFlare' && process.env.MY_KV_NAMESPACE) {

  kv = new CloudFlareKV(process.env.MY_KV_NAMESPACE); // Cloudflare上でバインドされたKV
} else {
  kv = new JsonKV();
}

export { kv };