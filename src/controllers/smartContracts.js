import Web3 from "Web3";
import contractJSON from '../build/contracts/EtherWallet.json' assert { type: 'json' };

const web3 = new Web3('http://127.0.0.1:8545');
const contractABI = contractJSON.abi;
const contractAddress = "0x782f7c09d82CD7Ff903465c0Fa5Cc46ADB7D0014"; //Address Metamask
const contract = new web3.eth.Contract(contractABI, contractAddress);


const transactionETH = async (req, res, next) => {
  const { receiver, amount} = req.body;
    try {
      const amountToSend = web3.utils.toWei(`${amount}`, 'ether');
      let transaction = await contract.methods.autoWithdraw().send({
        from: "0xCDcFc4A0f6056b356c37d55fd11834f03FE2f9b7",
        value: amountToSend,
        to: receiver
      });
      const transactionHash = transaction.transactionHash;
      const receipt = await web3.eth.getTransactionReceipt(transactionHash);

      if (receipt.status) {
        res.status(200).json({
              success: true,
              message: `Giao dich thanh cong, ban vua gui ${amount} ETH` ,
              amountToSend: parseInt(amountToSend)
          })
      } else {
        res.json({ success: false, message: 'Gọi hàm thất bại' });
      }
        
      } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: `Giao dich that bai vui long thu lai`,
            error: error.message
         });
      }
 }


 
export default {
    transactionETH,
}