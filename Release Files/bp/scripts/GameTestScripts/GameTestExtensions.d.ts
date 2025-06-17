export default class GameTestExtensions {
    constructor(test: any);
    test: any;
    addEntityInBoat(entityType: any, blockLoc: any): any;
    makeAboutToDrown(entity: any): void;
    assertBlockProperty(propertyName: any, value: any, BlockLocationIterator: any): void;
    giveItem(player: any, itemType: any, amount: any, slot: any): void;
    getVineDirection(direction: any): 1 | 0 | 2 | 3 | undefined;
    getMultiFaceDirection(direction: any): 1 | 0 | 2 | 3 | 4 | 5 | undefined;
    rotateVolume(volume: any): any;
    rotateAngle(angle: any): any;
}
