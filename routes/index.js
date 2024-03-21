

var express = require('express');

var router = express.Router();
const Web3 = require('web3').default;
const web3 = new Web3('https://rpc2.sepolia.org'); // Replace with your Infura Project ID

const CONTRACT_ADDRESS = '0x4Fb6733469fC5a90C84F467Be5c86614a3e2C793';
const CONTRACT_ABI = [
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
  }
]
// const { CONTRACT_ABI, CONTRACT_ADDRESS } = require('../public/javascripts/config.js');


// You can also access via window.ethereum
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('landing', { title: 'Express' });

});
router.get('/dashboard', async function (req, res, next) {

  const blockchair = await fetch('https://api.blockchair.com/stats?apikey=G___KwHLcmNUhKsjfBGWV408XuEgGoOF', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => console.error('Error:', error));


  const balance = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${req.query.account}&tag=latest&apikey=DM84VITNPUGHM1U1D27UUEWYQKMG6GCV1M`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => console.error('Error:', error));
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  // console.log('account=>',accounts2);/
  const MedCount = await contract.methods.getMedicationCount().call({ from: req.query.account });
  const Transactions = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${CONTRACT_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=DM84VITNPUGHM1U1D27UUEWYQKMG6GCV1M`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => console.error('Error:', error));
  // console.log('TransactionCount=>', Transactions.result?.slice(0, 5));
  const medications = [];
  for (let i = 0; i < MedCount; i++) {
    const med = await contract.methods.getMedication(i).call({ from: req.query.account });
    medications.push(med);
  }
  // console.log(parseInt(MedCount));
  // console.log(medications[0].name);


  res.render('dashboard', {
    account: req.query.account,
    blockchair: blockchair.data, 
    balance: web3.utils.fromWei(balance.result, 'ether'),
    medications: medications,
    transactions: Transactions.result?.slice(0, 5)
  }
    , function (err, html) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.send(html);
      }
    });
});

router.get('/dosages', async function (req, res, next) {
  console.log('account=>', req.query.account);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  // console.log('account=>',accounts2);/
  const MedCount = await contract.methods.getMedicationCount().call({ from: req.query.account });
  const medications = [];
  for (let i = 0; i < MedCount; i++) {
    const med = await contract.methods.getMedication(i).call({ from: req.query.account });
    medications.push(med);
  }
  console.log('medications=>', medications);
  res.render('dosages', { account:req.query.account,medications: medications }, function (err, html) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    else {
      res.send(html);
    }
  }
  );
});

router.get('/profile', function (req, res, next) {
  res.render('profile', { account: req.query.account }, function (err, html) {
    if (err) {
      console.error(err);
      res.status(500)
    }
    else {
      res.send(html);
    }
  }
  );
}
);
// router.post('/addDosages', async function (req, res, next) {
//   console.log('account=>', req.body);

//   const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
//   //get accounts from metamask
//   const account = req.body.account;
//   const name = req.body.dosageName;
//   const dosage = parseInt(req.body.dosageDose);
//   console.log('methods', contract.methods);
//   const MedCount = await contract.methods.addMedication(name,dosage).send({ from: '0xc4ecf557781b213e84fe6de2657510d16934a14f' });
//   // const result = await contract.methods.addMedication(name, dosage).send({ from: '0xc4ecf557781b213e84fe6de2657510d16934a14f' });
//   console.log(MedCount);
//   res.send('success');
// })

router.get('/createDosages',function (req, res, next) {
  res.render('addDosage',function (err, html) {
    if (err) {
      console.error(err);
      res.status(
        500
      ).send(err);
    }
    else {
      res.send(html);
    }
  }
  );
});



router.get('/error', function (req, res, next) {
  res.render('error', { msg: req.query.error, status: 500 });
});

module.exports = router;
