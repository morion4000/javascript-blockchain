const chalk = require('chalk');

const consts = require('../consts');
let Peer = require('./peer');

class Discovery {
    constructor(port) {
        this.port = port;
        this.peers = [];

        let fallbacks = consts.NETWORK.FALLBACKS;

        for (var i=0, l=fallbacks.length; i<l; i++) {
            const [protocol, address, port] = fallbacks[i];
        
            this.peers.push(new Peer(protocol, address, port));
        }

        console.log(chalk.green('[NETWORK]'), `started discovery with ${this.peers.length} peers`);
    }

    start() {
        for (var i=0, l=this.peers.length; i<l; i++) {
            let peer = this.peers[i];

            // Do not connect to self
            if (peer.address === 'localhost' && peer.port != this.port) {
                peer.connect(function() {
                    peer.socket.on('height', function(data) {
                        console.log(chalk.magenta('[DEBUG]'), `peer height ${data.height}`);
                    });

                    setInterval(function() {
                        peer.socket.send('hello');
                    }, consts.NETWORK.SOCKETS.PING_INTERVAL);

                    peer.socket.on('helloback', function(data) {
                        peer.socket.send('getheight'); 
                    });

                    //peer.socket.on('disconnect', console.log);
                    //peer.socket.on('connect', console.log);
                });
            }
        }
    }
}

module.exports = Discovery;