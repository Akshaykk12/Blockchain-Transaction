//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

// import "hardhat/console.sol";                                                    //For Debugging

contract Token{
    string public name = "Psy Token" ;
    string public symbol = "PSY";
    uint public totalSupply = 10000;

    address public owner;

    mapping(address => uint) balances;          //This will tell how many tokens does that account has

    constructor(){
        balances[msg.sender] = totalSupply ;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external{
        // console.log("**Sender balance is %s tokens**",balance[msg.sender]);         //For Debugging
        // console.log("**Sender is sending %s token to %s address**",amount,to);      //For Debugging
        require(balances[msg.sender]>=amount,"Not enough Tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint){
        return balances[account];
    }
}