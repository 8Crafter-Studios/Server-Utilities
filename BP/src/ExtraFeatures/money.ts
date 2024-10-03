import { world } from "@minecraft/server"

export class MoneySystem {
    playerID: `${number}`
    get money(){return world.getDynamicProperty(`playerMoney:${this.playerID}`).toString().toBigInt()}
    addMoney(amount: number|bigint){
        world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money+amount.toBigInt()).toString())
    }
    removeMoney(amount: number|bigint){
        world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money-amount.toBigInt()).toString())
    }
    setMoney(amount: number|bigint = 0){
        world.setDynamicProperty(`playerMoney:${this.playerID}`, amount.toBigInt().toString())
    }
    constructor(playerID: `${number}`){
        this.playerID=playerID
    }
}