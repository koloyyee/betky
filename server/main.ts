import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as Knex from 'knex';
import * as cors from 'cors';
import { MemberService } from './services/MemberService';
import { isLoggedIn } from './guards';
import { MatchService } from './services/MatchService';
import { BetService } from './services/BetService';
import { MatchRouter } from './routers/MatchRouter';
import { BetRouter } from './routers/BetRouter';
import { MemberRouter } from './routers/MemberRouter';
import { TeamRouter } from './routers/TeamRouter';
import { CurrentInfoRouter } from './routers/CurrentInfoRouter';
import { TeamService } from './services/TeamService';
import { OddService } from './services/OddService';
import { OddRouter } from './routers/OddRouter';
import * as http from 'http';
import * as socketIO from 'socket.io';
import { ChatRouter } from './routers/ChatRouter';
import { ChatService } from './services/ChatService';
import { ChannelRouter } from './routers/ChannelRouter';
import { ChannelService } from './services/ChannelService';
import './passport';
import { AdminService } from './services/AdminService';
import { AdminRouter } from './routers/AdminRouter';
import { GameHistoryService } from './services/GameHistoryService';
import { TotalBetHistoryService } from './services/TotalBetHistoryService';
import { ProductRouter } from './routers/ProductRouter';
import { TransactionRouter } from './routers/TransactionRouter';
import { ProductService } from './services/ProductService';
import { TransactionService } from './services/TransactionService';
import { CurrentMemberRouter } from './routers/CurrentMemberRouter';

const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("body-parser").text());

const sessionMiddleware = expressSession({
    secret: 'E-sport Bet',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);


// Socket IO Chatroom
const server = new http.Server(app);
const io = socketIO(server);
const chatService = new ChatService(knex, io);
const chatRouter = new ChatRouter(chatService);
app.use('/chat', isLoggedIn, chatRouter.router());

// Services
const matchService = new MatchService(knex);
const teamService = new TeamService(knex);
const oddService = new OddService(knex);
const channelService = new ChannelService(knex);
const adminService = new AdminService(knex);
const gameHistoryService = new GameHistoryService(knex)
const totalBetHistoryService = new TotalBetHistoryService(knex);
const productService = new ProductService(knex);
const transactionService = new TransactionService(knex);
const betService = new BetService(knex, matchService, teamService);
export const memberService = new MemberService(knex);

// Routers 
const matchRouter = new MatchRouter(matchService, teamService, oddService);
const memberRouter = new MemberRouter(memberService);
const currentMemberRouter = new CurrentMemberRouter(betService, memberService)
const betRouter = new BetRouter(betService, memberService, matchService, teamService);
const currentInfoRouter = new CurrentInfoRouter(betService, teamService, matchService, channelService, oddService);
const oddRouter = new OddRouter(oddService, teamService, matchService);
const teamRouter = new TeamRouter(teamService);
const channelRouter = new ChannelRouter(channelService);
const adminRouter = new AdminRouter(adminService, matchService, oddService, teamService, gameHistoryService, channelService, totalBetHistoryService, io)
const productRouter = new ProductRouter(productService);
const transactionRouter = new TransactionRouter(transactionService, productService);




app.use('/match', matchRouter.router());
app.use('/team', teamRouter.router());
app.use('/odd', oddRouter.router())
app.use('/member', memberRouter.router());
app.use('/channel', channelRouter.router());
app.use('/admin', adminRouter.router())
app.use('/product', productRouter.router());
app.use('/current', currentInfoRouter.router());

app.use('/current-member', isLoggedIn, currentMemberRouter.router());
app.use('/bet', isLoggedIn, betRouter.router());
app.use('/charge', isLoggedIn, transactionRouter.router());


//test for admin page
app.use(express.static('public'))

io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
});


io.on('connection', function (socket) {
    socket.request.session.socketId = socket.id;
    socket.request.session.save();
    socket.on("disconnect", () => {
        socket.request.session.socketId = null;
        socket.request.session.save();
    })
});

io.on('connection', function (socket) {
    // socket set up room 
    socket.on('matchInfo', (room:string)=>{
        socket.join(room)

    })
    
    socket.on('sendMessage', (message: string) => {
        socket.emit('sendMessage', message)
    })

    socket.on('messageToAll', (message: string) => {
        socket.broadcast.emit('messageToAll', message)
    })

    
    socket.on("disconnect", () => {
        socket.request.session.socketId = null;
        socket.request.session.save();
        
    })
    
    
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});