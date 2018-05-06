import * as di from '@akala/core'
import { control, BaseControl } from './control'
import { Promisify, Binding } from '@akala/core'
import { Text } from './text'

@control()
export class Href extends Text
{
    constructor()
    {
        super('href');
    }


    protected setValue(element: Element, value)
    {
        element.attributes['href'] = value;
    }
}
