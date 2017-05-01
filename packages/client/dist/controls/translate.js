"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const di = require("@akala/core");
const control_1 = require("./control");
const text_1 = require("./text");
di.registerFactory('$translator', di.injectWithName(['$translations'], function (translations) {
    return function (key, ...parameters) {
        if (!parameters)
            return translations && translations[key] || key;
        return (translations && translations[key] || key).replace(/\{\d+\}/g, function (m) {
            return parameters[m];
        });
    };
}));
let Translate = class Translate extends text_1.Text {
    constructor(translator) {
        super('translate');
        this.translator = translator;
    }
    setValue(element, value) {
        element.text(this.translator(value));
    }
};
Translate = __decorate([
    control_1.control('$translator')
], Translate);
exports.Translate = Translate;
//# sourceMappingURL=translate.js.map