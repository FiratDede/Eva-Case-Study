import 'dotenv/config'
import Share from "./share";
import Portfolio from "./portfolio";
import Transaction from "./transaction";
import { sequelize } from "../helpers/db";
import { default as fetch, Headers } from 'node-fetch';

Transaction.belongsTo(Share, { foreignKey: "shareId" });
Share.hasMany(Transaction, { foreignKey: "shareId" })

Portfolio.hasMany(Transaction, { foreignKey: "portfolioId" });
Transaction.belongsTo(Portfolio, { foreignKey: "portfolioId" })

async function initializeDatabase() {
  try {
    // Check DB Connection
    await sequelize.authenticate();
    console.log('DB connection has been established successfully.');

    // Sync DB
    await sequelize.sync({ force: true }); // Create tables from scratch
    console.log('Db syncronized!');

    // Add 5 shares
    await Share.bulkCreate([
      { id: 1, symbol: 'ABC', price: 10.40 },
      { id: 2, symbol: 'DEF', price: 23.10 },
      { id: 3, symbol: 'GHI', price: 8.22 },
      { id: 4, symbol: 'JKL', price: 44.44 },
      { id: 5, symbol: 'MNZ', price: 77.05 },
    ]);

    // Add 5 portfolios
    await Portfolio.bulkCreate([
      { id: 1, username: "User1" },
      { id: 2, username: "User2" },
      { id: 3, username: "User3" },
      { id: 4, username: "User4" },
      { id: 5, username: "User5" },
    ]);

    console.log('Data added successfully');

    console.log("Sending some transaction requests")
    for (let i = 0; i < 5; ++i) {
      const randomShareId = Math.floor(Math.random() * 5) + 1; // Between 1 and 5
      const randomQuantityForBuy = Math.floor(Math.random() * 20) + 1; // Between 1 and 20
      const randomQuantityForSell = Math.floor(Math.random() * randomQuantityForBuy) + 1; // Between 1 and randomQuantityForBuy

      // Buy Shares
      await fetch("http://localhost:3000/transaction/buy",
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify({
            "quantity": randomQuantityForBuy,
            "shareId": randomShareId,
            "portfolioId": i + 1
          })
        })

      // Sell Shares
      await fetch("http://localhost:3000/transaction/sell",
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify({
            "quantity": randomQuantityForSell,
            "shareId": randomShareId,
            "portfolioId": i + 1
          })
        })
    }
    console.log("Transaction Request Sending Done")

  } catch (error) {
    console.error('Error:', error);
  }
}

initializeDatabase();



export {
  Share,
  Portfolio,
  Transaction,
};