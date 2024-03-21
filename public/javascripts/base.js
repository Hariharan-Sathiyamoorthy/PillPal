
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config.js';

window.addEventListener('load', function () {
    document.getElementById('spin').style.display = 'none';
});

window.addEventListener('beforeunload', function () {
    document.getElementById('spin').style.display = 'block';
});

var accounts;
// if(window.location.pathname === '/'){
//     if(accounts[0]) {
//         document.getElementById('login1').innerHTML = 'Dashboard';
//     }
//     else{
//         document.getElementById('login1').innerHTML = 'Connect Metamask';
//     }

// }
window.connectMetamask = async () => {
    try {
       const accounts =  await ethereum.request({method: "eth_requestAccounts"});
       console.log(accounts);
        if(accounts[0]) {
            location.assign(`/dashboard/?account=${accounts[0]}`);
        }
            // console.log(account);
            else{
                location.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
                return;
            }

    } catch (error) {
        console.log('sssss');
        ocation.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
    }
}
window.routeDosages = async () => {
    let account = await window.ethereum.request({method: 'eth_accounts'})
    try {
        if(account) {
            location.assign(`/dosages/?account=${account[0]}`);
        }
            // console.log(account);
            else{
                location.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
                return;
            }

    } catch (error) {
        console.log('sssss');
        location.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
    }

}
window.routeProfile = async () => {
    let account = await window.ethereum.request({method: 'eth_accounts'})
    try {
        if(account) {
            location.assign(`/profile/?account=${account[0]}`);

        }
            // console.log(account);
            else{
                location.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
                return;
            }       
    } catch (error) {

        location.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
    }
}
window.routeDashboard = async () => {
    let account = await window.ethereum.request({method: 'eth_accounts'})
    try {
        if(account) {
            location.assign(`/dashboard/?account=${account[0]}`);
        }
            // console.log(account);
            else{
                location.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
                return;
            }
        } catch (error) {
            location.assign(`/error/?error=${"Coudnt connect to Metamask"}`);
        }
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

if(window.location.href.includes('profile') ){
    let account = await window.ethereum.request({method: 'eth_accounts'})
    window.getProfile = async () => {
        window.web3 = await new Web3(window.ethereum);
        // window.contract = await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        // const aczz = window.ethereum.selectedAddress;
        document.getElementById('spin').style.display = 'block';

        window.web3.eth.getBalance(account[0], (err, wei) => {
            if (err) {
                console.error('Error getting balance:', err);
            } else {
                const balance = web3.utils.fromWei(wei, 'ether');
                document.getElementById('b1').innerText = `Balance: ${balance} ETH`;
                console.log('Balance:', balance);
            }
        });
        const TransactionCount = await web3.eth.getTransactionCount(account[0])
        document.getElementById('tc1').innerText = `Transaction Count: ${TransactionCount}`;
        const GasPrice = await web3.eth.getGasPrice();
        document.getElementById('gp1').innerText = `Gas Price: ${GasPrice}`;
        const ChainID = await web3.eth.getChainId();
        document.getElementById('c1').innerText = `Chain ID: ${ChainID}`;
        document.getElementById('spin').style.display = 'none';



    }
    window.getProfile();
}