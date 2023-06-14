// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./test.sol";

contract EtherWallet {
    using DynamicArray for DynamicArray.Bytes32Array;

    address payable public owner;
DynamicArray.Bytes32Array private contractHistory;
uint256 public points_sum;
uint public chapter;


constructor() {
    owner = payable(msg.sender);
}

receive() external payable {
    bytes32 dataHash = keccak256(abi.encodePacked(msg.value, block.timestamp));
    contractHistory.push(dataHash);
    autoWithdraw();
}

function autoWithdraw() public {
    require(address(this).balance > 0, "Khong co so du de rut");
    require(owner != address(0), "Chua co nguoi nhan duoc chi dinh");

    uint256 amount = address(this).balance;
    uint256 convertedPoints = amount * 5/1000000000000000000; // Quy đổi số Ether thành số điểm
    require(convertedPoints>=5, "quqn qeu");
    uint256 points = 0;
    points += convertedPoints; // Cộng số điểm đã quy đổi vào biến points
    owner.transfer(amount); // Chuyển số Ether cho người nhận
    points_sum += points;
}

function getPoints()external view returns (uint256){
    return points_sum;

}

function unlockChapter()external {
    points_sum = points_sum -  5;
    chapter +=1;
}

function generateRandomAndSum() external view returns (uint) {
        require(chapter >= 1);

        uint sum = 0;
        uint threshold = 80; // Ngưỡng để gán giá trị là 10

        for (uint i = 0; i < chapter; i++) {
            uint randomNumber = uint(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, i)));
            uint randomInRange = (randomNumber % 100) + 1;
            
            if (randomInRange <= threshold) {
                randomInRange = 10;
            }
            
            sum += randomInRange;
        }

        return sum;
    }

function resetSumPoints()external {
    points_sum = 0;    
}





function getBalance() external view returns (uint256) {
    return address(this).balance;
}

function getContractHistory() external view returns (bytes32[] memory) {
    return contractHistory.toArray();
}
}