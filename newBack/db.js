const Pool = require('pg').Pool
const pool = new Pool({
    user: 'omega',
    password: 'omega',
    host: '89.223.30.10',
    port: 5432,
    database: 'postgres'
})

module.exports = pool