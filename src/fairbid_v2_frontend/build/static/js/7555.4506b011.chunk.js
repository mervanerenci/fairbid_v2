"use strict";(self.webpackChunkfairbid_v2_frontend=self.webpackChunkfairbid_v2_frontend||[]).push([[7555],{75940:(e,t,a)=>{a.d(t,{A:()=>x});const i="style_wrapper__TNWNp",s="style_wrapper_content__wnkG8",r="style_qty__ntBx3",c="style_media__8kuTA",n="style_media_cover__s3DBB",d="style_media_thumbs__nlxj0",o="style_slide__Y-XnW";var l=a(85375),p=a(90862),b=a(70493),m=a(59066),f=a(72176),u=a(12945),h=a(80812);const x=e=>{let{item:t,index:a,isPrivate:x=!1}=e;const[v,w]=(0,f.useState)(null);return(0,h.jsx)(m.A,{index:a,children:(0,h.jsxs)("div",{className:`${i} border-hover bg-primary`,children:[(0,h.jsxs)("div",{className:s,children:[(0,h.jsx)("h4",{children:t.title}),(0,h.jsxs)("h6",{className:r,children:[(0,u.c4)(t.qty)," NFT"]}),(0,h.jsx)(l.A,{avatar:t.author.avatar,name:t.author.nickname,style:{pointerEvents:x?"none":"auto"}})]}),(0,h.jsx)("div",{className:`${c} shadow-overlay border-10`,children:(0,h.jsxs)("div",{children:[(0,h.jsx)(p.RC,{className:n,modules:[b._R,b.WO,b.Ij],effect:"fade",fadeEffect:{crossFade:!0},loop:!0,speed:1500,thumbs:{swiper:v&&!v.destroyed?v:null},autoplay:{delay:3e3},children:t.media.map(((e,a)=>(0,h.jsx)(p.qr,{children:(0,h.jsx)("img",{src:e.full,alt:t.title})},a)))}),(0,h.jsx)(p.RC,{className:d,onSwiper:w,modules:[b.WO],spaceBetween:10,slidesPerView:"auto",breakpoints:{0:{slidesPerView:3}},loop:!0,speed:1500,children:t.media.map(((e,a)=>(0,h.jsx)(p.qr,{className:`${o} square border-10`,children:(0,h.jsx)("img",{src:e.thumbnail,alt:t.title})},a)))})]})})]})})}},26548:(e,t,a)=>{a.d(t,{A:()=>r});var i=a(23893),s=(a(72991),a(69889),a(80812));const r=e=>{let{src:t,alt:a,effect:r="blur",className:c,...n}=e;return(0,s.jsx)(i.LazyLoadImage,{src:t,alt:a,effect:r,wrapperClassName:`${c||""} lazy-image`,...n})}},82241:(e,t,a)=>{a.d(t,{A:()=>r});const i="style_header__gcoUG";var s=a(80812);const r=e=>{let{title:t,children:a}=e;return(0,s.jsxs)("div",{className:i,children:[(0,s.jsx)("h3",{children:t}),a]})}},59066:(e,t,a)=>{a.d(t,{A:()=>c});var i=a(21593),s=a(8548),r=a(80812);const c=e=>{let{children:t,index:a=1,className:c,type:n="slide",delay:d,...o}=e;const[l,p]=(0,s.Wx)({threshold:.2,triggerOnce:!0}),b={config:{duration:300,mass:1,tension:300,friction:30},delay:o.delay?o.delay:100*a},m={slide:(0,i.zh)({from:{transform:"translateY(40px)",opacity:0},to:{transform:p?"translateY(0px)":"translateY(40px)",opacity:p?1:0},...b,...o}),fade:(0,i.zh)({from:{opacity:0},to:{opacity:p?1:0},...b,...o}),grow:(0,i.zh)({from:{transform:"scale(0.4)"},to:{transform:p?"scale(1)":"scale(0.4)"},...b,...o})};return(0,r.jsx)(i.CS.div,{className:c||"",style:m[n],ref:l,children:t})}},91256:(e,t,a)=>{a.r(t),a.d(t,{default:()=>re});const i="style_grid__jZCZ6";var s=a(82241),r=a(63704),c=a(75940);const n=a.p+"static/media/avatar1.0fe8f6f117ba7d7e54dd.webp";var d=a(42608),o=a(34909),l=a(91346),p=a(40303),b=a(39557),m=a(55160),f=a(97979),u=a(29622);const h=a.p+"static/media/avatar2.bc608ec034998f8307a5.webp";var x=a(69125),v=a(30200),w=a(15547),y=a(68150),g=a(96688),_=a(90941),j=a(88178),k=a(26959);const N=a.p+"static/media/avatar3.ddbde50e2e7ec62c9c17.webp";var A=a(90486),V=a(15959),C=a(31252),q=a(91461),z=a(72255),O=a(62654),R=a(73689),I=a(72672);const S=a.p+"static/media/avatar4.48819029f00f1dfea15e.webp";var $=a(6563),W=a(25314),B=a(97229),E=a(44860),M=a(86458),P=a(73307),F=a(96856),T=a(5425);const Y=a.p+"static/media/avatar5.e5ea07db83d2075350c7.webp";var L=a(43988),X=a(94353),G=a(94326),Z=a(46171),D=a(36153),U=a(93116),H=a(83359),J=a(80130);const K=a.p+"static/media/avatar6.4aeda2202d3c43143b68.webp";var Q=a(16345),ee=a(36668),te=a(14911),ae=a(33474);const ie=[{title:"3d vector characters",qty:30,author:{nickname:"anizadam",avatar:n},media:[{thumbnail:d,full:b},{thumbnail:o,full:m},{thumbnail:l,full:f},{thumbnail:p,full:u}]},{title:"Figure collection",qty:26,author:{nickname:"zzzivitelar",avatar:h},media:[{thumbnail:x,full:g},{thumbnail:v,full:_},{thumbnail:w,full:j},{thumbnail:y,full:k}]},{title:"Creative art collection",qty:9,author:{nickname:"xte284934",avatar:N},media:[{thumbnail:A,full:z},{thumbnail:V,full:O},{thumbnail:C,full:R},{thumbnail:q,full:I}]},{title:"The image of a man",qty:54,author:{nickname:"floweman",avatar:S},media:[{thumbnail:$,full:M},{thumbnail:W,full:P},{thumbnail:B,full:F},{thumbnail:E,full:T}]},{title:"Solar system",qty:8,author:{nickname:"planets",avatar:Y},media:[{thumbnail:L,full:D},{thumbnail:X,full:U},{thumbnail:G,full:H},{thumbnail:Z,full:J}]},{title:"Colored backgrounds",qty:38,author:{nickname:"anizadam",avatar:K},media:[{thumbnail:Q,full:a(23188)},{thumbnail:ee,full:a(98801)},{thumbnail:te,full:a(25174)},{thumbnail:ae,full:a(66683)}]}];var se=a(80812);const re=()=>(0,se.jsx)("section",{children:(0,se.jsxs)("div",{className:"container",children:[(0,se.jsx)(s.A,{title:"New Collections \u26a1",children:(0,se.jsx)(r.A,{href:"/explore",text:"View all collections"})}),(0,se.jsx)("div",{className:i,children:ie.map(((e,t)=>(0,se.jsx)(c.A,{item:e,index:t},t)))})]})})},85375:(e,t,a)=>{a.d(t,{A:()=>p});const i="style_container__ax2tb",s="style_avatar__PFOLm";var r=a(75204),c=a(26548),n=a(72176);const d=a.p+"static/media/xchain.f88c8bc1706c6340e80d90a8cc12f3e5.svg";var o=a(80812);const l=e=>{let{avatar:t=d,name:a="Xchain",...n}=e;return(0,o.jsxs)("div",{className:`${i} d-flex align-items-center g-10 bg-secondary`,...n,children:[(0,o.jsx)(c.A,{className:s,src:t,alt:a}),(0,o.jsx)(r.k2,{to:"/author",children:"Xchain"===a?a:`@${a}`})]})},p=(0,n.memo)(l)},63704:(e,t,a)=>{a.d(t,{A:()=>n});var i=a(75204),s=a(72176),r=a(80812);const c=e=>{let{href:t,text:a}=e;return(0,r.jsxs)(i.k2,{className:"link-arrow",to:t,children:[a," ",(0,r.jsx)("i",{className:"icon icon-arrow-right text-accent"})]})},n=(0,s.memo)(c)},39557:(e,t,a)=>{e.exports=a.p+"static/media/cover1-1.07b1c8515c31f2dbda2b.webp"},55160:(e,t,a)=>{e.exports=a.p+"static/media/cover1-2.1517c37c08958444e7ec.webp"},97979:(e,t,a)=>{e.exports=a.p+"static/media/cover1-3.6e0ee05faa7aec9568f5.webp"},29622:(e,t,a)=>{e.exports=a.p+"static/media/cover1-4.5c04e753f99d14e172d7.webp"},96688:(e,t,a)=>{e.exports=a.p+"static/media/cover2-1.5237e1c6e4a58933d291.webp"},90941:(e,t,a)=>{e.exports=a.p+"static/media/cover2-2.f45b4026924a2ca20c1c.webp"},88178:(e,t,a)=>{e.exports=a.p+"static/media/cover2-3.2ebdb6267272a272a704.webp"},26959:(e,t,a)=>{e.exports=a.p+"static/media/cover2-4.c00f9bd4aaab991100df.webp"},72255:(e,t,a)=>{e.exports=a.p+"static/media/cover3-1.75b70fa5ba5fac1b9e7f.webp"},62654:(e,t,a)=>{e.exports=a.p+"static/media/cover3-2.b34afd75cad7a214ad7a.webp"},73689:(e,t,a)=>{e.exports=a.p+"static/media/cover3-3.bb708fa5e6e975141b6f.webp"},72672:(e,t,a)=>{e.exports=a.p+"static/media/cover3-4.0eac21ddcfb82b1072d6.webp"},86458:(e,t,a)=>{e.exports=a.p+"static/media/cover4-1.d7e1afa8386a723d9d57.webp"},73307:(e,t,a)=>{e.exports=a.p+"static/media/cover4-2.c7b877de399b55aec401.webp"},96856:(e,t,a)=>{e.exports=a.p+"static/media/cover4-3.3d8ba6a99fe23854e99e.webp"},5425:(e,t,a)=>{e.exports=a.p+"static/media/cover4-4.0a256a939a3e47dd3a22.webp"},36153:(e,t,a)=>{e.exports=a.p+"static/media/cover5-1.d1515f6b1038aa4fc643.webp"},93116:(e,t,a)=>{e.exports=a.p+"static/media/cover5-2.bab5850c40faf6979c0d.webp"},83359:(e,t,a)=>{e.exports=a.p+"static/media/cover5-3.cf7f56796c7c25925a0e.webp"},80130:(e,t,a)=>{e.exports=a.p+"static/media/cover5-4.174e8c4fcc68694c34fe.webp"},23188:(e,t,a)=>{e.exports=a.p+"static/media/cover6-1.79813c0dc5f6ce45b5fd.webp"},98801:(e,t,a)=>{e.exports=a.p+"static/media/cover6-2.e12046268264f9971ebc.webp"},25174:(e,t,a)=>{e.exports=a.p+"static/media/cover6-3.2be114110033388cb23d.webp"},66683:(e,t,a)=>{e.exports=a.p+"static/media/cover6-4.9173d483b9dcc678edb5.webp"},42608:(e,t,a)=>{e.exports=a.p+"static/media/thumb1-1.24a73b1024d27480cef2.webp"},34909:(e,t,a)=>{e.exports=a.p+"static/media/thumb1-2.9d05045a28140de14697.webp"},91346:(e,t,a)=>{e.exports=a.p+"static/media/thumb1-3.6161a7df04e423691e17.webp"},40303:(e,t,a)=>{e.exports=a.p+"static/media/thumb1-4.e8d7fc40de3037747737.webp"},69125:(e,t,a)=>{e.exports=a.p+"static/media/thumb2-1.a442cb4f2618f5a372bd.webp"},30200:(e,t,a)=>{e.exports=a.p+"static/media/thumb2-2.9ff8f208a4a6d8486a44.webp"},15547:(e,t,a)=>{e.exports=a.p+"static/media/thumb2-3.2372bb7641d125f6c5ef.webp"},68150:(e,t,a)=>{e.exports=a.p+"static/media/thumb2-4.c29b8471dcaa027b5044.webp"},90486:(e,t,a)=>{e.exports=a.p+"static/media/thumb3-1.db3b7243d65206361197.webp"},15959:(e,t,a)=>{e.exports=a.p+"static/media/thumb3-2.300cb7d47e58cb3ea572.webp"},31252:(e,t,a)=>{e.exports=a.p+"static/media/thumb3-3.d95d43e238d5593c35fa.webp"},91461:(e,t,a)=>{e.exports=a.p+"static/media/thumb3-4.56f779aae821404dd1f5.webp"},6563:(e,t,a)=>{e.exports=a.p+"static/media/thumb4-1.723aa49a645fe9d0ef8a.webp"},25314:(e,t,a)=>{e.exports=a.p+"static/media/thumb4-2.989ed776e3318d2ee345.webp"},97229:(e,t,a)=>{e.exports=a.p+"static/media/thumb4-3.68e82343d6a803405b38.webp"},44860:(e,t,a)=>{e.exports=a.p+"static/media/thumb4-4.81c2b075f29e7b676a22.webp"},43988:(e,t,a)=>{e.exports=a.p+"static/media/thumb5-1.dc0252e2b451becfc94d.webp"},94353:(e,t,a)=>{e.exports=a.p+"static/media/thumb5-2.de0be5228406fdb6f648.webp"},94326:(e,t,a)=>{e.exports=a.p+"static/media/thumb5-3.81477369f7f924109dc1.webp"},46171:(e,t,a)=>{e.exports=a.p+"static/media/thumb5-4.5e4414667859686753dc.webp"},16345:(e,t,a)=>{e.exports=a.p+"static/media/thumb6-1.cf9893ecb529c0a4259a.webp"},36668:(e,t,a)=>{e.exports=a.p+"static/media/thumb6-2.1679863cd6c3b1afb87f.webp"},14911:(e,t,a)=>{e.exports=a.p+"static/media/thumb6-3.a6ddaa41047c3b6c8f88.webp"},33474:(e,t,a)=>{e.exports=a.p+"static/media/thumb6-4.28fef7a239e4c71d2e74.webp"},8548:(e,t,a)=>{a.d(t,{Wx:()=>b});var i=a(72176),s=Object.defineProperty,r=(e,t,a)=>((e,t,a)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a)(e,"symbol"!==typeof t?t+"":t,a),c=new Map,n=new WeakMap,d=0,o=void 0;function l(e){return Object.keys(e).sort().filter((t=>void 0!==e[t])).map((t=>{return`${t}_${"root"===t?(a=e.root,a?(n.has(a)||(d+=1,n.set(a,d.toString())),n.get(a)):"0"):e[t]}`;var a})).toString()}function p(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:o;if("undefined"===typeof window.IntersectionObserver&&void 0!==i){const s=e.getBoundingClientRect();return t(i,{isIntersecting:i,target:e,intersectionRatio:"number"===typeof a.threshold?a.threshold:0,time:0,boundingClientRect:s,intersectionRect:s,rootBounds:s}),()=>{}}const{id:s,observer:r,elements:n}=function(e){const t=l(e);let a=c.get(t);if(!a){const i=new Map;let s;const r=new IntersectionObserver((t=>{t.forEach((t=>{var a;const r=t.isIntersecting&&s.some((e=>t.intersectionRatio>=e));e.trackVisibility&&"undefined"===typeof t.isVisible&&(t.isVisible=r),null==(a=i.get(t.target))||a.forEach((e=>{e(r,t)}))}))}),e);s=r.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),a={id:t,observer:r,elements:i},c.set(t,a)}return a}(a),d=n.get(e)||[];return n.has(e)||n.set(e,d),d.push(t),r.observe(e),function(){d.splice(d.indexOf(t),1),0===d.length&&(n.delete(e),r.unobserve(e)),0===n.size&&(r.disconnect(),c.delete(s))}}i.Component;function b(){let{threshold:e,delay:t,trackVisibility:a,rootMargin:s,root:r,triggerOnce:c,skip:n,initialInView:d,fallbackInView:o,onChange:l}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var b;const[m,f]=i.useState(null),u=i.useRef(),[h,x]=i.useState({inView:!!d,entry:void 0});u.current=l,i.useEffect((()=>{if(n||!m)return;let i;return i=p(m,((e,t)=>{x({inView:e,entry:t}),u.current&&u.current(e,t),t.isIntersecting&&c&&i&&(i(),i=void 0)}),{root:r,rootMargin:s,threshold:e,trackVisibility:a,delay:t},o),()=>{i&&i()}}),[Array.isArray(e)?e.toString():e,m,r,s,c,n,a,o,t]);const v=null==(b=h.entry)?void 0:b.target,w=i.useRef();m||!v||c||n||w.current===v||(w.current=v,x({inView:!!d,entry:void 0}));const y=[f,h.inView,h.entry];return y.ref=y[0],y.inView=y[1],y.entry=y[2],y}}}]);
//# sourceMappingURL=7555.4506b011.chunk.js.map