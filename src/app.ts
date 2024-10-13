import express from "express";
import transactionRouter from "./routers/transactionRouter"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 3000

// Start Server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
});

app.use("/transaction",transactionRouter)

// Middleware For Handling Errors
app.use(errorHandlerMiddleware)
