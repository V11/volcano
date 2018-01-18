/**
 * Created by kurpav on 5/2/15.
 */

var Hapi = require('hapi'),
    config = require('./modules/config').main;

// Create a server with a host and port
var server = new Hapi.Server({
    connections: {
        routes: {
            cors: {
                origin: config.connection.allowedServers
            }
        }
    }
});

server.connection({
    host: config.connection.host,
    port: parseInt(config.connection.port, 10)
});

// Declare plugins
var plugins = [
    {register: require('./routes/main.js')},
    {
        register: require('hapi-couchdb'),
        options: {
            url: 'http://localhost:5984',
            db: 'volcano'
        }
    }
];

// Register plugins, and start the server if none of them fail
server.register(plugins, function (err) {
    if (err) {
        throw err;
    }

    server.start(function () {
        console.log('Server running at: ' + server.info.uri);
    });
});