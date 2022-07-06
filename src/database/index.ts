import pgPromise, { IDatabase } from 'pg-promise';
import {
  IClient,
  IConnectionParameters,
} from 'pg-promise/typescript/pg-subset';

let db: IDatabase<{}, IClient>;

export const buildConnection = (): IDatabase<{}, IClient> => {
  if (db) return db;

  const { DB_URL } = process.env;
  const pgp = pgPromise();

  const databaseConfig: IConnectionParameters = {
    connectionString: DB_URL,
  };

  db = pgp(databaseConfig);

  return db;
};
