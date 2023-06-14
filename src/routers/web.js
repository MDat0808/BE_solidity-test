import express from "express";
import smartContracts from "../controllers/smartContracts.js"
import getContracts from "../controllers/getContracts.js"


const router = express.Router()

const initWebRouters = (app) => {


    router.post('/api/transaction',smartContracts.transactionETH)
    router.get('/api/get_points',getContracts.getPoints)
    router.get('/api/get_balance',getContracts.getBalance)


    return app.use('/', router)
}

export default initWebRouters;