const Web3 = require('web3')
require('dotenv').config()
const BN = require("bn.js")

const { pair_token, wbnb, address, customslippage, factor, privateKey, RPC_URL, BlacklistMode } = process.env
const HDWalletProvider = require('@truffle/hdwallet-provider')
const deployed_Contract = require('./../build/contracts/Logic.json');
const l_address = deployed_Contract.networks[25].address
const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))

async function currentEthBalance() {
    web3.eth.getBalance(l_address).then((value => {
        console.log(`\nCURRENT BALANCE: ${web3.utils.fromWei(value)} ETH\n`)
    })
    )
}


async function configure() {

    try {
        currentEthBalance()
        const myContract = await new web3.eth.Contract(deployed_Contract.abi, l_address)


        await myContract.methods.setparams(pair_token, wbnb, new BN(customslippage), new BN(factor), web3.utils.toWei("0.002", "ether"), BlacklistMode).send({ from: address, gasPrice: web3.utils.toWei("10", "gwei") }, async (err, res) => {
            !err ? console.log(`successfully configured: <<< ${l_address} >>>\n==========================================================================================================================`) : console.log(err)
        })
        let cslip = await myContract.methods.slippage().call()
        let ctarget = await myContract.methods.target().call()
        let cpair = await myContract.methods.tokenIn().call()
        let cAllowedSpread = await myContract.methods._x().call()


        console.log(`- Target: ${ctarget}\n`)
        console.log(`- Pair Token: ${cpair}\n`)
        console.log(`- Allowed deviation from original price: ${cAllowedSpread}%\n`)
        /*
        * cslip (custom slippage) is used to override the automated calculation of slippage
        */
        console.log(`- Custom Slippage: ${cslip} (if equal to zero the contract will determine automatically)\n==========================================================================================================================`)
    } catch (err) {
        console.log(err)
    }
    process.exit(0)
}

export default configure

