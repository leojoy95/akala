"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const control_1 = require("./control");
const core_1 = require("@akala/core");
let Json = class Json extends control_1.BaseControl {
    constructor() {
        super('json', 400);
    }
    link(target, element, parameter) {
        if (parameter instanceof core_1.Binding) {
            parameter.onChanged(function (ev) {
                element.text(JSON.stringify(ev.eventArgs.value));
            });
        }
        else
            element.text(JSON.stringify(parameter));
    }
};
Json = __decorate([
    control_1.control()
], Json);
exports.Json = Json;
//# sourceMappingURL=json.js.map