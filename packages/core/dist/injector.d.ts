import { Http } from './web';
export declare type Injected = (instance?: any) => any;
export declare type Injectable<T> = () => T;
export declare class Injector {
    private parent;
    constructor(parent?: Injector);
    setInjectables(value: {
        [key: string]: any;
    }): void;
    keys(): string[];
    merge(i: Injector): void;
    inject<T>(a: Injectable<T> | Function): Injected;
    resolve(param: '$http'): Http;
    resolve(param: string): any;
    inspect(): void;
    injectNewWithName(toInject: string[], ctor: Function): Injected;
    injectWithName<T>(toInject: string[], a: Injectable<T>): Injectable<T>;
    injectWithName(toInject: string[], a: Function): Injected;
    private injectables;
    unregister(name: string): void;
    register<T>(name: string, value: T, override?: boolean): T;
    registerFactory<T>(name: string, value: () => T, override?: boolean): () => T;
    registerDescriptor(name: string, value: PropertyDescriptor, override?: boolean): void;
}
export declare function resolve(name: string): any;
export declare function unregister(name: string): void;
export declare function merge(i: Injector): void;
export declare function inspect(): void;
export declare function inject<T>(a: Function | Injectable<T>): Injected;
export declare function injectWithName<T>(toInject: string[], a: Function | Injectable<T>): Injected;
export declare function injectNewWithName(toInject: string[], a: Function): Injected;
export declare function register(name: string, value: any, override?: boolean): any;
export declare function registerFactory(name: string, value: () => any, override?: boolean): () => any;
