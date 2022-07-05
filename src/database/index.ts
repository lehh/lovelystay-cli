import pgPromise, { IDatabase } from 'pg-promise';
import {
  IClient,
  IConnectionParameters,
} from 'pg-promise/typescript/pg-subset';

export const buildConnection = (): IDatabase<{}, IClient> => {
  const { DB_URL } = process.env;
  const pgp = pgPromise();

  const databaseConfig: IConnectionParameters = {
    connectionString: DB_URL,
  };

  return pgp(databaseConfig);
};
