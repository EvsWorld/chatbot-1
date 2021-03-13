import { Router } from 'express';
import * as messagesContoller from '../controllers/messages.controller';

const router = Router();

router.get('/reply', messagesContoller.getReply);

export default router;
