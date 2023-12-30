import express from "express";
import { fetchData } from "./index.js";
import "dotenv/config";
import cors from 'cors'

import {
  SERVER_BASE_ENDPOINT,
  SERVER_ENDPOINTS,
  COINGECKO_BASE_ENDPOINT,
  COINGECKO_ENDPOINTS,
} from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const DEMO_10K_API_KEY = process.env.DEMO_10K_API_KEY;
console.log(DEMO_10K_API_KEY);
// Build the Coingecko API URL with the provided endpoints and parameters
function buildUrl(endpoints, params = {}) {
  const paramString = new URLSearchParams(params);
  return `${COINGECKO_BASE_ENDPOINT}${endpoints}?${paramString.toString()}&${DEMO_10K_API_KEY}`;
}

async function handleApiError(requestFn, res, ...params) {
  console.log("running");
  try {
    const response = await requestFn(...params);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// get tickers price
app.get(
  `${SERVER_BASE_ENDPOINT}${SERVER_ENDPOINTS.TICKERS.PRICES}`,
  async (req, res) => {
    const { tickers, currency = "usd" } = req.query;
    const apiUrl = buildUrl(
      `${COINGECKO_ENDPOINTS.SIMPLE}${COINGECKO_ENDPOINTS.PRICE}`,
      { ids: tickers, vs_currencies: currency }
    );

    handleApiError(fetchData, res, apiUrl);
  }
);

// get tickers detail
app.get(
  `${SERVER_BASE_ENDPOINT}${SERVER_ENDPOINTS.TICKERS.DETAIL}`,
  async (req, res) => {
    const { ticker } = req.query;
    const apiUrl = buildUrl(`${COINGECKO_ENDPOINTS.COINS}/${ticker}`);

    handleApiError(fetchData, res, apiUrl);
  }
);

/**
 * Get multiple tickers detail
 * @param {string} tickers - ticker ID
 * @param {string} currency - default = USD
 * @param {string} locale - default = EN
 */

app.get(
  `${SERVER_BASE_ENDPOINT}${SERVER_ENDPOINTS.TICKERS.MULTI_DETAILS}`,
  async (req, res) => {
    const { tickers, currency = "usd", locale = "en" } = req.query;
    const apiUrl = buildUrl(
      `${COINGECKO_ENDPOINTS.COINS}${COINGECKO_ENDPOINTS.MARKETS}`,
      { vs_currency: currency, ids: tickers, sparkline: false, locale: locale }
    );

    handleApiError(fetchData, res, apiUrl);
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
