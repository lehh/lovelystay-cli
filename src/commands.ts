import { fetchUser, getAll } from './user/user.service';

export const help = (): void => {
  console.log(`
    Valid Commands:

    help
    fetch user <username>
    find all users
  `);
};

export const commands = {
  help,
  fetch: {
    user: fetchUser,
  },
  find: {
    all: {
      users: getAll,
    },
  }
  //   users: {
  //     by: {
  //       location: {},
  //       language: {},
  //     },
  //   },
  // },
};
