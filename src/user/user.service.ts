import { getUser } from '../integration/users';
import { findByLogin, insert } from './user.repository';

export const fetchUser = async (username: string): Promise<void> => {
  const integrationUser = await getUser(username);

  if (!integrationUser) {
    console.log('User not found');
    return;
  }

  const {
    login,
    name,
    location,
    html_url: url,
    created_at: createdAt,
  } = integrationUser;

  const existingUserId = await findByLogin(login);

  if (existingUserId) {
    console.log(`User ${username} was already fetched previously`);
    return;
  }

  await insert({
    login,
    name,
    location,
    url,
    createdAt
  });

  console.log(`User ${username} successfully fetched`);
};
