# SecuredStockPriceChecker

**SecuredStockPriceChecker** is a secure web application that allows users to view live stock prices and track likes for stocks. It provides endpoints for fetching stock data, including price and likes, while protecting user privacy and ensuring secure communication with API providers.

---

## Features

- **Live Stock Price Fetching**: Retrieves real-time stock prices from external APIs.
- **Stock Liking System**: Users can like stocks to register their preferences, and likes are tracked securely.
- **Support for Single and Multiple Stocks**: View information for one or two stocks at a time.
- **Secure Communication**: Uses HTTPS and other security practices like Helmet for enhanced protection.
  
---

## Technologies Used

- **Node.js** for the backend
- **Express.js** for routing and middleware
- **Helmet** for securing HTTP headers
- **Chai & Mocha** for testing
- **External APIs** for fetching stock prices (API implementation to be added)

---

## Prerequisites

- Node.js installed on your machine (Download from [here](https://nodejs.org/)).
- Access to a stock price API service (e.g., Alpha Vantage, Yahoo Finance) to get real-time stock prices.
- A `.env` file with your API key for stock data retrieval.

---

## Installation

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Azaam86msn/SecuredStockPriceChecker.git
cd SecuredStockPriceChecker
```

### Step 2: Install Dependencies

Run the following command to install required dependencies:

```bash
npm install
```

### Step 3: Configure the API Key

Create a `.env` file in the root directory and add your stock API key:

```bash
STOCK_API_KEY=your_api_key_here
```

Ensure this file is not publicly shared or committed to version control.

### Step 4: Start the Application

Run the application locally by using:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

---

## API Endpoints

### `GET /api/stock-prices`

Fetch stock data for a given stock or a pair of stocks.

**Query Parameters:**
- `stock`: A single stock symbol (e.g., "GOOG") or an array of two stock symbols (e.g., `["GOOG", "AAPL"]`).
- `like` (optional): Set to `'true'` to like the stock (or stocks). This will track user interactions with the stock.

#### Example Requests:

- **Get data for one stock:**

  ```bash
  GET /api/stock-prices?stock=GOOG
  ```

- **Get data for two stocks:**

  ```bash
  GET /api/stock-prices?stock=GOOG,AAPL
  ```

- **Like one stock:**

  ```bash
  GET /api/stock-prices?stock=GOOG&like=true
  ```

- **Like two stocks:**

  ```bash
  GET /api/stock-prices?stock=GOOG,AAPL&like=true
  ```

**Response Structure:**

- For one stock:

  ```json
  {
    "stockData": {
      "stock": "GOOG",
      "price": 2745.20,
      "likes": 5
    }
  }
  ```

- For two stocks:

  ```json
  {
    "stockData": [
      {
        "stock": "GOOG",
        "price": 2745.20,
        "rel_likes": 10
      },
      {
        "stock": "AAPL",
        "price": 145.30,
        "rel_likes": -10
      }
    ]
  }
  ```

---

## Running Tests

The app includes a set of functional tests using Chai and Mocha. To run the tests, use:

```bash
npm test
```

This will run the predefined tests and check the validity of the API endpoints.

---

## Security Enhancements

The application uses [Helmet](https://www.npmjs.com/package/helmet) to set various HTTP headers for enhanced security, including:
- Content Security Policy (CSP)
- XSS protection
- Frameguard (prevents clickjacking)
- HSTS (HTTP Strict Transport Security)

These measures ensure that the application is protected against common security vulnerabilities.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Node.js](https://nodejs.org/) for providing the runtime environment.
- [Express.js](https://expressjs.com/) for the lightweight web framework.
- [Helmet](https://www.npmjs.com/package/helmet) for security hardening.

---
