import { buildConnection } from "../database";
import { User } from "./user.type"

export const findByLogin = async (login: string): Promise<number> => {
  const dbConnection = buildConnection();

  const userId = await dbConnection.oneOrNone(
    `
      SELECT id FROM users
      WHERE login LIKE $1
  `,
    login
  );

  return userId;
}

export const insert = async (user: User): Promise<void> => {
  const { login, name, location, url, createdAt } = user;
  const dbConnection = buildConnection();

  await dbConnection.none(
    `
      INSERT INTO users(login, name, location, url, created_at) 
      VALUES ($1, $2, $3, $4, $5)
    `,
    [login, name, location, url, createdAt]
  );
}