import path from 'path';
import fs from 'fs';
import YAML from 'yaml';
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const configSchema = z.object({
  http: z.object({
    host: z.string(),
    port: z.number()
  }),
  postgres: z.object({
    host: z.string(),
    port: z.number(),
    user: z.string(),
    password: z.string(),
    db: z.string()
  }),
  jwt: z.object({
    secret: z.string()
  }),
  example: z.object({
    message: z.string()
  })
});

export type Config = z.infer<typeof configSchema>;

const defaultConfigPath = 'config/config.yml';

const parseConfig = (): Config => {
  const configAbsPath = path.resolve(process.cwd(), defaultConfigPath);

  const file = fs.readFileSync(configAbsPath, 'utf-8');

  const config: Config = YAML.parse(file);

  // Override config values with environment variables if they exist
  config.postgres.user = process.env.POSTGRES_USER || config.postgres.user;
  config.postgres.password = process.env.POSTGRES_PASSWORD || config.postgres.password;
  config.postgres.db = process.env.POSTGRES_DB || config.postgres.db;
  config.postgres.host = process.env.POSTGRES_HOST || config.postgres.host;
 

  const result = configSchema.safeParse(config);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error));
  }

  return result.data;
};

export const config = parseConfig();

export const devMode = process.env.NODE_ENV === 'development';
