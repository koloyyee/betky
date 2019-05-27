import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import jwt from './jwt';
import { memberService } from './main';


passport.initialize();  

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

passport.use('jwt', new JWTStrategy({
    secretOrKey: jwt.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
    console.log("payload", payload)
    const member = (await memberService.getMembers())
        .find((member: any) => member.id == payload.id);
    if (member) {
        return done(null, { id: member.id });
    } else {
        return done(new Error("User not Found"), null);
    }
})
);