'use strict';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      try {
        // Extract the stock symbol(s) and like parameter from the query
        const stock = req.query.stock; // Can be a single stock or an array of stocks
        const like = req.query.like === 'true'; // Check if the 'like' parameter is set to true

        // Define a function to get the stock price (you may need to implement this function)
        const getStockData = async (symbol) => {
          // Fetch the stock price from an API (this could be a third-party API or a database)
          const stockPrice = await fetchStockPriceFromAPI(symbol); // Placeholder for actual fetch function
          
          // Retrieve or initialize likes for the stock symbol
          const likes = await getLikes(symbol, req.ip, like); // Implement this to track likes and IPs

          return {
            stock: symbol,
            price: stockPrice,
            likes: likes
          };
        };

        let stockData;
        if (Array.isArray(stock)) {
          // If two stocks are provided, get data for both and calculate rel_likes
          const stock1 = await getStockData(stock[0]);
          const stock2 = await getStockData(stock[1]);
          const rel_likes = stock1.likes - stock2.likes;

          stockData = [
            { ...stock1, rel_likes },
            { ...stock2, rel_likes: -rel_likes }
          ];
        } else {
          // If a single stock is provided, get data for just that stock
          stockData = await getStockData(stock);
        }

        res.json({ stockData });

      } catch (error) {
        console.error("Error retrieving stock data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
};

// Helper function to fetch stock price from an external API (to be implemented)
async function fetchStockPriceFromAPI(symbol) {
  // Example placeholder for actual API call to get stock price
  return Math.random() * 100; // Replace with actual API response
}

// Helper function to handle likes and IP tracking (to be implemented)
async function getLikes(symbol, ip, like) {
  // Anonymize the IP address, check if the user already liked, and save like if needed
  const anonymizedIP = anonymizeIP(ip); // Implement this to anonymize the IP
  // Retrieve likes from a database or cache, or initialize if first-time entry

  return 0; // Placeholder for actual likes count
}

// Helper function to anonymize IP addresses (to be implemented)
function anonymizeIP(ip) {
  // Implement a way to hash or partially mask the IP for privacy
  return ip; // Replace with anonymized IP
}
