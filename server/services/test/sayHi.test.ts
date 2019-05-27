import {sayHi} from './sayHi'

describe('test for CICD',()=>{
    it('should say hi', ()=>{
        expect(sayHi()).toEqual("Hi")
    })
})