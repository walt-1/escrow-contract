var ConvertLib = artifacts.require("./ConvertLib.sol");
var Transfer = artifacts.require("./Transfer.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, Transfer);
  deployer.deploy(Transfer);
};
