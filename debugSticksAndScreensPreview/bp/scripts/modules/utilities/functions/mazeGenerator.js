import { BlockPermutation, Direction } from "@minecraft/server";
export async function mazeGenerator(startCorner, endCorner, dimension, options) {
    let { entranceDirection = Direction.South, exitDirection = Direction.North, complexity = 1, airBlockType = BlockPermutation.resolve("air"), wallBlockType = BlockPermutation.resolve("stone") } = options;
    // Initialize the maze grid based on the provided coordinates
    const width = Math.abs(endCorner.x - startCorner.x) + 1;
    const height = Math.abs(endCorner.y - startCorner.y) + 1;
    const length = Math.abs(endCorner.z - startCorner.z) + 1;
    const start = { x: Math.min(startCorner.x, endCorner.x), y: Math.min(startCorner.y, endCorner.y), z: Math.min(startCorner.z, endCorner.z) };
    const end = { x: Math.max(startCorner.x, endCorner.x), y: Math.max(startCorner.y, endCorner.y), z: Math.max(startCorner.z, endCorner.z) };
    const maze = Array.from({ length: length }, () => Array(width).fill(0));
    let lastTickWait = Date.now();
    let iterations = 0n;
    let iterationsSinceLastWaitTick = 0n;
    // Function to generate the maze using recursive backtracking
    function* generateMaze(x, z) {
        const stack = [[x, z]];
        const directions = [
            [0, -1], // NORTH
            [0, 1], // SOUTH
            [-1, 0], // WEST
            [1, 0] // EAST
        ];
        while (stack.length > 0) {
            const [cx, cz] = stack.pop();
            iterations++;
            iterationsSinceLastWaitTick++;
            // Shuffle directions to ensure randomness
            directions.sort(() => Math.random() - 0.5);
            for (const [dx, dz] of directions) {
                const nx = cx + dx * 2;
                const nz = cz + dz * 2;
                if (nx > 0 && nx < width - 1 && nz > 0 && nz < length - 1 && maze[nz][nx] === 0) {
                    maze[nz][nx] = 1;
                    maze[cz + dz][cx + dx] = 1;
                    stack.push([nx, nz]);
                    yield;
                }
            }
        }
    }
    // Start maze generation from the entrance
    const startX = entranceDirection === Direction.West ? 1 : width - 2;
    const startZ = entranceDirection === Direction.North ? 1 : length - 2;
    // const endX = exitDirection === Direction.West ? 1 : width - 2;
    // const endZ = exitDirection === Direction.North ? 1 : length - 2;
    const endX = exitDirection === Direction.West ? width - 2 : 1;
    const endZ = exitDirection === Direction.North ? length - 2 : 1;
    maze[startZ][startX] = 1;
    await completeGenerator(generateMaze(startX, startZ));
    // Place entrance and exit
    if (entranceDirection === Direction.North)
        maze[0][startX] = 1;
    if (entranceDirection === Direction.South)
        maze[length - 1][startX] = 1;
    if (entranceDirection === Direction.West)
        maze[startZ][0] = 1;
    if (entranceDirection === Direction.East)
        maze[startZ][width - 1] = 1;
    if (exitDirection === Direction.North) {
        maze[0][endX] = 1;
        maze[1][endX] = 1;
    }
    else if (exitDirection === Direction.South) {
        maze[length - 1][endX] = 1;
        maze[length - 2][endX] = 1;
    }
    else if (exitDirection === Direction.West) {
        maze[endZ][0] = 1;
        maze[endZ][1] = 1;
    }
    else if (exitDirection === Direction.East) {
        maze[endZ][width - 1] = 1;
        maze[endZ][width - 2] = 1;
    }
    // Adjust complexity by removing some walls
    for (let i = 0; i < complexity; i++) {
        const rx = Math.floor(Math.random() * (width - 2)) + 1;
        const rz = Math.floor(Math.random() * (length - 2)) + 1;
        maze[rz][rx] = 1;
    }
    // Generate the maze in Minecraft
    for (let z = 0; z < length; z++) {
        for (let x = 0; x < width; x++) {
            const blockType = maze[z][x] === 1 ? airBlockType : wallBlockType;
            for (let y = 0; y < height; y++) {
                dimension.setBlockPermutation({ x: start.x + x, y: start.y + y, z: start.z + z }, blockType);
            }
        }
    }
}
// ${se}import("modules/utilities/functions/mazeGenerator").then(m=>globalThis.mazeGenerator=m.mazeGenerator)
// ${se}srun(()=>{try{globalThis.mazeGenerator({x: 68, y: 69, z: -108}, {x: 88, y: 68, z: -95}, world.getDimension("overworld"), {entranceDirection: "North", exitDirection: "South", complexity: 1, airBlockType: "minecraft:air", wallBlockType: "minecraft:stone"})}catch(e){player.sendMessage(e + " " + e.stack)}});
// \\maze glass air East West
//# sourceMappingURL=mazeGenerator.js.map