import * as akala from '@akala/core'
import { Router, Request, BrowserLayer } from './router'
import { EventEmitter } from 'events'
import './controls/part'
import { Template } from './template'
import { IScope } from './scope'
import { service } from './common'
import { LocationService as Location } from './locationService'
import { each, Injector } from '@akala/core'
import { IControlInstance } from './controls/control'

export type PartInstance = { scope: any, element: HTMLElement, controlsInPart?: IControlInstance<any>[] };

@service('$part', '$template', '$router', '$location')
export class Part extends EventEmitter
{
    private routers: { [key: string]: Router } = {};

    constructor(private template: Template, router: Router, private location: Location)
    {
        super();
        location.on('changing', () =>
        {
            var parts = this.parts;
            parts.keys().forEach(function (partName)
            {
                if (partName == '$injector')
                    return;
                (<PartInstance>parts.resolve(partName)).element.textContent = '';
            })
        })

        router.use((req) =>
        {
            each(this.routers, router => router.handle(req, function (error)
            {
                if (error)
                    console.error(error);
            }))
        })
    }

    private parts = new akala.Injector();

    public register(partName: string, control: PartInstance)
    {
        var parts = this.parts;
        parts.register(partName, control);
        if (!this.routers[partName])
            this.routers[partName] = new Router();
        this.location.refresh();
    }

    public apply<TScope extends IScope<any>>(partInstance: () => PartInstance, part: PartDefinition<TScope>, params: any, next: akala.NextFunction)
    {
        var template = this.template;
        if (part && part.template)
            return template.get(part.template).then(function (template)
            {
                var p = partInstance();
                if (!p)
                    return;
                if (part.controller)
                    part.controller(p.scope, p.element, params, next);
                if (template)
                {
                    p.element.textContent = '';
                    if (p.controlsInPart)
                        setImmediate(() => akala.each(p.controlsInPart, c => c.dispose()));
                    template(p.scope, p.element).then(instances => p.controlsInPart = instances);
                }
            });
        else
        {
            var p = partInstance();
            if (!p)
                return;
            if (part && part.controller)
                part.controller(p.scope, p.element, params, next);
            else
                next();
        }
    }

    public use<TScope extends IScope<any>>(url: string): Part
    public use<TScope extends IScope<any>>(url: string, partName: string, part: PartDefinition<TScope>)
    public use<TScope extends IScope<any>>(url: string, partName: string = 'body', part?: PartDefinition<TScope>)
    {
        var self = this;
        if (!part)
        {
            var partService = new Part(this.template, new Router(), this.location);
            partService.parts = new Injector(this.parts);

            return partService;
        }
        if (!this.routers[partName])
            this.routers[partName] = new Router();
        var route = this.routers[partName].route(url);
        route.addHandler((layer: BrowserLayer) =>
        {
            layer.name = partName;
            return layer;
        }, function (req: Request, next: akala.NextFunction)
        {
            console.log('apply part ' + partName + ' for url ' + url);
            self.apply(() => self.parts.resolve(partName), part, req.params, next);
        });
    }
}

export interface PartDefinition<TScope extends IScope<any>>
{
    template?: string | Promise<string>;
    controller?(scope: TScope, element: Element, params: any, next: () => void): void;
}