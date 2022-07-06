import { getUser, getUserRepos } from '../integration/users';
import {
  findAll,
  findAllByLocation,
  findByLogin,
  insert,
  insertManyUserLanguages,
} from './user.repository';

export const fetchUser = async (username: string): Promise<void> => {
  try {
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

    const existingUser = await findByLogin(login);

    if (existingUser) {
      console.log(`User ${username} was already fetched previously`);
      return;
    }

    const user = await insert({
      login,
      name,
      location,
      url,
      createdAt,
    });

    if (!user.id) return;

    await fetchUserRepos(username, user.id);

    console.log(`User ${username} successfully fetched`);
  } catch (err) {
    console.log(`An error occurred while fetching ${username} user`);
  }
};

const fetchUserRepos = async (
  username: string,
  userId: number
): Promise<void> => {
  const userRepos = await getUserRepos(username);

  if (!userRepos) {
    console.log(`User ${username} doesn't have repositories to be fetched`);
    return;
  }

  const languages = userRepos.reduce((prev, repo) => {
    if (!repo.language) return prev;

    prev.push(repo.language);

    return prev;
  }, [] as string[]);

  const languagesSet = new Set(languages);

  insertManyUserLanguages(userId, Array.from(languagesSet));
};

export const getAll = async (): Promise<void> => {
  try {
    const users = await findAll();

    console.log(JSON.stringify(users, null, 2));
  } catch (err) {
    console.log(`An error occurred while retrieving users`);
  }
}

export const getAllFromLocation = async (location: string) => {
  try {
    const users = await findAllByLocation(location);

    console.log(JSON.stringify(users, null, 2));
  } catch (err) {
    console.log(`An error occurred while retrieving users by location`);
  }
}