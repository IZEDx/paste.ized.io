(window.webpackJsonp=window.webpackJsonp||[]).push([[12,70],{10:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},159:function(e,t,n){"use strict";n.r(t),n.d(t,"Editor",(function(){return o}));var i=n(104);n(158);class o{constructor(e,t={},n=(e=>{})){this.el=e,this.overrides=t,this.initFunc=n,this.changeFunc=e=>{},this.init()}init(){this.monaco=i.a.create(this.el,this.overrides),this.monaco.onDidChangeModelContent(()=>{this.overrides.value=this.value,this.changeFunc(this.value)}),this.initFunc(this.monaco)}refresh(){this.monaco.dispose(),this.init()}onInit(e){this.initFunc=e}onChange(e){this.changeFunc=e}static getLanguages(){return i.b.getLanguages()}set value(e){this.monaco.setValue(e)}get value(){return this.monaco.getValue()}get language(){return this.overrides.language}set language(e){this.overrides.language=e,this.refresh()}set theme(e){this.overrides.theme=e,this.refresh()}get theme(){return this.overrides.theme}}},28:function(e,t,n){(function(e){var i=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function s(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new s(o.call(setTimeout,i,arguments),clearTimeout)},t.setInterval=function(){return new s(o.call(setInterval,i,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},s.prototype.unref=s.prototype.ref=function(){},s.prototype.close=function(){this._clearFn.call(i,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n(29),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(10))},29:function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var i,o,s,a,r,c=1,u={},l=!1,d=e.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(e);f=f&&f.setTimeout?f:e,"[object process]"==={}.toString.call(e.process)?i=function(e){t.nextTick((function(){m(e)}))}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((s=new MessageChannel).port1.onmessage=function(e){m(e.data)},i=function(e){s.port2.postMessage(e)}):d&&"onreadystatechange"in d.createElement("script")?(o=d.documentElement,i=function(e){var t=d.createElement("script");t.onreadystatechange=function(){m(e),t.onreadystatechange=null,o.removeChild(t),t=null},o.appendChild(t)}):i=function(e){setTimeout(m,0,e)}:(a="setImmediate$"+Math.random()+"$",r=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(a)&&m(+t.data.slice(a.length))},e.addEventListener?e.addEventListener("message",r,!1):e.attachEvent("onmessage",r),i=function(t){e.postMessage(a+t,"*")}),f.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var o={callback:e,args:t};return u[c]=o,i(c),c++},f.clearImmediate=h}function h(e){delete u[e]}function m(e){if(l)setTimeout(m,0,e);else{var t=u[e];if(t){l=!0;try{!function(e){var t=e.callback,i=e.args;switch(i.length){case 0:t();break;case 1:t(i[0]);break;case 2:t(i[0],i[1]);break;case 3:t(i[0],i[1],i[2]);break;default:t.apply(n,i)}}(t)}finally{h(e),l=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(10),n(15))}}]);