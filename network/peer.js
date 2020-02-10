var Client = require('./sockets/client');

class Peer {
    constructor(portocol = 'http', address, port) {
        this.portocol = portocol;
        this.address = address;
        this.port = port;
    }

    getUrl() {
        return `${this.portocol}://${this.address}:${this.port}`;
    }

    connect(callback) {
        const url = this.getUrl();

        this.socket = new Client(url, callback);
    }
}

module.exports = Peer;