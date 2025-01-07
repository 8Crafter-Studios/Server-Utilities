export declare const exports_5603749806156139082470132985463298047098135609812364098: any;
declare global {
    interface String {
        escapeCharacters(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): string;
        escapeCharactersB(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): {
            v: string;
            e?: Error[];
        };
        /** Returns a number representation of an object. */
        toNumber(): number | undefined;
        /** Returns a bigint representation of an object. */
        toBigInt(): bigint | undefined;
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;
        /** The initial value of String.prototype.constructor is the standard built-in String constructor. */
        constructor: Function;
        /** Returns a date converted to a string using the current locale. */
        toLocaleString(): string;
        /**
         * Determines whether an object has a property with the specified name.
         * @param v A property name.
         */
        hasOwnProperty(v: PropertyKey): boolean;
        hasOwnProperty(v: keyof this): boolean;
        /**
         * Determines whether an object exists in another object's prototype chain.
         * @param v Another object whose prototype chain is to be checked.
         */
        isPrototypeOf(v: Object): boolean;
        /**
         * Determines whether a specified property is enumerable.
         * @param v A property name.
         */
        propertyIsEnumerable(v: PropertyKey): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any) => void): undefined;
        __defineGetter__<P extends string>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends string>(prop: P, func: (val: any) => void): undefined;
        __lookupGetter__<P extends keyof this>(prop: P): (() => this[P]) | undefined;
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P]) => void) | undefined;
        get __proto__(): String;
        set __proto__(prototype: Object | null);
    }
}
