const Knex = require('knex')
const knex = connect()

// create connection obj
function connect () {
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  }

  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
  }

  // connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config
  })

  return knex
}

module.exports = knex