/// <reference types="jquery" />
import { BaseControl } from './control';
import { Binding } from '@akala/core';
export declare class Json extends BaseControl<string> {
    constructor();
    link(target: any, element: JQuery, parameter: Binding | string): void;
}
