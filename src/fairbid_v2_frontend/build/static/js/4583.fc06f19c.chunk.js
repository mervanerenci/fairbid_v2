(self.webpackChunkfairbid_v2_frontend=self.webpackChunkfairbid_v2_frontend||[]).push([[4583],{68875:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var a=n(49267),r=n(13933),i=n(80812);const o=a.Ay.div.withConfig({componentId:"sc-vvadym-0"})([".marquee{text-transform:uppercase;font-size:60px;height:60px;line-height:1;overflow:hidden;font-family:var(--heading-font);font-weight:600;background:var(--gradient);-webkit-background-clip:text;background-clip:text;text-fill-color:transparent;-webkit-text-fill-color:transparent;.icon{font-size:20px;margin:0 15px;}&-container{gap:20px;}}&.error{.marquee-container{gap:0 !important;}}@media screen and (min-width:768px){.marquee{font-size:120px;height:100px;.icon{font-size:40px;margin:0 30px;}&-container{gap:30px;}}}@media screen and (min-width:1170px){.marquee{font-size:200px;height:165px;&-container{gap:40px;}}&.error{.marquee-container{margin-top:-165px;}}}"]),s=e=>{let{text:t,isErrorPage:n=!1}=e;return(0,i.jsx)(o,{className:n?"error":"",children:(0,i.jsx)(r.A,{gradient:!1,speed:80,children:t})})}},94583:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>g});const a="style_list__OEEYw",r="style_list_item__RVl9j",i="style_img__iZUt4",o="style_title__5CKlu",s="style_text__tBq9W";var l=n(68875),c=n(26548),d=n(59066);n(72176);const u=n.p+"static/media/wallet.58e238d31a253e38562ced6ad5c38cc0.svg";const m=n.p+"static/media/folder.4483675336cad3c814ecaf1cea33aea7.svg";const f=n.p+"static/media/cloud.ad3efabcd1174345052d3d0b7f2f3d7b.svg";const p=n.p+"static/media/tags.5e68f0edc9d40a62de927cf87359834b.svg";var h=n(80812);const g=()=>{const e=[{icon:u,title:"Sign In with Internet Identity",text:"Easily get started with secure, on-chain transactions."},{icon:m,title:"Create Your Auction",text:"Choose your auction format, set the rules, and launch it with just a few clicks."},{icon:f,title:"Invite Buyers",text:"Share a link or QR code to invite buyers to your auction."},{icon:p,title:"Sell with No Fees",text:"List your items for auction and enjoy fee-free, gas-free ETH payments."}];return(0,h.jsxs)("div",{children:[(0,h.jsx)(l.A,{text:"Buy & sell with 0 fees"}),(0,h.jsx)("div",{className:"container",style:{marginTop:"10rem",marginBottom:"20rem"},children:(0,h.jsx)("div",{className:a,children:e.map(((e,t)=>(0,h.jsxs)(d.A,{className:r,index:t,children:[(0,h.jsx)(c.A,{className:i,src:e.icon,alt:e.title,effect:"opacity"}),(0,h.jsx)("h5",{className:o,children:e.title}),(0,h.jsx)("p",{className:s,children:e.text})]},t)))})})]})}},13933:(e,t,n)=>{var a=n(72176);function r(e){return e&&"object"===typeof e&&"default"in e?e:{default:e}}var i=r(a);!function(e){if(!e||"undefined"===typeof window)return;const t=document.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t)}('.rfm-marquee-container {\n  overflow-x: hidden;\n  display: flex;\n  flex-direction: row;\n  position: relative;\n  width: var(--width);\n  transform: var(--transform);\n}\n.rfm-marquee-container:hover div {\n  animation-play-state: var(--pause-on-hover);\n}\n.rfm-marquee-container:active div {\n  animation-play-state: var(--pause-on-click);\n}\n\n.rfm-overlay {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.rfm-overlay::before, .rfm-overlay::after {\n  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));\n  content: "";\n  height: 100%;\n  position: absolute;\n  width: var(--gradient-width);\n  z-index: 2;\n  pointer-events: none;\n  touch-action: none;\n}\n.rfm-overlay::after {\n  right: 0;\n  top: 0;\n  transform: rotateZ(180deg);\n}\n.rfm-overlay::before {\n  left: 0;\n  top: 0;\n}\n\n.rfm-marquee {\n  flex: 0 0 auto;\n  min-width: var(--min-width);\n  z-index: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);\n  animation-play-state: var(--play);\n  animation-delay: var(--delay);\n  animation-direction: var(--direction);\n}\n@keyframes scroll {\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(-100%);\n  }\n}\n\n.rfm-initial-child-container {\n  flex: 0 0 auto;\n  display: flex;\n  min-width: auto;\n  flex-direction: row;\n  align-items: center;\n}\n\n.rfm-child {\n  transform: var(--transform);\n}');const o=a.forwardRef((function(e,t){let{style:n={},className:r="",autoFill:o=!1,play:s=!0,pauseOnHover:l=!1,pauseOnClick:c=!1,direction:d="left",speed:u=50,delay:m=0,loop:f=0,gradient:p=!1,gradientColor:h="white",gradientWidth:g=200,onFinish:v,onCycleComplete:y,onMount:x,children:w}=e;const[b,_]=a.useState(0),[k,E]=a.useState(0),[C,N]=a.useState(1),[j,q]=a.useState(!1),A=a.useRef(null),z=t||A,M=a.useRef(null),R=a.useCallback((()=>{if(M.current&&z.current){const e=z.current.getBoundingClientRect(),t=M.current.getBoundingClientRect();let n=e.width,a=t.width;"up"!==d&&"down"!==d||(n=e.height,a=t.height),N(o&&n&&a&&a<n?Math.ceil(n/a):1),_(n),E(a)}}),[o,z,d]);a.useEffect((()=>{if(j&&(R(),M.current&&z.current)){const e=new ResizeObserver((()=>R()));return e.observe(z.current),e.observe(M.current),()=>{e&&e.disconnect()}}}),[R,z,j]),a.useEffect((()=>{R()}),[R,w]),a.useEffect((()=>{q(!0)}),[]),a.useEffect((()=>{"function"===typeof x&&x()}),[]);const S=a.useMemo((()=>o?k*C/u:k<b?b/u:k/u),[o,b,k,C,u]),B=a.useMemo((()=>Object.assign(Object.assign({},n),{"--pause-on-hover":!s||l?"paused":"running","--pause-on-click":!s||l&&!c||c?"paused":"running","--width":"up"===d||"down"===d?"100vh":"100%","--transform":"up"===d?"rotate(-90deg)":"down"===d?"rotate(90deg)":"none"})),[n,s,l,c,d]),I=a.useMemo((()=>({"--gradient-color":h,"--gradient-width":"number"===typeof g?`${g}px`:g})),[h,g]),O=a.useMemo((()=>({"--play":s?"running":"paused","--direction":"left"===d?"normal":"reverse","--duration":`${S}s`,"--delay":`${m}s`,"--iteration-count":f?`${f}`:"infinite","--min-width":o?"auto":"100%"})),[s,d,S,m,f,o]),F=a.useMemo((()=>({"--transform":"up"===d?"rotate(90deg)":"down"===d?"rotate(-90deg)":"none"})),[d]),$=a.useCallback((e=>[...Array(Number.isFinite(e)&&e>=0?e:0)].map(((e,t)=>i.default.createElement(a.Fragment,{key:t},a.Children.map(w,(e=>i.default.createElement("div",{style:F,className:"rfm-child"},e))))))),[F,w]);return j?i.default.createElement("div",{ref:z,style:B,className:"rfm-marquee-container "+r},p&&i.default.createElement("div",{style:I,className:"rfm-overlay"}),i.default.createElement("div",{className:"rfm-marquee",style:O,onAnimationIteration:y,onAnimationEnd:v},i.default.createElement("div",{className:"rfm-initial-child-container",ref:M},a.Children.map(w,(e=>i.default.createElement("div",{style:F,className:"rfm-child"},e)))),$(C-1)),i.default.createElement("div",{className:"rfm-marquee",style:O},$(C))):null}));t.A=o}}]);
//# sourceMappingURL=4583.fc06f19c.chunk.js.map