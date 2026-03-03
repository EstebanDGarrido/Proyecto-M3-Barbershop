import "dotenv/config"

export const PORT = process.env.PORT;

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "5432";
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "No Password";
export const DB_NAME = process.env.DB_NAME || "No DB Name";