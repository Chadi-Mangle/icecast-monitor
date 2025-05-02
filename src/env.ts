import * as dotenv from 'dotenv';

dotenv.config()

export const PORT = Number(process.env.PORT) || 3000
export const ICECAST = process.env.ICECAST || "http://localhost:8000"
