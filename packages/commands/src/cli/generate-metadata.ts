import * as akala from "../index";
import * as core from '@akala/core'
import { Container } from "../model/container";
import * as path from 'path'
import * as fs from 'fs';
import { jsonObject } from "../metadata";
import { FileSystemConfiguration } from "../processors/fs";
import { Writable } from "stream";
import { outputHelper, write } from "./new";


export default async function generate(name?: string, folder?: string, outputFile?: string)
{
    folder = folder || process.cwd();
    if (!name)
        name = path.basename(folder, path.extname(folder));
    var container = new Container(name, {});

    var output: Writable;
    var outputFolder: string;

    ({ output, outputFolder, outputFile } = await outputHelper(outputFile, 'commands.ts', true));

    await akala.Processors.FileSystem.discoverCommands(folder, container);

    var meta = akala.metadata(container);

    var hasFs = false;
    await core.eachAsync(meta.commands, async function (cmd)
    {
        if (cmd.config.fs)
        {
            hasFs = true;
        }
    });


    if (hasFs)
    {
        await write(output, 'declare type Arguments<T> = T extends ((...x: infer X) => any) ? X : never;\n');
        await write(output, 'declare type Argument0<T> = T extends ((x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument1<T> = T extends ((a: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument2<T> = T extends ((a: any, b: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument3<T> = T extends ((a: any, b: any, c: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument4<T> = T extends ((a: any, b: any, c: any, d: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument5<T> = T extends ((a: any, b: any, c: any, d: any, e: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument6<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument7<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument8<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument9<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument10<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument11<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument12<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument13<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument14<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, n: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument15<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, n: any, o: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument16<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, n: any, o: any, p: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument17<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, n: any, o: any, p: any, q: any, x: infer X, ...z: any[]) => any) ? X : never;\n');
    }

    if (outputFile.endsWith('.d.ts'))
        await write(output, 'declare ');
    else
        await write(output, 'export ');

    await write(output, `default interface ${name} \n{\n`);

    await core.eachAsync(meta.commands, async function (cmd)
    {

        await write(output, `\tdispatch (cmd:'${cmd.name}'`);
        if (cmd.config.fs)
        {
            let config = cmd.config.fs as jsonObject & FileSystemConfiguration;
            var filePath = path.relative(outputFolder, config.source || config.path);
            filePath = path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)));
            filePath = filePath.replace(/\\/g, '/');
            if (config.inject)
            {
                await write(output, ', ...args: [');
                var args: string[] = [];
                config.inject.forEach((p, i) =>
                {
                    if (p.startsWith('param.'))
                        args.push(`Argument${i}<typeof import('./${filePath}').default>`)
                })
                await write(output, args.join(', '));
                await write(output, `]): ReturnType<typeof import('./${filePath}').default>\n`);
            }
            else
                await write(output, `, ...args: Arguments<typeof import('./${filePath}').default>): ReturnType<typeof import('./${filePath}').default>\n`);
        }
        else if (cmd.inject && cmd.inject.length)
        {
            await write(output, cmd.inject.filter(p => p.startsWith('param.')).map(p => `any`).join(', '));
            await write(output, `): any\n`);
        }
        else
            await write(output, `, ...args: any[]): any\n`);

    });

    await write(output, '}\n');
};