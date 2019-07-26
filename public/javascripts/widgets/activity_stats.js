!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("ActivityStats",[],e):"object"==typeof exports?exports.ActivityStats=e():t.ActivityStats=e()}(window,function(){return function(t){function e(e){for(var r,i,s=e[0],l=e[1],c=e[2],p=0,f=[];p<s.length;p++)i=s[p],o[i]&&f.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);for(u&&u(e);f.length;)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={0:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var s=window.webpackJsonpActivityStats=window.webpackJsonpActivityStats||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;return a.push([186,1]),n()}({173:function(t,e,n){var r=n(174);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(5)(r,o);r.locals&&(t.exports=r.locals)},174:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".inner.summary-stats {\n  min-height: 180px;\n  padding: 20px; }\n  .inner.summary-stats td {\n    padding: 2px;\n    line-height: 19px;\n    font-size: 14px; }\n  .inner.summary-stats td:first-child {\n    font-size: 19px;\n    text-align: right; }\n  .inner.summary-stats td:last-child {\n    position: relative;\n    top: 2px; }\n  .inner.summary-stats #annotations-by-category {\n    position: absolute;\n    top: 15px;\n    right: 30px; }\n",""])},176:function(t,e,n){var r=n(177);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(5)(r,o);r.locals&&(t.exports=r.locals)},177:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".inner.contributors-chart {\n  height: 190px; }\n  .inner.contributors-chart td {\n    padding: 0 4px; }\n  .inner.contributors-chart td:first-child, .inner.contributors-chart td:last-child {\n    text-align: right; }\n  .inner.contributors-chart .meter {\n    height: 10px;\n    width: 400px;\n    margin-top: 2px; }\n  .inner.contributors-chart .bar {\n    background-color: #4483c4; }\n",""])},179:function(t,e,n){var r=n(180);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(5)(r,o);r.locals&&(t.exports=r.locals)},180:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".inner.timeline {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  padding: 0 0 14px 0; }\n  .inner.timeline svg {\n    font-family: PTSansNarrow;\n    font-size: 13px;\n    shape-rendering: crispEdges; }\n  .inner.timeline .ct-grids line {\n    stroke: #3f3f3f;\n    stroke-width: 0.5px;\n    stroke-dasharray: 2 2; }\n  .inner.timeline .ct-series line.ct-bar {\n    stroke-width: 6px; }\n  .inner.timeline .inner {\n    position: relative; }\n  .inner.timeline #activity-history-chart {\n    box-sizing: border-box;\n    width: 100%;\n    height: 100%; }\n  .inner.timeline .ct-series-a .ct-bar {\n    stroke: #4483c4;\n    stroke-width: 10.5px; }\n  .inner.timeline .ct-label {\n    white-space: nowrap; }\n  .inner.timeline .ct-label.ct-vertical.ct-start {\n    position: relative;\n    top: 12px; }\n",""])},183:function(t,e,n){var r={"./af":18,"./af.js":18,"./ar":19,"./ar-dz":20,"./ar-dz.js":20,"./ar-kw":21,"./ar-kw.js":21,"./ar-ly":22,"./ar-ly.js":22,"./ar-ma":23,"./ar-ma.js":23,"./ar-sa":24,"./ar-sa.js":24,"./ar-tn":25,"./ar-tn.js":25,"./ar.js":19,"./az":26,"./az.js":26,"./be":27,"./be.js":27,"./bg":28,"./bg.js":28,"./bm":29,"./bm.js":29,"./bn":30,"./bn.js":30,"./bo":31,"./bo.js":31,"./br":32,"./br.js":32,"./bs":33,"./bs.js":33,"./ca":34,"./ca.js":34,"./cs":35,"./cs.js":35,"./cv":36,"./cv.js":36,"./cy":37,"./cy.js":37,"./da":38,"./da.js":38,"./de":39,"./de-at":40,"./de-at.js":40,"./de-ch":41,"./de-ch.js":41,"./de.js":39,"./dv":42,"./dv.js":42,"./el":43,"./el.js":43,"./en-SG":44,"./en-SG.js":44,"./en-au":45,"./en-au.js":45,"./en-ca":46,"./en-ca.js":46,"./en-gb":47,"./en-gb.js":47,"./en-ie":48,"./en-ie.js":48,"./en-il":49,"./en-il.js":49,"./en-nz":50,"./en-nz.js":50,"./eo":51,"./eo.js":51,"./es":52,"./es-do":53,"./es-do.js":53,"./es-us":54,"./es-us.js":54,"./es.js":52,"./et":55,"./et.js":55,"./eu":56,"./eu.js":56,"./fa":57,"./fa.js":57,"./fi":58,"./fi.js":58,"./fo":59,"./fo.js":59,"./fr":60,"./fr-ca":61,"./fr-ca.js":61,"./fr-ch":62,"./fr-ch.js":62,"./fr.js":60,"./fy":63,"./fy.js":63,"./ga":64,"./ga.js":64,"./gd":65,"./gd.js":65,"./gl":66,"./gl.js":66,"./gom-latn":67,"./gom-latn.js":67,"./gu":68,"./gu.js":68,"./he":69,"./he.js":69,"./hi":70,"./hi.js":70,"./hr":71,"./hr.js":71,"./hu":72,"./hu.js":72,"./hy-am":73,"./hy-am.js":73,"./id":74,"./id.js":74,"./is":75,"./is.js":75,"./it":76,"./it-ch":77,"./it-ch.js":77,"./it.js":76,"./ja":78,"./ja.js":78,"./jv":79,"./jv.js":79,"./ka":80,"./ka.js":80,"./kk":81,"./kk.js":81,"./km":82,"./km.js":82,"./kn":83,"./kn.js":83,"./ko":84,"./ko.js":84,"./ku":85,"./ku.js":85,"./ky":86,"./ky.js":86,"./lb":87,"./lb.js":87,"./lo":88,"./lo.js":88,"./lt":89,"./lt.js":89,"./lv":90,"./lv.js":90,"./me":91,"./me.js":91,"./mi":92,"./mi.js":92,"./mk":93,"./mk.js":93,"./ml":94,"./ml.js":94,"./mn":95,"./mn.js":95,"./mr":96,"./mr.js":96,"./ms":97,"./ms-my":98,"./ms-my.js":98,"./ms.js":97,"./mt":99,"./mt.js":99,"./my":100,"./my.js":100,"./nb":101,"./nb.js":101,"./ne":102,"./ne.js":102,"./nl":103,"./nl-be":104,"./nl-be.js":104,"./nl.js":103,"./nn":105,"./nn.js":105,"./pa-in":106,"./pa-in.js":106,"./pl":107,"./pl.js":107,"./pt":108,"./pt-br":109,"./pt-br.js":109,"./pt.js":108,"./ro":110,"./ro.js":110,"./ru":111,"./ru.js":111,"./sd":112,"./sd.js":112,"./se":113,"./se.js":113,"./si":114,"./si.js":114,"./sk":115,"./sk.js":115,"./sl":116,"./sl.js":116,"./sq":117,"./sq.js":117,"./sr":118,"./sr-cyrl":119,"./sr-cyrl.js":119,"./sr.js":118,"./ss":120,"./ss.js":120,"./sv":121,"./sv.js":121,"./sw":122,"./sw.js":122,"./ta":123,"./ta.js":123,"./te":124,"./te.js":124,"./tet":125,"./tet.js":125,"./tg":126,"./tg.js":126,"./th":127,"./th.js":127,"./tl-ph":128,"./tl-ph.js":128,"./tlh":129,"./tlh.js":129,"./tr":130,"./tr.js":130,"./tzl":131,"./tzl.js":131,"./tzm":132,"./tzm-latn":133,"./tzm-latn.js":133,"./tzm.js":132,"./ug-cn":134,"./ug-cn.js":134,"./uk":135,"./uk.js":135,"./ur":136,"./ur.js":136,"./uz":137,"./uz-latn":138,"./uz-latn.js":138,"./uz.js":137,"./vi":139,"./vi.js":139,"./x-pseudo":140,"./x-pseudo.js":140,"./yo":141,"./yo.js":141,"./zh-cn":142,"./zh-cn.js":142,"./zh-hk":143,"./zh-hk.js":143,"./zh-tw":144,"./zh-tw.js":144};function o(t){var e=a(t);return n(e)}function a(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}o.keys=function(){return Object.keys(r)},o.resolve=a,t.exports=o,o.id=183},184:function(t,e,n){var r=n(185);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(5)(r,o);r.locals&&(t.exports=r.locals)},185:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".panel {\n  display: inline-block;\n  max-width: 100% !important;\n  margin-right: 1%;\n  margin-bottom: 15px; }\n\n.panel.w2 {\n  width: 16.6%; }\n\n.panel.w3 {\n  width: 25%; }\n\n.panel.w4 {\n  width: 32%; }\n\n.panel.w5 {\n  width: 41.6%; }\n\n.panel.w6 {\n  width: 50%; }\n\n.panel.w7 {\n  width: 58.3%; }\n\n.panel.w8 {\n  width: 65%; }\n\n.panel.w12 {\n  width: 98.2%; }\n\n.content {\n  max-width: 1400px;\n  min-width: 960px; }\n\n.inner {\n  position: relative; }\n\n.inner .loading-mask {\n  background-color: rgba(255, 255, 255, 0.85);\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n  .inner .loading-mask .spinner {\n    position: absolute;\n    bottom: 50%;\n    left: 48%;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    line-height: 20px;\n    border: 3px solid rgba(68, 131, 196, 0.3);\n    border-top: 3px solid #4483c4;\n    border-radius: 50%;\n    -webkit-animation: spin 1s infinite linear;\n    animation: spin 1s infinite linear; }\n\n@-moz-keyframes spin {\n  100% {\n    -moz-transform: rotate(360deg); } }\n\n@-webkit-keyframes spin {\n  100% {\n    -webkit-transform: rotate(360deg); } }\n\n@keyframes spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n",""])},186:function(t,e,n){"use strict";n.r(e);var r=n(1),o=n.n(r),a=n(145),i=n.n(a),s=n(7),l=n.n(s),c=n(146),u=n(6),p=n.n(u);class f{constructor(t){this._a=t}getBodiesOfType(t){return Array.isArray(t)?this._a.bodies.filter(e=>t.includes(e.type)):this._a.bodies.filter(e=>e.type===t)}getCategoryBodies(){return this.getBodiesOfType(["PLACE","PERSON","EVENT"])}getTags(){return this.getBodiesOfType("TAG")}getComments(){return this.getBodiesOfType("COMMENT")}}n(173);function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function j(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g=["#57c17b","#6f87d8","#bc51bc","#afafaf"],v=function(t){return o.a.createElement(p.a,{thousandSeparator:!0,displayType:"text",value:t.value})},w=function(t){function e(){var t,n,r,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return r=this,n=!(o=(t=h(e)).call.apply(t,[this].concat(i)))||"object"!==m(o)&&"function"!=typeof o?y(r):o,j(y(n),"state",{computing:!0,tags:null,comments:null,relations:null,contributors:null,bodiesByType:{}}),n}var n,a,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,r["Component"]),n=e,(a=[{key:"componentWillReceiveProps",value:function(t){this.props.annotations!=t.annotations&&this.recompute(t.annotations)}},{key:"recompute",value:function(t){var e=this;new Promise(function(e){e({tags:function(t){return t.reduce((t,e)=>t+new f(e).getTags().length,0)}(t),comments:function(t){return t.reduce((t,e)=>t+new f(e).getComments().length,0)}(t),relations:function(t){return t.reduce((t,e)=>e.relations?t+e.relations.length:t,0)}(t),contributors:function(t){return t.reduce((t,e)=>{const n=new Set([...t,...e.contributors]);return Array.from(n)},[])}(t).length,bodiesByType:function(t){const e={PLACE:0,PERSON:0,EVENT:0,NONE:0};return t.forEach(t=>{const n=new f(t).getCategoryBodies();n.length>0?n.forEach(t=>{e[t.type]++}):e.NONE++}),[["Places",e.PLACE],["People",e.PERSON],["Events",e.EVENT],["Uncategorized",e.NONE]]}(t)})}).then(function(t){return e.setState(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){j(t,e,n[e])})}return t}({},t,{computing:!1}))})}},{key:"render",value:function(){return o.a.createElement("div",{className:"panel w4"},o.a.createElement("h2",null,"Summary"),o.a.createElement("div",{className:"inner summary-stats"},o.a.createElement("div",null,o.a.createElement("table",null,o.a.createElement("tbody",null,o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(v,{value:this.props.annotations.length})),o.a.createElement("td",null,"Annotations")),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(v,{value:this.state.tags})),o.a.createElement("td",null,"Tags")),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(v,{value:this.state.comments})),o.a.createElement("td",null,"Comments")),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(v,{value:this.state.relations})),o.a.createElement("td",null,"Relations")),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(v,{value:this.state.contributors})),o.a.createElement("td",null,"Contributors"))))),o.a.createElement(c.a,{id:"annotations-by-category",width:"140px",height:"140px",legend:!1,colors:g,data:this.state.bodiesByType}),this.state.computing&&o.a.createElement("div",{className:"loading-mask"},o.a.createElement("div",{className:"spinner"}))))}}])&&d(n.prototype,a),i&&d(n,i),e}();n(176);function E(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var x=function(t){var e=Math.max.apply(Math,E(t.editsPerUser.map(function(t){return t[1]}))),n=t.editsPerUser.map(function(t){return o.a.createElement("tr",{key:t[0]},o.a.createElement("td",null,t[0]),o.a.createElement("td",null,o.a.createElement("div",{className:"meter"},o.a.createElement("div",{className:"bar rounded",style:{width:"".concat(100*t[1]/e,"%")}}))),o.a.createElement("td",null,o.a.createElement(p.a,{thousandSeparator:!0,displayType:"text",value:t[1]})," Edits"))});return o.a.createElement("div",{className:"panel w8"},o.a.createElement("h2",null,"Contributors"),o.a.createElement("div",{className:"inner contributors-chart"},o.a.createElement("table",null,o.a.createElement("tbody",null,n))))},k=n(147),O=n.n(k),S=(n(179),["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]),P=function(t){var e={labels:t.history.map(function(t){return e=new Date(t[0]),n=e.getDate(),r=e.getMonth(),"".concat(S[r]," ").concat(n);var e,n,r}),series:[t.history.map(function(t){return t[1]})]};return o.a.createElement("div",{className:"panel w12"},o.a.createElement("h2",null,"Activity over time"),o.a.createElement("div",{className:"inner timeline"},o.a.createElement(O.a,{data:e,options:{fullWidth:!0,chartPadding:{top:26},showArea:!0,axisY:{onlyInteger:!0},axisX:{showGrid:!1}},type:"Bar"})))};n(181),n(184);function z(t){return(z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function N(t){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function T(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function A(t,e){return(A=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var C=function(t){function e(){var t,n,r,o,a,i,s;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var l=arguments.length,c=new Array(l),u=0;u<l;u++)c[u]=arguments[u];return r=this,n=!(o=(t=N(e)).call.apply(t,[this].concat(c)))||"object"!==z(o)&&"function"!=typeof o?T(r):o,a=T(n),i="state",s={document:n.props.config.document||"oflmsfz9augu6l",annotations:[],editsPerUser:[],editHistory:[]},i in a?Object.defineProperty(a,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):a[i]=s,n}var n,a,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&A(t,e)}(e,r["Component"]),n=e,(a=[{key:"componentDidMount",value:function(){var t=this;l.a.get("/api/document/".concat(this.state.document,"/annotations")).then(function(e){return t.setState({annotations:e.data})}),l.a.get("/api/document/".concat(this.state.document,"/contributions")).then(function(e){var n=e.data.by_user.map(function(t){return[t.username,t.value]}),r=e.data.contribution_history;t.setState({editsPerUser:n,editHistory:r})})}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(w,{annotations:this.state.annotations}),o.a.createElement(x,{editsPerUser:this.state.editsPerUser}),o.a.createElement(P,{history:this.state.editHistory}))}}])&&_(n.prototype,a),i&&_(n,i),e}();n.d(e,"init",function(){return M});var M=function(t){i.a.render(o.a.createElement(C,{config:t}),document.getElementById(t.id))}}})});