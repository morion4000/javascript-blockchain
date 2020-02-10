const chalk = require('chalk');
const io = require('socket.io');

const consts = require('../../consts');
//const methods = require('./methods');

class Server {
    constructor(blockchain, wallet) {
        this.blockchain = blockchain;
        this.wallet = wallet;
        //this.methods = methods(blockchain);
    }

    start(port, callback = null) {
        let _this = this;

        this.port = port || consts.NETWORK.SOCKETS.SERVER_PORT;

        this.server = io(this.port);

        // ping, pong, hello, disconect
        this.server.on('connection', function(socket) {
            _this.socket = socket;

            console.log(chalk.yellow('[SOCKETS]'), `new connection to server`);

            if (callback) {
                callback(socket);
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

module.exports = Server;