/// <reference types="jquery" />
import { BaseControl } from './control';
import { IScope } from '../scope';
import { Binding } from 'akala-core';
import { Part as PartService } from '../part';
export declare class Part extends BaseControl<string> {
    private partService;
    constructor(partService: PartService);
    link(target: IScope, element: JQuery, parameter: string | Binding): void;
}
