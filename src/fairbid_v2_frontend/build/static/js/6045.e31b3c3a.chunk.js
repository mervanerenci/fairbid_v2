"use strict";(self.webpackChunkfairbid_v2_frontend=self.webpackChunkfairbid_v2_frontend||[]).push([[6045],{99036:(e,t,n)=>{n.d(t,{A:()=>Y});var r=n(89575),i=n(17502),o=n(72176),l=n(92236),s=n(80715),a=n(54972),u=n(39609),c=n(44784),p=n(1006),d=n(50215),h=n(2474),f=n(79140),m=n(59973);function b(e,t){var n=Object.create(null);return e&&o.Children.map(e,(function(e){return e})).forEach((function(e){n[e.key]=function(e){return t&&(0,o.isValidElement)(e)?t(e):e}(e)})),n}function v(e,t,n){return null!=n[t]?n[t]:e.props[t]}function g(e,t,n){var r=b(e.children),i=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,i=Object.create(null),o=[];for(var l in e)l in t?o.length&&(i[l]=o,o=[]):o.push(l);var s={};for(var a in t){if(i[a])for(r=0;r<i[a].length;r++){var u=i[a][r];s[i[a][r]]=n(u)}s[a]=n(a)}for(r=0;r<o.length;r++)s[o[r]]=n(o[r]);return s}(t,r);return Object.keys(i).forEach((function(l){var s=i[l];if((0,o.isValidElement)(s)){var a=l in t,u=l in r,c=t[l],p=(0,o.isValidElement)(c)&&!c.props.in;!u||a&&!p?u||!a||p?u&&a&&(0,o.isValidElement)(c)&&(i[l]=(0,o.cloneElement)(s,{onExited:n.bind(null,s),in:c.props.in,exit:v(s,"exit",e),enter:v(s,"enter",e)})):i[l]=(0,o.cloneElement)(s,{in:!1}):i[l]=(0,o.cloneElement)(s,{onExited:n.bind(null,s),in:!0,exit:v(s,"exit",e),enter:v(s,"enter",e)})}})),i}var y=Object.values||function(e){return Object.keys(e).map((function(t){return e[t]}))},A=function(e){function t(t,n){var r,i=(r=e.call(this,t,n)||this).handleExited.bind((0,h.A)(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}(0,f.A)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,r,i=t.children,l=t.handleExited;return{children:t.firstRender?(n=e,r=l,b(n.children,(function(e){return(0,o.cloneElement)(e,{onExited:r.bind(null,e),in:!0,appear:v(e,"appear",n),enter:v(e,"enter",n),exit:v(e,"exit",n)})}))):g(e,i,l),firstRender:!1}},n.handleExited=function(e,t){var n=b(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState((function(t){var n=(0,r.A)({},t.children);return delete n[e.key],{children:n}})))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=(0,i.A)(e,["component","childFactory"]),l=this.state.contextValue,s=y(this.state.children).map(n);return delete r.appear,delete r.enter,delete r.exit,null===t?o.createElement(m.A.Provider,{value:l},s):o.createElement(m.A.Provider,{value:l},o.createElement(t,r,s))},t}(o.Component);A.propTypes={},A.defaultProps={component:"div",childFactory:function(e){return e}};const R=A;var x=n(60137),E=n(95291),M=n(80812);const k=function(e){const{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:s,rippleSize:a,in:u,onExited:c,timeout:p}=e,[d,h]=o.useState(!1),f=(0,l.A)(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),m={width:a,height:a,top:-a/2+s,left:-a/2+i},b=(0,l.A)(n.child,d&&n.childLeaving,r&&n.childPulsate);return u||d||h(!0),o.useEffect((()=>{if(!u&&null!=c){const e=setTimeout(c,p);return()=>{clearTimeout(e)}}}),[c,u,p]),(0,M.jsx)("span",{className:f,style:m,children:(0,M.jsx)("span",{className:b})})};var T=n(88461);const w=(0,T.A)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),C=["center","classes","className"];let V,P,S,L,D=e=>e;const $=(0,x.i7)(V||(V=D`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),j=(0,x.i7)(P||(P=D`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),B=(0,x.i7)(S||(S=D`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),N=(0,a.Ay)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),F=(0,a.Ay)(k,{name:"MuiTouchRipple",slot:"Ripple"})(L||(L=D`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),w.rippleVisible,$,550,(e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}),w.ripplePulsate,(e=>{let{theme:t}=e;return t.transitions.duration.shorter}),w.child,w.childLeaving,j,550,(e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}),w.childPulsate,B,(e=>{let{theme:t}=e;return t.transitions.easing.easeInOut})),I=o.forwardRef((function(e,t){const n=(0,u.A)({props:e,name:"MuiTouchRipple"}),{center:s=!1,classes:a={},className:c}=n,p=(0,i.A)(n,C),[d,h]=o.useState([]),f=o.useRef(0),m=o.useRef(null);o.useEffect((()=>{m.current&&(m.current(),m.current=null)}),[d]);const b=o.useRef(!1),v=(0,E.A)(),g=o.useRef(null),y=o.useRef(null),A=o.useCallback((e=>{const{pulsate:t,rippleX:n,rippleY:r,rippleSize:i,cb:o}=e;h((e=>[...e,(0,M.jsx)(F,{classes:{ripple:(0,l.A)(a.ripple,w.ripple),rippleVisible:(0,l.A)(a.rippleVisible,w.rippleVisible),ripplePulsate:(0,l.A)(a.ripplePulsate,w.ripplePulsate),child:(0,l.A)(a.child,w.child),childLeaving:(0,l.A)(a.childLeaving,w.childLeaving),childPulsate:(0,l.A)(a.childPulsate,w.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:i},f.current)])),f.current+=1,m.current=o}),[a]),x=o.useCallback((function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:()=>{};const{pulsate:r=!1,center:i=s||t.pulsate,fakeElement:o=!1}=t;if("mousedown"===(null==e?void 0:e.type)&&b.current)return void(b.current=!1);"touchstart"===(null==e?void 0:e.type)&&(b.current=!0);const l=o?null:y.current,a=l?l.getBoundingClientRect():{width:0,height:0,left:0,top:0};let u,c,p;if(i||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)u=Math.round(a.width/2),c=Math.round(a.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;u=Math.round(t-a.left),c=Math.round(n-a.top)}if(i)p=Math.sqrt((2*a.width**2+a.height**2)/3),p%2===0&&(p+=1);else{const e=2*Math.max(Math.abs((l?l.clientWidth:0)-u),u)+2,t=2*Math.max(Math.abs((l?l.clientHeight:0)-c),c)+2;p=Math.sqrt(e**2+t**2)}null!=e&&e.touches?null===g.current&&(g.current=()=>{A({pulsate:r,rippleX:u,rippleY:c,rippleSize:p,cb:n})},v.start(80,(()=>{g.current&&(g.current(),g.current=null)}))):A({pulsate:r,rippleX:u,rippleY:c,rippleSize:p,cb:n})}),[s,A,v]),k=o.useCallback((()=>{x({},{pulsate:!0})}),[x]),T=o.useCallback(((e,t)=>{if(v.clear(),"touchend"===(null==e?void 0:e.type)&&g.current)return g.current(),g.current=null,void v.start(0,(()=>{T(e,t)}));g.current=null,h((e=>e.length>0?e.slice(1):e)),m.current=t}),[v]);return o.useImperativeHandle(t,(()=>({pulsate:k,start:x,stop:T})),[k,x,T]),(0,M.jsx)(N,(0,r.A)({className:(0,l.A)(w.root,a.root,c),ref:y},p,{children:(0,M.jsx)(R,{component:null,exit:!0,children:d})}))}));var O=n(20836);function z(e){return(0,O.Ay)("MuiButtonBase",e)}const K=(0,T.A)("MuiButtonBase",["root","disabled","focusVisible"]),X=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],U=(0,a.Ay)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${K.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Y=o.forwardRef((function(e,t){const n=(0,u.A)({props:e,name:"MuiButtonBase"}),{action:a,centerRipple:h=!1,children:f,className:m,component:b="button",disabled:v=!1,disableRipple:g=!1,disableTouchRipple:y=!1,focusRipple:A=!1,LinkComponent:R="a",onBlur:x,onClick:E,onContextMenu:k,onDragLeave:T,onFocus:w,onFocusVisible:C,onKeyDown:V,onKeyUp:P,onMouseDown:S,onMouseLeave:L,onMouseUp:D,onTouchEnd:$,onTouchMove:j,onTouchStart:B,tabIndex:N=0,TouchRippleProps:F,touchRippleRef:O,type:K}=n,Y=(0,i.A)(n,X),H=o.useRef(null),W=o.useRef(null),_=(0,c.A)(W,O),{isFocusVisibleRef:q,onFocus:G,onBlur:J,ref:Q}=(0,d.A)(),[Z,ee]=o.useState(!1);v&&Z&&ee(!1),o.useImperativeHandle(a,(()=>({focusVisible:()=>{ee(!0),H.current.focus()}})),[]);const[te,ne]=o.useState(!1);o.useEffect((()=>{ne(!0)}),[]);const re=te&&!g&&!v;function ie(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:y;return(0,p.A)((r=>{t&&t(r);return!n&&W.current&&W.current[e](r),!0}))}o.useEffect((()=>{Z&&A&&!g&&te&&W.current.pulsate()}),[g,A,Z,te]);const oe=ie("start",S),le=ie("stop",k),se=ie("stop",T),ae=ie("stop",D),ue=ie("stop",(e=>{Z&&e.preventDefault(),L&&L(e)})),ce=ie("start",B),pe=ie("stop",$),de=ie("stop",j),he=ie("stop",(e=>{J(e),!1===q.current&&ee(!1),x&&x(e)}),!1),fe=(0,p.A)((e=>{H.current||(H.current=e.currentTarget),G(e),!0===q.current&&(ee(!0),C&&C(e)),w&&w(e)})),me=()=>{const e=H.current;return b&&"button"!==b&&!("A"===e.tagName&&e.href)},be=o.useRef(!1),ve=(0,p.A)((e=>{A&&!be.current&&Z&&W.current&&" "===e.key&&(be.current=!0,W.current.stop(e,(()=>{W.current.start(e)}))),e.target===e.currentTarget&&me()&&" "===e.key&&e.preventDefault(),V&&V(e),e.target===e.currentTarget&&me()&&"Enter"===e.key&&!v&&(e.preventDefault(),E&&E(e))})),ge=(0,p.A)((e=>{A&&" "===e.key&&W.current&&Z&&!e.defaultPrevented&&(be.current=!1,W.current.stop(e,(()=>{W.current.pulsate(e)}))),P&&P(e),E&&e.target===e.currentTarget&&me()&&" "===e.key&&!e.defaultPrevented&&E(e)}));let ye=b;"button"===ye&&(Y.href||Y.to)&&(ye=R);const Ae={};"button"===ye?(Ae.type=void 0===K?"button":K,Ae.disabled=v):(Y.href||Y.to||(Ae.role="button"),v&&(Ae["aria-disabled"]=v));const Re=(0,c.A)(t,Q,H);const xe=(0,r.A)({},n,{centerRipple:h,component:b,disabled:v,disableRipple:g,disableTouchRipple:y,focusRipple:A,tabIndex:N,focusVisible:Z}),Ee=(e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,o={root:["root",t&&"disabled",n&&"focusVisible"]},l=(0,s.A)(o,z,i);return n&&r&&(l.root+=` ${r}`),l})(xe);return(0,M.jsxs)(U,(0,r.A)({as:ye,className:(0,l.A)(Ee.root,m),ownerState:xe,onBlur:he,onClick:E,onContextMenu:le,onFocus:fe,onKeyDown:ve,onKeyUp:ge,onMouseDown:oe,onMouseLeave:ue,onMouseUp:ae,onDragLeave:se,onTouchEnd:pe,onTouchMove:de,onTouchStart:ce,ref:Re,tabIndex:v?-1:N,type:K},Ae,Y,{children:[f,re?(0,M.jsx)(I,(0,r.A)({ref:_,center:h},F)):null]}))}))},26166:(e,t,n)=>{n.d(t,{A:()=>r});const r=n(79535).A},1006:(e,t,n)=>{n.d(t,{A:()=>r});const r=n(95547).A},50215:(e,t,n)=>{n.d(t,{A:()=>r});const r=n(99009).A},99009:(e,t,n)=>{n.d(t,{A:()=>h});var r=n(72176),i=n(95291);let o=!0,l=!1;const s=new i.E,a={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function u(e){e.metaKey||e.altKey||e.ctrlKey||(o=!0)}function c(){o=!1}function p(){"hidden"===this.visibilityState&&l&&(o=!0)}function d(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch(n){}return o||function(e){const{type:t,tagName:n}=e;return!("INPUT"!==n||!a[t]||e.readOnly)||"TEXTAREA"===n&&!e.readOnly||!!e.isContentEditable}(t)}function h(){const e=r.useCallback((e=>{var t;null!=e&&((t=e.ownerDocument).addEventListener("keydown",u,!0),t.addEventListener("mousedown",c,!0),t.addEventListener("pointerdown",c,!0),t.addEventListener("touchstart",c,!0),t.addEventListener("visibilitychange",p,!0))}),[]),t=r.useRef(!1);return{isFocusVisibleRef:t,onFocus:function(e){return!!d(e)&&(t.current=!0,!0)},onBlur:function(){return!!t.current&&(l=!0,s.start(100,(()=>{l=!1})),t.current=!1,!0)},ref:e}}}}]);
//# sourceMappingURL=6045.e31b3c3a.chunk.js.map