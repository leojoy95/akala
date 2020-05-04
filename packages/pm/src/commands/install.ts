import State from "../state";
import npmHelper from "../npm-helper";
import { Container } from "@akala/commands";
import { join } from "path";
import { createRequire } from 'module'


export default async function install(this: State, packageName: string, pm: Container<State>)
{
    var path = process.cwd();
    await npmHelper.install(packageName, path);

    return await pm.dispatch('discover', packageName, createRequire(path))
};
