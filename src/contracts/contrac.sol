// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./test.sol";

contract EtherWallet {
    using DynamicArray for DynamicArray.Bytes32Array;

    address payable public owner;
    DynamicArray.Bytes32Array private contractHistory;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {
        bytes32 dataHash = keccak256(abi.encodePacked(msg.value, block.timestamp));
        contractHistory.push(dataHash);
        autoWithdraw();
    }

    function autoWithdraw() private {
        require(address(this).balance > 0, "Khong co so du de rut");
        require(owner != address(0), "Chua co nguoi nhan duoc chi dinh");

        owner.transfer(address(this).balance);
    }

    function setOwner(address payable newOwner) external {
        require(msg.sender == owner, "Cut");

        owner = newOwner;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getContractHistory() external view returns (bytes32[] memory) {
        return contractHistory.toArray();
    }
}
