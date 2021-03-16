import { Router } from 'express';
import * as messagesContoller from '../controllers/messages.controller';
import schema from './message-handler-input.schema.json';
import { schemaValidator } from '../middlewares/schema-validation.middleware.js';

const router = Router();

router.post(
  '/chat-reply',
  schemaValidator(schema),
  messagesContoller.handleMessage
);

export default router;
