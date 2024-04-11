

const e = require('express');
var express = require('express');

var router = express.Router();
const Web3 = require('web3').default;
const web3 = new Web3('https://rpc2.sepolia.org'); // Replace with your Infura Project ID
require('dotenv').config();

const {CONTRACT_ADDRESS, CONTRACT_ABI} = require('../contractConfig');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('landing', { title: 'Express' });

});
router.get('/dashboard', async function (req, res, next) {

  const blockchair = await fetch(`https://api.blockchair.com/stats?apikey=${process.env.BLOCKCHAIR_KEY}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => console.error('Error:', error));


  const balance = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${req.query.account}&tag=latest&apikey=${process.env.SEPOLIA_KEY}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => console.error('Error:', error));
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const MedCount = await contract.methods.getMedicationCount().call({ from: req.query.account });
  const Transactions = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${CONTRACT_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.SEPOLIA_KEY}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => console.error('Error:', error));
    const finTrans = Transactions.result?.slice(0, 5)?.map(element => {
      return {
        ...element,
        value: web3.utils.fromWei(element.value, 'ether')
      }
    });
  const medications = [];
  for (let i = 0; i < MedCount; i++) {
    const med = await contract.methods.getMedication(i).call({ from: req.query.account });
    medications.push(med);
  }
  res.render('dashboard', {
    account: req.query.account,
    blockchair: blockchair.data, 
    balance: web3.utils.fromWei(balance.result, 'ether'),
    medications: medications,
    transactions: finTrans
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

router.get('/transactions', async function (req, res, next) {
  console.log('account=>', req.query.account);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const Balance = await contract.methods.getBalance().call({ from: req.query.account });
  //convert amount to ether
  const balance = web3.utils.fromWei(Balance, 'ether');
  const Transactions = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${CONTRACT_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.SEPOLIA_KEY}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => console.error('Error:', error));
  const finTrans = Transactions.result?.slice(0, 5)?.map(element => {
    return {
      ...element,
      value: web3.utils.fromWei(element.value, 'ether')
    }
  });
  console.log('Balance=>', finTrans);
  res.render('transactions', { account: req.query.account,balance,contract_add:CONTRACT_ADDRESS,transactions: finTrans }, function (err, html) {
    if (err) {
      console.error(err);
      res.status (500).send
    }
    else {
      res.send(html);
    }

});
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

router.post('/sendmail', function (req, res, next) {
    const formData = require('form-data');
    const Mailgun = require('mailgun.js');
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY});
    // console.log(req.body);
    try {
      const result = mg.messages.create(process.env.MAILGUN_SANDBOX_ID, {
        from: `Excited User <${req.body.email}>`,
        to: ["hari._.s@icloud.com"],
        subject: "A user from your website has sent you a message",
        text: req.body.name,
        html: `<h4>${req.body.message}</h4>`
      })
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    res.redirect('/');
}
);

router.get('/error', function (req, res, next) {
  res.render('error', { msg: req.query.error, status: 500 });
});

module.exports = router;
