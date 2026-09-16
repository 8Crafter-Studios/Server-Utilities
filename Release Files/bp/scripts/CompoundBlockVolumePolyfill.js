// TEST: Make sure this actually works properly.
// XXX: This polyfill was AI-generated and may be very buggy.
import { BlockVolume } from "@minecraft/server";
export var CompoundBlockVolumeAction;
(function (CompoundBlockVolumeAction) {
    CompoundBlockVolumeAction[CompoundBlockVolumeAction["Add"] = 0] = "Add";
    CompoundBlockVolumeAction[CompoundBlockVolumeAction["Subtract"] = 1] = "Subtract";
})(CompoundBlockVolumeAction || (CompoundBlockVolumeAction = {}));
export var CompoundBlockVolumePositionRelativity;
(function (CompoundBlockVolumePositionRelativity) {
    CompoundBlockVolumePositionRelativity[CompoundBlockVolumePositionRelativity["Relative"] = 0] = "Relative";
    CompoundBlockVolumePositionRelativity[CompoundBlockVolumePositionRelativity["Absolute"] = 1] = "Absolute";
})(CompoundBlockVolumePositionRelativity || (CompoundBlockVolumePositionRelativity = {}));
// export class CompoundBlockVolume {
//     readonly items: CompoundBlockVolumeItem[] = [];
//     readonly itemsAbsolute: CompoundBlockVolumeItem[] = [];
//     private origin: Vector3 = { x: 0, y: 0, z: 0 };
//     private min: Vector3 = { x: Infinity, y: Infinity, z: Infinity };
//     private max: Vector3 = { x: -Infinity, y: -Infinity, z: -Infinity };
//     capacity = 0;
//     volumeCount = 0;
//     constructor(origin?: Vector3) {
//         if (origin) this.origin = { ...origin };
//     }
//     // ---------------------------------------------------------------------
//     // Internal helpers
//     // ---------------------------------------------------------------------
//     private translateVolume(vol: BlockVolume, delta: Vector3): BlockVolume {
//         const v = new BlockVolume(
//             {
//                 x: vol.from.x + delta.x,
//                 y: vol.from.y + delta.y,
//                 z: vol.from.z + delta.z,
//             },
//             {
//                 x: vol.to.x + delta.x,
//                 y: vol.to.y + delta.y,
//                 z: vol.to.z + delta.z,
//             }
//         );
//         return v;
//     }
//     private recomputeBoundingBox(): void {
//         let minX = Infinity,
//             minY = Infinity,
//             minZ = Infinity;
//         let maxX = -Infinity,
//             maxY = -Infinity,
//             maxZ = -Infinity;
//         for (const item of this.itemsAbsolute) {
//             const vol = item.volume;
//             const vmin = vol.getMin();
//             const vmax = vol.getMax();
//             if (vmin.x < minX) minX = vmin.x;
//             if (vmin.y < minY) minY = vmin.y;
//             if (vmin.z < minZ) minZ = vmin.z;
//             if (vmax.x > maxX) maxX = vmax.x;
//             if (vmax.y > maxY) maxY = vmax.y;
//             if (vmax.z > maxZ) maxZ = vmax.z;
//         }
//         this.min = { x: minX, y: minY, z: minZ };
//         this.max = { x: maxX, y: maxY, z: maxZ };
//     }
//     private makeAbsolute(item: CompoundBlockVolumeItem): CompoundBlockVolumeItem {
//         if (item.locationRelativity === CompoundBlockVolumePositionRelativity.Absolute) {
//             return {
//                 action: item.action ?? CompoundBlockVolumeAction.Add,
//                 locationRelativity: CompoundBlockVolumePositionRelativity.Absolute,
//                 volume: item.volume,
//             };
//         }
//         // Relative → Absolute
//         const absVol = this.translateVolume(item.volume, this.origin);
//         return {
//             action: item.action ?? CompoundBlockVolumeAction.Add,
//             locationRelativity: CompoundBlockVolumePositionRelativity.Absolute,
//             volume: absVol,
//         };
//     }
//     private rebuildAbsoluteVolumes(): void {
//         this.itemsAbsolute.length = 0;
//         for (const item of this.items) {
//             this.itemsAbsolute.push(this.makeAbsolute(item));
//         }
//         this.volumeCount = this.itemsAbsolute.length;
//         this.capacity = this.itemsAbsolute.reduce((acc, i) => acc + i.volume.getCapacity(), 0);
//         this.recomputeBoundingBox();
//     }
//     // ---------------------------------------------------------------------
//     // Public API
//     // ---------------------------------------------------------------------
//     clear(): void {
//         this.items.length = 0;
//         this.itemsAbsolute.length = 0;
//         this.volumeCount = 0;
//         this.capacity = 0;
//         this.min = { x: Infinity, y: Infinity, z: Infinity };
//         this.max = { x: -Infinity, y: -Infinity, z: -Infinity };
//     }
//     getOrigin(): Vector3 {
//         return { ...this.origin };
//     }
//     setOrigin(position: Vector3, preserveExistingVolumes = false): void {
//         const delta = {
//             x: position.x - this.origin.x,
//             y: position.y - this.origin.y,
//             z: position.z - this.origin.z,
//         };
//         this.origin = { ...position };
//         if (!preserveExistingVolumes) {
//             // Recompute absolute volumes from relative ones
//             this.rebuildAbsoluteVolumes();
//         } else {
//             // Shift absolute volumes directly
//             for (const item of this.itemsAbsolute) {
//                 item.volume.translate(delta);
//             }
//             this.recomputeBoundingBox();
//         }
//     }
//     translateOrigin(delta: Vector3, preserveExistingVolumes = false): void {
//         this.setOrigin(
//             {
//                 x: this.origin.x + delta.x,
//                 y: this.origin.y + delta.y,
//                 z: this.origin.z + delta.z,
//             },
//             preserveExistingVolumes
//         );
//     }
//     pushVolume(item: CompoundBlockVolumeItem): void {
//         this.items.push(item);
//         this.itemsAbsolute.push(this.makeAbsolute(item));
//         this.volumeCount++;
//         this.capacity += item.volume.getCapacity();
//         this.recomputeBoundingBox();
//     }
//     popVolume(): boolean {
//         if (this.items.length === 0) return false;
//         const removed = this.items.pop()!;
//         const removedAbs = this.itemsAbsolute.pop()!;
//         this.volumeCount--;
//         this.capacity -= removedAbs.volume.getCapacity();
//         this.recomputeBoundingBox();
//         return true;
//     }
//     replaceOrAddLastVolume(item: CompoundBlockVolumeItem): boolean {
//         if (this.items.length === 0) {
//             this.pushVolume(item);
//             return false;
//         }
//         const lastAbs = this.itemsAbsolute[this.itemsAbsolute.length - 1]!;
//         this.capacity -= lastAbs.volume.getCapacity();
//         this.items[this.items.length - 1] = item;
//         const abs = this.makeAbsolute(item);
//         this.itemsAbsolute[this.itemsAbsolute.length - 1] = abs;
//         this.capacity += abs.volume.getCapacity();
//         this.recomputeBoundingBox();
//         return true;
//     }
//     peekLastVolume(forceRelativity?: CompoundBlockVolumePositionRelativity): CompoundBlockVolumeItem | undefined {
//         if (this.items.length === 0) return undefined;
//         const raw = this.items[this.items.length - 1];
//         if (forceRelativity === CompoundBlockVolumePositionRelativity.Absolute) {
//             return this.itemsAbsolute[this.itemsAbsolute.length - 1];
//         }
//         return raw;
//     }
//     getBoundingBox(): BlockBoundingBox {
//         return {
//             min: { ...this.min },
//             max: { ...this.max },
//         };
//     }
//     getMin(): Vector3 {
//         return { ...this.min };
//     }
//     getMax(): Vector3 {
//         return { ...this.max };
//     }
//     isEmpty(): boolean {
//         return this.items.length === 0;
//     }
//     isInside(worldLocation: Vector3): boolean {
//         let inside = false;
//         for (const item of this.itemsAbsolute) {
//             const vol = item.volume;
//             const isIn = vol.isInside(worldLocation);
//             if (item.action === CompoundBlockVolumeAction.Add) {
//                 if (isIn) inside = true;
//             } else {
//                 if (isIn) inside = false;
//             }
//         }
//         return inside;
//     }
//     // getBlockLocationIterator(): BlockLocationIterator {
//     //     // We must produce a merged iterator.
//     //     // The native version yields all blocks in Add volumes minus Subtract volumes.
//     //     //
//     //     // We implement a lazy iterator that:
//     //     // - iterates each Add volume
//     //     // - skips blocks inside any Subtract volume
//     //     //
//     //     // This avoids building giant arrays.
//     //     const addVolumes = this.itemsAbsolute.filter((i) => i.action === CompoundBlockVolumeAction.Add);
//     //     const subVolumes = this.itemsAbsolute.filter((i) => i.action === CompoundBlockVolumeAction.Subtract);
//     //     const iterators = addVolumes.map((v) => v.volume.getBlockLocationIterator());
//     //     return {
//     //         [Symbol.iterator]() {
//     //             return this;
//     //         },
//     //         next(): IteratorResult<Vector3> {
//     //             while (iterators.length > 0) {
//     //                 const it = iterators[0]!;
//     //                 const r = it.next();
//     //                 if (r.done) {
//     //                     iterators.shift();
//     //                     continue;
//     //                 }
//     //                 const pos = r.value;
//     //                 // Skip if inside any subtract volume
//     //                 let skip = false;
//     //                 for (const s of subVolumes) {
//     //                     if (s.volume.isInside(pos)) {
//     //                         skip = true;
//     //                         break;
//     //                     }
//     //                 }
//     //                 if (!skip) return { value: pos, done: false };
//     //             }
//     //             return { value: undefined as any, done: true };
//     //         },
//     //         isValid(): boolean {
//     //             return true;
//     //         },
//     //     } as BlockLocationIterator;
//     // }
//     getBlockLocationIterator(): BlockLocationIterator {
//         // Sparse voxel mask using Morton encoding
//         const mask = new Set<number>();
//         // Encode a block position into a single integer
//         const encode = (v: Vector3): number => ((v.x & 0x3fffff) << 42) | ((v.y & 0x3fffff) << 21) | (v.z & 0x3fffff);
//         // 1. Apply Add volumes
//         for (const item of this.itemsAbsolute) {
//             if (item.action === CompoundBlockVolumeAction.Add) {
//                 const it = item.volume.getBlockLocationIterator();
//                 for (const pos of it) {
//                     mask.add(encode(pos));
//                 }
//             }
//         }
//         // 2. Apply Subtract volumes
//         for (const item of this.itemsAbsolute) {
//             if (item.action === CompoundBlockVolumeAction.Subtract) {
//                 const it = item.volume.getBlockLocationIterator();
//                 for (const pos of it) {
//                     mask.delete(encode(pos));
//                 }
//             }
//         }
//         // 3. Iterator over unique positions
//         const entries = mask.values();
//         return {
//             [Symbol.iterator]() {
//                 return this;
//             },
//             next(): IteratorResult<Vector3> {
//                 const n = entries.next();
//                 if (n.done) return { value: undefined as any, done: true };
//                 const key = n.value;
//                 // Decode Morton-like packing
//                 const x = key >> 42;
//                 const y = (key >> 21) & 0x3fffff;
//                 const z = key & 0x3fffff;
//                 return { value: { x, y, z }, done: false };
//             },
//             isValid(): boolean {
//                 return true;
//             },
//         } as BlockLocationIterator;
//     }
// }
export class CompoundBlockVolume {
    items = [];
    itemsAbsolute = [];
    origin = { x: 0, y: 0, z: 0 };
    min = { x: Infinity, y: Infinity, z: Infinity };
    max = { x: -Infinity, y: -Infinity, z: -Infinity };
    capacity = 0;
    volumeCount = 0;
    constructor(origin) {
        if (origin)
            this.origin = { ...origin };
    }
    // ---------------------------------------------------------------------
    // Internal helpers
    // ---------------------------------------------------------------------
    translateVolume(vol, delta) {
        return new BlockVolume({
            x: vol.from.x + delta.x,
            y: vol.from.y + delta.y,
            z: vol.from.z + delta.z,
        }, {
            x: vol.to.x + delta.x,
            y: vol.to.y + delta.y,
            z: vol.to.z + delta.z,
        });
    }
    makeAbsolute(item) {
        const action = item.action ?? CompoundBlockVolumeAction.Add;
        const relativity = item.locationRelativity ?? CompoundBlockVolumePositionRelativity.Relative;
        if (relativity === CompoundBlockVolumePositionRelativity.Absolute) {
            return {
                action,
                locationRelativity: CompoundBlockVolumePositionRelativity.Absolute,
                volume: item.volume,
            };
        }
        const absVol = this.translateVolume(item.volume, this.origin);
        return {
            action,
            locationRelativity: CompoundBlockVolumePositionRelativity.Absolute,
            volume: absVol,
        };
    }
    recomputeBoundingBox() {
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
        for (const item of this.itemsAbsolute) {
            const vmin = item.volume.getMin();
            const vmax = item.volume.getMax();
            if (vmin.x < minX)
                minX = vmin.x;
            if (vmin.y < minY)
                minY = vmin.y;
            if (vmin.z < minZ)
                minZ = vmin.z;
            if (vmax.x > maxX)
                maxX = vmax.x;
            if (vmax.y > maxY)
                maxY = vmax.y;
            if (vmax.z > maxZ)
                maxZ = vmax.z;
        }
        this.min = { x: minX, y: minY, z: minZ };
        this.max = { x: maxX, y: maxY, z: maxZ };
    }
    rebuildAbsoluteVolumes() {
        this.itemsAbsolute.length = 0;
        for (const item of this.items) {
            this.itemsAbsolute.push(this.makeAbsolute(item));
        }
        this.volumeCount = this.itemsAbsolute.length;
        this.capacity = this.itemsAbsolute.reduce((acc, i) => acc + i.volume.getCapacity(), 0);
        this.recomputeBoundingBox();
    }
    // ---------------------------------------------------------------------
    // Public API
    // ---------------------------------------------------------------------
    clear() {
        this.items.length = 0;
        this.itemsAbsolute.length = 0;
        this.volumeCount = 0;
        this.capacity = 0;
        this.min = { x: Infinity, y: Infinity, z: Infinity };
        this.max = { x: -Infinity, y: -Infinity, z: -Infinity };
    }
    getOrigin() {
        return { ...this.origin };
    }
    setOrigin(position, preserveExistingVolumes = false) {
        const delta = {
            x: position.x - this.origin.x,
            y: position.y - this.origin.y,
            z: position.z - this.origin.z,
        };
        this.origin = { ...position };
        if (!preserveExistingVolumes) {
            this.rebuildAbsoluteVolumes();
        }
        else {
            for (const item of this.itemsAbsolute) {
                item.volume.translate(delta);
            }
            this.recomputeBoundingBox();
        }
    }
    translateOrigin(delta, preserveExistingVolumes = false) {
        this.setOrigin({
            x: this.origin.x + delta.x,
            y: this.origin.y + delta.y,
            z: this.origin.z + delta.z,
        }, preserveExistingVolumes);
    }
    pushVolume(item) {
        this.items.push(item);
        const abs = this.makeAbsolute(item);
        this.itemsAbsolute.push(abs);
        this.volumeCount++;
        this.capacity += abs.volume.getCapacity();
        this.recomputeBoundingBox();
    }
    popVolume() {
        if (this.items.length === 0)
            return false;
        this.items.pop();
        const removedAbs = this.itemsAbsolute.pop();
        this.volumeCount--;
        this.capacity -= removedAbs.volume.getCapacity();
        this.recomputeBoundingBox();
        return true;
    }
    replaceOrAddLastVolume(item) {
        if (this.items.length === 0) {
            this.pushVolume(item);
            return false;
        }
        const lastAbs = this.itemsAbsolute[this.itemsAbsolute.length - 1];
        this.capacity -= lastAbs.volume.getCapacity();
        this.items[this.items.length - 1] = item;
        const abs = this.makeAbsolute(item);
        this.itemsAbsolute[this.itemsAbsolute.length - 1] = abs;
        this.capacity += abs.volume.getCapacity();
        this.recomputeBoundingBox();
        return true;
    }
    peekLastVolume(forceRelativity) {
        if (this.items.length === 0)
            return undefined;
        if (forceRelativity === CompoundBlockVolumePositionRelativity.Absolute) {
            return this.itemsAbsolute[this.itemsAbsolute.length - 1];
        }
        return this.items[this.items.length - 1];
    }
    getBoundingBox() {
        return {
            min: { ...this.min },
            max: { ...this.max },
        };
    }
    getMin() {
        return { ...this.min };
    }
    getMax() {
        return { ...this.max };
    }
    isEmpty() {
        return this.itemsAbsolute.length === 0;
    }
    isInside(worldLocation) {
        let inside = false;
        for (const item of this.itemsAbsolute) {
            const isIn = item.volume.isInside(worldLocation);
            if (item.action === CompoundBlockVolumeAction.Add) {
                if (isIn)
                    inside = true;
            }
            else {
                if (isIn)
                    inside = false;
            }
        }
        return inside;
    }
    // ---------------------------------------------------------------------
    // Merged-BlockBoundingBox helpers
    // ---------------------------------------------------------------------
    volumeToAABB(vol) {
        const min = vol.getMin();
        const max = vol.getMax();
        return { min, max };
    }
    aabbTouchesOrOverlaps(a, b) {
        // Touch-aware: faces touching count as mergeable
        return !(a.max.x < b.min.x - 1 ||
            a.min.x > b.max.x + 1 ||
            a.max.y < b.min.y - 1 ||
            a.min.y > b.max.y + 1 ||
            a.max.z < b.min.z - 1 ||
            a.min.z > b.max.z + 1);
    }
    mergeAABB(a, b) {
        return {
            min: {
                x: Math.min(a.min.x, b.min.x),
                y: Math.min(a.min.y, b.min.y),
                z: Math.min(a.min.z, b.min.z),
            },
            max: {
                x: Math.max(a.max.x, b.max.x),
                y: Math.max(a.max.y, b.max.y),
                z: Math.max(a.max.z, b.max.z),
            },
        };
    }
    mergeAABBs(aabbs) {
        if (aabbs.length === 0)
            return [];
        // Simple O(n^2) merging; n is number of volumes, not blocks
        const result = [];
        for (const aabb of aabbs) {
            let merged = aabb;
            let changed = true;
            while (changed) {
                changed = false;
                for (let i = 0; i < result.length; i++) {
                    const r = result[i];
                    if (this.aabbTouchesOrOverlaps(merged, r)) {
                        merged = this.mergeAABB(merged, r);
                        result.splice(i, 1);
                        changed = true;
                        break;
                    }
                }
            }
            result.push(merged);
        }
        return result;
    }
    // ---------------------------------------------------------------------
    // Merged-BlockBoundingBox iterator (no duplicates, scalable)
    // ---------------------------------------------------------------------
    getBlockLocationIterator() {
        const addAABBs = [];
        const subAABBs = [];
        for (const item of this.itemsAbsolute) {
            const aabb = this.volumeToAABB(item.volume);
            if (item.action === CompoundBlockVolumeAction.Add) {
                addAABBs.push(aabb);
            }
            else {
                subAABBs.push(aabb);
            }
        }
        const mergedAdd = this.mergeAABBs(addAABBs);
        const mergedSub = this.mergeAABBs(subAABBs);
        let addIndex = 0;
        let x = 0, y = 0, z = 0;
        let current;
        const isInsideSub = (pos) => {
            for (const s of mergedSub) {
                if (pos.x >= s.min.x && pos.x <= s.max.x && pos.y >= s.min.y && pos.y <= s.max.y && pos.z >= s.min.z && pos.z <= s.max.z) {
                    return true;
                }
            }
            return false;
        };
        const iterator = {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                while (true) {
                    if (!current) {
                        if (addIndex >= mergedAdd.length) {
                            return { value: undefined, done: true };
                        }
                        current = mergedAdd[addIndex];
                        x = current.min.x;
                        y = current.min.y;
                        z = current.min.z;
                    }
                    if (z > current.max.z) {
                        z = current.min.z;
                        y++;
                    }
                    if (y > current.max.y) {
                        y = current.min.y;
                        x++;
                    }
                    if (x > current.max.x) {
                        addIndex++;
                        current = undefined;
                        continue;
                    }
                    const pos = { x, y, z };
                    z++;
                    if (!isInsideSub(pos)) {
                        return { value: pos, done: false };
                    }
                }
            },
            isValid() {
                return true;
            },
        };
        return iterator;
    }
}
//# sourceMappingURL=CompoundBlockVolumePolyfill.js.map