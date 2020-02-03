let RPCServer = require('./jsonrpc/server');
let SocketsServer = require('./sockets/server');
let Discovery = require('./discovery');

class Network {
    static start_rpc(blockchain, wallet, port) {
        let rpc_server = new RPCServer(blockchain, wallet);

        rpc_server.start(port);

        console.log('[NETWORK]', `started rpc server on port: ${rpc_server.port}`);
    }

    static start_sockets(blockchain, wallet, port) {
        let sockets_server = new SocketsServer(blockchain, wallet);

        sockets_server.start(port);

        console.log('[NETWORK]', `started sockets server on port: ${sockets_server.port}`);

        let discovery = new Discovery(port);

        discovery.start();
    }
}

module.exports = Network;