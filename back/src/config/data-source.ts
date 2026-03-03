import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import User from "../entities/UserEntity";
import Credential from "../entities/CredentialEntity";
import Appointment from "../entities/AppointmentEntity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User, Credential, Appointment],
    dropSchema: false,  //!PASAR A FALSE EN PRODUCCIÓN!!!!!
    synchronize: true,
    logging: false,
});