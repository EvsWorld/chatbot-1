import api from '../utils/axiosConfig';
import { getIntents } from '../services/getIntents';

export const getReply = async (req, res) => {
  // TODO: call messages service
  const { botId, message, conversationId } = req.query;

  const example = {
    botId,
    message,
    conversationId,
  };

  try {
    const intents = await getIntents(example);
    const replyIfNotConfident = intents => {
     
    }
    // TODO: function that either 1) returns the top percentage match or
    //  TODO: subfunction to call message server (s2) with the top intent

    // 2) if non of the messages have a high enough percentage then just return
    //    stock message saying they'll connect them to a human
    //

    res
      .status(200)
      // .send({ data: { reply: 'hello reploy', conversationId: 'xxx' } });
      .send({ data: intents });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
