/* ALUMATE language helper: English is the source text, Arabic is looked up by the English sentence. */
window.KH=(function(){
  var AR={},cur='en',subs=[],miss={};
  function add(o){for(var k in o)if(Object.prototype.hasOwnProperty.call(o,k))AR[k]=o[k]}
  function fmt(s,v){return v?String(s).replace(/\{(\w+)\}/g,function(m,k){return v[k]==null?m:v[k]}):s}
  function t(s,v){
    s=String(s==null?'':s);
    if(cur==='ar'){
      if(AR[s]!=null)return fmt(AR[s],v);
      if(/[A-Za-z]{2}/.test(s))miss[s]=1;
    }
    return fmt(s,v);
  }
  /* for text typed by people (names, universities): translate only if we know it, never report it as missing */
  function tu(s){s=String(s==null?'':s);return cur==='ar'&&AR[s]!=null?AR[s]:s}
  function pick(x){return x&&typeof x==='object'?(x[cur]||x.en||''):String(x==null?'':x)}
  function get(){try{return localStorage.getItem('kh-lang')}catch(e){return null}}
  function put(l){try{localStorage.setItem('kh-lang',l)}catch(e){}}
  function detect(force){
    if(force==='ar'||force==='en')return force;
    var s=get();if(s==='ar'||s==='en')return s;
    var n=String((typeof navigator!=='undefined'&&(navigator.language||navigator.userLanguage))||'en').toLowerCase();
    return n.indexOf('ar')===0?'ar':'en';
  }
  function paint(){
    var h=document.documentElement;
    h.lang=cur;h.dir=cur==='ar'?'rtl':'ltr';
    apply(document);
    var b=document.getElementById('langbtn');
    if(b){b.textContent=cur==='ar'?'English':'العربية';b.setAttribute('aria-label',cur==='ar'?'Switch to English':'التبديل إلى العربية')}
  }
  function apply(root){
    var els=(root||document).querySelectorAll('[data-t],[data-t-ph],[data-t-aria],[data-t-title]'),i,el,d;
    for(i=0;i<els.length;i++){
      el=els[i];d=el.dataset;
      if(el.hasAttribute('data-t')){if(d.t0==null)d.t0=el.textContent.trim();el.textContent=t(d.t0)}
      if(el.hasAttribute('data-t-ph')){if(d.p0==null)d.p0=el.getAttribute('placeholder')||'';el.setAttribute('placeholder',t(d.p0))}
      if(el.hasAttribute('data-t-aria')){if(d.a0==null)d.a0=el.getAttribute('aria-label')||'';el.setAttribute('aria-label',t(d.a0))}
      if(el.hasAttribute('data-t-title')){if(d.h0==null)d.h0=el.getAttribute('title')||'';el.setAttribute('title',t(d.h0))}
    }
  }
  function set(l){
    if(l!=='ar'&&l!=='en')return;
    cur=l;put(l);paint();
    for(var i=0;i<subs.length;i++){try{subs[i](cur)}catch(e){if(window.console)console.error(e)}}
  }
  function on(fn){subs.push(fn)}
  function init(force){cur=detect(force);if(window.KH&&KH.sprite)KH.sprite();paint();return cur}
  /* put the language button into the page header */
  function mount(sel){
    var box=typeof sel==='string'?document.querySelector(sel):sel;if(!box)return;
    box.innerHTML='<button type="button" class="langbtn" id="langbtn"></button>';
    document.getElementById('langbtn').addEventListener('click',function(){set(cur==='ar'?'en':'ar')});
    paint();
  }
  function date(ts){
    var o={day:'numeric',month:'short'};
    try{return new Date(ts).toLocaleDateString(cur==='ar'?'ar-u-nu-latn':'en-GB',o)}catch(e){return new Date(ts).toDateString()}
  }
  /* link to another page of this app in the current language */
  function link(url){return url+(url.indexOf('?')>-1?'&':'?')+'lang='+cur}
  return {add:add,t:t,tu:tu,pick:pick,init:init,set:set,on:on,mount:mount,apply:apply,date:date,link:link,lang:function(){return cur},missing:function(){return Object.keys(miss)},hasArabic:function(s){return /[\u0600-\u06FF]/.test(String(s||''))}};
})();
/* Shared content: disciplines (English + Arabic) and words used on more than one page */

