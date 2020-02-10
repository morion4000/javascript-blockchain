const chalk = require('chalk');

let RPCServer = require('./jsonrpc/server');
let SocketsServer = require('./sockets/server');
let Discovery = require('./discovery');

class Network {
    static start_rpc(blockchain, wallet, port) {
        let rpc_server = new RPCServer(blockchain, wallet);

        rpc_server.start(port);

        console.log(chalk.green('[NETWORK]'), `started rpc server on port: ${rpc_server.port}`);
    }

    static start_sockets(blockchain, wallet, port) {
        let sockets_server = new SocketsServer(blockchain, wallet);

        sockets_server.start(port, function() {
            sockets_server.on('hello', function() {
                sockets_server.send('helloback');
            });

            sockets_server.on('disconnect', function() {
                console.log(chalk.yellow('[SOCKETS]'), `received disconnect`);
            });

            sockets_server.on('connect', console.log);

            sockets_server.on('getheight', function() {
                sockets_server.send('height', {
                    height: blockchain.height
                });
            });
        });

        console.log(chalk.yellow('[SOCKETS]'), `started sockets server on port: ${sockets_server.port}`);

        let discovery = new Discovery(port);

        discovery.start();
    }
}

module.exports = Network;