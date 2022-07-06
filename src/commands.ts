import { fetchUser, getAll, getAllFromLocation } from './user/user.service';

export const help = (): void => {
  console.log(`
    Valid Commands:

    help
    fetch user <username>
    find all users
    find users by location <location>
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
    users: {
      by: {
        location: getAllFromLocation,
        //language: {},
      },
    },
  },
};
