/*

export function* generateNBTFileFBG(location: DimensionLocation, nbt: {block_indices: number[], block_palette: {name: string, states?: {[stateName: string]: string|number|boolean}}[], size: [x: number, y: number, z: number], nbt_type: "cmprsnbt"}){
    for(let i = 0; i<)
    nbt.block_indices.forEach((b, i)=>b!=-1?tryrun(()=>(location.dimension.setBlockType(Vector3Utils.add(location, arryTV3([Math.floor(i/(nbt.size[1]*nbt.size[2]))%nbt.size[0], Math.floor(i/nbt.size[2])%nbt.size[1], i%nbt.size[2]])), nbt.block_palette[b].name.replace("minecraft:active - lit_redstone_lamp", "minecraft:lit_redstone_lamp")), (nbt.block_palette[b].name=="minecraft:coarse_dirt"||nbt.block_palette[b].name=="coarse_dirt")?location.dimension.setBlockPermutation(Vector3Utils.add(location, arryTV3([Math.floor(i/(nbt.size[1]*nbt.size[2]))%nbt.size[0], Math.floor(i/nbt.size[2])%nbt.size[1], i%nbt.size[2]])), BlockPermutation.resolve("minecraft:dirt", {dirt_type: "coarse"})):!!nbt.block_palette[b].states?Object.entries(nbt.block_palette[b].states).forEach(p=>tryrun(()=>location.dimension.setBlockPermutation(Vector3Utils.add(location, arryTV3([Math.floor(i/(nbt.size[1]*nbt.size[2]))%nbt.size[0], Math.floor(i/nbt.size[2])%nbt.size[1], i%nbt.size[2]])), BlockPermutation.resolve(nbt.block_palette[b].name.replace("minecraft:active - lit_redstone_lamp", "minecraft:lit_redstone_lamp"), Object.assign(location.dimension.getBlock(Vector3Utils.add(location, arryTV3([Math.floor(i/(nbt.size[1]*nbt.size[2]))%nbt.size[0], Math.floor(i/nbt.size[2])%nbt.size[1], i%nbt.size[2]]))).permutation.getAllStates(), {[p[0]]: p[1]}))))):undefined)):undefined)
}*/
//rangeToIntArray([0, 5000000]).forEach(v=>Number.parseInt(String(v), 36))
//${se}bsend(extractIntArrayB(compressIntArray([5, 5, 5, 5, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]))); bsend(JSONStringify([5, 5, 5, 5, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]))
//${se}bsend(JSONStringify(extractIntArray(compressIntArray([5, 5, 5, 5, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5])))); bsend(JSONStringify([5, 5, 5, 5, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]))
export function vTV3(vector) {
    return { x: vector.x, y: vector.y, z: vector.z };
}
//# sourceMappingURL=vTV3.js.map