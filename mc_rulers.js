//Start of Rulers in Myanmar history ##########################################
//Description: Rulers (kings) in Myanmar history
//    Ref:
//         https://en.wikipedia.org/wiki/List_of_Burmese_monarchs
//          https://en.wikipedia.org/wiki/List_of_colonial_governors_of_Burma
//          https://en.wikipedia.org/wiki/List_of_Presidents_of_Myanmar
//          https://my.wikipedia.org/wiki/%E1%80%9B%E1%80%81%E1%80%AD%E1%80%AF%E1%80%84%E1%80%BA%E1%80%99%E1%80%84%E1%80%BA%E1%80%B8%E1%80%86%E1%80%80%E1%80%BA
//          https://my.wikipedia.org/wiki/%E1%80%95%E1%80%BB%E1%80%89%E1%80%BA%E1%80%95%E1%80%BC%E1%80%AC%E1%80%B8%E1%80%99%E1%80%84%E1%80%BA%E1%80%B8

var g_RulerList=[];// list of rulers
var g_Rulers;
function Rulers(a) {g_Rulers=a;}
var g_dyn;
function Dynasties(a) {g_dyn=a;}
//-----------------------------------------------------------------------------
//Search jd in ruler records,  input: (jd=Julian day number), output: (no output, just update g_RulerList)
function mc_rSearch(jd)
{	var ro;	var i=0; var u=g_Rulers.length; 
	for(i=0;i<u;i++) { ro=g_Rulers[i]; if (jd>=ro.Beginning_JDN && jd<=ro.Ending_JDN) mc_rPush(ro); }
}
//-----------------------------------------------------------------------------
//Add an entry to ruler records, input: (ro= ruler object), output: (no output, just update ro_list)
function mc_rPush(ro)
{   var i=0; var f=1; var u=g_RulerList.length; 
	for(i=0;i<u;i++) if (ro.Name==g_RulerList[i].Name) f=0; // found
	if (f) g_RulerList[u]=ro;//only add if it is not there
}
//-----------------------------------------------------------------------------
//Clear ruler records
function mc_rClear() { g_RulerList.length=0; }//g_RulerList.splice(0,g_RulerList.length);
//-----------------------------------------------------------------------------
//check if there is ruler records, input: (no input), output: (length)
function mc_rLength() { return g_RulerList.length; }
//-------------------------------------------------------------------------
// jdn to date string
function mc_j2d(jd,rf) {
	var M=j2m(jd,rf);
	var hmma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
		 "Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung"];
	var hmpa=["Waxing","Full moon","Waning","New moon"];
	var hwda=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']; 
	var str="ME "+M.my.toString()+" "; if(M.mmt) str+="Late ";
	if(M.myt && M.mm==4) str+="Second "; str+=hmma[M.mm]+" "+hmpa[M.mp];
	if((M.mp%2)==0) str+=" "+M.fd.toString(); str+=" "+hwda[M.wd];
	return str;
}
//-------------------------------------------------------------------------
//End of Rulers in Myanmar history ############################################

Dynasties(
{
"Konbaung":{
		"Description":"Konbaung (ကုန်းဘောင်ခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/Konbaung_Dynasty"
	},
"Restored_Hanthawaddy":{
		"Description":"Restored Hanthawaddy Kingdom (ဟံသာဝတီပဲခူးတိုင်းပြည်)",
		"URL":"https://en.wikipedia.org/wiki/Restored_Hanthawaddy_Kingdom"
	},
"Taungoo":{
		"Description":"Taungoo (တောင်ငူခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/Taungoo_Dynasty"
	},
"Mrauk_U":{
		"Description":"Mrauk-U Dynasty (မြောက်‌ဦး)",
		"URL":"https://en.wikipedia.org/wiki/Kingdom_of_Mrauk_U"
	},
"Hanthawaddy":{
		"Description":"Hanthawaddy Dynasty (ဟံသာဝတီ)",
		"URL":"https://en.wikipedia.org/wiki/Hanthawaddy_Kingdom"
	},
"Prome":{
		"Description":"Prome Dynasty (ဒုတိယ သရေခေတ္တရာ)",
		"URL":"https://en.wikipedia.org/wiki/Prome_Kingdom"
	},
"Ava":{
		"Description":"Ava Dynasty (အင်းဝခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/Kingdom_of_Ava"
	},
"Sagaing":{
		"Description":"Sagaing Kingdom (စစ်ကိုင်းခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/Sagaing_Kingdom"
	},
"Pinya":{
		"Description":"Pinya Kingdom (ပင်းယခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/Pinya_Kingdom"
	},
"Myinsaing":{
		"Description":"Myinsaing Kingdom (မြင်စိုင်းခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/Myinsaing_Kingdom"
	},
"Pagan":{
		"Description":"Pagan Kingdom (ပုဂံခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/Pagan_Kingdom"
	},
"Early_Pagan":{
		"Description":"Early Pagan Kingdom (ခေတ်ဦး ပုဂံ ပြည်)",
		"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom"
	},
"British_Colonial_Period":{
		"Description":"British Colonial Period (ဗြိတိသျှကိုလိုနီခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/British_rule_in_Burma"
	},
"Japanese_Occupation":{
		"Description":"Japanese Occupation (ဂျပန်ခေတ်)",
		"URL":"https://en.wikipedia.org/wiki/Japanese_occupation_of_Burma"
	},
"Union_of_Burma":{
		"Description":"Union of Burma",
		"URL":"https://en.wikipedia.org/wiki/Post-independence_Burma,_1948%E2%80%9362"
	},
"Socialist_Republic":{
		"Description":"Socialist Republic of the Union of Burma",
		"URL":"https://en.wikipedia.org/wiki/Burmese_Way_to_Socialism"
	},
"Union_of_Myanmar":{
		"Description":"Union of Myanmar",
		"URL":"https://en.wikipedia.org/wiki/State_Peace_and_Development_Council"
	},
"Republic_Myanmar":{
		"Description":"Republic of the Union of Myanmar",
		"URL":"https://en.wikipedia.org/wiki/Myanmar"
	}
}
);

