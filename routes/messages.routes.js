import { Router } from 'express';
import * as messagesContoller from '../controllers/messages.controller';

const router = Router();

router.post('/reply', messagesContoller.handleReply);

export default router;
