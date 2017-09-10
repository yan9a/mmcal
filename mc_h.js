//-----------------------------------------------------------------------------
//Start of chronical dates ####################################################

//Credit: Thanks to U Aung Zeya for listing and sending many of the chronical dates listed in this calendar.
var g_History;
function ChronicalDates(a) {g_History=a;}

//Month number enumeration
var mme={"First Waso":0,"Tagu":1,"Kason":2,"Nayon":3,"Waso":4,"Wagung":5,"Tawthalin":6,
	"Thadingyut":7,"Tazaungmon":8,"Nadaw":9,"Pyatho":10,"Tabodwe":11,"Tabaung":12,
	"Hnaung Tagu":13,"Hnaung Kason":14,"Late Tagu":13,"Late Kason":14,"Second Waso":15};

//Moon phase enumeration
var mpe={"Waxing":0, "Full moon":1, "Waning":2, "New moon":3};

//Week day enumeration
var wde={"Saturday":0, "Sunday":1, "Monday":2, "Tuesday":3, "Wednesday":4, "Thursday":5,"Friday":6};
//-----------------------------------------------------------------------------
//Search jd in chronical dates
//input: (jd=Julian day number)
//output: (i= index, f=flag [0: not found, 1: found], my: Myanmar year,
// myt: Myanmar year type [0: common year, 1: watat],
// mm: Myanmar month, mmt: Myanmar month type [0: Oo, 1: Hnaung],
// mp: moon phase, fd: fortnight day, wd: day of the week,
// dt: description, hl: URL)
function hSearch(jd)
{
	var myt=0,mmt=0,mm=1,ho;
	var ho_mm,ho_mp,ho_fd,ho_my,ho_wd,ho_dt,ho_lk;
	var i=0; var l=0; var u=g_History.length-1;
	while(u>=l) {
		i = Math.floor((l+u)/2); // calculate midpoint
		ho=g_History[i];
		if (ho["Julian Day Number"]<jd) l=i+1;
		else if (ho["Julian Day Number"]>jd)  u=i-1;
        else { // found
			ho_mm=mme[ho["Myanmar Month"]];
			ho_mp=mpe[ho["Moon Phase"]];
			ho_fd=ho["Fortnight Day"];
			ho_my=ho["Myanmar Year"];
			ho_wd= wde[ho["Day of the Week"]];
			ho_dt=ho["Description"];
			ho_lk=ho["Link"];//link
			if(ho_lk==undefined) ho_lk="index.htm";
			if(ho_mm==15){myt=1; mm=4;}
			else {mmt=Math.floor(ho_mm/13); mm=ho_mm%13+mmt;}
			return {i:i,f:1,my:ho_my,myt:myt,mm:mm,mmt:mmt,
				mp:ho_mp,fd:ho_fd,wd:ho_wd,dt:ho_dt,link:ho_lk};
		}
    }
return {i:-1,f:0,my:0,myt:0,mm:0,mmt:0,mp:0,fd:0,wd:0,dt:"",link:"index.htm"};//not found
}
//-----------------------------------------------------------------------------
ChronicalDates(
[
{
	"Julian Day Number":1995076,
	"Myanmar Year":111,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waxing",
	"Fortnight Day":11,
	"Day of the Week":"Sunday",
	"Description":"Foundation of Arimaddana."
},
{
	"Julian Day Number":2031512,
	"Myanmar Year":211,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Monday",
	"Description":"Foundation of Pagan."
},
{
	"Julian Day Number":2107906,
	"Myanmar Year":420,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Thursday",
	"Description":"ဂဝံကျောင်း ကျောက်စာ၊ လက်သည်းရှည်ဘုရား၊ ပုဂံမြို့၊ အနော်ရထာမင်းကြီး။ ကျောင်းပြု၍ ဆင်၊ မြင်း၊ လယ်၊ မြေလှူဒါန်း။ သကရစ် ၄၂၀ ဘဿနှစ် တပေါင်လ္ဆန် ၅ ရက် ၅ နိယ်လျှင် ဘုန်တန်ခိုဝ် ပ္လည်ာနှင် ပ္လည်စုံမ်စွာသော စ်အနောရဓါ မင်ကြီကာ ၁ သူမ္လင် လောက် အဓုံမ်ကိုဝ် ယရုယ် သ္ခိင်ကဝံ ထု၏ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၁၀။"
},
{
	"Julian Day Number":2125483,
	"Myanmar Year":469,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Thursday",
	"Description":"ပရိမ္မထီးလိုင်သျှင်ဘုရားကျောက်စာ၊ ထီးလှိုင်ရှင်ဘုရား၊ ပရိမ္မရွာ၊ မြောင်မြို့နယ်၊ စေတီတည်၍၊ ကျွန်၊ စပါး၊ ငရုတ်၊ ချင်း၊ ဆား၊ ငါးပိ စသည်လှူဒါန်း။ သကရဇ် ၄၆၉ ခူ မာဃ ဂံဝဇ္ဆိုဏ် သိရိ ဘဝနာ ဒိတျ ဝံင်္သ ရာဇာဓိ ရာဇာ။ မဟ ဗ္ဗလော ဇိနိတွာန ၊ မဟိံ သဗ္ဗံ နိဗာနံ သမ္ပတာရ ယန္တိ ။ ကုဆုန်လ္ဆန် ၁၀ ၅ နိယ် မိမိဖွာရာ ပရိမ်ပြည်နှိုက် ဓိလိုင်သျင် မင်ကြီ စေတီ တည်၏ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅ (က)။"
},
{
	"Julian Day Number":2127136,
	"Myanmar Year":473,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Friday",
	"Description":"လှည်းထောင်ဘုရားကျောက်စာ၊ တောင်ပြုန်းကြီး၊ အလောင်းစည်သူမင်းကြီး။ ဘုရားတည်ကျောင်းပြု၍ မြေလှူဒါန်း။ သက္ကရာစ် ၄၇၃ ခု တန်စောင်မုန် လဆန် ဆဲရက် သောက်ကြာ နံနက် သရဝန် နက်သတ် နှစ်ဆဲ နှစ်လုံမ်လျှင် ပ္လုတဝ်မူ၏ ၊ ငါပ္လုသော ဖုရာ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၄ (က)။"
},
{
  "Julian Day Number":2149217,
  "Myanmar Year":534,
  "Myanmar Month":"Kason",
  "Moon Phase":"Waxing",
  "Fortnight Day":2,
  "Day of the Week":"Monday",
  "Description":"၅၃၄ (*၅၃၉) ခု ။ ကုဆုန်လ္ဆန် ၂ ရျက် တနှင်လာညန် သန်ကောင်လွန်ပေသော ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် (၇၈-က)။"
 },
{
	"Julian Day Number":2150320,
	"Myanmar Year":537,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Friday",
	"Description":"သင်ကြီးငါယန်သင် ကျောက်စာ။ သိမ်နှင့်ပုထိုးပြု၍ ကျွန်၊ လယ်၊ ယာ၊ နွား၊ စသည့် လှူဒါန်း။ ... သကရစ် (၅၃) ၇ ခု ကြတီုက်နှစ် ကူဆူန်လ္ဆန် ၁၀ ရျာက် သုက္ကြာနိယ္အ်အာ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၃။ (ကြတိုက်နှစ်ဆိုပါက ၅၃၈ ဖြစ်သင့်သည်။)"
}, 	
{ 
  "Julian Day Number":2152069, 
  "Myanmar Year":541, 
  "Myanmar Month":"Tabodwe", 
  "Moon Phase":"Waning", 
  "Fortnight Day":5, 
  "Day of the Week":"Friday", 
  "Description":"ကျစွာမင် မိထွေးတော်ကျောင်း ကျောက်စာ။ သကရစ် ၅၄၁ ခု။ မာဃနှစ်။ တပိုဝ်ထွယ်လ္ဆုတ် (၅ ရျ)က်။ ၆ နိယ် သင်ကြီ ငထာသင်... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၅၈။" 
 },
{
	"Julian Day Number":2152959,
	"Myanmar Year":544,
	"Myanmar Month":"Waso",
	"Moon Phase":"Waning",
	"Fortnight Day":7,
	"Day of the Week":"Friday",
	"Description":"အိုနူသင် ကျောက်စာ၊ ကျွန် လှူဒါန်း။ သကရစ် ၅၄၄ ခု ဗိသျက်နှစ် မ္လယ်တာလဆုတ် ၇ ရျာက် သုကြာနိ ဖုန်အသည် ကြိယ် အိုနူသင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၂၁။"
},
{
  "Julian Day Number":2153441,
  "Myanmar Year":545,
  "Myanmar Month":"Tazaungmon",
  "Moon Phase":"Waxing",
  "Fortnight Day":3,
  "Day of the Week":"Thursday",
  "Description":"စည်သူမင်းကြီး ကျောက်စာ။  သက္ကရစ် ၅၄၅ ခု စိသ နှစ် တန်ဆောင်မုန် လ္ဆန် ၃ ရျက် ကြာသပတေနိယ္အ်အာ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၄ (ခ)။"
 },
{
	"Julian Day Number":2153574,
	"Myanmar Year":545,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Thursday",
	"Description":"ပရိမ္မထီးလိုင်သျှင်ဘုရားကျောက်စာ၊ ထီးလှိုင်ရှင်ဘုရား၊ ပရိမ္မရွာ၊ မြောင်မြို့နယ်၊ အလောင်းစည်သူမင်းကြီး။ ဂူ ဘုရားပြု၍ လယ်မြေလှူဒါန်း။ သက္ကစ် ၅၄၅ ခု စိတ်သနှစ် တပေါင်လ္ဆုတ် ၅ ရျက် ၅ နိယ်လျှင် နတ်ရွာသဖွယ် ဖ္လစ်သော ပရိမ်မည်သပြည်နှိုက် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅ (ခ)။"
},
{
  "Julian Day Number":2157668,
  "Myanmar Year":557,
  "Myanmar Month":"Nayon",
  "Moon Phase":"Waxing",
  "Fortnight Day":7,
  "Day of the Week":"Wednesday",
  "Description":"သူကြွယ်ကျောင်း ကျောက်စာ။ သက္ကရစ် ၅၅၇ ခု နံယုံလ္ဆန် ၇ ရျက် ၄ နေ့လျှင်  ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၉၀။"
 },
{
	"Julian Day Number":2158888,
	"Myanmar Year":560,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Friday",
	"Description":"မောင်းမ စောခင်မိငယ် ကျောက်စာ။ ဓမ္မရာဇိကဘုရား၊ ပုဂံမြို့။ လှူဒါန်း။ သကရစ် ၅၆၀ ဖဿနှစ် သန္တူလ္ဆုတ် ၂ ရျက် သုကြာနိယ် မောင်မ ခင်မိငယ် ဖုရှာ လှူသော တန်ရောက်လယ် ၅၀ လှူ၏ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၃၇။ <br/><br/> ပုဂံ ရွှေကျာင်း အရှေ့ဂူ ကျောက်စာ။  သကရစ် ၅၆၀ ဖဿနှစ် သန္တူလ္ဆုတ် ၂ ရျက် သောကြာနိယ်အာ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၇။"
},
{
	"Julian Day Number":2159759,
	"Myanmar Year":562,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Monday",
	"Description":"စည်သူမင်းကြီး ကျောက်စာ၊ စည်သူမင်းကြီးလင်မယား။ ပုထိုး၊ ဂူ၊ တံတိုင်းပြု၍ ကျွန်၊ လယ် စသည်လှူဒါန်း။ သက္ကရစ် ၅၆၂ ခု ကြတိုက်နှစ် တပေါင်လ္ဆုန် ၅ ရျက် ၂ နိယ် သစ်မတီအရပ်နှိုက် စည်သူမင်ကြီသည် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၂၃။"
},
{
	"Julian Day Number":2161311,
	"Myanmar Year":567,
	"Myanmar Month":"Kason",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Saturday",
	"Description":"သင်ငါနှစ်လို့သင် ကျောက်စာ၊ သင်ငါနှစ်လို့သင်။ ဂူဘုရားအားကျွန်၊ နွား၊ လယ် စသည်လှူဒါန်း။ မ္လတ်စွာသော ပုရှာသ္ခိင် သာသနာ လွန်လိယ်ပြီသော အနှစ် ၁၇၅၀ သကရစ် ၅၆၇ စေယ်နှစ် ။ ကုဆုန်လ ပ္လည် စနိယ်နိယ်အာ သင်ငါနှစ်လိုဝ္အ်သင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၂၄ (က ၊ ခ)။ ( က ရှိ ၅၆၇ မှာ သာသနာနှစ်နှင့် မကိုက်ပဲ ခ ရှိ ၅၆၈ မှာကိုက်ညီသည်။ သို့သော် စေယ်နှစ်ဆိုပါက က ရှိ ၅၆၇ မှာကိုက်ညီသည်။ မောင်းမ စောခင်မိငယ် ကျောက်စာ အရ ၅၆၈ ကဆုန်လပြည့်မှာ ဗုဒ္ဓဟူးဖြစ်သဖြင့်၊ ဤ ခုနှစ်မှာ ၅၆၇ ဟု ယူဆရသည်။)"
},
{
	"Julian Day Number":2161665,
	"Myanmar Year":568,
	"Myanmar Month":"Kason",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Wednesday",
	"Description":"မောင်းမ စောခင်မိငယ် ကျောက်စာ။ ဓမ္မရာဇိကဘုရား၊ ပုဂံမြို့။ လှူဒါန်း။ သကရစ် ၅၆၈ ခု ပိသျက်နှစ် ကဆုန်လပ္လည် ပုတ္တဟူနိယ် မောင်မ စဝ်ခင်မိငယ် ဖုရှာကိုဝ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၃၇။"
}, 	
{ 
  "Julian Day Number":2162746, 
  "Myanmar Year":571, 
  "Myanmar Month":"Kason", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":7, 
  "Day of the Week":"Thursday", 
  "Description":"မင်းမတ်နဂါပိုရ်မိဖွါးကျောက်စာ။ သကရစ် ၅၇၁ ခု အာသိန်နှစ်၊ ကုဆုန်လ္ဆန် ၇ ရျက် ၅ နိယ်အာ၊ မင်မတ် နဂါပိုရ် မိဖွါ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၃။  " 
 },
{
	"Julian Day Number":2163605,
	"Myanmar Year":573,
	"Myanmar Month":"Tawthalin",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Thursday",
	"Description":"Htilominlo comes to power."
},
{
	"Julian Day Number":2169199,
	"Myanmar Year":588,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Friday",
	"Description":"ဖျက္ကသု ကျောက်စာ။ ဖျက္ကသုမင်း။ လယ်၊ မြေ လှူဒါန်း။ သာကရစ် ၅၈၈ ခု ပုဿနှစ် နတ္တဝ်လဆု . ၅ သုကြာနိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၂၉။"
}, 	 	 	
{ 
  "Julian Day Number":2170481, 
  "Myanmar Year":592, 
  "Myanmar Month":"Waso", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":5, 
  "Day of the Week":"Saturday", 
  "Description":"မကွေးသူ မုဆိုးမ ကျောက်စာ။ သကရစ် ၅၉၂ ခု ဖ္လကိုန်  မ္လွယ်တာလဆန် ၅ ရျက် စနိယ်နိယ်အာ ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၁၈။" 
 },
{ 
  "Julian Day Number":2171439, 
  "Myanmar Year":594, 
  "Myanmar Month":"Tabodwe", 
  "Moon Phase":"Waning", 
  "Fortnight Day":2, 
  "Day of the Week":"Friday", 
  "Description":"အမတ်အစလပိဇည်တို့ကျောက်စာ။ သကရစ် ၅၉၄ ခု တပိုဝ်ထွယ် လဆု ၂ င်္ရျ သုကြနိ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၉။  " 
 },
{ 
  "Julian Day Number":2172263, 
  "Myanmar Year":597, 
  "Myanmar Month":"Kason", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":15, 
  "Day of the Week":"Wednesday", 
  "Description":"သူကြွယ်ငါစပါသင် ကျောက်စာ။ သကရစ် ၅၉၇ ခုကုဆုန် လပ္လည္အ် ပုတ္တဟောနိယ္အ် သုကြွယ် ငါစပါသင် ...။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၈၉(က)။" 
 },
{
	"Julian Day Number":2172725,
	"Myanmar Year":598,
	"Myanmar Month":"Tawthalin",
	"Moon Phase":"Waxing",
	"Fortnight Day":7,
	"Day of the Week":"Wednesday",
	"Description":"သိရိတရိဘဝနာတိတျပဝရ မဟာ ဓမ္မရာဇာ စေည်ု။ ဘုရားတည်၊ ကျောင်းဆောက်၍၊ လယ်၊ မြေ လှူဒါန်း။ သက္ကရာဇ် ၅၉၈ ကြတိုက်နှစ် တော်သလင်လဆန် ၇ ရက် ဗုဒ္ဓဟုနိယ်၊ သိရိ တရိ ဘဝနာ တိတျ ပဝရ မဟာဓမ္မရာဇာ စေည်ု အမည်တော်ဟိသော ဖုရာဆုတောင်သော ၊ မင်မြတ်သှ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၂၈။"
}, 	
{ 
  "Julian Day Number":2173332, 
  "Myanmar Year":600, 
  "Myanmar Month":"Tagu", 
  "Moon Phase":"Waning", 
  "Fortnight Day":5, 
  "Day of the Week":"Monday", 
  "Description":"မဟာဂေါတမဘုရားကျောက်စာ။ သကရစ် ၆၀၀ ပုဿနှစ် တန်ခူလ္ဆုတ် ၅ ရျက် တနှင်လာနိယ်... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၁။  " 
 }, 	
{ 
  "Julian Day Number":2173680, 
  "Myanmar Year":601, 
  "Myanmar Month":"Tagu", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":2, 
  "Day of the Week":"Saturday", 
  "Description":"အမတ်အစလပိဇည်တို့ကျောက်စာ။ သကရစ် ၆၀၁ ခု။ တန်ထူလပ္လည် စနိယ်နိယ်... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၉။  " 
 }, 	
{ 
  "Julian Day Number":2173699, 
  "Myanmar Year":601, 
  "Myanmar Month":"Kason", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":5, 
  "Day of the Week":"Thursday", 
  "Description":"ငကောင်ရင်သင်ဂူကျောင်းကျောက်စာ။ သက္ကရစ် ၆၀၁ ခု၊ မာခနှစ် ကဆုန်လဆန် ၅ ရျက် ကြာသပတေနိယ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၁၄။  " 
 },
{
  "Julian Day Number":2173825,
  "Myanmar Year":601,
  "Myanmar Month":"Tawthalin",
  "Moon Phase":"Waxing",
  "Fortnight Day":13,
  "Day of the Week":"Thursday",
  "Description":"လေးမျက်နှာဘုရား ကျောက်စာ။ သကရစ် ၆၀၁ မာခနှစ် တ်သလင်လဆန် ၁၃ ရျက် ကြသပတေ ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၀၂။"
 }, 	  	
{ 
  "Julian Day Number":2173827, 
  "Myanmar Year":601, 
  "Myanmar Month":"Tawthalin", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":15, 
  "Day of the Week":"Saturday", 
  "Description":"သင်လျင်သိရတ်မောင်နှံကျောက်စာ။ သကရစ် ၆၀၁ ။ မာခနှစ် တဝ်သလင်လဆန် ၁၅ ရျက် စနိယ်နိယ္အ်လျှင် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၁၀။  " 
 },	
{ 
  "Julian Day Number":2173980, 
  "Myanmar Year":601, 
  "Myanmar Month":"Tabodwe", 
  "Moon Phase":"Waning", 
  "Fortnight Day":5, 
  "Day of the Week":"Friday", 
  "Description":"ရတနာသုံးပါးအားကျွန်လယ်လှူသောကျောက်စာ။ သကရစ် ၆၀၁ ခု မာခါနှစ် တပိုဝ်ထွယ် လဆုတ် ၅ ရျက် သုကြာနိယ်... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၆။  " 
 },
{ 
  "Julian Day Number":2173991, 
  "Myanmar Year":601, 
  "Myanmar Month":"Tabaung", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":1, 
  "Day of the Week":"Monday", 
  "Description":"မင်းမတ်နဂါပိုရ်မိဖွါးကျောက်စာ။ သကရစ် ၆၀၁ ခု မာဃနှစ်၊ တပေါင်လ္ဆန် ၁ ရျက် ၂ နိယ်အာ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၃။  " 
 }, 	
{ 
  "Julian Day Number":2174151, 
  "Myanmar Year":602, 
  "Myanmar Month":"Kason", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":12, 
  "Day of the Week":"Monday", 
  "Description":"ဖုန်းသည် သင်ကြီး ငါပံသင် ကျောက်စာ။ သကရစ် ၆၀၂ ခု ကုဆုန်လဆန် ၁၂ ရျက် တနှင်္လာနိယ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၁၅။" 
 }, 	
{ 
  "Julian Day Number":2174152, 
  "Myanmar Year":602, 
  "Myanmar Month":"Waso", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":13, 
  "Day of the Week":"Wednesday", 
  "Description":"သူကြွယ် ငစုယ်သင် ဘုရားကြီး ကျောက်စာ။ သကရစ် ၆၀၂ ခု ဖုတ်သနှစ် မ္လွယ်တာလ္ဆန် ၁၃ ရျက် ၄ နိယ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၂၁။" 
 },
{
	"Julian Day Number":2174154,
	"Myanmar Year":602,
	"Myanmar Month":"Waso",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Monday",
	"Description":"ဖုန်မ္လတ်ပုရှာ မယ်တော် ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၀၂ ခု ဖ္လကိုန် သံဝစ္ဆိုဝ်ရနှစ် မ္လယ်တာလပ္လည် တန်နှင်လာနိယ် ဖုန်မ္လတ်ပုရှာ မယ်တော်ကာ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၂၈။"
}, 	 	
{ 
  "Julian Day Number":2174163, 
  "Myanmar Year":602, 
  "Myanmar Month":"Waso", 
  "Moon Phase":"Waning", 
  "Fortnight Day":9, 
  "Day of the Week":"Thursday", 
  "Description":"မကွေးသူ မုဆိုးမ ကျောက်စာ။ သကရစ် ၆၀၂ ခု  မ္လွယ်တာလဆုတ် ၉ ရျက်ကြသပတိယ်နိယ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၁၉။" 
 }, 	
{ 
  "Julian Day Number":2174272, 
  "Myanmar Year":602, 
  "Myanmar Month":"Tazaungmon", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":15, 
  "Day of the Week":"Monday", 
  "Description":"ငဇဝ်သင် ကျောက်စာ။ သကရစ် ၆၀၂ ခု  ဖလကိုန်နှစ် တန်ဆောင်မှုန် လပ္လည် သတင် တနှင်လာနိယ္အ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၂၀။" 
 }, 	
{ 
  "Julian Day Number":2174410, 
  "Myanmar Year":603, 
  "Myanmar Month":"Tagu", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":7, 
  "Day of the Week":"Monday", 
  "Description":"ဖွားစောခေါ် အမိပုရှာစော ကျောက်စာ။ သကရစ် ၆၀၃ ခု။ တန်ခူလဆန် ၇ ရျက်။ တနှင်လာနိယ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၂၉။" 
 },
 { 
  "Julian Day Number":2174447, 
  "Myanmar Year":603, 
  "Myanmar Month":"Kason", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":15, 
  "Day of the Week":"Wednesday", 
  "Description":"ဖွားစောခေါ် အမိပုရဟားစော ကျောက်စာ။ သကရစ် ၆၀၃ ခု။ စယ်နှစ်။ ကုဆုန်လပ္လည် ဗုဒ္ဓဟူနိယ္အ်နှိုက် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၂၄။" 
 },
 { 
  "Julian Day Number":2174617, 
  "Myanmar Year":603, 
  "Myanmar Month":"Tazaungmon", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":8, 
  "Day of the Week":"Friday", 
  "Description":"သ္ခိင်ဖွားကြီးမြေး စိုးမင်း ကျောက်စာ။ သကရစ် ၆၀၃ ခု စယ်နှစ် တန်ဆောင်မှုန်လ္ဆန် ၈ ရ္ယာက် သုကြာနိယ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၂၇။" 
 }, 	 	
{ 
  "Julian Day Number":2174772, 
  "Myanmar Year":604, 
  "Myanmar Month":"Tagu", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":13, 
  "Day of the Week":"Thursday", 
  "Description":"ရွှေဂူဘုရား ကျောက်စာ။ သကရစ် ၆၀၄ ခု ဗိသျက် သံဝစ္ဆိုဝ်နှစ် တန်ခူလဆန် ၁၃ ရျက် ကြဿပတိယ်နိယ္အ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၅၆။" 
 }, 	
{ 
  "Julian Day Number":2174798, 
  "Myanmar Year":604, 
  "Myanmar Month":"Kason", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":10, 
  "Day of the Week":"Friday", 
  "Description":"ကျစွာမင် မိထွေးတော်ကျောင်း ကျောက်စာ။ သကရစ် ၆၀၄ ခု။ ကဆုန်လ္ဆန် ၁၀ ရျက် သုကြာနိယ်... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၅၉။" 
 },
{ 
  "Julian Day Number":2174804, 
  "Myanmar Year":604, 
  "Myanmar Month":"Kason", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":15, 
  "Day of the Week":"Wednesday", 
  "Description":"သံဗျင် အစလဘိရစ် ဒါနပတိ မောင်နှံ ကျောက်စာ။ သကရစ် ၆၀၄ ခု ဖ္လကုန်နှစ် ကုဆုန်လ ပ္လည် ပုတ္တ ဟူနိယ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၃၀။" 
 }, 	 	
{ 
  "Julian Day Number":2174913, 
  "Myanmar Year":604, 
  "Myanmar Month":"Wagung", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":6, 
  "Day of the Week":"Wednesday", 
  "Description":"မြေအတွက် အချင်းများသော ကျောက်စာ။ သကရစ် ၆၀၄ ခု ဗိသျက်နှစ် နံကာလဆန် ၆ ရျက် ပုတ္တဟူနိယ် ... ။ ကျစွာမင် မိထွေးတော်ကျောင်း ကျောက်စာ။ သကရစ် ၆၀၄ ခု နံကာလ္ဆန် ၆ ရျက် ပုတ္တဟူနိယ်အာ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၅၂၊ ၅၉။" 
 }, 	
{ 
  "Julian Day Number":2174951, 
  "Myanmar Year":604, 
  "Myanmar Month":"Tawthalin", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":15, 
  "Day of the Week":"Thursday", 
  "Description":"သူကြွယ် ငါမြှောက်သင် ကျောက်စာ။ သကရစ် ၆၀၄ ခု ပိသျက် သံမဆ္စိုရာနှာစ် တဝ်သ္လင်လပ္လည် ကြတ္သပတိယ်နိယ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၅၃။" 
 }, 	
{ 
  "Julian Day Number":2175005, 
  "Myanmar Year":604, 
  "Myanmar Month":"Tazaungmon", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":10, 
  "Day of the Week":"Thursday", 
  "Description":"သ္ခိင် ငမည်သင် ဂုဏာတိရိတ် ကျောက်စာ။ သကရစ် ၆၀၄ ခု ဗိသျက်နှစ် တန်ဆောင်မှုန်လဆန် ၁(၀) ရျက် ကြသပတိယ်နိယ္အ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၅၄။" 
 },
{ 
  "Julian Day Number":2175054, 
  "Myanmar Year":604, 
  "Myanmar Month":"Nadaw", 
  "Moon Phase":"Waning", 
  "Fortnight Day":14, 
  "Day of the Week":"Thursday", 
  "Description":"ညောင်ရံကြီး သမီး ကျောက်စာ။ သကရစ် ၆၀၄ ခု။ ပိသျက်နှစ်။ နတ်တော် လဆုတ် ၁၄ ရျက် သတင် ကြဿတိယ်နိယ္အ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၃၃။" 
 }, 	 	
{ 
  "Julian Day Number":2175057, 
  "Myanmar Year":604, 
  "Myanmar Month":"Pyatho", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":3, 
  "Day of the Week":"Sunday", 
  "Description":"ညောင်ရံကြီး သမီး ကျောက်စာ။ သကရစ် ၆၀၄ ခု။ ပိသျက်နှစ်။ ပ္လသိုဝ်လဆန် ၃ ရျက် တန်နှင်ကုနုယ်နိယ္အ် ... ။ ရှေးဟောင်းမြန်မာကျောက်စာများ-ဒုတိယတွဲ။ စာမျက်နှာ ၃၃။" 
 },
{ 
  "Julian Day Number":2175600, 
  "Myanmar Year":606, 
  "Myanmar Month":"Waso", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":15, 
  "Day of the Week":"Monday", 
  "Description":"ဖုမ်မသင်ကြံကျောင်းကျောက်စာ။ သကရာဇ် ၆၀၅ ခု အာသိတ်နှစ် (နှစ်အမည်အရ ၆၀၆ ဖြစ်မှ ကိုက်ညီမည်) မ္လယ်တာလ္ဆန် ၁၅ ရျက် ဝါဆိုသတ .... င် တနှင်လာနိယ်လျှင်။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၅၇။" 
 },
 {
 	"Julian Day Number":2181040,
 	"Myanmar Year":621,
 	"Myanmar Month":"Nayon",
 	"Moon Phase":"Waning",
 	"Fortnight Day":5,
 	"Day of the Week":"Tuesday",
 	"Description":"ငါလပ်သင် ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၂၁ ခု အာသတ်နှစ် နံယုန်လဆုတ် ၅ ရျက် ၃ နိယ္အ် ငါလပ်သင် က္လောင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၂ (က)။"
 },
{
	"Julian Day Number":2181652,
	"Myanmar Year":622,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Friday",
	"Description":"မဟာရစ်စေတီ ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၂၂ ခု ကြတိုက်နှစ် တပိုဝ္အ်ထွယ်လ္ဆန် ၁၂ ရျက် သုကြာနိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၇ (က)။"
},
{
	"Julian Day Number":2182117,
	"Myanmar Year":624,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":8,
	"Day of the Week":"Monday",
	"Description":"အိုန်ရောက်သင် ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၂၄ ခု ပုတ် သနှစ် ကဆုန်လဆန် ၈ ရျက် တနင်ကနုယ်နိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၁။"
},
{
  "Julian Day Number":2182408,
  "Myanmar Year":624,
  "Myanmar Month":"Tabaung",
  "Moon Phase":"Waxing",
  "Fortnight Day":3,
  "Day of the Week":"Friday",
  "Description":"စိုးမင်းကြာသဝတ် လင်မယား ကျောက်စာ။  သကရစ် ၆၂၄ ခု ပုဿနှစ် တပေါင်လ္ဆန် ၃ ရျက် သောက်ြာနိယ်အာ ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၁၀၀ (က)။"
 },
{
	"Julian Day Number":2185816,
	"Myanmar Year":634,
	"Myanmar Month":"Waso",
	"Moon Phase":"Waxing",
	"Fortnight Day":13,
	"Day of the Week":"Thursday",
	"Description":"မင်းဖကြီး ကျောက်စာ။ လှူဒါန်း။ .ကရစ် ၆၃၄ ခု ကြတိုက်နှစ်တေ မ္လွယ်တာလဆ. ၁၃ ရျက် ကြာသပတိယ်နိယ်လျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၆၀။"
},
{
	"Julian Day Number":2186041,
	"Myanmar Year":634,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":3,
	"Day of the Week":"Friday",
	"Description":"ရမ္မနာသင် ကျောက်စာ။ လှူဒါန်း။ သဂ္ဂရစ် ၆၃၄ ခု ကြတိုက်နှစ် (တပို)ဝ်ထွယ်လဆန် ၃ ရျက် ၆ နိယ်လျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၆၃။"
},
{
	"Julian Day Number":2186172,
	"Myanmar Year":635,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":13,
	"Day of the Week":"Wednesday",
	"Description":"မြင်းခုန်တိုင် သ္ခိင်မဟာထီ ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၃၅ ခု မြိက္ကသိရ်နှစ် နံယုန်လဆန် ၁၃ ရျာက် ဗုဒ္ဓဟော နံနက် နိယ်တက် ၄၅ ဖ္လွါလျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၆၄။"
},
{
	"Julian Day Number":2188270,
	"Myanmar Year":640,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Monday",
	"Description":"ငါကြည်စုသင် လင်မယား ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၄၀ ခု ။ တပေါင်လပ္လည် တန်နှင်လာနိယ် ။  ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၈ (ခ)။"
},
{
	"Julian Day Number":2188587,
	"Myanmar Year":641,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Wednesday",
	"Description":"မဟာရစ်စေတီ ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၄၁ ခု စိဿ်နှစ် တပိုဝ်ဓွယ်လ္ဆန် ၁၀ ရျက် ၄ နိယ် တက်နိယ် ၃၆ ဖ္လွါလျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၇ (ခ)။"
},
{
	"Julian Day Number":2189058,
	"Myanmar Year":643,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Friday",
	"Description":"သူကြွယ် အစလပို့ ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၄၃ ခု ဖတ္တ်နှစ် ခူဆုန်လဆန် ၆ ရျက် သုကြာနိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၅။"
},
{
  "Julian Day Number":2189802,
  "Myanmar Year":645,
  "Myanmar Month":"Nayon",
  "Moon Phase":"Waxing",
  "Fortnight Day":12,
  "Day of the Week":"Sunday",
  "Description":"သတင်းသည် အပယ်ငယ် ကျောက်စာ။  သကရစ် ၆၄၅ ခု အာသိန်နှစ် အဓိမတ် နံယုန်လဆန် ၁၂ ရျက် တနှင်ဂုနိုယ်နိယ်လျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၄ (က)။"
 },
{
  "Julian Day Number":2191567,
  "Myanmar Year":650,
  "Myanmar Month":"Tagu",
  "Moon Phase":"Waxing",
  "Fortnight Day":5,
  "Day of the Week":"Monday",
  "Description":"ငါဖွယ်သင်လင်မယား ကျောက်စာ။ သကရစ် ၆၅၀ ခု တန်ခူလဆန် ၅ ရျက် တနှင်လာနိယ် ... ။  မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၆၈ (က)။"
 },
{
	"Julian Day Number":2192147,
	"Myanmar Year":651,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waning",
	"Fortnight Day":8,
	"Day of the Week":"Sunday",
	"Description":"မဟာရစ်စေတီ ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၅၁ ခု စယ်နှစ် သန္တူလ္ဆုတ် ၈ ရျက် ၁ နိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၇ (ခ)။"
},
{
	"Julian Day Number":2193376,
	"Myanmar Year":654,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Thursday",
	"Description":"Athinkhaya, Yazathingyan, Thihathu appointed viceroys."
},
{
  "Julian Day Number":2193607,
  "Myanmar Year":655,
  "Myanmar Month":"Tazaungmon",
  "Moon Phase":"Waxing",
  "Fortnight Day":7,
  "Day of the Week":"Thursday",
  "Description":"ပုထိုးနီမင်းနှင့်မင်းကျစွာကျောက်စာ။ သကရစ် ၆၅၅ ခု သရဝန်နှစ် တန်ဆောင်မှုန် (လ္ဆန်။ သာသနာ ၇ ရက်ကြာသပတိ...)၊ နေိယ်လျှင် ပုထိုင်နီမင်နှင်မင်က္လဟွာ မောင်နှံ ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၁၀(က)။"
 },
{
  "Julian Day Number":2193915,
  "Myanmar Year":656,
  "Myanmar Month":"Wagung",
  "Moon Phase":"Waning",
  "Fortnight Day":5,
  "Day of the Week":"Thursday",
  "Description":"သ္ခိင်ကုနကမ္ဘီ ကျောက်စာ။ သကရစ် ၆၅၆ ခု ဘတ်နှစ် နံကာလ္ဆုတ် ၅ ရျက် ၅ နိယ်လျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၂ (ခ)။"
 },
{
	"Julian Day Number":2193998,
	"Myanmar Year":656,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Wednesday",
	"Description":"သူကြွယ် ငက္လုံသင် ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၅၆ ခု ။ သရဝန်နှစ် (? possible year error)။ တန်ဆောင်မှုန်လပ္လည် ။ ပုတ္တ (ဟူနိ)ယ် ။ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၆၈။"
},
{
	"Julian Day Number":2194673,
	"Myanmar Year":658,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waxing",
	"Fortnight Day":14,
	"Day of the Week":"Sunday",
	"Description":"မ္လတ်ကြီးစွာ သိမ်ကျောင်း ကျောက်စာ။ ရာဇသင်ကြံ၊ သံပျင်သိင်္ကသူ။ လှူဒါန်း။ သကရစ် ၆၅၈ သန္တု လ္ဆန် ၁၄ ရျက် (၁ နိယ်) နှိုက် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၀။"
},
{
	"Julian Day Number":2194743,
	"Myanmar Year":658,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waning",
	"Fortnight Day":7,
	"Day of the Week":"Saturday",
	"Description":"သီဟသူရမင်းကြီးကျောက်စာ။ သီဟသူကုလားကျောင်း၊ ကျောင်းဝင်းအတွင်း၊ မြင်စိုင်းမြို့။ လှူဒါန်း။ သကရစ် ၆၅၈ ခု ကြတိုက်နှစ် နတ္တ်လ္ဆုတ် ၇ ရျက် ၀နေ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၄။"
},
{
	"Julian Day Number":2195091,
	"Myanmar Year":659,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":15,
	"Day of the Week":"Thursday",
	"Description":"မ္လတ်ကြီးစွာ သိမ်ကျောင်း ကျောက်စာ။ ရာဇသင်ကြံ၊ သံပျင်သိင်္ကသူ။ လှူဒါန်း။ သကရစ် ၆၅၉ ခု တန်ဆောင်မှုန်လ္ဆန် ၁၅ ရျက် ၅ နိယ်နှိုက္က်ာ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၀။"
},
{
 	"Julian Day Number":2195147,
 	"Myanmar Year":659,
 	"Myanmar Month":"Pyatho",
 	"Moon Phase":"Waxing",
 	"Fortnight Day":13,
 	"Day of the Week":"Thursday",
 	"Description":"မင်းမတ် သတျာပိစည်း ကျောက်စာ။ လှူဒါန်း။ သက်ရစ် ၆၅၉ ခု မြိုက္က်သိုဝ်နှစ် ပ္လသိုဝ်လ္ဆန် ၁၃ ရျက် ၅ နိယ်လျှင် နန်က္လမင် ကွန်ပြောက်ကြီ ထွက်တဝ်မူသော မင်မတ် သတျာပိစည် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၁ (က)။"
 },
{
  "Julian Day Number":2195169,
  "Myanmar Year":659,
  "Myanmar Month":"Tabodwe",
  "Moon Phase":"Waxing",
  "Fortnight Day":3,
  "Day of the Week":"Friday",
  "Description":"သိမ်ကျောင်း စေတီအား မြေလှူသော ကျောက်စာ။ သကရစ် ၆၅၉ ခု မြိုက္ကသိုဝ်နှစ် တပိုဝ်ထွယ်လ္ဆန်း ၃ ရျက် သူကြာနိယ် ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၉၅။"
 },
{
	"Julian Day Number":2195183,
	"Myanmar Year":659,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waning",
	"Fortnight Day":4,
	"Day of the Week":"Friday",
	"Description":"သံပျင် သတျာပတေ့ကျောင်း ကျောက်စာ။ သံပျင် သတျာပတေ့။ လှူဒါန်း။ သကရစ် ၆၅၉ ခု မြိက်ကသိုလ်နှစ် တပိုဝ်ထွယ်လ္ဆုတ် ၄ ရျက် သုကြာနိယ် ပန်ပွတ်ရပ်စေတီ မ္လစ်နှိုက် သံပျင် သတျာပတိယ် ကုလာက္လောင်ပြသတ် စလစ်ဥိထွက် ပ္လု၏ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၃၆။"
},
{
  "Julian Day Number":2195620,
  "Myanmar Year":661,
  "Myanmar Month":"Kason",
  "Moon Phase":"Waxing",
  "Fortnight Day":10,
  "Day of the Week":"Monday",
  "Description":"မိသင်၏သား ငါတပါညီ ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၆၆၁ မာခနှစ် ခုဆုန် လဆန် ဆယ်ရျက် တနှင်လာနိယ္အ်၊ မိသင် သာ ငါတပါ ငီ ပေါက်တိုဝ်ရပ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၃။"
 },
{
	"Julian Day Number":2195648,
	"Myanmar Year":661,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Monday",
	"Description":"မ္လတ်ကြီးစွာ သိမ်ကျောင်း ကျောက်စာ။ ရာဇသင်ကြံ၊ သံပျင်သိင်္ကသူ။ လှူဒါန်း။ သကရစ် ၆61 ခု နံမျုန်လ္ဆန် ၁၂ ရျက် ၂ နိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၀။"
},
{
  "Julian Day Number":2196712,
  "Myanmar Year":664,
  "Myanmar Month":"Kason",
  "Moon Phase":"Waxing",
  "Fortnight Day":13,
  "Day of the Week":"Monday",
  "Description":"ရွှေနန်းသျှင်ကျောင်း ကျောက်စာ။  သက္ကရစ် ၆၆၄ ခု ဖုဿနှစ် (should be ပိသျက်?) ကဆုန် လ္ဆန် ၁၃ ရျက် ၂ နိယ် ရှုဲနန်သျင် လှူသော ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၅။"
 },
{
  "Julian Day Number":2197332,
  "Myanmar Year":665,
  "Myanmar Month":"Pyatho",
  "Moon Phase":"Waxing",
  "Fortnight Day":12,
  "Day of the Week":"Friday",
  "Description":"အသင်္ခယာကျောင်း ကျောက်စာ။  သက္ကရစ် ၆၆၅ ခု စိဿနှစ် ပ္လတ်သိုဝ်လ္ဆန် ၁၂ ရျက် သောက်ကြာနေလျှင် သာသနာ ၅၀၀၀ လျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၆ (က)။"
 },
{
  "Julian Day Number":2199000,
  "Myanmar Year":670,
  "Myanmar Month":"Waso",
  "Moon Phase":"Waning",
  "Fortnight Day":10,
  "Day of the Week":"Sunday",
  "Description":"မင်းမတ်ကြီး သုံးယောက်နှမ ကျောက်စာ။ သကရစ် ၆၇၀ ကြာတိုက်နှစ် မ္လွယ်တာလ္ဆုတ် ၁၀ ရျက် ၊ တနှင်ကနှုယ်နိယ်အာ ၊ မင်မတ်ကြီ သုံယောက်နှမ ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၈၆။"
 },
{
  "Julian Day Number":2198820,
  "Myanmar Year":669,
  "Myanmar Month":"Tabodwe",
  "Moon Phase":"Waning",
  "Fortnight Day":9,
  "Day of the Week":"Tuesday",
  "Description":"လှည်းငှူးနှင့် အမတ်ကြီး ရာဇာသင်ကြံတို့ ကျောက်စာ။ သကရစ် ၆၆၉ ခုအာသိန်နှစ် တပိုဝ်ထွယ် လ္ဆုတ် ၉ ရျက် အင်ကာနိယ် လှည်ငှူသ ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၈၇။"
 },
{
  "Julian Day Number":2199305,
  "Myanmar Year":671,
  "Myanmar Month":"Nayon",
  "Moon Phase":"Waxing",
  "Fortnight Day":5,
  "Day of the Week":"Thursday",
  "Description":"ရတနာစေတီ ကျောက်စာ။ သကရစ် ၆၇၁ ခု မြက္ကသိုဝ်နှစ် နံယုန် လ္ဆန် ၅ ရျက် ကြာသပတိယ် ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၈၃ (က)။"
 },
{
  "Julian Day Number":2200631,
  "Myanmar Year":674,
  "Myanmar Month":"Tabodwe",
  "Moon Phase":"Waxing",
  "Fortnight Day":3,
  "Day of the Week":"Sunday",
  "Description":"အဘယတေ တောကျောင်း မြတ်ကြီးစေတီ ကျောက်စာ။ သကရစ် ၆၇၄ ခု ဖ္လကိုန်နှစ် တပိုဝ်ထွယ် လ္ဆန် ၃ ရက် ၁ နိယ်လျှင် သ္ခိင် အဘယထေ တဝ်က္လောင် ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၈၁။"
 },
{
	"Julian Day Number":2200669,
	"Myanmar Year":674,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Wednesday",
	"Description":"Foundation of Pinya."
},
{
  "Julian Day Number":2200986,
  "Myanmar Year":675,
  "Myanmar Month":"Pyatho",
  "Moon Phase":"Waxing",
  "Fortnight Day":4,
  "Day of the Week":"Friday",
  "Description":"ကိုရံသူကြီးကျောင်း ကျောက်စာ။ သကရစ်ကာ ၆၇၅ ခု စိဿနှစ် (*မှတ်ချက် - ၆၇၅ ဆိုပါက စယ်နှစ်ဖြစ်သင့်သည်) ပ္လသိုဝ်လဆန် ၄ ရျက် သုက်ကြာနိယ်ေတ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၈၀။"
 },
{
	"Julian Day Number":2201496,
	"Myanmar Year":677,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Thursday",
	"Description":"Sagaing Kingdom founded."
},
{
  "Julian Day Number":2203117,
  "Myanmar Year":681,
  "Myanmar Month":"Tazaungmon",
  "Moon Phase":"Waxing",
  "Fortnight Day":9,
  "Day of the Week":"Monday",
  "Description":"မြင်စိုင်းကျောင်း ကျောက်စာ။  သက္ကရစ် ၆၈၁ ခု အာသိန်နှစ် တန်ဆောင်မုန်လ္ဆန် ၉ ရျက် ၂ နိယ်  သာသနာ ၅၀၀၀ တည်စိမ်သောငှာ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၆ (ခ)။"
 },
{
  "Julian Day Number":2204941,
  "Myanmar Year":686,
  "Myanmar Month":"Tazaungmon",
  "Moon Phase":"Waxing",
  "Fortnight Day":2,
  "Day of the Week":"Friday",
  "Description":"ကန်စွက်ကျောင်း ကျောက်စာ။ သကရစ် ၆၈၆ ခု ဓိမှတိနှစ် တန်ဆောင်မှုန်။ လ္ဆန် သာသနာ ၂ ရျက် ၆ နိယ် တောင်ပနှိုက်။ တောင်ပမင် စေတီ ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၉၄။"
 },
{
  "Julian Day Number":2205535,
  "Myanmar Year":688,
  "Myanmar Month":"Waso",
  "Moon Phase":"Waxing",
  "Fortnight Day":6,
  "Day of the Week":"Thursday",
  "Description":"ရာဇသင်ကြံ မျောက်သား ကျောက်စာ။ သက္စြ် ၆၈၈ ၊ နွယ်တာလ္ဆန် ၆ ၊ ၅ ၊ စစ်သူကြီ ရယ်စစင်ကြံ ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၉၆။"
 },
{
  "Julian Day Number":2206515,
  "Myanmar Year":690,
  "Myanmar Month":"Tabaung",
  "Moon Phase":"Waxing",
  "Fortnight Day":10,
  "Day of the Week":"Thursday",
  "Description":"သရအိုင် သာရီရိက စေတီတော် ကျောက်စာ။ ကရစ် ၆၉၀ အာသတ်(နှစ်) တပေါင် .န် ၁၀ ရျက် ၅ နိယ်လျှင် ဖုန်မ္တတ်ကြိစွာ ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၉၇။"
 },
{
  "Julian Day Number":2207887,
  "Myanmar Year":694,
  "Myanmar Month":"Tazaungmon",
  "Moon Phase":"Waning",
  "Fortnight Day":9,
  "Day of the Week":"Thursday",
  "Description":"မင်းမတ် အထင်္ကပိစည်းကျောင်း ကျောက်စာ။ သက္ကရစ် ၆၉၄ ခု ကြတိုက်နှစ် တန်ဆောင်မှုန်လ္ဆုတ် ၉ ရျက် ၅ နေအာ မင်မတ်ထင်္ကပိစည်ကာ  ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၉၈ (က)။"
 },
{
  "Julian Day Number":2209053,
  "Myanmar Year":697,
  "Myanmar Month":"Tabodwe",
  "Moon Phase":"Waxing",
  "Fortnight Day":7,
  "Day of the Week":"Monday",
  "Description":"မထောစေတီ ကျောက်စာ။  သကရစ် ၆၉၇ ခု မာခနှစ် တပိုဝ်ထလ္ဆန် ၇ ရျက် ၂ နိယ်အာ ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၁၀၁။"
 },
{
  "Julian Day Number":2209175,
  "Myanmar Year":698,
  "Myanmar Month":"Nayon",
  "Moon Phase":"Waxing",
  "Fortnight Day":11,
  "Day of the Week":"Thursday",
  "Description":"တန်လိုင်သူကြီးဖုံမသင်ကြံကျောက်စာ။ သကရစ် ၆၉၈ စဲနှစ် နမျုန်လ္ဆန်၁၁ ၅နိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၀၈။"
 },
{
  "Julian Day Number":2209585,
  "Myanmar Year":699,
  "Myanmar Month":"Waso",
  "Moon Phase":"Waxing",
  "Fortnight Day":10,
  "Day of the Week":"Monday",
  "Description":"သုံးပန်လှဘုရား ကျောက်စာ။  သကရစ် ၆၉၉ ခု စယ်နှစ် မ္လွယ်တာလ္ဆန် ဆဲရျက် တနှင်လာနေ ဖုံမ္မကြံ မောင်နှံ ကောင်မှုပ္လုရုယ် ...  ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် ၁၁၃။"
 },
{
  "Julian Day Number":2214285,
  "Myanmar Year":712,
  "Myanmar Month":"Nayon",
  "Moon Phase":"Waning",
  "Fortnight Day":1,
  "Day of the Week":"Thursday",
  "Description":"သကရာဇ် ၇၁(၂) ပိဿျက်နှစ် နံယုန် လ လ္ဆုတ် တရျက် ကြသပတေနေ နေတက် ၇ ဖ္လွါလျှင် တေည်သတေ ... ။ အလှူရှင် -ငကြိသင်။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် (၇၈-ခ)။"
 },
 {
   "Julian Day Number":2215073,
   "Myanmar Year":714,
   "Myanmar Month":"Wagung",
   "Moon Phase":"Waxing",
   "Fortnight Day":4,
   "Day of the Week":"Monday",
   "Description":"သကရစ် ၇၁၄ ခု၊ အသတ်နှစ် နံကာလဆန် ၄ ရျက် တန်နှင်လာနိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၇၉။"
  },
 {
   "Julian Day Number":2215292,
   "Myanmar Year":714,
   "Myanmar Month":"Tabaung",
   "Moon Phase":"Waning",
   "Fortnight Day":3,
   "Day of the Week":"Wednesday",
   "Description":"မိတ္ထိလာလင်စင်းကန်ရိုးယှိ ကျောက်စာ။ သကရစ် ၇၁၄ ခု အာသတ်နှစ် တပေါင်လ္ဆုတ် ၃ ရျက် ပုတ္တဟူနိယ်လျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၆၉။"
  },
{
  "Julian Day Number":2216434,
  "Myanmar Year":718,
  "Myanmar Month":"Kason",
  "Moon Phase":"Waxing",
  "Fortnight Day":8,
  "Day of the Week":"Thursday",
  "Description":"မင်းနန်သူကျောင်းကျောက်စာ။ ...ရစ် ၇၁၈ ခု ကြတိုက်နှစ် ကဆုန်လ္ဆန် ၈ ရျက် (၅နေအား) ရတနာသုံမ်ပါ ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၂၆ (က)။"
 }, 	
{ 
  "Julian Day Number":2216756, 
  "Myanmar Year":718, 
  "Myanmar Month":"Tabaung", 
  "Moon Phase":"Waxing", 
  "Fortnight Day":5, 
  "Day of the Week":"Monday", 
  "Description":"မာရဖင်ရတနာ စည်းခုံဘုရားကျောံစာ။ သကရစ် ၇၁၈ ခု တပေါင်လ္ဆန် ၅ ရျက် ၂လာနေလျှင် ...။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၉၃။" 
 },
{
  "Julian Day Number":2216924,
  "Myanmar Year":719,
  "Myanmar Month":"Wagung",
  "Moon Phase":"Waning",
  "Fortnight Day":8,
  "Day of the Week":"Thursday",
  "Description":"တလုပ်မြို့သက်တော်ရဘုရားကျောက်စာ။သကြစ် ၇၁၉ ခုမြိုင်က္ကသိုဝ်နှစ်ဝါခေါင်လဆုတ်၈ရက် ၅ နေိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၃၀။"
 },
{
  "Julian Day Number":2218441,
  "Myanmar Year":723,
  "Myanmar Month":"Tazaungmon",
  "Moon Phase":"Waxing",
  "Fortnight Day":7,
  "Day of the Week":"Tuesday",
  "Description":"ရွှေစည်းခုံဘုရားကျောက်စာ။ သကရစ် ၇၂၃ ခု စယ်နှစ် တံဆောင်မုန်လ္ဆန် ၇ ရျက် ၃ နိယ် နက္ခ်တ် ၂၆ ခုပြိစ္ဆာလက်လျှင် ရွာ . တည်၏ ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၁၈။"
 },
{
  "Julian Day Number":2218961,
  "Myanmar Year":724,
  "Myanmar Month":"Tabaung",
  "Moon Phase":"Waxing",
  "Fortnight Day":10,
  "Day of the Week":"Sunday",
  "Description":"အမတ်ကြီးသရေအသင်္ခယာ ကျောက်စာ။ သကရစ် ၇၂၄ ခု ပိဿျက်နှစ်တပေါင်းလ္ဆန် ၁၀ရျက်၁နွေနိယ် ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၃၈(က)။"
 },
{
	"Julian Day Number":2219652,
	"Myanmar Year":726,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Tuesday",
	"Description":"Foundation of Inwa."
},
{
	"Julian Day Number":2220369,
	"Myanmar Year":727,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Friday",
	"Description":"မိတ္တရ သိန်းစည်း အမတ်ကြီး ကျောက်စာ၊ မိတ္တရ သိန်းစည်း အမတ်ကြီး၊ မိဖုရားစောဥမ္မဒန္တီ စန္တသူအမတ်ကြီး။ ကျောင်း၊ မြေ၊ လယ် လှူဒါန်း။ ... သကရစ် ၇၂၇ ခု တပိုဝ်ထွယ်လပ္လည် သောက်ကြာနေ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၁။ ကျောက်တိုင်အမှတ် နံပါတ် ၁၈။ (Year should be 728 if it is friday. 7 and 8 error is common.)"
},
{
	"Julian Day Number":2220747,
	"Myanmar Year":729,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":8,
	"Day of the Week":"Friday",
	"Description":"Razadarit’s DOB."
},
{
  "Julian Day Number":2222556,
  "Myanmar Year":734,
  "Myanmar Month":"Tabodwe",
  "Moon Phase":"Full moon",
  "Fortnight Day":15,
  "Day of the Week":"Monday",
  "Description":"သကရာဇ် ၇၃၄ ခု ဖ္လကိုန်နှစ် တပိုဝ်ထွယ် လပ္လည် တနှင်လာ နံနက်စေတီသည်သတေ ... ။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် (၇၈-က)။"
 },
{
  "Julian Day Number":2223369,
  "Myanmar Year":737,
  "Myanmar Month":"Kason",
  "Moon Phase":"Waxing",
  "Fortnight Day":6,
  "Day of the Week":"Tuesday",
  "Description":"သက္ကရာဇ် ၇၃၇ ခု ကဆုန်လဆန် ၆ ရျက် အင်္ကာနေလျင် ... ။ အလှူရှင် -ငကြိသင်။ မန္တလေးနန်းတွင်းကျောက်စာများ အတွဲ ၂။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံ (၁) အတွင်း။ ကျောက်တိုင်အမှတ် နံပါတ် (၇၈-ခ)။"
 },
{
	"Julian Day Number":2226567,
	"Myanmar Year":745,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Monday",
	"Description":"Razadarit comes to power."
},
{
  "Julian Day Number":2228075,
  "Myanmar Year":749,
  "Myanmar Month":"Tabaung",
  "Moon Phase":"Waxing",
  "Fortnight Day":14,
  "Day of the Week":"Thursday",
  "Description":"သူကြီး ကျောက်စာ။ နမောတဿတိ၊ သက္ကရာဇ် ၇၄၉ ခု၊ ပြိဿနှစ် တပေါင် လ္ဆန် တဆယ် ၄ ရျက်၊ ကြာသပတေနိယ်အာ၊ မြမ္မာပြည် အကြေအညာ  ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၇၄၉။"
 },
{
  "Julian Day Number":2230727,
  "Myanmar Year":757,
  "Myanmar Month":"Nayon",
  "Moon Phase":"Waxing",
  "Fortnight Day":8,
  "Day of the Week":"Wednesday",
  "Description":"ပုခြည်သူကြီး ကျောက်စာ။ ... ရစ် ၇၅၇၊ နယုန်လ္ဆန် ၈ ရျက် ၄ နေ ပုခြည်သူကြီ... ။  မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့၊ နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၇၀။"
 }, 	 	
{ 
  "Julian Day Number":2231097, 
  "Myanmar Year":758, 
  "Myanmar Month":"Nayon", 
  "Moon Phase":"Waning", 
  "Fortnight Day":9, 
  "Day of the Week":"Wednesday", 
  "Description":"မာရဖင်ရတနာ စည်းခုံဘုရားကျောံစာ။ သက္ကရစ် ၇၅၈ ခု နံမျုန် လ္ဆုတ် ၉ ရျက် ပုတ်တဟူနေလျှင် ...။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၉၃။" 
 },
{ 
  "Julian Day Number":2233185, 
  "Myanmar Year":763, 
  "Myanmar Month":"Tabaung", 
  "Moon Phase":"Full moon", 
  "Fortnight Day":15, 
  "Day of the Week":"Thursday", 
  "Description":"ပျူကန်မင်းမတ်သရေလင်မယားကျောင်းကျောံစာ။ ... ၇၆၃ ခု၊ အာသိုတ်နှစ် (နှစ်အမည်သရဝန်နှစ်ဖြစ်မှကိုက်ညီမည်) တပေါင်လပ္လည် ကြာ ...။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၇၈။" 
 },
{
	"Julian Day Number":2234932,
	"Myanmar Year":768,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Monday",
	"Description":"Minye Kyawswa takes Launggyet."
},
{
	"Julian Day Number":2237958,
	"Myanmar Year":776,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Wednesday",
	"Description":"Minye Kyawswa dies."
},
{
  "Julian Day Number":2239232,
  "Myanmar Year":780,
  "Myanmar Month":"Thadingyut",
  "Moon Phase":"Waxing",
  "Fortnight Day":10,
  "Day of the Week":"Wednesday",
  "Description":"တန်ဆောင်းကျောင်း ကျောက်စာ။ သက္ကရစ် ၇၈၀ ဝါကျွတ်လဆန် ၁၀ ရက် ပိတဟူနေနှိုက် ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၀၅(မျက်နှာ)။"
 },
{
  "Julian Day Number":2239373,
  "Myanmar Year":780,
  "Myanmar Month":"Tabaung",
  "Moon Phase":"Waxing",
  "Fortnight Day":1,
  "Day of the Week":"Thursday",
  "Description":"ယောက်ခမတော်ကျောင်းကျောက်စာ။ သက္ကရဇ် ၇၈၀ မာခနှစ် တပေါင်လဆန်တရက် ကြာသပဒေနေနှိုက်၊ မ္လိယ်သျှင်နှစ်ပါ စကာမျာကြသည် ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၀၅(ကျော)။"
 },
{
	"Julian Day Number":2243108,
	"Myanmar Year":791,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":1,
	"Day of the Week":"Thursday",
	"Description":"Min Saw Mon becomes king."
},
{
  "Julian Day Number":2243847,
  "Myanmar Year":793,
  "Myanmar Month":"Kason",
  "Moon Phase":"Full moon",
  "Fortnight Day":15,
  "Day of the Week":"Friday",
  "Description":"စည်းခုံဘုရား ကျောက်စာ။ သက္ကရာဇ် ၇၉၃ ကဆုန်လပ္လည်သတင်သောက်ကြာနေိ ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၃၅(က)။"
 },
{
	"Julian Day Number":2244590,
	"Myanmar Year":795,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":6,
	"Day of the Week":"Saturday",
	"Description":"Min Saw Mon dies."
},
{
  "Julian Day Number":2245253,
  "Myanmar Year":797,
  "Myanmar Month":"Tagu",
  "Moon Phase":"Waxing",
  "Fortnight Day":7,
  "Day of the Week":"Thursday",
  "Description":"ဘုရားထုရွာသူကြီး ကျောက်စာ။ လှူဒါန်း။ သကရစ် ၇၉၇ ခု ၊ တန်ခုလဆန် ခုနှစ်ရက် ကြာသပတေနေ၊ ဖုရာထုရွာသူကြိ ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၃၄(က)။"
 },
{
  "Julian Day Number":2253758,
  "Myanmar Year":820,
  "Myanmar Month":"Waso",
  "Moon Phase":"Waxing",
  "Fortnight Day":5,
  "Day of the Week":"Thursday",
  "Description":"နရပတိမင်းကျောင်းကျောက်စာ။ သက္ကြစ် ၈၂၀။ ဝါဆိုလ္ဆန် ငါရက် ကြာသပတေနေညနေလွဲခုနစ်ခါနှိုက်လျှင် ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၅၈(က)။"
 },
{
  "Julian Day Number":2254065,
  "Myanmar Year":821,
  "Myanmar Month":"Kason",
  "Moon Phase":"Waning",
  "Fortnight Day":2,
  "Day of the Week":"Wednesday",
  "Description":"နရပတိမင်းကျောင်းကျောက်စာ။ သက္ကြစ် ၈၂၁။ ကဆုန် လ္ဆုတ် ၂ ရျက် ပုတ္တဟူနေ (နေတက်တပဟိုဝ်တွင်လျှင်) ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၅၈(က)။"
 },
{
  "Julian Day Number":2257784,
  "Myanmar Year":831,
  "Myanmar Month":"Waso",
  "Moon Phase":"Full moon",
  "Fortnight Day":15,
  "Day of the Week":"Monday",
  "Description":"စူဠာမုဏိဘုရား ကျောက်စာ။ ၈၃၁ ။ နွဲတာလပြည်၊ တနှင်လာ ရက်နှိုက်၊ နှစ်သိန်လေသောင်၊ အထုဟိသ ... ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ (၂) ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၄၅၇။"
 },
{
	"Julian Day Number":2265960,
	"Myanmar Year":853,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Friday",
	"Description":"Foundation of Dwarawaddy (Toungoo)."
},
{
	"Julian Day Number":2269428,
	"Myanmar Year":863,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":9,
	"Day of the Week":"Thursday",
	"Description":"Coronation of Narapati II of Ava."
}, 	
{ 
  "Julian Day Number":2270840, 
  "Myanmar Year":867, 
  "Myanmar Month":"Tagu", 
  "Moon Phase":"Waning", 
  "Fortnight Day":3, 
  "Day of the Week":"Tuesday", 
  "Description":"သက္ကရာဇ် ၈၆၇ တန်ခုလဆုတ် သုံရက် အင်ကာနေ၊ နက်သတ်သုံလုံ။ မန္တလေးနန်းတွင်းကျောက်စာရုံ(၂)ရှိကျောက်စာများ။ မန္တလေးမြို့နန်းတွင်းကျောက်စာရုံငယ်။ ကျောက်တိုင်အမှတ် နံပါတ် ၅၇၃။" 
 },
{
	"Julian Day Number":2272876,
	"Myanmar Year":872,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Friday",
	"Description":"Mingyi Nyo declares independence from Ava."
},
{
	"Julian Day Number":2273003,
	"Myanmar Year":872,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":9,
	"Day of the Week":"Saturday",
	"Description":"Narapati II founds a new palace."
},
{
	"Julian Day Number":2278115,
	"Myanmar Year":886,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"New moon",
	"Fortnight Day":15,
	"Day of the Week":"Saturday",
	"Description":"Ava falls to the Confederation (1st time)."
},
{
	"Julian Day Number":2278866,
	"Myanmar Year":888,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Wednesday",
	"Description":"Ava falls to the Confederation (2nd and final time)."
},
{
	"Julian Day Number":2280218,
	"Myanmar Year":892,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Thursday",
	"Description":"Tabinshwehti becomes king."
},
{
	"Julian Day Number":2280402,
	"Myanmar Year":893,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":11,
	"Day of the Week":"Saturday",
	"Description":"Min Bin becomes king of Mrauk-U."
},
{
	"Julian Day Number":2280965,
	"Myanmar Year":894,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waxing",
	"Fortnight Day":15,
	"Day of the Week":"Tuesday",
	"Description":"Min Bin takes Dhaka."
},
{
	"Julian Day Number":2281024,
	"Myanmar Year":894,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":15,
	"Day of the Week":"Saturday",
	"Description":"Min Bin celebrates victory over Bengal."
},
{
	"Julian Day Number":2284411,
	"Myanmar Year":904,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Thursday",
	"Description":"Prome surrenders to Toungoo forces."
},
{
	"Julian Day Number":2284949,
	"Myanmar Year":905,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Wednesday",
	"Description":"Confederation begins campaign to retake Prome."
},
{
	"Julian Day Number":2286039,
	"Myanmar Year":908,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Monday",
	"Description":"Toungoo begins Arakan campaign."
},
{
	"Julian Day Number":2286121,
	"Myanmar Year":908,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":2,
	"Day of the Week":"Saturday",
	"Description":"Toungoo forces capture Launggyet."
},
{
	"Julian Day Number":2286128,
	"Myanmar Year":908,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":9,
	"Day of the Week":"Saturday",
	"Description":"Treaty of Mrauk-U signed."
},
{
	"Julian Day Number":2286781,
	"Myanmar Year":910,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":13,
	"Day of the Week":"Monday",
	"Description":"Siam campaign begins."
},
{
	"Julian Day Number":2286783,
	"Myanmar Year":910,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Wednesday",
	"Description":"Burmese armies leave Kanchanaburi for Ayutthaya."
},
{
	"Julian Day Number":2286889,
	"Myanmar Year":910,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waxing",
	"Fortnight Day":3,
	"Day of the Week":"Thursday",
	"Description":"Tabinshwehti gets back to Pegu."
},
{
	"Julian Day Number":2287316,
	"Myanmar Year":912,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":1,
	"Day of the Week":"Thursday",
	"Description":"Tabinshwehti assassinated."
},
{
	"Julian Day Number":2287524,
	"Myanmar Year":912,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Thursday",
	"Description":"Bayinnaung marches to Toungoo."
},
{
	"Julian Day Number":2287571,
	"Myanmar Year":912,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Sunday",
	"Description":"Bayinnaung takes Toungoo."
},
{
	"Julian Day Number":2287802,
	"Myanmar Year":913,
	"Myanmar Month":"Tawthalin",
	"Moon Phase":"New moon",
	"Fortnight Day":15,
	"Day of the Week":"Sunday",
	"Description":"Bayinnaung takes Prome."
},
{
	"Julian Day Number":2287997,
	"Myanmar Year":913,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waning",
	"Fortnight Day":3,
	"Day of the Week":"Saturday",
	"Description":"Bayinnaung takes Pegu."
},
{
	"Julian Day Number":2288668,
	"Myanmar Year":915,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Friday",
	"Description":"Coronation of Bayinnaung and Atula Thiri at Pegu."
},
{
	"Julian Day Number":2289043,
	"Myanmar Year":916,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":2,
	"Day of the Week":"Tuesday",
	"Description":"Bayinnaung takes Ava."
},
{
	"Julian Day Number":2289700,
	"Myanmar Year":918,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":8,
	"Day of the Week":"Monday",
	"Description":"Bayinnaung prepares to invade cis-Salween Shan states."
},
{
	"Julian Day Number":2289760,
	"Myanmar Year":918,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":9,
	"Day of the Week":"Friday",
	"Description":"Bayinnaung begins campaign to Shan states."
},
{
	"Julian Day Number":2289777,
	"Myanmar Year":918,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waning",
	"Fortnight Day":11,
	"Day of the Week":"Monday",
	"Description":"Bayinnaung conquers Mong Mit (Momeik) and Hsipaw (Thibaw)."
},
{
	"Julian Day Number":2289791,
	"Myanmar Year":918,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":11,
	"Day of the Week":"Monday",
	"Description":"Bayinnaung dedicates a pagoda each at Mong Mit and at Hsipaw."
},
{
	"Julian Day Number":2289831,
	"Myanmar Year":918,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waning",
	"Fortnight Day":6,
	"Day of the Week":"Saturday",
	"Description":"Bayinnaung conquers Mong Yang (Mohnyin)."
},
{
	"Julian Day Number":2289837,
	"Myanmar Year":918,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waning",
	"Fortnight Day":12,
	"Day of the Week":"Friday",
	"Description":"Bayinnaung conquers Mong Kawng (Mogaung)."
},
{
	"Julian Day Number":2289851,
	"Myanmar Year":919,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Friday",
	"Description":"Bayinnaung leaves Mong Kawng (Mogaung)."
},
{
	"Julian Day Number":2289895,
	"Myanmar Year":919,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waning",
	"Fortnight Day":11,
	"Day of the Week":"Sunday",
	"Description":"Bayinnaung dedicates a bell at the Shwezigon Pagoda."
},
{
	"Julian Day Number":2290052,
	"Myanmar Year":919,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Wednesday",
	"Description":"Bayinnaung begins campaign to Mong Nai (Mone)."
},
{
	"Julian Day Number":2290209,
	"Myanmar Year":920,
	"Myanmar Month":"Tagu",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Saturday",
	"Description":"Bayinnaung takes Chiang Mai."
},
{
	"Julian Day Number":2290437,
	"Myanmar Year":920,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":7,
	"Day of the Week":"Wednesday",
	"Description":"Thado Minsaw’s Army leaves for Chiang Mai."
},
{
	"Julian Day Number":2290641,
	"Myanmar Year":921,
	"Myanmar Month":"Waso",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Thursday",
	"Description":"Groundbreaking ceremony for the Mahazedi Pagoda."
},
{
	"Julian Day Number":2290798,
	"Myanmar Year":921,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":14,
	"Day of the Week":"Sunday",
	"Description":"Yaza Datu Kalaya born."
},
{
	"Julian Day Number":2290801,
	"Myanmar Year":921,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Wednesday",
	"Description":"Dedicates the relic chamber of the Mahazedi."
},
{
	"Julian Day Number":2290818,
	"Myanmar Year":921,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Saturday",
	"Description":"Binnya Dala begins Manipur campaign."
},
{
	"Julian Day Number":2290995,
	"Myanmar Year":922,
	"Myanmar Month":"First Waso",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Monday",
	"Description":"Binnya Dala arrives back at Pegu (after a successful Manipur campaign)."
},
{
	"Julian Day Number":2291215,
	"Myanmar Year":922,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Thursday",
	"Description":"Umbrella (hti) raising ceremony at the Mahazedi."
},
{
	"Julian Day Number":2291311,
	"Myanmar Year":923,
	"Myanmar Month":"Tagu",
	"Moon Phase":"Waning",
	"Fortnight Day":9,
	"Day of the Week":"Tuesday",
	"Description":"Birth of son Thingadatta."
},
{
	"Julian Day Number":2291744,
	"Myanmar Year":924,
	"Myanmar Month":"Waso",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Wednesday",
	"Description":"Fortifies Tavoy (Dawei) – for the upcoming invasion of Siam."
},
{
	"Julian Day Number":2291898,
	"Myanmar Year":924,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waning",
	"Fortnight Day":6,
	"Day of the Week":"Monday",
	"Description":"Keng Tung submits."
},
{
	"Julian Day Number":2291979,
	"Myanmar Year":924,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Friday",
	"Description":"Campaign to Chinese Shan States begins."
},
{
	"Julian Day Number":2291985,
	"Myanmar Year":924,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Wednesday",
	"Description":"Yaza Dewi raised to senior queen."
},
{
	"Julian Day Number":2292140,
	"Myanmar Year":925,
	"Myanmar Month":"Waso",
	"Moon Phase":"Waning",
	"Fortnight Day":12,
	"Day of the Week":"Friday",
	"Description":"Sends an embassy to Siam, demanding tribute."
},
{
	"Julian Day Number":2292248,
	"Myanmar Year":925,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waning",
	"Fortnight Day":12,
	"Day of the Week":"Monday",
	"Description":"Siam Campaign begins."
},
{
	"Julian Day Number":2292346,
	"Myanmar Year":925,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waning",
	"Fortnight Day":11,
	"Day of the Week":"Monday",
	"Description":"Overruns Portuguese defenses at the Ayutthaya harbor."
},
{
	"Julian Day Number":2292357,
	"Myanmar Year":925,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":8,
	"Day of the Week":"Friday",
	"Description":"Siam surrenders."
},
{
	"Julian Day Number":2292604,
	"Myanmar Year":926,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waning",
	"Fortnight Day":4,
	"Day of the Week":"Sunday",
	"Description":"Lan Na campaign begins."
},
{
	"Julian Day Number":2292774,
	"Myanmar Year":927,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Tuesday",
	"Description":"Leaves Chiang Mai for Pegu."
},
{
	"Julian Day Number":2292802,
	"Myanmar Year":927,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Tuesday",
	"Description":"Arrives back at Pegu."
},
{
	"Julian Day Number":2292872,
	"Myanmar Year":927,
	"Myanmar Month":"Second Waso",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Thursday",
	"Description":"Begins work at the Shwemawdaw Pagoda."
},
{
	"Julian Day Number":2292952,
	"Myanmar Year":927,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waxing",
	"Fortnight Day":11,
	"Day of the Week":"Friday",
	"Description":"Returning troops from Lan Xang arrives back at Pegu."
},
{
	"Julian Day Number":2292979,
	"Myanmar Year":927,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Thursday",
	"Description":"Reconstruction of Pegu begins."
},
{
	"Julian Day Number":2293078,
	"Myanmar Year":927,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Friday",
	"Description":"Raises a new umbrella at the Shwedagon."
},
{
	"Julian Day Number": 2293092,
	"Myanmar Year":927,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Friday",
	"Description":"Raises a new umbrella at the Mahazedi (Pegu)."
},
{
	"Julian Day Number": 2293274,
	"Myanmar Year":928,
	"Myanmar Month":"Tawthalin",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Friday",
	"Description":"Dedicates 52 Buddha statues."
},
{
	"Julian Day Number": 2293358,
	"Myanmar Year":928,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Friday",
	"Description":"Dedicates the building housing the Pitakas at the Mahazedi."
},
{
	"Julian Day Number": 2293371,
	"Myanmar Year":928,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waning",
	"Fortnight Day":3,
	"Day of the Week":"Thursday",
	"Description":"Leads the groundbreaking ceremony for the new gates of Pegu."
},
{
	"Julian Day Number": 2293546,
	"Myanmar Year":929,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waning",
	"Fortnight Day":1,
	"Day of the Week":"Thursday",
	"Description":" Umbrella raising ceremony at the Shwemawdaw."
},
{
	"Julian Day Number": 2293603,
	"Myanmar Year":929,
	"Myanmar Month":"Wagung",
	"Moon Phase":"Waxing",
	"Fortnight Day":14,
	"Day of the Week":"Friday",
	"Description":"Work on the king’s house inside the new Palace begins."
},
{
	"Julian Day Number": 2293844,
	"Myanmar Year":929,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waning",
	"Fortnight Day":4,
	"Day of the Week":"Monday",
	"Description":"Enters the new palace."
},
{
	"Julian Day Number": 2293904,
	"Myanmar Year":930,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Friday",
	"Description":"Learns of Ayutthaya’s rebellion."
},
{
	"Julian Day Number": 2293936,
	"Myanmar Year":930,
	"Myanmar Month":"First Waso",
	"Moon Phase":"Waning",
	"Fortnight Day":7,
	"Day of the Week":"Tuesday",
	"Description":"Queen Atula Thiri dies."
},
{
	"Julian Day Number": 2294039,
	"Myanmar Year":930,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Sunday",
	"Description":"Campaign to Ayutthaya begins."
},
{
	"Julian Day Number": 2294240,
	"Myanmar Year":931,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":1,
	"Day of the Week":"Friday",
	"Description":"Campaign to Ayutthaya begins."
},
{
	"Julian Day Number": 2294247,
	"Myanmar Year":931,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":8,
	"Day of the Week":"Friday",
	"Description":"Armies leave to meet Lan Xang forces."
},
{
	"Julian Day Number": 2294261,
	"Myanmar Year":931,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":7,
	"Day of the Week":"Friday",
	"Description":"Defeats Lan Xang forces."
},
{
	"Julian Day Number": 2294349,
	"Myanmar Year":931,
	"Myanmar Month":"Wagung",
	"Moon Phase":"Waning",
	"Fortnight Day":6,
	"Day of the Week":"Tuesday",
	"Description":"Takes Ayutthaya."
},
{
	"Julian Day Number": 2294392,
	"Myanmar Year":931,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Wednesday",
	"Description":"Appoints Maha Thammarachathirat as king of Siam."
},
{
	"Julian Day Number": 2294422,
	"Myanmar Year":931,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Friday",
	"Description":"Lan Xang campaign begins."
},
{
	"Julian Day Number": 2294686,
	"Myanmar Year":932,
	"Myanmar Month":"Wagung",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Wednesday",
	"Description":"King of Manipur presents his daughter."
},
{
	"Julian Day Number": 2294984,
	"Myanmar Year":933,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":7,
	"Day of the Week":"Saturday",
	"Description":"Marriage of Minye Thihathu II and Min Khin Saw."
},
{
	"Julian Day Number": 2295225,
	"Myanmar Year":933,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Wednesday",
	"Description":"Donates to the treasure chamber of Kyaikko Pagoda."
},
{
	"Julian Day Number": 2295441,
	"Myanmar Year":934,
	"Myanmar Month":"Wagung",
	"Moon Phase":"Waning",
	"Fortnight Day":6,
	"Day of the Week":"Tuesday",
	"Description":"Donates to the treasure chamber of Kyaikko Pagoda."
},
{
	"Julian Day Number": 2295496,
	"Myanmar Year":934,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Monday",
	"Description":"Raises new umbrella at the Shwe Dagon."
},
{
	"Julian Day Number":2295601,
	"Myanmar Year":934,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Monday",
	"Description":"Thinga Dathat’s hair shaving ceremony."
},
{
	"Julian Day Number":2295725,
	"Myanmar Year":935,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Saturday",
	"Description":"Donates a new Buddha statue."
},
{
	"Julian Day Number": 2295909,
	"Myanmar Year":935,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Monday",
	"Description":"Donates a new pyathat."
},
{
	"Julian Day Number": 2295969,
	"Myanmar Year":935,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Friday",
	"Description":"Donates a hall at the Mahazedi."
},
{
	"Julian Day Number":2295988,
	"Myanmar Year":935,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":7,
	"Day of the Week":"Wednesday",
	"Description":"Nawrahta Minsaw weds Hsinbyshin Medaw."
},
{
	"Julian Day Number":2296006,
	"Myanmar Year":935,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":11,
	"Day of the Week":"Sunday",
	"Description":"Wedding day of several sons and daughters of the king."
},
{
	"Julian Day Number":2296234,
	"Myanmar Year":936,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waning",
	"Fortnight Day":1,
	"Day of the Week":"Thursday",
	"Description":"Mohnyin campaign begins."
},
{
	"Julian Day Number":2296240,
	"Myanmar Year":936,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waning",
	"Fortnight Day":7,
	"Day of the Week":"Wednesday",
	"Description":"Lan Xang campaign begins."
},
{
	"Julian Day Number":2296510,
	"Myanmar Year":937,
	"Myanmar Month":"Waso",
	"Moon Phase":"Waning",
	"Fortnight Day":12,
	"Day of the Week":"Sunday",
	"Description":"Arrives back to Pegu (from Vientiane)."
},
{
	"Julian Day Number":2296594,
	"Myanmar Year":937,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waning",
	"Fortnight Day":7,
	"Day of the Week":"Saturday",
	"Description":"Campaign to Mohnyin begins."
},
{
	"Julian Day Number":2296878,
	"Myanmar Year":938,
	"Myanmar Month":"Second Waso",
	"Moon Phase":"Waxing",
	"Fortnight Day":11,
	"Day of the Week":"Thursday",
	"Description":"A female white elephant arrives from Tavoy."
},
{
	"Julian Day Number":2296998,
	"Myanmar Year":938,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":13,
	"Day of the Week":"Friday",
	"Description":"Makes donations to the Mahazedi Pagoda."
},
{
	"Julian Day Number":2297050,
	"Myanmar Year":938,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Monday",
	"Description":"Stays at the royal tent west of the Mahazedi."
},
{
	"Julian Day Number":2297112,
	"Myanmar Year":938,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":9,
	"Day of the Week":"Sunday",
	"Description":"Shin Thissa marries Min Hpone Myat."
},
{
	"Julian Day Number":2297328,
	"Myanmar Year":939,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waning",
	"Fortnight Day":3,
	"Day of the Week":"Tuesday",
	"Description":"Fugitive Mogaung Sawbwa brought before the king."
},
{
	"Julian Day Number":2297348,
	"Myanmar Year":939,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":9,
	"Day of the Week":"Friday",
	"Description":"Thinga Dathta’s hair knotting ceremony."
},
{
	"Julian Day Number": 2297364,
	"Myanmar Year":939,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waning",
	"Fortnight Day":10,
	"Day of the Week":"Sunday",
	"Description":"Donates a new zayat (hall)."
},
{
	"Julian Day Number": 2297625,
	"Myanmar Year":940,
	"Myanmar Month":"Wagung",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Wednesday",
	"Description":"New pyathat built at Pegu."
},
{
	"Julian Day Number": 2297775,
	"Myanmar Year":940,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waning",
	"Fortnight Day":8,
	"Day of the Week":"Friday",
	"Description":"New umbrella raising ceremony at the Sandawshin at Toungoo."
},
{
	"Julian Day Number":2297787,
	"Myanmar Year":940,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Wednesday",
	"Description":"Receives news of death of Maha Dewi of Lan Na."
},
{
	"Julian Day Number":2297816,
	"Myanmar Year":940,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Wednesday",
	"Description":"Nawrahta Minsaw appointed viceroy of Lan Na."
},
{
	"Julian Day Number":2297891,
	"Myanmar Year":941,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":6,
	"Day of the Week":"Monday",
	"Description":"Donation ceremony at Mahazedi."
},
{
	"Julian Day Number":2297970,
	"Myanmar Year":941,
	"Myanmar Month":"Second Waso",
	"Moon Phase":"Waxing",
	"Fortnight Day":10,
	"Day of the Week":"Thursday",
	"Description":"Nawrahta Minsaw’s coronation ceremony at Chiang Mai."
},
{
	"Julian Day Number":2298260,
	"Myanmar Year":942,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Sunday",
	"Description":"Bayinnaung dedicates the treasure chamber of Kaung-mhu-daw Mahamuni Pagoda."
},
{
	"Julian Day Number":2298543,
	"Myanmar Year":942,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waning",
	"Fortnight Day":7,
	"Day of the Week":"Wednesday",
	"Description":"Umbrella (hti) raising ceremony at a pagoda."
},
{
	"Julian Day Number":2298548,
	"Myanmar Year":942,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waning",
	"Fortnight Day":12,
	"Day of the Week":"Wednesday",
	"Description":"City of Kale fortified."
},
{
	"Julian Day Number":2298557,
	"Myanmar Year":942,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":7,
	"Day of the Week":"Wednesday",
	"Description":"Shin Thissa appointed governor of Nyaungyan."
},
{
	"Julian Day Number":2298642,
	"Myanmar Year":943,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":3,
	"Day of the Week":"Thursday",
	"Description":"Receives Mohnyin Sawbwa."
},
{
	"Julian Day Number":2298645,
	"Myanmar Year":943,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Sunday",
	"Description":"Receives Chaing Rai Sawbwa."
},
{
	"Julian Day Number":2298664,
	"Myanmar Year":943,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Waning",
	"Fortnight Day":10,
	"Day of the Week":"Friday",
	"Description":"Appoints Thinga Dathta viceroy of Martaban."
},
{
	"Julian Day Number":2298801,
	"Myanmar Year":943,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Tuesday",
	"Description":"Bayinnaung dies."
},
{
	"Julian Day Number":2299305,
	"Myanmar Year":944,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":1,
	"Day of the Week":"Tuesday",
	"Description":"A comet going across the Sun observed."
},
{
	"Julian Day Number":2299718,
	"Myanmar Year":946,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":1,
	"Day of the Week":"Tuesday",
	"Description":"Nanda marches to Ava."
},
{
	"Julian Day Number":2300003,
	"Myanmar Year":946,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":5,
	"Day of the Week":"Sunday",
	"Description":"Nanda dedicates a Bronze Buddha statue."
},
{
	"Julian Day Number":2300030,
	"Myanmar Year":946,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":3,
	"Day of the Week":"Saturday",
	"Description":"Nanda dedicates five Buddha statues (hence known as Nga-Zu-Dayaka Min)."
},
{
	"Julian Day Number":2300626,
	"Myanmar Year":948,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":9,
	"Day of the Week":"Sunday",
	"Description":"Siam campaign begins."
},
{
	"Julian Day Number":2301198,
	"Myanmar Year":950,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Friday",
	"Description":"Marriage between Minye Kyawhtin and Princess Thakin Gyi."
},
{
	"Julian Day Number":2301477,
	"Myanmar Year":950,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Thursday",
	"Description":"Appoints Thado Dhamma Yaza III viceroy of Prome."
},
{
	"Julian Day Number":2302834,
	"Myanmar Year":954,
	"Myanmar Month":"Nadaw",
	"Moon Phase":"Waxing",
	"Fortnight Day":2,
	"Day of the Week":"Wednesday",
	"Description":"5th invasion of Siam begins."
},
{
	"Julian Day Number":2302899,
	"Myanmar Year":954,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":8,
	"Day of the Week":"Friday",
	"Description":"Mingyi Swa dies in action."
},
{
	"Julian Day Number":2303254,
	"Myanmar Year":955,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waxing",
	"Fortnight Day":8,
	"Day of the Week":"Wednesday",
	"Description":"Appoints Minye Kyawswa II of Ava heir-apparent."
},
{
	"Julian Day Number":2303254,
	"Myanmar Year":956,
	"Myanmar Month":"Waso",
	"Moon Phase":"Waning",
	"Fortnight Day":13,
	"Day of the Week":"Friday",
	"Description":"Palace struck by lightning."
},
{
	"Julian Day Number":2304111,
	"Myanmar Year":958,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waxing",
	"Fortnight Day":9,
	"Day of the Week":"Sunday",
	"Description":"Queen Min Phyu dies."
},
{
	"Julian Day Number":2304545,
	"Myanmar Year":959,
	"Myanmar Month":"Waso",
	"Moon Phase":"New moon",
	"Fortnight Day":15,
	"Day of the Week":"Saturday",
	"Description":"Nyaungyan takes Yamethin."
},
{
	"Julian Day Number":2304565,
	"Myanmar Year":959,
	"Myanmar Month":"Wagaung",
	"Moon Phase":"Waning",
	"Fortnight Day":5,
	"Day of the Week":"Friday",
	"Description":"Nyaungyan takes Pagan."
},
{
	"Julian Day Number":2304591,
	"Myanmar Year":959,
	"Myanmar Month":"Tawthalin",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Wednesday",
	"Description":"Nyaungyan moves into Ava Palace."
},
{
	"Julian Day Number":2304610,
	"Myanmar Year":959,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waxing",
	"Fortnight Day":6,
	"Day of the Week":"Monday",
	"Description":"Thado Dhamma Yaza III assassinated."
},
{
	"Julian Day Number":2304893,
	"Myanmar Year":960,
	"Myanmar Month":"First Waso",
	"Moon Phase":"Waning",
	"Fortnight Day":9,
	"Day of the Week":"Thursday",
	"Description":"Nyaungyan orders new construction works at Ava. (Small leap year in Ava)"
},
{
	"Julian Day Number":2305435,
	"Myanmar Year":961,
	"Myanmar Month":"Pyatho",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Sunday",
	"Description":"Nanda surrenders to Toungoo and Arakan."
},
{
	"Julian Day Number":2305492,
	"Myanmar Year":961,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":2,
	"Day of the Week":"Monday",
	"Description":"Minye Thihathu returns to Toungoo."
},
{
	"Julian Day Number":2305574,
	"Myanmar Year":962,
	"Myanmar Month":"Kason",
	"Moon Phase":"Waning",
	"Fortnight Day":10,
	"Day of the Week":"Saturday",
	"Description":"Siamese forces retreat from Toungoo."
},
{
	"Julian Day Number":2305819,
	"Myanmar Year":962,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Saturday",
	"Description":"Nyaungyan begins campaign to Nyaungshwe."
},
{
	"Julian Day Number":2306211,
	"Myanmar Year":963,
	"Myanmar Month":"Tabodwe",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Saturday",
	"Description":"Nyaungyan visits Shwethalyaung Pagoda."
},
{
	"Julian Day Number":2306232,
	"Myanmar Year":963,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Sunday",
	"Description":"Campaign to Bhamo begins."
},
{
	"Julian Day Number":2306629,
	"Myanmar Year":964,
	"Myanmar Month":"Late Tagu",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Friday",
	"Description":"Donates labor at the Sandamuni Pagoda, Ava."
},
{
	"Julian Day Number":2306861,
	"Myanmar Year":965,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":12,
	"Day of the Week":"Saturday",
	"Description":"Donates to the relic chamber of the Sandamuni."
},
{
	"Julian Day Number":2307344,
	"Myanmar Year":966,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":8,
	"Day of the Week":"Friday",
	"Description":"Donates to the relic chamber of the Sandamuni."
},
{
	"Julian Day Number":2307349,
	"Myanmar Year":966,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":13,
	"Day of the Week":"Wednesday",
	"Description":"Dedicates a steele at the pagoda."
},
{
	"Julian Day Number":2307476,
	"Myanmar Year":967,
	"Myanmar Month":"Wagaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":7,
	"Day of the Week":"Thursday",
	"Description":"Holds court about invasion of Hsenwi, Hsipaw and Mong Mit."
},
{
	"Julian Day Number":2307779,
	"Myanmar Year":968,
	"Myanmar Month":"Nayon",
	"Moon Phase":"Full moon",
	"Fortnight Day":15,
	"Day of the Week":"Saturday",
	"Description":"Anaukpetlun holds new umbrella raising ceremony at the Sandamuni ."
},
{
	"Julian Day Number":2308080,
	"Myanmar Year":968,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":6,
	"Day of the Week":"Saturday",
	"Description":"Builds monastery for the Bame Sayadaw."
},
{
	"Julian Day Number":2308299,
	"Myanmar Year":969,
	"Myanmar Month":"Tazaungmon",
	"Moon Phase":"Waxing",
	"Fortnight Day":4,
	"Day of the Week":"Monday",
	"Description":"Prome campaign begins."
},
{
	"Julian Day Number":2308572,
	"Myanmar Year":970,
	"Myanmar Month":"Wagaung",
	"Moon Phase":"Waxing",
	"Fortnight Day":11,
	"Day of the Week":"Monday",
	"Description":"Anaukpetlun takes Prome."
},
{
	"Julian Day Number":2308637,
	"Myanmar Year":970,
	"Myanmar Month":"Thadingyut",
	"Moon Phase":"Waning",
	"Fortnight Day":2,
	"Day of the Week":"Wednesday",
	"Description":"Returns to Ava."
},
{
	"Julian Day Number":2308783,
	"Myanmar Year":970,
	"Myanmar Month":"Tabaung",
	"Moon Phase":"Waning",
	"Fortnight Day":1,
	"Day of the Week":"Tuesday",
	"Description":"Atula Sanda Dewi becomes chief queen."
}
]
);

//End of chronical dates ######################################################
