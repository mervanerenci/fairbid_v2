"use strict";(self.webpackChunkfairbid_v2_frontend=self.webpackChunkfairbid_v2_frontend||[]).push([[3185],{26548:(e,t,r)=>{r.d(t,{A:()=>i});var a=r(23893),s=(r(72991),r(69889),r(80812));const i=e=>{let{src:t,alt:r,effect:i="blur",className:n,...l}=e;return(0,s.jsx)(a.LazyLoadImage,{src:t,alt:r,effect:i,wrapperClassName:`${n||""} lazy-image`,...l})}},59499:(e,t,r)=>{r.d(t,{A:()=>i});var a=r(71126),s=r(80812);const i=e=>{let{title:t}=e;return(0,s.jsx)(a.m,{children:(0,s.jsxs)("title",{children:[t," | Fairbid"]})})}},70815:(e,t,r)=>{r.d(t,{A:()=>i});var a=r(5154),s=r(72176);const i=()=>{const[e,t]=(0,s.useState)(null),[r,i]=(0,s.useState)(!1);return{file:e,setFile:t,handleFile:e=>{const r=e.target.files[0];if(!r)return;if("image/jpeg"!==r.type&&"image/png"!==r.type&&"image/webp"!==r.type)return void a.oR.error("File type not supported.");const s=new FileReader;s.readAsDataURL(r),s.onerror=()=>{a.oR.error("Something went wrong. Please try again.")},s.onloadstart=()=>i(!0),s.onloadend=()=>{t(s.result),i(!1)}},loading:r}}},69987:(e,t,r)=>{r.r(t),r.d(t,{default:()=>H});var a=r(59499);const s="style_header__VBf9d",i="style_header_media__TrJTT",n="style_header_main__7jsH4",l="style_content__lyyy1",o="style_media__PI-rH";var c=r(49038),d=r(26548),u=r(72176);const m=r.p+"static/media/header_abstract.0f43d70b8f1567a763adc7f616c150f9.svg",h=r.p+"static/media/header_right.1cbbcab2c42f337a3aa0.webp",p=r.p+"static/media/header_left.0566ed82bebfd3c170eb.webp";var v=r(80812);const x=e=>{let{title:t}=e;return(0,v.jsxs)("header",{className:s,children:[(0,v.jsx)("div",{className:i,children:(0,v.jsx)(d.A,{src:p,alt:"media"})}),(0,v.jsxs)("div",{className:`${n} bg-secondary border-10`,children:[(0,v.jsxs)("div",{className:l,children:[(0,v.jsx)("h1",{children:t}),(0,v.jsx)(c.A,{})]}),(0,v.jsx)(d.A,{className:o,src:m,alt:"media",effect:"opacity"})]}),(0,v.jsx)("div",{className:i,children:(0,v.jsx)(d.A,{src:h,alt:"media"})})]})},f="style_container__A9ASX",g="style_main_form__N4eKn",b="style_group__vkOTX",_="style_btn__CCqtz",y="style_map__yqVRD",j="style_main__bfpvp";var A=r(10287);var k=r(5154);const N=e=>{let{id:t,onChange:r,...a}=e;return(0,v.jsxs)("div",{className:"checkbox",children:[(0,v.jsx)("input",{id:t,type:"checkbox",onChange:r,...a}),(0,v.jsx)("label",{className:"d-flex align-items-center justify-content-center",htmlFor:t,children:(0,v.jsx)("i",{className:"icon icon-check-solid"})})]})},w=(0,u.memo)(N);var S=r(63685),C=r(90305),F=r(21346),D=r.n(F);r.p;const M="style_wrapper__FA95G",R="style_content__djENQ",$="style_content_avatar__uEboO",I="style_container__9Y++m";var z=r(95548),P=r(49526),q=r(70815),E=r(32335),L=r(15761);const O=()=>{const{file:e,setFile:t,handleFile:r,loading:a}=(0,q.A)(),s=(0,u.useRef)(null);return(0,v.jsx)("div",{className:`${M} bg-secondary border-10`,children:(0,v.jsxs)("div",{className:R,children:[(0,v.jsxs)("div",{className:$,children:[(0,v.jsx)(z.A,{className:I,src:e||E,alt:"avatar"}),a&&(0,v.jsx)(P.A,{visible:!0,isOverlay:!0,isRound:!0})]}),(0,v.jsxs)("div",{className:"d-flex flex-column g-20",children:[(0,v.jsx)(A.A,{tag:"button",onClick:()=>{var e;return null===(e=s.current)||void 0===e?void 0:e.click()},children:"Upload photo"}),(0,v.jsx)("button",{className:"btn btn--outline",onClick:()=>{t(L),k.oR.info("Your profile picture was successfully deleted.")},disabled:e===L,children:"Delete"})]}),(0,v.jsx)("input",{type:"file",ref:s,onChange:r,hidden:!0})]})})},T=()=>{const{register:e,handleSubmit:t,formState:{errors:r},reset:a}=(0,C.mN)(),[s,i]=(0,u.useState)("english"),[n,l]=(0,u.useState)("minutes");return(0,v.jsxs)("div",{className:`${f} bg-secondary border-10`,children:[(0,v.jsxs)("div",{className:j,children:[(0,v.jsx)("h3",{children:"New Auction"}),(0,v.jsxs)("form",{className:g,onSubmit:t((e=>{k.oR.info(`Your message: "${e.message}" has been sent successfully`),a()})),children:[(0,v.jsxs)("div",{className:b,children:[(0,v.jsx)("input",{className:D()("field field--outline",{"field--error":r.name}),type:"text",placeholder:"Item name",...e("name",{required:!0})}),(0,v.jsx)("input",{className:D()("field field--outline",{"field--error":r.name}),type:"text",placeholder:"Starting Price",...e("name",{required:!0})}),(0,v.jsx)("input",{className:D()("field field--outline",{"field--error":r.name}),type:"text",placeholder:"Location",...e("name",{required:!0})}),(0,v.jsx)("input",{className:D()("field field--outline",{"field--error":r.email}),type:"text",placeholder:"Contact",...e("email",{required:!0,pattern:/^\S+@\S+$/i})}),(0,v.jsx)("input",{className:D()("field field--outline",{"field--error":r.subject}),type:"text",placeholder:"Duration",...e("subject",{required:!0})}),(0,v.jsx)(S.A,{setSelected:l,options:[{value:"minutes",label:"Minutes"},{value:"days",label:"Days"}],selected:n,placeholder:"Minutes"})]}),(0,v.jsx)(S.A,{setSelected:i,options:[{value:"english",label:"English Auction"},{value:"dutch",label:"Dutch Auction"},{value:"sealed-bid",label:"Sealed Bid Auction"}],selected:s,placeholder:"Auction Type"}),(0,v.jsxs)("ul",{className:"sidebar_list",children:[(0,v.jsxs)("li",{className:"sidebar_list-item",children:[(0,v.jsx)(w,{id:"list",defaultChecked:!0}),(0,v.jsx)("label",{htmlFor:"list",children:"List On Site"})]}),(0,v.jsxs)("li",{className:"sidebar_list-item",children:[(0,v.jsx)(w,{id:"whitelist"}),(0,v.jsx)("label",{htmlFor:"whitelist",children:"Add Whitelist"})]})]}),(0,v.jsx)("textarea",{className:D()("field field--outline",{"field--error":r.message}),placeholder:"Enter item description",...e("message",{required:!0})}),(0,v.jsx)(A.A,{className:_,tag:"button",type:"submit",children:"Create"})]})]}),(0,v.jsx)("div",{className:`${y} border-10`,children:(0,v.jsx)(O,{})})]})},H=()=>(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(a.A,{title:"New Auction"}),(0,v.jsx)(x,{title:"Create"}),(0,v.jsx)("main",{children:(0,v.jsx)("section",{children:(0,v.jsx)("div",{className:"container",children:(0,v.jsx)(T,{})})})})]})},95548:(e,t,r)=>{r.d(t,{A:()=>d});var a=r(26548),s=r(21346),i=r.n(s),n=r(72176);const l=r.p+"static/media/verified.d712db63e7c4123b870c80f47dbeaf91.svg";var o=r(80812);const c=e=>{let{src:t,alt:r,size:s,isVerified:n,className:c}=e;return(0,o.jsxs)("div",{className:i()("avatar-wrapper",s,c),children:[(0,o.jsx)(a.A,{className:"avatar",src:t,alt:r}),n&&(0,o.jsx)(a.A,{className:"verified",src:l,alt:"verified",effect:"opacity"})]})},d=(0,n.memo)(c)},49038:(e,t,r)=>{r.d(t,{A:()=>d});var a=r(6697),s=r(75204),i=r(72176),n=r(14571),l=r(21346),o=r.n(l),c=r(80812);const d=()=>{const e=(0,n.zy)(),[t,r]=(0,i.useState)([]);return(0,i.useEffect)((()=>{const t=e.pathname.split("/"),a=t.map(((e,r)=>({name:""===e?"Home":e.replace(/-/g," "),path:""===e?"/":t.slice(0,r+1).join("/")})));r(a)}),[e]),(0,c.jsx)(a.A,{separator:"\u2022",sx:{color:"var(--text)",textTransform:"capitalize","& .MuiBreadcrumbs-separator":{color:"var(--accent)"}},children:t.map(((t,r)=>(0,c.jsx)(s.k2,{className:o()("text-bold link-hover",{"text-accent disabled":t.path===e.pathname,"text-uppercase":"faq"===t.name}),to:t.path,children:t.name},t.path)))})}},63685:(e,t,r)=>{r.d(t,{A:()=>v});var a=r(49267),s=r(84704);const i=a.i7`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,n=(0,a.Ay)(s.Ay).withConfig({componentId:"sc-p0d5vu-0"})([".select{&__control{border:none;cursor:pointer;display:flex;align-items:center;background:transparent;min-height:unset;&--is-focused{box-shadow:none;}}&__value-container{padding:0;}&__single-value{margin:0;}&__indicator{padding:0;transition:color var(--transition);&:hover{color:var(--accent);}}&__indicator-separator{display:none;}&__menu{min-width:max-content;border-radius:10px;background:var(--bg-tertiary);animation:"," var(--transition);&.close{animation:"," var(--transition) reverse;}}&__option{padding:6px 20px;transition:all var(--transition);cursor:pointer;&:hover,&--is-selected{color:var(--text-light);}&--is-selected{font-weight:500;}&--is-selected,&--is-focused{background:transparent;}}}"],i,i),l=(0,a.Ay)(n).withConfig({componentId:"sc-p0d5vu-1"})([".select{&__control{height:var(--elements-height);padding:0 20px;border-radius:10px;background:var(--bg-tertiary);}&__single-value{color:var(--text);}&__indicator{padding:0;margin-left:20px;transition:color var(--transition);&:hover{color:var(--accent);}}&__indicator-separator{display:none;}&__menu{min-width:max-content;border-radius:10px;background:var(--bg-tertiary);}&__option{padding:6px 20px;transition:all var(--transition);cursor:pointer;color:var(--text);&:hover,&--is-selected{color:var(--text-light);}&--is-selected{font-weight:500;}&--is-selected,&--is-focused{background:transparent;}}}&.outline{.select__control{border:1px solid var(--divider);background:transparent;}}"]),o=(0,a.Ay)(n).withConfig({componentId:"sc-p0d5vu-2"})([".select{&__control{width:fit-content;gap:10px;}&__single-value{font-weight:500;color:var(--text-light);font-size:var(--text-sm);}&__indicator{font-size:var(--text-xs);}}"]);var c=r(54569),d=r(72176),u=r(21346),m=r.n(u),h=r(80812);const p=e=>{let{options:t,selected:r,setSelected:a,placeholder:s,variant:i,className:n,...u}=e;const p="minimal"===i?o:l,[v]=(0,d.useState)((()=>"select_"+Math.random().toFixed(5).slice(2)));return(0,h.jsx)(p,{value:r,onChange:a,options:t,isSearchable:!1,openMenuOnFocus:!0,blurInputOnSelect:!0,onMenuClose:()=>{const e=document.querySelector(`#${u.id||v} .select__menu`),t=null===e||void 0===e?void 0:e.parentElement,r=null===e||void 0===e?void 0:e.cloneNode(!0);r&&(r.classList.add("close"),r.addEventListener("animationend",(()=>{null===t||void 0===t||t.removeChild(r)})),null===t||void 0===t||t.appendChild(r))},instanceId:"custom-select",classNamePrefix:"select",className:m()("select",n),components:{DropdownIndicator:e=>(0,h.jsx)(c.c.DropdownIndicator,{...e,children:(0,h.jsx)("i",{className:"icon-angle-down"})}),SingleValue:e=>(0,h.jsx)(c.c.SingleValue,{...e,children:(0,h.jsx)("span",{children:e.children})})},placeholder:s||null})},v=(0,d.memo)(p)},10287:(e,t,r)=>{r.d(t,{A:()=>d});var a=r(21593),s=r(75204),i=r(72176),n=r(21346),l=r.n(n),o=r(80812);const c=e=>{let{tag:t,href:r,...i}=e;if("button"===t)return(0,o.jsx)(a.CS.button,{...i});if(void 0===r||"#"===r)return(0,o.jsx)(a.CS.a,{...i});const n=(0,a.CS)(s.k2);return(0,o.jsx)(n,{to:r,...i})},d=e=>{let{className:t,...r}=e;const[s,n]=(0,i.useState)(!1),d={background:"linear-gradient(98.49deg, #00eff5 -11.31%, #008f13 76.26%)"},u={background:"linear-gradient(98.49deg, #008f13 -11.31%, #00eff5 76.26%)"},{background:m}=(0,a.zh)({background:s?u.background:d.background,config:{duration:300},...r});return(0,o.jsx)(c,{className:l()("btn btn--gradient",t),...r,onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),style:{background:m},children:r.children})}},49526:(e,t,r)=>{r.d(t,{A:()=>$});var a=r(49267),s=r(17502),i=r(89575),n=r(72176),l=r(92236),o=r(80715),c=r(60137),d=r(26166),u=r(39609),m=r(54972),h=r(88461),p=r(20836);function v(e){return(0,p.Ay)("MuiCircularProgress",e)}(0,h.A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var x=r(80812);const f=["className","color","disableShrink","size","style","thickness","value","variant"];let g,b,_,y,j=e=>e;const A=44,k=(0,c.i7)(g||(g=j`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),N=(0,c.i7)(b||(b=j`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),w=(0,m.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`color${(0,d.A)(r.color)}`]]}})((e=>{let{ownerState:t,theme:r}=e;return(0,i.A)({display:"inline-block"},"determinate"===t.variant&&{transition:r.transitions.create("transform")},"inherit"!==t.color&&{color:(r.vars||r).palette[t.color].main})}),(e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&(0,c.AH)(_||(_=j`
      animation: ${0} 1.4s linear infinite;
    `),k)})),S=(0,m.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),C=(0,m.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.circle,t[`circle${(0,d.A)(r.variant)}`],r.disableShrink&&t.circleDisableShrink]}})((e=>{let{ownerState:t,theme:r}=e;return(0,i.A)({stroke:"currentColor"},"determinate"===t.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&!t.disableShrink&&(0,c.AH)(y||(y=j`
      animation: ${0} 1.4s ease-in-out infinite;
    `),N)})),F=n.forwardRef((function(e,t){const r=(0,u.A)({props:e,name:"MuiCircularProgress"}),{className:a,color:n="primary",disableShrink:c=!1,size:m=40,style:h,thickness:p=3.6,value:g=0,variant:b="indeterminate"}=r,_=(0,s.A)(r,f),y=(0,i.A)({},r,{color:n,disableShrink:c,size:m,thickness:p,value:g,variant:b}),j=(e=>{const{classes:t,variant:r,color:a,disableShrink:s}=e,i={root:["root",r,`color${(0,d.A)(a)}`],svg:["svg"],circle:["circle",`circle${(0,d.A)(r)}`,s&&"circleDisableShrink"]};return(0,o.A)(i,v,t)})(y),k={},N={},F={};if("determinate"===b){const e=2*Math.PI*((A-p)/2);k.strokeDasharray=e.toFixed(3),F["aria-valuenow"]=Math.round(g),k.strokeDashoffset=`${((100-g)/100*e).toFixed(3)}px`,N.transform="rotate(-90deg)"}return(0,x.jsx)(w,(0,i.A)({className:(0,l.A)(j.root,a),style:(0,i.A)({width:m,height:m},N,h),ownerState:y,ref:t,role:"progressbar"},F,_,{children:(0,x.jsx)(S,{className:j.svg,ownerState:y,viewBox:"22 22 44 44",children:(0,x.jsx)(C,{className:j.circle,style:k,ownerState:y,cx:A,cy:A,r:(A-p)/2,fill:"none",strokeWidth:p})})}))}));var D=r(18713);const M=a.Ay.div.withConfig({componentId:"sc-2w0l75-0"})(["position:absolute;display:flex;align-items:center;justify-content:center;top:0;left:0;width:100%;height:100%;background-color:rgba(1,1,1,.5);"]),R=(0,a.Ay)(F).withConfig({componentId:"sc-2w0l75-1"})(["width:60px !important;height:60px !important;"]),$=e=>{let{visible:t,isOverlay:r,isRound:a,...s}=e;const i=r?M:n.Fragment,l=a?{style:{borderRadius:"50%"}}:{};return(0,x.jsx)(D.A,{in:t,timeout:500,children:(0,x.jsx)(i,{...l,children:(0,x.jsx)(R,{className:"text-accent",thickness:5,...s})})})}},32335:(e,t,r)=>{e.exports=r.p+"static/media/avatar.e7b5b99a7168ac76987b.webp"},15761:(e,t,r)=>{e.exports=r.p+"static/media/avatar_placeholder.55ff705f7c27944b96c5.webp"}}]);
//# sourceMappingURL=3185.43066554.chunk.js.map