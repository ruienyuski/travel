(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{eeac:function(t,e,c){"use strict";c.r(e);var a=c("7a23"),n={class:"row container"},r={class:"q-pa-md col-md-12 q-gutter-md"},i={key:0,class:"q-pa-md row items-start q-gutter-md"},o=["src"],u={class:"text-subtitle2"},l={class:"text-accent"},s={key:1,class:"q-pa-md row justify-start items-start q-gutter-md"},b=["src"],d={class:"text-subtitle2"},j={class:"text-accent"},O=Object(a["i"])("div",{class:"row q-pa-md justify-center"}," Taiwan Tourguide © Code: Michael / Design: KT ",-1);function f(t,e,c,f,m,p){var v=Object(a["I"])("Headerbaner"),h=Object(a["I"])("q-icon"),y=Object(a["I"])("q-item-section"),g=Object(a["I"])("q-item"),x=Object(a["I"])("q-card-section"),k=Object(a["I"])("q-card"),w=Object(a["I"])("q-page-container");return Object(a["B"])(),Object(a["h"])(a["a"],null,[Object(a["k"])(v),Object(a["k"])(w,null,{default:Object(a["P"])((function(){return[Object(a["i"])("div",n,[Object(a["i"])("div",r,[Object(a["k"])(g,null,{default:Object(a["P"])((function(){return[Object(a["k"])(y,{side:""},{default:Object(a["P"])((function(){return[Object(a["k"])(h,{name:"square",class:Object(a["r"])(f.categoryColor)},null,8,["class"])]})),_:1}),Object(a["k"])(y,{class:"text-h6"},{default:Object(a["P"])((function(){return[Object(a["j"])(Object(a["L"])(f.category),1)]})),_:1})]})),_:1})]),f.fooddata.length<5?(Object(a["B"])(),Object(a["h"])("div",i,[(Object(a["B"])(!0),Object(a["h"])(a["a"],null,Object(a["G"])(f.fooddata,(function(t){return Object(a["B"])(),Object(a["g"])(k,{class:"my-card drop-shadow col",key:t.ID},{default:Object(a["P"])((function(){return[Object(a["i"])("img",{src:t.Picture.PictureUrl1,style:{height:"180px","object-fit":"cover",border:"12px solid #fff"}},null,8,o),Object(a["k"])(x,null,{default:Object(a["P"])((function(){return[Object(a["i"])("div",null,Object(a["L"])(t.HotelName),1),Object(a["i"])("div",u,[Object(a["k"])(h,{name:"place",class:"text-primary"}),Object(a["i"])("span",l,Object(a["L"])(t.City),1)])]})),_:2},1024)]})),_:2},1024)})),128))])):(Object(a["B"])(),Object(a["h"])("div",s,[(Object(a["B"])(!0),Object(a["h"])(a["a"],null,Object(a["G"])(f.fooddata,(function(t){return Object(a["B"])(),Object(a["g"])(k,{class:"my-card drop-shadow col-md-2",style:{height:"243px"},key:t.ID},{default:Object(a["P"])((function(){return[Object(a["i"])("img",{src:t.Picture.PictureUrl1,style:{height:"137px","object-fit":"cover",border:"12px solid #fff"}},null,8,b),Object(a["k"])(x,null,{default:Object(a["P"])((function(){return[Object(a["i"])("div",null,Object(a["L"])(t.HotelName),1),Object(a["i"])("div",d,[Object(a["k"])(h,{name:"place",class:"text-primary"}),Object(a["i"])("span",j,Object(a["L"])(t.City),1)])]})),_:2},1024)]})),_:2},1024)})),128))]))]),O]})),_:1})],64)}c("99af"),c("4de4"),c("4e82"),c("fb6a");var m=c("6c2d"),p=c("6c02"),v=c("ddef"),h={components:{Headerbaner:v["a"]},setup:function(){var t=Object(p["c"])(),e=Object(a["E"])(null),c=Object(a["E"])(null),n=Object(a["E"])({}),r=Object(a["E"])(null),i=Object(a["E"])(null),o=Object(a["o"])("axios"),u=function(){var t=(new Date).toGMTString(),e=new m["a"]("SHA-1","TEXT");e.setHMACKey("KvV_xn7i63emNGaA4EstMe4wz7c","TEXT"),e.update("x-date: ".concat(t));var c=e.getHMAC("B64"),a='hmac username="'.concat("42fc671988c54704a5a441cfed709ce5",'",algorithm="hmac-sha1", headers="x-date", signature="').concat(c,"\"'");return{Authorization:a,"X-Date":t}},l=function(){o.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/".concat(t.params.item,"/").concat(t.params.city),{headers:u()}).then((function(e){switch(t.params.item){case"Restaurant":r.value="餐飲",i.value="text-accent";break;case"Hotel":r.value="住宿",i.value="text-secondary";break;case"Activity":r.value="活動",i.value="text-primary";break;default:r.value="",i.value=""}var c=e.data.filter((function(t){return t.Picture.PictureUrl1})),a=c.sort((function(){return Math.random()-.5})),o=a.slice(0,10);n.value=o}))};return Object(a["O"])(t,(function(){l()})),Object(a["y"])((function(){l()})),{getCategoryCountry:l,selectCategory:e,selectLocation:c,fooddata:n,category:r,categoryColor:i}}},y=c("d959"),g=c.n(y),x=c("09e3"),k=c("66e5"),w=c("4074"),P=c("0016"),q=c("f09f"),C=c("a370"),I=c("93dc"),T=c.n(I);const _=g()(h,[["render",f]]);e["default"]=_;T()(h,"components",{QPageContainer:x["a"],QItem:k["a"],QItemSection:w["a"],QIcon:P["a"],QCard:q["a"],QCardSection:C["a"]})}}]);
//# sourceMappingURL=about.cfa5c2f8.js.map