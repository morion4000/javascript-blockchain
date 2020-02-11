const fs = require('fs');
const chalk = require('chalk');

let Chain = require('../blockchain/chain');
let Wallet = require('../core/wallet');
let Serializer = require('../core/serializer');

const WALLET_FILE = 'wallet.json';
let privateKey;
 
if (fs.existsSync(WALLET_FILE)) {
    const contents = fs.readFileSync(WALLET_FILE, 'utf8');
    const parsed = JSON.parse(contents);
    privateKey = parsed.private;
}

// Overwrite console.log
console.log = function() {};

let wallet = new Wallet(privateKey);
let blockchain = new Chain('TEST');

process.on('message', (data) => {
    console.debug(chalk.redBright('[MINER]'), `received work`);

    blockchain.addBlock(data.latest_block);
    blockchain.transactions = data.transactions;

    blockchain.mine(wallet.publicKey);
    
    process.send({
        block: blockchain.getLatestBlock()
    });
});