/* shared artwork: hero scene, skyline and line icons (inline, no files to upload) */
KH.SPRITE="<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\" focusable=\"false\"><defs><g id=\"a-hero\"><defs><linearGradient id=\"g-sky\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#05172A\"/><stop offset=\".5\" stop-color=\"#0A2F52\"/><stop offset=\".82\" stop-color=\"#15496F\"/><stop offset=\"1\" stop-color=\"#1F6A8C\"/></linearGradient><radialGradient id=\"g-glow\" cx=\".5\" cy=\".5\" r=\".5\"><stop offset=\"0\" stop-color=\"#3DD6D0\" stop-opacity=\".45\"/><stop offset=\"1\" stop-color=\"#3DD6D0\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"g-steel\" x1=\"0\" y1=\"1\" x2=\"1\" y2=\"0\"><stop offset=\"0\" stop-color=\"#12304A\"/><stop offset=\".28\" stop-color=\"#7FA3BF\"/><stop offset=\".46\" stop-color=\"#EEF5FA\"/><stop offset=\".6\" stop-color=\"#8CADC6\"/><stop offset=\".82\" stop-color=\"#2D5B7C\"/><stop offset=\"1\" stop-color=\"#173A57\"/></linearGradient><linearGradient id=\"g-water\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#0B3152\"/><stop offset=\"1\" stop-color=\"#05172A\"/></linearGradient><linearGradient id=\"g-sheen\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\"0\"/><stop offset=\".5\" stop-color=\"#fff\" stop-opacity=\".38\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient><clipPath id=\"c-face\"><path d=\"M 800 640 C 860 430 1040 230 1400 110 L 1400 640 Z\"/></clipPath></defs><rect width=\"1400\" height=\"640\" fill=\"url(#g-sky)\"/><circle cx=\"453\" cy=\"45\" r=\"1.2\" fill=\"#fff\" opacity=\"0.29\"/><circle cx=\"750\" cy=\"110\" r=\"0.6\" fill=\"#fff\" opacity=\"0.53\"/><circle cx=\"52\" cy=\"130\" r=\"0.6\" fill=\"#fff\" opacity=\"0.30\"/><circle cx=\"594\" cy=\"248\" r=\"0.6\" fill=\"#fff\" opacity=\"0.37\"/><circle cx=\"878\" cy=\"284\" r=\"1.1\" fill=\"#fff\" opacity=\"0.47\"/><circle cx=\"1367\" cy=\"14\" r=\"1.4\" fill=\"#fff\" opacity=\"0.41\"/><circle cx=\"202\" cy=\"35\" r=\"0.8\" fill=\"#fff\" opacity=\"0.70\"/><circle cx=\"253\" cy=\"174\" r=\"1.1\" fill=\"#fff\" opacity=\"0.45\"/><circle cx=\"767\" cy=\"19\" r=\"0.6\" fill=\"#fff\" opacity=\"0.36\"/><circle cx=\"953\" cy=\"128\" r=\"0.8\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"634\" cy=\"90\" r=\"1.3\" fill=\"#fff\" opacity=\"0.63\"/><circle cx=\"342\" cy=\"172\" r=\"1.0\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"1021\" cy=\"86\" r=\"1.5\" fill=\"#fff\" opacity=\"0.31\"/><circle cx=\"585\" cy=\"227\" r=\"0.7\" fill=\"#fff\" opacity=\"0.52\"/><circle cx=\"55\" cy=\"200\" r=\"1.3\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"1226\" cy=\"94\" r=\"1.2\" fill=\"#fff\" opacity=\"0.58\"/><circle cx=\"812\" cy=\"137\" r=\"1.3\" fill=\"#fff\" opacity=\"0.77\"/><circle cx=\"664\" cy=\"199\" r=\"0.6\" fill=\"#fff\" opacity=\"0.64\"/><circle cx=\"906\" cy=\"298\" r=\"1.3\" fill=\"#fff\" opacity=\"0.41\"/><circle cx=\"540\" cy=\"201\" r=\"0.5\" fill=\"#fff\" opacity=\"0.50\"/><circle cx=\"235\" cy=\"35\" r=\"0.6\" fill=\"#fff\" opacity=\"0.67\"/><circle cx=\"181\" cy=\"74\" r=\"0.9\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"113\" cy=\"135\" r=\"1.0\" fill=\"#fff\" opacity=\"0.74\"/><circle cx=\"1147\" cy=\"259\" r=\"0.8\" fill=\"#fff\" opacity=\"0.48\"/><circle cx=\"502\" cy=\"265\" r=\"1.5\" fill=\"#fff\" opacity=\"0.33\"/><circle cx=\"247\" cy=\"70\" r=\"0.7\" fill=\"#fff\" opacity=\"0.52\"/><circle cx=\"825\" cy=\"79\" r=\"0.5\" fill=\"#fff\" opacity=\"0.48\"/><circle cx=\"517\" cy=\"170\" r=\"1.5\" fill=\"#fff\" opacity=\"0.63\"/><circle cx=\"722\" cy=\"185\" r=\"1.2\" fill=\"#fff\" opacity=\"0.28\"/><circle cx=\"1259\" cy=\"234\" r=\"1.4\" fill=\"#fff\" opacity=\"0.69\"/><circle cx=\"549\" cy=\"120\" r=\"0.6\" fill=\"#fff\" opacity=\"0.60\"/><circle cx=\"87\" cy=\"20\" r=\"0.7\" fill=\"#fff\" opacity=\"0.34\"/><circle cx=\"476\" cy=\"16\" r=\"0.5\" fill=\"#fff\" opacity=\"0.33\"/><circle cx=\"142\" cy=\"109\" r=\"0.5\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"860\" cy=\"45\" r=\"0.8\" fill=\"#fff\" opacity=\"0.44\"/><circle cx=\"510\" cy=\"37\" r=\"1.3\" fill=\"#fff\" opacity=\"0.80\"/><circle cx=\"652\" cy=\"145\" r=\"0.6\" fill=\"#fff\" opacity=\"0.31\"/><circle cx=\"480\" cy=\"79\" r=\"1.3\" fill=\"#fff\" opacity=\"0.34\"/><circle cx=\"32\" cy=\"285\" r=\"1.0\" fill=\"#fff\" opacity=\"0.33\"/><circle cx=\"760\" cy=\"8\" r=\"1.0\" fill=\"#fff\" opacity=\"0.79\"/><circle cx=\"1209\" cy=\"209\" r=\"0.8\" fill=\"#fff\" opacity=\"0.45\"/><circle cx=\"234\" cy=\"232\" r=\"1.0\" fill=\"#fff\" opacity=\"0.68\"/><circle cx=\"462\" cy=\"67\" r=\"1.3\" fill=\"#fff\" opacity=\"0.79\"/><circle cx=\"1194\" cy=\"242\" r=\"1.3\" fill=\"#fff\" opacity=\"0.66\"/><circle cx=\"317\" cy=\"155\" r=\"0.9\" fill=\"#fff\" opacity=\"0.27\"/><circle cx=\"39\" cy=\"84\" r=\"0.8\" fill=\"#fff\" opacity=\"0.63\"/><ellipse cx=\"760\" cy=\"470\" rx=\"520\" ry=\"150\" fill=\"url(#g-glow)\"/><path d=\"M0 640 L0 470 L110 393 L236 388 L390 439 L475 365 L588 423 L784 400 L961 400 L1117 431 L1272 362 L1415 374 L1574 439 L1540 640 Z\" fill=\"#14405F\" opacity=\"0.9\"/><path d=\"M0 640 L0 480 L98 424 L210 413 L317 414 L373 439 L495 429 L614 459 L702 452 L795 433 L850 453 L924 414 L1033 457 L1144 458 L1243 458 L1297 417 L1366 453 L1491 417 L1490 640 Z\" fill=\"#0E3150\" opacity=\"1\"/><g fill=\"#08203A\"><rect x=\"470\" y=\"379\" width=\"102\" height=\"101\"/><rect x=\"591\" y=\"318\" width=\"18\" height=\"162\"/><rect x=\"588\" y=\"318\" width=\"24\" height=\"8\"/><rect x=\"627\" y=\"399\" width=\"52\" height=\"81\"/><rect x=\"693\" y=\"432\" width=\"88\" height=\"48\" rx=\"10\"/><rect x=\"790\" y=\"409\" width=\"51\" height=\"71\"/><rect x=\"861\" y=\"429\" width=\"75\" height=\"51\" rx=\"10\"/></g><rect x=\"476\" y=\"441\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"490\" y=\"423\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"490\" y=\"459\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"532\" y=\"387\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"532\" y=\"405\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"546\" y=\"423\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"546\" y=\"441\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"560\" y=\"387\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"560\" y=\"405\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><circle cx=\"600\" cy=\"315\" r=\"3\" fill=\"#FF5A4D\"/><rect x=\"633\" y=\"407\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"633\" y=\"425\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"633\" y=\"461\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"647\" y=\"407\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"647\" y=\"443\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"661\" y=\"407\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"796\" y=\"435\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"810\" y=\"417\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"824\" y=\"435\" width=\"6\" height=\"8\" fill=\"#F7CF7A\" opacity=\".9\"/><rect x=\"0\" y=\"480\" width=\"1400\" height=\"160\" fill=\"url(#g-water)\"/><rect x=\"476\" y=\"489\" width=\"2\" height=\"54\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"490\" y=\"486\" width=\"2\" height=\"29\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"546\" y=\"491\" width=\"2\" height=\"44\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"546\" y=\"489\" width=\"2\" height=\"18\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"560\" y=\"495\" width=\"2\" height=\"48\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"560\" y=\"493\" width=\"2\" height=\"59\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"600\" y=\"504\" width=\"2\" height=\"30\" fill=\"#FF5A4D\" opacity=\".28\"/><rect x=\"633\" y=\"493\" width=\"2\" height=\"70\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"647\" y=\"488\" width=\"2\" height=\"35\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"661\" y=\"493\" width=\"2\" height=\"24\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"810\" y=\"492\" width=\"2\" height=\"26\" fill=\"#F7CF7A\" opacity=\".28\"/><rect x=\"0\" y=\"494\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.22\"/><rect x=\"0\" y=\"511\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.20\"/><rect x=\"0\" y=\"528\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.18\"/><rect x=\"0\" y=\"545\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.16\"/><rect x=\"0\" y=\"562\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.14\"/><rect x=\"0\" y=\"579\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.12\"/><rect x=\"0\" y=\"596\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.10\"/><rect x=\"0\" y=\"613\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.08\"/><rect x=\"0\" y=\"630\" width=\"1400\" height=\"1\" fill=\"#2C6A90\" opacity=\"0.06\"/><path d=\"M 800 640 C 860 430 1040 230 1400 110 L 1400 640 Z\" fill=\"url(#g-steel)\"/><g clip-path=\"url(#c-face)\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".28\" stroke-width=\"1.2\"><path d=\"M 740 640 C 800 430 980 230 1400 70\"/><path d=\"M 740 686 C 800 476 980 276 1400 116\"/><path d=\"M 740 732 C 800 522 980 322 1400 162\"/><path d=\"M 740 778 C 800 568 980 368 1400 208\"/><path d=\"M 740 824 C 800 614 980 414 1400 254\"/><path d=\"M 740 870 C 800 660 980 460 1400 300\"/><path d=\"M 740 916 C 800 706 980 506 1400 346\"/><path d=\"M 740 962 C 800 752 980 552 1400 392\"/><path d=\"M 740 1008 C 800 798 980 598 1400 438\"/><path d=\"M 740 1054 C 800 844 980 644 1400 484\"/><path d=\"M 740 1100 C 800 890 980 690 1400 530\"/><path d=\"M 740 1146 C 800 936 980 736 1400 576\"/><path d=\"M 740 1192 C 800 982 980 782 1400 622\"/><path d=\"M 740 1238 C 800 1028 980 828 1400 668\"/><path d=\"M 740 1284 C 800 1074 980 874 1400 714\"/><path d=\"M 740 1330 C 800 1120 980 920 1400 760\"/><path d=\"M 820 650 L 990 80\"/><path d=\"M 880 650 L 1050 80\"/><path d=\"M 940 650 L 1110 80\"/><path d=\"M 1000 650 L 1170 80\"/><path d=\"M 1060 650 L 1230 80\"/><path d=\"M 1120 650 L 1290 80\"/><path d=\"M 1180 650 L 1350 80\"/><path d=\"M 1240 650 L 1410 80\"/><path d=\"M 1300 650 L 1470 80\"/><path d=\"M 1360 650 L 1530 80\"/><path d=\"M 1420 650 L 1590 80\"/><path d=\"M 1480 650 L 1650 80\"/><path d=\"M 1540 650 L 1710 80\"/><path d=\"M 1600 650 L 1770 80\"/></g><g clip-path=\"url(#c-face)\"><path d=\"M 900 640 C 960 440 1090 270 1400 140 L 1400 190 C 1130 300 1030 470 990 640 Z\" fill=\"url(#g-sheen)\"/></g><g clip-path=\"url(#c-face)\" fill=\"#F7CF7A\"><rect x=\"860\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.92\"/><rect x=\"860\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.77\"/><rect x=\"888\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.74\"/><rect x=\"888\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.56\"/><rect x=\"916\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.86\"/><rect x=\"944\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.94\"/><rect x=\"972\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.86\"/><rect x=\"972\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.84\"/><rect x=\"1000\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.74\"/><rect x=\"1028\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.92\"/><rect x=\"1056\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.70\"/><rect x=\"1056\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.70\"/><rect x=\"1084\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.56\"/><rect x=\"1112\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.84\"/><rect x=\"1140\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.75\"/><rect x=\"1140\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.85\"/><rect x=\"1168\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.79\"/><rect x=\"1168\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.80\"/><rect x=\"1196\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.62\"/><rect x=\"1196\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.92\"/><rect x=\"1224\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.79\"/><rect x=\"1224\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.59\"/><rect x=\"1252\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.88\"/><rect x=\"1252\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.70\"/><rect x=\"1280\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.82\"/><rect x=\"1308\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.95\"/><rect x=\"1336\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.90\"/><rect x=\"1364\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.70\"/><rect x=\"1364\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.90\"/><rect x=\"1392\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.58\"/><rect x=\"1392\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.86\"/><rect x=\"1420\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.88\"/><rect x=\"1420\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.65\"/><rect x=\"1448\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.72\"/><rect x=\"1448\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.58\"/><rect x=\"1476\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.91\"/><rect x=\"1504\" y=\"582\" width=\"18\" height=\"14\" opacity=\"0.74\"/><rect x=\"1504\" y=\"608\" width=\"18\" height=\"14\" opacity=\"0.93\"/></g><path d=\"M 800 640 C 860 430 1040 230 1400 110 L 1400 640 Z\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".5\" stroke-width=\"1.5\"/></g><g id=\"a-sky\" fill=\"currentColor\"><rect x=\"4\" y=\"26\" width=\"34\" height=\"34\"/><rect x=\"48\" y=\"8\" width=\"7\" height=\"52\"/><rect x=\"44\" y=\"8\" width=\"15\" height=\"4\"/><rect x=\"66\" y=\"34\" width=\"38\" height=\"26\" rx=\"6\"/><rect x=\"112\" y=\"22\" width=\"30\" height=\"38\"/><rect x=\"152\" y=\"14\" width=\"6\" height=\"46\"/><rect x=\"149\" y=\"14\" width=\"12\" height=\"3\"/><rect x=\"168\" y=\"38\" width=\"44\" height=\"22\" rx=\"6\"/><rect x=\"220\" y=\"28\" width=\"26\" height=\"32\"/><rect x=\"256\" y=\"10\" width=\"7\" height=\"50\"/><rect x=\"253\" y=\"10\" width=\"13\" height=\"4\"/><rect x=\"272\" y=\"36\" width=\"28\" height=\"24\"/></g><symbol id=\"i-cap\" viewBox=\"0 0 32 32\"><path d=\"M16 6 3 12l13 6 13-6z\"/><path d=\"M8 15v6c0 2 4 4 8 4s8-2 8-4v-6\"/><path d=\"M29 12v8\"/></symbol><symbol id=\"i-people\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"11\" r=\"4\"/><circle cx=\"6.5\" cy=\"13\" r=\"3\"/><circle cx=\"25.5\" cy=\"13\" r=\"3\"/><path d=\"M9 26c0-4 3-7 7-7s7 3 7 7\"/><path d=\"M2 24c0-3 2-5 5-5M30 24c0-3-2-5-5-5\"/></symbol><symbol id=\"i-building\" viewBox=\"0 0 32 32\"><path d=\"M5 28V5h13v23M18 11h9v17\"/><path d=\"M9 10h5M9 15h5M9 20h5M22 16h1M22 21h1\"/><path d=\"M3 28h26\"/></symbol><symbol id=\"i-user\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"11\" r=\"5\"/><path d=\"M5 27c0-6 5-9 11-9s11 3 11 9\"/></symbol><symbol id=\"i-clip\" viewBox=\"0 0 32 32\"><rect x=\"7\" y=\"6\" width=\"18\" height=\"22\" rx=\"2\"/><path d=\"M12 4h8v4h-8zM11 14h10M11 19h10M11 24h6\"/></symbol><symbol id=\"i-bell\" viewBox=\"0 0 32 32\"><path d=\"M8 22V14a8 8 0 0116 0v8l2 3H6z\"/><path d=\"M13 28a3 3 0 006 0\"/></symbol><symbol id=\"i-pencil\" viewBox=\"0 0 32 32\"><path d=\"M6 26l1-6L21 6l5 5L12 25z\"/><path d=\"M18 9l5 5\"/></symbol><symbol id=\"i-trophy\" viewBox=\"0 0 32 32\"><path d=\"M10 5h12v8a6 6 0 01-12 0zM10 8H5c0 5 2 7 5 7M22 8h5c0 5-2 7-5 7M16 19v5M11 27h10\"/></symbol><symbol id=\"i-search\" viewBox=\"0 0 32 32\"><circle cx=\"14\" cy=\"14\" r=\"8\"/><path d=\"M20 20l8 8\"/></symbol><symbol id=\"i-clock\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"16\" r=\"11\"/><path d=\"M16 9v7l5 3\"/></symbol><symbol id=\"i-cal\" viewBox=\"0 0 32 32\"><rect x=\"5\" y=\"7\" width=\"22\" height=\"20\" rx=\"2\"/><path d=\"M5 13h22M11 4v6M21 4v6\"/></symbol><symbol id=\"i-arrow\" viewBox=\"0 0 32 32\"><path d=\"M5 16h22M19 8l8 8-8 8\"/></symbol><symbol id=\"i-play\" viewBox=\"0 0 32 32\"><path d=\"M12 8l12 8-12 8z\"/></symbol><symbol id=\"i-check\" viewBox=\"0 0 32 32\"><path d=\"M6 17l7 7L26 9\"/></symbol><symbol id=\"i-lock\" viewBox=\"0 0 32 32\"><rect x=\"6\" y=\"14\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M10 14V10a6 6 0 0112 0v4\"/></symbol><symbol id=\"i-home\" viewBox=\"0 0 32 32\"><path d=\"M4 15L16 5l12 10M7 13v14h18V13\"/></symbol><symbol id=\"i-list\" viewBox=\"0 0 32 32\"><path d=\"M11 9h16M11 16h16M11 23h16M5 9h1M5 16h1M5 23h1\"/></symbol><symbol id=\"i-chart\" viewBox=\"0 0 32 32\"><path d=\"M5 27V5M5 27h22M10 22v-6M16 22V10M22 22v-8\"/></symbol><symbol id=\"i-mail\" viewBox=\"0 0 32 32\"><rect x=\"4\" y=\"7\" width=\"24\" height=\"18\" rx=\"2\"/><path d=\"M4 9l12 9 12-9\"/></symbol><symbol id=\"i-help\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"16\" r=\"12\"/><path d=\"M12 13a4 4 0 118 1c0 2-4 2-4 5M16 23h0\"/></symbol><symbol id=\"i-out\" viewBox=\"0 0 32 32\"><path d=\"M12 5H6v22h6M20 10l6 6-6 6M26 16H12\"/></symbol></defs></svg>";
KH.sprite=function(){if(document.getElementById('a-hero')||!document.body)return;var d=document.createElement('div');d.innerHTML=KH.SPRITE;document.body.insertBefore(d.firstChild,document.body.firstChild)};
KH.ico=function(n,c){return '<svg class="i'+(c?' '+c:'')+'" viewBox="0 0 32 32" aria-hidden="true"><use href="#i-'+n+'"/></svg>'};
KH.art=function(){return '<svg class="art" viewBox="0 0 1400 640" preserveAspectRatio="xMaxYMid slice" aria-hidden="true"><use href="#a-hero"/></svg>'};
KH.glyph=function(d){return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d.g+'</svg>'};
KH.DISC=[
  {id:'hse',title:'Health & Safety',tag:'HSE',h:150,base:3,desc:'Support safety audits, incident reporting and awareness campaigns.',eg:'Occupational health, environmental science, industrial hygiene',majors:['Occupational Health & Safety','Environmental Science','Industrial Hygiene','Chemistry'],g:'<path d="M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8z"/><path d="M11 16l4 4 6-8"/>',
    ar:{title:'الصحة والسلامة',desc:'دعم عمليات تدقيق السلامة وتقارير الحوادث وحملات التوعية.',eg:'الصحة المهنية، العلوم البيئية، الصحة الصناعية',majors:['الصحة والسلامة المهنية','العلوم البيئية','الصحة الصناعية','الكيمياء']}},
  {id:'hr',title:'Human Resources',tag:'HR',h:15,base:3,desc:'Help with recruitment logistics, onboarding and employee records.',eg:'HR management, psychology, business administration',majors:['Human Resource Management','Psychology','Business Administration'],g:'<circle cx="12" cy="11" r="4"/><path d="M4 27c0-5 4-8 8-8s8 3 8 8"/><circle cx="23" cy="11" r="3"/><path d="M22 19c4 0 6 3 6 7"/>',
    ar:{title:'الموارد البشرية',desc:'المساعدة في إجراءات التوظيف والتهيئة وسجلات الموظفين.',eg:'إدارة الموارد البشرية، علم النفس، إدارة الأعمال',majors:['إدارة الموارد البشرية','علم النفس','إدارة الأعمال']}},
  {id:'mg',title:'Management & Administration',tag:'MGT',h:35,base:3,desc:'Assist managers with planning, reporting and administrative operations.',eg:'Business administration, management, public administration',majors:['Business Administration','Management','Public Administration','Office Management'],g:'<rect x="4" y="10" width="24" height="16" rx="3"/><path d="M12 10V7h8v3M4 17h24"/>',
    ar:{title:'الإدارة والشؤون الإدارية',desc:'مساندة المدراء في التخطيط والتقارير والعمليات الإدارية.',eg:'إدارة الأعمال، الإدارة، الإدارة العامة',majors:['إدارة الأعمال','الإدارة','الإدارة العامة','إدارة المكاتب']}},
  {id:'fin',title:'Finance',tag:'FIN',h:190,base:3,desc:'Support budgeting, financial reporting and cost analysis.',eg:'Finance, banking and finance, economics',majors:['Finance','Banking & Finance','Economics','Islamic Finance'],g:'<path d="M4 24l8-8 5 5 11-12"/><path d="M21 9h7v7"/>',
    ar:{title:'المالية',desc:'دعم إعداد الميزانيات والتقارير المالية وتحليل التكاليف.',eg:'المالية، المالية والمصرفية، الاقتصاد',majors:['المالية','المالية والمصرفية','الاقتصاد','المالية الإسلامية']}},
  {id:'acc',title:'Accounting',tag:'ACC',h:330,base:3,desc:'Help with ledgers, reconciliations, audits and month-end reporting.',eg:'Accounting, accounting and finance, auditing',majors:['Accounting','Accounting & Finance','Auditing'],g:'<rect x="7" y="4" width="18" height="24" rx="3"/><path d="M11 10h10"/><path d="M12 16h.01M16 16h.01M20 16h.01M12 21h.01M16 21h.01M20 21h.01"/>',
    ar:{title:'المحاسبة',desc:'المساعدة في القيود المحاسبية والمطابقات والتدقيق وتقارير نهاية الشهر.',eg:'المحاسبة، المحاسبة والمالية، التدقيق',majors:['المحاسبة','المحاسبة والمالية','التدقيق']}},
  {id:'scm',title:'Supply Chain & Procurement',tag:'SCM',h:75,base:3,desc:'Assist with purchasing, inventory, shipping and supplier follow-up.',eg:'Supply chain, logistics, procurement, business administration',majors:['Supply Chain Management','Logistics','Procurement','Business Administration'],g:'<path d="M16 4l11 6v12l-11 6-11-6V10z"/><path d="M5 10l11 6 11-6M16 16v12"/>',
    ar:{title:'سلاسل الإمداد والمشتريات',desc:'المساعدة في المشتريات والمخزون والشحن ومتابعة الموردين.',eg:'سلاسل الإمداد، اللوجستيات، المشتريات، إدارة الأعمال',majors:['إدارة سلاسل الإمداد','اللوجستيات','المشتريات','إدارة الأعمال']}},
  {id:'en',title:'Engineering',tag:'ENG',h:225,base:4,desc:'Work with plant and project engineers on real operating problems.',eg:'Mechanical, chemical, electrical, industrial, civil, materials',majors:['Mechanical Engineering','Chemical Engineering','Electrical Engineering','Industrial Engineering','Civil Engineering','Materials Engineering'],g:'<circle cx="16" cy="16" r="4"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M24.5 7.5l-2.8 2.8M10.3 21.7l-2.8 2.8"/>',
    ar:{title:'الهندسة',desc:'العمل مع مهندسي المصنع والمشاريع على مشكلات تشغيلية حقيقية.',eg:'الهندسة الميكانيكية والكيميائية والكهربائية والصناعية والمدنية وهندسة المواد',majors:['الهندسة الميكانيكية','الهندسة الكيميائية','الهندسة الكهربائية','الهندسة الصناعية','الهندسة المدنية','هندسة المواد']}},
  {id:'it',title:'Information Technology',tag:'IT',h:265,base:3,desc:'Support systems, networks and internal tools with the IT team.',eg:'Computer science, information systems, networks, cybersecurity',majors:['Computer Science','Information Systems','Networks Engineering','Cybersecurity','Software Engineering'],g:'<path d="M11 9l-7 7 7 7M21 9l7 7-7 7M18 6l-4 20"/>',
    ar:{title:'تقنية المعلومات',desc:'دعم الأنظمة والشبكات والأدوات الداخلية مع فريق تقنية المعلومات.',eg:'علوم الحاسوب، نظم المعلومات، الشبكات، الأمن السيبراني',majors:['علوم الحاسوب','نظم المعلومات','هندسة الشبكات','الأمن السيبراني','هندسة البرمجيات']}},
  {id:'qlt',title:'Quality & Laboratory',tag:'QLT',h:115,base:3,desc:'Support sample testing, quality checks and laboratory records.',eg:'Chemistry, materials science, quality management, metallurgy',majors:['Chemistry','Materials Science','Quality Management','Metallurgy'],g:'<path d="M12 4h8M14 4v8L7 24a3 3 0 0 0 2.6 4.5h12.8A3 3 0 0 0 25 24l-7-12V4"/><path d="M10.5 19h11"/>',
    ar:{title:'الجودة والمختبرات',desc:'دعم فحص العينات وفحوصات الجودة وسجلات المختبر.',eg:'الكيمياء، علوم المواد، إدارة الجودة، علم المعادن',majors:['الكيمياء','علوم المواد','إدارة الجودة','علم المعادن']}}
];
KH.dt=function(d,k){return KH.lang()==='ar'&&d.ar&&d.ar[k]?d.ar[k]:d[k]};

