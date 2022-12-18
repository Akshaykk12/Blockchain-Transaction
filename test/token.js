const {expect} = require("chai");

describe("Token contract", function() {

    it("Deployment should assign the total supply of tokens to the owner",async function(){
        const [owner] = await ethers.getSigners();                      //Can access account details through getSigners

        console.log("Signers object:", owner);
        const Token = await ethers.getContractFactory("Token");         //Creates Instance of the contract

        const hardhatToken = await Token.deploy();                      //Deployment of that instance in hardhat

        const ownerBalance = await hardhatToken.balanceOf(owner.address)//ownerBalance = 10000
        console.log("Owner Address:", owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance) //total Supply= 10000(chai library) checking
    })
})