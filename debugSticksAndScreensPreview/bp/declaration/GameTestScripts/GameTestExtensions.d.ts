export default class GameTestExtensions {
    constructor(test: any);
    test: any;
    addEntityInBoat(entityType: any, blockLoc: any): any;
    makeAboutToDrown(entity: any): void;
    assertBlockProperty(propertyName: any, value: any, BlockLocationIterator: any): void;
    giveItem(player: any, itemType: any, amount: any, slot: any): void;
    getVineDirection(direction: any): 0 | 1 | 2 | 3;
    getMultiFaceDirection(direction: any): 0 | 1 | 2 | 3 | 4 | 5;
    rotateVolume(volume: any): any;
    rotateAngle(angle: any): any;
}
