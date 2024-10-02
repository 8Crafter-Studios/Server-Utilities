import { world } from "@minecraft/server"

export class MoneySystem {
    playerID: `${number}`
    get money(){return world.getDynamicProperty(`playerMoney:${this.playerID}`)}
    addMoney(amount: number|bigint){}
    constructor(playerID: `${number}`){
        this.playerID=playerID
    }
}