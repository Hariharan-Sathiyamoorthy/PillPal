const CONTRACT_ADDRESS = '0x4Fb6733469fC5a90C84F467Be5c86614a3e2C793'


const CONTRACT_ABI = [
   {
       "anonymous": false,
       "inputs": [
           {
               "indexed": false,
               "internalType": "uint256",
               "name": "id",
               "type": "uint256"
           },
           {
               "indexed": false,
               "internalType": "bool",
               "name": "taken",
               "type": "bool"
           }
       ],
       "name": "MedTaken",
       "type": "event"
   },
   {
       "anonymous": false,
       "inputs": [
           {
               "indexed": false,
               "internalType": "uint256",
               "name": "id",
               "type": "uint256"
           },
           {
               "indexed": false,
               "internalType": "string",
               "name": "name",
               "type": "string"
           },
           {
               "indexed": false,
               "internalType": "uint256",
               "name": "dosage",
               "type": "uint256"
           },
           {
               "indexed": false,
               "internalType": "bool",
               "name": "taken",
               "type": "bool"
           }
       ],
       "name": "MediactionCreated",
       "type": "event"
   },
   {
       "constant": false,
       "inputs": [
           {
               "internalType": "string",
               "name": "_name",
               "type": "string"
           },
           {
               "internalType": "uint256",
               "name": "_dosage",
               "type": "uint256"
           }
       ],
       "name": "addMedication",
       "outputs": [],
       "payable": false,
       "stateMutability": "nonpayable",
       "type": "function"
   },
   {
       "constant": false,
       "inputs": [],
       "name": "deposit",
       "outputs": [],
       "payable": true,
       "stateMutability": "payable",
       "type": "function"
   },
   {
       "constant": true,
       "inputs": [],
       "name": "getAddress",
       "outputs": [
           {
               "internalType": "address",
               "name": "",
               "type": "address"
           }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
   },
   {
       "constant": true,
       "inputs": [],
       "name": "getBalance",
       "outputs": [
           {
               "internalType": "uint256",
               "name": "",
               "type": "uint256"
           }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
   },
   {
       "constant": true,
       "inputs": [
           {
               "internalType": "uint256",
               "name": "_index",
               "type": "uint256"
           }
       ],
       "name": "getMedication",
       "outputs": [
           {
               "internalType": "uint256",
               "name": "id",
               "type": "uint256"
           },
           {
               "internalType": "string",
               "name": "name",
               "type": "string"
           },
           {
               "internalType": "uint256",
               "name": "dosage",
               "type": "uint256"
           },
           {
               "internalType": "bool",
               "name": "taken",
               "type": "bool"
           }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
   },
   {
       "constant": true,
       "inputs": [],
       "name": "getMedicationCount",
       "outputs": [
           {
               "internalType": "uint256",
               "name": "",
               "type": "uint256"
           }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
   },
   {
       "constant": true,
       "inputs": [],
       "name": "medCount",
       "outputs": [
           {
               "internalType": "uint256",
               "name": "",
               "type": "uint256"
           }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
   },
   {
       "constant": false,
       "inputs": [
           {
               "internalType": "uint256",
               "name": "_id",
               "type": "uint256"
           }
       ],
       "name": "toggleTaken",
       "outputs": [],
       "payable": false,
       "stateMutability": "nonpayable",
       "type": "function"
   },
   {
       "constant": false,
       "inputs": [
           {
               "internalType": "address payable",
               "name": "_to",
               "type": "address"
           },
           {
               "internalType": "uint256",
               "name": "_amount",
               "type": "uint256"
           }
       ],
       "name": "withdraw",
       "outputs": [],
       "payable": false,
       "stateMutability": "nonpayable",
       "type": "function"
   }
]
module.exports = { CONTRACT_ADDRESS, CONTRACT_ABI }