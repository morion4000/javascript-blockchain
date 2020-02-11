const chalk = require('chalk');
const io = require('socket.io-client');

class Client {
    constructor(url, callback = null) {
        this.socket = io(url);
        this.connected = false;

        console.log(chalk.yellow('[SOCKETS]'), `connecting to node ${url}`);
    }

    on_connect(callback) {
        let _this = this;

        this.socket.on('connect', function () {
            _this.connected = true;

            console.log(chalk.yellow('[SOCKETS]'), `connected to node`);

            if (callback) {
                callback(_this.socket);
            }
        });
    }
}

module.exports = Client;