import type { Dimension } from "@minecraft/server";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { BlockPattern } from "modules/commands/classes/BlockPattern";
import type { evaluateParametersParameter } from "modules/commands/types/evaluateParametersParameter";
export declare function evaluateParameters<T extends evaluateParametersParameter[] | [evaluateParametersParameter]>(commandstring: string, parameters: T): {
    params: T;
    extra: string;
    args: {
        [Index in keyof T]: T[Index] extends "presetText" ? string | undefined : T[Index] extends "number" ? number | undefined : T[Index] extends "boolean" ? boolean | undefined : T[Index] extends "neboolean" ? boolean | undefined : T[Index] extends "string" ? string | undefined : T[Index] extends "non-booleanString" ? string | undefined : T[Index] extends "json" ? any | undefined : T[Index] extends "Vector" ? string | undefined : T[Index] extends "Vector1" ? string | undefined : T[Index] extends "Vector2" ? string | undefined : T[Index] extends "Vector3" ? string | undefined : T[Index] extends "Vector4" ? string | undefined : T[Index] extends "Vector5" ? string | undefined : T[Index] extends "Vector6" ? string | undefined : T[Index] extends "Vector7" ? string | undefined : T[Index] extends "Vector8" ? string | undefined : T[Index] extends "Vectors" ? string | undefined : T[Index] extends "targetSelector" ? string | undefined : T[Index] extends "blockStates" ? {
            [id: string]: string | number | boolean;
        } | undefined : T[Index] extends "blockPattern" ? BlockPattern | undefined : T[Index] extends "block" ? {
            id: string;
            states?: {
                [id: string]: string | number | boolean;
            };
        } | undefined : T[Index] extends "blockMask" ? BlockMask | undefined : T[Index] extends "dimension" ? Dimension | undefined : T[Index] extends `-${string}` ? string : T[Index] extends `f-${string}` ? {
            "0"?: boolean;
            "1"?: boolean;
            "2"?: boolean;
            "3"?: boolean;
            "4"?: boolean;
            "5"?: boolean;
            "6"?: boolean;
            "7"?: boolean;
            "8"?: boolean;
            "9"?: boolean;
            a?: boolean;
            b?: boolean;
            c?: boolean;
            d?: boolean;
            e?: boolean;
            f?: boolean;
            g?: boolean;
            h?: boolean;
            i?: boolean;
            j?: boolean;
            k?: boolean;
            l?: boolean;
            m?: boolean;
            n?: boolean;
            o?: boolean;
            p?: boolean;
            q?: boolean;
            r?: boolean;
            s?: boolean;
            t?: boolean;
            u?: boolean;
            v?: boolean;
            w?: boolean;
            x?: boolean;
            y?: boolean;
            z?: boolean;
            A?: boolean;
            B?: boolean;
            C?: boolean;
            D?: boolean;
            E?: boolean;
            F?: boolean;
            G?: boolean;
            H?: boolean;
            I?: boolean;
            J?: boolean;
            K?: boolean;
            L?: boolean;
            M?: boolean;
            N?: boolean;
            O?: boolean;
            P?: boolean;
            Q?: boolean;
            R?: boolean;
            S?: boolean;
            T?: boolean;
            U?: boolean;
            V?: boolean;
            W?: boolean;
            X?: boolean;
            Y?: boolean;
            Z?: boolean;
            "!"?: boolean;
            "@"?: boolean;
            "#"?: boolean;
            $?: boolean;
            "%"?: boolean;
            "^"?: boolean;
            "&"?: boolean;
            "*"?: boolean;
            "<"?: boolean;
            ">"?: boolean;
            ","?: boolean;
            "."?: boolean;
            "~"?: boolean;
        } : T[Index] extends {
            type: "number";
        } ? number | undefined : T[Index] extends {
            type: "boolean";
        } ? boolean | undefined : T[Index] extends {
            type: "neboolean";
        } ? boolean | undefined : T[Index] extends {
            type: "string";
        } ? string | undefined : T[Index] extends {
            type: "presetText";
        } ? string | undefined : T[Index] extends {
            type: "non-booleanString";
        } ? string | undefined : T[Index] extends {
            type: "json";
        } ? any | undefined : T[Index] extends {
            type: "Vector";
        } ? string | undefined : T[Index] extends {
            type: "Vector1";
        } ? string | undefined : T[Index] extends {
            type: "Vector2";
        } ? string | undefined : T[Index] extends {
            type: "Vector3";
        } ? string | undefined : T[Index] extends {
            type: "Vector4";
        } ? string | undefined : T[Index] extends {
            type: "Vector5";
        } ? string | undefined : T[Index] extends {
            type: "Vector6";
        } ? string | undefined : T[Index] extends {
            type: "Vector7";
        } ? string | undefined : T[Index] extends {
            type: "Vector8";
        } ? string | undefined : T[Index] extends {
            type: "Vectors";
        } ? string | undefined : T[Index] extends {
            type: "targetSelector";
        } ? string | undefined : T[Index] extends {
            type: "blockStates";
        } ? {
            [id: string]: string | number | boolean;
        } | undefined : T[Index] extends {
            type: "blockPattern";
        } ? BlockPattern | undefined : T[Index] extends {
            type: "block";
        } ? {
            id: string;
            states?: {
                [id: string]: string | number | boolean;
            };
        } | undefined : T[Index] extends {
            type: "blockMask";
        } ? BlockMask | undefined : T[Index] extends {
            type: "dimension";
        } ? Dimension | undefined : T[Index] extends {
            type: `-${string}`;
        } ? string : T[Index] extends {
            type: `f-${string}`;
        } ? {
            "0"?: boolean;
            "1"?: boolean;
            "2"?: boolean;
            "3"?: boolean;
            "4"?: boolean;
            "5"?: boolean;
            "6"?: boolean;
            "7"?: boolean;
            "8"?: boolean;
            "9"?: boolean;
            a?: boolean;
            b?: boolean;
            c?: boolean;
            d?: boolean;
            e?: boolean;
            f?: boolean;
            g?: boolean;
            h?: boolean;
            i?: boolean;
            j?: boolean;
            k?: boolean;
            l?: boolean;
            m?: boolean;
            n?: boolean;
            o?: boolean;
            p?: boolean;
            q?: boolean;
            r?: boolean;
            s?: boolean;
            t?: boolean;
            u?: boolean;
            v?: boolean;
            w?: boolean;
            x?: boolean;
            y?: boolean;
            z?: boolean;
            A?: boolean;
            B?: boolean;
            C?: boolean;
            D?: boolean;
            E?: boolean;
            F?: boolean;
            G?: boolean;
            H?: boolean;
            I?: boolean;
            J?: boolean;
            K?: boolean;
            L?: boolean;
            M?: boolean;
            N?: boolean;
            O?: boolean;
            P?: boolean;
            Q?: boolean;
            R?: boolean;
            S?: boolean;
            T?: boolean;
            U?: boolean;
            V?: boolean;
            W?: boolean;
            X?: boolean;
            Y?: boolean;
            Z?: boolean;
            "!"?: boolean;
            "@"?: boolean;
            "#"?: boolean;
            $?: boolean;
            "%"?: boolean;
            "^"?: boolean;
            "&"?: boolean;
            "*"?: boolean;
            "<"?: boolean;
            ">"?: boolean;
            ","?: boolean;
            "."?: boolean;
            "~"?: boolean;
        } : any | undefined;
    };
    err: [Error, any][];
};
