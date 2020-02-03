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

        console.log('[NETWORK]', `started discovery with ${this.peers.length} peers`);
    }

    start() {
        for (var i=0, l=this.peers.length; i<l; i++) {
            let peer = this.peers[i];

            // Do not connect to self
            if (peer.address === 'localhost' && peer.port != this.port) {
                peer.connect();
                
                //peer.socket.on('hello', console.log);
            }
        }
    }
}

module.exports = Discovery;