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
    return await response.data;
  } catch (err) {
    console.error(err);
  }
};
