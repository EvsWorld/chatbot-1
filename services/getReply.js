import axios from 'axios';
import { config } from '../config';

/**
 *  Gets appropriate replies from service 2
 * @param {array} intents - intents returned from ai api
 * @param {object} params - botId and conversationId given by client
 */
export const respondFromReplies = (intents, params) => {
  const { botId, conversationId } = params;
  const topIntent = intents.intents.find(
    (intent) => intent.confidence > config.confidenceThreshold
  );
  console.log('topIntent :>> ', topIntent);
  if (topIntent) {
    // TODO: call messages service to get message to return
    // return apropriate message to client
    // const topIntentAndParams = { ...params, intent: topIntent.name };
    // const reply = getReplyFromExternal(topIntentAndParams);
    // return reply;
    return topIntent;
  } else {
    // if non of the messages have a high enough percentage then just return
    // stock message saying they'll connect them to a human
    return {
      meta: "Wasn't confident enough in users intent ",
      data: { botId, conversationId, reply: config.noConfidenceReply },
    };
  }
};

export const getReplyFromExternal = async (params) => {
  const { botId, conversationId, intent } = params;
  try {
    const result = await axios.get(`${config.serverTwoUrl}/api/oneReply`, {
      params,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
