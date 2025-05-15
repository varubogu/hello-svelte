
/**
 * 天気APIのレスポンスの天気情報
 */
export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

/**
 * 天気APIのレスポンスのメイン情報
 */
export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

/**
 * 天気APIのレスポンスの風の情報
 */
export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

/**
 * 天気APIのレスポンスの雲の情報
 */
export interface Clouds {
    all: number;
}

/**
 * 天気APIのレスポンスのシステム情報
 */
export interface Sys {
    pod: string;
}

/**
 * 天気APIのレスポンスのリスト
 */
export interface ListItem {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
}

/**
 * 都市情報
 */
export interface City {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

/**
 * 天気APIのレスポンス
 */
export interface WeatherApiResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ListItem[];
    city: City;
}

/**
 * CloudflareKVと互換性のあるKVStoreの型
 */
export interface KVStore {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
    delete(key: string): Promise<void>;
    list(opts?: { prefix?: string }): Promise<string[]>;
  }