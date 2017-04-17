"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
exports.serviceModule = common_1.serviceModule;
const router_1 = require("./router");
exports.Router = router_1.Router;
const locationService_1 = require("./locationService");
exports.LocationService = locationService_1.LocationService;
const core_1 = require("@akala/core");
exports.ObservableArray = core_1.ObservableArray;
const http_1 = require("./http");
const template_1 = require("./template");
exports.Template = template_1.Template;
const part_1 = require("./part");
exports.Part = part_1.Part;
const scope_1 = require("./scope");
const controls_1 = require("./controls/controls");
exports.BaseControl = controls_1.BaseControl;
exports.Control = controls_1.Control;
exports.control = controls_1.control;
common_1.$$injector['router'] = router_1.router;
common_1.$$injector['BaseControl'] = controls_1.BaseControl;
common_1.$$injector['Control'] = controls_1.Control;
common_1.$$injector['control'] = controls_1.control;
var mainRouter = router_1.router();
mainRouter.use(common_1.serviceModule.register('$preRouter', router_1.router()).router);
mainRouter.use(common_1.serviceModule.register('$router', router_1.router()).router);
mainRouter.use(function (error) {
    console.error(error);
});
common_1.serviceModule.register('$http', new http_1.Http());
common_1.serviceModule.register('$location', new locationService_1.LocationService());
common_1.serviceModule.register('promisify', core_1.Promisify);
common_1.serviceModule.register('$defer', core_1.Deferred);
// export { Promisify, Deferred };
exports.run = common_1.$$injector.run.bind(common_1.$$injector);
common_1.$$injector.init([], function () {
    var rootScope = common_1.$$injector.register('$rootScope', new scope_1.Scope());
    $(document).applyTemplate(rootScope);
});
common_1.$$injector.start(['$location'], function ($location) {
    var started = false;
    $location.on('change', function () {
        if (started)
            mainRouter.handle(new router_1.Request(location), function (err) {
                if (err)
                    console.error(err);
                else
                    console.warn('deadend');
            });
    });
    $location.start({ hashbang: true });
    started = true;
});
$(function () {
    common_1.$$injector.start();
});
//# sourceMappingURL=clientify.js.map