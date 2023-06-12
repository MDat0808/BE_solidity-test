// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library DynamicArray {
    struct Bytes32Array {
        bytes32[] array;
    }

    function push(Bytes32Array storage self, bytes32 value) internal {
        self.array.push(value);
    }

    function length(Bytes32Array storage self) internal view returns (uint256) {
        return self.array.length;
    }

    function toArray(Bytes32Array storage self) internal view returns (bytes32[] memory) {
        return self.array;
    }
}