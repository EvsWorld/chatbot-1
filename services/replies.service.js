import axios from 'axios';
import { config } from '../config';

/**
 *  Gets appropriate replies from service 2
 * @param {array} intents - intents returned from ai api
 * @param {object} params - botId and conversationId given by client
 */
export const respondFromReplies = async (intents, params) => {
  const { botId, conversationId } = params;
  const topIntent =
    intents &&
    intents.intents.find(
      (intent) => intent.confidence > config.confidenceThreshold
    );
  if (topIntent) {
    // call messages service to get message to return
    // return apropriate message to client
    const topIntentAndParams = { ...params, intent: topIntent.name };
    try {
      const reply = await getReplyFromExternal(topIntentAndParams);
      if (reply.status === 200) {
        const replyData = reply.data.data;
        return {
          status: reply.data.status,
          meta: `Understood intent and found reply in s2 db`,
          data: {
            finalReply: replyData.replyMessage,
            intent: replyData.intent,
          },
        };
      }
    } catch (err) {
      if (err.errno === 'ECONNREFUSED') {
        return {
          status: 500,
          meta: `Understood intent but could not connect to replies service`,
          data: { intent: topIntent.name },
        };
      }
      if (err.response.data.status == 404)
        return {
          status: 404,
          meta: `Understood intent but could NOT find a reply in replies service`,
          data: { finalReply: config.needHumanMessage, intent: topIntent.name },
        };
    }
  } else {
    // if non of the messages have a high enough percentage then just return
    // stock message saying they'll connect them to a human
    return {
      status: 422,
      meta: "Wasn't confident enough in users intent",
      data: { finalReply: config.needHumanMessage },
    };
  }
};

export const getReplyFromExternal = async (params) => {
  const { botId, conversationId, intent } = params;
  const result = await axios.get(`${config.serverTwoUrl}/api/replies/`, {
    params,
  });
  return result;
};
