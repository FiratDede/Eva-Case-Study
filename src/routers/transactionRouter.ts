import {Router} from "express";
import { addBuyTransaction, addSellTransaction } from "../controllers/transactionController";
import { catchErrorWrapper } from "../helpers/errorHelpers";

var router: Router = Router();

router.post("/buy",catchErrorWrapper(addBuyTransaction))

router.post("/sell",catchErrorWrapper(addSellTransaction))



export default router