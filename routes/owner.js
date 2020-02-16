var express = require('express');
var router = express.Router();

var Web3 = require('web3')
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} 
else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));
}


router.get('/', function(req, res, next){
    res.render('owner');
});

router.post('/', function(req, res, next){
    console.log("***********************owner********************************")
    var ownerPrivateKey = req.body.ownerPrivateKey;
    var clientAddress = req.body.clientAddress;
    var nonce = parseInt(req.body.nonce);
    
    //the received attributeList is in the form of string
    //should be converted to the form of array
    var attributeList = JSON.parse(req.body.attributeList);   

    /*********** The following is to generate signature for data user ***********/
    //address: clientAddress   ---data user address
    //string: attributeList   ---attribute list, each attribute is represented as an uint8
    //uint256: nonce    ---sequence nonce
    //the signed message include <clientAddress, attributeList, nonce>
    var abi = require('ethereumjs-abi');
    var messageHash = "0x" + abi.soliditySHA3(
        ["address", "uint256[]", "uint256"],
        [clientAddress, attributeList, nonce]
    ).toString("hex");

    //use the private key of the data owner
    //here we set the first address as the data owner 
    let t0 = Date.now();
    for (var i = 0; i < 20; ++i) {
        sig = web3.eth.accounts.sign(messageHash, ownerPrivateKey);
    } 
    let t1 = Date.now();
    console.log("Signing Time:" + (t1-t0)/10);

    console.log("Signing Message");
    console.log(sig);

    res.json({
        v: sig.v,
        r: sig.r,
        s: sig.s
    })
});


module.exports = router;


