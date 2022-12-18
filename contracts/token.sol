//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

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
        require(balances[msg.sender]>=amount,"Not enough Tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
    function balanceOf(address account) external view returns (uint){
        return balances[account];
    }
}