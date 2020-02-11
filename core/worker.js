const chalk = require('chalk');

class Worker {
    constructor(executor, time, message = '') {
        this.executor = executor;
        this.time = time;

        let _this = this;

        this.interval = setInterval(function() {
            console.log(chalk.redBright('[WORKERS]'), message);

            _this.executor();
        }, this.time);
    }

    cancel() {
        clearInterval(this.interval);
    }
}

module.exports = Worker;