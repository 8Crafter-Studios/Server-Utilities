/**
 * @example
 * ```ts
 * const str = "something \@e[type='pig',family=mob,hasitem=[{item=stick,slot=0,location=\"slot.enderchest\"},{item='iron_sword',location=slot.weapon.offhand,slot=0}],name=entityname] somethingelseelse";
 * const selectors = extractSelectors(str);
 * console.log(selectors);
 * ```
 * @param str
 * @returns
 */
export declare function extractSelectors(str: string): string[];
