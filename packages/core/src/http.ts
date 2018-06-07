import { register, injectWithName } from "./injector";
import { ParsedAny, Parser } from "./parser";
import { each, map } from "./each";
import { extend, module } from "./helpers";
import { service } from "./service";
import { FormatterFactory } from "./formatters/common";
import * as uri from 'url';
import * as qs from 'querystring'
import 'isomorphic-fetch';

export interface HttpOptions
{
    method?: string;
    url: string | uri.UrlObject;
    queryString?: any;
    body?: any;
    headers?: { [key: string]: string | number | Date };
    contentType?: 'json' | 'form';
    type?: 'json' | 'xml';
}

export interface Http<TResponse=Response>
{
    get(url: string, params?: any): PromiseLike<TResponse>;
    post(url: string, body?: any): PromiseLike<FormData>;
    postJSON<T=string>(url: string, body?: any): PromiseLike<T>;
    getJSON<T>(url: string, params?: any): PromiseLike<T>;
    invokeSOAP(namespace: string, action: string, url: string, params?: { [key: string]: string | number | boolean }): PromiseLike<TResponse>;
    call(options: HttpOptions): PromiseLike<TResponse>;
}

@service('$http')
export class FetchHttp implements Http<Response>
{
    constructor()
    {
    }

    public get(url: string, params?: any)
    {
        return this.call({ url: url, method: 'GET', queryString: params });
    }
    public post(url: string, body?: any): PromiseLike<FormData>
    {
        return this.call({ method: 'POST', url: url, body: body }).then((r) =>
        {
            return r.formData();
        });
    }
    public postJSON<T=string>(url: string, body?: any): PromiseLike<T>
    {
        return this.call({ method: 'POST', url: url, body: body, contentType: 'json', type: 'json' }).then((r) =>
        {
            return r.json();
        });
    }
    public getJSON<T>(url: string, params?: any): PromiseLike<T>
    {
        return this.call({ method: 'GET', url: url, queryString: params, type: 'json' }).then((r) =>
        {
            return r.json();
        });
    }


    public invokeSOAP(namespace: string, action: string, url: string, params?: { [key: string]: string | number | boolean })
    {
        var body = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>' +
            '<u:' + action + ' xmlns:u="' + namespace + '">';
        each(params, function (paramValue, paramName)
        {
            body += '<' + paramName + '><![CDATA[' + paramValue + ']]></' + paramName + '>';
        });
        body += '</u:' + action + '></s:Body></s:Envelope>';
        return this.call({ method: 'POST', url: url, type: 'xml', headers: { SOAPAction: namespace + '#' + action }, body: body });
    }

    public call(options: HttpOptions): Promise<Response>
    {
        var init: RequestInit = { method: options.method || 'GET', body: options.body };
        if (typeof (options.url) == 'string')
            options.url = uri.parse(options.url, true);
        if (options.queryString)
        {
            if (typeof (options.queryString) == 'string')
                options.queryString = qs.parse(options.queryString);
            options.url.query = extend(options.url.query, options.queryString);
        }

        if (options.headers)
        {
            init.headers = {};
            each(options.headers, function (value, key: string)
            {
                if (value instanceof Date)
                    init.headers[key] = value.toJSON();
                else
                    init.headers[key] = value && value.toString();
            });
        }

        if (options.type)
        {
            init.headers = init.headers || {};
            switch (options.type)
            {
                case 'json':
                    init.headers['Accept'] = 'application/json, text/json';
                    break;
                case 'xml':
                    init.headers['Accept'] = 'text/xml';
                    break;
            }
        }

        if (options.contentType)
        {
            init.headers = init.headers || {};
            switch (options.contentType)
            {
                case 'json':
                    init.headers['Content-Type'] = 'application/json; charset=UTF-8'
                    break;
                case 'form':
                    init.headers['Content-Type'] = 'multipart/form-data';
                    if (!(init.body instanceof FormData) && typeof init.body == 'undefined')
                        init.body = FetchHttp.serialize(init.body);
                    break;
            }
        }

        return fetch(uri.format(options.url), init);
    }


    public static serialize(obj, prefix?: string)
    {
        return map(obj, function (value, key)
        {

            if (typeof (value) == 'object')
            {

                var keyPrefix = prefix;
                if (prefix)
                {
                    if (typeof (key) == 'number')
                        keyPrefix = prefix.substring(0, prefix.length - 1) + '[' + key + '].';
                    else
                        keyPrefix = prefix + encodeURIComponent(key) + '.';
                }
                return FetchHttp.serialize(value, keyPrefix);
            }
            else
            {
                return (prefix || '') + encodeURIComponent(key) + '=' + encodeURIComponent(value);
            }
        }, true)
    }

}



export class HttpFormatterFactory implements FormatterFactory<Promise<any>, { method?: keyof Http }>
{
    constructor() { }
    public parse(expression: string): { method?: keyof Http } & ParsedAny
    {
        var method = /^ *\w+/.exec(expression);
        if (method)
            return { method: <keyof Http>method[0], $$length: method[0].length };
        return Parser.parseAny(expression, false);
    }
    public build(formatter, settings: { method: keyof Http })
    {
        if (!settings)
            settings = { method: 'getJSON' };

        return function (value)
        {
            return injectWithName(['$http'], function (http: Http)
            {
                return (http[settings.method || 'getJSON'] as Function)(formatter(value));
            })();
        }
    }
}

module('$formatters').register('#http', new HttpFormatterFactory());