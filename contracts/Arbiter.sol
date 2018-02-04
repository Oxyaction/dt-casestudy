pragma solidity ^0.4.18;

import "ethereum-api/oraclizeAPI_0.5.sol";

contract Arbiter is usingOraclize {
  address owner;
  mapping(address => uint) receiverEther;
  mapping(bytes32 => bool) validIds;
  uint a;

  event Response(string result);

  modifier ownerOnly() {
    require(msg.sender == owner);
    _;
  }

  function Arbiter() public {
    owner = msg.sender;
    OAR = OraclizeAddrResolverI(0xF9a13178bADae8E669f78914939f4aa531641166);
    oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
  }

  function send(address receiver) public payable {
    receiverEther[receiver] = msg.value;
  }

  function __callback(bytes32 queryId, string result, bytes proof) public {
    if (!validIds[queryId]) revert();
    if (msg.sender != oraclize_cbAddress()) revert();
    Response(result);
    delete validIds[queryId];
  }

  function checkCondition() public ownerOnly {
     bytes32 queryId = oraclize_query(10, "URL", "json(http://test-blockchain.getsandbox.com/state).state");
     validIds[queryId] = true;
  }
}
