const chalk = require('chalk');
const { fork } = require('child_process');

class Miner {
    constructor() {
        // TODO: Run multiple processes (one / core)
        this.process = fork('./cli/miner_child.js');

        console.log(chalk.redBright('[MINER]'), `forked miner`);
    }

    on_message(callback) {
        this.process.on('message', callback);
    }

    send_message(message) {
        this.process.send(message);
    }

    kill() {
        this.process.kill('SIGINT');

        console.log(chalk.redBright('[MINER]'), `killed miner`);
    }
}

module.exports = Miner;