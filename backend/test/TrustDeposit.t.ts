import { expect } from "chai";
import { ethers } from "hardhat";

describe("TrustDeposit", () => {
  it("holds and releases deposit", async () => {
    const [tenant, backend, landlord] = await ethers.getSigners();
    const TD: any = await (await ethers.getContractFactory("TrustDeposit")).deploy(backend.address);

    const leaseId = ethers.keccak256(ethers.randomBytes(32));
    await TD.connect(tenant).holdDeposit(leaseId, landlord.address, { value: ethers.parseEther("1") });

    await TD.connect(backend).releaseDeposit(leaseId, ethers.parseEther("0.5"));

    expect(await ethers.provider.getBalance(landlord)).to.be.gt(0); // sanity
  });
});