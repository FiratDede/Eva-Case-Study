# Eva Case Study Solution
This repo is created for Eva case study solution. We have an Express.js server, which runs on 3000 port. This server consists of two routes, which are **"http://localhost:3000/transaction/buy"** and **"http://localhost:3000/transaction/sell"** respectively.
## Used Technologies
Nodejs, Express.js, Typescript, Sequalize, Postgresql
## How To Run
* Firstly, you need to configure your database settings. To do this, create an `.env` file in the root directory with the format below:
    ```
    DB_NAME=your_db_name 
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    ```
* Don't forget to create your db before running the server application.
* Now you can run server by running the command below in root directory.
`npm run build` 
## Some Notes
* When you restart the server all db tables are deleted. Then your db tables are created from scratch automatically.
* When you run the server, **initializeDatabase** function in **"/models/index.ts"** is called. This function adds 5 shares and 5 user portfolios and does a buy and a sell operation for each user. You can view these transaction operations in log files formatted as **"username_transaction.log"**
* You can find my postman collection in **"Eva Case Study.postman_collection.json"** file.