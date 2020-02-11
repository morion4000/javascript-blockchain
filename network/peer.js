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
}

module.exports = Peer;