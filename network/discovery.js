const chalk = require('chalk');

const consts = require('../consts');
let Peer = require('./peer');

class Discovery {
    constructor(port) {
        this.port = port;
        this.peers = [];

        let bootstraps = consts.NETWORK.BOOTSTRAPS;

        for (var i=0, l=bootstraps.length; i<l; i++) {
            const [protocol, address, port] = bootstraps[i];
        
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

                    peer.socket.send('hello');
                    peer.socket.send('getheight');

                    //peer.socket.on('disconnect', console.log);
                    //peer.socket.on('connect', console.log);
                });
            }
        }
    }
}

module.exports = Discovery;