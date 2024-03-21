import { Player, type Vector3, Entity } from "@minecraft/server";
export declare const spawn_protection_format_version = "1.0.1";
export declare const spawnProtectionTypeList: string[];
export declare let noPistonExtensionAreas: {
    positive: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    negative: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
};
export declare let noExplosionAreas: {
    positive: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    negative: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
};
export declare let noBlockInteractAreas: {
    positive: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    negative: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
};
export declare let noInteractAreas: {
    positive: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    negative: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
};
export declare let protectedAreas: {
    positive: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    negative: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
};
export declare let noBlockBreakAreas: {
    positive: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    negative: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
};
export declare let noBlockPlaceAreas: {
    positive: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    negative: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
};
export declare function getType(areaGroup: string, type: number): string;
export declare function getAreas(prefix: string): {
    positive: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    negative: {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
};
export declare function editAreas(player: Player, prefix: string): void;
export declare function editAreasMainMenu(sourceEntity: Entity | Player): void;
export declare function convertToCompoundBlockVolume(selection: String): {
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
}[];
export declare function testIsWithinRanges(blockvolumes: {
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
}[], location: Vector3): boolean;
