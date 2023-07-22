!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=20)}([function(e,t){e.exports=Object.freeze({PLAYER_RADIUS:20,BULLET_RADIUS:3,MAP_SIZE:4e3})},function(e,t,n){!function(e){"use strict";function t(e,t,n,r){var o,i=!1,a=0;function c(){o&&clearTimeout(o)}function u(){for(var u=arguments.length,l=new Array(u),s=0;s<u;s++)l[s]=arguments[s];var d=this,f=Date.now()-a;function m(){a=Date.now(),n.apply(d,l)}function v(){o=void 0}i||(r&&!o&&m(),c(),void 0===r&&f>e?m():!0!==t&&(o=setTimeout(r?v:m,void 0===r?e-f:e)))}return"boolean"!=typeof t&&(r=n,n=t,t=void 0),u.cancel=function(){c(),i=!0},u}e.debounce=function(e,n,r){return void 0===r?t(e,n,!1):t(e,r,!1!==n)},e.throttle=t,Object.defineProperty(e,"__esModule",{value:!0})}(t)},function(e,t,n){var r=n(8).Symbol;e.exports=r},function(e,t,n){var r=n(4),o=n(6),i=/[&<>"']/g,a=RegExp(i.source);e.exports=function(e){return(e=o(e))&&a.test(e)?e.replace(i,r):e}},function(e,t,n){var r=n(5)({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});e.exports=r},function(e,t){e.exports=function(e){return function(t){return null==e?void 0:e[t]}}},function(e,t,n){var r=n(7);e.exports=function(e){return null==e?"":r(e)}},function(e,t,n){var r=n(2),o=n(11),i=n(12),a=n(13),c=r?r.prototype:void 0,u=c?c.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(i(t))return o(t,e)+"";if(a(t))return u?u.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}},function(e,t,n){var r=n(9),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n(10))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length,o=Array(r);++n<r;)o[n]=t(e[n],n,e);return o}},function(e,t){var n=Array.isArray;e.exports=n},function(e,t,n){var r=n(14),o=n(17);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},function(e,t,n){var r=n(2),o=n(15),i=n(16),a=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":a&&a in Object(e)?o(e):i(e)}},function(e,t,n){var r=n(2),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,c=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,c),n=e[c];try{e[c]=void 0;var r=!0}catch(e){}var o=a.call(e);return r&&(t?e[c]=n:delete e[c]),o}},function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t),n.d(t,"enterKeyBoard",(function(){return we}));var r=n(1),o=n(3),i=n.n(o),a=document.getElementById("leaderboard"),c=document.querySelectorAll("#leaderboard table tr");function u(e){e?a.classList.add("hidden"):a.classList.remove("hidden")}var l=[],s=0,d=0;function f(e){d||(d=e.t,s=Date.now()),l.push(e),function(e){for(var t=0;t<e.length;t++)c[t+1].innerHTML="<td>".concat(i()(e[t].username.slice(0,15))||"Anonymous","</td><td>").concat(e[t].score,"</td>");for(var n=e.length;n<5;n++)c[n+1].innerHTML="<td>-</td><td>-</td>"}(e.leaderboard);var t=v();t>0&&l.splice(0,t)}function m(){return d+(Date.now()-s)-100}function v(){for(var e=m(),t=l.length-1;t>=0;t--)if(l[t].t<=e)return t;return-1}function y(){if(!d)return{};var e=v(),t=m();if(e<0||e===l.length-1)return l[l.length-1];var n=l[e],r=l[e+1],o=(t-n.t)/(r.t-n.t);return{me:p(n.me,r.me,o),others:g(n.others,r.others,o),bullets:g(n.bullets,r.bullets,o),meteors:g(n.meteors,r.meteors,o)}}function p(e,t,n){if(!t)return e;var r={};return Object.keys(e).forEach((function(o){r[o]="direction"===o?function(e,t,n){return Math.abs(t-e)>=Math.PI?e>t?e+(t+2*Math.PI-e)*n:e-(t-2*Math.PI-e)*n:e+(t-e)*n}(e[o],t[o],n):"x"===o||"y"===o||"hp"===o?e[o]+(t[o]-e[o])*n:e[o]})),r}function g(e,t,n){return e.map((function(e){return p(e,t.find((function(t){return e.id===t.id})),n)}))}var h,b=n(0),w=n.n(b),E=new WebSocket("ws://localhost:8080/room/".concat(1)),S=new Promise((function(e){E.onopen=function(){console.log("Connected to web socket game server!"),e()}})),x=Object(r.throttle)(20,(function(e){var t;87===e?t="North":83===e?t="South":68===e?t="East":65===e&&(t="West");var n={type:"cmove",protocol:"C_Move",posInfo:{pos:{},dirs:[],state:null},dir:t,updown:!0};E.send(JSON.stringify(n))})),I={skillId:1,name:"bullet",damage:w.a.BULLET_DAMAGE,skillType:"BULLET",projectile:{speed:w.a.BULLET_SPEED,range:w.a.BULLET_RADIUS}},A={skillId:2,name:"shield",damage:0,skillType:"SHIELD"},j={},k=Promise.all(["ship.svg","bullet.svg","icon64.png","plane.png","octagon.png","circle.png","target.png","meteor.png"].map((function(e){return new Promise((function(t){var n=new Image;n.onload=function(){console.log("Downloaded ".concat(e)),j[e]=n,t()},n.src="/assets/".concat(e)}))})));var L=function(e){return j[e]},O=document.getElementById("game-canvas"),P=O.getContext("2d"),_=n(0).MAP_SIZE;var C=function(e,t){P.fillStyle="black",P.fillRect(0,0,O.width,O.height),P.strokeStyle="white",P.lineWidth=.2;for(var n=O.width/2-e,r=O.height/2-t,o=0;o<_;o+=25){var i=O.width/2+o-e;i>=n&&i<=n+_&&(P.beginPath(),P.moveTo(i,r),P.lineTo(i,r+_),P.stroke())}for(var a=0;a<_;a+=25){var c=O.height/2+a-t;c>=r&&c<=r+_&&(P.beginPath(),P.moveTo(n,c),P.lineTo(n+_,c),P.stroke())}},B=n(0).PLAYER_RADIUS,M=document.getElementById("game-canvas"),T=M.getContext("2d");var D=function(e,t){var n=t.x,r=t.y,o=t.direction,i=M.width/2+n-e.x,a=M.height/2+r-e.y;T.save(),T.translate(i,a),T.rotate(o),T.drawImage(L("circle.png"),-B,-B,2*B,2*B),T.restore()},U=document.getElementById("game-canvas"),R=U.getContext("2d"),F=n(0).MAP_SIZE;var N=function(e){R.strokeStyle="white",R.lineWidth=5,R.strokeRect(U.width/2-e.x,U.height/2-e.y,F,F)},q=n(0).PLAYER_RADIUS,J=document.getElementById("game-canvas"),W=J.getContext("2d");var Y=function(e,t){var n=t.x,r=t.y,o=t.direction,i=t.word,a=J.width/2+n-e.x,c=J.height/2+r-e.y;W.save(),W.translate(a,c),W.rotate(o),W.drawImage(L("meteor.png"),-q,-q,2*q,2*q),W.restore(),W.fillStyle="white",W.font="20px Arial",W.textAlign="center",W.fillText(i,a,c+q+20)};function Z(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return H(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){c=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw i}}}}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var z=n(0),G=document.getElementById("game-canvas"),$=z.PLAYER_RADIUS;z.MAP_SIZE;function K(e){87!==e.keyCode&&83!==e.keyCode&&68!==e.keyCode&&65!==e.keyCode||x(e.keyCode),13===e.keyCode&&we()}function X(e){87!==e.keyCode&&83!==e.keyCode&&68!==e.keyCode&&65!==e.keyCode||function(e){var t;87===e?t="North":83===e?t="South":68===e?t="East":65===e&&(t="West");var n={type:"cmove",protocol:"C_Move",posInfo:{pos:{},dirs:[],state:null},dir:t,updown:!1};E.send(JSON.stringify(n))}(e.keyCode)}function Q(e){var t=G.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,o=y().me;!function(e,t){var n,r=y().others,o=y().meteors,i=Z(r);try{for(i.s();!(n=i.n()).done;){var a=n.value;if(Math.hypot(a.x-e,a.y-t)<$)return console.log("hi"),void(V=a.id)}}catch(e){i.e(e)}finally{i.f()}var c,u=Z(o);try{for(u.s();!(c=u.n()).done;){var l=c.value;if(Math.hypot(l.x-e,l.y-t)<$)return console.log("hi"),void(V=l.id)}}catch(e){u.e(e)}finally{u.f()}V=-1}(o.x+(n-G.width/2),o.y+(r-G.height/2))}var V=-1;function ee(e){return function(e){if(Array.isArray(e))return te(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return te(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return te(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function te(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var ne=document.getElementById("game-canvas"),re=ne.getContext("2d");var oe=function(){var e=y(),t=e.me,n=e.others,r=e.meteors,o=[].concat(ee(n),ee(r)).find((function(e){return e.id===V}));if(o){var i=o.x,a=o.y,c=ne.width/2+i-t.x,u=ne.height/2+a-t.y,l=L("target.png");re.drawImage(l,c-l.width/16,u-l.height/16,l.width/8,l.height/8)}},ie=document.getElementById("game-canvas"),ae=ie.getContext("2d"),ce=n(0).BULLET_RADIUS;var ue,le=function(e,t){var n=t.x,r=t.y;ae.drawImage(L("bullet.svg"),ie.width/2+n-e.x-ce,ie.height/2+r-e.y-ce,2*ce,2*ce)},se=n(0).MAP_SIZE,de=document.getElementById("game-canvas");function fe(){de.width=1200,de.height=800}function me(){var e=y(),t=e.me,n=e.others,r=e.bullets,o=e.meteors;t&&(C(t.x,t.y),N(t),oe(),r.forEach(le.bind(null,t)),o.forEach(Y.bind(null,t)),D(t,t),n.forEach(D.bind(null,t))),ue=requestAnimationFrame(me)}function ve(){Date.now();C(se/2,se/2),ue=requestAnimationFrame(ve)}fe(),window.addEventListener("resize",Object(r.debounce)(40,fe)),ue=requestAnimationFrame(ve);n(18),n(19);var ye,pe=document.getElementById("play-menu"),ge=document.getElementById("play-button"),he=document.getElementById("username-input"),be=document.getElementById("inputbar");Promise.all([(ye=function(){window.removeEventListener("click",Q),window.removeEventListener("keydown",K),window.removeEventListener("keyup",X),cancelAnimationFrame(ue),ue=requestAnimationFrame(ve),pe.classList.remove("hidden"),u(!0)},S.then((function(){E.onmessage=function(e){var t=JSON.parse(e.data);if("sentergame"===t.type)h=t.player.objectId,console.log("enter game!! ".concat(h));else if("sspawn"===t.type)console.log("spawn!!");else if("supdate"===t.type){var n=t.update.others.find((function(e){return e.id===h})),r=t.update.others.indexOf(n);r>-1&&t.update.others.splice(r,1),f({t:t.update.t,me:n,others:t.update.others,bullets:t.update.bullets,meteors:t.update.meteors,leaderboard:t.update.leaderboard})}else"smove"===t.type||"schat"===t.type||"sskill"===t.type||"sdie"===t.type&&(console.log("sdie"),t.objectId===h&&ye())},E.onclose=function(){console.log("Disconnected from server."),document.getElementById("disconnect-modal").classList.remove("hidden"),document.getElementById("reconnect-button").onclick=function(){window.location.reload()}}}))),k]).then((function(){pe.classList.remove("hidden"),he.focus(),ge.onclick=function(){var e,t;e=he.value,t={type:"centergame",protocol:"C_EnterGame",username:e},E.send(JSON.stringify(t)),pe.classList.add("hidden"),s=0,d=0,window.addEventListener("click",Q),window.addEventListener("keydown",K),window.addEventListener("keyup",X),cancelAnimationFrame(ue),ue=requestAnimationFrame(me),u(!1)}})).catch(console.error);var we=Object(r.throttle)(10,(function(){if(document.activeElement===be)V>0&&(""===be.value.trim()?(console.log("입력 실패, 메세지를 입력해 주세요!"),be.blur()):(!function(e,t,n,r){var o={type:"cskill",protocol:"C_Skill",target:e,info:!0===n?I:A};E.send(JSON.stringify(o))}(V,be.value,!0),be.value="",be.blur()));else{if(V<0)return void console.log("타겟이 지정되지 않았음!");be.focus()}}))}]);