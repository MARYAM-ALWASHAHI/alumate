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
  function init(force){cur=detect(force);paint();return cur}
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
KH.DISC=[
  {id:'hse',title:'Health & Safety',tag:'HSE',h:150,base:3,desc:'Support safety audits, incident reporting and awareness campaigns.',eg:'Occupational health, environmental science, industrial hygiene',majors:['Occupational Health & Safety','Environmental Science','Industrial Hygiene','Chemistry'],g:'<path d="M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8z"/><path d="M11 16l4 4 6-8"/>',
    ar:{title:'الصحة والسلامة',desc:'دعم عمليات تدقيق السلامة وتقارير الحوادث وحملات التوعية.',eg:'الصحة المهنية، العلوم البيئية، الصحة الصناعية',majors:['الصحة والسلامة المهنية','العلوم البيئية','الصحة الصناعية','الكيمياء']}},
  {id:'hr',title:'Human Resources',tag:'HR',h:15,base:3,desc:'Help with recruitment logistics, onboarding and employee records.',eg:'HR management, psychology, business administration',majors:['Human Resource Management','Psychology','Business Administration'],g:'<circle cx="12" cy="11" r="4"/><path d="M4 27c0-5 4-8 8-8s8 3 8 8"/><circle cx="23" cy="11" r="3"/><path d="M22 19c4 0 6 3 6 7"/>',
    ar:{title:'الموارد البشرية',desc:'المساعدة في إجراءات التوظيف والتهيئة وسجلات الموظفين.',eg:'إدارة الموارد البشرية، علم النفس، إدارة الأعمال',majors:['إدارة الموارد البشرية','علم النفس','إدارة الأعمال']}},
  {id:'mg',title:'Management & Administration',tag:'MGT',h:35,base:3,desc:'Assist managers with planning, reporting and administrative operations.',eg:'Business administration, management, public administration',majors:['Business Administration','Management','Public Administration','Office Management'],g:'<rect x="4" y="10" width="24" height="16" rx="3"/><path d="M12 10V7h8v3M4 17h24"/>',
    ar:{title:'الإدارة والشؤون الإدارية',desc:'مساندة المدراء في التخطيط والتقارير والعمليات الإدارية.',eg:'إدارة الأعمال، الإدارة، الإدارة العامة',majors:['إدارة الأعمال','الإدارة','الإدارة العامة','إدارة المكاتب']}},
  {id:'en',title:'Engineering',tag:'ENG',h:225,base:4,desc:'Work with plant and project engineers on real operating problems.',eg:'Mechanical, chemical, electrical, industrial, civil, materials',majors:['Mechanical Engineering','Chemical Engineering','Electrical Engineering','Industrial Engineering','Civil Engineering','Materials Engineering'],g:'<circle cx="16" cy="16" r="4"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M24.5 7.5l-2.8 2.8M10.3 21.7l-2.8 2.8"/>',
    ar:{title:'الهندسة',desc:'العمل مع مهندسي المصنع والمشاريع على مشكلات تشغيلية حقيقية.',eg:'الهندسة الميكانيكية والكيميائية والكهربائية والصناعية والمدنية وهندسة المواد',majors:['الهندسة الميكانيكية','الهندسة الكيميائية','الهندسة الكهربائية','الهندسة الصناعية','الهندسة المدنية','هندسة المواد']}},
  {id:'it',title:'Information Technology',tag:'IT',h:265,base:3,desc:'Support systems, networks and internal tools with the IT team.',eg:'Computer science, information systems, networks, cybersecurity',majors:['Computer Science','Information Systems','Networks Engineering','Cybersecurity','Software Engineering'],g:'<path d="M11 9l-7 7 7 7M21 9l7 7-7 7M18 6l-4 20"/>',
    ar:{title:'تقنية المعلومات',desc:'دعم الأنظمة والشبكات والأدوات الداخلية مع فريق تقنية المعلومات.',eg:'علوم الحاسوب، نظم المعلومات، الشبكات، الأمن السيبراني',majors:['علوم الحاسوب','نظم المعلومات','هندسة الشبكات','الأمن السيبراني','هندسة البرمجيات']}}
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
KH.add({
  'Winter 2026':'شتوي 2026','Summer 2027':'صيفي 2027',
  'Sultan Qaboos University':'جامعة السلطان قابوس','University of Technology and Applied Sciences':'جامعة التقنية والعلوم التطبيقية','Sohar University':'جامعة صحار','University of Nizwa':'جامعة نزوى','Dhofar University':'جامعة ظفار','A’Sharqiyah University':'جامعة الشرقية','Muscat University':'جامعة مسقط','Another university':'جامعة أخرى',
  'Reliability':'الموثوقية','Teamwork':'العمل الجماعي','Initiative':'المبادرة','Learning':'التعلّم','Composure':'الاتزان',
  'Enter your first name and family name.':'اكتب اسمك الأول واسم العائلة.',
  'Enter a valid email address.':'اكتب بريداً إلكترونياً صحيحاً.',
  'Use 8 digits without the country code.':'استخدم 8 أرقام بدون مفتاح الدولة.',
  'Enter your degree.':'اكتب تخصصك الدراسي.',
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
  'Run setup() once from the Apps Script editor first.':'شغّل setup() مرة واحدة من محرر Apps Script أولاً.'
});
