!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@akala/json-rpc-ws"]=t():e["@akala/json-rpc-ws"]=t()}(this,(function(){return(()=>{var e={881:e=>{var t=1e3,r=60*t,n=60*r,s=24*n;function o(e,t,r,n){var s=t>=1.5*r;return Math.round(e/r)+" "+n+(s?"s":"")}e.exports=function(e,i){i=i||{};var a,c,u=typeof e;if("string"===u&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var o=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(o){var i=parseFloat(o[1]);switch((o[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*i;case"weeks":case"week":case"w":return 6048e5*i;case"days":case"day":case"d":return i*s;case"hours":case"hour":case"hrs":case"hr":case"h":return i*n;case"minutes":case"minute":case"mins":case"min":case"m":return i*r;case"seconds":case"second":case"secs":case"sec":case"s":return i*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return i;default:return}}}}(e);if("number"===u&&isFinite(e))return i.long?(a=e,(c=Math.abs(a))>=s?o(a,c,s,"day"):c>=n?o(a,c,n,"hour"):c>=r?o(a,c,r,"minute"):c>=t?o(a,c,t,"second"):a+" ms"):function(e){var o=Math.abs(e);return o>=s?Math.round(e/s)+"d":o>=n?Math.round(e/n)+"h":o>=r?Math.round(e/r)+"m":o>=t?Math.round(e/t)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},130:(e,t,r)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const r="color: "+this.color;t.splice(1,0,r,"color: inherit");let n=0,s=0;t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(n++,"%c"===e&&(s=n))})),t.splice(s,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e},t.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type&&!window.process.__nwjs)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(123)(t);const{formatters:n}=e.exports;n.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},123:(e,t,r)=>{e.exports=function(e){function t(e){let r,s=null;function o(...e){if(!o.enabled)return;const n=o,s=Number(new Date),i=s-(r||s);n.diff=i,n.prev=r,n.curr=s,r=s,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,((r,s)=>{if("%%"===r)return"%";a++;const o=t.formatters[s];if("function"==typeof o){const t=e[a];r=o.call(n,t),e.splice(a,1),a--}return r})),t.formatArgs.call(n,e),(n.log||t.log).apply(n,e)}return o.namespace=e,o.useColors=t.useColors(),o.color=t.selectColor(e),o.extend=n,o.destroy=t.destroy,Object.defineProperty(o,"enabled",{enumerable:!0,configurable:!1,get:()=>null===s?t.enabled(e):s,set:e=>{s=e}}),"function"==typeof t.init&&t.init(o),o}function n(e,r){const n=t(this.namespace+(void 0===r?":":r)+e);return n.log=this.log,n}function s(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){const e=[...t.names.map(s),...t.skips.map(s).map((e=>"-"+e))].join(",");return t.enable(""),e},t.enable=function(e){let r;t.save(e),t.names=[],t.skips=[];const n=("string"==typeof e?e:"").split(/[\s,]+/),s=n.length;for(r=0;r<s;r++)n[r]&&("-"===(e=n[r].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0;let r,n;for(r=0,n=t.skips.length;r<n;r++)if(t.skips[r].test(e))return!1;for(r=0,n=t.names.length;r<n;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(881),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((r=>{t[r]=e[r]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0;return t.colors[Math.abs(r)%t.colors.length]},t.enable(t.load()),t}},987:(e,t,r)=>{"use strict";var n;r.r(t),r.d(t,{NIL:()=>S,parse:()=>g,stringify:()=>d,v1:()=>m,v3:()=>k,v4:()=>E,v5:()=>P,validate:()=>a,version:()=>A});var s=new Uint8Array(16);function o(){if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(s)}const i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,a=function(e){return"string"==typeof e&&i.test(e)};for(var c=[],u=0;u<256;++u)c.push((u+256).toString(16).substr(1));const d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(c[e[t+0]]+c[e[t+1]]+c[e[t+2]]+c[e[t+3]]+"-"+c[e[t+4]]+c[e[t+5]]+"-"+c[e[t+6]]+c[e[t+7]]+"-"+c[e[t+8]]+c[e[t+9]]+"-"+c[e[t+10]]+c[e[t+11]]+c[e[t+12]]+c[e[t+13]]+c[e[t+14]]+c[e[t+15]]).toLowerCase();if(!a(r))throw TypeError("Stringified UUID is invalid");return r};var l,f,h=0,p=0;const m=function(e,t,r){var n=t&&r||0,s=t||new Array(16),i=(e=e||{}).node||l,a=void 0!==e.clockseq?e.clockseq:f;if(null==i||null==a){var c=e.random||(e.rng||o)();null==i&&(i=l=[1|c[0],c[1],c[2],c[3],c[4],c[5]]),null==a&&(a=f=16383&(c[6]<<8|c[7]))}var u=void 0!==e.msecs?e.msecs:Date.now(),m=void 0!==e.nsecs?e.nsecs:p+1,g=u-h+(m-p)/1e4;if(g<0&&void 0===e.clockseq&&(a=a+1&16383),(g<0||u>h)&&void 0===e.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");h=u,p=m,f=a;var y=(1e4*(268435455&(u+=122192928e5))+m)%4294967296;s[n++]=y>>>24&255,s[n++]=y>>>16&255,s[n++]=y>>>8&255,s[n++]=255&y;var C=u/4294967296*1e4&268435455;s[n++]=C>>>8&255,s[n++]=255&C,s[n++]=C>>>24&15|16,s[n++]=C>>>16&255,s[n++]=a>>>8|128,s[n++]=255&a;for(var v=0;v<6;++v)s[n+v]=i[v];return t||d(s)},g=function(e){if(!a(e))throw TypeError("Invalid UUID");var t,r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=255&t,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=255&t,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=255&t,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=255&t,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=255&t,r};function y(e,t,r){function n(e,n,s,o){if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));for(var t=[],r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}(e)),"string"==typeof n&&(n=g(n)),16!==n.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var i=new Uint8Array(16+e.length);if(i.set(n),i.set(e,n.length),(i=r(i))[6]=15&i[6]|t,i[8]=63&i[8]|128,s){o=o||0;for(var a=0;a<16;++a)s[o+a]=i[a];return s}return d(i)}try{n.name=e}catch(e){}return n.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",n.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",n}function C(e){return 14+(e+64>>>9<<4)+1}function v(e,t){var r=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(r>>16)<<16|65535&r}function w(e,t,r,n,s,o){return v((i=v(v(t,e),v(n,o)))<<(a=s)|i>>>32-a,r);var i,a}function b(e,t,r,n,s,o,i){return w(t&r|~t&n,e,t,s,o,i)}function F(e,t,r,n,s,o,i){return w(t&n|r&~n,e,t,s,o,i)}function j(e,t,r,n,s,o,i){return w(t^r^n,e,t,s,o,i)}function _(e,t,r,n,s,o,i){return w(r^(t|~n),e,t,s,o,i)}const k=y("v3",48,(function(e){if("string"==typeof e){var t=unescape(encodeURIComponent(e));e=new Uint8Array(t.length);for(var r=0;r<t.length;++r)e[r]=t.charCodeAt(r)}return function(e){for(var t=[],r=32*e.length,n="0123456789abcdef",s=0;s<r;s+=8){var o=e[s>>5]>>>s%32&255,i=parseInt(n.charAt(o>>>4&15)+n.charAt(15&o),16);t.push(i)}return t}(function(e,t){e[t>>5]|=128<<t%32,e[C(t)-1]=t;for(var r=1732584193,n=-271733879,s=-1732584194,o=271733878,i=0;i<e.length;i+=16){var a=r,c=n,u=s,d=o;r=b(r,n,s,o,e[i],7,-680876936),o=b(o,r,n,s,e[i+1],12,-389564586),s=b(s,o,r,n,e[i+2],17,606105819),n=b(n,s,o,r,e[i+3],22,-1044525330),r=b(r,n,s,o,e[i+4],7,-176418897),o=b(o,r,n,s,e[i+5],12,1200080426),s=b(s,o,r,n,e[i+6],17,-1473231341),n=b(n,s,o,r,e[i+7],22,-45705983),r=b(r,n,s,o,e[i+8],7,1770035416),o=b(o,r,n,s,e[i+9],12,-1958414417),s=b(s,o,r,n,e[i+10],17,-42063),n=b(n,s,o,r,e[i+11],22,-1990404162),r=b(r,n,s,o,e[i+12],7,1804603682),o=b(o,r,n,s,e[i+13],12,-40341101),s=b(s,o,r,n,e[i+14],17,-1502002290),r=F(r,n=b(n,s,o,r,e[i+15],22,1236535329),s,o,e[i+1],5,-165796510),o=F(o,r,n,s,e[i+6],9,-1069501632),s=F(s,o,r,n,e[i+11],14,643717713),n=F(n,s,o,r,e[i],20,-373897302),r=F(r,n,s,o,e[i+5],5,-701558691),o=F(o,r,n,s,e[i+10],9,38016083),s=F(s,o,r,n,e[i+15],14,-660478335),n=F(n,s,o,r,e[i+4],20,-405537848),r=F(r,n,s,o,e[i+9],5,568446438),o=F(o,r,n,s,e[i+14],9,-1019803690),s=F(s,o,r,n,e[i+3],14,-187363961),n=F(n,s,o,r,e[i+8],20,1163531501),r=F(r,n,s,o,e[i+13],5,-1444681467),o=F(o,r,n,s,e[i+2],9,-51403784),s=F(s,o,r,n,e[i+7],14,1735328473),r=j(r,n=F(n,s,o,r,e[i+12],20,-1926607734),s,o,e[i+5],4,-378558),o=j(o,r,n,s,e[i+8],11,-2022574463),s=j(s,o,r,n,e[i+11],16,1839030562),n=j(n,s,o,r,e[i+14],23,-35309556),r=j(r,n,s,o,e[i+1],4,-1530992060),o=j(o,r,n,s,e[i+4],11,1272893353),s=j(s,o,r,n,e[i+7],16,-155497632),n=j(n,s,o,r,e[i+10],23,-1094730640),r=j(r,n,s,o,e[i+13],4,681279174),o=j(o,r,n,s,e[i],11,-358537222),s=j(s,o,r,n,e[i+3],16,-722521979),n=j(n,s,o,r,e[i+6],23,76029189),r=j(r,n,s,o,e[i+9],4,-640364487),o=j(o,r,n,s,e[i+12],11,-421815835),s=j(s,o,r,n,e[i+15],16,530742520),r=_(r,n=j(n,s,o,r,e[i+2],23,-995338651),s,o,e[i],6,-198630844),o=_(o,r,n,s,e[i+7],10,1126891415),s=_(s,o,r,n,e[i+14],15,-1416354905),n=_(n,s,o,r,e[i+5],21,-57434055),r=_(r,n,s,o,e[i+12],6,1700485571),o=_(o,r,n,s,e[i+3],10,-1894986606),s=_(s,o,r,n,e[i+10],15,-1051523),n=_(n,s,o,r,e[i+1],21,-2054922799),r=_(r,n,s,o,e[i+8],6,1873313359),o=_(o,r,n,s,e[i+15],10,-30611744),s=_(s,o,r,n,e[i+6],15,-1560198380),n=_(n,s,o,r,e[i+13],21,1309151649),r=_(r,n,s,o,e[i+4],6,-145523070),o=_(o,r,n,s,e[i+11],10,-1120210379),s=_(s,o,r,n,e[i+2],15,718787259),n=_(n,s,o,r,e[i+9],21,-343485551),r=v(r,a),n=v(n,c),s=v(s,u),o=v(o,d)}return[r,n,s,o]}(function(e){if(0===e.length)return[];for(var t=8*e.length,r=new Uint32Array(C(t)),n=0;n<t;n+=8)r[n>>5]|=(255&e[n/8])<<n%32;return r}(e),8*e.length))})),E=function(e,t,r){var n=(e=e||{}).random||(e.rng||o)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(var s=0;s<16;++s)t[r+s]=n[s];return t}return d(n)};function x(e,t,r,n){switch(e){case 0:return t&r^~t&n;case 1:return t^r^n;case 2:return t&r^t&n^r&n;case 3:return t^r^n}}function O(e,t){return e<<t|e>>>32-t}const P=y("v5",80,(function(e){var t=[1518500249,1859775393,2400959708,3395469782],r=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){var n=unescape(encodeURIComponent(e));e=[];for(var s=0;s<n.length;++s)e.push(n.charCodeAt(s))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);for(var o=e.length/4+2,i=Math.ceil(o/16),a=new Array(i),c=0;c<i;++c){for(var u=new Uint32Array(16),d=0;d<16;++d)u[d]=e[64*c+4*d]<<24|e[64*c+4*d+1]<<16|e[64*c+4*d+2]<<8|e[64*c+4*d+3];a[c]=u}a[i-1][14]=8*(e.length-1)/Math.pow(2,32),a[i-1][14]=Math.floor(a[i-1][14]),a[i-1][15]=8*(e.length-1)&4294967295;for(var l=0;l<i;++l){for(var f=new Uint32Array(80),h=0;h<16;++h)f[h]=a[l][h];for(var p=16;p<80;++p)f[p]=O(f[p-3]^f[p-8]^f[p-14]^f[p-16],1);for(var m=r[0],g=r[1],y=r[2],C=r[3],v=r[4],w=0;w<80;++w){var b=Math.floor(w/20),F=O(m,5)+x(b,g,y,C)+v+t[b]+f[w]>>>0;v=C,C=y,y=O(g,30)>>>0,g=m,m=F}r[0]=r[0]+m>>>0,r[1]=r[1]+g>>>0,r[2]=r[2]+y>>>0,r[3]=r[3]+C>>>0,r[4]=r[4]+v>>>0}return[r[0]>>24&255,r[0]>>16&255,r[0]>>8&255,255&r[0],r[1]>>24&255,r[1]>>16&255,r[1]>>8&255,255&r[1],r[2]>>24&255,r[2]>>16&255,r[2]>>8&255,255&r[2],r[3]>>24&255,r[3]>>16&255,r[3]>>8&255,255&r[3],r[4]>>24&255,r[4]>>16&255,r[4]>>8&255,255&r[4]]})),S="00000000-0000-0000-0000-000000000000",A=function(e){if(!a(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)}},410:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Base=void 0;const s=n(r(130)),o=r(987),i=s.default("json-rpc-ws");t.Base=class{constructor(e){this.type=e,this.id=o.v4(),this.browser=!1,this.requestHandlers={},this.connections={}}expose(e,t){if(i("registering handler for %s",e),this.requestHandlers[e])throw Error("cannot expose handler, already exists "+e);this.requestHandlers[e]=t}connected(e){const t=this.connection(e);i("%s connected with id %s",this.type,t.id),this.connections[t.id]=t}disconnected(e){i("disconnected"),delete this.connections[e.id]}hasHandler(e){return void 0!==this.requestHandlers[e]}getHandler(e){return this.requestHandlers[e]}getConnection(e){return this.connections[e]}hangup(){i("hangup"),Object.keys(this.connections).forEach((function(e){this.connections[e].close(),delete this.connections[e]}),this)}}},693:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return s(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Connection=t.Deferred=t.BaseConnection=t.Errors=t.Client=t.ws=void 0;const a=r(232);Object.defineProperty(t,"BaseConnection",{enumerable:!0,get:function(){return a.Connection}}),Object.defineProperty(t,"Deferred",{enumerable:!0,get:function(){return a.Deferred}});const c=i(r(23));Object.defineProperty(t,"Client",{enumerable:!0,get:function(){return c.default}});const u=i(r(636));Object.defineProperty(t,"Errors",{enumerable:!0,get:function(){return u.default}});const d=i(r(130)).default("json-rpc-ws"),l=o(r(433));t.ws=l;class f{constructor(e){this.stream=e,this.closed=new a.Deferred}emitError(e){return this.next||(this.next=new a.Deferred),this.next.reject(e),this.next}push(...e){if(0==e.length)return;const t=e.reduce(((e,t)=>e+(null===t?0:t.byteLength-t.byteOffset)),0);if(0===t)return this.next||(this.next=new a.Deferred),this.next.resolve({done:!0});const r=new Uint8Array(t);let n,s=0;for(n of e){if(null===n)break;for(let e=n.byteOffset;e<n.byteLength;e++)r[s++]=n[e]}this.next||(this.next=new a.Deferred),this.next.resolve({value:r,done:!1}),null===n&&(this.next=new a.Deferred,this.next.resolve({done:!0}),this.closed.resolve())}cancel(e){return this.next?this.next.then((()=>Promise.reject(e))):Promise.reject(e)}read(){return this.next||(this.next=new a.Deferred),this.next.finally((()=>this.next=void 0)),this.next}releaseLock(){this.stream.reader===this&&(this.stream.reader=void 0)}}class h{constructor(){this.buffer=[]}get reader(){return this._reader}set reader(e){this._reader=e,e&&this.buffer.length&&e.push(...this.buffer)}get locked(){return!!this.reader&&!this.target}cancel(e){return this.reader?this.reader.cancel(e):this.target?this.target.abort(e):Promise.resolve()}emitError(e){return this.reader?this.reader.emitError(e):this.target?this.target.abort(e):void 0}push(e){this.reader?this.reader.push(e):this.buffer.push(e)}getReader(){if(this.locked)throw new Error("stream is already locked");return this.reader=new f(this)}pipeThrough({writable:e,readable:t},r){return this.pipeTo(e,r),t}async pipeTo(e,t){this.target=e;const r=e.getWriter();let n;for(;void 0!==(n=this.buffer.shift());)n&&await r.write(n),null===n&&t&&t.preventClose&&await r.close()}tee(){throw new Error("Method not implemented.")}}class p extends a.Connection{constructor(e,t){super(e,t)}async sendStream(e,t){const r=t.getReader(),n=await r.read();!n.done&&this.socket.open?this.sendRaw({id:e,result:{event:"data",isBuffer:!0,data:{type:"Buffer",data:n.value}}}):this.socket.open?this.sendRaw({id:e,result:{event:"end"},stream:!1}):d("socket was closed before end of stream")}isStream(e){return void 0!==e&&!!e&&"function"==typeof e.getReader}buildStream(e,t){const r=new h,n=t;Object.getOwnPropertyNames(n).forEach((function(e){if(null==Object.getOwnPropertyDescriptor(t,e)){const r=Object.getOwnPropertyDescriptor(n,e);r&&Object.defineProperty(t,e,r)}}));const s=this.responseHandlers[e]=(t,n)=>{if(t)r.emitError(t);else switch(n.event){case"data":n.data&&r.push(Uint8Array.from(n.data.data)),this.responseHandlers[e]=s;break;case"end":r.push(null)}};return r}}t.Connection=p},636:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Errors=void 0;const s=n(r(130)).default("json-rpc-ws");class o{constructor(){this.parseError={code:-32700,message:"Parse error"},this.invalidRequest={code:-32600,message:"Invalid Request"},this.methodNotFound={code:-32601,message:"Method not found"},this.invalidParams={code:-32602,message:"Invalid params"},this.internalError={code:-32603,message:"Internal error"},this.serverError={code:-32e3,message:"Server error"}}}t.Errors=o;const i=new o;t.default=function(e,t,r){if(i[e])throw new Error("Invalid error type "+e);const n={error:i[e]};return"string"!=typeof t&&"number"!=typeof t||(n.id=t),void 0!==r&&(n.error.data=r),s("error %j",n),n}},23:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(410),o=n(r(130)).default("json-rpc-ws");class i extends s.Base{constructor(e){super("client"),this.socketConstructor=e,o("new Client")}connect(e,t){if(o("Client connect %s",e),!this.isConnected())throw new Error("Already connected");let r=!1;const n=this.socket=this.socketConstructor(e);n.once("open",(()=>{this.connected(n),r=!0,t&&t.call(this)})),t&&this.socket.once("error",(function(e){r||t.call(self,e)}))}isConnected(){return 0!==Object.keys(this.connections).length}getConnection(){const e=Object.keys(this.connections);return this.connections[e[0]]}disconnect(){if(this.isConnected())throw new Error("Not connected");return this.getConnection().hangup()}send(e,t,r){if(o("send %s",e),!this.isConnected())throw new Error("Not connected");this.getConnection().sendMethod(e,t,r)}}t.default=i},232:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Connection=t.Deferred=void 0;const s=r(987),o=n(r(130)),i=n(r(636)),a=o.default("json-rpc-ws");class c{constructor(){let e,t;this.promise=new Promise(((r,n)=>{e=r,t=n})),this._resolve=e,this._reject=t}resolve(e){if(void 0===this._resolve)throw new Error("Not Implemented");this._resolve(e)}reject(e){if(void 0===this._reject)throw new Error("Not Implemented");this._reject(e)}then(e,t){return this.promise.then(e,t)}catch(e){return this.promise.catch(e)}finally(e){return this.promise.finally(e)}get[Symbol.toStringTag](){return this.promise[Symbol.toStringTag]}}t.Deferred=c;const u=function(e){let t;try{t=JSON.parse(e)}catch(e){a(e),t=null}return t},d=function(){a("emptycallback")};t.Connection=class{constructor(e,t){if(this.socket=e,this.parent=t,this.id=s.v4(),this.responseHandlers={},!this.socket.send)throw new Error("socket.send is not defined");a("new Connection to %s",t.type),e.on("message",this.message.bind(this)),this.once("close",this.close.bind(this)),this.once("error",this.close.bind(this))}on(e,t){this.socket.on(e,t)}once(e,t){this.socket.once(e,t)}sendRaw(e){e.jsonrpc="2.0",this.socket.send(JSON.stringify(e))}processPayload(e){const t=e.jsonrpc,r=e.id,n=e.method;let s=e.params,o=e.result;const i=e.error;if("2.0"!==t)return this.sendError("invalidRequest",r,{info:'jsonrpc must be exactly "2.0"'});if("string"==typeof n){const t=this.parent.getHandler(n);if(!t)return this.sendError("methodNotFound",r,{info:"no handler found for method "+n});if(null!=r&&"string"!=typeof r&&"number"!=typeof r)return this.sendError("invalidRequest",r,{info:"id, if provided, must be one of: null, string, number"});if(null!=s&&"object"!=typeof s)return this.sendError("invalidRequest",r,{info:"params, if provided, must be one of: null, object, array"});if(a("message method %s",e.method),null==r)return t.call(this,s,d);const o=function(e,t){a("handler got callback %j, %j",e,t),void 0!==this.socket?this.sendResult(r,e,t):console.error("no socket to reply to")};return e.stream&&(s=this.buildStream(r,s)),t.call(this,s,o.bind(this))}if(void 0===o&&void 0===i)return this.sendError("invalidRequest",r,{info:"replies must have either a result or error"});if("string"==typeof r||"number"==typeof r){a("message id %s result %j error %j",r,o,i);const t=this.responseHandlers[r];return t?(delete this.responseHandlers[r],e.stream&&(o=this.buildStream(r,o)),t.call(this,i,o)):this.sendError("invalidRequest",r,{info:"no response handler for id "+r})}}sendResult(e,t,r,n){if(a("sendResult %s %s %j %j",e,n,t,r),t&&r)throw new Error("Cannot have both an error and a result");const s={id:e,stream:!!n||this.isStream(r)};if(r){let t;if("object"!=typeof r||Array.isArray(r)?t=r:(t={},Object.getOwnPropertyNames(r).forEach((e=>{"_"!=e[0]&&Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))),s.result=t,s.stream){if(void 0===e)throw new Error("streams are not supported without an id");a("result is stream"),this.sendStream(e,r)}}else s.error=t;this.sendRaw(s)}sendMethod(e,t,r){const n=s.v4();if("string"!=typeof e||!e.length)throw new Error("method must be a non-empty string");if(null!=t&&!(t instanceof Object))throw new Error("params, if provided,  must be an array, object or null");a("sendMethod %s",e,n),this.responseHandlers[n]=r||d;const o={id:n,method:e};t&&(this.isStream(t)&&(o.stream=!0,this.sendStream(n,t)),o.params=t),this.sendRaw(o)}sendError(e,t,r){a("sendError %s",e),this.sendRaw(i.default(e,t,r))}close(e){a("close"),e&&1e3!==e&&a("close error %s",e.stack||e),this.parent.disconnected(this),delete this.socket}hangup(){if(a("hangup"),!this.socket)throw new Error("Not connected");return new Promise(((e,t)=>{const r=this.socket;r.once("error",t),r.once("close",e),this.socket.close()}))}message(e){let t;if(a("message %j",e),"string"!=typeof e?t=u(e.data):"string"==typeof e&&(t=u(e)),null===t)return console.error(e),i.default("parseError");t instanceof Array?t.forEach(this.processPayload,this):this.processPayload(t)}}},433:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.connect=t.createClient=t.WebSocketAdapter=void 0;const s=n(r(798)),o=r(693);class i{constructor(e){this.socket=e}get open(){return this.socket.readyState==WebSocket.OPEN}close(){this.socket.close()}send(e){this.socket.send(e)}on(e,t){this.socket.addEventListener(e,t)}once(e,t){this.socket.addEventListener(e,t,{once:!0})}}t.WebSocketAdapter=i;class a extends s.default{connection(e){return new o.Connection(e,this)}constructor(){super(a.connect)}static connect(e){return new i(new WebSocket(e.replace(/^http/,"ws")))}}t.default=a;const c=n(r(130)).default("json-rpc-ws");t.createClient=function(){return c("create ws client"),new a},t.connect=a.connect},798:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(23)),o=n(r(130)).default("json-rpc-ws");class i extends s.default{constructor(e){super(e),o("new ws Client")}}t.default=i}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}return r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(693)})()}));
//# sourceMappingURL=browser.js.map