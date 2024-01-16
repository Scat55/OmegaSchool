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

const Telegram = {
    telegramToken: '6888942230:AAHXfg_I9mhRylxFcVtFMKO_RSBfoCFqR04',
    chatId: '-1001708135921'
}

module.exports = {
    pool,
    poolComandos,
    Telegram
};
