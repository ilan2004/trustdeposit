import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  // For MVP/testing, use deployer as both backendSigner and arbitrator
  const backendSigner = deployer.address;
  const arbitrator = deployer.address;
  const TrustDeposit = await ethers.getContractFactory("TrustDeposit");
  const contract = await TrustDeposit.deploy(backendSigner, arbitrator);
  await contract.waitForDeployment(); // ethers v6
  console.log("TrustDeposit deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});