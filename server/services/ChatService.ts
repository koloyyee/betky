import * as Knex from 'knex';

export class ChatService {
    constructor(private knex: Knex, private io:SocketIO.Server) { }

    async retrieveAll() {
        return await this.knex.select('name as member', 'message' )
        .from('chat').innerJoin('member','member_id','member.id')
    }

    async single(memberId: number, message: string) {
        const memberName = this.knex.select('name').from('member').where('id', memberId)
        this.io.on('message', function (socket: any) {
            socket.emit('message', { memberName, message })
        })
    }

    async post(memberId: number, message: string) {
        const member = await this.knex.first('name').from('member').where('id',memberId).returning("name")
        await this.knex.insert({
            member_id: memberId,
            message
        }).into('chat')
        console.log("hihi my name is" ,member);
        this.io.emit('messageToAll', {
            memberId,
            member: member.name, 
            message
        })
    }

}