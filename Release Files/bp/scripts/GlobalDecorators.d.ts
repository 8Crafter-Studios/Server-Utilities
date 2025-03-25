declare function loggedMethod(originalMethod: any, propertyKey: string, descriptor: PropertyDescriptor): void;
declare function log(value: any, propertyKey?: string): void;
declare function configurable(value: boolean): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void;
declare function enumerable(value: boolean): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void;
declare function writable(value: boolean): (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void;
declare const readonlifyMap: Map<any, true>;
declare function readonlify<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {};
} & T;
declare function readonly(target: any, key: string, propertyDescriptor?: PropertyDescriptor): void;
declare function propToGetter(target: any, key: string, propertyDescriptor?: PropertyDescriptor): void;
