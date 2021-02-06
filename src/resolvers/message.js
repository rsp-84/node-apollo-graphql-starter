import { v4 as uuidv4 } from 'uuid';

export default {
  Query: {
    messages: (parent, args, { models }, info) => {
      return Object.values(models.messages);
    },
    message: (parent, { id }, { models }, info) => {
      return models.messages[id];
    },
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }, info) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      models.messages[id] = message;
      models.users[me.id].messageIds.push(id);

      return message;
    },
    deleteMessage: (parent, { id }, { models }, info) => {
      const { [id]: message, ...otherMessages } = models.messages;

      if (!message) {
        return false;
      }

      models.messages = otherMessages;

      return true;
    },
    updateMessage: (parent, { id, updateText }, { models }, info) => {
      const { [id]: message } = models.messages;

      if (!message) {
        throw new Error('Message not found!');
      }

      message.text = updateText;

      return message;
    },
  },

  Message: {
    user: (parent, args, { models }, info) => {
      return models.users[parent.userId];
    },
  },
};
