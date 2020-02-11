const chalk = require('chalk');

class Connection {
    constructor(socket, url = '') {
        this.socket = socket;
        this.id = socket.id;
    }

    on(event, callback) {
        this.socket.on(event, function (data) {
            console.log(chalk.yellow('[SOCKETS]'), `received ${event}`);

            callback(data);
        });
    }

    send(event, data = null) {
        console.log(chalk.yellow('[SOCKETS]'), `sending ${event}`);

        this.socket.emit(event, data);
    }

    close() {
        if (this.socket.close) {
            this.socket.close();
        }
    }
}

module.exports = Connection;