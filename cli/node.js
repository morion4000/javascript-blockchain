let Chain = require('./blockchain/chain');
let Wallet = require('./core/wallet');
let Server = require('./network/jsonrpc/server');

let blockchain = new Chain('TEST');
let wallet = new Wallet();
let server = new Server(blockchain);

server.start();

console.log(`started node on port: ${server.port}`);

blockchain.mine(wallet.publicKey);
