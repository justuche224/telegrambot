import axios from 'axios';
import type { CoinRankingApiResponse, Coin } from './types';

const API_URL = 'https://api.coinranking.com/v2/coins?limit=10&timePeriod=3h';

/**
 * Fetches cryptocurrency data from the CoinRanking API.
 * @returns {Promise<CoinRankingApiResponse | null>} The API response data or null if an error occurs.
 */
export async function fetchCryptoData(): Promise<CoinRankingApiResponse | null> {
  try {
    // API key if required by CoinRanking for production use
    // const response = await axios.get(API_URL, {
    //   headers: { 'x-access-token': 'YOUR_API_KEY' }
    // });
    const response = await axios.get<CoinRankingApiResponse>(API_URL);

    if (response.data.status === 'success') {
      return response.data;
    } else {
      console.error('CoinRanking API returned status:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching crypto data:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Formats the cryptocurrency data into a human-readable string.
 * @param {CoinRankingApiResponse} data - The data fetched from the CoinRanking API.
 * @returns {string} A formatted string summarizing the top coins.
 */
export function formatCryptoMessage(data: CoinRankingApiResponse): string {
  if (!data || data.status !== 'success' || !data.data?.coins?.length) {
    return 'Could not retrieve cryptocurrency data at this time.';
  }

  const topCoins = data.data.coins.slice(0, 10);

  let message = '<b>📊 Top 10 Crypto Updates (Last 3h):</b>\n\n';

  topCoins.forEach((coin: Coin) => {
    const price = parseFloat(coin.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const change = parseFloat(coin.change);
    const changeSymbol = change > 0 ? '📈' : (change < 0 ? '📉' : '➡️');
    message += `<b>${coin.name} (${coin.symbol})</b>\n`;
    message += `  Price: ${price}\n`;
    message += `  Change: ${changeSymbol} ${change}%\n\n`; // Added newline for spacing
  });

  // Add market stats if needed
  const stats = data.data.stats;
  message += `\n<b>Market Stats:</b>\n`;
  message += `  Total Coins: ${stats.totalCoins.toLocaleString()}\n`;
  message += `  Total Market Cap: ${parseFloat(stats.totalMarketCap).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}\n`; // Note: API gives short string, this might not be accurate
  message += `  Total 24h Vol: ${parseFloat(stats.total24hVolume).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}\n`;

  return message;
} 