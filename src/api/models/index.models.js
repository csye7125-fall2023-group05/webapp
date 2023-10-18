import { Sequelize } from 'sequelize'
import appConfig from '../../configs/app.config'
import logger from '../../configs/logger.config'

const { USER, PASSWORD, DB, DBHOST, DBPORT } = appConfig

export async function initializeDatabase() {
  try {
    const sequelize = new Sequelize(
      `postgres://${USER}:${PASSWORD}@${DBHOST}:${DBPORT}/${DB}`,
      {
        logging: (message) => logger.info(message),
      }
    )
    return sequelize.sync()
  } catch (error) {
    logger.error('Unable to connect to the database:', { error })
  }
}
