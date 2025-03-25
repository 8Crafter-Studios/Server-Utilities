declare function loggedMethod(originalMethod: any, propertyKey: string, descriptor: PropertyDescriptor): void;
declare function log(value: any, propertyKey?: string): void;
declare function configurable(value: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function enumerable(value: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function writable(value: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
