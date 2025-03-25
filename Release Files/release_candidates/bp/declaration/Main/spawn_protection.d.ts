import { Player, type Vector3, Entity } from "@minecraft/server";
export declare const spawn_protection_format_version = "1.0.1";
export declare const spawnProtectionTypeList: string[];
export declare var noPistonExtensionAreas: {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
};
export declare var noExplosionAreas: {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
};
export declare var noBlockInteractAreas: {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
};
export declare var noInteractAreas: {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
};
export declare var protectedAreas: {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
};
export declare var noBlockBreakAreas: {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
};
export declare var noBlockPlaceAreas: {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
};
export declare function startProtectedAreasRefresher(): Promise<void>;
export declare function stopProtectedAreasRefresher(): Promise<0 | 1>;
export declare function getType(areaGroup: string, type: number): string;
export declare function getAreas(prefix: string): {
    positive: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
    }[];
    negative: {
        dimension: number;
        from: Vector3;
        to: Vector3;
        mode: 0 | 1;
        icon_path?: string;
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
