# REACT_TOKEN_HOLDERS_APP
This is React app which get ERC20 token holders and their balances and show them on the Browser table with there balances and also omit the larges token holder address from the holders.

# How_It_Works
I have write the script which get all the contract "TRANSFER" events logs from the initial block of the contract deployment to the lastest block of the network. I have use the ETHERS packages and polygonscan apis to get the logs and blocks. 
Then I have filter all the logs decrypt it using the erc20 ABI with ETHERS lib which give me the decrypted log from which I can get the "TO" , "FROM" and "VALUE" which transfered. From these derypted log I have create a balance sheet of all addresses and calculate these balances from the logs. This will give me holders with their balances then I have filter the 0 balance addresses.
That holders data will be save to react localstorage to make the holders data load fast and on the background it also start the listenig the blocks to make the holders up to date
# TESTING
Clone this repository and run "NPM INSTALL" command after the run the "NPM START" React app load on local host at "3000" port.
It will shows the all the holders data on the web table in a sorted form and the largest token holder will be omit from the list. 

These have the exact same results as we can view on the polygonscan we can compare the them too. 
![Web capture_29-3-2022_134738_localhost](https://user-images.githubusercontent.com/42972151/160581892-a80508b6-0fa7-4c12-8349-22dd531fc061.jpeg)
