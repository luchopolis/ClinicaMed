require('dotenv').config()

const config = {
    PORT:process.env.PORT || 3000,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.database
}

module.exports = config;