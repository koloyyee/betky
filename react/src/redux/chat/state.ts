export interface IChat{
    memberId:number
    member:string
    message: string
}

export type IChatHistory = IChat[]

export interface IChatState{
    chatHistory: IChat[]
}