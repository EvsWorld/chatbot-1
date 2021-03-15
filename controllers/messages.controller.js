import api from '../utils/axiosConfig';
import { getIntents } from '../services/intents.service';
import { config } from '../config';
import { respondFromReplies } from '../services/replies.service';

/**
 * returns reply to client
 */
export const handleReply = async (req, res) => {
  const { botId, message, conversationId } = req.body;

  const clientParameters = { botId, conversationId };
  const userMessage = {
    botId,
    message,
    conversationId,
  };

  try {
    const intents = await getIntents(userMessage);

    const reply = await respondFromReplies(intents, clientParameters);
    console.log('respondFromReplies :>> ', reply);
    res.status(reply.status).send({
      status: reply.status,
      meta: reply.meta,
      data: reply.data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 500,
      meta: 'Internal error',
    });
  }
};
