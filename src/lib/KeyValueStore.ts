

import { JsonKV } from './localKV';
import { CloudFlareKV } from './cloudFlareKV';
import type { KVStore } from './types';
import { KV_MODE, MY_KV_NAMESPACE } from '$env/static/private';

let kv: KVStore;

if (KV_MODE === 'cloudFlare' && MY_KV_NAMESPACE) {

  kv = new CloudFlareKV(MY_KV_NAMESPACE); // Cloudflare上でバインドされたKV
} else {
  kv = new JsonKV();
}

export { kv };