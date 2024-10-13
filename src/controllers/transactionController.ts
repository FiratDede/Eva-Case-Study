import { Request, Response, NextFunction } from "express";
import { Share, Portfolio, Transaction } from "../models/index"
import { CustomError } from "../helpers/errorHelpers";
import fs from "fs"
import { BuyOrSellRequestBody } from "../types/types";




export async function addBuyTransaction(req: Request<{}, {}, BuyOrSellRequestBody>, res: Response, next: NextFunction) {

    const { quantity, shareId, portfolioId } = req.body;
    const findedShare = await Share.findByPk(shareId);
    const findedPortfolio = await Portfolio.findByPk(portfolioId);
    
    if(quantity<=0){
        throw new CustomError(`Quantity must be bigger than 0`, 400)
    }
    if (!findedShare) {
        throw new CustomError(`Share with ${shareId} id not found`, 400)
    }

    if (!findedPortfolio) {
        throw new CustomError(`Portfolio with ${portfolioId} id not found`, 400)
    }


    const newTransaction = await Transaction.create({
        type: "BUY",
        quantity: quantity,
        price: findedShare.price,
        shareId: findedShare.id,
        portfolioId: findedPortfolio.id

    })

    fs.appendFile(`${findedPortfolio.username}_transactions.log`, 
        `Client ${findedPortfolio.username} Transaction: BUY SYMBOL: ${findedShare.symbol} PricePerShare: ${findedShare.price} Quantity: ${quantity}\n`,()=>{});

    res.json(newTransaction)
    return

}

export async function addSellTransaction(req: Request<{}, {}, BuyOrSellRequestBody>, res: Response, next: NextFunction) {

    const { quantity, shareId, portfolioId } = req.body;
    const findedShare = await Share.findByPk(shareId);
    const findedPortfolio = await Portfolio.findByPk(portfolioId);
   
    if(quantity<=0){
        throw new CustomError(`Quantity must be bigger than 0`, 400)
    }

    if (!findedShare) {
        throw new CustomError(`Share with ${shareId} id not found`, 400)
    }

    if (!findedPortfolio) {
        throw new CustomError(`Portfolio with ${portfolioId} id not found`, 400)
    }


    let boughtQuantity = await Transaction.sum("quantity", {
        where: {
            type: "BUY",
            shareId: findedShare.id,
            portfolioId: findedPortfolio.id
        },
    })

    if(!boughtQuantity){
        boughtQuantity = 0;
    }

    let soldQuantity = await Transaction.sum("quantity", {
        where: {
            type: "SELL",
            shareId: findedShare.id,
            portfolioId: findedPortfolio.id
        }
    })

    if(!soldQuantity){
        soldQuantity = 0;
    }

    const remainder: number = boughtQuantity -soldQuantity - quantity

    if (remainder < 0) {
        throw new CustomError("Unsufficient Quantity For Selling", 400)
    }

    const newTransaction = await Transaction.create({
        type: "SELL",
        quantity: quantity,
        price: findedShare.price,
        shareId: findedShare.id,
        portfolioId: findedPortfolio.id

    })

    fs.appendFile(`${findedPortfolio.username}_transactions.log`, 
        `Client ${findedPortfolio.username} Transaction: SELL SYMBOL: ${findedShare.symbol} PricePerShare: ${findedShare.price} Quantity: ${quantity}\n`,()=>{});

    res.json(newTransaction)
    return

}