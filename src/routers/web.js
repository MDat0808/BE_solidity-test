import express from "express";
import Web3 from "Web3";
import contractJSON from '../build/contracts/EtherWallet.json' assert { type: 'json' };


const web3 = new Web3('http://127.0.0.1:8545');
const contractABI = contractJSON.abi;
const contractAddress = "0x782f7c09d82CD7Ff903465c0Fa5Cc46ADB7D0014"; //Address Metamask
const contract = new web3.eth.Contract(contractABI, contractAddress);
let router = express.Router();

console.log(contractABI)


const initWebRouters = (app) => {

    router.get('/getBalance', async (req , res) => {
        let balance = await web3.eth.getBalance('0x3Ef09947EbDce3AbB79029E4604EAc6d65Fa1073'); // Thay đổi địa chỉ tài khoản tại đây
        let newBalance = balance.toString();
        res.json({ newBalance: parseInt(newBalance )});
    })


    router.get('/getContractHistory', async (req, res) => {
        let contractHistory = await web3.eth.getContractHistory().call();
        res.json({ contractHistory: contractHistory})
    })

    return app.use('/', router)
}

export default initWebRouters;