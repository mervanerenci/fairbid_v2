"use strict";(self.webpackChunkfairbid_v2_frontend=self.webpackChunkfairbid_v2_frontend||[]).push([[4278],{75940:(e,a,t)=>{t.d(a,{A:()=>v});const i="style_wrapper__TNWNp",s="style_wrapper_content__wnkG8",c="style_qty__ntBx3",r="style_media__8kuTA",d="style_media_cover__s3DBB",l="style_media_thumbs__nlxj0",o="style_slide__Y-XnW";var b=t(85375),p=t(90862),m=t(70493),n=t(59066),u=t(72176),f=t(12945),h=t(80812);const v=e=>{let{item:a,index:t,isPrivate:v=!1}=e;const[w,y]=(0,u.useState)(null);return(0,h.jsx)(n.A,{index:t,children:(0,h.jsxs)("div",{className:`${i} border-hover bg-primary`,children:[(0,h.jsxs)("div",{className:s,children:[(0,h.jsx)("h4",{children:a.title}),(0,h.jsxs)("h6",{className:c,children:[(0,f.c4)(a.qty)," NFT"]}),(0,h.jsx)(b.A,{avatar:a.author.avatar,name:a.author.nickname,style:{pointerEvents:v?"none":"auto"}})]}),(0,h.jsx)("div",{className:`${r} shadow-overlay border-10`,children:(0,h.jsxs)("div",{children:[(0,h.jsx)(p.RC,{className:d,modules:[m._R,m.WO,m.Ij],effect:"fade",fadeEffect:{crossFade:!0},loop:!0,speed:1500,thumbs:{swiper:w&&!w.destroyed?w:null},autoplay:{delay:3e3},children:a.media.map(((e,t)=>(0,h.jsx)(p.qr,{children:(0,h.jsx)("img",{src:e.full,alt:a.title})},t)))}),(0,h.jsx)(p.RC,{className:l,onSwiper:y,modules:[m.WO],spaceBetween:10,slidesPerView:"auto",breakpoints:{0:{slidesPerView:3}},loop:!0,speed:1500,children:a.media.map(((e,t)=>(0,h.jsx)(p.qr,{className:`${o} square border-10`,children:(0,h.jsx)("img",{src:e.thumbnail,alt:a.title})},t)))})]})})]})})}},51887:(e,a,t)=>{t.d(a,{A:()=>h});const i="style_grid__tW0yg",s={wrapper:"style_wrapper__sFReK",media:"style_media__S+OOh",main_price:"style_main_price__q6K8m",main_btn:"style_main_btn__TCS-3"};var c=t(26548),r=t(75204),d=t(94157),l=t(95548),o=(t(8358),t(59066)),b=t(37237),p=t.n(b),m=t(54480),n=t(80812);const u=e=>{let{item:a,isPrivate:t,index:i}=e;const{title:b,price:u,image:f,author:h,qty:v,available:w,hot:y,likes:x,isLiked:g}=a,{openBidModal:k}=(0,m.pZ)();return(0,n.jsx)(o.A,{index:i,children:(0,n.jsxs)("div",{className:`${s.wrapper} border-hover bg-primary`,children:[(0,n.jsxs)("div",{className:"author d-flex align-items-center g-10",children:[(0,n.jsx)(l.A,{src:h.avatar,alt:h.nickname,size:"xs",isVerified:h.isVerified}),(0,n.jsxs)(r.k2,{className:"text-sm text-bold text-light link-hover link-hover--invert",to:"/author",style:{pointerEvents:t?"none":"auto"},children:["@",h.nickname]})]}),(0,n.jsx)("div",{className:`${s.media} square border-10`,children:(0,n.jsx)(c.A,{src:f,alt:b})}),(0,n.jsxs)("div",{className:s.main,children:[(0,n.jsxs)("div",{className:"d-flex align-items-center justify-content-between g-10",children:[(0,n.jsx)(r.k2,{className:"h6 text-overflow link-hover",to:"/explore/item",children:b}),(0,n.jsx)("button",{"aria-label":"Menu",children:(0,n.jsx)("i",{className:"icon icon-ellipsis"})})]}),(0,n.jsxs)("div",{className:`${s.main_price} text-sm text-bold`,children:[(0,n.jsx)("div",{className:"d-flex g-10",children:(0,n.jsxs)("span",{children:[u," ETH"]})}),!t&&(0,n.jsx)(d.Ay,{date:p()(y).valueOf(),renderer:e=>{let{days:a,hours:t,minutes:i}=e;return(0,n.jsxs)("span",{className:"text-sm text-light",children:["\ud83d\udd25 ",a,"d ",t,"h ",i,"m"]})}})]}),(0,n.jsx)("div",{className:"d-flex justify-content-between",children:(0,n.jsx)("button",{className:`${s.main_btn} text-accent text-sm link-hover link-hover--invert`,onClick:k,children:t?"Buy now":"Place a bid"})})]})]})})};var f=t(54676);const h=e=>{let{variant:a,items:t=f.A,isPrivate:s=!1,className:c}=e;const r="preview"===a?t.slice(0,8):t;return(0,n.jsx)("div",{className:`${i} ${c||""} items-grid`,id:"items",children:r.map(((e,a)=>(0,n.jsx)(u,{item:e,index:a,isPrivate:s},e.id)))})}},26548:(e,a,t)=>{t.d(a,{A:()=>c});var i=t(23893),s=(t(72991),t(69889),t(80812));const c=e=>{let{src:a,alt:t,effect:c="blur",className:r,...d}=e;return(0,s.jsx)(i.LazyLoadImage,{src:a,alt:t,effect:c,wrapperClassName:`${r||""} lazy-image`,...d})}},59066:(e,a,t)=>{t.d(a,{A:()=>r});var i=t(21593),s=t(8548),c=t(80812);const r=e=>{let{children:a,index:t=1,className:r,type:d="slide",delay:l,...o}=e;const[b,p]=(0,s.Wx)({threshold:.2,triggerOnce:!0}),m={config:{duration:300,mass:1,tension:300,friction:30},delay:o.delay?o.delay:100*t},n={slide:(0,i.zh)({from:{transform:"translateY(40px)",opacity:0},to:{transform:p?"translateY(0px)":"translateY(40px)",opacity:p?1:0},...m,...o}),fade:(0,i.zh)({from:{opacity:0},to:{opacity:p?1:0},...m,...o}),grow:(0,i.zh)({from:{transform:"scale(0.4)"},to:{transform:p?"scale(1)":"scale(0.4)"},...m,...o})};return(0,c.jsx)(i.CS.div,{className:r||"",style:n[d],ref:b,children:a})}},59499:(e,a,t)=>{t.d(a,{A:()=>c});var i=t(71126),s=t(80812);const c=e=>{let{title:a}=e;return(0,s.jsx)(i.m,{children:(0,s.jsxs)("title",{children:[a," | Fairbid"]})})}},54676:(e,a,t)=>{t.d(a,{A:()=>Q});var i=t(37237),s=t.n(i),c=t(19702),r=t(28951),d=t(87092),l=t(13285),o=t(92186),b=t(71707),p=t(28888),m=t(26441),n=t(56718),u=t(58),f=t(21157),h=t(36760),v=t(26293),w=t(33864),y=t(73771),x=t(16006),g=t(30849),k=t(10212),q=t(63911),j=t(47362),_=t(2925),N=t(42923),L=t(8680),A=t(43637);const V=t.p+"static/media/avatar1.90d71b0d2c8add95299e.webp",P=t.p+"static/media/avatar2.77605600a6df37ea19b0.webp",C=t.p+"static/media/avatar3.e0e398041b4256b949e9.webp",$=t.p+"static/media/avatar4.e0a2cc4231271d0a003d.webp",B=t.p+"static/media/avatar5.7aabd1378c18cf4e1cf1.webp",S=t.p+"static/media/avatar6.471f8c4c161f24c296b4.webp",z=t.p+"static/media/avatar7.9c55250117e7fd75f2a1.webp",O=t.p+"static/media/avatar8.4f2a10529ff2cf8c8009.webp",T=t.p+"static/media/avatar9.81b2ed8ddab197018fcd.webp",E=t.p+"static/media/avatar10.a658264fc78022d1e388.webp",F=t.p+"static/media/avatar11.0f5e6a90df8425fea92b.webp",I=t.p+"static/media/avatar12.b2b0da0a041ab9fbfa89.webp",M=t.p+"static/media/avatar13.95fa01991a9a720afbff.webp",R=t.p+"static/media/avatar14.5975a6dac1d42bb72a5b.webp",W=t.p+"static/media/avatar15.1eb0960972ebbb9255a8.webp",D=t.p+"static/media/avatar16.5c0f917199f1540ff485.webp",G=t.p+"static/media/avatar17.0b47b2a00745c148efbe.webp",K=t.p+"static/media/avatar18.c320c79914f2d04a23c9.webp",Y=t.p+"static/media/avatar19.a0ffa2a236feaa4d8516.webp",X=t.p+"static/media/avatar20.e89102012a50e6e2921c.webp",H=t.p+"static/media/avatar21.fff3f3b56b170cd71bc8.webp",U=t.p+"static/media/avatar22.a0c506a08c3bf8242ad6.webp",Z=t.p+"static/media/avatar23.285074975b7167978f58.webp",J=t.p+"static/media/avatar24.e634811b107680f6c363.webp",Q=[{id:"item-1",author:{nickname:"narandro",avatar:V,isVerified:!0},image:c,title:"Colorful 3D object",price:.08,qty:1,available:1,likes:220,hot:s()().add(1,"days"),categories:["art","domain","collectibles"],statuses:["offer","auction"],type:"video"},{id:"item-2",author:{nickname:"navekita",avatar:P,isVerified:!0},image:r,title:"Infinite figure",price:1.1,qty:1,available:1,likes:34,hot:s()().add({days:1,hours:12}),categories:["music","sports","collectibles"],statuses:["new"],type:"img"},{id:"item-3",author:{nickname:"gayoren",avatar:C,isVerified:!1},image:d,title:"Pixel art",price:.114,qty:1,available:1,likes:1124,hot:s()().add(12,"days"),categories:["photo"],statuses:["new","now"],type:"img"},{id:"item-4",author:{nickname:"emarwi",avatar:$,isVerified:!0},image:l,title:"The image of a man",price:19.9,qty:2,available:1,likes:2358,hot:s()().add(26,"days"),categories:["photo","utility"],statuses:["offer","auction"],type:"3d"},{id:"item-5",author:{nickname:"zikez",avatar:B,isVerified:!1},image:o,title:"Bananaaa",price:1.88,qty:3,available:1,likes:168,hot:s()().add({days:20,hours:10}),categories:["trading","virtual","art"],statuses:["offer","auction"],type:"img"},{id:"item-6",author:{nickname:"yokoooo",avatar:S,isVerified:!0},image:b,title:"Pixel art",price:1.489,qty:1,available:1,likes:380,hot:s()().add({days:7,hours:3}),categories:["domain","sports","art"],statuses:["new","now"],type:"3d"},{id:"item-7",author:{nickname:"judadz",avatar:z,isVerified:!0},image:p,title:"Colorful 3D object",price:.08,qty:1,available:1,likes:220,hot:s()().add({days:28,hours:12,minutes:30}),categories:["art","domain","collectibles"],statuses:["offer","auction","new"],type:"video"},{id:"item-8",author:{nickname:"poldommmyrol",avatar:O,isVerified:!1},image:m,title:"Infinite figure",price:1.1,qty:1,available:1,likes:34,hot:s()().add({days:1,hours:12}),categories:["music","sports","virtual"],statuses:["new"],type:"img"},{id:"item-9",author:{nickname:"hollywood",avatar:T,isVerified:!0},image:n,title:"Outta space",price:.114,qty:1,available:1,likes:1124,hot:s()().add(12,"days"),categories:["domain"],statuses:["new","now"],type:"3d"},{id:"item-10",author:{nickname:"voltage220",avatar:E,isVerified:!0},image:u,title:"Responsibility",price:19.9,qty:2,available:1,likes:2358,hot:s()().add(26,"days"),categories:["photo","utility"],statuses:["offer","auction"],type:"img"},{id:"item-11",author:{nickname:"soulhunter",avatar:F,isVerified:!1},image:f,title:"Mother Earth",price:1.88,qty:3,available:1,likes:777,hot:s()().add({days:20,hours:10}),categories:["music","virtual","art"],statuses:["offer","auction"],type:"video"},{id:"item-12",author:{nickname:"layla",avatar:I,isVerified:!1},image:h,title:"Daydreamin",price:1.489,qty:1,available:1,likes:380,hot:s()().add({days:7,hours:3}),categories:["domain","sports","art"],statuses:["offer","now"],type:"3d"},{id:"item-13",author:{nickname:"peek-a-boo",avatar:M,isVerified:!0},image:v,title:"Think pink",price:1.49,qty:1,available:1,likes:921,hot:s()().add({days:28,hours:12,minutes:30}),categories:["virtual","domain","music"],statuses:["offer","auction","new"],type:"img"},{id:"item-14",author:{nickname:"cervezachille",avatar:R,isVerified:!1},image:w,title:"Alien blood",price:1.1,qty:1,available:1,likes:9784,hot:s()().add({days:1,hours:12}),categories:["music","sports","domain"],statuses:["now"],type:"3d"},{id:"item-15",author:{nickname:"bigfoot",avatar:W,isVerified:!0},image:y,title:"Underwater",price:.35,qty:1,available:1,likes:3784,hot:s()().add(12,"days"),categories:["music"],statuses:["offer"],type:"img"},{id:"item-16",author:{nickname:"sk8erboi",avatar:D,isVerified:!0},image:x,title:"Golden Age",price:7.04,qty:2,available:1,likes:201,hot:s()().add(2,"days"),categories:["sports","collectibles","art"],statuses:["new","auction"],type:"video"},{id:"item-17",author:{nickname:"diamondhead",avatar:G,isVerified:!1},image:g,title:"Prismatic",price:10.1,qty:1,available:1,likes:310,hot:s()().add({days:5,hours:8}),categories:["sports","virtual"],statuses:["offer","auction"],type:"3d"},{id:"item-18",author:{nickname:"wellington",avatar:K,isVerified:!1},image:k,title:"Tranquility",price:.1,qty:1,available:1,likes:791,hot:s()().add({days:1,hours:12}),categories:["art"],statuses:["now","auction"],type:"img"},{id:"item-19",author:{nickname:"iamwhoiam",avatar:Y,isVerified:!0},image:q,title:"Labyrinth",price:1.82,qty:1,available:1,likes:347,hot:s()().add(12,"days"),categories:["music","photo"],statuses:["new","auction"],type:"3d"},{id:"item-20",author:{nickname:"tellmemore",avatar:X,isVerified:!1},image:j,title:"Octopus Garden",price:.1,qty:1,available:1,likes:123,hot:s()().add(26,"days"),categories:["music","virtual","collectibles"],statuses:["offer","new"],type:"video"},{id:"item-21",author:{nickname:"savage",avatar:H,isVerified:!1},image:_,title:"Cooldown",price:10.11,qty:1,available:1,likes:5912,hot:s()().add(1,"days"),categories:["music","sports","art"],statuses:["now"],type:"img"},{id:"item-22",author:{nickname:"hippieeesoul",avatar:U,isVerified:!0},image:N,title:"Crystal Waterfall",price:2.84,qty:4,available:2,likes:98710,hot:s()().add(17,"days"),categories:["collectibles","virtual","art"],statuses:["offer","auction"],type:"video"},{id:"item-23",author:{nickname:"crybaby",avatar:Z,isVerified:!0},image:L,title:"Sahara",price:7.18,qty:1,available:1,likes:1468,hot:s()().add(3,"days"),categories:["sports","photo"],statuses:["new","auction"],type:"3d"},{id:"item-24",author:{nickname:"tripplethreat",avatar:J,isVerified:!0},image:A,title:"The Great Escape",price:.1,qty:1,available:1,likes:666,hot:s()().add(10,"hours"),categories:["music","sports","photo"],statuses:["offer","auction"],type:"img"}]},55751:(e,a,t)=>{t.d(a,{A:()=>na});var i=t(32335),s=t(26293),c=t(33864),r=t(73771),d=t(16006),l=t(30849),o=t(10212),b=t(63911),p=t(47362),m=t(2925),n=t(42923),u=t(8680),f=t(43637),h=t(19702),v=t(28951),w=t(87092),y=t(13285),x=t(92186),g=t(71707),k=t(28888),q=t(26441),j=t(56718),_=t(58),N=t(21157),L=t(36760),A=t(42608),V=t(34909),P=t(91346),C=t(40303),$=t(39557),B=t(55160),S=t(97979),z=t(29622),O=t(69125),T=t(30200),E=t(15547),F=t(68150),I=t(96688),M=t(90941),R=t(88178),W=t(26959),D=t(90486),G=t(15959),K=t(31252),Y=t(91461),X=t(72255),H=t(62654),U=t(73689),Z=t(72672),J=t(6563),Q=t(25314),ee=t(97229),ae=t(44860),te=t(86458),ie=t(73307),se=t(96856),ce=t(5425),re=t(43988),de=t(94353),le=t(94326),oe=t(46171),be=t(36153),pe=t(93116),me=t(83359),ne=t(80130),ue=t(16345),fe=t(36668),he=t(14911),ve=t(33474),we=t(23188),ye=t(98801),xe=t(25174),ge=t(66683);const ke=t.p+"static/media/thumb7-1.568feedbe927336ffab6.webp",qe=t.p+"static/media/thumb7-2.fa36d208e6f59de8f05f.webp",je=t.p+"static/media/thumb7-3.f3ef509d6680caac5e72.webp",_e=t.p+"static/media/thumb7-4.f5db9bc2e5826b93ae5a.webp",Ne=t.p+"static/media/cover7-1.d55d8acf712e54a9da4e.webp",Le=t.p+"static/media/cover7-2.9ff8c3a77c4177557fe2.webp",Ae=t.p+"static/media/cover7-3.d05134516053e34e07e7.webp",Ve=t.p+"static/media/cover7-4.00bd24ae23158ab6790b.webp",Pe=t.p+"static/media/thumb8-1.ee7579d99c074ecb4c98.webp",Ce=t.p+"static/media/thumb8-2.f181fde3a4a96ae12fa6.webp",$e=t.p+"static/media/thumb8-3.7b1b03e3ad5551b2b533.webp",Be=t.p+"static/media/thumb8-4.25c4116225e18d86cd20.webp",Se=t.p+"static/media/cover8-1.706ef5218321662d6878.webp",ze=t.p+"static/media/cover8-2.8cf2d47b8213645acdb0.webp",Oe=t.p+"static/media/cover8-3.0ba926ddb14ed8e28b10.webp",Te=t.p+"static/media/cover8-4.e4836f21f0b469c4e662.webp",Ee=t.p+"static/media/thumb9-1.3f20438eaf8538bfc515.webp",Fe=t.p+"static/media/thumb9-2.ba0fc868267ead8338ef.webp",Ie=t.p+"static/media/thumb9-3.ef8da15f816680ae0734.webp",Me=t.p+"static/media/thumb9-4.a7055cc13837b7df4679.webp",Re=t.p+"static/media/cover9-1.bf9ac90541cea3088dea.webp",We=t.p+"static/media/cover9-2.848cc8bc6de8c2c0baf9.webp",De=t.p+"static/media/cover9-3.58346ea4b59c28f4e853.webp",Ge=t.p+"static/media/cover9-4.9d386d706e856af8df9c.webp",Ke=t.p+"static/media/thumb10-1.137c87183ebb9b00ad75.webp",Ye=t.p+"static/media/thumb10-2.35cbd38521aa0d04b85f.webp",Xe=t.p+"static/media/thumb10-3.b2dfb87727dad20731e2.webp",He=t.p+"static/media/thumb10-4.486196dc6f0a0fadb5b1.webp",Ue=t.p+"static/media/cover10-1.f5605650ec09c145bda8.webp",Ze=t.p+"static/media/cover10-2.c19adb683528744bbe35.webp",Je=t.p+"static/media/cover10-3.393f9b675c980002272d.webp",Qe=t.p+"static/media/cover10-4.6e4deeae924015abdc62.webp",ea=t.p+"static/media/thumb11-1.1d9d0ed5588c301053fa.webp",aa=t.p+"static/media/thumb11-2.90393083aa3e73bb1737.webp",ta=t.p+"static/media/thumb11-3.6ebc65b8783d23076c54.webp",ia=t.p+"static/media/thumb11-4.c367bbc3ce2c5bf0729f.webp",sa=t.p+"static/media/cover11-1.1a87d1b744cb5d8e7b79.webp",ca=t.p+"static/media/cover11-2.ebf9ba4db61f147c14ba.webp",ra=t.p+"static/media/cover11-3.46688d70225ac62fa6d4.webp",da=t.p+"static/media/cover11-4.556be11320b18b994cd9.webp",la=t.p+"static/media/thumb12-1.7ad1f0234eecd22d782d.webp",oa=t.p+"static/media/thumb12-2.a57e4549369a5b7bab26.webp",ba=t.p+"static/media/thumb12-3.a1f25e86fa1c3f5b3201.webp",pa=t.p+"static/media/thumb12-4.96bc5611b5ab2451bba8.webp",ma={nickname:"ventuniconeymon",avatar:i,isVerified:!0},na={creations:[{id:"creation-1",image:s,title:"3d colored background",author:ma,price:3,qty:1,available:1,likes:168,isLiked:!1},{id:"creation-2",image:c,title:"Abstract prism",author:ma,price:.12,qty:4,available:1,likes:380,isLiked:!1},{id:"creation-3",image:r,title:"Blue abstract",author:ma,price:.941,qty:2,available:1,likes:15,isLiked:!0},{id:"creation-4",image:d,title:"Ancient gold",author:ma,price:.52,qty:1,available:1,likes:458,isLiked:!1},{id:"creation-5",image:l,title:"Handmade Painting",author:ma,price:1.15,qty:1,available:1,likes:227,isLiked:!0},{id:"creation-6",image:o,title:"Bad trip",author:ma,price:2.66,qty:8,available:1,likes:1504,isLiked:!1},{id:"creation-7",image:b,title:"Labyrinth of the mind",author:ma,price:.41,qty:1,available:1,likes:711,isLiked:!1},{id:"creation-8",image:p,title:"Outer space",author:ma,price:.41,qty:2,available:2,likes:2548,isLiked:!0},{id:"creation-9",image:m,title:"Imaginary world",author:ma,price:.99,qty:3,available:1,likes:9787,isLiked:!1},{id:"creation-10",image:n,title:"Bottle of dreams",author:ma,price:7.1,qty:1,available:1,likes:507,isLiked:!1},{id:"creation-11",image:u,title:"Sands of Sahara",author:ma,price:10.417,qty:1,available:1,likes:725,isLiked:!1},{id:"creation-12",image:f,title:"Back to the future",author:ma,price:.15,qty:1,available:1,likes:496,isLiked:!0},{id:"creation-13",image:h,title:"Android DNA",author:ma,price:.74,qty:5,available:1,likes:124,isLiked:!1},{id:"creation-14",image:v,title:"Pink eternity",author:ma,price:2.18,qty:2,available:1,likes:1874,isLiked:!0},{id:"creation-15",image:w,title:"Pixel landscape",author:ma,price:1.12,qty:1,available:1,likes:145,isLiked:!1},{id:"creation-16",image:y,title:"Flower power",author:ma,price:4.25,qty:1,available:1,likes:499,isLiked:!0},{id:"creation-17",image:x,title:"Banana split",author:ma,price:7.15,qty:1,available:1,likes:897,isLiked:!1},{id:"creation-18",image:g,title:"Pixel flowers",author:ma,price:.08,qty:7,available:4,likes:234,isLiked:!0},{id:"creation-19",image:k,title:"Forever together",author:ma,price:.33,qty:2,available:2,likes:698,isLiked:!1},{id:"creation-20",image:q,title:"Baby ghost",author:ma,price:.451,qty:2,available:1,likes:444,isLiked:!1},{id:"creation-21",image:j,title:"Synthetic UFO",author:ma,price:.84,qty:1,available:1,likes:387,isLiked:!1},{id:"creation-22",image:_,title:"Socially responsible",author:ma,price:9.29,qty:1,available:1,likes:7458,isLiked:!0},{id:"creation-23",image:N,title:"Embrace the Earth",author:ma,price:17.51,qty:1,available:1,likes:2841,isLiked:!1},{id:"creation-24",image:L,title:"Dream vacation",author:ma,price:.61,qty:1,available:1,likes:504,isLiked:!1}],collections:[{title:"3d vector characters",qty:30,author:ma,media:[{thumbnail:A,full:$},{thumbnail:V,full:B},{thumbnail:P,full:S},{thumbnail:C,full:z}]},{title:"Figure collection",qty:26,author:ma,media:[{thumbnail:O,full:I},{thumbnail:T,full:M},{thumbnail:E,full:R},{thumbnail:F,full:W}]},{title:"Creative art collection",qty:9,author:ma,media:[{thumbnail:D,full:X},{thumbnail:G,full:H},{thumbnail:K,full:U},{thumbnail:Y,full:Z}]},{title:"The image of a man",qty:54,author:ma,media:[{thumbnail:J,full:te},{thumbnail:Q,full:ie},{thumbnail:ee,full:se},{thumbnail:ae,full:ce}]},{title:"Solar system",qty:8,author:ma,media:[{thumbnail:re,full:be},{thumbnail:de,full:pe},{thumbnail:le,full:me},{thumbnail:oe,full:ne}]},{title:"Colored backgrounds",qty:38,author:ma,media:[{thumbnail:ue,full:we},{thumbnail:fe,full:ye},{thumbnail:he,full:xe},{thumbnail:ve,full:ge}]},{title:"Blue for you",qty:12,author:ma,media:[{thumbnail:ke,full:Ne},{thumbnail:qe,full:Le},{thumbnail:je,full:Ae},{thumbnail:_e,full:Ve}]},{title:"Lucid dreams",qty:5,author:ma,media:[{thumbnail:Pe,full:Se},{thumbnail:Ce,full:ze},{thumbnail:$e,full:Oe},{thumbnail:Be,full:Te}]},{title:"Plasticine",qty:7,author:ma,media:[{thumbnail:Ee,full:Re},{thumbnail:Fe,full:We},{thumbnail:Ie,full:De},{thumbnail:Me,full:Ge}]},{title:"Back to black",qty:29,author:ma,media:[{thumbnail:Ke,full:Ue},{thumbnail:Ye,full:Ze},{thumbnail:Xe,full:Je},{thumbnail:He,full:Qe}]},{title:"Isometric air",qty:10,author:ma,media:[{thumbnail:ea,full:sa},{thumbnail:aa,full:ca},{thumbnail:ta,full:ra},{thumbnail:ia,full:da}]},{title:"Futurista",qty:48,author:ma,media:[{thumbnail:la,full:t.p+"static/media/cover12-1.79e60918722fb7e38ae8.webp"},{thumbnail:oa,full:t.p+"static/media/cover12-2.89abaada00aab63d22ac.webp"},{thumbnail:ba,full:t.p+"static/media/cover12-3.0b68a929f0588d267076.webp"},{thumbnail:pa,full:t.p+"static/media/cover12-4.001db7d56c92eeeeb1a9.webp"}]}]}},53102:(e,a,t)=>{t.d(a,{A:()=>s});var i=t(72176);const s=function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;const[t,s]=(0,i.useState)(!0),[c,r]=(0,i.useState)(0),d=Math.ceil(e.length/a),l=(0,i.useRef)(null);(0,i.useEffect)((()=>{t?s(!1):l.current.scrollIntoView({behavior:"smooth"})}),[c]);const o=()=>{const t=c*a,i=t+a;return e.slice(t,i)};(0,i.useEffect)((()=>{c>d-1?r(d-1):c<0&&d>0&&r(0)}),[o()]);return{next:()=>{r((e=>Math.min(e+1,d)))},prev:()=>{r((e=>Math.max(e-1,0)))},goToPage:e=>{const a=Math.max(0,e);r((()=>Math.min(a,d)))},showingOf:()=>{const t=c*a,i=e.length>a?t+a:e.length;return e.length>0?`Showing ${t+1}-${i} of ${e.length} results`:""},currentItems:o,currentPage:c,maxPage:d,containerRef:l}}},85375:(e,a,t)=>{t.d(a,{A:()=>p});const i="style_container__ax2tb",s="style_avatar__PFOLm";var c=t(75204),r=t(26548),d=t(72176);const l=t.p+"static/media/xchain.f88c8bc1706c6340e80d90a8cc12f3e5.svg";var o=t(80812);const b=e=>{let{avatar:a=l,name:t="Xchain",...d}=e;return(0,o.jsxs)("div",{className:`${i} d-flex align-items-center g-10 bg-secondary`,...d,children:[(0,o.jsx)(r.A,{className:s,src:a,alt:t}),(0,o.jsx)(c.k2,{to:"/author",children:"Xchain"===t?t:`@${t}`})]})},p=(0,d.memo)(b)},95548:(e,a,t)=>{t.d(a,{A:()=>b});var i=t(26548),s=t(21346),c=t.n(s),r=t(72176);const d=t.p+"static/media/verified.d712db63e7c4123b870c80f47dbeaf91.svg";var l=t(80812);const o=e=>{let{src:a,alt:t,size:s,isVerified:r,className:o}=e;return(0,l.jsxs)("div",{className:c()("avatar-wrapper",s,o),children:[(0,l.jsx)(i.A,{className:"avatar",src:a,alt:t}),r&&(0,l.jsx)(i.A,{className:"verified",src:d,alt:"verified",effect:"opacity"})]})},b=(0,r.memo)(o)},8358:(e,a,t)=>{t(72176),t(21346),t(80812)},78741:(e,a,t)=>{t.d(a,{A:()=>l});const i="style_wrapper__CtKLE",s="style_btn__LG+VL";var c=t(21346),r=t.n(c),d=t(80812);const l=e=>{let{pagination:a}=e;const t=a.maxPage;return(0,d.jsxs)("div",{className:i,children:[(0,d.jsx)("button",{className:"btn btn--outline text-sm",onClick:a.prev,disabled:a.currentPage<=0,"aria-label":"Previous page",children:"prev"}),(0,d.jsx)("div",{className:"d-flex g-10",children:[...Array(t)].map(((e,t)=>(0,d.jsx)("button",{className:r()(`${s} btn btn--outline text-sm`,{active:t===a.currentPage}),onClick:()=>a.goToPage(t),"data-pagination":!0,disabled:a.currentPage===t,"aria-label":`Page ${t+1}`,children:t+1},t)))}),(0,d.jsx)("button",{className:"btn btn--outline text-sm",onClick:a.next,disabled:a.currentPage+1===a.maxPage,"aria-label":"Next page",children:"next"})]})}},28926:(e,a,t)=>{t.d(a,{A:()=>n});var i=t(49267),s=t(63150),c=t(11504),r=t(75258),d=t(98337),l=t(18713),o=t(72176),b=t(80812);const p=(0,i.Ay)(c.j).withConfig({componentId:"sc-nx6as8-0"})(["margin-bottom:20px;border-bottom:1px solid var(--divider);display:grid;grid-auto-flow:column;"]),m=(0,i.Ay)(r.o).withConfig({componentId:"sc-nx6as8-1"})(["text-align:center;color:var(--text-light);font-size:var(--text-sm);font-weight:600;font-family:var(--heading-font);position:relative;padding-bottom:15px;&::after{content:'';position:absolute;height:4px;width:100%;border-radius:10px 10px 0 0;background:var(--accent);left:0;bottom:0;opacity:0;transform:scale(0);transition:all var(--transition);}&[aria-selected='true']:after{opacity:1;transform:scale(1);}"]),n=e=>{let{tabs:a}=e;const[t,i]=(0,o.useState)(a[0].key);return(0,b.jsxs)(s.t,{value:t,onChange:(e,a)=>i(a),children:[(0,b.jsx)(p,{children:a.map((e=>(0,b.jsx)(m,{value:e.key,children:e.label},`${e.key}-control`)))}),a.map((e=>(0,b.jsx)(d.K,{value:e.key,children:(0,b.jsx)(l.A,{in:t===e.key,timeout:300,children:(0,b.jsx)("div",{children:e.children})})},`${e.key}-pane`)))]})}},26293:(e,a,t)=>{e.exports=t.p+"static/media/1.6e5fa1a2c034ae5e5e95.webp"},42923:(e,a,t)=>{e.exports=t.p+"static/media/10.f9b0afeb6a0b0a0aa4aa.webp"},8680:(e,a,t)=>{e.exports=t.p+"static/media/11.bb024787d9559601e65d.webp"},43637:(e,a,t)=>{e.exports=t.p+"static/media/12.e520a6491ca96bb264a4.webp"},33864:(e,a,t)=>{e.exports=t.p+"static/media/2.3d4a24322ae8509c215e.webp"},73771:(e,a,t)=>{e.exports=t.p+"static/media/3.e34ab90c407c6ef0f965.webp"},16006:(e,a,t)=>{e.exports=t.p+"static/media/4.8ddd5fabef93a2d8f5e9.webp"},30849:(e,a,t)=>{e.exports=t.p+"static/media/5.01ccbd21dd987861d84a.webp"},10212:(e,a,t)=>{e.exports=t.p+"static/media/6.5b6cd91324e930c0344f.webp"},63911:(e,a,t)=>{e.exports=t.p+"static/media/7.1e560ebdc6ae47e4caa7.webp"},47362:(e,a,t)=>{e.exports=t.p+"static/media/8.c1b5e289ac98cfa24112.webp"},2925:(e,a,t)=>{e.exports=t.p+"static/media/9.4dc1eaf11c370897a99e.webp"},32335:(e,a,t)=>{e.exports=t.p+"static/media/avatar.e7b5b99a7168ac76987b.webp"},39557:(e,a,t)=>{e.exports=t.p+"static/media/cover1-1.07b1c8515c31f2dbda2b.webp"},55160:(e,a,t)=>{e.exports=t.p+"static/media/cover1-2.1517c37c08958444e7ec.webp"},97979:(e,a,t)=>{e.exports=t.p+"static/media/cover1-3.6e0ee05faa7aec9568f5.webp"},29622:(e,a,t)=>{e.exports=t.p+"static/media/cover1-4.5c04e753f99d14e172d7.webp"},96688:(e,a,t)=>{e.exports=t.p+"static/media/cover2-1.5237e1c6e4a58933d291.webp"},90941:(e,a,t)=>{e.exports=t.p+"static/media/cover2-2.f45b4026924a2ca20c1c.webp"},88178:(e,a,t)=>{e.exports=t.p+"static/media/cover2-3.2ebdb6267272a272a704.webp"},26959:(e,a,t)=>{e.exports=t.p+"static/media/cover2-4.c00f9bd4aaab991100df.webp"},72255:(e,a,t)=>{e.exports=t.p+"static/media/cover3-1.75b70fa5ba5fac1b9e7f.webp"},62654:(e,a,t)=>{e.exports=t.p+"static/media/cover3-2.b34afd75cad7a214ad7a.webp"},73689:(e,a,t)=>{e.exports=t.p+"static/media/cover3-3.bb708fa5e6e975141b6f.webp"},72672:(e,a,t)=>{e.exports=t.p+"static/media/cover3-4.0eac21ddcfb82b1072d6.webp"},86458:(e,a,t)=>{e.exports=t.p+"static/media/cover4-1.d7e1afa8386a723d9d57.webp"},73307:(e,a,t)=>{e.exports=t.p+"static/media/cover4-2.c7b877de399b55aec401.webp"},96856:(e,a,t)=>{e.exports=t.p+"static/media/cover4-3.3d8ba6a99fe23854e99e.webp"},5425:(e,a,t)=>{e.exports=t.p+"static/media/cover4-4.0a256a939a3e47dd3a22.webp"},36153:(e,a,t)=>{e.exports=t.p+"static/media/cover5-1.d1515f6b1038aa4fc643.webp"},93116:(e,a,t)=>{e.exports=t.p+"static/media/cover5-2.bab5850c40faf6979c0d.webp"},83359:(e,a,t)=>{e.exports=t.p+"static/media/cover5-3.cf7f56796c7c25925a0e.webp"},80130:(e,a,t)=>{e.exports=t.p+"static/media/cover5-4.174e8c4fcc68694c34fe.webp"},23188:(e,a,t)=>{e.exports=t.p+"static/media/cover6-1.79813c0dc5f6ce45b5fd.webp"},98801:(e,a,t)=>{e.exports=t.p+"static/media/cover6-2.e12046268264f9971ebc.webp"},25174:(e,a,t)=>{e.exports=t.p+"static/media/cover6-3.2be114110033388cb23d.webp"},66683:(e,a,t)=>{e.exports=t.p+"static/media/cover6-4.9173d483b9dcc678edb5.webp"},42608:(e,a,t)=>{e.exports=t.p+"static/media/thumb1-1.24a73b1024d27480cef2.webp"},34909:(e,a,t)=>{e.exports=t.p+"static/media/thumb1-2.9d05045a28140de14697.webp"},91346:(e,a,t)=>{e.exports=t.p+"static/media/thumb1-3.6161a7df04e423691e17.webp"},40303:(e,a,t)=>{e.exports=t.p+"static/media/thumb1-4.e8d7fc40de3037747737.webp"},69125:(e,a,t)=>{e.exports=t.p+"static/media/thumb2-1.a442cb4f2618f5a372bd.webp"},30200:(e,a,t)=>{e.exports=t.p+"static/media/thumb2-2.9ff8f208a4a6d8486a44.webp"},15547:(e,a,t)=>{e.exports=t.p+"static/media/thumb2-3.2372bb7641d125f6c5ef.webp"},68150:(e,a,t)=>{e.exports=t.p+"static/media/thumb2-4.c29b8471dcaa027b5044.webp"},90486:(e,a,t)=>{e.exports=t.p+"static/media/thumb3-1.db3b7243d65206361197.webp"},15959:(e,a,t)=>{e.exports=t.p+"static/media/thumb3-2.300cb7d47e58cb3ea572.webp"},31252:(e,a,t)=>{e.exports=t.p+"static/media/thumb3-3.d95d43e238d5593c35fa.webp"},91461:(e,a,t)=>{e.exports=t.p+"static/media/thumb3-4.56f779aae821404dd1f5.webp"},6563:(e,a,t)=>{e.exports=t.p+"static/media/thumb4-1.723aa49a645fe9d0ef8a.webp"},25314:(e,a,t)=>{e.exports=t.p+"static/media/thumb4-2.989ed776e3318d2ee345.webp"},97229:(e,a,t)=>{e.exports=t.p+"static/media/thumb4-3.68e82343d6a803405b38.webp"},44860:(e,a,t)=>{e.exports=t.p+"static/media/thumb4-4.81c2b075f29e7b676a22.webp"},43988:(e,a,t)=>{e.exports=t.p+"static/media/thumb5-1.dc0252e2b451becfc94d.webp"},94353:(e,a,t)=>{e.exports=t.p+"static/media/thumb5-2.de0be5228406fdb6f648.webp"},94326:(e,a,t)=>{e.exports=t.p+"static/media/thumb5-3.81477369f7f924109dc1.webp"},46171:(e,a,t)=>{e.exports=t.p+"static/media/thumb5-4.5e4414667859686753dc.webp"},16345:(e,a,t)=>{e.exports=t.p+"static/media/thumb6-1.cf9893ecb529c0a4259a.webp"},36668:(e,a,t)=>{e.exports=t.p+"static/media/thumb6-2.1679863cd6c3b1afb87f.webp"},14911:(e,a,t)=>{e.exports=t.p+"static/media/thumb6-3.a6ddaa41047c3b6c8f88.webp"},33474:(e,a,t)=>{e.exports=t.p+"static/media/thumb6-4.28fef7a239e4c71d2e74.webp"},19702:(e,a,t)=>{e.exports=t.p+"static/media/1.07f8fb56d7e9262d6751.webp"},58:(e,a,t)=>{e.exports=t.p+"static/media/10.dde8f071e1fbd0a58929.webp"},21157:(e,a,t)=>{e.exports=t.p+"static/media/11.e7f16c21c28ed28c6d2c.webp"},36760:(e,a,t)=>{e.exports=t.p+"static/media/12.54609e286e5e1dccd4ec.webp"},28951:(e,a,t)=>{e.exports=t.p+"static/media/2.c5ceedb196823c3f55a5.webp"},87092:(e,a,t)=>{e.exports=t.p+"static/media/3.b9e115881c9a74102987.webp"},13285:(e,a,t)=>{e.exports=t.p+"static/media/4.60f8ea08ee30f66b57b7.webp"},92186:(e,a,t)=>{e.exports=t.p+"static/media/5.a39afd7db8497fda3c16.webp"},71707:(e,a,t)=>{e.exports=t.p+"static/media/6.f3da9ed720bda8deed80.webp"},28888:(e,a,t)=>{e.exports=t.p+"static/media/7.b57466b9955f41146ebb.webp"},26441:(e,a,t)=>{e.exports=t.p+"static/media/8.0fcd1ab048910cbe288a.webp"},56718:(e,a,t)=>{e.exports=t.p+"static/media/9.826dbd1dd34bfcf2be66.webp"}}]);
//# sourceMappingURL=4278.e2d35223.chunk.js.map