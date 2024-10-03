import { Entity, world } from "@minecraft/server"

export class MoneySystem {
    playerID: `${number}`
    get money(){return String(world.getDynamicProperty(`playerMoney:${this.playerID}`)).toBigInt()??0n}
    addMoney(amount: number|bigint){
        world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money+amount.toBigInt()).toString())
        try{world.scoreboard.getObjective("andexdb:money").setScore(world.scoreboard.getObjective("andexdb:money").getParticipants().find(v=>v.getEntity()?.id==this.playerID), Math.min(this.money.toNumber(), 2000000000))}catch{}
    }
    removeMoney(amount: number|bigint){
        world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money-amount.toBigInt()).toString())
        try{world.scoreboard.getObjective("andexdb:money").setScore(world.scoreboard.getObjective("andexdb:money").getParticipants().find(v=>v.getEntity()?.id==this.playerID), Math.min(this.money.toNumber(), 2000000000))}catch{}
    }
    setMoney(amount: number|bigint = 0){
        world.setDynamicProperty(`playerMoney:${this.playerID}`, amount.toBigInt().toString())
        try{world.scoreboard.getObjective("andexdb:money").setScore(world.scoreboard.getObjective("andexdb:money").getParticipants().find(v=>v.getEntity()?.id==this.playerID), Math.min(amount.toNumber(), 2000000000))}catch{}
    }
    constructor(playerID: `${number}`){
        this.playerID=playerID
    }
    static get(player: `${number}`|Entity|{id: string|`${number}`}|number|bigint|string){
        return new MoneySystem(typeof player == "string" ? player as `${number}` : typeof player == "number" ? player.toString() as `${number}` : typeof player == "bigint" ? player.toString() as `${number}` : player.id as `${number}`)
    }
}