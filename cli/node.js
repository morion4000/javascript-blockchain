const fs = require('fs');

let Chain = require('../blockchain/chain');
let Wallet = require('../core/wallet');
let Server = require('../network/jsonrpc/server');

const WALLET_FILE = 'wallet.json';
let privateKey;

let blockchain = new Chain('TEST');
 
if (fs.existsSync(WALLET_FILE)) {
    const contents = fs.readFileSync(WALLET_FILE, 'utf8');
    const parsed = JSON.parse(contents);
    privateKey = parsed.private;
}

let wallet = new Wallet(privateKey);
let server = new Server(blockchain, wallet);

server.start();

console.log(`started node on port: ${server.port}`);

blockchain.mine(wallet.publicKey);
