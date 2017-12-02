import { getParamNames } from './reflect';
import { Http } from './web';
import * as debug from 'debug';
import { whenOrTimeout, isPromiseLike } from './promiseHelpers';
import { EventEmitter } from 'events';
import { Promisify } from './index';

var log = debug('akala:core:injector');


function ctorToFunction(this: new () => any)
{
    var args = [null];
    for (var i = 0; i < arguments.length; i++)
        args[i + 1] = arguments[i];
    return new (Function.prototype.bind.apply(this, args));
}

export type Injected<T> = (instance?: any) => T;
export type Injectable<T> = (...args: any[]) => T;


export class Injector
{
    constructor(private parent?: Injector)
    {
        if (this.parent == null)
            this.parent = defaultInjector;
        this.register('$injector', this);
    }

    private notifier = new EventEmitter();

    public setInjectables(value: { [key: string]: any })
    {
        this.injectables = value;
    }

    public keys()
    {
        return Object.keys(this.injectables);
    }

    public merge(i: Injector)
    {
        var self = this;
        Object.getOwnPropertyNames(i.injectables).forEach(function (property)
        {
            if (property != '$injector')
                self.registerDescriptor(property, Object.getOwnPropertyDescriptor(i.injectables, property));
        })
    }

    protected notify<T>(name: string, value?: PropertyDescriptor)
    {
        if (typeof value == 'undefined')
            value = Object.getOwnPropertyDescriptor(this, name);
        if (this.notifier.listenerCount(name) > 0)
            this.notifier.emit(name, value);
        if (this.parent)
            this.parent.notify(name, value);
    }

    public onResolve<T=any>(name: string): PromiseLike<T>
    public onResolve<T=any>(name: string, handler: (value: T) => void): void
    public onResolve<T=any>(name: string, handler?: (value: T) => void)
    {
        if (!handler)
            return new Promise<T>((resolve, reject) =>
            {
                this.onResolve(name, resolve);
            })
            
        var value = this.resolve(name);
        if (value !== null)
        {
             handler(value);
             return;
        }

        this.notifier.once(name, (prop: PropertyDescriptor) =>
        {
            if (prop.get)
                handler(prop.get());
            else
                handler(prop.value);
        });
        if (this.parent)
            this.parent.onResolve(name, handler);
    }

    public inject<T>(a: Injectable<T>)
    {
        return this.injectWithName(a['$inject'] || getParamNames(a), a);
    }

    public injectNew<T>(ctor: Injectable<T>)
    {
        return this.inject(ctorToFunction.bind(ctor));
    }

    public resolve(param: '$http'): Http
    public resolve<T=any>(param: string): T;
    public resolve<T=any>(param: string): T
    {
        log('resolving ' + param);
        if (typeof (this.injectables[param]) != 'undefined')
        {
            log('resolved ' + param + ' to %o', this.injectables[param]);
            return this.injectables[param];
        }
        if (this.parent)
        {
            log('trying parent injector');
            return this.parent.resolve<T>(param);
        }
        return null;
    }

    public resolveAsync<T=any>(param: string): T | PromiseLike<T>
    {
        log('resolving ' + param);
        if (typeof (this.injectables[param]) != 'undefined')
        {
            log('resolved ' + param + ' to %o', this.injectables[param]);
            return this.injectables[param];
        }
        if (this.parent)
        {
            log('trying parent injector');
            return this.parent.resolveAsync(param);
        }
        return this.onResolve<T>(name);
    }



    private inspecting: boolean = false;

    public inspect()
    {
        if (this.inspecting)
            return;
        this.inspecting = true;
        console.log(this.injectables);
        this.inspecting = false;
    }

    public injectNewWithName(toInject: string[], ctor: Function)
    {
        return injectWithName(toInject, ctorToFunction.bind(ctor));
    }

