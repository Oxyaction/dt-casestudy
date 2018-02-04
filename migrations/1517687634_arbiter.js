const Arbiter = artifacts.require('Arbiter.sol');

module.exports = function(deployer) {
  deployer.deploy(Arbiter);
};
