import axios from 'axios';
import type { NewsApiResponse, Article } from './types';

const NEWS_API_KEY = process.env.NEWS_API_ORG_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=crypto&pageSize=5&apiKey=${NEWS_API_KEY}`;

/**
 * Fetches recent cryptocurrency news from the NewsAPI.
 * @returns {Promise<NewsApiResponse | null>} The API response data or null if an error occurs.
 */
export async function fetchCryptoNews(): Promise<NewsApiResponse | null> {
  if (!NEWS_API_KEY) {
    console.error('NewsAPI key is missing. Please set the NEWS_API_KEY environment variable.');
    return null;
  }

  try {
    const response = await axios.get<NewsApiResponse>(NEWS_API_URL);

    if (response.data.status === 'ok') {
      return response.data;
    } else {
      // Handle API-specific errors (e.g., invalid key)
      console.error(`NewsAPI returned status: ${response.data.status}`, response.data.message);
      return response.data; // Return the error response for potential handling
    }
  } catch (error) {
    console.error('Error fetching crypto news:', error instanceof Error ? error.message : error);
    // Check if it's an Axios error for more details
    if (axios.isAxiosError(error) && error.response) {
      console.error('NewsAPI error details:', error.response.data);
    }
    return null;
  }
}

/**
 * Formats the news articles into a human-readable string.
 * @param {NewsApiResponse} data - The data fetched from the NewsAPI.
 * @returns {string} A formatted string summarizing the top news articles.
 */
export function formatNewsMessage(data: NewsApiResponse): string {
  if (!data || data.status !== 'ok' || !data.articles?.length) {
    let errorMessage = 'Could not retrieve cryptocurrency news at this time.';
    if(data?.status === 'error') {
        errorMessage += ` (API Error: ${data.message || 'Unknown'})`;
    }
    return errorMessage;
  }

  let message = '<b>📰 Latest Crypto News:</b>\n\n';

  data.articles.forEach((article: Article, index: number) => {
    message += `${index + 1}. <a href="${article.url}">${article.title}</a>\n`;
    message += `   <i>Source: ${article.source.name}</i>\n\n`;
  });

  return message;
} 