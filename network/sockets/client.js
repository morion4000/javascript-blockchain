const io = require('socket.io-client');

class Client {
    constructor(url) {
        this.client = io(url);
        this.connected = false;
        let _this = this;

        console.log('[SOCKETS]', `connecting to ${url}`);

        this.client.on('connect', function () {
            _this.connected = true;

            console.log('[SOCKETS]', `connected to ${url}`);
        });
    }

    on(event, cb) {
        socket.on(event, cb);
    }

    send(event, data) {
        socket.emit(event, data);
    }
}

module.exports = Client;