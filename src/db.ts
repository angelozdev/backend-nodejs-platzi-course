import postgres from 'postgres'
import EV from './constants/ev'

const sql = postgres({
  port: 5432,
  database: EV.postgres.DB,
  username: EV.postgres.USER,
  password: EV.postgres.PASSWORD,
  host: 'db',
  debug: EV.NODE_ENV === 'development'
})

export default sql
