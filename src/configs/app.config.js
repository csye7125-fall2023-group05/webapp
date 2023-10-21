import 'dotenv/config'

const {
  HOSTNAME,
  PORT,
  DBUSER,
  DBPASSWORD,
  DATABASE,
  DBPORT,
  DBHOST,
  DBSCHEMA,
} = process.env

const appConfig = {
  HOSTNAME,
  PORT,
  USER: DBUSER,
  PASSWORD: DBPASSWORD,
  DB: DATABASE,
  DBPORT,
  DBHOST,
  DBSCHEMA,
}

export default appConfig
