"use strict";(self.webpackChunkfairbid_v2_frontend=self.webpackChunkfairbid_v2_frontend||[]).push([[5810],{82241:(e,t,i)=>{i.d(t,{A:()=>c});const a="style_header__gcoUG";var s=i(80812);const c=e=>{let{title:t,children:i}=e;return(0,s.jsxs)("div",{className:a,children:[(0,s.jsx)("h3",{children:t}),i]})}},51240:(e,t,i)=>{i.r(t),i.d(t,{default:()=>w});const a="style_wrapper__6IveU",s="style_slide__YRAr1",c="style_slide_grid__xGULI";var r=i(82241),n=i(90862),l=i(70493),d=i(56668),o=i(75204),p=i(72176),b=i(80840);const m=[{title:"Art \ud83c\udfa8",assets:[{title:"Art 1",image:i.p+"static/media/art1.08b0f77699cc28d0943b.webp"},{title:"Art 2",image:i.p+"static/media/art2.ed848966b170adcdb3fc.webp"},{title:"Art 3",image:i.p+"static/media/art3.95bf3d54ae2ef74cc124.webp"}]},{title:"Collectibles \u2728",assets:[{title:"Collectible 1",image:i.p+"static/media/col1.b21a9df030a97e756bb5.webp"},{title:"Collectible 2",image:i.p+"static/media/col2.56e22c690ff61fd82611.webp"},{title:"Collectible 3",image:i.p+"static/media/col3.cfdd6c733755dab68df0.webp"}]},{title:"Music \ud83c\udfb5",assets:[{title:"Music 1",image:i.p+"static/media/music1.087dcb26d99899348c97.webp"},{title:"Music 2",image:i.p+"static/media/music2.53f763b0db924b8f46b0.webp"},{title:"Music 3",image:i.p+"static/media/music3.75512972735dc57773b6.webp"}]},{title:"Photography \ud83d\udcf8",assets:[{title:"Photography 1",image:i.p+"static/media/photo1.b7ec08cf72f4c257183d.webp"},{title:"Photography 2",image:i.p+"static/media/photo2.2d6e1b38d3580e21d4d0.webp"},{title:"Photography 3",image:i.p+"static/media/photo3.51d06082d4f3123a553a.webp"}]},{title:"Virtual worlds \ud83c\udf0e",assets:[{title:"Virtual world 1",image:i.p+"static/media/virt1.5fe91030579683403b7f.webp"},{title:"Virtual world 2",image:i.p+"static/media/virt2.481d09e193dd4d75cbac.webp"},{title:"Virtual world 3",image:i.p+"static/media/virt3.0d8b984da99ec7f20187.webp"}]},{title:"Space \ud83d\ude80",assets:[{title:"Photography 1",image:i.p+"static/media/space1.7ee1a8e1440c152ce9a4.webp"},{title:"Photography 2",image:i.p+"static/media/space2.66ce6750814db1ed7ff8.webp"},{title:"Photography 3",image:i.p+"static/media/space3.08e7b1d664370daeac3f.webp"}]},{title:"Neon \ud83c\udf03",assets:[{title:"Photography 1",image:i.p+"static/media/neon1.4e94d54cb300c051208c.webp"},{title:"Photography 2",image:i.p+"static/media/neon2.b14cc4108862ab139c70.webp"},{title:"Photography 3",image:i.p+"static/media/neon3.9bd8c009e917d8bdc8ba.webp"}]},{title:"Cyberpunk \ud83e\udd16",assets:[{title:"Cyberpunk 1",image:i.p+"static/media/cyber1.c4dc4d19f1282c17d41c.webp"},{title:"Cyberpunk 2",image:i.p+"static/media/cyber2.516355838ba75bf79ae5.webp"},{title:"Cyberpunk 3",image:i.p+"static/media/cyber3.6355a1afb202422b0d2a.webp"}]},{title:"Bravery \ud83c\udf49",assets:[{title:"Ukraine 1",image:i.p+"static/media/ua1.65bc17f1604bc2830c35.webp"},{title:"Ukraine 2",image:i.p+"static/media/ua2.12dfebaecf1cc0eb8609.webp"},{title:"Ukraine 3",image:i.p+"static/media/ua3.656253c3042b2312135d.webp"}]}];var u=i(80812);const w=()=>{const[e,t]=(0,p.useState)(null),{width:i}=(0,b.A)();return(0,u.jsxs)("section",{children:[(0,u.jsx)("div",{className:"container",children:(0,u.jsx)(r.A,{title:"Browse by category",children:(0,u.jsx)(d.Ay,{swiper:e})})}),(0,u.jsx)("div",{className:`${a} container`,style:{marginLeft:i<1600?"auto":"calc((100% - 1400px) / 2)"},children:(0,u.jsx)(n.RC,{onSwiper:t,modules:[l.Ij,l.Vx],autoplay:{disableOnInteraction:!1,pauseOnMouseEnter:!0},speed:1500,spaceBetween:20,loop:!0,loopedSlides:4,slidesPerView:"auto",breakpoints:{0:{slidesPerView:1},640:{slidesPerView:2},1170:{slidesPerView:3},1600:{slidesPerView:5}},children:m.map(((e,t)=>(0,u.jsx)(n.qr,{children:(0,u.jsxs)("div",{className:`${s} border-hover bg-primary`,children:[(0,u.jsx)("div",{className:c,children:e.assets.map((e=>(0,u.jsx)("img",{className:"border-10",src:e.image,alt:e.title},e.title)))}),(0,u.jsx)(o.k2,{className:"slide_title link-hover h5",to:"/explore",children:e.title})]})},t)))})})]})}},56668:(e,t,i)=>{i.d(t,{Ay:()=>r,DU:()=>s,Rz:()=>c});var a=i(80812);const s=e=>{let{swiper:t,className:i}=e;return(0,a.jsx)("button",{className:`navigator navigator--prev ${i||""}`,onClick:()=>t.slidePrev(),"aria-label":"Previous slide",children:(0,a.jsx)("i",{className:"icon icon-angle-left"})})},c=e=>{let{swiper:t,className:i}=e;return(0,a.jsx)("button",{className:`navigator navigator--next ${i||""}`,onClick:()=>t.slideNext(),"aria-label":"Next slide",children:(0,a.jsx)("i",{className:"icon icon-angle-right"})})},r=e=>{let{swiper:t}=e;return(0,a.jsxs)("div",{className:"d-flex g-25",children:[(0,a.jsx)(s,{swiper:t}),(0,a.jsx)(c,{swiper:t})]})}},80840:(e,t,i)=>{i.d(t,{A:()=>l});var a=i(72176);const s=function(e){(0,a.useEffect)(e,[])};const c=function(e){var t=(0,a.useRef)(e);t.current=e,s((function(){return function(){return t.current()}}))};const r=function(e){var t=(0,a.useRef)(0),i=(0,a.useState)(e),s=i[0],r=i[1],n=(0,a.useCallback)((function(e){cancelAnimationFrame(t.current),t.current=requestAnimationFrame((function(){r(e)}))}),[]);return c((function(){cancelAnimationFrame(t.current)})),[s,n]};var n="undefined"!==typeof window;const l=function(e,t){void 0===e&&(e=1/0),void 0===t&&(t=1/0);var i=r({width:n?window.innerWidth:e,height:n?window.innerHeight:t}),s=i[0],c=i[1];return(0,a.useEffect)((function(){if(n){var e=function(){c({width:window.innerWidth,height:window.innerHeight})};return function(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];e&&e.addEventListener&&e.addEventListener.apply(e,t)}(window,"resize",e),function(){!function(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}(window,"resize",e)}}}),[]),s}}}]);
//# sourceMappingURL=5810.938ed243.chunk.js.map