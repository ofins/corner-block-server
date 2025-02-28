# Corner Block Server - Portal API

This project is an Express.js server that provides endpoints to fetch cryptocurrency data from the Coingecko API.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd corner-block-server/portal-api
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   DEMO_10K_API_KEY=<your-demo-10k-api-key>
   ```

## Running the Server

To start the server, run:

```sh
npm start
```

The server will start on the port specified in the `.env` file (default is 3000).

## API Endpoints

### Get Tickers Price

- **Endpoint:** `GET /api/tickers/prices`
- **Query Parameters:**
  - `tickers` (required): Comma-separated list of ticker IDs
  - `currency` (optional): Currency code (default is `usd`)

### Get Tickers Detail

- **Endpoint:** `GET /api/tickers/detail`
- **Query Parameters:**
  - `ticker` (required): Ticker ID

### Get Multiple Tickers Detail

- **Endpoint:** `GET /api/tickers/multi-details`
- **Query Parameters:**
  - `tickers` (required): Comma-separated list of ticker IDs
  - `currency` (optional): Currency code (default is `usd`)
  - `locale` (optional): Locale code (default is `en`)

## License

This project is licensed under the MIT License.
