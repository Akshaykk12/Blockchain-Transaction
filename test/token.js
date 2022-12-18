const {expect} = require("chai");

describe("Token contract", function() {

    it("Deployment should assign the total supply of tokens to the owner",async function(){
        const [owner] = await ethers.getSigners();                      //Can access account details through getSigners

        const Token = await ethers.getContractFactory("Token");         //Creates Instance of the contract

        const hardhatToken = await Token.deploy();                      //Deployment of that instance in hardhat

        const ownerBalance = await hardhatToken.balanceOf(owner.address)//ownerBalance = 10000

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance) //total Supply= 10000(chai library) checking
    });
    it("Should transfer tokens between accounts",async function(){
        const [owner, add1, add2] = await ethers.getSigners();                      //Can access account details through getSigners

        const Token = await ethers.getContractFactory("Token");         //Creates Instance of the contract

        const hardhatToken = await Token.deploy();                      //Deployment of that instance in hardhat
        //Transfer 10 tokens from owner to add1

        await hardhatToken.transfer(add1.address, 10);
        expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);

        //Transfer 5 token from add1 to add2
        await hardhatToken.connect(add1).transfer(add2.address, 5);
        expect(await hardhatToken.balanceOf(add2.address)).to.equal(5);
    });
});