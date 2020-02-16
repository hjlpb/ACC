
This project mainly includes two parts, on-chain and off-chain.

1.off-chain part
a. run "node install" to install related packages
b. run "node app.js" to run the local server
c. open "http://localhost:5555/owner" in the browser to open the off-chain owner side, and type data to generate signature for client
d. open "http://localhost:5555/client" in the browser to open the off-chain client side, and type the data generated from the last step to verify the signature locally


*************************************************************************************

2.on-chain part
a.open "http://remix.ethereum.org/" in the browser, and open "accessControl.sol" in it
b.compile and deploy the contract with the owner address
c.call the "addResPloy" method to add a policy for a resource (use the owner account to send transaction)
d.call the "accessControl" method with the input of the signature generated (in the c step of the first part) by the owner (use the client account to send transaction)
e.read the log in remix console or in https://ropsten.etherscan.io