/* Omani universities and colleges: [English, Arabic]. Source: Ministry of Higher Education list and public listings; students whose institution is missing can type it. */
KH.UNIS=[
  ['Sultan Qaboos University','جامعة السلطان قابوس'],
  ['University of Technology and Applied Sciences – Muscat','جامعة التقنية والعلوم التطبيقية – مسقط'],
  ['University of Technology and Applied Sciences – Shinas','جامعة التقنية والعلوم التطبيقية – شناص'],
  ['University of Technology and Applied Sciences – Sohar','جامعة التقنية والعلوم التطبيقية – صحار'],
  ['University of Technology and Applied Sciences – Nizwa','جامعة التقنية والعلوم التطبيقية – نزوى'],
  ['University of Technology and Applied Sciences – Mussanah','جامعة التقنية والعلوم التطبيقية – المصنعة'],
  ['University of Technology and Applied Sciences – Rustaq','جامعة التقنية والعلوم التطبيقية – الرستاق'],
  ['University of Technology and Applied Sciences – Salalah','جامعة التقنية والعلوم التطبيقية – صلالة'],
  ['University of Technology and Applied Sciences – Sur','جامعة التقنية والعلوم التطبيقية – صور'],
  ['University of Technology and Applied Sciences – Ibra','جامعة التقنية والعلوم التطبيقية – إبراء'],
  ['University of Technology and Applied Sciences – Ibri','جامعة التقنية والعلوم التطبيقية – عبري'],
  ['University of Technology and Applied Sciences – Musandam','جامعة التقنية والعلوم التطبيقية – مسندم'],
  ['A’Sharqiyah University','جامعة الشرقية'],
  ['Al-Bayan College','كلية البيان'],
  ['Al-Zahra College for Women','كلية الزهراء للبنات'],
  ['Arab Open University – Oman','الجامعة العربية المفتوحة – فرع عُمان'],
  ['Caledonian College of Engineering','كلية كاليدونيان للهندسة'],
  ['College of Banking and Financial Studies','كلية الدراسات المصرفية والمالية'],
  ['Dhofar University','جامعة ظفار'],
  ['German University of Technology in Oman','الجامعة الألمانية للتكنولوجيا في عُمان'],
  ['Global College of Engineering and Technology','الكلية العالمية للهندسة والتكنولوجيا'],
  ['Gulf College','كلية الخليج'],
  ['International College of Engineering and Management','الكلية الدولية للهندسة والإدارة'],
  ['International Maritime College Oman','الكلية البحرية الدولية – عُمان'],
  ['Majan University College','كلية مجان الجامعية'],
  ['Mazoon College','كلية مزون'],
  ['Middle East College','كلية الشرق الأوسط'],
  ['Military Technological College','الكلية العسكرية التقنية'],
  ['Modern College of Business and Science','الكلية الحديثة للتجارة والعلوم'],
  ['Muscat College','كلية مسقط'],
  ['Muscat University','جامعة مسقط'],
  ['National University of Science and Technology','الجامعة الوطنية للعلوم والتكنولوجيا'],
  ['Oman College of Health Sciences','كلية عُمان للعلوم الصحية'],
  ['Oman College of Management and Technology','كلية عُمان للإدارة والتكنولوجيا'],
  ['Oman Dental College','كلية عُمان لطب الأسنان'],
  ['Oman Medical College','كلية عُمان الطبية'],
  ['Oman Tourism College','كلية عُمان للسياحة'],
  ['Scientific College of Design','الكلية العلمية للتصميم'],
  ['Sohar University','جامعة صحار'],
  ['Sur University College','كلية صور الجامعية'],
  ['University of Buraimi','جامعة البريمي'],
  ['University of Nizwa','جامعة نزوى'],
  ['Waljat Colleges of Applied Sciences','كليات والجات للعلوم التطبيقية']
];
/* The 11 governorates and their wilayats: [English, Arabic, [[English, Arabic], ...]] */
KH.GEO=[
  ['Muscat','مسقط',[['Muscat','مسقط'],['Muttrah','مطرح'],['Bawshar','بوشر'],['Seeb','السيب'],['Al Amerat','العامرات'],['Qurayyat','قريات']]],
  ['Dhofar','ظفار',[['Salalah','صلالة'],['Taqah','طاقة'],['Mirbat','مرباط'],['Thumrait','ثمريت'],['Sadah','سدح'],['Rakhyut','رخيوت'],['Dhalkut','ضلكوت'],['Muqshin','مقشن'],['Shalim and the Hallaniyat Islands','شليم وجزر الحلانيات'],['Al Mazyunah','المزيونة']]],
  ['Musandam','مسندم',[['Khasab','خصب'],['Dibba','دبا'],['Bukha','بخا'],['Madha','مدحاء']]],
  ['Al Buraimi','البريمي',[['Al Buraimi','البريمي'],['Mahdah','محضة'],['As Sunaynah','السنينة']]],
  ['Ad Dakhiliyah','الداخلية',[['Nizwa','نزوى'],['Bahla','بهلا'],['Samail','سمائل'],['Izki','إزكي'],['Bidbid','بدبد'],['Adam','أدم'],['Al Hamra','الحمراء'],['Manah','منح'],['Jebel Akhdar','الجبل الأخضر']]],
  ['Ad Dhahirah','الظاهرة',[['Ibri','عبري'],['Yanqul','ينقل'],['Dhank','ضنك']]],
  ['Al Batinah North','شمال الباطنة',[['Sohar','صحار'],['As Suwayq','السويق'],['Saham','صحم'],['Al Khaburah','الخابورة'],['Shinas','شناص'],['Liwa','لوى']]],
  ['Al Batinah South','جنوب الباطنة',[['Barka','بركاء'],['Rustaq','الرستاق'],['Al Musannah','المصنعة'],['Nakhal','نخل'],['Wadi Al Maawil','وادي المعاول'],['Al Awabi','العوابي']]],
  ['Al Wusta','الوسطى',[['Duqm','الدقم'],['Mahut','محوت'],['Haima','هيماء'],['Al Jazer','الجازر']]],
  ['Ash Sharqiyah North','شمال الشرقية',[['Al Mudhaibi','المضيبي'],['Ibra','إبراء'],['Bidiyah','بدية'],['Sinaw','سناو'],['Dima Wa Al Taieen','دماء والطائيين'],['Al Qabil','القابل'],['Wadi Bani Khalid','وادي بني خالد']]],
  ['Ash Sharqiyah South','جنوب الشرقية',[['Sur','صور'],['Jalan Bani Bu Ali','جعلان بني بو علي'],['Jalan Bani Bu Hassan','جعلان بني بو حسن'],['Al Kamil and Al Wafi','الكامل والوافي'],['Masirah','مصيرة']]]
];
(function(){
  var m={'Other (type it)':'أخرى (اكتبها)','University of Technology and Applied Sciences':'جامعة التقنية والعلوم التطبيقية','Another university':'جامعة أخرى'};
  KH.UNIS.forEach(function(u){m[u[0]]=u[1]});
  KH.GEO.forEach(function(g){m[g[0]]=g[1];g[2].forEach(function(w){m[w[0]]=w[1]})});
  KH.DISC.forEach(function(d){d.majors.forEach(function(e,i){if(d.ar.majors[i])m[e]=d.ar.majors[i]})});
  KH.add(m);
})();
/* a date such as 2026-12-01, written for the current language */
KH.fmtDate=function(iso){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(String(iso||'')))return '';
  try{return new Date(iso+'T12:00:00').toLocaleDateString(KH.lang()==='ar'?'ar-u-nu-latn':'en-GB',{day:'numeric',month:'long',year:'numeric'})}catch(e){return iso}
};

