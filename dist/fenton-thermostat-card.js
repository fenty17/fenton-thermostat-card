function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",g=u.reactiveElementPolyfillSupport,_=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??$)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[_("elementProperties")]=new Map,v[_("finalized")]=new Map,g?.({ReactiveElement:v}),(u.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=x.trustedTypes,A=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,P=`<${C}>`,O=document,k=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,H="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,z=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,I=/"/g,D=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,q=O.createTreeWalker(O,129);function F(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=M;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===M?"!--"===l[1]?r=N:void 0!==l[1]?r=R:void 0!==l[2]?(D.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=o??M,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?I:j):r===I||r===j?r=z:r===N||r===R?r=M:(r=z,o=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";n+=r===M?i+P:h>=0?(s.push(a),i.slice(0,h)+E+i.slice(h)+S+d):i+S+(-2===h?e:d)}return[F(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,h]=G(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=h[n++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?Y:"?"===r[1]?tt:"@"===r[1]?et:Q}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),q.nextNode(),a.push({type:2,index:++o});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===L)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=U(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=K(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);q.currentNode=s;let o=q.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new it(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=q.nextNode(),n++)}return q.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),U(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=K(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==L,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=K(this,s[i+r],e,r),a===L&&(a=this._$AH[r]),n||=!U(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Y extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class et extends Q{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??V)===L)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const st=x.litHtmlPolyfillSupport;st?.(J,X),(x.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(k(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const rt=ot.litElementPolyfillSupport;rt?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},lt=(t=at,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ht(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ct=class extends nt{setConfig(t){this.config=t}getEntityState(t){var e,i;return null!==(i=null===(e=this.hass.states[t])||void 0===e?void 0:e.state)&&void 0!==i?i:"—"}getEntityAttr(t,e){var i;return null===(i=this.hass.states[t])||void 0===i?void 0:i.attributes[e]}_setTemp(t){const e=Number(this.getEntityAttr(this.config.climate_entity,"temperature"))||19,i=Math.round(2*(e+.5*t))/2;this.hass.callService("climate","set_temperature",{entity_id:this.config.climate_entity,temperature:i})}_tap(t){this.hass.callService("script","turn_on",{entity_id:t})}_moreInfo(t){const e=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_heatingOn(){var t;const e=(null!==(t=this.getEntityState(this.config.heating_state_entity))&&void 0!==t?t:"").toLowerCase();return"on"===e||"heat"===e||"heating"===e}_thermoIcon(){return this._heatingOn()?"mdi:radiator":"mdi:radiator-disabled"}_thermoIconColor(){return this._heatingOn()?"orange":"#888"}_arrowSVG(t){return B`
      <svg class="arrow-svg" viewBox="0 0 100 100">
        ${"up"===t?B`<polygon points="50,15 95,75 5,75" fill="currentColor" />`:B`<polygon points="5,25 95,25 50,85" fill="currentColor" />`}
      </svg>
    `}render(){var t;if(!this.config)return B``;const e=this.config,i=this.getEntityAttr(e.climate_entity,"temperature"),s=[{label:"Current:",entity:e.temp_entity,value:`${this.getEntityState(e.temp_entity)}°C`},{label:"Heating:",entity:e.heating_state_entity,value:this.getEntityState(e.heating_state_entity)},{label:"Hot Water:",entity:e.hotwater_state_entity,value:this.getEntityState(e.hotwater_state_entity)},{label:"Boost:",entity:e.boost_state_entity,value:this.getEntityState(e.boost_state_entity)},{label:"HW Boost:",entity:e.hw_boost_state_entity,value:this.getEntityState(e.hw_boost_state_entity)}];return B`
      <div class="card">
        <div class="row">
          <div class="status-side">
            <div class="top-title-row">
              <ha-icon
                icon="${this._thermoIcon()}"
                style="--mdc-icon-size: 28px; color:${this._thermoIconColor()}"
                title="Thermostat"
              ></ha-icon>
              <span style="vertical-align:0.06em;white-space:nowrap;">${null!==(t=e.title)&&void 0!==t?t:"Fenton Thermostat"}</span>
            </div>
            <div class="sensor-list">
              ${s.map(t=>[B`<div class="sensor-label"
                    @click=${()=>this._moreInfo(t.entity)}
                    title="Open details"
                  >${t.label}</div>`,B`<div class="sensor-value"
                    @click=${()=>this._moreInfo(t.entity)}
                    title="Open details"
                  >${t.value}</div>`])}
            </div>
          </div>
          <div class="thermostat-outer">
            <div class="thermostat-controls">
              <button class="arrow-btn" @click=${()=>this._setTemp(1)} aria-label="Increase temperature">
                ${this._arrowSVG("up")}
              </button>
              <div class="temp-target"
                   tabindex="0"
                   title="Show climate info"
                   @click=${()=>this._moreInfo(e.climate_entity)}
                   @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||this._moreInfo(e.climate_entity)}}>
                ${void 0!==i?Number(i).toFixed(1):"19.0"}°C
              </div>
              <button class="arrow-btn" @click=${()=>this._setTemp(-1)} aria-label="Decrease temperature">
                ${this._arrowSVG("down")}
              </button>
            </div>
          </div>
        </div>
        <div class="bottom-bar">
          <span class="boost-label" style="align-items:center;display:flex;">BOOST</span>
          <div class="boost-btns-area">
            <button class="boost-btn" @click=${()=>this._tap(e.boost_30_script)}>30m</button>
            <button class="boost-btn" boost="60" @click=${()=>this._tap(e.boost_60_script)}>60m</button>
            <button class="boost-btn" boost="hw" @click=${()=>this._tap(e.hw_boost_script)}>HW</button>
            <button class="boost-btn" boost="cancel" @click=${()=>this._tap(e.cancel_script)}>X</button>
          </div>
        </div>
      </div>
    `}};ct.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)})`
    :host {
      display: block;
      width: 100%;
      max-width: 100vw;
    }
    .card {
      background: #181c2b;
      color: #fff;
      border-radius: 20px;
      padding: 18px 18px 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-family: "Segoe UI", sans-serif;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      max-width: 100%;
      overflow: hidden;
    }
    .row {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      width: 100%;
      gap: 12px;
      min-width: 0;
    }
    .status-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding-left: 16px;
      min-width: 0;
      margin-top: 6px;
      justify-content: flex-start;
    }
    .sensor-list {
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 10px;
      row-gap: 5px;
      align-items: center;
      width: 100%;
      margin-top: 4px;
      margin-bottom: 0;
    }
    .sensor-label {
      text-align: left;
      font-weight: 500;
      opacity: 0.93;
      cursor: pointer;
      padding: 2px 0 2px 0;
      border-radius: 8px 0 0 8px;
      user-select: none;
      transition: background 0.17s;
    }
    .sensor-label:active, .sensor-label:hover {
      background: rgba(255,255,255,0.055);
    }
    .sensor-value {
      text-align: left;
      padding: 2px 0 2px 0;
      border-radius: 0 8px 8px 0;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      transition: background 0.17s;
    }
    .sensor-value:active, .sensor-value:hover {
      background: rgba(255,255,255,0.045);
    }
    .top-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size:1.18rem;
      font-weight:bold;
      margin-bottom: 8px;
      min-width: 0;
    }
    .thermostat-outer {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      min-width: 130px;
      min-height: 130px;
      height: 100%;
      margin-right: 20px;
    }
    .thermostat-controls {
      width: 100%;
      box-sizing: border-box;
      background: #232323;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      aspect-ratio: 1/1;
      flex: 1 1 auto;
      min-width: 120px;
      min-height: 120px;
      max-width: 305px;
      max-height: 500px;
      margin-left: 0;
      margin-top: 0;
      margin-bottom: 0;
      overflow: hidden;
    }
    .arrow-btn {
      background: none;
      border: none;
      width: 100%;
      height: 3.4em;
      min-height: 64px;
      max-height: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      margin: 0;
      transition: color 0.2s;
      border-radius: 0;
      flex: 0 0 auto;
      outline: none;
      --arrow-size: 3.2em;
      color: #fff;
    }
    .arrow-btn:active svg polygon,
    .arrow-btn:focus svg polygon {
      fill: #ffe082;
    }
    .arrow-svg {
      display: block;
      width: var(--arrow-size);
      height: var(--arrow-size);
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
      pointer-events: none;
    }

    .temp-target {
      font-size: 2.5rem;
      font-weight: bold;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 0;
      cursor: pointer;
      user-select: none;
      letter-spacing: 1px;
      outline: none;
      border: none;
      background: none;
      width: 100%;
    }

    .bottom-bar {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      width: 100%;
      margin-top: 2px;
      box-sizing: border-box;
      gap: 0;
      position: relative;
    }
    .boost-label {
      font-size: 1.07rem;
      font-weight: 500;
      color: #fff;
      letter-spacing: 1.5px;
      min-width: 44px;
      text-align: left;
      align-items: center;
      display: flex;
      height: auto;
      margin: 0;
      padding-left: 16px;
      flex: 0 0 auto;
      /* Vertically center in bar */
    }
    .boost-btns-area {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex: 1 1 0;
      gap: 27px;
      margin-left: 22px;
      min-width: 0;
      flex-wrap: wrap;
    }
    .boost-btn {
      background: #353535;
      color: #ffe082;
      border: none;
      border-radius: 14px;
      font-size: 1.15rem;
      padding: 14px 18px;
      cursor: pointer;
      font-weight: bold;
      min-width: 49px;
      min-height: 37px;
      transition: background 0.2s, color 0.2s;
      outline: none;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 1 120px;
      box-sizing: border-box;
      word-break: keep-all;
    }
    .boost-btn[boost="60"] { color: orange;}
    .boost-btn[boost="hw"] { color: darkorange;}
    .boost-btn[boost="cancel"] {
      color: #fa3333;
      background: none;
      border: 2px solid #fa3333;
    }
    /* Responsive: make boost btns wrap, shrink, prevent overflow */
    @media (max-width: 768px) {
      .card { padding: 3vw; }
      .thermostat-outer { min-width: 90px; }
      .thermostat-controls { min-width: 90px; }
      .boost-btns-area { gap: 14px; }
    }
    @media (max-width: 600px) {
      .row {
        flex-direction: row;
        align-items: flex-start;
        gap: 6vw;
      }
      .status-side { padding-left: 7px;}
      .thermostat-outer {
        min-width: 68px;
      }
      .sensor-label { font-size: 0.98rem; }
      .sensor-value { font-size: 1.09rem; }
      .boost-label { padding-left: 7px; font-size: 0.93rem;}
      .boost-btns-area { gap: 8px; margin-left: 10px;}
      .boost-btn {
        font-size: 1rem;
        min-width: 41px;
        padding: 12px 7px;
        flex-basis: 70px;
      }
    }
    @media (max-width: 480px) {
      .card { padding: 2vw; }
      .thermostat-outer { min-width: 56px;}
      .row { gap: 2vw; }
      .status-side { padding-left: 3vw;}
      .boost-label { padding-left: 3vw; }
      .boost-btns-area {
        gap: 5px;
        margin-left: 2px;
      }
      .boost-btn {
        font-size: 0.97rem;
        min-width: 34px;
        padding: 9px 2px;
        flex-basis: 40px;
      }
      .thermostat-controls {
        min-width: 0;
        width: 100%;
        max-width: unset;
        aspect-ratio: 1/1;
        min-height: 0;
        margin-right: 0;
      }
    }
    .boost-btns-area {
      /* force wrap and prevent overflow at all times*/
      flex-wrap: wrap;
    }
  `,t([ht({attribute:!1})],ct.prototype,"hass",void 0),t([function(t){return ht({...t,state:!0,attribute:!1})}()],ct.prototype,"config",void 0),ct=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("fenton-thermostat-card")],ct);export{ct as FentonThermostatCard};
