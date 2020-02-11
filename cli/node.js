const fs = require('fs');
const program = require('commander');
const chalk = require('chalk');
const uuidv1 = require('uuid/v1');

program
  .option('--rpc', 'Start RPC server')
  .option('--rpcaddr <address>', 'Address for RPC server')
  .option('--rpcport <port>', 'Port for RPC server')
  .option('--port <port>', 'Port for sockets server');

program.parse(process.argv);

let Chain = require('../blockchain/chain');
let Wallet = require('../core/wallet');
let Network = require('../network');
let Connection = require('../network/sockets/connection');
let SocketsClient = require('../network/sockets/client');
let Protocol = require('../network/protocol');
let Peer = require('../network/peer');
let Serializer = require('../core/serializer');
let Miner = require('../core/miner');
const consts = require('../consts');

const WALLET_FILE = 'wallet.json';
let privateKey;

let blockchain = new Chain('TEST');
let miner;
const node_id = uuidv1();

function reset_miner() {
  if (miner) {
    miner.kill();
  }

  miner = new Miner(WALLET_FILE);

  miner.send_message({
    latest_block: blockchain.getLatestBlock(),
    transactions: blockchain.transactions
  });
  
  miner.on_message((data) => {
    console.log(chalk.redBright('[MINER]'), `received work`);
  
    blockchain.addBlock(data.block);

    protocol.broadcast(data.block);

    reset_miner();
  });
}

if (fs.existsSync(WALLET_FILE)) {
  const contents = fs.readFileSync(WALLET_FILE, 'utf8');
  const parsed = JSON.parse(contents);
  privateKey = parsed.private;
}

let wallet = new Wallet(privateKey);

let sockets_server = Network.start_sockets(program.port);
let protocol = new Protocol(blockchain, wallet);

sockets_server.on_connection(function (socket) {
  const connection = new Connection(socket);

  if (!protocol.connection_exists(connection)) {
    protocol.add_connection(connection);
  }

  connection.on('hello', function () {
    connection.send('helloback');
  });

  connection.on('disconnect', function () {
    console.log(chalk.yellow('[SOCKETS]'), `received disconnect`);
  });

  connection.on('getheight', function () {
    connection.send('height', {
      height: blockchain.height
    });
  });

  connection.on('newblock', function (data) {
    let block = Serializer.decode(data);

    blockchain.addBlock(block);

    reset_miner();
  });
});

let fallbacks = consts.NETWORK.FALLBACKS;

for (var i = 0, l = fallbacks.length; i < l; i++) {
  const [_protocol, _address, _port] = fallbacks[i];
  let peer = new Peer(_protocol, _address, _port);
  let url = peer.getUrl();

  // Do not connect to self
  if (peer.address === 'localhost' && peer.port == program.port) {
    continue;
  }

  const sockets_client = new SocketsClient(url);

  sockets_client.on_connect(function (socket) {
    const connection = new Connection(socket);

    if (!protocol.connection_exists(connection)) {
      protocol.add_connection(connection);
    }

    connection.send('hello');
    
    connection.on('height', function (data) {
      console.log(chalk.magenta('[DEBUG]'), `peer height ${data.height}`);
    });
  
    connection.on('helloback', function () {
      connection.send('getheight');
    });
  });
}

if (program.rpc) {
  Network.start_rpc(blockchain, wallet, program.rpcport);
}

reset_miner();
