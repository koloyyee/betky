import { MemberService } from '../services/MemberService';
import * as express from 'express';
import { Request, Response } from 'express';
import * as jwtSimple from 'jwt-simple';
import jwt from '../jwt';
import { checkPassword } from '../hash';
import { isLoggedIn } from '../guards';

export class MemberRouter {
    constructor(private memberService: MemberService) {

    }

    router() {
        const router = express.Router();
        router.post('/login', this.post);
        router.post('/register', this.register);
        router.get('/', isLoggedIn, this.get)
        return router;
    }

    private register = async (req: Request, res: Response) => {
        try {
            const newMember = req.body
            res.json(await this.memberService.createMember(newMember))
        } catch (e) {
            res.status(400);
            res.json({ success: false })
        }
    }

    private post = async (req: Request, res: Response) => {
        if (req.body.username && req.body.password) {
            const { username, password } = req.body;
            const members = (await this.memberService.getMembersByName(username))
            const member = members[0];
            if (member && await checkPassword(password, member.password)) {
                const payload = {
                    id: member.id
                };
                const token = jwtSimple.encode(payload, jwt.jwtSecret);
                console.log(token)
                res.json({
                    token: token
                });
            } else {
                res.status(401).json({ msg: "Username/Password is wrong!" });
            }
        } else {
            res.status(401).json({ msg: "Username/Password is wrong!" })
        }
    }
    private get = async (req:Request, res:Response) =>{
        try{
            const id = req.user.id
            res.json(await this.memberService.getMemberById(id))

        }catch(e){
            console.log(e);
            res.status(400);
            res.json({ success: false })

        }
    }

}

