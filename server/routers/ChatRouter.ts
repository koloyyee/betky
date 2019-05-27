import * as express from 'express'
import { Response, Request } from 'express';
import { ChatService } from '../services/ChatService';



export class ChatRouter {

    constructor(private chatService: ChatService) {

    }
    router() {
        const router = express.Router()
        router.get('/', this.loadChatHistory);
        router.post('/', this.sendMessage);
        return router;
    }

    private loadChatHistory = async (_req: Request, res: Response) => {
        try {
            const chatHistory = await this.chatService.retrieveAll();
            console.log(chatHistory)
            res.json({chatHistory})
        } catch (e) {
            console.error(e)
            res.status(400)
            res.json({ success: true })
        }
    }

    private sendMessage = async (req: Request, res: Response) => {
        try {
            await this.chatService.post(req.user.id, req.body.message)
            // this.io.emit('message', req.body.message)
            res.json({ update: 1 })
        } catch (e) {
            console.error(e)
            res.status(400)
            res.json({ success: false })
        }
    }

}