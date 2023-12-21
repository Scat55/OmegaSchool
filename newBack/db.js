const { Pool } = require('pg');

const pool = new Pool({
    user: 'omega',
    password: '159456Omega!',
    host: '77.222.36.27',
    port: 18181,
    database: 'omega'
});

const poolComandos = new Pool({
    user: 'omega',
    password: '159456Omega!',
    host: '77.222.36.27',
    port: 18181,
    database: 'comandos'
});

module.exports = {
    pool,
    poolComandos
};
