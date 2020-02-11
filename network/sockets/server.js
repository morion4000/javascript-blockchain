const chalk = require('chalk');
const io = require('socket.io');

const consts = require('../../consts');

class Server {
    start(port) {
        this.port = port || consts.NETWORK.SOCKETS.SERVER_PORT;

        this.server = io(this.port);
    }

    on_connection(callback) {
        this.server.on('connection', function(socket) {
            console.log(chalk.yellow('[SOCKETS]'), `new connection to server`);

            callback(socket);
        });
    }
}

module.exports = Server;