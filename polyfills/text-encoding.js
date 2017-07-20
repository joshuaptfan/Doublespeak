// Unlicensed by Joshua Bell
// https://github.com/inexorabletash/text-encoding

!function(n){"use strict"
function e(n,e,r){return n>=e&&r>=n}function r(n,e){return-1!==n.indexOf(e)}function i(n){if(void 0===n)return{}
if(n===Object(n))return n
throw TypeError("Could not convert argument to dictionary")}function t(n){for(var e=n+"",r=e.length,i=0,t=[];r>i;){var o=e.charCodeAt(i)
if(55296>o||o>57343)t.push(o)
else if(o>=56320&&57343>=o)t.push(65533)
else if(o>=55296&&56319>=o)if(i===r-1)t.push(65533)
else{var a=e.charCodeAt(i+1)
if(a>=56320&&57343>=a){var s=1023&o,u=1023&a
t.push(65536+(s<<10)+u),i+=1}else t.push(65533)}i+=1}return t}function o(n){for(var e="",r=0;r<n.length;++r){var i=n[r]
65535>=i?e+=String.fromCharCode(i):(i-=65536,e+=String.fromCharCode((i>>10)+55296,(1023&i)+56320))}return e}function a(n){return n>=0&&127>=n}function s(n){this.tokens=[].slice.call(n),this.tokens.reverse()}function u(n,e){if(n)throw TypeError("Decoder error")
return e||65533}function l(n){throw TypeError("The code point "+n+" could not be encoded.")}function c(){}function f(){}function d(n){return n=(n+"").trim().toLowerCase(),Object.prototype.hasOwnProperty.call(V,n)?V[n]:null}function h(n,e){return e?e[n]||null:null}function p(n,e){var r=e.indexOf(n)
return-1===r?null:r}function g(e){if(!("encoding-indexes"in n))throw Error("Indexes missing. Did you forget to include encoding-indexes.js first?")
return n["encoding-indexes"][e]}function m(n){if(n>39419&&189e3>n||n>1237575)return null
if(7457===n)return 59335
var e,r=0,i=0,t=g("gb18030-ranges")
for(e=0;e<t.length;++e){var o=t[e]
if(!(o[0]<=n))break
r=o[0],i=o[1]}return i+n-r}function b(n){if(59335===n)return 7457
var e,r=0,i=0,t=g("gb18030-ranges")
for(e=0;e<t.length;++e){var o=t[e]
if(!(o[1]<=n))break
r=o[1],i=o[0]}return i+n-r}function _(n){W=W||g("jis0208").map(function(n,r){return e(r,8272,8835)?null:n})
var r=W
return r.indexOf(n)}function w(n){X=X||g("big5").map(function(n,e){return 5024>e?null:n})
var e=X
return 9552===n||9566===n||9569===n||9578===n||21313===n||21317===n?e.lastIndexOf(n):p(n,e)}function v(n,e){if(!(this instanceof v))throw TypeError("Called as a function. Did you forget 'new'?")
n=void 0!==n?n+"":$,e=i(e),this._encoding=null,this._decoder=null,this._ignoreBOM=!1,this._BOMseen=!1,this._error_mode="replacement",this._do_not_flush=!1
var r=d(n)
if(null===r||"replacement"===r.name)throw RangeError("Unknown encoding: "+n)
if(!Z[r.name])throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?")
var t=this
return t._encoding=r,!e.fatal||(t._error_mode="fatal"),!e.ignoreBOM||(t._ignoreBOM=!0),Object.defineProperty||(this.encoding=t._encoding.name.toLowerCase(),this.fatal="fatal"===t._error_mode,this.ignoreBOM=t._ignoreBOM),t}function y(e,r){if(!(this instanceof y))throw TypeError("Called as a function. Did you forget 'new'?")
r=i(r),this._encoding=null,this._encoder=null,this._do_not_flush=!1,this._fatal=!r.fatal?"replacement":"fatal"
var t=this
if(!r.NONSTANDARD_allowLegacyEncoding)t._encoding=d("utf-8"),void 0!==e&&"console"in n&&console.warn("TextEncoder constructor called with encoding label, which is ignored.")
else{e=void 0!==e?e+"":$
var o=d(e)
if(null===o||"replacement"===o.name)throw RangeError("Unknown encoding: "+e)
if(!Y[o.name])throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?")
t._encoding=o}return Object.defineProperty||(this.encoding=t._encoding.name.toLowerCase()),t}function I(n){var r=n.fatal,i=0,t=0,o=0,a=128,s=191
this.handler=function(n,l){if(l===z&&0!==o)return o=0,u(r)
if(l===z)return H
if(0===o){if(e(l,0,127))return l
if(e(l,194,223))o=1,i=31&l
else if(e(l,224,239))224===l&&(a=160),237===l&&(s=159),o=2,i=15&l
else{if(!e(l,240,244))return u(r)
240===l&&(a=144),244===l&&(s=143),o=3,i=7&l}return null}if(!e(l,a,s))return i=o=t=0,a=128,s=191,n.prepend(l),u(r)
if(a=128,s=191,i=i<<6|63&l,t+=1,t!==o)return null
var c=i
return i=o=t=0,c}}function x(n){n.fatal
this.handler=function(n,r){if(r===z)return H
if(q(r))return r
var i,t
e(r,128,2047)?(i=1,t=192):e(r,2048,65535)?(i=2,t=224):e(r,65536,1114111)&&(i=3,t=240)
for(var o=[(r>>6*i)+t];i>0;){var a=r>>6*(i-1)
o.push(128|63&a),i-=1}return o}}function k(n,e){var r=e.fatal
this.handler=function(e,i){if(i===z)return H
if(a(i))return i
var t=n[i-128]
return null===t?u(r):t}}function O(n,e){e.fatal
this.handler=function(e,r){if(r===z)return H
if(q(r))return r
var i=p(r,n)
return null===i&&l(r),i+128}}function E(n){var r=n.fatal,i=0,t=0,o=0
this.handler=function(n,s){if(s===z&&0===i&&0===t&&0===o)return H
s!==z||0===i&&0===t&&0===o||(i=0,t=0,o=0,u(r))
var l
if(0!==o){l=null,e(s,48,57)&&(l=m(10*(126*(10*(i-129)+t-48)+o-129)+s-48))
var c=[t,o,s]
return i=0,t=0,o=0,null===l?(n.prepend(c),u(r)):l}if(0!==t)return e(s,129,254)?(o=s,null):(n.prepend([t,s]),i=0,t=0,u(r))
if(0!==i){if(e(s,48,57))return t=s,null
var f=i,d=null
i=0
var p=127>s?64:65
return(e(s,64,126)||e(s,128,254))&&(d=190*(f-129)+(s-p)),l=null===d?null:h(d,g("gb18030")),null===l&&a(s)&&n.prepend(s),null===l?u(r):l}return a(s)?s:128===s?8364:e(s,129,254)?(i=s,null):u(r)}}function S(n,e){n.fatal
this.handler=function(n,r){if(r===z)return H
if(q(r))return r
if(58853===r)return l(r)
if(e&&8364===r)return 128
var i=p(r,g("gb18030"))
if(null!==i){var t=N(i/190)+129,o=i%190,a=63>o?64:65
return[t,o+a]}if(e)return l(r)
i=b(r)
var s=N(i/10/126/10)
i-=10*s*126*10
var u=N(i/10/126)
i-=10*u*126
var c=N(i/10),f=i-10*c
return[s+129,u+48,c+129,f+48]}}function j(n){var r=n.fatal,i=0
this.handler=function(n,t){if(t===z&&0!==i)return i=0,u(r)
if(t===z&&0===i)return H
if(0!==i){var o=i,s=null
i=0
var l=127>t?64:98
switch((e(t,64,126)||e(t,161,254))&&(s=157*(o-129)+(t-l)),s){case 1133:return[202,772]
case 1135:return[202,780]
case 1164:return[234,772]
case 1166:return[234,780]}var c=null===s?null:h(s,g("big5"))
return null===c&&a(t)&&n.prepend(t),null===c?u(r):c}return a(t)?t:e(t,129,254)?(i=t,null):u(r)}}function C(n){n.fatal
this.handler=function(n,e){if(e===z)return H
if(q(e))return e
var r=w(e)
if(null===r)return l(e)
var i=N(r/157)+129
if(161>i)return l(e)
var t=r%157,o=63>t?64:98
return[i,t+o]}}function A(n){var r=n.fatal,i=!1,t=0
this.handler=function(n,o){if(o===z&&0!==t)return t=0,u(r)
if(o===z&&0===t)return H
if(142===t&&e(o,161,223))return t=0,65216+o
if(143===t&&e(o,161,254))return i=!0,t=o,null
if(0!==t){var s=t
t=0
var l=null
return e(s,161,254)&&e(o,161,254)&&(l=h(94*(s-161)+(o-161),g(i?"jis0212":"jis0208"))),i=!1,e(o,161,254)||n.prepend(o),null===l?u(r):l}return a(o)?o:142===o||143===o||e(o,161,254)?(t=o,null):u(r)}}function B(n){n.fatal
this.handler=function(n,r){if(r===z)return H
if(q(r))return r
if(165===r)return 92
if(8254===r)return 126
if(e(r,65377,65439))return[142,r-65377+161]
8722===r&&(r=65293)
var i=p(r,g("jis0208"))
if(null===i)return l(r)
var t=N(i/94)+161,o=i%94+161
return[t,o]}}function T(n){var r=n.fatal,i={ASCII:0,Roman:1,Katakana:2,LeadByte:3,TrailByte:4,EscapeStart:5,Escape:6},t=i.ASCII,o=i.ASCII,a=0,s=!1
this.handler=function(n,l){switch(t){default:case i.ASCII:return 27===l?(t=i.EscapeStart,null):e(l,0,127)&&14!==l&&15!==l&&27!==l?(s=!1,l):l===z?H:(s=!1,u(r))
case i.Roman:return 27===l?(t=i.EscapeStart,null):92===l?(s=!1,165):126===l?(s=!1,8254):e(l,0,127)&&14!==l&&15!==l&&27!==l&&92!==l&&126!==l?(s=!1,l):l===z?H:(s=!1,u(r))
case i.Katakana:return 27===l?(t=i.EscapeStart,null):e(l,33,95)?(s=!1,65344+l):l===z?H:(s=!1,u(r))
case i.LeadByte:return 27===l?(t=i.EscapeStart,null):e(l,33,126)?(s=!1,a=l,t=i.TrailByte,null):l===z?H:(s=!1,u(r))
case i.TrailByte:if(27===l)return t=i.EscapeStart,u(r)
if(e(l,33,126)){t=i.LeadByte
var c=94*(a-33)+l-33,f=h(c,g("jis0208"))
return null===f?u(r):f}return l===z?(t=i.LeadByte,n.prepend(l),u(r)):(t=i.LeadByte,u(r))
case i.EscapeStart:return 36===l||40===l?(a=l,t=i.Escape,null):(n.prepend(l),s=!1,t=o,u(r))
case i.Escape:var d=a
a=0
var p=null
if(40===d&&66===l&&(p=i.ASCII),40===d&&74===l&&(p=i.Roman),40===d&&73===l&&(p=i.Katakana),36!==d||64!==l&&66!==l||(p=i.LeadByte),null!==p){t=t=p
var m=s
return s=!0,m?u(r):null}return n.prepend([d,l]),s=!1,t=o,u(r)}}}function L(n){var e=(n.fatal,{ASCII:0,Roman:1,jis0208:2}),r=e.ASCII
this.handler=function(n,i){if(i===z&&r!==e.ASCII)return n.prepend(i),r=e.ASCII,[27,40,66]
if(i===z&&r===e.ASCII)return H
if(!(r!==e.ASCII&&r!==e.Roman||14!==i&&15!==i&&27!==i))return l(65533)
if(r===e.ASCII&&q(i))return i
if(r===e.Roman&&(q(i)&&92!==i&&126!==i||165==i||8254==i)){if(q(i))return i
if(165===i)return 92
if(8254===i)return 126}if(q(i)&&r!==e.ASCII)return n.prepend(i),r=e.ASCII,[27,40,66]
if((165===i||8254===i)&&r!==e.Roman)return n.prepend(i),r=e.Roman,[27,40,74]
8722===i&&(i=65293)
var t=p(i,g("jis0208"))
if(null===t)return l(i)
if(r!==e.jis0208)return n.prepend(i),r=e.jis0208,[27,36,66]
var o=N(t/94)+33,a=t%94+33
return[o,a]}}function U(n){var r=n.fatal,i=0
this.handler=function(n,t){if(t===z&&0!==i)return i=0,u(r)
if(t===z&&0===i)return H
if(0!==i){var o=i,s=null
i=0
var l=127>t?64:65,c=160>o?129:193
if((e(t,64,126)||e(t,128,252))&&(s=188*(o-c)+t-l),e(s,8836,10715))return 48508+s
var f=null===s?null:h(s,g("jis0208"))
return null===f&&a(t)&&n.prepend(t),null===f?u(r):f}return a(t)||128===t?t:e(t,161,223)?65216+t:e(t,129,159)||e(t,224,252)?(i=t,null):u(r)}}function M(n){n.fatal
this.handler=function(n,r){if(r===z)return H
if(q(r)||128===r)return r
if(165===r)return 92
if(8254===r)return 126
if(e(r,65377,65439))return r-65377+161
8722===r&&(r=65293)
var i=_(r)
if(null===i)return l(r)
var t=N(i/188),o=31>t?129:193,a=i%188,s=63>a?64:65
return[t+o,a+s]}}function P(n){var r=n.fatal,i=0
this.handler=function(n,t){if(t===z&&0!==i)return i=0,u(r)
if(t===z&&0===i)return H
if(0!==i){var o=i,s=null
i=0,e(t,65,254)&&(s=190*(o-129)+(t-65))
var l=null===s?null:h(s,g("euc-kr"))
return null===s&&a(t)&&n.prepend(t),null===l?u(r):l}return a(t)?t:e(t,129,254)?(i=t,null):u(r)}}function R(n){n.fatal
this.handler=function(n,e){if(e===z)return H
if(q(e))return e
var r=p(e,g("euc-kr"))
if(null===r)return l(e)
var i=N(r/190)+129,t=r%190+65
return[i,t]}}function D(n,e){var r=n>>8,i=255&n
return e?[r,i]:[i,r]}function F(n,r){var i=r.fatal,t=null,o=null
this.handler=function(r,a){if(a===z&&(null!==t||null!==o))return u(i)
if(a===z&&null===t&&null===o)return H
if(null===t)return t=a,null
var s
if(s=n?(t<<8)+a:(a<<8)+t,t=null,null!==o){var l=o
return o=null,e(s,56320,57343)?65536+1024*(l-55296)+(s-56320):(r.prepend(D(s,n)),u(i))}return e(s,55296,56319)?(o=s,null):e(s,56320,57343)?u(i):s}}function K(n,r){r.fatal
this.handler=function(r,i){if(i===z)return H
if(e(i,0,65535))return D(i,n)
var t=D((i-65536>>10)+55296,n),o=D((i-65536&1023)+56320,n)
return t.concat(o)}}function J(n){n.fatal
this.handler=function(n,e){return e===z?H:a(e)?e:63360+e-128}}function G(n){n.fatal
this.handler=function(n,r){return r===z?H:q(r)?r:e(r,63360,63487)?r-63360+128:l(r)}}"undefined"!=typeof module&&module.exports&&!n["encoding-indexes"]&&(n["encoding-indexes"]=require("./encoding-indexes.js")["encoding-indexes"])
var N=Math.floor,q=a,z=-1
s.prototype={endOfStream:function(){return!this.tokens.length},read:function(){return this.tokens.length?this.tokens.pop():z},prepend:function(n){if(Array.isArray(n))for(var e=n;e.length;)this.tokens.push(e.pop())
else this.tokens.push(n)},push:function(n){if(Array.isArray(n))for(var e=n;e.length;)this.tokens.unshift(e.shift())
else this.tokens.unshift(n)}}
var H=-1
c.prototype={handler:function(n,e){}},f.prototype={handler:function(n,e){}}
var Q=[{encodings:[{labels:["unicode-1-1-utf-8","utf-8","utf8"],name:"UTF-8"}],heading:"The Encoding"},{encodings:[{labels:["866","cp866","csibm866","ibm866"],name:"IBM866"},{labels:["csisolatin2","iso-8859-2","iso-ir-101","iso8859-2","iso88592","iso_8859-2","iso_8859-2:1987","l2","latin2"],name:"ISO-8859-2"},{labels:["csisolatin3","iso-8859-3","iso-ir-109","iso8859-3","iso88593","iso_8859-3","iso_8859-3:1988","l3","latin3"],name:"ISO-8859-3"},{labels:["csisolatin4","iso-8859-4","iso-ir-110","iso8859-4","iso88594","iso_8859-4","iso_8859-4:1988","l4","latin4"],name:"ISO-8859-4"},{labels:["csisolatincyrillic","cyrillic","iso-8859-5","iso-ir-144","iso8859-5","iso88595","iso_8859-5","iso_8859-5:1988"],name:"ISO-8859-5"},{labels:["arabic","asmo-708","csiso88596e","csiso88596i","csisolatinarabic","ecma-114","iso-8859-6","iso-8859-6-e","iso-8859-6-i","iso-ir-127","iso8859-6","iso88596","iso_8859-6","iso_8859-6:1987"],name:"ISO-8859-6"},{labels:["csisolatingreek","ecma-118","elot_928","greek","greek8","iso-8859-7","iso-ir-126","iso8859-7","iso88597","iso_8859-7","iso_8859-7:1987","sun_eu_greek"],name:"ISO-8859-7"},{labels:["csiso88598e","csisolatinhebrew","hebrew","iso-8859-8","iso-8859-8-e","iso-ir-138","iso8859-8","iso88598","iso_8859-8","iso_8859-8:1988","visual"],name:"ISO-8859-8"},{labels:["csiso88598i","iso-8859-8-i","logical"],name:"ISO-8859-8-I"},{labels:["csisolatin6","iso-8859-10","iso-ir-157","iso8859-10","iso885910","l6","latin6"],name:"ISO-8859-10"},{labels:["iso-8859-13","iso8859-13","iso885913"],name:"ISO-8859-13"},{labels:["iso-8859-14","iso8859-14","iso885914"],name:"ISO-8859-14"},{labels:["csisolatin9","iso-8859-15","iso8859-15","iso885915","iso_8859-15","l9"],name:"ISO-8859-15"},{labels:["iso-8859-16"],name:"ISO-8859-16"},{labels:["cskoi8r","koi","koi8","koi8-r","koi8_r"],name:"KOI8-R"},{labels:["koi8-ru","koi8-u"],name:"KOI8-U"},{labels:["csmacintosh","mac","macintosh","x-mac-roman"],name:"macintosh"},{labels:["dos-874","iso-8859-11","iso8859-11","iso885911","tis-620","windows-874"],name:"windows-874"},{labels:["cp1250","windows-1250","x-cp1250"],name:"windows-1250"},{labels:["cp1251","windows-1251","x-cp1251"],name:"windows-1251"},{labels:["ansi_x3.4-1968","ascii","cp1252","cp819","csisolatin1","ibm819","iso-8859-1","iso-ir-100","iso8859-1","iso88591","iso_8859-1","iso_8859-1:1987","l1","latin1","us-ascii","windows-1252","x-cp1252"],name:"windows-1252"},{labels:["cp1253","windows-1253","x-cp1253"],name:"windows-1253"},{labels:["cp1254","csisolatin5","iso-8859-9","iso-ir-148","iso8859-9","iso88599","iso_8859-9","iso_8859-9:1989","l5","latin5","windows-1254","x-cp1254"],name:"windows-1254"},{labels:["cp1255","windows-1255","x-cp1255"],name:"windows-1255"},{labels:["cp1256","windows-1256","x-cp1256"],name:"windows-1256"},{labels:["cp1257","windows-1257","x-cp1257"],name:"windows-1257"},{labels:["cp1258","windows-1258","x-cp1258"],name:"windows-1258"},{labels:["x-mac-cyrillic","x-mac-ukrainian"],name:"x-mac-cyrillic"}],heading:"Legacy single-byte encodings"},{encodings:[{labels:["chinese","csgb2312","csiso58gb231280","gb2312","gb_2312","gb_2312-80","gbk","iso-ir-58","x-gbk"],name:"GBK"},{labels:["gb18030"],name:"gb18030"}],heading:"Legacy multi-byte Chinese (simplified) encodings"},{encodings:[{labels:["big5","big5-hkscs","cn-big5","csbig5","x-x-big5"],name:"Big5"}],heading:"Legacy multi-byte Chinese (traditional) encodings"},{encodings:[{labels:["cseucpkdfmtjapanese","euc-jp","x-euc-jp"],name:"EUC-JP"},{labels:["csiso2022jp","iso-2022-jp"],name:"ISO-2022-JP"},{labels:["csshiftjis","ms932","ms_kanji","shift-jis","shift_jis","sjis","windows-31j","x-sjis"],name:"Shift_JIS"}],heading:"Legacy multi-byte Japanese encodings"},{encodings:[{labels:["cseuckr","csksc56011987","euc-kr","iso-ir-149","korean","ks_c_5601-1987","ks_c_5601-1989","ksc5601","ksc_5601","windows-949"],name:"EUC-KR"}],heading:"Legacy multi-byte Korean encodings"},{encodings:[{labels:["csiso2022kr","hz-gb-2312","iso-2022-cn","iso-2022-cn-ext","iso-2022-kr"],name:"replacement"},{labels:["utf-16be"],name:"UTF-16BE"},{labels:["utf-16","utf-16le"],name:"UTF-16LE"},{labels:["x-user-defined"],name:"x-user-defined"}],heading:"Legacy miscellaneous encodings"}],V={}
Q.forEach(function(n){n.encodings.forEach(function(n){n.labels.forEach(function(e){V[e]=n})})})
var W,X,Y={},Z={},$="utf-8"
Object.defineProperty&&(Object.defineProperty(v.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}}),Object.defineProperty(v.prototype,"fatal",{get:function(){return"fatal"===this._error_mode}}),Object.defineProperty(v.prototype,"ignoreBOM",{get:function(){return this._ignoreBOM}})),v.prototype.decode=function(n,e){function t(n){return!r(["UTF-8","UTF-16LE","UTF-16BE"],this._encoding.name)||this._ignoreBOM||this._BOMseen||(n.length>0&&65279===n[0]?(this._BOMseen=!0,n.shift()):n.length>0&&(this._BOMseen=!0)),o(n)}var a
a="object"==typeof n&&n instanceof ArrayBuffer?new Uint8Array(n):"object"==typeof n&&"buffer"in n&&n.buffer instanceof ArrayBuffer?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(0),e=i(e),this._do_not_flush||(this._decoder=Z[this._encoding.name]({fatal:"fatal"===this._error_mode}),this._BOMseen=!1),this._do_not_flush=!!e.stream
for(var u,l=new s(a),c=[];;){var f=l.read()
if(f===z)break
if(u=this._decoder.handler(l,f),u===H)break
null!==u&&(Array.isArray(u)?c.push.apply(c,u):c.push(u))}if(!this._do_not_flush){do{if(u=this._decoder.handler(l,l.read()),u===H)break
null!==u&&(Array.isArray(u)?c.push.apply(c,u):c.push(u))}while(!l.endOfStream())
this._decoder=null}return t.call(this,c)},Object.defineProperty&&Object.defineProperty(y.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}}),y.prototype.encode=function(n,e){n=void 0===n?"":n+"",e=i(e),this._do_not_flush||(this._encoder=Y[this._encoding.name]({fatal:"fatal"===this._fatal})),this._do_not_flush=!!e.stream
for(var r,o=new s(t(n)),a=[];;){var u=o.read()
if(u===z)break
if(r=this._encoder.handler(o,u),r===H)break
Array.isArray(r)?a.push.apply(a,r):a.push(r)}if(!this._do_not_flush){for(;;){if(r=this._encoder.handler(o,o.read()),r===H)break
Array.isArray(r)?a.push.apply(a,r):a.push(r)}this._encoder=null}return new Uint8Array(a)},Y["UTF-8"]=function(n){return new x(n)},Z["UTF-8"]=function(n){return new I(n)},function(){"encoding-indexes"in n&&Q.forEach(function(n){"Legacy single-byte encodings"===n.heading&&n.encodings.forEach(function(n){var e=n.name,r=g(e.toLowerCase())
Z[e]=function(n){return new k(r,n)},Y[e]=function(n){return new O(r,n)}})})}(),Z.GBK=function(n){return new E(n)},Y.GBK=function(n){return new S(n,!0)},Y.gb18030=function(n){return new S(n)},Z.gb18030=function(n){return new E(n)},Y.Big5=function(n){return new C(n)},Z.Big5=function(n){return new j(n)},Y["EUC-JP"]=function(n){return new B(n)},Z["EUC-JP"]=function(n){return new A(n)},Y["ISO-2022-JP"]=function(n){return new L(n)},Z["ISO-2022-JP"]=function(n){return new T(n)},Y.Shift_JIS=function(n){return new M(n)},Z.Shift_JIS=function(n){return new U(n)},Y["EUC-KR"]=function(n){return new R(n)},Z["EUC-KR"]=function(n){return new P(n)},Y["UTF-16BE"]=function(n){return new K(!0,n)},Z["UTF-16BE"]=function(n){return new F(!0,n)},Y["UTF-16LE"]=function(n){return new K(!1,n)},Z["UTF-16LE"]=function(n){return new F(!1,n)},Y["x-user-defined"]=function(n){return new G(n)},Z["x-user-defined"]=function(n){return new J(n)},n.TextEncoder||(n.TextEncoder=y),n.TextDecoder||(n.TextDecoder=v),"undefined"!=typeof module&&module.exports&&(module.exports={TextEncoder:n.TextEncoder,TextDecoder:n.TextDecoder,EncodingIndexes:n["encoding-indexes"]})}(this||{})
