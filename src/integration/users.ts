import axios from 'axios';
import { IntegrationUserRepo } from './integration-user-repo.type';
import { IntegrationUser } from './integration-user.type';

const baseUrl = (): string => {
  const { GIT_API_URL } = process.env;
  return `${GIT_API_URL}/users`;
};

export const getUser = async (
  username: string
): Promise<IntegrationUser | undefined> => {
  try {
    const response = await axios.get(`${baseUrl()}/${username}`);

    const { login, name, location, html_url, created_at } = await response.data;

    return {
      login,
      name,
      location,
      html_url,
      created_at,
    };
  } catch (err: any) {
    console.log(err);
    return;
  }
};

export const getUserRepos = async (
  username: string
): Promise<IntegrationUserRepo[] | undefined> => {
  try {
    const response = await axios.get(`${baseUrl()}/${username}/repos`);

    const repos = await response.data;

    return repos.map((repo) => ({
      language: repo.language,
    }));
  } catch (err) {
    return;
  }
};
