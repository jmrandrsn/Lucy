(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?module.exports=b():'function'==typeof define&&define.amd?define(b):a.Lucy=b()})(this,function(){'use strict';let a;const b=(...b)=>{return a(...b)};b.superMethod=(b)=>{a=b};const c=Object,d=c.keys,e=c.is,f=c.assign,g=c.getOwnPropertyDescriptor,h=c.defineProperty,i=c.getOwnPropertyNames,j=(a)=>{return d(a).length};f(b,{keys:d,is:e,assign:f,getOwnPropertyDescriptor:g,defineProperty:h,getOwnPropertyNames:i,objectSize:j});f(b,{asyncEach:async(a,b)=>{const c=a.length;for(let d=0;d<c;d++){const e=a[d];await e(b,d,c)}}});const k=(a,b)=>{const c=a.length;for(let d=0;d<c;d++)b(a[d],d,a,c)},l=(a,b)=>{const c=[];let d;return k(a,(a,e,f,g)=>{d=b(a,e,f,g,c),r(d)&&c.push(d)}),c},m=((a)=>{return(b,c)=>{const d=[];return a(b,(a,b,e,f)=>{d[b]=c(a,b,e,f,d)}),d}})(k),n=((a)=>{return(b,c)=>{const d=b.length;for(let e=0;e<d&&c(b[e],e,b,d)===a;e++);}})(!0),o=(a)=>{return`[object ${a}]`},p=function(a){return void 0===a},q=(a)=>{return null===a},r=(a)=>{return!p(a)&&!q(a)},s=(a)=>{return(b)=>{return!!r(b)&&b.toString()===a}},t=(a)=>{return(b)=>{return!!r(b)&&b.constructor===a}},u=/\.|\+/,v=Array.isArray,w=t(String),x=t(Number),y=(a)=>{return!!r(a)&&'Object('===a.constructor.toString().trim().slice(9,16)},z=(a)=>{return!!r(a)&&a instanceof Function},A=(a)=>{return!!a.length},B=(a)=>{return(b)=>{return!!r(b)&&a.test(b)}},C=B(/\.css$/),D=B(/\.json$/),E=B(/\.js$/),F=/\.([0-9a-z]+)/;k(['RegExp','Arguments','Boolean','Date','Error','Map','Object','Set','WeakMap','ArrayBuffer','Float32Array','Float64Array','Int8Array','Int16Array','Int32Array','Uint8Array','Uint8ClampedArray','Uint16Array','Uint32Array'],(a)=>{b[`is${a}`]=s(o(a))}),f(b,{isFileCSS:C,isFileJSON:D,isFileJS:E,getFileExtension:(a)=>{return a.match(F)},isEmpty:(a)=>{return w(a)||v(a)?!A(a):y(a)?!j(a):!r(a)},hasLength:A,has:(a,...b)=>{return a.includes(...b)},isFunction:z,isPlainObject:y,isUndefined:p,isNull:q,hasValue:r,isDecimal:(a)=>{return a.toString().match(u)},isString:w,isNumber:x});const G=(a)=>{return v(a)?a:[a]};f(b,{ensureArray:G});const H=(a,b=1)=>{let c=a;for(let d=0;d<b;d++)c=c.reduce((a,b)=>{return a.concat(G(b))},[]);return c};f(b,{flatten:H,flattenDeep:(a)=>{return a.reduce((a,b)=>{return a.concat(v(b)?H(b):b)},[])}});f(b,{remove:(a,b)=>{const c=G(b);return k(a,(b,d)=>{c.includes(b)&&a.splice(a,d,1)}),a}});f(b,{chunk:(a,b=1)=>{const c=[];let d=0;return a.forEach((a,e)=>{e%b||(c.push([]),e&&d++),c[d].push(a)}),c}});const I=(a)=>{return(...b)=>{return(c)=>{let d;return a(b,(a)=>{const b=r(d)?d:c;d=a(b)}),d}}},J=I(k),K=I((a,b)=>{const c=a.length;for(let d=c-1;0<=d;d--)b(a[d],d,a,c)});f(b,{flow:J,flowRight:K});f(b,{rest:(a)=>{return a.slice(1,a.length-1)}});const L=(a)=>{return a.length=0,a};f(b,{clear:L});const M=(a,b,c={})=>{return k(b,(b,d)=>{a(b,d,c)}),c};f(b,{arraySortToObject:M});f(b,{groupBy:(a,b)=>{return M((a,c,d)=>{const e=b(a);d[e]||(d[e]=[]),d[e].push(a)},a)}});f(b,{right:(a,b)=>{return a[a.length-1-b]}});f(b,{cloneArray:(a)=>{return a.splice()}});const N=Math,O=N.floor,P=N.random,Q=(a,b=0)=>{return O(P()*(a-b))+b};f(b,{add:(a,b)=>{return a+b},minus:(a,b)=>{return a-b},divide:(a,b)=>{return a/b},multiply:(a,b)=>{return a*b},remainder:(a,b)=>{return a%b},increment:(a)=>{return a+1},deduct:(a)=>{return a-1},randomArbitrary:(a,b=0)=>{return P()*(a-b)+b},randomInt:Q});f(b,{sample:(a,b=1)=>{if(1===b)return a[Q(a.length-1,0)];const c=[],d={};for(let e,f=0;f<b;)e=Q(a.length-1,0),d[e]||(c.push(c[e]),d[e]=!0,f++);return c}});f(b,{compact:(a)=>{return a.filter((a)=>{return w(a)&&!a.length?!1:a})}});f(b,{indexBy:(a,b)=>{return M((a,c,d)=>{d[a[b]]=a},a)}});const R=Array,S=R.from;f(b,{toArray:S});f(b,{shuffle:(a,b=1)=>{const c=S(a);for(let d,e,f=0;f<b;)d=Q(c.length-1,0),e=c[f],c[f]=c[d],c[d]=e,f++;return c}});f(b,{countBy:(a,b)=>{const c={};let d;return k(a,(a)=>{d=b(a),c[d]||(c[d]=0),c[d]++}),c},countKey:(a,b)=>{let c=0;return k(a,(a)=>{a[b]&&c++}),c},countNoKey:(a,b)=>{let c=0;return k(a,(a)=>{a[b]||c++}),c}});f(b,{initial:(a)=>{return a.slice(0,a.length-1)}});const T=Math.min;f(b,{smallest:(a)=>{return T(...a)}});const U=(a,b,c)=>{const d=[];for(let e=a;e<b;)d.push(e),e+=c;return d},V=(a,b,c)=>{const d=0>c?-1*c:c,e=[];for(let f=a;f<b;)e.push(f),f-=d;return e};f(b,{range:(a,b,c=1)=>{return a<b?U(a,b,c):V(a,b,c)},rangeRight:(a,b,c=1)=>{return V(b,a,c)}});f(b,{intersection:(a,...b)=>{let c;return l(a,(a)=>{if(c=!0,k(b,(b)=>{b.includes(a)||(c=!1)}),c)return a})}});f(b,{sortAlpha:(a,b)=>{let c,d;return a.sort((a,e)=>{return(c=a[b],d=e[b],c<d)?-1:c>d?1:0}),a}});f(b,{difference:(a,b)=>{return l(a,(a)=>{if(!b.includes(a))return a})}});f(b,{invoke:(a,b,c)=>{return m(a,(a)=>{return a[b](...c)})}});const W=(a,b,c=a.length)=>{return a.splice(b,c)};f(b,{drop:W,dropRight:(a,b)=>{return W(a,0,a.length-b)}});const X=(a,b)=>{let c=!1;return b.length===a.length&&n(a,(a,d)=>{return c=b[d]!==a,c}),c};f(b,{isMatchArray:X});f(b,{sortedIndex:(a,b)=>{let c=0;return k(a,(a,d)=>{b>a&&(c=d)}),0<c&&++c,c}});const Y=Math.max;f(b,{largest:(a)=>{return Y(...a)}});f(b,{sumOf:(a,b=0)=>{let c,d=b;return k(a,(a)=>{c=a,c&&(d+=+c)}),d}});const Z=async(a,b)=>{const c=a.length;for(let d=0;d<c;d++){const e=a[d];await b(e,d,c)}};f(b,{eachAsync:Z});f(b,{last:(a,b)=>{const c=a.length;return b?a.slice(c-b,c):a[c-1]}});f(b,{takeRight:(a,b)=>{return a.slice(a.length-b,b)},take:(a,b)=>{return a.slice(0,b)}});f(b,{mapAsync:async(a,b)=>{const c=[],d=a.length;for(let e=0;e<d;e++){const f=a[e];c[e]=await b(f,e,d)}}});const $=(a,b,c)=>{return c.indexOf(a)===b},_=(a,b,c)=>{return a!==c[b-1]},aa=(a,b)=>{return b?a.filter(_):a.filter($)};f(b,{unique:aa});f(b,{union:(...a)=>{const b=[];return k(a,(a)=>{k(aa(a),(a)=>{b.includes(a)&&b.push(a)})}),b}});f(b,{filterAsync:async(a,b)=>{const c=[],d=a.length;let e;for(let f=0;f<d;f++){const g=a[f];e=await b(g,f,d),r(e)&&c.push((await b(g,f,d)))}}});const ba=(c,a)=>{return c-a};f(b,{numSort:(a)=>{return a.sort(ba)}});f(b,{findDifference:(a,b)=>{const c={},d=a.length;let e,f,g;for(let h=0;h<d;h++)if(e=a[h],f=b-e,g=a.indexOf(f),-1!==g&&g!==h){c.start=e,c.end=f,c.startIndex=h,c.endIndex=g;break}return c}});f(b,{arrayToObject:(a,b)=>{return M((a,c,d)=>{d[b[c]]=a},a)}});f(b,{without:(a,...b)=>{return a.filter((a)=>{return!b.includes(a)})}});const ca=(a,b,c,d,e)=>{if(a[e]===d)return!0};f(b,{findItem:(a,b,c='id')=>{const d=a.find((d,e)=>{return ca(d,e,a,b,c)});return-1!==d&&d},findIndex:(a,b,c='id')=>{const d=a.findIndex((d,e)=>{return ca(d,e,a,b,c)});return-1!==d&&d}});f(b,{partition:(a,b)=>{const c=[];return[l(a,(a)=>{return b(a)?a:void c.push(a)}),c]}});f(b,{xor:(a)=>{const b=[];return k(a,(a)=>{k(aa(a),(a)=>{b.includes(a)?b.splice(b.indexOf(a),1):b.push(a)})}),b}});f(b,{findSum:(a,b)=>{const c={},d=a.length;let e,f,g;for(let h=0;h<d;h++)if(e=a[h],f=b-e,g=a.indexOf(f),-1!==g&&g!==h){c.start=e,c.end=f,c.startIndex=h,c.endIndex=g;break}return c}});f(b,{pluck:(a,b)=>{let c;return c=v(b)?(a)=>{return M((b,c,d)=>{d[b]=a[b]},b)}:(a)=>{const c=a[b];return c},m(a,c)}});f(b,{zip:(...a)=>{return a[0].map((b,c)=>{return a.map((a)=>{return a[c]})})},unZip:(a)=>{return a[0].map((b,c)=>{return a.map((a)=>{return a[c]})})}});f(b,{first:(a,b)=>{return b?a.slice(0,b):a[0]}});const da=(c,a)=>{return a-c};f(b,{rNumSort:(a)=>{return a.sort(da)}});const ea=(a,b,c)=>{const d=c?a:[...a];return d.sort((a,c)=>{return c[b]?a[b]?a[b]<c[b]?1:a[b]>c[b]?-1:0:1:-1})};f(b,{getNewest:(a,b)=>{return ea(a,b)[0]},sortNewest:ea});const fa=(a,b,c)=>{const d=c?a:[...a];return d.sort((a,c)=>{return c[b]?a[b]?a[b]<c[b]?1:a[b]>c[b]?-1:0:1:-1})};f(b,{getOldest:(a,b)=>{return fa(a,b)[0]},sortOldest:fa});f(b,{ary:(a,b)=>{return(...c)=>{return a(...c.splice(0,b))}}});f(b,{curry:(a)=>{const b=[],c=(...a)=>{return k(a,(a)=>{b.push(a)}),c};return c.result=()=>{const c=a(...b);return L(b),c},c},curryRight:(a)=>{const b=[],c=(...a)=>{return k(a,(a)=>{b.unshift(a)}),c};return c.result=()=>{const c=a(...b);return L(b),c},c}});const ga=(a,b)=>{let c=a;return(...a)=>{if(c--,0>c)return b(...a)}},ha=(a,b)=>{let c=a;return(...a)=>{if(c--,0<c)return b(...a)}};f(b,{onAfter:(a,b)=>{return ga(a-1,b)},onBefore:(a,b)=>{return ha(a+1,b)},once:(a)=>{let b;return(...c)=>{return b||(b=a(...c)),b}}});f(b,{stubObject:()=>{return{}},stubArray:()=>{return[]},stubString:()=>{return''},stubTrue:()=>{return!0},stubFalse:()=>{return!1},noop:()=>{}});const ia=(a,b)=>{k(d(a),(c,d,e,f)=>{b(a[c],c,a,f)})},ja=(a,b)=>{const c={};return ia(a,(a,d,e,f)=>{c[d]=b(a,d,e,f)}),c},ka=(a,b)=>{const c={};let d;return ia(a,(a,e,f,g)=>{d=b(a,e,f,g),r(d)&&(c[e]=d)}),c};f(b,{mapObject:ja,filterObject:ka,eachObject:ia,mapProperty:(a,b)=>{const c={};return k(i(a),(d,e,f)=>{c[d]=b(a[d],d,a,f,c)}),c},forIn:(a,b)=>{const c={};for(const d in a)c[d]=b(a[d],d,a,c);return c}});const la=(a,b)=>{return a.forEach(b)},ma=(a,b)=>{return(c,d)=>{let e;if(r(c))return e=v(c)?a:y(c)||z(c)?b:c.forEach?la:b,e(c,d)}},na=ma(m,ja),oa=ma(k,ia),pa=ma(l,ka);f(b,{map:na,each:oa,filter:pa});f(b,{bindAll:(a,b)=>{return na(a,(a)=>{return z(a)?a.bind(b):a})}});f(b,{ifInvoke:(a,...b)=>{if(z(a))return a(...b)}});f(b,{negate:(a)=>{return(...b)=>{return!a(...b)}}});f(b,{over:(a)=>{return(...b)=>{return a.map((a)=>{return a(...b)})}},overEvery:(a)=>{return(...b)=>{let c;return a.find(a,(a)=>{return c=!!a(...b),c}),c}}});const qa=(a,b)=>{return setTimeout(a,b)};f(b,{interval:(a,b)=>{return setInterval(a,b)},timer:qa,debounce:(a,b)=>{let c=!1;const d=(...d)=>{!1!=c&&clearTimeout(c),c=qa(()=>{a(...d),c=!1},b)};return d.clear=()=>{c&&(clearTimeout(c),c=!1)},d},throttle:(a,b)=>{let c,d=!1;const e=(...e)=>{return d?void(c=!0):void(a(...e),d=qa(()=>{c&&a(...e),d=!1},b))};return e.clear=()=>{clearTimeout(d),d=!1},e}});const ra=(a,b)=>{return oa(b,(b,c)=>{a.methods[c]=(...c)=>{return c.unshift(a.value),b(...c),a.methods}}),a};f(b,{chain:(a)=>{const b=(a)=>{return b.value=a,b.methods};return f(b,{methods:{},link(a){return ra(b,a)},done(){const a=b.value;return b.value=null,a}}),b.link(a),b}});f(b,{inAsync:async(a,b)=>{await Z(a,async(a)=>{await a(b)})},inSync:(a,b)=>{return oa(a,(a)=>{a(b)})}});f(b,{nthArg:(a)=>{let b=a;return(...a)=>{return 0>b&&(b=a.length- -1*b),a[b]}}});f(b,{reArg:(a,b)=>{return(...c)=>{return a(...b.map((a)=>{return c[a]}))}}});f(b,{wrap:(...a)=>{const b=[],c=(...a)=>{return b.map((b)=>{return b(...a)})};return f(c,{list:b,add(...a){b.push(...a)}}),c.add(a),c},wrapBefore:(...a)=>{const b=[],c=(...a)=>{return b.map((b)=>{return b(...a)})};return f(c,{list:b,add(...a){b.unshift(...a.reverse())}}),c.add(a),c}});f(b,{isNumberInRange:(a,b=0,c=b)=>{return a>b&&a<c},isNumberEqual:(a,b)=>{return a===b},isZero:(a)=>{return 0===a}});const sa=(a,b,c)=>{return ia(b,(b,d)=>{y(b)&&y(a[d])?sa(a[d],b,c):c&&v(b)&&v(a[d])?a[d].push(...b):a[d]=b}),a};f(b,{assignDeep:sa});f(b,{hasAnyKeys:(a,b)=>{const c=d(a),e=b.find((a)=>{return c.include(a)});return e},hasKeys:(a,b)=>{let c=!1;const e=d(a);return n(b,(a)=>{return c=e.include(a),c}),c}});const ta=(a,b)=>{let c=!1;if(a===b)c=!0;else if(a.toString()===b.toString())if(y(a)){const e=d(a);X(e,d(b))&&n(e,(d)=>{return c=ta(a[d],b[d]),c})}else v(a)&&a.length===b.length&&n(a,(a,d)=>{return c=ta(a,b[d]),c});return c};f(b,{isEqual:ta});f(b,{pick:(a,b,c)=>{return M((a,c,d)=>{d[a]=b[a]},a,c)}});f(b,{compactKeys:(a)=>{const b=[];return ia(a,(a,c)=>{r(a)&&b.push(c)}),b}});f(b,{isMatchObject:(a,b)=>{let c=!1;const e=d(a);return X(e,d(b))&&n(e,(d)=>{return c=a[d]===b[d],c}),c}});f(b,{zipObject:(a,b)=>{return M((a,c,d)=>{d[a]=b[c]},a)},unZipObject:(a)=>{const b=[],c=[];return ia(a,(a,d)=>{b.push(d),c.push(a)}),[b,c]}});f(b,{invert:(a,b={})=>{return ia(a,(a,c)=>{b[a]=c}),b}});f(b,{omit:(a,b)=>{return ka(a,(a,c)=>{if(!b.includes(c))return a})}});const ua=/[-_]/g,va=/ (.)/g;f(b,{upperCase:(a)=>{return a.replace(ua,' ').trim().toUpperCase()},camelCase:(a)=>{const b=a.toLowerCase().replace(va,(a)=>{return a.toUpperCase()});return b},kebabCase:(a)=>{return a.replace(ua,' ').trim().toLowerCase().replace(va,'-$1')},snakeCase:(a)=>{return a.replace(ua,' ').trim().toLowerCase().replace(va,'_$1')}});f(b,{chunkString:(a,b)=>{return a.match(new RegExp(`(.|[\r\n]){1, ${b}}`,'g'))},initialString:(a)=>{return a.slice(0,-1)},insertInRange:(a,b,c,d)=>{return a.slice(0,b)+d+a.slice(c,a.length)},restString:(a)=>{return a.slice(1,a.length)},rightString:(b,c)=>{return[b.length-1-c]}});f(b,{replaceWithList:(a,b,c)=>{return a.replace(new RegExp(`\\b${b.join('|')}\\b`,'gi'),c)}});const wa=/%(?![\da-f]{2})/gi,xa=/&/g,ya=/</g,za=/>/g,Aa=/"/g,Ba=/\//g,Ca=(a)=>{return decodeURIComponent(a.replace(wa,()=>{return'%25'}))},Da=(a)=>{let b=a;return b=b.replace(xa,'&amp;'),b=b.replace(ya,'&lt;'),b=b.replace(za,'&gt;'),b=b.replace(Aa,'&quot;'),b.replace(Ba,'&quot;')};f(b,{createHtmlEntities:Da,rawURLDecode:Ca,sanitize:(a)=>{return Da(Ca(a))}});const Ea=/\S+/g,Fa=/\w+/g;f(b,{tokenize:(a)=>{return a.match(Ea)||[]},words:(a)=>{return a.match(Fa)||[]}});f(b,{truncate:(a,b)=>{let c=a;return c.length>b&&(c=c.slice(0,b)),c},truncateLeft:(a,b)=>{let c=a;const d=c.length;return d>b&&(c=c.substr(b,d)),c},truncateWord:(a,b)=>{return a.substring(0,b)}});const Ga=/ (.)/g,Ha=(a)=>{return a[0].toUpperCase()},Ia=(a,b=1)=>{return a.substr(b)};f(b,{restString:Ia,upperFirst:(a)=>{return Ha(a)+Ia(a)},upperFirstAll:(a)=>{return a.replace(Ga,(a)=>{return a.toUpperCase()})},upperFirstOnly:(a)=>{return Ha(a)+Ia(a).toLowerCase()},upperFirstOnlyAll:(a)=>{return a.toLowerCase().replace(Ga,(a)=>{return a.toUpperCase()})}});const Ja=Function.prototype;f(b,{cacheNativeMethod:function(a){return Ja.call.bind(a)}});f(b,{ifNotEqual:(a,b,c)=>{return b?(a[b]=a[b]||c,a[b]):a}});const Ka=/\.|\[/,La=/]/g,Ma=(a)=>{return a.replace(La,'').split(Ka)};f(b,{toPath:Ma});const Na=(a,c=b)=>{let d=c;return n(Ma(a),(a)=>{return d=d[a],r(d)}),d};f(b,{get:Na});f(b,{matchesProperty:(a,b)=>{return(c)=>{return Na(a,c)===b}}});let Oa=0;const Pa=[],Qa={},Ra=()=>{let a=Pa.shift(Pa);return r(a)||(a=Oa,Qa[a]=!0,Oa++),a};Ra.remove=(a)=>{Qa[a]=null,Pa.push(a)},f(b,{uuid:Ra});const Sa=JSON,Ta=Sa.jsonParse,Ua=Sa.stringify;f(b,{jsonParse:Ta,stringify:Ua});const Va=(a,b)=>{return r(b)&&(Va[a]=b),Na(a,Va)};b.superMethod(Va),f(b,{model:Va});f(b,{promise:(a)=>{return new Promise(a)}});return f(b,{toggle:(c,d,a)=>{return c===d?a:d}}),b});