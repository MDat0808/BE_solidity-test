import Web3 from "Web3";
import contractJSON from '../build/contracts/EtherWallet.json' assert { type: 'json' };

const web3 = new Web3('http://127.0.0.1:8545');
const contractABI = contractJSON.abi;
const contractAddress = "0x782f7c09d82CD7Ff903465c0Fa5Cc46ADB7D0014"; //Address Metamask
const contract = new web3.eth.Contract(contractABI, contractAddress);



const getPoints = async (req, res, next) => {
    try {
        let points = await contract.methods.getPoints().call({
        }); // Thay đổi địa chỉ tài khoản tại đây
        console.log(points);
        res.status(200).json({
            success: true,
            message: `So Points hien co la ${points}`,

        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message,
        })
    }

 }

const getBalance = async (req, res) => { 
    try {
        let balance = await web3.eth.getBalance('0xCDcFc4A0f6056b356c37d55fd11834f03FE2f9b7'); // Thay đổi địa chỉ tài khoản tại đây
        res.json({ newBalance: parseInt( balance)});
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


 export default {
    getPoints, getBalance,
 }