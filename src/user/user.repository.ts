import { buildConnection } from '../database';
import { User } from './user.type';

export const findByLogin = async (login: string): Promise<User | null> => {
  const dbConnection = buildConnection();

  const user = await dbConnection.oneOrNone(
    `
      SELECT id FROM users
      WHERE login LIKE $1
  `,
    login
  );

  return user;
};

export const insert = async (user: User): Promise<User> => {
  const { login, name, location, url, createdAt } = user;
  const dbConnection = buildConnection();

  return dbConnection.one(
    `
      INSERT INTO users(login, name, location, url, created_at) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `,
    [login, name, location, url, createdAt]
  );
};

export const insertManyUserLanguages = async (
  userId: number,
  languages: string[]
): Promise<void> => {
  const dbConnection = buildConnection();

  await dbConnection
    .tx((transaction) => {
      const query = languages.map((language) => {
        return transaction.none(
          `
        INSERT INTO users_languages(user_id, language)
        VALUES ($1, $2)
      `,
          [userId, language]
        );
      });

      transaction.batch(query);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const findAll = async (): Promise<User[]> => {
  const dbConnection = buildConnection();

  const users = await dbConnection.any(`
    SELECT * FROM users
  `);

  return users;
};

export const findAllByLocation = async (location: string): Promise<User[]> => {
  const dbConnection = buildConnection();

  const users = await dbConnection.any(
    `
    SELECT * FROM users WHERE location ILIKE $1
  `,
    '%' + location + '%'
  );

  return users;
};
