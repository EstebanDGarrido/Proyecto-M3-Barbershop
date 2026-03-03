import "reflect-metadata";
import { DB_PORT, PORT } from "./config/envs";
import server from "./server";
import { AppDataSource } from "./config/data-source";

AppDataSource
    .initialize()
    .then(() => {
        console.log(`Database connected on port: ${DB_PORT}`)
        server.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    })