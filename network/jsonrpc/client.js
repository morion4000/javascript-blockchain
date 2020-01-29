const jayson = require('jayson');
const consts = require('../../consts');


class Client {
    constructor(port) {
        this.port = port || consts.NETWORK.JSONRPC.SERVER_PORT;

        this.client = jayson.client.http({
            port: this.port
        });
    }

    request(method, args, cb) {
        this.client.request(method, args, cb);
    }
}

module.exports = Client;