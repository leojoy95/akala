"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./injector"));
__export(require("./factory"));
__export(require("./service"));
__export(require("./binder"));
__export(require("./parser"));
const module_1 = require("./module");
__export(require("./promiseHelpers"));
var eachAsync_1 = require("./eachAsync");
exports.eachAsync = eachAsync_1.any;
__export(require("./router"));
const log = require("debug");
exports.log = log;
function extend(target, ...args) {
    args.forEach(function (arg) {
        Object.keys(arg).forEach(function (key) {
            var a = typeof (target[key]);
            switch (typeof (target[key])) {
                case 'object':
                    extend(target[key], arg[key]);
                    break;
                default:
                    target[key] = arg[key];
                    break;
            }
        });
    });
    return target;
}
exports.extend = extend;
function module(name, ...dependencies) {
    return new module_1.Module(name, dependencies);
}
exports.module = module;
//# sourceMappingURL=index.js.map