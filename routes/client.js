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
    res.render('client');
});

router.post('/', function(req, res, next){
    console.log("***********************client********************************")
    var ownerAddress = req.body.ownerAddress;
    var clientAddress = req.body.clientAddress;
    var nonce = parseInt(req.body.nonce);

    //the received attributeList is in the form of string
    //should be converted to the form of array
    var attributeList = JSON.parse(req.body.attributeList);   

    var v = req.body.v;
    var r = req.body.r;
    var s = req.body.s;
    
    var abi = require('ethereumjs-abi');
    var messageHash = "0x" + abi.soliditySHA3(
        ["address", "uint256[]", "uint256"],
        [clientAddress, attributeList, nonce]
    ).toString("hex");

    t0 = Date.now();
    for (var i = 0; i < 20; ++i) {
        singAddress = web3.eth.accounts.recover(messageHash, v, r, s)
    } 
    t1 = Date.now();
    console.log("Verifying Time:" + (t1-t0)/10);
    console.log(singAddress);

    if (ownerAddress == singAddress) {
        res.send("Verification Success");
    }
    else {
        res.send("Verification Failed");
    }

});


module.exports = router;