
This project mainly includes two parts, on-chain and off-chain.

# 1) off-chain part
1. run "npm install" to install related packages
2. run "node app.js" to run the local server
3. open "http://localhost:5555/owner" in the browser to open the off-chain owner side, and type data to generate signature for client
4. open "http://localhost:5555/client" in the browser to open the off-chain client side, and type the data generated from the last step to verify the signature locally


*************************************************************************************

# 2) on-chain part
1. open "http://remix.ethereum.org/" in the browser, and open "accessControl.sol" in it
2. compile and deploy the contract with the owner address
3. call the "addResPloy" method to add a policy for a resource (use the owner account to send transaction)
4. call the "accessControl" method with the input of the signature generated (in the step 3 of the first part) by the owner (use the client account to send transaction)
5. read the log in remix console or in https://ropsten.etherscan.io

