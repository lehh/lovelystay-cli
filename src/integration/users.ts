import axios from 'axios';
import { IntegrationUserRepo } from './integration-user-repo.type';
import { IntegrationUser } from './integration-user.type';

const { GIT_API_URL } = process.env;
const BASE_URL = `${GIT_API_URL}/users`;

export const getUser = async (
  username: string
): Promise<IntegrationUser | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`);

    const {
      login,
      name,
      location,
      html_url: url,
      created_at: createdAt,
    } = await response.data;

    return {
      login,
      name,
      location,
      url,
      createdAt,
    };
  } catch (err: any) {
    return;
  }
};

export const getUserRepos = async (
  username: string
): Promise<IntegrationUserRepo[] | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}/repos`);

    const repos = await response.data;

    return repos.map((repo) => ({
      language: repo.language,
    }));
  } catch (err) {
    return;
  }
};
