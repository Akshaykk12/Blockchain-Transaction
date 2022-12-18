const {expect} = require("chai");

describe("Token Contract",function(){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, addrs]= await ethers.getSigners()
        hardhatToken= await Token.deploy();
    });

    describe("Deployment",function(){
        it("Should set the right owner", async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });
        it("Should assign the total supply of Tokens to the owner", async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transcations", function(){
        it("Should transfer tokens between accounts",async function(){
            await hardhatToken.transfer(addr1.address, 5);               //If we do not mention the sender address then the owner will be the sender
            const addr1Balance= await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address,5);
            const addr2Balance= await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(5);
        });
        it("Should fail if sender does not have enough balance",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(
                hardhatToken.connect(addr1).transfer(owner.address, 1)  //Initially addr1 has 0 tokens
                ).to.be.revertedWith("Not enough Tokens");
            expect (await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balances after transfers", async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address, 5);
            await hardhatToken.transfer(addr2.address, 10);

            const finalOwnerBalance= await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);

            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5)
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(10)
        })
    });
});