/* qualification levels (an applicant picks one; HR can require some for each discipline) */
KH.QUAL=[['dip','Diploma','دبلوم'],['hd','Higher Diploma','دبلوم عالٍ'],['bsc','Bachelor’s degree','بكالوريوس'],['msc','Master’s degree','ماجستير']];
KH.qualName=function(k,lang){var q=KH.QUAL.filter(function(x){return x[0]===k})[0];return q?((lang||KH.lang())==='ar'?q[2]:q[1]):''};
KH.qualText=function(keys,lang){
  lang=lang||KH.lang();
  var n=(keys||[]).map(function(k){return KH.qualName(k,lang)}).filter(Boolean),or=lang==='ar'?' أو ':' or ';
  if(n.length<2)return n.join('');
  return n.length===2?n[0]+or+n[1]:n.slice(0,-1).join(lang==='ar'?'، ':', ')+or+n[n.length-1];
};
/* test days are whole days in Muscat time (UTC+4), counted from 1970-01-01 */
KH.todayNo=function(){return Math.floor((Date.now()+4*36e5)/864e5)};
KH.dayIso=function(n){return new Date(n*864e5).toISOString().slice(0,10)};
KH.isoNo=function(iso){return /^\d{4}-\d{2}-\d{2}$/.test(String(iso||''))?Math.floor(Date.parse(iso+'T00:00:00Z')/864e5):0};
KH.dayFmt=function(n,lang,mode){
  var o=mode==='long'?{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}:(mode==='short'?{day:'numeric',month:'short',timeZone:'UTC'}:{weekday:'short',day:'numeric',month:'short',timeZone:'UTC'});
  try{return new Date(n*864e5).toLocaleDateString((lang||KH.lang())==='ar'?'ar-u-nu-latn':'en-GB',o)}catch(e){return KH.dayIso(n)}
};
/* Outside Apps Script (for example on GitHub Pages) every back-end call goes to the web app address in config.js.
   This makes sure all calls exist, even when an older config.js is still in use. */
