const chalk = require('chalk');

let Serializer = require('../core/serializer');

class Protocol {
    constructor(blockchain, wallet) {
        this.blockchain = blockchain;
        this.wallet = wallet;
        this.connections = [];
    }

    add_connection(connection) {
        this.connections.push(connection);
    }

    remove_connection() {}

    connection_exists(connection) {
        let found = false;

        for (var i = 0, l = this.connections.length; i < l; i++) {
            if (this.connections[i].id === connection.id) {
                found = true;
                break;
            }
        }

        return found;
    }

    broadcast(message) {
        for (var i = 0, l = this.connections.length; i < l; i++) {
            this.connections[i].send('newblock', Serializer.encode(message));
        }
    }
}

module.exports = Protocol;