const locationRoute = require('./location-route');

function routesInit(app) {
    app.use('/', locationRoute);
}

module.exports = routesInit;