//-------------------------------------------------------------------------
Rulers(
 
[
{
	"Name":"Popa Sawrahan (ပုပ္ပားစောရဟန်း)",
	"Beginning_JDN":1944957, 
	"Ending_JDN":1954904, 
	"Dynasty":"Early_Pagan",
	"URL":"https://my.wikipedia.org/wiki/%E1%80%95%E1%80%AF%E1%80%95%E1%80%B9%E1%80%95%E1%80%AB%E1%80%B8_%E1%80%85%E1%80%B1%E1%80%AC%E1%80%9B%E1%80%9F%E1%80%94%E1%80%BA%E1%80%B8"
},
{
	"Name":"Shwe Ohnthi (ရွှေအုန်းသီး)",
	"Beginning_JDN":1954904, 
	"Ending_JDN":1959201, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Peit Thon (ပိတ်သုံ)",
	"Beginning_JDN":1959201, 
	"Ending_JDN":1962123, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Peit Taung (ပိတ်တောင်း)",
	"Beginning_JDN":1962123, 
	"Ending_JDN":1980386, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Min Khwe (စောခွေး)",
	"Beginning_JDN":1980386, 
	"Ending_JDN":1982577, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Myingyway (မြင်းကျွေး)",
	"Beginning_JDN":1982577, 
	"Ending_JDN":1986230, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Theinga (သိန်ခဲ)",
	"Beginning_JDN":1986230, 
	"Ending_JDN":1989152, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Thein Khun (သိန်ခွန်)",
	"Beginning_JDN":1989152, 
	"Ending_JDN":1992804, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Shwe Laung (ရွှေလောင်း)",
	"Beginning_JDN":1992804, 
	"Ending_JDN":1996092, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Htun Htwin (ထွန်တွင်း)",
	"Beginning_JDN":1996092, 
	"Ending_JDN":1999379, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Shwe Hmauk (ရွှေမှောက်)",
	"Beginning_JDN":1999379, 
	"Ending_JDN":2007780, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Htun Lut (ထွန်လတ်)",
	"Beginning_JDN":2007780, 
	"Ending_JDN":2013989, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Saw Khin Hnit (စောခင်နှစ်)",
	"Beginning_JDN":2013989, 
	"Ending_JDN":2023851, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Khe Lu (ခဲလူး)",
	"Beginning_JDN":2023851, 
	"Ending_JDN":2030060, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Early_Pagan_Kingdom#Middle_Early_Pagan"
},
{
	"Name":"Pyinbya (ပျဉ်ပြား)",
	"Beginning_JDN":2030060, 
	"Ending_JDN":2044670, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Pyinbya"
},
{
	"Name":"Tannet (တန်နက်)",
	"Beginning_JDN":2044670, 
	"Ending_JDN":2051244, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Tannet_of_Pagan"
},
{
	"Name":"Sale Ngahkwe (စလေငခွေး)",
	"Beginning_JDN":2051244, 
	"Ending_JDN":2062202, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Sale_Ngahkwe"
},
{
	"Name":"Theinhko (သိန်းခို)",
	"Beginning_JDN":2062202, 
	"Ending_JDN":2070237, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Theinhko"
},
{
	"Name":"Nyaung-u Sawrahan [Cucumber King] (ညောင်ဦး စောရဟန်း [တောင်သူကြီးမင်း])",
	"Beginning_JDN":2070237, 
	"Ending_JDN":2086674, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Nyaung-u_Sawrahan"
},
{
	"Name":"Kunhsaw Kyaunghpyu (ကွမ်းဆော် ကြောင်းဖြူ)",
	"Beginning_JDN":2086674, 
	"Ending_JDN":2093979, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Kunhsaw_Kyaunghpyu"
},
{
	"Name":"Kyiso (ကျဉ်စိုး)",
	"Beginning_JDN":2093979, 
	"Ending_JDN":2100278, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Kyiso"
},
{
	"Name":"Sokkate (စုက္ကတေး)",
	"Beginning_JDN":2100278, 
	"Ending_JDN":2102602, 
	"Dynasty":"Early_Pagan",
	"URL":"https://en.wikipedia.org/wiki/Sokkate"
},
{
	"Name":"Anawrahta Minsaw (အနော်ရထာ မင်းစော)",
	"Beginning_JDN":2102602, 
	"Ending_JDN":2114533, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Anawrahta"
},
{
	"Name":"Sawlu (စောလူး)",
	"Beginning_JDN":2114533, 
	"Ending_JDN":2117100, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Sawlu"
},
{
	"Name":"Kyansittha (ကျန်စစ်သား)",
	"Beginning_JDN":2117100, 
	"Ending_JDN":2127582, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Kyansittha"
},
{
	"Name":"Alaungsithu (အလောင်းစည်သူ)",
	"Beginning_JDN":2127582, 
	"Ending_JDN":2147305, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Alaungsithu"
},
{
	"Name":"Narathu (နရသူ)",
	"Beginning_JDN":2147305, 
	"Ending_JDN":2148797, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Narathu"
},
{
	"Name":"Naratheinkha (နရသိင်္ခ)",
	"Beginning_JDN":2148797, 
	"Ending_JDN":2149982, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Naratheinkha"
},
{
	"Name":"Narapati Sithu (နရပတိ စည်သူ)",
	"Beginning_JDN":2149982, 
	"Ending_JDN":2163605, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Narapatisithu"
},
{
	"Name":"Htilominlo (ထီးလိုမင်းလို)",
	"Beginning_JDN":2163605, 
	"Ending_JDN":2172341, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Htilominlo"
},
{
	"Name":"Naratheinga Uzana (နရသိင်္ဃ ဥဇနာ)",
	"Beginning_JDN":2170681, 
	"Ending_JDN":2172341, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Naratheinga_Uzana"
},
{
	"Name":"Kyaswa (ကျစွာ)",
	"Beginning_JDN":2172341, 
	"Ending_JDN":2178106, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Kyaswa"
},
{
	"Name":"Uzana (ဥဇနာ)",
	"Beginning_JDN":2178106, 
	"Ending_JDN":2179938, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Uzana_of_Pagan"
},
{
	"Name":"Narathihapate (နရသီဟပတေ့)",
	"Beginning_JDN":2179938, 
	"Ending_JDN":2191316, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Narathihapate"
},
{
	"Name":"Kyawswa (ကျော်စွာ)",
	"Beginning_JDN":2192015, 
	"Ending_JDN":2195138, 
	"Dynasty":"Pagan",
	"URL":"https://en.wikipedia.org/wiki/Kyawswa_of_Pagan"
},
{
	"Name":"Co-rulers: Athinkhaya, Yazathingyan, Thihathu (အသင်္ခယာ၊ ရာဇသင်္ကြန်၊ သီဟသူ)",
	"Beginning_JDN":2195138, 
	"Ending_JDN":2199638, 
	"Dynasty":"Myinsaing",
	"URL":"https://en.wikipedia.org/wiki/Athinkhaya"
},
{
	"Name":"Co-rulers: Yazathingyan, Thihathu (ရာဇသင်္ကြန်၊ သီဟသူ)",
	"Beginning_JDN":2199638, 
	"Ending_JDN":2200669, 
	"Dynasty":"Myinsaing",
	"URL":"https://en.wikipedia.org/wiki/Yazathingyan"
},
{
	"Name":"Thihathu (သီဟသူ)",
	"Beginning_JDN":2200669, 
	"Ending_JDN":2205046, 
	"Dynasty":"Pinya",
	"URL":"https://en.wikipedia.org/wiki/Thihathu"
},
{
	"Name":"Uzana I of Pinya (ပထမ ဥဇနာ [ပင်းယ])",
	"Beginning_JDN":2205046, 
	"Ending_JDN":2210737, 
	"Dynasty":"Pinya",
	"URL":"https://en.wikipedia.org/wiki/Uzana_I_of_Pinya"
},
{
	"Name":"Sithu of Pinya [Myinsaing Sithu] (စည်သူ [မြင်စိုင်းစည်သူ])",
	"Beginning_JDN":2210737, 
	"Ending_JDN":2212042, 
	"Dynasty":"Pinya",
	"URL":"https://en.wikipedia.org/wiki/Sithu_of_Pinya"
},
{
	"Name":"Ngarsishin Kyawswa (ငါးစီးရှင် ကျော်စွာ)",
	"Beginning_JDN":2212042, 
	"Ending_JDN":2214491, 
	"Dynasty":"Pinya",
	"URL":"https://en.wikipedia.org/wiki/Kyawswa_I_of_Pinya"
},
{
	"Name":"Kyawswange (ကျော်စွာငယ်)",
	"Beginning_JDN":2214491, 
	"Ending_JDN":2217520, 
	"Dynasty":"Pinya",
	"URL":"https://en.wikipedia.org/wiki/Kyawswa_II_of_Pinya"
},
{
	"Name":"Narathu of Pinya (နရသူ [ပင်းယ])",
	"Beginning_JDN":2217520, 
	"Ending_JDN":2219411, 
	"Dynasty":"Pinya",
	"URL":"https://en.wikipedia.org/wiki/Narathu_of_Pinya"
},
{
	"Name":"Uzana Pyaung (ဥဇနာ ပြောင်)",
	"Beginning_JDN":2219411, 
	"Ending_JDN":2219503, 
	"Dynasty":"Pinya",
	"URL":"https://en.wikipedia.org/wiki/Uzana_II_of_Pinya"
},
{
	"Name":"Athinhkaya Sawyun (အသင်္ခယာ စောယွမ်း)",
	"Beginning_JDN":2201496, 
	"Ending_JDN":2205780, 
	"Dynasty":"Sagaing",
	"URL":"https://en.wikipedia.org/wiki/Sawyun"
},
{
	"Name":"Tarabyagyi (တရဖျားကြီး)",
	"Beginning_JDN":2205780, 
	"Ending_JDN":2208667, 
	"Dynasty":"Sagaing",
	"URL":"https://en.wikipedia.org/wiki/Tarabya_I_of_Sagaing"
},
{
	"Name":"Thiri Thihathura Shwetaungtet (သီရိ သီဟသူရ ရွှေတောင်တက်)",
	"Beginning_JDN":2208667, 
	"Ending_JDN":2210128, 
	"Dynasty":"Sagaing",
	"URL":"https://en.wikipedia.org/wiki/Shwetaungtet"
},
{
	"Name":"Kyaswa of Sagaing (ကျစွာ [စစ်ကိုင်း])",
	"Beginning_JDN":2210128, 
	"Ending_JDN":2213415, 
	"Dynasty":"Sagaing",
	"URL":"https://en.wikipedia.org/wiki/Kyaswa_of_Sagaing"
},
{
	"Name":"Nawrahta Minye (နော်ရထာ မင်းရဲ)",
	"Beginning_JDN":2213415, 
	"Ending_JDN":2214205, 
	"Dynasty":"Sagaing",
	"URL":"https://en.wikipedia.org/wiki/Nawrahta_Minye"
},
{
	"Name":"Tarabyange (တရဖျားငယ်)",
	"Beginning_JDN":2214205, 
	"Ending_JDN":2214929, 
	"Dynasty":"Sagaing",
	"URL":"https://en.wikipedia.org/wiki/Tarabya_II_of_Sagaing"
},
{
	"Name":"Minbyauk Thihapate (မင်းပြောက် သီဟပတေ့)",
	"Beginning_JDN":2214929, 
	"Ending_JDN":2219350, 
	"Dynasty":"Sagaing",
	"URL":"https://en.wikipedia.org/wiki/Minbyauk_Thihapate"
},
{
	"Name":"Thadominbya (သတိုးမင်းဖျား)",
	"Beginning_JDN":2219350, 
	"Ending_JDN":2220602, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Thadominbya"
},
{
	"Name":"Swasawke (စွာစော်ကဲ)",
	"Beginning_JDN":2220602, 
	"Ending_JDN":2232499, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Swasawke"
},
{
	"Name":"Tarabya of Ava (တရဖျား)",
	"Beginning_JDN":2232499, 
	"Ending_JDN":2232737, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Tarabya_of_Ava"
},
{
	"Name":"Minkhaung I (ပထမ မင်းခေါင်)",
	"Beginning_JDN":2232737, 
	"Ending_JDN":2240475, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Minkhaung_I"
},
{
	"Name":"Thihathu of Ava (သီဟသူ [အင်းဝ])",
	"Beginning_JDN":2240475, 
	"Ending_JDN":2241752, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Thihathu_of_Ava"
},
{
	"Name":"Minhlange (မင်းလှငယ်)",
	"Beginning_JDN":2241752, 
	"Ending_JDN":2241844, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Minhlange"
},
{
	"Name":"Kale Kyetaungnyo (ကလေး ကျေးတောင်ညို)",
	"Beginning_JDN":2241844, 
	"Ending_JDN":2242044, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Kale_Kyetaungnyo"
},
{
	"Name":"Mohnyin Thado (မိုးညှင်းသတိုး)",
	"Beginning_JDN":2242044, 
	"Ending_JDN":2246773, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Mohnyin_Thado"
},
{
	"Name":"Minyekyawswa of Ava (မင်းရဲကျော်စွာ [အင်းဝ])",
	"Beginning_JDN":2246773, 
	"Ending_JDN":2247749, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Minyekyawswa_of_Ava"
},
{
	"Name":"Narapati of Ava (နရပတိ [အင်းဝ])",
	"Beginning_JDN":2247749, 
	"Ending_JDN":2257450, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Narapati_of_Ava"
},
{
	"Name":"Thihathura of Ava (သီဟသူရ [အင်းဝ])",
	"Beginning_JDN":2257450, 
	"Ending_JDN":2261841, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Thihathura_of_Ava"
},
{
	"Name":"Minkhaung II (ဒုတိယ မင်းခေါင်)",
	"Beginning_JDN":2261841, 
	"Ending_JDN":2269395, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Minkhaung_II"
},
{
	"Name":"Thihathura II of Ava (ဒုတိယ သီဟသူရ [အင်းဝ])",
	"Beginning_JDN":2263455, 
	"Ending_JDN":2269361, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Thihathura_II_of_Ava"
},
{
	"Name":"Shwenankyawshin Narapati (ရွှေနန်းကြော့ရှင် နရပတိ)",
	"Beginning_JDN":2269395, 
	"Ending_JDN":2278867, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Shwenankyawshin"
},
{
	"Name":"Thohanbwa (သိုဟန်ဘွား)",
	"Beginning_JDN":2278867, 
	"Ending_JDN":2284424, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Thohanbwa"
},
{
	"Name":"Hkonmaing (ခုံမှိုင်း)",
	"Beginning_JDN":2284425, 
	"Ending_JDN":2285613, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Hkonmaing"
},
{
	"Name":"Mobye Narapati (မိုးဗြဲ နရပတိ)",
	"Beginning_JDN":2285613, 
	"Ending_JDN":2287834, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Mobye_Narapati"
},
{
	"Name":"Sithu Kyawhtin [Narapati Sithu] (စည်သူကျော်ထင် [နရပတိ စည်သူ])",
	"Beginning_JDN":2287834, 
	"Ending_JDN":2289043, 
	"Dynasty":"Ava",
	"URL":"https://en.wikipedia.org/wiki/Sithu_Kyawhtin"
},
{
	"Name":"Thado Minsaw of Prome (သတိုးမင်းစော)",
	"Beginning_JDN":2262359, 
	"Ending_JDN":2278430, 
	"Dynasty":"Prome",
	"URL":"https://en.wikipedia.org/wiki/Thado_Minsaw_of_Prome"
},
{
	"Name":"Bayin Htwe (ဘုရင်ထွေး)",
	"Beginning_JDN":2278430, 
	"Ending_JDN":2280956, 
	"Dynasty":"Prome",
	"URL":"https://en.wikipedia.org/wiki/Bayin_Htwe"
},
{
	"Name":"Narapati of Prome (နရပတိ [ပြည်])",
	"Beginning_JDN":2280956, 
	"Ending_JDN":2283209, 
	"Dynasty":"Prome",
	"URL":"https://en.wikipedia.org/wiki/Narapati_of_Prome"
},
{
	"Name":"Minkhaung of Prome ( မင်းခေါင် [ပြည်])",
	"Beginning_JDN":2283209, 
	"Ending_JDN":2284412, 
	"Dynasty":"Prome",
	"URL":"https://en.wikipedia.org/wiki/Minkhaung_of_Prome"
},
{
	"Name":"Wareru (ဝါရီရူး)",
	"Beginning_JDN":2191228, 
	"Ending_JDN":2198440, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Wareru"
},
{
	"Name":"Hkun Law (ခွန်လော)",
	"Beginning_JDN":2198440, 
	"Ending_JDN":2199960, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Hkun_Law"
},
{
	"Name":"Saw O (စောအော)",
	"Beginning_JDN":2200000, 
	"Ending_JDN":2204527, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Saw_O"
},
{
	"Name":"Saw Zein (စောဇိတ်)",
	"Beginning_JDN":2204527, 
	"Ending_JDN":2206931, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Saw_Zein"
},
{
	"Name":"Zein Pun (ဇိတ်ပွန်)",
	"Beginning_JDN":2206931, 
	"Ending_JDN":2206938, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Zein_Pun"
},
{
	"Name":"Saw E (စောအဲ)",
	"Beginning_JDN":2206938, 
	"Ending_JDN":2206961, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Saw_E"
},
{
	"Name":"Binnya E Law (ဗညားအဲလော)",
	"Beginning_JDN":2206961, 
	"Ending_JDN":2213415, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Binnya_E_Law"
},
{
	"Name":"Binnya U (ဗညားဦး)",
	"Beginning_JDN":2213415, 
	"Ending_JDN":2226567, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Binnya_U"
},
{
	"Name":"Razadarit (ရာဇာဓိရာဇ်)",
	"Beginning_JDN":2226567, 
	"Ending_JDN":2240110, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Razadarit"
},
{
	"Name":"Binnya Dhammaraza (ဗညားဓမ္မရာဇာ)",
	"Beginning_JDN":2240110, 
	"Ending_JDN":2241174, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Binnya_Dhammaraza"
},
{
	"Name":"Binnya Ran I (ပထမ ဗညားရံ)",
	"Beginning_JDN":2241174, 
	"Ending_JDN":2249210, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Binnya_Ran_I"
},
{
	"Name":"Binnya Waru (ဗညားဗရူး)",
	"Beginning_JDN":2249210, 
	"Ending_JDN":2251185, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Binnya_Waru"
},
{
	"Name":"Binnya Kyan (ဗညားကျန်း)",
	"Beginning_JDN":2251185, 
	"Ending_JDN":2251918, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Binnya_Kyan"
},
{
	"Name":"Leik Munhtaw (လိပ်မွတ်ထော)",
	"Beginning_JDN":2251918, 
	"Ending_JDN":2252132, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Leik_Munhtaw"
},
{
	"Name":"Shin Sawbu (ရှင်စောပု)",
	"Beginning_JDN":2252132, 
	"Ending_JDN":2258341, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Shin_Sawbu"
},
{
	"Name":"Dhammazedi (ဓမ္မစေတီ)",
	"Beginning_JDN":2258341, 
	"Ending_JDN":2266011, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Dhammazedi"
},
{
	"Name":"Binnya Ran II (ဒုတိယ ဗညားရံ)",
	"Beginning_JDN":2266011, 
	"Ending_JDN":2278430, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Binnya_Ran_II"
},
{
	"Name":"Takayutpi (သုရှင်တကာရွတ်ပိ)",
	"Beginning_JDN":2278430, 
	"Ending_JDN":2283178, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Takayutpi"
},
{
	"Name":"Smim Sawhtut (သမိန်စောထွတ်)",
	"Beginning_JDN":2287347, 
	"Ending_JDN":2287408, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Smim_Sawhtut"
},
{
	"Name":"Smim Htaw (သမိန်ထော)",
	"Beginning_JDN":2287408, 
	"Ending_JDN":2287997, 
	"Dynasty":"Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Smim_Htaw"
},
{
	"Name":"Narameikhla Min Saw Mon(နရမိတ်လှ မင်းစောမွန်)",
	"Beginning_JDN":2243108, 
	"Ending_JDN":2244590, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Saw_Mon"
},
{
	"Name":"Min Khayi(မင်းခရီ)",
	"Beginning_JDN":2244590, 
	"Ending_JDN":2253958, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Khayi"
},
{
	"Name":"Ba Saw Phyu(ဘစောဖြူ)",
	"Beginning_JDN":2253958, 
	"Ending_JDN":2262575, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Ba_Saw_Phyu"
},
{
	"Name":"Min Dawlya(မင်းဒေါလျာ)",
	"Beginning_JDN":2262575, 
	"Ending_JDN":2266042, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Dawlya"
},
{
	"Name":"Ba Saw Nyo(ဘစောညို)",
	"Beginning_JDN":2266042, 
	"Ending_JDN":2266742, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Ba_Saw_Nyo"
},
{
	"Name":"Min Ran Aung(မင်းရန်အောင်)",
	"Beginning_JDN":2266742, 
	"Ending_JDN":2266923, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Ran_Aung"
},
{
	"Name":"Salingathu(စလင်္ကာသူ)",
	"Beginning_JDN":2266923, 
	"Ending_JDN":2269701, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Salingathu"
},
{
	"Name":"Min Raza(မင်းရာဇာ)",
	"Beginning_JDN":2269701, 
	"Ending_JDN":2273986, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Raza_of_Mrauk-U"
},
{
	"Name":"Gazapati(ဂဇာပတိ)",
	"Beginning_JDN":2273986, 
	"Ending_JDN":2274412, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Gazapati"
},
{
	"Name":"Min Saw O(မင်းစောအို)",
	"Beginning_JDN":2274412, 
	"Ending_JDN":2274593, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Saw_O"
},
{
	"Name":"Thazata(သဇာတ)",
	"Beginning_JDN":2274593, 
	"Ending_JDN":2276694, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Thazata"
},
{
	"Name":"Minkhaung of Mrauk-U(မင်းခေါင်)",
	"Beginning_JDN":2276694, 
	"Ending_JDN":2280402, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Minkhaung_of_Mrauk-U"
},
{
	"Name":"Min Bin(မင်းပင်၊ မင်းဗာကြီး)",
	"Beginning_JDN":2280402, 
	"Ending_JDN":2288667, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Bin"
},
{
	"Name":"Min Dikkha(မင်းတိက္ခာ)",
	"Beginning_JDN":2288667, 
	"Ending_JDN":2289452, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Dikkha"
},
{
	"Name":"Min Saw Hla(မင်းစောလှ)",
	"Beginning_JDN":2289452, 
	"Ending_JDN":2292514, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Saw_Hla"
},
{
	"Name":"Min Sekkya(မင်းစကြာ)",
	"Beginning_JDN":2292514, 
	"Ending_JDN":2295268, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Sekkya"
},
{
	"Name":"Min Phalaung(မင်းဖလောင်း)",
	"Beginning_JDN":2295268, 
	"Ending_JDN":2303076, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Phalaung"
},
{
	"Name":"Min Razagyi (မင်းရာဇာကြီး)",
	"Beginning_JDN":2303076, 
	"Ending_JDN":2310016, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Razagyi"
},
{
	"Name":"Min Khamaung (မင်းခမောင်း)",
	"Beginning_JDN":2303076, 
	"Ending_JDN":2313617, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Khamaung"
},
{
	"Name":"Thiri Thudhamma (သီရိသုဓမ္မ)",
	"Beginning_JDN":2313617, 
	"Ending_JDN":2319476, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Thiri_Thudhamma"
},
{
	"Name":"Min Sanay (မင်းစနေ)",
	"Beginning_JDN":2319476, 
	"Ending_JDN":2319495, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Min_Sanay"
},
{
	"Name":"Narapati of Mrauk-U (နရပတိ)",
	"Beginning_JDN":2319495, 
	"Ending_JDN":2322231, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Narapati_of_Mrauk-U"
},
{
	"Name":"Thado of Mrauk-U (သတိုဝ်မင်းတရား)",
	"Beginning_JDN":2322231, 
	"Ending_JDN":2324562, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Thado_of_Mrauk-U"
},
{
	"Name":"Sanda Thudhamma(စန္ဒသုဓမ္မရာဇာ)",
	"Beginning_JDN":2324562, 
	"Ending_JDN":2332638, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Thudhamma"
},
{
	"Name":"Oaggar Bala(ဥဂ္ဂါဗလရာဇာ)",
	"Beginning_JDN":2332638, 
	"Ending_JDN":2336600, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Oaggar Bala"
},
{
	"Name":"Wara Dhammaraza(၀ရဓမ္မရာဇာ)",
	"Beginning_JDN":2336600, 
	"Ending_JDN":2339222, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Wara_Dhammaraza"
},
{
	"Name":"Muni Thudhammaraza(မဏိသုဓမ္မရာဇာ)",
	"Beginning_JDN":2339222, 
	"Ending_JDN":2340135, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Muni_Thudhammaraza"
},
{
	"Name":"Sanda Thuriya I(စန္ဒသုရိယ ၁)",
	"Beginning_JDN":2340135, 
	"Ending_JDN":2340728, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Thuriya_I"
},
{
	"Name":"Nawrahta (ငတုံအနော်ရထာ)",
	"Beginning_JDN":2340728, 
	"Ending_JDN":2340742, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Nawrahta_of_Mrauk-U"
},
{
	"Name":"Mayuppiya (မဂုမ္မီယ)",
	"Beginning_JDN":2340742, 
	"Ending_JDN":2341010, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Mayuppiya"
},
{
	"Name":"Kalamandat (ကာလဗန္ဒလ)",
	"Beginning_JDN":2341010, 
	"Ending_JDN":2341398, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Kalamandat"
},
{
	"Name":"Naradipati I (ပထမ နာရာဓိပတိ)",
	"Beginning_JDN":2341398, 
	"Ending_JDN":2342140, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Naradipati_I"
},
{
	"Name":"Sanda Wimala I (ပထမ စန္ဒဝိမလရာဇာ)",
	"Beginning_JDN":2342141, 
	"Ending_JDN":2344617, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Wimala_I"
},
{
	"Name":"Sanda Thuriya II (စန္ဒသုရိယရာဇာ ၂)",
	"Beginning_JDN":2344621, 
	"Ending_JDN":2345868, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Thuriya_II"
},
{
	"Name":"Sanda Wizaya I (ပထမ စန္ဒဝိဇလရာဇာ)",
	"Beginning_JDN":2345929, 
	"Ending_JDN":2353385, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Wizaya_I"
},
{
	"Name":"Sanda Thuriya III (စန္ဒသုရိယရာဇာ ၃)",
	"Beginning_JDN":2353385, 
	"Ending_JDN":2354391, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Thuriya_III"
},
{
	"Name":"Naradipati II (နာရာဓိပတိ ၂)",
	"Beginning_JDN":2354391, 
	"Ending_JDN":2354756, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Naradipati_II"
},
{
	"Name":"Narapawara (နာရာပါဝရ)",
	"Beginning_JDN":2354756, 
	"Ending_JDN":2355730, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Narapawara"
},
{
	"Name":"Sanda Wizaya II (စန္ဒဝိဇလ ၂)",
	"Beginning_JDN":2355730, 
	"Ending_JDN":2355935, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Wizaya_II"
},
{
	"Name":"Madarit (မဒရာဇ်ရာဇာ)",
	"Beginning_JDN":2355938, 
	"Ending_JDN":2357714, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Madarit"
},
{
	"Name":"Nara Apaya (နရာအဘယရာဇာ)",
	"Beginning_JDN":2357714, 
	"Ending_JDN":2364553, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Nara_Apaya"
},
{
	"Name":"Thirithu (သီရိသူ)",
	"Beginning_JDN":2364553, 
	"Ending_JDN":2364651, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Thirithu"
},
{
	"Name":"Sanda Parama (စန္ဒ၀ရမ)",
	"Beginning_JDN":2364651, 
	"Ending_JDN":2365469, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Parama"
},
{
	"Name":"Apaya (အဘယ)",
	"Beginning_JDN":2365469, 
	"Ending_JDN":2369017, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Apaya"
},
{
	"Name":"Sanda Thumana (စန္ဒသုမန)",
	"Beginning_JDN":2369017, 
	"Ending_JDN":2370221, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Thumana"
},
{
	"Name":"Sanda Wimala II (စန္ဒဝိမလ ၂)",
	"Beginning_JDN":2370221, 
	"Ending_JDN":2370252, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Wimala_II"
},
{
	"Name":"Sanda Thaditha (စန္ဒသတိဿ)",
	"Beginning_JDN":2370252, 
	"Ending_JDN":2372257, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Sanda_Thaditha"
},
{
	"Name":"Maha Thammada (သမ္မတ)",
	"Beginning_JDN":2372258, 
	"Ending_JDN":2373020, 
	"Dynasty":"Mrauk_U",
	"URL":"https://en.wikipedia.org/wiki/Maha_Thammada_of_Mrauk-U"
},
{
	"Name":"Mingyinyo(မင်းကြီးညို)",
	"Beginning_JDN":2272874, 
	"Ending_JDN":2280218, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Mingyinyo"
},
{
	"Name":"Tabinshwehti(တပင်‌ရွှေထီး)",
	"Beginning_JDN":2280218, 
	"Ending_JDN":2287315, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Tabinshwehti"
},
{
	"Name":"Bayinnaung Kyawhtin Nawrahta(ဘုရင့်နောင်ကျော်ထင်နော်ရထာ)",
	"Beginning_JDN":2287315, 
	"Ending_JDN":2298801, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Bayinnaung"
},
{
	"Name":"Nanda Bayin(နန္ဒဘုရင်)",
	"Beginning_JDN":2298801, 
	"Ending_JDN":2305435, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Nanda_Bayin"
},
{
	"Name":"Nyaungyan Min(ညောင်ရမ်းမင်း)",
	"Beginning_JDN":2305435, 
	"Ending_JDN":2307583, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Nyaungyan_Min"
},
{
	"Name":"Anaukpetlun(အနောက်ဖက်လွန်)",
	"Beginning_JDN":2307583, 
	"Ending_JDN":2315865, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Anaukpetlun"
},
{
	"Name":"Minyedeippa(မင်းရဲဒိဗ္ဗ)",
	"Beginning_JDN":2315865, 
	"Ending_JDN":2316271, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Minyedeippa"
},
{
	"Name":"Thalun(သာလွန်မင်း)",
	"Beginning_JDN":2316271, 
	"Ending_JDN":2323219, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Thalun"
},
{
	"Name":"Pindale Min(ပင်းတလဲမင်း)",
	"Beginning_JDN":2323219, 
	"Ending_JDN":2327882, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Pindale_Min"
},
{
	"Name":"Pye Min(ပြည်မင်း)",
	"Beginning_JDN":2327882, 
	"Ending_JDN":2331850, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Pye_Min"
},
{
	"Name":"Narawara(နရာဝရ)",
	"Beginning_JDN":2331850, 
	"Ending_JDN":2332169, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Narawara"
},
{
	"Name":"Minyekyawdin(မင်းရဲကျော်ထင်)",
	"Beginning_JDN":2332169, 
	"Ending_JDN":2341366, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Minyekyawdin"
},
{
	"Name":"Sanay Min(စနေမင်း)",
	"Beginning_JDN":2341366, 
	"Ending_JDN":2347319, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Sanay_Min"
},
{
	"Name":"Taninganway Min(တနင်္ဂနွေမင်း)",
	"Beginning_JDN":2347319, 
	"Ending_JDN":2354343, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Taninganway_Min"
},
{
	"Name":"Mahadhammaraza Dipadi(မဟာဓမ္မရာဇာဓိပတိ)",
	"Beginning_JDN":2354343, 
	"Ending_JDN":2361046, 
	"Dynasty":"Taungoo",
	"URL":"https://en.wikipedia.org/wiki/Mahadhammaraza_Dipadi"
},
{
	"Name":"Smim Htaw Buddhaketi(သမိန်ထောဗုဒ္ဓကိတ္တိ)",
	"Beginning_JDN":2356887, 
	"Ending_JDN":2359473, 
	"Dynasty":"Restored_Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Smim_Htaw_Buddhaketi"
},
{
	"Name":"Binnya Dala(ဗညားဒလ)",
	"Beginning_JDN":2359473, 
	"Ending_JDN":2362917, 
	"Dynasty":"Restored_Hanthawaddy",
	"URL":"https://en.wikipedia.org/wiki/Binnya_Dala"
},
{
	"Name":"Alaungpaya(အလောင်းဘုရား)",
	"Beginning_JDN":2361024, 
	"Ending_JDN":2364018, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Alaungpaya"
},
{
	"Name":"Naungdawgyi(နောင်တော်ကြီး)",
	"Beginning_JDN":2364018, 
	"Ending_JDN":2365314, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Naungdawgyi"
},
{
	"Name":"Hsinbyushin(ဆင်ဖြူရှင်)",
	"Beginning_JDN":2365314, 
	"Ending_JDN":2369892, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Hsinbyushin"
},
{
	"Name":"Singu Min(စဉ့်ကူးမင်း)",
	"Beginning_JDN":2369892, 
	"Ending_JDN":2371958, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Singu_Min"
},
{
	"Name":"Phaungkaza Maung Maung(ဖောင်းကားစားမောင်မောင်)",
	"Beginning_JDN":2371958, 
	"Ending_JDN":2371964, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Phaungkaza_Maung_Maung"
},
{
	"Name":"Bodawpaya(ဘိုးတော်ဘုရား)",
	"Beginning_JDN":2371964, 
	"Ending_JDN":2385591, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Bodawpaya"
},
{
	"Name":"Bagyidaw(ဘကြီးတော်)",
	"Beginning_JDN":2385591, 
	"Ending_JDN":2392115, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Bagyidaw"
},
{
	"Name":"Tharrawaddy Min(သာယာဝတီမင်း)",
	"Beginning_JDN":2392115, 
	"Ending_JDN":2395618, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Tharrawaddy_Min"
},
{
	"Name":"Pagan Min(ပုဂံမင်း)",
	"Beginning_JDN":2395618, 
	"Ending_JDN":2397903, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Pagan_Min"
},
{
	"Name":"Mindon Min(မင်းတုန်းမင်း)",
	"Beginning_JDN":2397903, 
	"Ending_JDN":2407259, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Mindon_Min"
},
{
	"Name":"Thibaw Min(သီပေါ‌မင်း)",
	"Beginning_JDN":2407259, 
	"Ending_JDN":2409875, 
	"Dynasty":"Konbaung",
	"URL":"https://en.wikipedia.org/wiki/Thibaw_Min"
},
{
	"Name":"Arthur Purves Phayre",
	"Beginning_JDN":2401172, 
	"Ending_JDN":2403014, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Arthur_Purves_Phayre"
},
{
	"Name":"Albert Fytche",
	"Beginning_JDN":2403014, 
	"Ending_JDN":2404536, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Albert_Fytche"
},
{
	"Name":"Ashley Eden",
	"Beginning_JDN":2404536, 
	"Ending_JDN":2405993, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Ashley_Eden"
},
{
	"Name":"Augustus Rivers Thompson",
	"Beginning_JDN":2405993, 
	"Ending_JDN":2407074, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Augustus_Rivers_Thompson"
},
{
	"Name":"Charles Umpherston Aitchison",
	"Beginning_JDN":2407074, 
	"Ending_JDN":2407899, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Charles_Umpherston_Aitchison"
},
{
	"Name":"Charles Edward Bernard",
	"Beginning_JDN":2407899, 
	"Ending_JDN":2408872, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Charles_Bernard_(civil_servant)"
},
{
	"Name":"Charles Hawkes Todd Crosthwaite",
	"Beginning_JDN":2408872, 
	"Ending_JDN":2409908, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Charles_Crosthwaite"
},
{
	"Name":"Charles Hawkes Todd Crosthwaite",
	"Beginning_JDN":2409908, 
	"Ending_JDN":2409964, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Charles_Crosthwaite"
},
{
	"Name":"Charles Hawkes Todd Crosthwaite",
	"Beginning_JDN":2409964, 
	"Ending_JDN":2410175, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Charles_Crosthwaite"
},
{
	"Name":"Charles Edward Bernard",
	"Beginning_JDN":2410175, 
	"Ending_JDN":2410343, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Charles_Bernard_(civil_servant)"
},
{
	"Name":"Charles Hawkes Todd Crosthwaite",
	"Beginning_JDN":2410343, 
	"Ending_JDN":2411712, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Charles_Crosthwaite"
},
{
	"Name":"Alexander Mackenzie",
	"Beginning_JDN":2411712, 
	"Ending_JDN":2413287, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Alexander_Mackenzie_(civil_servant)"
},
{
	"Name":"Frederick William Richard Fryer",
	"Beginning_JDN":2413287, 
	"Ending_JDN":2414046, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Frederick_William_Richard_Fryer"
},
{
	"Name":"Frederick William Richard Fryer",
	"Beginning_JDN":2414046, 
	"Ending_JDN":2416209, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Frederick_William_Richard_Fryer"
},
{
	"Name":"Hugh Shakespear Barnes",
	"Beginning_JDN":2416209, 
	"Ending_JDN":2416975, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Hugh_Shakespear_Barnes"
},
{
	"Name":"Herbert Thirkell White",
	"Beginning_JDN":2416975, 
	"Ending_JDN":2418811, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Herbert_Thirkell_White"
},
{
	"Name":"Harvey Adamson",
	"Beginning_JDN":2418811, 
	"Ending_JDN":2420799, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Harvey_Adamson"
},
{
	"Name":"George Shaw",
	"Beginning_JDN":2419903, 
	"Ending_JDN":2420073, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/George_Shaw_(civil_servant)"
},
{
	"Name":"Spencer Harcourt Butler",
	"Beginning_JDN":2420799, 
	"Ending_JDN":2421494, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Harcourt_Butler"
},
{
	"Name":"Walter Francis Rice",
	"Beginning_JDN":2421494, 
	"Ending_JDN":2421640, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Walter_Francis_Rice"
},
{
	"Name":"Reginald Henry Craddock",
	"Beginning_JDN":2421640, 
	"Ending_JDN":2423410, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Reginald_Craddock"
},
{
	"Name":"Spencer Harcourt Butler",
	"Beginning_JDN":2423410, 
	"Ending_JDN":2423422, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Harcourt_Butler"
},
{
	"Name":"Spencer Harcourt Butler",
	"Beginning_JDN":2423422, 
	"Ending_JDN":2425235, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Harcourt_Butler"
},
{
	"Name":"Charles Alexander Innes",
	"Beginning_JDN":2425235, 
	"Ending_JDN":2427062, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Charles_Alexander_Innes"
},
{
	"Name":"Hugh Landsdowne Stephenson",
	"Beginning_JDN":2427062, 
	"Ending_JDN":2428297, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Hugh_Lansdown_Stephenson"
},
{
	"Name":"Archibald Douglas Cochrane",
	"Beginning_JDN":2428297, 
	"Ending_JDN":2428625, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Archibald_Cochrane_(politician)"
},
{
	"Name":"Archibald Douglas Cochrane",
	"Beginning_JDN":2428625, 
	"Ending_JDN":2430121, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Archibald_Cochrane_(politician)"
},
{
	"Name":"Reginald Hugh Dorman-Smith",
	"Beginning_JDN":2430121, 
	"Ending_JDN":2432064, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Reginald_Dorman-Smith"
},
{
	"Name":"Shōjirō Iida",
	"Beginning_JDN":2430470, 
	"Ending_JDN":2430802, 
	"Dynasty":"Japanese_Occupation",
	"URL":"https://en.wikipedia.org/wiki/Sh%C5%8Djir%C5%8D_Iida"
},
{
	"Name":"Masakazu Kawabe",
	"Beginning_JDN":2430802, 
	"Ending_JDN":2431333, 
	"Dynasty":"Japanese_Occupation",
	"URL":"https://en.wikipedia.org/wiki/Masakazu_Kawabe"
},
{
	"Name":"Heitarō Kimura",
	"Beginning_JDN":2431333, 
	"Ending_JDN":2431683, 
	"Dynasty":"Japanese_Occupation",
	"URL":"https://en.wikipedia.org/wiki/Heitar%C5%8D_Kimura"
},
{
	"Name":"Admiral Lord Louis Mountbatten",
	"Beginning_JDN":2431091, 
	"Ending_JDN":2431730, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Louis_Mountbatten,_1st_Earl_Mountbatten_of_Burma"
},
{
	"Name":"Hubert Elvin Rance",
	"Beginning_JDN":2431730, 
	"Ending_JDN":2432064, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Hubert_Rance"
},
{
	"Name":"Hubert Elvin Rance",
	"Beginning_JDN":2432064, 
	"Ending_JDN":2432555, 
	"Dynasty":"British_Colonial_Period",
	"URL":"https://en.wikipedia.org/wiki/Hubert_Rance"
},
{
	"Name":"Sao Shwe Thaik (စဝ်ရွှေသိုက်)",
	"Beginning_JDN":2432555, 
	"Ending_JDN":2434088, 
	"Dynasty":"Union_of_Burma",
	"URL":"https://en.wikipedia.org/wiki/Sao_Shwe_Thaik"
},
{
	"Name":"Ba U (ဘဦး)",
	"Beginning_JDN":2434088, 
	"Ending_JDN":2435911, 
	"Dynasty":"Union_of_Burma",
	"URL":"https://en.wikipedia.org/wiki/Ba_U"
},
{
	"Name":"Mahn Win Maung (မန်းဝင်းမောင်)",
	"Beginning_JDN":2435911, 
	"Ending_JDN":2437726, 
	"Dynasty":"Union_of_Burma",
	"URL":"https://en.wikipedia.org/wiki/Win_Maung"
},
{
	"Name":"Ne Win (နေဝင်း)",
	"Beginning_JDN":2437726, 
	"Ending_JDN":2442109, 
	"Dynasty":"Union_of_Burma",
	"URL":"https://en.wikipedia.org/wiki/Ne_Win"
},
{
	"Name":"Ne Win (နေဝင်း)",
	"Beginning_JDN":2442109, 
	"Ending_JDN":2444918, 
	"Dynasty":"Socialist_Republic",
	"URL":"https://en.wikipedia.org/wiki/Ne_Win"
},
{
	"Name":"စန်းယု - San Yu ",
	"Beginning_JDN":2444918, 
	"Ending_JDN":2447370, 
	"Dynasty":"Socialist_Republic",
	"URL":"https://en.wikipedia.org/wiki/San_Yu"
},
{
	"Name":"စိန်လွင် - Sein Lwin ",
	"Beginning_JDN":2447370, 
	"Ending_JDN":2447386, 
	"Dynasty":"Socialist_Republic",
	"URL":"https://en.wikipedia.org/wiki/Sein_Lwin"
},
{
	"Name":"အေးကို - Aye Ko ",
	"Beginning_JDN":2447386, 
	"Ending_JDN":2447393, 
	"Dynasty":"Socialist_Republic",
	"URL":"https://en.wikipedia.org/wiki/Aye_Ko"
},
{
	"Name":"မောင်မောင် - Maung Maung ",
	"Beginning_JDN":2447393, 
	"Ending_JDN":2447423, 
	"Dynasty":"Socialist_Republic",
	"URL":"https://en.wikipedia.org/wiki/Maung_Maung"
},
{
	"Name":"စောမောင် - Saw Maung ",
	"Beginning_JDN":2447423, 
	"Ending_JDN":2448736, 
	"Dynasty":"Union_of_Myanmar",
	"URL":"https://en.wikipedia.org/wiki/Saw_Maung"
},
{
	"Name":"သန်းရွှေ - Than Shwe",
	"Beginning_JDN":2448736, 
	"Ending_JDN":2450758, 
	"Dynasty":"Union_of_Myanmar",
	"URL":"https://en.wikipedia.org/wiki/Than_Shwe"
},
{
	"Name":"သန်းရွှေ - Than Shwe",
	"Beginning_JDN":2450758, 
	"Ending_JDN":2455651, 
	"Dynasty":"Union_of_Myanmar",
	"URL":"https://en.wikipedia.org/wiki/Than_Shwe"
},
{
	"Name":"သိန်းစိန် - Thein Sein ",
	"Beginning_JDN":2455651, 
	"Ending_JDN":2457477, 
	"Dynasty":"Republic_Myanmar",
	"URL":"https://en.wikipedia.org/wiki/Thein_Sein"
},
{
	"Name":"ထင်ကျော် - Htin Kyaw ",
	"Beginning_JDN":2457478, 
	"Ending_JDN":2459303, 
	"Dynasty":"Republic_Myanmar",
	"URL":"https://en.wikipedia.org/wiki/Htin_Kyaw"
}
]

);

