import { Injector, HttpOptions, each, Http, defaultInjector } from '@akala/core';
import * as pathRegexp from 'path-to-regexp';
import { CommandProcessor } from '../model/processor';
import { Command, Configuration } from '../metadata';

export class HttpClient<T> extends CommandProcessor<T>
{
    public process(command: Command, param: { param: any[], [key: string]: any }): any | PromiseLike<any>
    {
        if (!command.config)
            throw new Error('no trigger configuration defined');

        var config = command.config.http as unknown as HttpConfiguration;
        if (!config)
            throw new Error('no http configuration specified');

        var injector = this.injector;
        return injector.injectWithNameAsync(['$http', '$resolveUrl'], async function (http: Http, resolveUrl)
        {
            const res = await http.call(HttpClient.buildCall(config, resolveUrl, ...param.param));
            switch (config.type)
            {
                case 'raw':
                    return res;
                case 'text':
                    return res.text();
                case 'json':
                default:
                    if (res.status != 201 && (!res.headers.has('content-length') || Number(res.headers.get('content-length')) > 0))
                        return res.json();
                    return null;
            }
        })
    }

    public static buildCall(config: HttpConfiguration, resolveUrl: (s: string) => string, ...param: any[]): HttpOptions
    {
        var url = config.route;
        if (url[0] == '/')
            url = url.substr(1);
        var route: { [key: string]: any } | null = null;
        if (config.type == 'raw')
        {
            config = Object.assign({}, config);
            config.type = undefined;
        }
        var options: HttpOptions = { method: config.method, url: '', type: config.type };
        if (config.inject)
            each(config.inject, function (value, key)
            {
                switch (value)
                {
                    case 'body':
                        if (typeof (param[key]) == 'object')
                        {
                            options.contentType = options.type as any;
                            options.body = Object.assign(options.body || {}, param && param[key]);
                        }
                        else
                        {
                            options.contentType = options.type as any;
                            if (!options.body)
                                options.body = {};
                            options.body = param && param[key] as any;
                        }
                        break;
                    default:
                        var indexOfDot = value.indexOf('.');
                        if (~indexOfDot)
                        {
                            var subKey = value.substr(indexOfDot + 1);
                            switch (value.substr(0, indexOfDot))
                            {
                                case 'body':
                                    options.contentType = options.type as any;
                                    options.body = options.body || {};
                                    options.body[subKey] = param && param[key] as any;
                                    break;
                                case 'header':
                                    if (!options.headers)
                                        options.headers = {};
                                    options.headers[subKey] = param && param[key] as any;
                                    break;
                                case 'query':
                                    if (!options.queryString)
                                        options.queryString = {};
                                    options.queryString[subKey] = param && param[key];
                                    break;
                                case 'route':
                                    if (!route)
                                        route = {};
                                    if (param && param[key])
                                        route[subKey] = param && param[key] && param[key].toString();
                                    break;
                            }
                            break;
                        }
                }
            })
        if (route)
            options.url = resolveUrl(pathRegexp.compile(url)(route))
        else
            options.url = resolveUrl(url);
        return options;
    }

    private readonly injector: Injector;

    constructor(injector?: Injector)
    {
        super('http')

        this.injector = injector || defaultInjector;
    }
}

export interface HttpConfiguration extends Configuration
{
    method: string;
    route: string;
    type?: 'json' | 'xml' | 'text' | 'raw';
}