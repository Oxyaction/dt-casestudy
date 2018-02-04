class Main {

  constructor() {
    this.contracts = {};
    this.initWeb3();
    this.initContracts();
  }

  initWeb3() {
    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(this.web3Provider);
  }

  initContracts() {
    $.get('Arbiter.json', (arbiterAbi) => {
      // console.log(111);
      const Arbiter = TruffleContract(arbiterAbi);
      Arbiter.setProvider(this.web3Provider);
      Arbiter.deployed().then((arbiter) => {
        this.contracts.arbiter = arbiter;
        this.listen();
      });
      // this.contracts.Arbiter = await ;
      // console.log(this.contracts.Arbiter);
    })
  }

  listen() {
    this.contracts.arbiter.allEvents({ fromBlock: 1 }, console.log)
  }
}

$(function() {
  $(window).load(function() {
    new Main();
  });
});
