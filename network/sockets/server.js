const io = require('socket.io');
const consts = require('../../consts');
//const methods = require('./methods');

class Server {
    constructor(blockchain, wallet) {
        this.blockchain = blockchain;
        this.wallet = wallet;
        //this.methods = methods(blockchain);
    }

    start(port) {
        let _this = this;

        this.port = port || consts.NETWORK.SOCKETS.SERVER_PORT;

        this.server = io(this.port);

        // ping, pong, hello, disconect
        this.server.on('connection', function(socket) {
            console.log('[SOCKETS]', `new connection`);

            //_this.server.emit('ping', { will: 'be received by everyone'});
            
            socket.on('hello', function (from, msg) {
                console.log('[SOCKETS]', 'I received a private message by ', from, ' saying ', msg);
            });
            
            socket.on('disconnect', function () {
                _this.server.emit('user disconnected');
            });
        });
    }
}

module.exports = Server;