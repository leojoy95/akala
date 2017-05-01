import { Module, Translator, isPromiseLike, PromiseStatus } from '@akala/core';
import '@akala/core';
export declare var $$injector: Module;
export declare var serviceModule: Module;
export { Translator, isPromiseLike, PromiseStatus };
export declare function service(name: any, ...toInject: string[]): (target: new (...args: any[]) => any) => void;
