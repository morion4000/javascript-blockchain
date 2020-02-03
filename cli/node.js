const fs = require('fs');
const program = require('commander');

program
  .option('--rpc', 'Start RPC server')
  .option('--rpcaddr <address>', 'Address for RPC server')
  .option('--rpcport <port>', 'Port for RPC server')
  .option('--port <port>', 'Port for sockets server');

program.parse(process.argv);

let Chain = require('../blockchain/chain');
let Wallet = require('../core/wallet');
let Network = require('../network');

const WALLET_FILE = 'wallet.json';
let privateKey;

let blockchain = new Chain('TEST');
 
if (fs.existsSync(WALLET_FILE)) {
    const contents = fs.readFileSync(WALLET_FILE, 'utf8');
    const parsed = JSON.parse(contents);
    privateKey = parsed.private;
}

let wallet = new Wallet(privateKey);

Network.start_sockets(blockchain, wallet, program.port);

if (program.rpc) {
    Network.start_rpc(blockchain, wallet, program.rpcport);
}

blockchain.mine(wallet.publicKey);
