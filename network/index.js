const chalk = require('chalk');

let RPCServer = require('./jsonrpc/server');
let SocketsServer = require('./sockets/server');

class Network {
    static start_rpc(blockchain, wallet, port) {
        let rpc_server = new RPCServer(blockchain, wallet);

        rpc_server.start(port);

        console.log(chalk.green('[NETWORK]'), `started rpc server on port: ${rpc_server.port}`);

        return rpc_server;
    }

    static start_sockets(port) {
        let sockets_server = new SocketsServer();

        sockets_server.start(port);

        console.log(chalk.yellow('[SOCKETS]'), `started sockets server on port: ${sockets_server.port}`);

        return sockets_server;
    }
}

module.exports = Network;