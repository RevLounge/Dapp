var Rewards = artifacts.require("Rewards.sol");
var ReputationToken = artifacts.require("ReputationToken.sol");
var AwardsToken = artifacts.require("AwardsToken.sol");

module.exports = async function(deployer) {
  await deployer.deploy(ReputationToken);
  const reputationToken = await ReputationToken.deployed();

  await deployer.deploy(AwardsToken);
  const awardsToken = await AwardsToken.deployed();

  await deployer.deploy(Rewards, reputationToken.address, awardsToken.address);
};
