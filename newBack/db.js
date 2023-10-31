const Pool = require('pg').Pool
const pool = new Pool({
    user: 'omega',
    password: 'omega',
    host: '89.223.30.10',
    port: 5432,
    database: 'postgres'
})

module.exports = pool

// const Pool = require('pg').Pool
// const pool = new Pool({
// user: 'fmelkrew',
//   password: '5cJNc_A8y-36jau8T-3N8Ih_rdS15NMT',
//   host: 'flora.db.elephantsql.com',
//    port: 5432,
//     database: 'fmelkrew'
// })
//
// module.exports = pool
//
//     user: 'postgres',
//     password: 'user',
//     host: '192.168.0.118',
//     port: 5432,
//     database: 'omega'