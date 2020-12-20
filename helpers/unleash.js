const unleash = require('unleash-server');

module.exports.start = ()=> {
    return unleash.start({
        databaseUrl: 'postgres://brad:123456789@localhost:5432/unleash',
        port: 4242,
    }).then(unleash => {
        console.log(
            `Unleash started on http://localhost:${unleash.app.get('port')}`,
        );
    });
}