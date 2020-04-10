!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@akala/json-rpc-ws"]=t():e["@akala/json-rpc-ws"]=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s="./test/browser_test._js")}({"../../node_modules/ms/index.js":function(e,t){var r=1e3,n=6e4,s=60*n,o=24*s;function i(e,t,r,n){var s=t>=1.5*r;return Math.round(e/r)+" "+n+(s?"s":"")}e.exports=function(e,t){t=t||{};var a=typeof e;if("string"===a&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!t)return;var i=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*i;case"weeks":case"week":case"w":return 6048e5*i;case"days":case"day":case"d":return i*o;case"hours":case"hour":case"hrs":case"hr":case"h":return i*s;case"minutes":case"minute":case"mins":case"min":case"m":return i*n;case"seconds":case"second":case"secs":case"sec":case"s":return i*r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return i;default:return}}(e);if("number"===a&&isFinite(e))return t.long?function(e){var t=Math.abs(e);if(t>=o)return i(e,t,o,"day");if(t>=s)return i(e,t,s,"hour");if(t>=n)return i(e,t,n,"minute");if(t>=r)return i(e,t,r,"second");return e+" ms"}(e):function(e){var t=Math.abs(e);if(t>=o)return Math.round(e/o)+"d";if(t>=s)return Math.round(e/s)+"h";if(t>=n)return Math.round(e/n)+"m";if(t>=r)return Math.round(e/r)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},"./lib/base.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("./node_modules/debug/src/browser.js"),s=r("./node_modules/uuid/dist/esm-browser/index.js"),o=n("json-rpc-ws");t.Base=class{constructor(e){this.type=e,this.id=s.v4(),this.browser=!1,this.requestHandlers={},this.connections={}}expose(e,t){if(o("registering handler for %s",e),this.requestHandlers[e])throw Error("cannot expose handler, already exists "+e);this.requestHandlers[e]=t}connected(e){var t=this.connection(e);o("%s connected with id %s",this.type,t.id),this.connections[t.id]=t}disconnected(e){o("disconnected"),delete this.connections[e.id]}hasHandler(e){return void 0!==this.requestHandlers[e]}getHandler(e){return this.requestHandlers[e]}getConnection(e){return this.connections[e]}hangup(){o("hangup"),Object.keys(this.connections).forEach((function(e){this.connections[e].close(),delete this.connections[e]}),this)}}},"./lib/browser.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("./lib/shared-connection.js"),s=r("./lib/errors.js");t.Errors=s.default;const o=r("./node_modules/debug/src/browser.js").default("json-rpc-ws"),i=r("./lib/ws/browser.js");t.Client=i.default,t.createClient=function(){return o("createClient"),new i.default};class a{constructor(e){this.stream=e,this.reader=new u(e),this.reader.releaseLock()}emitError(e){this.reader.emitError(e)}get closed(){return this.reader.closed}cancel(e){return this.reader.cancel(e)}push(...e){this.reader.push(...e)}read(e){return this.reader.read().then(t=>(t.done||(e.byteOffset=t.value.byteOffset,e.byteLength=t.value.byteLength,e.buffer=t.value.buffer),{done:t.done,value:e}))}releaseLock(){this.stream.reader===this&&(this.stream.reader=void 0)}}class c extends Promise{constructor(){super((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){if(void 0===this._resolve)throw new Error("Not Implemented");this._resolve(e)}reject(e){if(void 0===this._reject)throw new Error("Not Implemented");this._reject(e)}}class u{constructor(e){this.stream=e,this.closed=new c}emitError(e){return this.next||(this.next=new c),this.next.reject(e),this.next}push(...e){if(0!=e.length){var t=e.reduce((e,t)=>e+(null===t?0:t.byteLength-t.byteOffset),0);if(0===t)return this.next||(this.next=new c),this.next.resolve({done:!0});var r=new Uint8Array(t),n=0,s=void 0;for(s of e){if(null===s)break;for(var o=s.byteOffset;o<s.byteLength;o++)r[n++]=s[o]}this.next||(this.next=new c),this.next.resolve({value:r,done:!1}),null===s&&(this.next=new c,this.next.resolve({done:!0}),this.closed.resolve())}}cancel(e){return this.next?this.next.then(()=>Promise.reject(e)):Promise.reject(e)}read(){return this.next||(this.next=new c),this.next.finally(()=>this.next=void 0),this.next}releaseLock(){this.stream.reader===this&&(this.stream.reader=void 0)}}class d{constructor(){this.buffer=[]}get reader(){return this._reader}set reader(e){this._reader=e,e&&this.buffer.length&&e.push(...this.buffer)}get locked(){return!!this.reader&&!this.target}cancel(e){return this.reader?this.reader.cancel(e):this.target?this.target.abort(e):Promise.resolve()}emitError(e){return this.reader?this.reader.emitError(e):this.target?this.target.abort(e):void 0}push(e){this.reader?this.reader.push(e):this.buffer.push(e)}getReader(e){if(this.locked)throw new Error("stream is already locked");return e&&"byob"===e.mode?this.reader=new a(this):this.reader=new u(this)}pipeThrough({writable:e,readable:t},r){return this.pipeTo(e,r),t}async pipeTo(e,t){this.target=e;for(var r,n=e.getWriter();void 0!==(r=this.buffer.shift());)r&&await n.write(r),null===r&&t&&t.preventClose&&await n.close()}tee(){throw new Error("Method not implemented.")}}class l extends n.Connection{constructor(e,t){super(e,t)}async sendStream(e,t){var r=t.getReader(),n=await r.read();!n.done&&this.socket.open?this.sendRaw({id:e,result:{event:"data",isBuffer:!0,data:{type:"Buffer",data:n.value}}}):this.socket.open?this.sendRaw({id:e,result:{event:"end"},stream:!1}):o("socket was closed before end of stream")}isStream(e){return void 0!==e&&!!e&&"function"==typeof e.getReader}buildStream(e,t){var r=t=new d,n=t;Object.getOwnPropertyNames(n).forEach((function(e){if(null==Object.getOwnPropertyDescriptor(t,e)){var r=Object.getOwnPropertyDescriptor(n,e);r&&Object.defineProperty(t,e,r)}}));var s=this.responseHandlers[e]=(t,n)=>{if(t)r.emitError(t);else switch(n.event){case"data":n.data&&r.push(n.data.data),this.responseHandlers[e]=s;break;case"end":r.push(null)}};return t}}t.Connection=l},"./lib/errors.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("./node_modules/debug/src/browser.js")("json-rpc-ws");class s{constructor(){this.parseError={code:-32700,message:"Parse error"},this.invalidRequest={code:-32600,message:"Invalid Request"},this.methodNotFound={code:-32601,message:"Method not found"},this.invalidParams={code:-32602,message:"Invalid params"},this.internalError={code:-32603,message:"Internal error"},this.serverError={code:-32e3,message:"Server error"}}}t.Errors=s;var o=new s;t.default=function(e,t,r){if(o[e])throw new Error("Invalid error type "+e);var s={error:o[e]};return"string"!=typeof t&&"number"!=typeof t||(s.id=t),void 0!==r&&(s.error.data=r),n("error %j",s),s}},"./lib/shared-client.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("./lib/base.js"),s=r("./node_modules/debug/src/browser.js")("json-rpc-ws");class o extends n.Base{constructor(e){super("client"),this.socketConstructor=e,s("new Client")}connect(e,t){if(s("Client connect %s",e),!this.isConnected())throw new Error("Already connected");var r=this,n=!1,o=this.socket=this.socketConstructor(e);o.once("open",(function(){r.connected(o),n=!0,t&&t.call(this)})),t&&this.socket.once("error",(function(e){n||t.call(r,e)}))}isConnected(){return 0!==Object.keys(this.connections).length}getConnection(){var e=Object.keys(this.connections);return this.connections[e[0]]}disconnect(e){if(this.isConnected())throw new Error("Not connected");this.getConnection().hangup(e)}send(e,t,r){if(s("send %s",e),!this.isConnected())throw new Error("Not connected");this.getConnection().sendMethod(e,t,r)}}t.default=o},"./lib/shared-connection.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("./node_modules/uuid/dist/esm-browser/index.js"),s=r("./node_modules/debug/src/browser.js"),o=r("./lib/errors.js"),i=s("json-rpc-ws");var a=function(e){var t;try{t=JSON.parse(e)}catch(e){i(e),t=null}return t},c=function(){i("emptycallback")};t.Connection=class{constructor(e,t){if(this.socket=e,this.parent=t,this.id=n.v4(),this.responseHandlers={},!this.socket.send)throw new Error("socket.send is not defined");i("new Connection to %s",t.type),e.on("message",this.message.bind(this)),this.once("close",this.close.bind(this)),this.once("error",this.close.bind(this))}on(e,t){this.socket.on(e,t)}once(e,t){this.socket.once(e,t)}sendRaw(e){e.jsonrpc="2.0",this.socket.send(JSON.stringify(e))}processPayload(e){var t=e.jsonrpc,r=e.id,n=e.method,s=e.params,o=e.result,a=e.error;if("2.0"!==t)return this.sendError("invalidRequest",r,{info:'jsonrpc must be exactly "2.0"'});if("string"==typeof n){var u=this.parent.getHandler(n);if(!u)return this.sendError("methodNotFound",r,{info:"no handler found for method "+n});if(null!=r&&"string"!=typeof r&&"number"!=typeof r)return this.sendError("invalidRequest",r,{info:"id, if provided, must be one of: null, string, number"});if(null!=s&&"object"!=typeof s)return this.sendError("invalidRequest",r,{info:"params, if provided, must be one of: null, object, array"});if(i("message method %s",e.method),null==r)return u.call(this,s,c);return e.stream&&(s=this.buildStream(r,s)),u.call(this,s,function(e,t){return i("handler got callback %j, %j",e,t),this.sendResult(r,e,t)}.bind(this))}if(void 0===o&&void 0===a)return this.sendError("invalidRequest",r,{info:"replies must have either a result or error"});if("string"==typeof r||"number"==typeof r){i("message id %s result %j error %j",r,o,a);var d=this.responseHandlers[r];return d?(delete this.responseHandlers[r],e.stream&&(o=this.buildStream(r,o)),d.call(this,a,o)):this.sendError("invalidRequest",r,{info:"no response handler for id "+r})}}sendResult(e,t,r,n){if(i("sendResult %s %s %j %j",e,n,t,r),t&&r)throw new Error("Cannot have both an error and a result");var s={id:e,stream:!!n||this.isStream(r)};if(r){if(s.result=r,s.stream&&this.isStream(r)){if(void 0===e)throw new Error("streams are not supported without an id");i("result is stream"),this.sendStream(e,r)}}else s.error=t;this.sendRaw(s)}sendMethod(e,t,r){var s=n.v4();if("string"!=typeof e||!e.length)throw new Error("method must be a non-empty string");if(null!=t&&!(t instanceof Object))throw new Error("params, if provided,  must be an array, object or null");i("sendMethod %s",e,s),this.responseHandlers[s]=r||c;var o={id:s,method:e};t&&(this.isStream(t)&&(o.stream=!0,this.sendStream(s,t)),o.params=t),this.sendRaw(o)}sendError(e,t,r){i("sendError %s",e),this.sendRaw(o.default(e,t,r))}close(e){i("close"),e&&1e3!==e&&i("close error %s",e.stack||e),this.parent.disconnected(this),delete this.socket}hangup(e){if(i("hangup"),!this.socket)throw new Error("Not connected");if("function"==typeof e){var t=this.socket;t.once("error",e),t.once("close",e)}this.socket.close()}message(e){var t;if(i("message %j",e),"string"!=typeof e?t=a(e.data):"string"==typeof e&&(t=a(e)),null===t)return o.default("parseError");t instanceof Array?t.forEach(this.processPayload,this):this.processPayload(t)}}},"./lib/ws/browser.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("./lib/ws/shared-client.js"),s=r("./lib/browser.js");class o{constructor(e){this.socket=e}get open(){return this.socket.readyState==WebSocket.OPEN}close(){this.socket.close()}send(e){this.socket.send(e)}on(e,t){this.socket.addEventListener(e,t)}once(e,t){this.socket.addEventListener(e,t,{once:!0})}}t.WebSocketAdapter=o;class i extends n.default{connection(e){return new s.Connection(e,this)}constructor(){super((function(e){return new o(new WebSocket(e.replace(/^http/,"ws")))}))}}t.default=i},"./lib/ws/shared-client.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r("./lib/shared-client.js"),s=r("./node_modules/debug/src/browser.js")("json-rpc-ws");class o extends n.default{constructor(e){super(e),s("new ws Client")}}t.default=o},"./node_modules/debug/src/browser.js":function(e,t,r){t.log=function(...e){return"object"==typeof console&&console.log&&console.log(...e)},t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const r="color: "+this.color;t.splice(1,0,r,"color: inherit");let n=0,s=0;t[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(n++,"%c"===e&&(s=n))}),t.splice(s,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG);return e},t.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch(e){}}(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.exports=r("./node_modules/debug/src/common.js")(t);const{formatters:n}=e.exports;n.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},"./node_modules/debug/src/common.js":function(e,t,r){e.exports=function(e){function t(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return n.colors[Math.abs(t)%n.colors.length]}function n(e){let r;function i(...e){if(!i.enabled)return;const t=i,s=Number(new Date),o=s-(r||s);t.diff=o,t.prev=r,t.curr=s,r=s,e[0]=n.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(r,s)=>{if("%%"===r)return r;a++;const o=n.formatters[s];if("function"==typeof o){const n=e[a];r=o.call(t,n),e.splice(a,1),a--}return r}),n.formatArgs.call(t,e),(t.log||n.log).apply(t,e)}return i.namespace=e,i.enabled=n.enabled(e),i.useColors=n.useColors(),i.color=t(e),i.destroy=s,i.extend=o,"function"==typeof n.init&&n.init(i),n.instances.push(i),i}function s(){const e=n.instances.indexOf(this);return-1!==e&&(n.instances.splice(e,1),!0)}function o(e,t){const r=n(this.namespace+(void 0===t?":":t)+e);return r.log=this.log,r}function i(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return n.debug=n,n.default=n,n.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},n.disable=function(){const e=[...n.names.map(i),...n.skips.map(i).map(e=>"-"+e)].join(",");return n.enable(""),e},n.enable=function(e){let t;n.save(e),n.names=[],n.skips=[];const r=("string"==typeof e?e:"").split(/[\s,]+/),s=r.length;for(t=0;t<s;t++)r[t]&&("-"===(e=r[t].replace(/\*/g,".*?"))[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")));for(t=0;t<n.instances.length;t++){const e=n.instances[t];e.enabled=n.enabled(e.namespace)}},n.enabled=function(e){if("*"===e[e.length-1])return!0;let t,r;for(t=0,r=n.skips.length;t<r;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;t<r;t++)if(n.names[t].test(e))return!0;return!1},n.humanize=r("../../node_modules/ms/index.js"),Object.keys(e).forEach(t=>{n[t]=e[t]}),n.instances=[],n.names=[],n.skips=[],n.formatters={},n.selectColor=t,n.enable(n.load()),n}},"./node_modules/uuid/dist/esm-browser/index.js":function(e,t,r){"use strict";r.r(t),r.d(t,"v1",(function(){return h})),r.d(t,"v3",(function(){return y})),r.d(t,"v4",(function(){return j})),r.d(t,"v5",(function(){return x}));var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),s=new Uint8Array(16);function o(){if(!n)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(s)}for(var i=[],a=0;a<256;++a)i[a]=(a+256).toString(16).substr(1);var c,u,d=function(e,t){var r=t||0,n=i;return[n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]]].join("")},l=0,f=0;var h=function(e,t,r){var n=t&&r||0,s=t||[],i=(e=e||{}).node||c,a=void 0!==e.clockseq?e.clockseq:u;if(null==i||null==a){var h=e.random||(e.rng||o)();null==i&&(i=c=[1|h[0],h[1],h[2],h[3],h[4],h[5]]),null==a&&(a=u=16383&(h[6]<<8|h[7]))}var p=void 0!==e.msecs?e.msecs:(new Date).getTime(),m=void 0!==e.nsecs?e.nsecs:f+1,g=p-l+(m-f)/1e4;if(g<0&&void 0===e.clockseq&&(a=a+1&16383),(g<0||p>l)&&void 0===e.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");l=p,f=m,u=a;var v=(1e4*(268435455&(p+=122192928e5))+m)%4294967296;s[n++]=v>>>24&255,s[n++]=v>>>16&255,s[n++]=v>>>8&255,s[n++]=255&v;var b=p/4294967296*1e4&268435455;s[n++]=b>>>8&255,s[n++]=255&b,s[n++]=b>>>24&15|16,s[n++]=b>>>16&255,s[n++]=a>>>8|128,s[n++]=255&a;for(var C=0;C<6;++C)s[n+C]=i[C];return t||d(s)};var p=function(e,t,r){var n=function(e,n,s,o){var i=s&&o||0;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));for(var t=new Array(e.length),r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(e)),"string"==typeof n&&(n=function(e){var t=[];return e.replace(/[a-fA-F0-9]{2}/g,(function(e){t.push(parseInt(e,16))})),t}(n)),!Array.isArray(e))throw TypeError("value must be an array of bytes");if(!Array.isArray(n)||16!==n.length)throw TypeError("namespace must be uuid string or an Array of 16 byte values");var a=r(n.concat(e));if(a[6]=15&a[6]|t,a[8]=63&a[8]|128,s)for(var c=0;c<16;++c)s[i+c]=a[c];return s||d(a)};try{n.name=e}catch(e){}return n.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",n.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",n};function m(e,t){var r=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(r>>16)<<16|65535&r}function g(e,t,r,n,s,o){return m((i=m(m(t,e),m(n,o)))<<(a=s)|i>>>32-a,r);var i,a}function v(e,t,r,n,s,o,i){return g(t&r|~t&n,e,t,s,o,i)}function b(e,t,r,n,s,o,i){return g(t&n|r&~n,e,t,s,o,i)}function C(e,t,r,n,s,o,i){return g(t^r^n,e,t,s,o,i)}function w(e,t,r,n,s,o,i){return g(r^(t|~n),e,t,s,o,i)}var y=p("v3",48,(function(e){if("string"==typeof e){var t=unescape(encodeURIComponent(e));e=new Array(t.length);for(var r=0;r<t.length;r++)e[r]=t.charCodeAt(r)}return function(e){var t,r,n,s=[],o=32*e.length;for(t=0;t<o;t+=8)r=e[t>>5]>>>t%32&255,n=parseInt("0123456789abcdef".charAt(r>>>4&15)+"0123456789abcdef".charAt(15&r),16),s.push(n);return s}(function(e,t){var r,n,s,o,i;e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;var a=1732584193,c=-271733879,u=-1732584194,d=271733878;for(r=0;r<e.length;r+=16)n=a,s=c,o=u,i=d,a=v(a,c,u,d,e[r],7,-680876936),d=v(d,a,c,u,e[r+1],12,-389564586),u=v(u,d,a,c,e[r+2],17,606105819),c=v(c,u,d,a,e[r+3],22,-1044525330),a=v(a,c,u,d,e[r+4],7,-176418897),d=v(d,a,c,u,e[r+5],12,1200080426),u=v(u,d,a,c,e[r+6],17,-1473231341),c=v(c,u,d,a,e[r+7],22,-45705983),a=v(a,c,u,d,e[r+8],7,1770035416),d=v(d,a,c,u,e[r+9],12,-1958414417),u=v(u,d,a,c,e[r+10],17,-42063),c=v(c,u,d,a,e[r+11],22,-1990404162),a=v(a,c,u,d,e[r+12],7,1804603682),d=v(d,a,c,u,e[r+13],12,-40341101),u=v(u,d,a,c,e[r+14],17,-1502002290),c=v(c,u,d,a,e[r+15],22,1236535329),a=b(a,c,u,d,e[r+1],5,-165796510),d=b(d,a,c,u,e[r+6],9,-1069501632),u=b(u,d,a,c,e[r+11],14,643717713),c=b(c,u,d,a,e[r],20,-373897302),a=b(a,c,u,d,e[r+5],5,-701558691),d=b(d,a,c,u,e[r+10],9,38016083),u=b(u,d,a,c,e[r+15],14,-660478335),c=b(c,u,d,a,e[r+4],20,-405537848),a=b(a,c,u,d,e[r+9],5,568446438),d=b(d,a,c,u,e[r+14],9,-1019803690),u=b(u,d,a,c,e[r+3],14,-187363961),c=b(c,u,d,a,e[r+8],20,1163531501),a=b(a,c,u,d,e[r+13],5,-1444681467),d=b(d,a,c,u,e[r+2],9,-51403784),u=b(u,d,a,c,e[r+7],14,1735328473),c=b(c,u,d,a,e[r+12],20,-1926607734),a=C(a,c,u,d,e[r+5],4,-378558),d=C(d,a,c,u,e[r+8],11,-2022574463),u=C(u,d,a,c,e[r+11],16,1839030562),c=C(c,u,d,a,e[r+14],23,-35309556),a=C(a,c,u,d,e[r+1],4,-1530992060),d=C(d,a,c,u,e[r+4],11,1272893353),u=C(u,d,a,c,e[r+7],16,-155497632),c=C(c,u,d,a,e[r+10],23,-1094730640),a=C(a,c,u,d,e[r+13],4,681279174),d=C(d,a,c,u,e[r],11,-358537222),u=C(u,d,a,c,e[r+3],16,-722521979),c=C(c,u,d,a,e[r+6],23,76029189),a=C(a,c,u,d,e[r+9],4,-640364487),d=C(d,a,c,u,e[r+12],11,-421815835),u=C(u,d,a,c,e[r+15],16,530742520),c=C(c,u,d,a,e[r+2],23,-995338651),a=w(a,c,u,d,e[r],6,-198630844),d=w(d,a,c,u,e[r+7],10,1126891415),u=w(u,d,a,c,e[r+14],15,-1416354905),c=w(c,u,d,a,e[r+5],21,-57434055),a=w(a,c,u,d,e[r+12],6,1700485571),d=w(d,a,c,u,e[r+3],10,-1894986606),u=w(u,d,a,c,e[r+10],15,-1051523),c=w(c,u,d,a,e[r+1],21,-2054922799),a=w(a,c,u,d,e[r+8],6,1873313359),d=w(d,a,c,u,e[r+15],10,-30611744),u=w(u,d,a,c,e[r+6],15,-1560198380),c=w(c,u,d,a,e[r+13],21,1309151649),a=w(a,c,u,d,e[r+4],6,-145523070),d=w(d,a,c,u,e[r+11],10,-1120210379),u=w(u,d,a,c,e[r+2],15,718787259),c=w(c,u,d,a,e[r+9],21,-343485551),a=m(a,n),c=m(c,s),u=m(u,o),d=m(d,i);return[a,c,u,d]}(function(e){var t,r=[];for(r[(e.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var n=8*e.length;for(t=0;t<n;t+=8)r[t>>5]|=(255&e[t/8])<<t%32;return r}(e),8*e.length))}));var j=function(e,t,r){var n=t&&r||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var s=(e=e||{}).random||(e.rng||o)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t)for(var i=0;i<16;++i)t[n+i]=s[i];return t||d(s)};function F(e,t,r,n){switch(e){case 0:return t&r^~t&n;case 1:return t^r^n;case 2:return t&r^t&n^r&n;case 3:return t^r^n}}function k(e,t){return e<<t|e>>>32-t}var x=p("v5",80,(function(e){var t=[1518500249,1859775393,2400959708,3395469782],r=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){var n=unescape(encodeURIComponent(e));e=new Array(n.length);for(var s=0;s<n.length;s++)e[s]=n.charCodeAt(s)}e.push(128);var o=e.length/4+2,i=Math.ceil(o/16),a=new Array(i);for(s=0;s<i;s++){a[s]=new Array(16);for(var c=0;c<16;c++)a[s][c]=e[64*s+4*c]<<24|e[64*s+4*c+1]<<16|e[64*s+4*c+2]<<8|e[64*s+4*c+3]}for(a[i-1][14]=8*(e.length-1)/Math.pow(2,32),a[i-1][14]=Math.floor(a[i-1][14]),a[i-1][15]=8*(e.length-1)&4294967295,s=0;s<i;s++){for(var u=new Array(80),d=0;d<16;d++)u[d]=a[s][d];for(d=16;d<80;d++)u[d]=k(u[d-3]^u[d-8]^u[d-14]^u[d-16],1);var l=r[0],f=r[1],h=r[2],p=r[3],m=r[4];for(d=0;d<80;d++){var g=Math.floor(d/20),v=k(l,5)+F(g,f,h,p)+m+t[g]+u[d]>>>0;m=p,p=h,h=k(f,30)>>>0,f=l,l=v}r[0]=r[0]+l>>>0,r[1]=r[1]+f>>>0,r[2]=r[2]+h>>>0,r[3]=r[3]+p>>>0,r[4]=r[4]+m>>>0}return[r[0]>>24&255,r[0]>>16&255,r[0]>>8&255,255&r[0],r[1]>>24&255,r[1]>>16&255,r[1]>>8&255,255&r[1],r[2]>>24&255,r[2]>>16&255,r[2]>>8&255,255&r[2],r[3]>>24&255,r[3]>>16&255,r[3]>>8&255,255&r[3],r[4]>>24&255,r[4]>>16&255,r[4]>>8&255,255&r[4]]}))},"./test/browser_test._js":function(e,t,r){"use strict";r("./node_modules/debug/src/browser.js").enable("json-rpc-ws");var n=r("./lib/browser.js").createClient();n.expose("info",(function(e,t){t(null,"browser")})),window.browserClient=n}})}));
//# sourceMappingURL=browser_test.js.map