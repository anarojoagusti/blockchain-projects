// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Play2EarnRewardToken is ERC20, Ownable {
    uint256 public constant rewardRate = 1e15; // 0.001 POL per point
    mapping(address => bool) public hasClaimedReward;

    constructor(uint256 initialSupply) payable ERC20("Play2EarnToken", "P2E") Ownable(msg.sender){
        _mint(msg.sender, initialSupply);
        require(msg.value > 0, "Initial funding is required");
    }

    function rewardPlayer(uint256 score) external {
        require(score > 0, "Score must be greater than zero");
        require(!hasClaimedReward[msg.sender], "Reward already claimed");
        uint256 rewardAmount = score * rewardRate;
        require(balanceOf(owner()) >= rewardAmount, "Not enough tokens available");
        _transfer(owner(), msg.sender, rewardAmount);
        hasClaimedReward[msg.sender] = true;
    }
  
    function depositFunds() external onlyOwner payable {
        require(msg.value > 0, "Must send some funds");
    }

    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    } 
}
