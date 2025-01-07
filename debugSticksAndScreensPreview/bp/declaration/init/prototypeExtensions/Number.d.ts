export declare const exports_5603749806156139082470132985463298047098135609812364098: any;
declare global {
    interface Number {
        /** Returns a number representation of an object. */
        toNumber(): ReturnType<this["valueOf"]>;
        /** Returns a bigint representation of an object. */
        toBigInt(): bigint;
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;
        toRomanNumerals(limits?: [min: number, max: number], valueFor0?: string): string;
        /** Returns whether or not the number is NaN. */
        isNaN(): boolean;
        /** Returns whether or not the number is finite. */
        isFinite(): boolean;
        /** Returns whether or not the number is an integer. */
        isInteger(): boolean;
        /** Returns whether or not the number is a safe integer. */
        isSafeInteger(): boolean;
        /** Returns whether or not the number is even. */
        isEven(): boolean;
        /** Returns whether or not the number is odd. */
        isOdd(): boolean;
        /** Runs the Math.floor() function on the number. */
        floor(): number;
        /** Runs the Math.round() function on the number. */
        round(): number;
        /** Runs the Math.ceil() function on the number. */
        ceil(): number;
        /** The initial value of Number.prototype.constructor is the standard built-in Number constructor. */
        constructor: Function;
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
        get __proto__(): Number;
        set __proto__(prototype: Object | null);
    }
}
