import State, { RunningContainer } from '../state'
import { homedir } from 'os';
import { promises, exists } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { description } from '../container';
import serve from '@akala/commands/dist/cli/serve';
import { Container, ServeOptions } from '@akala/commands';

const existsAsync = promisify(exists);

export default async function (this: State, container: RunningContainer<State> & description.pm, options: ServeOptions & {})
{
    this.isDaemon = true;
    this.processes = [];
    var configPath: string;
    if (await existsAsync('./.pm.config.json'))
        configPath = join(process.cwd(), './.pm.config.json')
    else
        configPath = join(homedir(), './.pm.config.json');
    if (await existsAsync(configPath))
    {
        this.config = JSON.parse(await promises.readFile(configPath, 'utf-8'));
        process.chdir(this.config.containers.pm[0]);
    }
    else
        this.config = {
            containers: { pm: [process.cwd()] },
            mapping: {}
        } as any;

    this.config.save = function ()
    {
        return promises.writeFile(configPath, JSON.stringify(this, null, 4), 'utf-8').then(() => console.log('config saved'))
    }

    if (!this.config.externals)
        this.config.externals = [];

    await this.config.save();
    container.name = 'pm';
    await container.dispatch('map', 'pm', join(__dirname, '../../commands.json'), true);

    this.processes.push(container);
    container.running = true;

    if (!options.tcpPort)
        options.tcpPort = 31416;

    var stop = await serve(container as Container<any>, options || { _: ['local'] });
    process.on('SIGINT', stop);

    if (process.disconnect)
    {
        if (process.send)
            process.send('disconnecting daemon');
        process.disconnect();
    }
}

exports.default.$inject = ['container', 'options'];