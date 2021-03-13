import api from '../utils/axiosConfig';

export const getIntents = async (userMessage) => {
  try {
    const response = await api.post('/intents', userMessage);
    // TODO: function that either 1) returns the top percentage match or
    // 2) if non of the messages have a high enough percentage then just return
    //    stock message saying they'll connect them to a human
    //
    return await response.data;
  } catch (err) {
    console.error(err);
  }
};
