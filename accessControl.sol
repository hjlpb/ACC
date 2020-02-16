pragma solidity ^0.5.13;

contract ACC {
    address public owner;

    struct Policy {
        uint256 k;
        uint256[] policyAttributes;
    }

    mapping(uint256 => Policy) resourcePolicies;
    mapping(address => uint256) clientNonce;

    event resultEvent(uint256 resourceID, address clientAddress, string result);

    constructor() public {
        owner = msg.sender;
    }

    function accessControl(uint256 resourceID, uint256[] memory clientAttributes, uint256 nonce, uint8 v, bytes32 r, bytes32 s) public {
        //should exist policy for that resourceID
        require(resourcePolicies[resourceID].policyAttributes.length!=0);
        //whether client is revoked
        require(clientNonce[msg.sender] == nonce);
        //signature verify
        assert(sigVerify(msg.sender, clientAttributes, nonce, v, r, s));
        //policy check
        assert(policyCheck(resourceID, clientAttributes));
        //triger event
        emit resultEvent(resourceID, msg.sender, "allow");
    }

    function sigVerify(address clientAddress, uint256[] memory clientAttributes, uint256 nonce, uint8 v, bytes32 r, bytes32 s) public view returns(bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(clientAddress, clientAttributes, nonce));
        bytes32 prefixedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        if (ecrecover(prefixedMessageHash, v, r, s) == owner){
            return true;
        }
        else {
            return false;
        }
    }

    function policyCheck(uint256 resourceID, uint256[] memory clientAttributes) public view returns(bool) {
        Policy memory policy = resourcePolicies[resourceID];
        uint256[] memory policyAttributes = policy.policyAttributes;
        uint256 matchingAttributes;
        for(uint256 i; i<policyAttributes.length; i++) {
            uint256 attribute = policyAttributes[i];
            for(uint256 j; j<clientAttributes.length; j++) {
                if (attribute == clientAttributes[j]) {
                    matchingAttributes++;
                }
            }
        }
        if (matchingAttributes >= policy.k) {
            return true;
        }
        else {
            return false;
        }
    }

    function addResPoly(uint256 resourceID, uint256 k, uint256[] memory policyAttributes) public {
        require(msg.sender == owner);
        Policy memory resourcePolicy = Policy({
            k:k,
            policyAttributes:policyAttributes
        });
        resourcePolicies[resourceID] = resourcePolicy;
    }
    
    function delResPoly(uint256 resourceID) public {
        require(msg.sender == owner);
        delete resourcePolicies[resourceID];
    }
    
    function getResPoly(uint256 resourceID) public view returns(uint256, uint256[] memory) {
        return (resourcePolicies[resourceID].k, resourcePolicies[resourceID].policyAttributes);
    }
    
    function revokeClient(address clientAddress) public {
        require(msg.sender == owner);
        clientNonce[clientAddress]++;
    }
}