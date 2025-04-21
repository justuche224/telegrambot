interface Stats {
    total: number;
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string; // Note: This is a string in the example
    total24hVolume: string; // Note: This is a string in the example
  }
  
  export interface Coin {
    uuid: string;
    symbol: string;
    name: string;
    color: string;
    iconUrl: string;
    marketCap: string; // Note: This is a string
    price: string; // Note: This is a string
    listedAt: number; // Unix timestamp
    tier: number;
    change: string; // Percentage change as a string
    rank: number;
    sparkline: (string | null)[]; // Array of strings (prices) or null
    lowVolume: boolean;
    coinrankingUrl: string;
    '24hVolume': string; // Note: This is a string and key starts with a number
    btcPrice: string; // Price relative to BTC as a string
    contractAddresses: string[]; // Assuming array of strings, might be empty
  }
  
  interface CoinRankingData {
    stats: Stats;
    coins: Coin[];
  }
  
  export interface CoinRankingApiResponse {
    status: "success" | "fail" | string; // Assuming 'success' is common, but allow others
    data: CoinRankingData;
  }

// --- Add News API Types ---
interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO 8601 date string
  content: string | null;
}

export interface NewsApiResponse {
  status: "ok" | "error";
  totalResults?: number;
  articles?: Article[];
  code?: string; // Error code
  message?: string; // Error message
}
// --- End News API Types ---