import State, { RunningContainer } from '../state'
import { Container } from '@akala/commands'
import { Server } from 'net';
import { platform, homedir } from 'os';
import { promises, exists } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { description } from '../container';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
const existsAsync = promisify(exists);

export default async function (this: State, container: RunningContainer<State> & description.pm)
{
    this.isDaemon = true;
    this.processes = [];
    var configPath = join(homedir(), './.pm.config.json');
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
    this.config.save();

    container.name = 'pm';
    container.dispatch('map', 'pm', join(__dirname, '../../commands.json'), true);

    this.processes.push(container);
    container.running = true;


    var server = new Server((socket) =>
    {
        socket.setEncoding('utf-8')
        container.attach('jsonrpc', socket);
    });

    if (platform() == 'win32')
        server.listen('\\\\?\\pipe\\akala\\pm')
    else
        server.listen('/var/run/akala-pm.sock');
    console.log('server listening');

    if (process.disconnect)
    {
        if (process.send)
            process.send('disconnecting daemon');
        process.disconnect();
    }
}

exports.default.$inject = ['container'];