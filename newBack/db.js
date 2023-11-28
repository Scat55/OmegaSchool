const Pool = require('pg').Pool
const pool = new Pool({
    user: 'omega',
    password: '159456Omega!',
    host: '77.222.36.27',
    port: 18181,
    database: 'omega'
})

module.exports = pool