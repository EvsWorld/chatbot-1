import { config } from '../config';

/**
 *  Gets appropriate replies from service 2
 * @param {array} intents - intents returned from ai api
 * @param {object} clientParameters - botId and conversationId given by client
 */
export const getReply = (intents, clientParameters) => {
  const { botId, conversationId } = clientParameters;
  const topIntent = intents.intents.find(
    (intent) => intent.confidence > config.confidenceThreshold
  );
  console.log('topIntent :>> ', topIntent);
  if (topIntent) {
    // TODO: call messages service to get message to return
    // return apropriate message to client
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
