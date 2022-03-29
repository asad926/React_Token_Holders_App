import axios from 'axios';
import {ethers} from "ethers";
import abi from './abi.json';

   const getTokenHolders =async ()=> {
        const network = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/v1/8e20b375b7c0e265eb7196d605215105ea0f267b");

        let contractInitialBlock = 23253551; 
        let lastestBlock = await network.getBlockNumber()
        let logDecoder = new ethers.utils.Interface(abi);
        let balanceSheet = {};
        for(let i = contractInitialBlock; i<= lastestBlock; i=i+40000 ){
            
           let url = 'https://api-testnet.polygonscan.com/api';
        let response = await axios({
            method:'get',
            url,
            params:{"module":"logs","action":"getLogs","fromBlock":i,"toBlock":(i+40000),
                    "address":"0xe5d19a920146356e9d015caafd8b83b03f1a10c4","topic0":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "topic0_1_opr":"and","apikey":"4GS6ZV9AV1N6VA8XF6WM3CBWQMK9IP7RTK",}
        })
            let log_data = response.data.result; 
            log_data.forEach((log)=>{
                let d_log = logDecoder.decodeEventLog("Transfer",log.data,log.topics);
                let obj = {};
                obj["from"] = d_log[0];
                obj["to"] = d_log[1];
                obj["value"] = parseFloat(ethers.utils.formatEther(d_log[2]));
                if(!balanceSheet[obj.from]){
                    balanceSheet[obj.from] = 0.00000000;
                }if(!balanceSheet[obj.to]){
                    balanceSheet[obj.to] = 0.00000000;
                } 
                balanceSheet[obj.from] -= obj.value;
                balanceSheet[obj.to] += obj.value;
                
            });
        }
        let holders = [];
        let keys = Object.keys(balanceSheet);
       let values = Object.values(balanceSheet);
       for(let i=0;i<keys.length;i++){
           if(values[i]<=0) continue;
        let entry = {"holder": keys[i], "amount":values[i]};
        holders.push(entry);
       }
       holders.sort(function(a, b) {
        return b.amount - a.amount;
      });
      
      holders.shift();
        localStorage.setItem("holders",JSON.stringify(holders))
        return holders;     
    }


    export default getTokenHolders;
