import { json } from '@sveltejs/kit';
import { OPENWEATHER_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { WeatherApiResponse } from '$lib/types';
import { kv } from '$lib/KeyValueStore';

/**
 * 天気データを取得するAPI
 * @param url
 * @returns
 */
export const GET: RequestHandler = async ({ url }) => {
  try {
    const location = url.searchParams.get('q');
    if (!location) {
      return new Response('場所が指定されていません', { status: 400 });
    }

    const weatherData = await _getWeatherCache(location);
    if (!weatherData) {
      return new Response('天気データの取得に失敗しました', { status: 500 });
    }

    // 結果をキャッシュするためのヘッダーを設定
    return json(weatherData, {
      headers: {
        'Cache-Control': 'max-age=3600' // 1時間キャッシュ
      }
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return new Response('サーバーエラーが発生しました', { status: 500 });
  }
};

const CACHE_TTL = 3600000; // 1時間 (ミリ秒)

async function _getWeatherCache(locationCode: string): Promise<WeatherApiResponse> {

  const cachedData = await kv.get(locationCode);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const apiKey = OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('APIキーが設定されていません');
  }

  const now = Date.now();

  // キャッシュがあり、有効期限内であれば使用
  if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }

  // キャッシュがないか期限切れの場合は新しく取得
  const weatherData = await _getWeatherAPI(locationCode, apiKey);

  // キャッシュに保存
  kv.put(locationCode, JSON.stringify(weatherData));


  return weatherData;
}

/**
 * OpenWeatherMapから天気データを取得する
 * @param locationCode 場所のコード（Tokyoなど）
 * @param apiKey APIキー
 * @returns 天気データのJSON
 */
async function _getWeatherAPI(locationCode: string, apiKey: string): Promise<WeatherApiResponse> {
    // 5日間予報APIのURL
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = new URL(baseUrl);

    // クエリパラメータの設定
    url.searchParams.set('q', locationCode);
    url.searchParams.set('appid', apiKey);
    url.searchParams.set('units', 'metric');
    url.searchParams.set('lang', 'ja');

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}



