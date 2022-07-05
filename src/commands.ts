import { fetchUser } from './user/user.service';

export const help = (): void => {
  console.log(`
    Valid Commands:

    help
    fetch user <username>
  `);
};

export const commands = {
  help,
  fetch: {
    user: fetchUser,
  },
  // find: {
  //   all: {
  //     users: {},
  //   },
  //   users: {
  //     by: {
  //       location: {},
  //       language: {},
  //     },
  //   },
  // },
};
