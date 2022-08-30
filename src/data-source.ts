import "reflect-metadata"
import {DataSource} from "typeorm"

import dotenv from "dotenv"
import path from "path"

dotenv.config()


export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},

    entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")]
})