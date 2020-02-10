const chalk = require('chalk');
const io = require('socket.io-client');

class Client {
    constructor(url, callback = null) {
        this.socket = io(url);
        this.connected = false;
        let _this = this;

        console.log(chalk.yellow('[SOCKETS]'), `connecting to node ${url}`);

        this.socket.on('connect', function() {
            _this.connected = true;

            console.log(chalk.yellow('[SOCKETS]'), `connected to node ${url}`);

            if (callback) {
                callback();
            }
        });
    }

    on(event, callback) {
        this.socket.on(event, function(data) {
            console.log(chalk.yellow('[SOCKETS]'), `received ${event}`);

            callback(data);
        });
    }

    send(event, data) {
        console.log(chalk.yellow('[SOCKETS]'), `sending ${event}`);

        this.socket.emit(event, data);
    }
}

module.exports = Client;