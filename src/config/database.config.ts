import * as process from "process";

export default () => ({
    db_name: process.env.DB_DATABASE,
    db_port: process.env.DB_PORT,
    db_host: process.env.DB_HOST,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
})
