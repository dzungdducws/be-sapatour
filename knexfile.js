// knexfile.js
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db.qfrxbyekwdlsoqefmxhd.supabase.co',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'Letm3se3!uRcode',
      database: process.env.DB_NAME || 'postgres',
      port: 5432,
      ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};