    public injectWithNameAsync<T>(toInject: string[], a: Injectable<T>): PromiseLike<T>
    {
        var paramNames = <string[]>getParamNames(a);
        var self = this;
        var wait = false;

        return new Promise<T>((resolve, reject) =>
        {
            if (paramNames.length == toInject.length || paramNames.length == 0)
            {
                if (toInject.length == paramNames.length && paramNames.length == 0)
                    resolve(a.call(null));
                else
                {
                    var args = [];
                    for (var param of toInject)
                    {
                        args[args.length] = self.resolveAsync(param);
                        if (isPromiseLike(args[args.length - 1]))
                            wait = true;
                    }
                    if (wait)
                        return Promise.all(args.map(function (v)
                        {
                            if (isPromiseLike(v))
                                return v;
                            return Promisify(v);
                        })).then(a);
                    else
                        resolve(a.apply(null, args));
                }
            }
            else
                reject('the number of arguments does not match the number of injected parameters');
        });
    }


    public injectWithName<T>(toInject: string[], a: Injectable<T>): Injected<T>
    {
        var paramNames = <string[]>getParamNames(a);
        var self = this;
        if (paramNames.length == toInject.length || paramNames.length == 0)
        {
            if (toInject.length == paramNames.length && paramNames.length == 0)
                return <Injectable<T>>a;
            return function (instance?: any)
            {
                var args = [];
                for (var param of toInject)
                {
                    args[args.length] = self.resolve(param)
                }
                return a.apply(instance, args);
            }
        }
        else
            return function (instance?: any)
            {
                var args = [];
                var unknownArgIndex = 0;
                for (var param of toInject)
                {
                    var resolved = self.resolve(param);
                    if (resolved && paramNames.indexOf(param) == args.length)
                        args[args.length] = resolved;
                    else if (typeof (arguments[unknownArgIndex]) != 'undefined')
                        args[args.length] = arguments[unknownArgIndex++];
                    else
                        args[args.length] = resolved;
                }
                return a.apply(instance, args);
            }
    }


    private injectables = {};

    public unregister(name: string)
    {
        var registration = Object.getOwnPropertyDescriptor(this.injectables, name);
        if (registration)
            delete this.injectables[name];
    }

    public register<T>(name: string, value: T, override?: boolean)
    {
        if (typeof (value) != 'undefined' && value !== null)
            this.registerDescriptor(name, { value: value, enumerable: true, configurable: true }, override);
        return value;
    }
    public registerFactory<T>(name: string, value: () => T, override?: boolean)
    {
        this.register(name + 'Factory', value, override);
        this.registerDescriptor(name, {
            get: function ()
            {
                return value();
            }, enumerable: true, configurable: true
        }, override);
        return value;
    }
    public registerDescriptor(name: string, value: PropertyDescriptor, override?: boolean)
    {
        if (!override && typeof (this.injectables[name]) != 'undefined')
            throw new Error('There is already a registered item for ' + name);
        if (typeof (this.injectables[name]) !== 'undefined')
            this.unregister(name);
        Object.defineProperty(this.injectables, name, value);
        this.notify(name, value);
    }
}

declare var $$defaultInjector;

if (!global['$$defaultInjector'])
    global['$$defaultInjector'] = new Injector();

var defaultInjector: Injector = global['$$defaultInjector'];


export function resolve(name: string)
{
    return defaultInjector.resolve(name);
}

export function unregister(name: string)
{
    return defaultInjector.unregister(name);
}

export function merge(i: Injector)
{
    return defaultInjector.merge(i);
}

export function inspect()
{
    return defaultInjector.inspect();
}

export function inject<T>(a: Injectable<T>)
{
    return defaultInjector.inject(a);
}

export function injectNew<T>(a: Injectable<T>)
{
    return defaultInjector.injectNew(a);
}

export function injectWithName<T>(toInject: string[], a: Injectable<T>)
{
    return defaultInjector.injectWithName(toInject, a);
}

export function injectNewWithName(toInject: string[], a: Function)
{
    return defaultInjector.injectNewWithName(toInject, a);
}

export function resolveAsync<T=any>(name: string)
{
    return defaultInjector.resolveAsync<T>(name)
}

export function onResolve<T=any>(name: string)
{
    return defaultInjector.onResolve<T>(name)
}

export function injectWithNameAsync<T>(toInject: string[], a: Injectable<T>)
{
    return defaultInjector.injectWithNameAsync(toInject, a);
}

export function register(name: string, value: any, override?: boolean)
{
    return defaultInjector.register(name, value, override);
}
export function registerFactory(name: string, value: () => any, override?: boolean)
{
    return defaultInjector.registerFactory(name, value, override);
}