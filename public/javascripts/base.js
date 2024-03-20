
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config.js';

window.addEventListener('load', function () {
    document.getElementById('spin').style.display = 'none';
});

window.addEventListener('beforeunload', function () {
    document.getElementById('spin').style.display = 'block';
});

var account
window.connectMetamask = async () => {
    try {
        var accounts = await ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
        if(accounts[0]) {

            // console.log(account);
            if (window.location.href.includes("dashboard")) {
                location.assign(`/dosages/?account=${accounts[0]}`);
                return;
            }else if (window.location.href.includes("dosages")) {
                location.assign(`/dosages/?account=${accounts[0]}`);
                return;
            }
            else{
                location.assign(`/dashboard/?account=${accounts[0]}`);
                return;
            }
        }
    } catch (error) {
        console.log('sssss');
        // location.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
    }
}

window.connectContract = async () => {
    const ABI = CONTRACT_ABI
    const Address = CONTRACT_ADDRESS;
    //window.ethereum;
    window.web3 = await new Web3('http://localhost:8545');
    const account = await window.web3.eth.getAccounts();
    const Contract = await new window.web3.eth.Contract(ABI, Address);
    console.log(Contract);
    console.log(account);
    async function getMedications(userAddress) {
        const medCount = await Contract.methods.getMedicationCount().call({ from: userAddress });
    
        const medications = [];
        for (let i = 0; i < medCount; i++) {
            const med = await Contract.methods.getMedication(i).call({ from: userAddress });
            medications.push(med);
        }
        console.log(medications);
        let data = {
            account: userAddress,
            medications: medications
        }
        fetch('/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(html => {
            document.documentElement.innerHTML = html
            // location.assign(`/dashboard`);
        })
        .catch((error) => console.error('Error:', error));
        return medications;
    }
    getMedications(account[0]);
    
}

if (window.location.href.includes('createDosages')) {
    window.addMedication = async  () => {
        const account = document.getElementById('formGroupAccount').value;
        const dosageName = document.getElementById('formGroupExampleInput').value;
        const dosageDose = document.getElementById('formGroupExampleInput2').value;
        // get the contract instance
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        // call the addMedication function
        document.getElementById('spin').style.display = 'block';
        const result  = await window.contract.methods.addMedication(dosageName, dosageDose).send({ from: account });
        // only on success redirect to the dosages page
        console.log(result);
        if (result.status) {
            document.getElementById('spin').style.display = 'none';

            window.location.href = '/dosages?account=' +account;
        }
    }
    async function requestAccount() {
    var a = await ethereum.request({ method: "eth_requestAccounts" });
    console.log('ddad', a);
    document.getElementById('formGroupAccount').value = a;

    }
    requestAccount();
}

window.takemedication = async (id, account) => {
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    document.getElementById('spin').style.display = 'block';
    const result = await window.contract.methods.toggleTaken(id).send({ from: account });
    if (result.status) {
        document.getElementById('spin').style.display = 'none';
        location.assign(`/dosages/?account=${account}`);
    }
}