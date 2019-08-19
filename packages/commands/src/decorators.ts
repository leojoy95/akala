import { Command } from "./command";
import { Injectable as baseInjectable } from "@akala/core";
import { Configuration, Configurations } from "./metadata";

type Injectable<T> = baseInjectable<any> & { '$inject'?: string[] };

export function inject(...toInject: string[])
{
    return function (f: Injectable<any> & { '$inject'?: string[] })
    {
        f['$inject'] = toInject;
        return f;
    }
}

export function configure<T extends Configuration>(name: string, config: T): (cmd: Command<any> | Injectable<any>) => Command<any>
export function configure(config: Configurations): (cmd: Command<any> | Injectable<any>) => Command<any>
export function configure(name: Configurations | string, config?: any): (cmd: Command<any> | Injectable<any>) => Command<any>
{
    debugger;
    if (typeof name == 'string')
        config = { [name]: config };
    else
        config = name;
    return function (cmd: Command<any> | baseInjectable<any>): Command<any>
    {
        if (typeof cmd == 'function')
            cmd = new Command<any>(cmd);

        cmd.config = Object.assign({}, config, cmd.config);

        return cmd;
    }
}