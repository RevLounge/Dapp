const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  //'C:/Users/carlo/Desktop/UCM/TFG/FrontEnd-TFG/client/src/contracts'
  // contracts_build_directory: path.join(__dirname, "src/contracts"),
  contracts_build_directory: 'C:/Users/carlo/Desktop/UCM/TFG/FrontEnd-TFG/client/src/contracts',
  networks: {
    dev: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      websockets: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.1",
    }
  }
};
