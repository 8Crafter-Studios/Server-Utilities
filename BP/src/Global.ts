import { system } from "@minecraft/server";
import { type Player, Entity } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData, type ActionFormResponse, type MessageFormResponse, type ModalFormResponse } from "@minecraft/server-ui";
import type { modules as modulesa } from "Main";
import { forceShow } from "Main/ui";
declare global {
    interface String {
        escapeCharacters(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): string;
        escapeCharactersB(js?: boolean, unicode?: boolean, nullchar?: number, uri?: boolean, quotes?: boolean, general?: boolean, colon?: boolean, x?: boolean, s?: boolean): {v: string, e?: Error[]};

        /** Returns a number representation of an object. */
        toNumber(): number|undefined;
    
        /** Returns a bigint representation of an object. */
        toBigInt(): bigint|undefined;
    
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
        __defineGetter__<P extends keyof this>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any)=>void): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>void)|undefined
        get __proto__(): String
        set __proto__(prototype: Object|null)
    }
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
        __defineGetter__<P extends keyof this>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any)=>void): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>void)|undefined
        get __proto__(): Number
        set __proto__(prototype: Object|null)
    }
    interface BigInt {
    
        /** Returns a number representation of an object. */
        toNumber(): number;
    
        /** Returns a bigint representation of an object. */
        toBigInt(): ReturnType<this["valueOf"]>;
    
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;

        toRomanNumerals(limits?: [min: bigint, max: bigint], valueFor0n?: string): string;

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
        __defineGetter__<P extends keyof this>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any)=>void): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>void)|undefined
        get __proto__(): BigInt
        set __proto__(prototype: Object|null)
    }
    interface Boolean {
        toFormattedString(): "§aTrue"|"§cFalse"
        toFormattedStringB(): "§2True"|"§4False"
        toFormattedStringED(): "§aEnabled"|"§cDisabled"
        toFormattedStringEDB(): "§2Enabled"|"§4Disabled"
        toFormattedStringIO(): "§aON"|"§cOFF"
        toFormattedStringIOB(): "§2ON"|"§4OFF"
        toFormattedStringIOL(): "§aOn"|"§cOff"
        toFormattedStringIOLB(): "§2On"|"§4Off"
    
        /** Returns a number representation of an object. */
        toNumber(): 0|1;
    
        /** Returns a number representation of an object. */
        toBigInt(): 0n|1n;
    
        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;

        /** The initial value of Boolean.prototype.constructor is the standard built-in Boolean constructor. */
        constructor: Function;
    
        /** Returns a string representation of an object. */
        toString(): "true"|"false";
    
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
        __defineGetter__<P extends keyof this>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends keyof this>(prop: P, func: (val: any)=>void): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>void)|undefined
        get __proto__(): Boolean
        set __proto__(prototype: Object|null)
    }
    interface Object {
        hasOwnProperty(v: keyof this): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this|string>(prop: P, func: Function): undefined
        __defineSetter__<P extends keyof this|string>(prop: P, func: (val: any)=>any): undefined
        __defineGetter__<P extends string>(prop: P, func: ()=>any): undefined
        __defineSetter__<P extends string>(prop: P, func: (val: any)=>void): undefined
        __lookupGetter__<P extends keyof this>(prop: P): (()=>this[P])|undefined
        __lookupSetter__<P extends keyof this>(prop: P): ((val: this[P])=>this[P])|undefined
        get __proto__(): Object
        set __proto__(prototype: Object|null)
    }
    interface Error {
        stringify(): string
    }
    namespace globalThis {
        /**
         * @remarks
         * Runs a specified function at the next available future time.
         * This is frequently used to implement delayed behaviors and
         * game loops. When run within the context of an event handler,
         * this will generally run the code at the end of the same tick
         * where the event occurred. When run in other code (a
         * system.run callout), this will run the function in the next
         * tick. Note, however, that depending on load on the system,
         * running in the same or next tick is not guaranteed.
         *
         * @param callback
         * Function callback to run at the next game tick.
         * @returns
         * An opaque identifier that can be used with the `clearRun`
         * function to cancel the execution of this run.
         * @example trapTick.ts
         * ```typescript
         * import { system, world } from '@minecraft/server';
         *
         * function printEveryMinute() {
         *     try {
         *         // Minecraft runs at 20 ticks per second.
         *         if (system.currentTick % 1200 === 0) {
         *             world.sendMessage('Another minute passes...');
         *         }
         *     } catch (e) {
         *         console.warn('Error: ' + e);
         *     }
         *
         *     system.run(printEveryMinute);
         * }
         *
         * printEveryMinute();
         * ```
         */
        function srun(callback: () => void): number
        var beforeInitializeTick: number;
        var initializeTick: number;
        var beforeScriptStartTick: number;
        var scriptStartTick: number;
        class InternalError extends Error{}
        function tfsa(sdsa284f83kd_38pqnv_38_f_0_vmewd_19mvndifekod_f8ufv4m3ddm1c0nvh289cmfue8hd9mjf3: unknown): unknown
        var tempVariables: {[key: PropertyKey]: any}
        var gt: typeof globalThis
        var modules: typeof modulesa
    }
};
declare module '@minecraft/server' {
    interface Entity {/*
        id: `${number}`*/
    }
    interface ItemStack {
        hasComponent(componentId: keyof ItemComponentTypeMap): boolean;
    }
    interface ActionFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {ActionFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<ActionFormResponse>
    }
    interface ModalFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {ModalFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<ModalFormResponse>
    }
    interface MessageFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {MessageFormResponse|undefined} The response of the form
         */
        forceShow(player: Player, timeout?: number): Promise<MessageFormResponse>
    }
}
Object.defineProperty(String.prototype, 'escapeCharacters', {
    value: function (js: boolean, unicode: boolean, nullchar: number, uri: boolean, quotes: boolean, general: boolean, colon: boolean, x: boolean, s: boolean){

        //:Get primitive copy of string:
        var str = this.valueOf();/*
        console.warn(unescape(str))*/

        //:Append Characters To End:
        if(js == true){
        try{str = eval("`" + str.replaceAll("`", "\\`") + "`"); }catch(e){console.error(e, e.stack)}
        }
        if(general == true){
        str = str.replaceAll("\\n", "\n");
        str = str.replaceAll("\\f", "\f");
        str = str.replaceAll("\\r", "\r");
        str = str.replaceAll("\\t", "\t");
        str = str.replaceAll("\\v", "\v");
        str = str.replaceAll("\\b", "\b");
        str = str.replaceAll("\\l", "\u2028");
        str = str.replaceAll("\\p", "\u2029");
        }
        if(quotes == true){
        str = str.replaceAll("\\qd", "\"");
        str = str.replaceAll("\\qs", "\'");
        }
        if(colon == true){
        str = str.replaceAll("\\cs", "\;");
        str = str.replaceAll("\\cf", "\:");
        }
        if(x == true){
        str = str.replaceAll("\\x", "");
        }
        if(s == true){
        str = str.replaceAll("\\s", "");
        }
        if(nullchar == 1){str = str.replaceAll("\\0", "\0");}
        if(nullchar == 2){str = str.replaceAll("\\0", "");}
        if(unicode == true){
        let strarray = ("t" + str).split("\\u")
        strarray.forEach((values, index)=>{/*console.warn(/[0-9A-F]{2}/i.test(values.slice(0, 6))); */
        if((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)){/*
            console.warn((values.slice(0, 6))); */
            strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6)
        }else{
            if((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)){
                strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8)
            }else{
                if((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)){
                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7)
                }else{
                    if((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)){
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6)
                    }else{
                        if((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)){
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5)
                        }else{
                            if((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)){
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4)
                            }else{
                                if((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)){
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3)
                                }else{
                                    if((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)){
                                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2)
                                    }else{
            if(index !== 0){
                strarray[index] = "\\u" + values.slice(0)
            }}}}}}}}
        }})
        str = strarray.join("").slice(1)
        }
        if(uri == true){str = unescape(str);}

        //:Return modified copy:
        return( str );
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperty(String.prototype, 'escapeCharactersB', {
    value: function (js: boolean, unicode: boolean, nullchar: number, uri: boolean, quotes: boolean, general: boolean, colon: boolean, x: boolean, s: boolean){

        //:Get primitive copy of string:
        var str: string = this.valueOf();/*
        console.warn(unescape(str))*/
        var eb: Error[]
        eb = undefined

        //:Append Characters To End:
        if(js == true){
        try{str = eval("`" + str.replaceAll("`", "\\`") + "`"); }catch(e){eb.push(e); console.error(e, e.stack)}
        }
        if(general == true){
        str = str.replaceAll("\\n", "\n");
        str = str.replaceAll("\\f", "\f");
        str = str.replaceAll("\\r", "\r");
        str = str.replaceAll("\\t", "\t");
        str = str.replaceAll("\\v", "\v");
        str = str.replaceAll("\\b", "\b");
        str = str.replaceAll("\\l", "\u2028");
        str = str.replaceAll("\\p", "\u2029");
        }
        if(quotes == true){
        str = str.replaceAll("\\qd", "\"");
        str = str.replaceAll("\\qs", "\'");
        }
        if(colon == true){
        str = str.replaceAll("\\cs", "\;");
        str = str.replaceAll("\\cf", "\:");
        }
        if(x == true){
        str = str.replaceAll("\\x", "");
        }
        if(s == true){
        str = str.replaceAll("\\s", "");
        }
        if(nullchar == 1){str = str.replaceAll("\\0", "\0");}
        if(nullchar == 2){str = str.replaceAll("\\0", "");}
        if(unicode == true){
        let strarray = ("t" + str).split("\\u")
        strarray.forEach((values, index)=>{/*console.warn(/[0-9A-F]{2}/i.test(values.slice(0, 6))); */
        if((/[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6))) && (index !== 0)){/*
            console.warn((values.slice(0, 6))); */
            strarray[index] = String.fromCodePoint(Number(values.slice(0, 6))) + values.slice(6)
        }else{
            if((/[+][0-9]{7}/i.test(values.slice(0, 8))) && (index !== 0)){
                strarray[index] = String.fromCodePoint(Number(values.slice(1, 8))) + values.slice(8)
            }else{
                if((/[+][0-9]{6}/i.test(values.slice(0, 7))) && (index !== 0)){
                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 7))) + values.slice(7)
                }else{
                    if((/[+][0-9]{5}/i.test(values.slice(0, 6))) && (index !== 0)){
                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 6))) + values.slice(6)
                    }else{
                        if((/[+][0-9]{4}/i.test(values.slice(0, 5))) && (index !== 0)){
                            strarray[index] = String.fromCodePoint(Number(values.slice(1, 5))) + values.slice(5)
                        }else{
                            if((/[+][0-9]{3}/i.test(values.slice(0, 4))) && (index !== 0)){
                                strarray[index] = String.fromCodePoint(Number(values.slice(1, 4))) + values.slice(4)
                            }else{
                                if((/[+][0-9]{2}/i.test(values.slice(0, 3))) && (index !== 0)){
                                    strarray[index] = String.fromCodePoint(Number(values.slice(1, 3))) + values.slice(3)
                                }else{
                                    if((/[+][0-9]{1}/i.test(values.slice(0, 2))) && (index !== 0)){
                                        strarray[index] = String.fromCodePoint(Number(values.slice(1, 2))) + values.slice(2)
                                    }else{
            if(index !== 0){
                strarray[index] = "\\u" + values.slice(0)
            }}}}}}}}
        }})
        str = strarray.join("").slice(1)
        }
        if(uri == true){str = unescape(str);}

        //:Return modified copy:
        return( {v: str, e: eb} );
    },
    configurable: true,
    enumerable: true,
    writable: true
});
Object.defineProperties(String.prototype, {
    toNumber: {
        value: function (): number|undefined{
            var str: string = this
            return Number.isNaN(Number(str))?str.toLowerCase()=="infinity"?Infinity:str.toLowerCase()=="-infinity"?-Infinity:undefined:Number(str)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt(): bigint|undefined{
            var str: string = this
            return Number.isNaN(Number(str))?undefined:BigInt(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function (): boolean{
            var simplified: string = this.toLowerCase().trim()
            var numberified: number|undefined = simplified.toNumber()
            return simplified.startsWith("t")
                ? true
                : simplified.startsWith("f")
                ? false
                : simplified.startsWith("y")
                ? true
                : simplified.startsWith("n")
                ? false
                : !!numberified
                ? numberified.toBoolean()
                : Boolean(simplified);
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Object.defineProperties(Number.prototype, {
    toNumber: {
        value: function toNumber(): number{
            return this
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt(): bigint{
            return BigInt(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function toBoolean(): boolean{
            return Number.isNaN(this)?false:((this%2).round()==1)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toRomanNumerals: {
        value: function toRomanNumerals(limits: [min: number, max: number] = [1, 10], valueFor0: string = "0"): string{
            if((this>limits[1])||(this<limits[0])||!(this as number).isInteger()||(this as number).isNaN()){return (this as number).toString()}
            var romanMatrix = [
                [1000n, 'M'],
                [900n, 'CM'],
                [500n, 'D'],
                [400n, 'CD'],
                [100n, 'C'],
                [90n, 'XC'],
                [50n, 'L'],
                [40n, 'XL'],
                [10n, 'X'],
                [9n, 'IX'],
                [5n, 'V'],
                [4n, 'IV'],
                [1n, 'I']
              ] as const;
              
              function convertToRoman(num: bigint): string {
                if (num === 0n) {
                  return valueFor0;
                }
                for (var i = 0; i < romanMatrix.length; i++) {
                  if (num >= romanMatrix[i][0]) {
                    return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
                  }
                }
              }
              return (((this as number)<0)?"-":"")+convertToRoman((this as number).toBigInt())
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isNaN: {
        value: function isNaN(): boolean{
            return Number.isNaN(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isFinite: {
        value: function isFinite(): boolean{
            return Number.isFinite(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isInteger: {
        value: function isInteger(): boolean{
            return Number.isInteger(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isSafeInteger: {
        value: function isSafeInteger(): boolean{
            return Number.isSafeInteger(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isEven: {
        value: function isEven(): boolean{
            return Number.isNaN(this)?false:((this%2).round()==0)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isOdd: {
        value: function isOdd(): boolean{
            return Number.isNaN(this)?false:((this%2).round()==1)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    floor: {
        value: function (): number{
            return Math.floor(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    round: {
        value: function (): number{
            return Math.round(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    ceil: {
        value: function (): number{
            return Math.ceil(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Object.defineProperties(BigInt.prototype, {
    toNumber: {
        value: function toNumber(): number{
            return Number(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function toBigInt(): bigint{
            return this
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function toBoolean(): boolean{
            return (this%2n)==1n
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toRomanNumerals: {
        value: function toRomanNumerals(limits: [min: bigint, max: bigint] = [1n, 10n], valueFor0n: string = "0"): string{
            if((this>limits[1])||(this<limits[0])){return (this as bigint).toString()}
            var romanMatrix = [
                [1000n, 'M'],
                [900n, 'CM'],
                [500n, 'D'],
                [400n, 'CD'],
                [100n, 'C'],
                [90n, 'XC'],
                [50n, 'L'],
                [40n, 'XL'],
                [10n, 'X'],
                [9n, 'IX'],
                [5n, 'V'],
                [4n, 'IV'],
                [1n, 'I']
              ] as const;
              
              function convertToRoman(num: bigint): string {
                if (num === 0n) {
                  return valueFor0n;
                }
                for (var i = 0; i < romanMatrix.length; i++) {
                  if (num >= romanMatrix[i][0]) {
                    return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
                  }
                }
              }
              return (((this as bigint)<0)?"-":"")+convertToRoman((this as bigint).toBigInt())
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isEven: {
        value: function isEven(): boolean{
            return (this%2n)==0n
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    isOdd: {
        value: function isOdd(): boolean{
            return (this%2n)==1n
        },
        configurable: true,
        enumerable: true,
        writable: true
    }/*,
    floor: {
        value: function (): number{
            return Math.floor(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    round: {
        value: function (): number{
            return Math.round(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    ceil: {
        value: function (): number{
            return Math.ceil(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    }*/
});
Object.defineProperties(Boolean.prototype, {/*
    toString: {
        value: function (): "true"|"false"{
            return this.valueOf()?"true":"false"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },*/
    toNumber: {
        value: function (): 0|1{
            return +this as 0|1
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBigInt: {
        value: function (): 0n|1n{
            return BigInt(+this) as 0n|1n
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toBoolean: {
        value: function (): boolean{
            return this
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedString: {
        value: function (): "§aTrue"|"§cFalse"{
            return this.valueOf()?"§aTrue":"§cFalse"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringB: {
        value: function (): "§2True"|"§4False"{
            return this.valueOf()?"§2True":"§4False"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringED: {
        value: function (): "§aEnabled"|"§cDisabled"{
            return this.valueOf()?"§aEnabled":"§cDisabled"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringEDB: {
        value: function (): "§2Enabled"|"§4Disabled"{
            return this.valueOf()?"§2Enabled":"§4Disabled"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIO: {
        value: function (): "§aON"|"§cOFF"{
            return this.valueOf()?"§aON":"§cOFF"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOB: {
        value: function (): "§2ON"|"§4OFF"{
            return this.valueOf()?"§2ON":"§4OFF"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOL: {
        value: function (): "§aOn"|"§cOff"{
            return this.valueOf()?"§aOn":"§cOff"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    toFormattedStringIOLB: {
        value: function (): "§2On"|"§4Off"{
            return this.valueOf()?"§2On":"§4Off"
        },
        configurable: true,
        enumerable: true,
        writable: true
    }
});
Object.defineProperty(Error.prototype, 'stringify', {
    value: function stringify(){
        return this+" "+this.stack
    },
    configurable: true,
    enumerable: true,
    writable: true
})
Object.defineProperty(ActionFormData.prototype, 'forceShow', {
    value: async function forceShow(player: Player, timeout?: number): Promise<ActionFormResponse> {
        const timeoutTicks = system.currentTick + (timeout ?? 9999)
        while (system.currentTick <= timeoutTicks){
            const r = await (this as ActionFormData).show(player as any)
            if(r.cancelationReason != "UserBusy"||r.canceled == false){return r as any}
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
})
Object.defineProperty(ModalFormData.prototype, 'forceShow', {
    value: async function forceShow(player: Player, timeout?: number): Promise<ModalFormResponse> {
        const timeoutTicks = system.currentTick + (timeout ?? 9999)
        while (system.currentTick <= timeoutTicks){
            const r = await (this as ModalFormData).show(player as any)
            if(r.cancelationReason != "UserBusy"||r.canceled == false){return r as any}
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
})
Object.defineProperty(MessageFormData.prototype, 'forceShow', {
    value: async function forceShow(player: Player, timeout?: number): Promise<MessageFormResponse> {
        const timeoutTicks = system.currentTick + (timeout ?? 9999)
        while (system.currentTick <= timeoutTicks){
            const r = await (this as MessageFormData).show(player as any)
            if(r.cancelationReason != "UserBusy"||r.canceled == false){return r as any}
        }
    },
    configurable: true,
    enumerable: true,
    writable: true
})