export const cmdsmetaimport = import.meta;
//globalThis.modules={main, coords, cmds, bans, uis, playersave, spawnprot, mcMath}
export function cmdsEval(x, eventData, bypassChatInputRequests, runreturn, returnBeforeChatSend, returnBeforeChatCommandsOrChatSend, event, player, sendToPlayers, newMessage, switchTest, switchTestB, commanda) {
    return eval(x);
}
export function indirectCmdsEval(x) {
    return eval?.(x);
}
export function cmdsRun(x, ...args) {
    return x(...args);
}
/*
export let abcdefgh = escapeRegExp.arguments*/
//((a: RawMessage)=>{})({rawtext: [{"text": "TPS IS: "}, {"score": {objective: "tps", name: "tps"}}, {"text": "a"}]})
//((a: Player)=>{})(new executeCommandPlayer(getPlayer("Andexter8")))
//world.scoreboard.getObjective("mobdamage").addScore(Player.prototype.scoreboardIdentity, 1)
//world.afterEvents.entityDie.subscribe(event=>{if(event.damageSource?.damagingEntity?.typeId=="minecraft:player"&&((tryget(()=>{let entity = overworld.spawnEntity(event.deadEntity?.typeId, world.getDefaultSpawnLocation()); let r = tryget(()=>entity.runCommand("/execute if entity @s[family=monster] run /scriptevent andexdb:none").successCount); entity.remove(); return r})??0)!=0)){world.scoreboard.getObjective("mobdamage").addScore(event.damageSource.damagingEntity, 1)}else if(event.deadEntity?.typeId=="minecraft:player"){world.scoreboard.getObjective("mobdamage").setScore(event.deadEntity, 0)}})
//world.afterEvents.entityHurt.subscribe(event=>{if(event.hurtEntity.typeId=="minecraft:player"&&((tryget(()=>event.damageSource.damagingEntity.runCommand("/execute if entity @s[family=monster] run /scriptevent andexdb:none").successCount)??0)!=0)){event.hurtEntity.applyDamage((tryget(()=>world.scoreboard.getObjective("mobdamage").getScore(event.hurtEntity))??0)/20)}})
function JSONify(obj) {
    var o = {};
    for (var i in obj) {
        o['"' + i + '"'] = obj[i]; // make the quotes
    }
    return o;
}
const teststssts = true;
//function a<T extends string>(t: flagsMatcherTextC<T>, v: T): asserts t is flagsMatcherTextC<typeof v> {return void undefined};
//a("a", "$123!")
//# sourceMappingURL=commands.js.map