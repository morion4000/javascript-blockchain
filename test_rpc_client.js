let Client = require('./network/jsonrpc/client');

let client = new Client();

client.request('getblockhash', [2], function(err, response) {
    if (err) {
        throw err;
    }
    
    console.log(response);
});