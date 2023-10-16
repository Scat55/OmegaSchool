const Pool = require('pg').Pool
const pool = new Pool({
user: 'fmelkrew',
  password: '5cJNc_A8y-36jau8T-3N8Ih_rdS15NMT',
  host: 'flora.db.elephantsql.com',
   port: 5432,
    database: 'fmelkrew'
})

module.exports = pool
