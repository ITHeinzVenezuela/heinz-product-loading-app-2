import { Sequelize } from "sequelize"
import tedious from "tedious"

const dbHost = process.env.DB_HOST as string
const dbUser = process.env.DB_USER as string
const dbName = process.env.DB_NAME as string
const dbPassword = process.env.DB_PASSWORD as string
const dbInstance = process.env.DB_INSTANCE as string
const dbPort = process.env.DB_PORT as string

console.log("dbHost", dbHost);
console.log("dbName", dbName);
console.log("dbUser", dbUser);
console.log("dbPassword", dbPassword);

const MINUTE = 60 * 1000

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: 1433,
  dialect: "mssql",
  dialectModule: tedious,
  dialectOptions: {
    options: {
      instanceName: dbInstance,
      trustServerCertificate: true, // change to true for local dev / self-signed certs,
      encrypt: false,
      connectTimeout: MINUTE / 2,
      requestTimeout: 5 * MINUTE,
    }
  }
})

export default sequelize;