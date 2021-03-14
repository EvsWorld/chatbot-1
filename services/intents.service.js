import api from '../utils/axiosConfig';

/**
 *  Gets appropriate replies from service 2
 * @param {object} userMessage - message from client
 * @param {string} userMessage.botId - botId from client
 * @param {string} userMessage.conversationId - conversationId from client
 * @param {string} userMessage.message - message from client
 */
export const getIntents = async (userMessage) => {
  try {
    const response = await api.post('/intents', userMessage);
    // TODO: function that either 1) returns the top percentage match or
    // 2) if non of the messages have a high enough percentage then just return
    //    stock message saying they'll connect them to a human
    console.log('intents returned :>> ', response.data);
    return await response.data;
  } catch (err) {
    console.error(err);
  }
};
