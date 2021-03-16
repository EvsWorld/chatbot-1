export const config = {
  port: process.env.PORT || '5000',
  aiApiKey: process.env.AI_APIKEY,
  intentsUrl: process.env.INTENTS_API_URL,
  serverOneUrl: process.env.SERVER_ONE_URL,
  serverTwoUrl: process.env.SERVER_TWO_URL,
  confidenceThreshold: 0.6,
  needHumanMessage:
    "I'm sorry, I'm not sure how to proceed, transfering you to a customer service specialist now.",
};
