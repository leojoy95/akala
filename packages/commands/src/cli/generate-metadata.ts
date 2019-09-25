import * as akala from "..";
import * as core from '@akala/core'
import { Container } from "../container";
import * as path from 'path'
import * as fs from 'fs';
import { jsonObject } from "../metadata";
import { FileSystemConfiguration } from "../processors/fs";

async function write(output: fs.WriteStream, content: string)
{
    return new Promise<void>((resolve, reject) =>
    {
        output.write(content, function (err)
        {
            if (err)
                reject(err);
            else
                resolve();
        })
    })
}

export default async function generate(name: string, folder?: string, outputFile?: string)
{
    folder = folder || process.cwd();
    if (!name)
        name = path.basename(folder, path.extname(folder));
    var container = new Container(name, {});

    if (!outputFile || fs.existsSync(outputFile) && (await fs.promises.lstat(outputFile)).isDirectory())
        outputFile = outputFile && outputFile + '/commands.ts' || 'commands.ts';

    var outputFolder = path.dirname(outputFile);

    var output = fs.createWriteStream(outputFile);

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
        await write(output, 'declare type Argument1<T> = T extends ((x: infer X, ...z:any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument2<T> = T extends ((a:any, x: infer X, ...z:any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument3<T> = T extends ((a:any, b:any, x: infer X, ...z:any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument4<T> = T extends ((a:any, b:any, c:any, x: infer X, ...z:any[]) => any) ? X : never;\n');
        await write(output, 'declare type Argument5<T> = T extends ((a:any, b:any, c:any, d:any, x: infer X, ...z:any[]) => any) ? X : never;\n');
    }

    if (outputFile.endsWith('.d.ts'))
        await write(output, 'declare ');
    else
        await write(output, 'export ');

    await write(output, 'namespace description \n\t{\n');

    await write(output, `\texport interface ${name} \n\t\t{\n`);

    await core.eachAsync(meta.commands, async function (cmd)
    {

        await write(output, `\t\tdispatch (cmd:'${cmd.name}'`);
        if (cmd.inject && cmd.inject.length)
        {
            await core.eachAsync(cmd.inject, async function (i)
            {
                await write(output, `, ${i}`);
            });
        }
        else if (cmd.config.fs)
        {
            let config = cmd.config.fs as jsonObject & FileSystemConfiguration;
            var filePath = path.relative(outputFolder, config.source || config.path);
            filePath = path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)));
            filePath = filePath.replace(/\\/g, '/');
            if (config.inject)
            {
                await write(output, ', ...args:[');
                await write(output, config.inject.filter(p => p.startsWith('param.')).map(p => `Argument${p.substr('param.'.length)}<typeof import('./${filePath}').default>`).join(', '));
                await write(output, `]): ReturnType<typeof import('./${filePath}').default>\n`);
            }
            else
                await write(output, `, ...args:Arguments<typeof import('./${filePath}').default>): ReturnType<typeof import('./${filePath}').default>\n`);
        }
        else
            await write(output, `, ...args:any[]): any\n`);

    });

    await write(output, '\t}\n');
    await write(output, '}\n');
};