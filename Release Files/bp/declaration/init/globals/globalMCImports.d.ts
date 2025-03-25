declare global {
    namespace globalThis {
        var world: typeof import("@minecraft/server").world;
        var system: typeof import("@minecraft/server").system;
    }
}
export {};
