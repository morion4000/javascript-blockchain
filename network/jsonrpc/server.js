const jayson = require('jayson');
const consts = require('../../consts');
const methods = require('./methods');

class Server {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.methods = methods(blockchain);

        this.server = jayson.server(this.methods, {
            useContext: false,
            params: Array
        });
    }

    start(port) {
        this.port = port || consts.NETWORK.JSONRPC.SERVER_PORT;

        this.server.http().listen(this.port);
    }
}

module.exports = Server;