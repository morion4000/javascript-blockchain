const fs = require('fs');

let Chain = require('../blockchain/chain');
let Wallet = require('../core/wallet');
let Serializer = require('../core/serializer');

// Overwrite console.log
console.log = function() {};

const WALLET_FILE = 'wallet.json';
let privateKey;
let blockchain = new Chain('TEST');
 
if (fs.existsSync(WALLET_FILE)) {
    const contents = fs.readFileSync(WALLET_FILE, 'utf8');
    const parsed = JSON.parse(contents);
    privateKey = parsed.private;
}

let wallet = new Wallet(privateKey);

while (1) {
  blockchain.mine(wallet.publicKey);
  console.dir(Serializer.encode(blockchain.getLatestBlock()));
}
