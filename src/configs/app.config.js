import 'dotenv/config'

const { HOSTNAME, PORT, DBUSER, DBPASSWORD, DATABASE, DBPORT, DBHOST } =
  process.env

const appConfig = {
  HOSTNAME,
  PORT,
  USER: DBUSER,
  PASSWORD: DBPASSWORD,
  DB: DATABASE,
  DBPORT,
  DBHOST,
}

export default appConfig
