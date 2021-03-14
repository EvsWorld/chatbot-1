import axios from 'axios';
import { config } from '../config';

/**
 *  Gets appropriate replies from service 2
 * @param {array} intents - intents returned from ai api
 * @param {object} params - botId and conversationId given by client
 */
export const respondFromReplies = async (intents, params) => {
  const { botId, conversationId } = params;
  const topIntent = intents.intents.find(
    (intent) => intent.confidence > config.confidenceThreshold
  );
  console.log('topIntent :>> ', topIntent);
  if (topIntent) {
    // TODO: call messages service to get message to return
    // return apropriate message to client
    const topIntentAndParams = { ...params, intent: topIntent.name };
    console.log('topIntentAndParams :>> ', topIntentAndParams);
    const reply = await getReplyFromExternal(topIntentAndParams);
    console.log('reply :>> ', reply);
    if (reply) {
      return {
        meta: `Understood intent (${topIntent.name}) and found reply in s2 db`,
        data: { reply, botId, conversationId },
      };
    } else {
      return {
        meta: `Understood intent (${topIntent.name}) but could NOT find a reply in s2 db`,
        data: { botId, conversationId },
      };
    }
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
    const result = await axios.get(
      `${config.serverTwoUrl}/api/replies/oneReply`,
      {
        params,
      }
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
