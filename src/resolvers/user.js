export default {
  Query: {
    me: (parent, args, { me }, info) => {
      return me;
    },
    user: (parent, { id }, { models }, info) => {
      return models.users[id];
    },
    users: (parent, args, { models }, info) => {
      return Object.values(models.users);
    },
  },

  User: {
    messages: (parent, args, { models }, info) => {
      return Object.values(models.messages).filter(
        (message) => message.userId === parent.id,
      );
    },
  },
};