(function(){
  var NAMES=['register','countBlocked','publicInfo','myStatus','uploadTranscript','recoverStart','recoverVerify','tVerify','tPick','tStart','tSubmit','api'];
  var API=window.ALUMATE_API;
  if(typeof API!=='string'||!API)return;
  var g=window.google&&window.google.script&&window.google.script.run;
  if(g&&NAMES.every(function(n){return typeof g[n]==='function'}))return;
  function call(fn,args,ok,fail){
    var done=false;
    function bad(m){if(!done){done=true;if(fail)fail({message:m})}}
    if(!/^https?:\/\/[^\s]+$/.test(API)){bad('The web app address is not set in config.js.');return}
    fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({fn:fn,args:args})})
      .then(function(r){return r.json()})
      .then(function(r){
        if(done)return;done=true;
        if(r&&r.ok){if(ok)ok(r.value)}else if(fail)fail({message:(r&&r.error)||'Something went wrong.'});
      })
      .catch(function(){bad('Could not reach the server.')});
  }
  function runner(ok,fail){
    var o={
      withSuccessHandler:function(f){return runner(f,fail)},
      withFailureHandler:function(f){return runner(ok,f)}
    };
    NAMES.forEach(function(n){o[n]=function(){call(n,Array.prototype.slice.call(arguments),ok,fail)}});
    return o;
  }
  window.google={script:{run:runner()}};
})();
KH.add({
  'Winter 2026':'شتوي 2026','Summer 2027':'صيفي 2027',
  'Sultan Qaboos University':'جامعة السلطان قابوس','University of Technology and Applied Sciences':'جامعة التقنية والعلوم التطبيقية','Sohar University':'جامعة صحار','University of Nizwa':'جامعة نزوى','Dhofar University':'جامعة ظفار','A’Sharqiyah University':'جامعة الشرقية','Muscat University':'جامعة مسقط','Another university':'جامعة أخرى',
  'Reliability':'الموثوقية','Teamwork':'العمل الجماعي','Initiative':'المبادرة','Learning':'التعلّم','Composure':'الاتزان',
  'Enter your first name and family name.':'اكتب اسمك الأول واسم العائلة.',
  'Enter a valid email address.':'اكتب بريداً إلكترونياً صحيحاً.',
  'Use 8 digits without the country code.':'استخدم 8 أرقام بدون مفتاح الدولة.',
  'Enter your field of study.':'اكتب مجال دراستك.',
  'Choose your university, or type its name.':'اختر جامعتك، أو اكتب اسمها.',
  'Choose your governorate and wilayat.':'اختر محافظتك وولايتك.',
  'Applications for this intake are closed.':'التسجيل لهذا الموسم مغلق.',
  'We could not find an application with that number and reference.':'لم نعثر على طلب بهذا الرقم ورقم الطلب.',
  'Too many attempts. Please try again in 10 minutes.':'محاولات كثيرة. حاول مرة أخرى بعد 10 دقائق.',
  'Too many uploads. Please try again later.':'عدد كبير من عمليات الرفع. حاول لاحقاً.',
  'Choose a file first.':'اختر ملفاً أولاً.',
  'The file is larger than 4 MB. Please send a smaller file.':'حجم الملف أكبر من 4 ميغابايت. أرسل ملفاً أصغر.',
  'We could not read that file. Please try another one.':'تعذّرت قراءة الملف. جرّب ملفاً آخر.',
  'Upload a PDF, JPG or PNG file.':'ارفع ملفاً بصيغة PDF أو JPG أو PNG.',
  'Enter a GPA between 0 and 4.':'اكتب معدلاً بين 0 و 4.',
  'Choose a discipline and an intake.':'اختر التخصص والموسم.',
  'This number is already registered for this intake.':'هذا الرقم مسجّل مسبقاً في هذا الموسم.',
  'We could not match that number and code. Check the SMS you received.':'لم نتمكن من مطابقة الرقم والرمز. راجع الرسالة النصية التي وصلتك.',
  'We could not match that number and code.':'لم نتمكن من مطابقة الرقم والرمز.',
  'These tests were already submitted for this code.':'تم تسليم الاختبارات لهذا الرمز مسبقاً.',
  'This test was already started. Please contact the HR team if you need it reopened.':'بدأ هذا الاختبار مسبقاً. تواصل مع فريق الموارد البشرية إذا احتجت إلى إعادة فتحه.',
  'Please start the test first.':'ابدأ الاختبار أولاً.',
  'This test was opened before an update. Please ask the HR team to reopen it.':'فُتح هذا الاختبار قبل تحديث النظام. اطلب من فريق الموارد البشرية إعادة فتحه.',
  'Something went wrong.':'حدث خطأ.',
  'Something went wrong. Please try again.':'حدث خطأ. حاول مرة أخرى.',
  'We could not reach the server. Please try again in a moment.':'تعذّر الوصول إلى الخادم. حاول مرة أخرى بعد قليل.',
  'We could not reach the server. Please try again.':'تعذّر الوصول إلى الخادم. حاول مرة أخرى.',
  'Wrong password.':'كلمة السر غير صحيحة.',
  'Too many wrong attempts. Try again in 10 minutes.':'محاولات خاطئة كثيرة. حاول مرة أخرى بعد 10 دقائق.',
  'Set HR_PASSWORD at the top of Code.gs and deploy again.':'غيّر HR_PASSWORD في أعلى ملف Code.gs ثم انشر التطبيق من جديد.',
  'Could not reach the server.':'تعذّر الوصول إلى الخادم.',
  'Run setup() once from the Apps Script editor first.':'شغّل setup() مرة واحدة من محرر Apps Script أولاً.',
  'Choose your qualification.':'اختر مؤهلك الدراسي.',
  'Applications for this intake have not opened yet.':'التسجيل لهذا الموسم لم يبدأ بعد.',
  'Your qualification does not meet the requirement for this programme.':'مؤهلك الدراسي لا يحقق شرط هذا البرنامج.',
  'Enter the email address or 8-digit mobile number you registered with.':'اكتب البريد الإلكتروني أو رقم الجوال (8 أرقام) الذي سجّلت به.',
  'We could not find an application with that email address or mobile number.':'لم نعثر على طلب بهذا البريد الإلكتروني أو رقم الجوال.',
  'This code has expired or was not requested. Please ask for a new one.':'انتهت صلاحية هذا الرمز أو لم يُطلب. اطلب رمزاً جديداً.',
  'Too many wrong codes. Please ask for a new one.':'أخطأت في الرمز مرات كثيرة. اطلب رمزاً جديداً.',
  'That code is not correct.':'الرمز غير صحيح.',
  'The test period for your code has ended. Please contact the HR team.':'انتهت فترة الاختبار المخصصة لرمزك. تواصل مع فريق الموارد البشرية.',
  'No test period is set for this code.':'لا توجد فترة اختبار محددة لهذا الرمز.',
  'Choose a day inside your test period.':'اختر يوماً ضمن فترة الاختبار.',
  'Choose your test day first.':'اختر يوم الاختبار أولاً.',
  'Your test is booked for a later day. Please come back on that day.':'اختبارك محجوز ليوم لاحق. عد في ذلك اليوم.',
  'The day you chose has passed. Please choose a new day.':'انتهى اليوم الذي اخترته. اختر يوماً جديداً.'
});
