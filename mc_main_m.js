//Version: 201702121800
// File name: mc_main_m.js (display Myanmar Calendar)
// Required: mc.js (core Myanmar calendar calculation functions
//   to be included before this file is used)
// Optional:  mc_l.js (language catalog)
// Optional: mc_h.js (historical dates)
// Optional: mc_rulers.js (Rulers (kings) in Myanmar history)
//----------------------------------------------------------------------------

//Start of UI ################################################################
var dt=new Date();
//User Interface setting
var uis={
	Lang:undefined,//Language
	Type:0,//Gregorian or Julian
	y:dt.getFullYear(),m:(1+dt.getMonth()),d:dt.getDate(),//y,m,d to display
	cy:dt.getFullYear(),cm:(1+dt.getMonth()),cd:dt.getDate(),//current y,m,d
	BY:2,EY:1500, //beginning and end of the calendar,
	LT:1062,UT:1379,//lower and upper threshold for accurate years
};
var g_jd=w2j(uis.cy,uis.cm,uis.cd,uis.Type); var g_M=j2m(g_jd);
uis.y=uis.cy=g_M.my; uis.m=uis.cm=g_M.mm+12*g_M.mmt; uis.cd=g_M.md;
//-------------------------------------------------------------------------
//initialize the calendar
function initc(){
	var ce = document.getElementById("mcalg");
	//ce.className="DivMain";
	if (uis.Lang===undefined) {
		var L=ce.lang; var F=ce.style.fontFamily;
		if (F=="Zawgyi-One") L="Zawgyi";
		uis.Lang=SelectLang(L);//set a global variable in mc.js for translation
	}
  ce.innerHTML=UI(uis);
}
//----------------------------------------------------------------------------
//Prepare dropdown list for Myanmar months depending on Myanmar year
function mSelector(my,mm){
  var SY=1577917828/4320000; //solar year (365.2587565)
  var MO=1954168.050623; //beginning of 0 ME
  var ema=["1st Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
		   "Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe",
		   "Tabaung","Late Tagu","Late Kason"];
  var i=0; var str=""; var j1=Math.round(SY*my+MO)+1;
  var j2=Math.round(SY*(my+1)+MO);
  var M1=j2m(j1); var M2=j2m(j2); var si=M1.mm+12*M1.mmt;
  var ei=M2.mm+12*M2.mmt;
  if (si==0) si=4; if (mm==0 && M1.myt==0) mm=4;
  if (mm!=0 && mm<si) mm=si; if (mm>ei) mm=ei;
  for(i=si;i<=ei;i++) {
   if (i==4 && M1.myt!=0) {str+="<option value='0'  "+((mm==0)?"selected":"")+
	">"+ema[0]+" </option> "; }
   str+="<option value='"+i.toString()+"'  "+((i==mm)?"selected":"")+">"+
	((i==4 && M1.myt!=0)?"2nd ":"")+ema[i]+" </option> ";
  }
  return str;
}
//-------------------------------------------------------------------------
//Produce html string for user interface
//this function is mainly for table that contains controls
//output: (str: html string)
function UI(){
	var str=""; 
	//Start of div container for month
	str+="<div id='divMonth' class='DivContainerMonth'>";
	//------------------------------------------------------------------------
	//Start of table to accommodate controls
	str+="<table class='TableContainerCtrl'> <tbody><tr>";
		//Button for previous month
		str+="<td class='TdContainerBtnDec'>\
			<input type='button' id='decm' value='&lt;' onclick='emc(-1);'  \
			class='BtnDec' title='Previous Month'></td>";
		//Number input for year
		str+="<td  class='TdContainerYear'> \
			<input type='number' id='y' min='"+uis.BY+"' max='"+uis.EY+"' value='"
			+uis.y.toString()+"'onchange='DisplayUI(1)'  \
			class='InpYear' title='Year'> </td> ";
		//Select input for month
		str+="<td  class='TdContainerMonth'>\
			<select  id='m'  onchange='DisplayUI(2)'  \
			class='InpMonth' title='Month'>";
				str+=mSelector(uis.y,uis.m);
			str+="</select> </td>";
		//Button for next month
		str+="<td class='TdContainerBtnInc'>\
			<input type='button' id='incm' value='&gt;' onclick='emc(1);'  \
			class='BtnInc' title='Next Month'></td>";
		//empty space
		str+="<td class='TdContainerSpace'>&nbsp;</td>";
		//Select input for calendar type
		str+="<td class='TdContainerType'>\
			<select  id='calType' class='InpType'  \
			onchange='DisplayUI(3)' title='Calendar Type'>\
				<option value='0'  "+((uis.Type==0)?"selected":"")+
					">British </option> \
				<option value='1'  "+((uis.Type==1)?"selected":"")+
					">Gregorian </option> \
				<option value='2'  "+((uis.Type==2)?"selected":"")+
					">Julian </option> \
			</select> </td>";
		//Select input for language
		str+="<td class='TdContainerLanguage'>\
			<select  id='calLang' class='InpLanguage'  \
			onchange='DisplayUI(4)' title='Language'>\
				<option value='Myanmar'  "+((uis.Lang=="Myanmar")?"selected":"")+
					">Myanmar </option> \
				<option value='English'  "+((uis.Lang=="English")?"selected":"")+
					">English </option> \
				<option value='Mon'  "+((uis.Lang=="Mon")?"selected":"")+
					">Mon </option> \
				<option value='Zawgyi'  "+((uis.Lang=="Zawgyi")?"selected":"")+
					">Zawgyi </option>\
			</select> </td>";
	str+="</tr></tbody></table>";
	//End of table for the controls
	//------------------------------------------------------------------------
	//Division to accommodate calendar month
	str+="<div id='oc'>"+UIContent()+"</div>";

	str+="</div>";
	//end of div container month
	//------------------------------------------------------------------------
	//Division to accommodate calendar day
	str+="<div id='divDay' class='DivContainerDay' style='display:none;'></div>";
	//------------------------------------------------------------------------
	return str;
}
//-----------------------------------------------------------------------------
//change month
//input: (v: value [1: increase, -1: decrease])
function emc(v) {
	var SY=1577917828/4320000; //solar year (365.2587565)
	var MO=1954168.050623; //beginning of 0 ME
	var me = document.getElementById("m");
	var mn=Number(me.value);
	var ye = document.getElementById("y");
	var yn=Number(ye.value);
	var j1=Math.round(SY*yn+MO)+1;
	var j2=Math.round(SY*(yn+1)+MO);
  var M1=j2m(j1); var M2=j2m(j2);
	var si=M1.mm+12*M1.mmt; var ei=M2.mm+12*M2.mmt;
	if(mn==0) mn=(v==1)?4:3;
	else if (mn==4 && M1.myt!=0 && v!=1) mn=0;
	else if (mn==3 && M1.myt!=0 && v==1) mn=0;
	else {
		mn+=Number(v);
		if (mn<si) { mn+=12; yn--; }
		else if (mn>ei) { mn=mn%12; yn++; }
	}
	uis.y=yn;
	uis.m=mn;
  me.innerHTML=mSelector(uis.y,uis.m);
	ye.value=yn;
	var oce = document.getElementById("oc");
	oce.innerHTML=UIContent(uis);
}
//-------------------------------------------------------------------------
//display UI
//input: (cev: calendar element to update [1:year, 2:month,
//4:language, 3: type])
function DisplayUI(cev) {
	switch(cev) {
		case 1:
			var ye = document.getElementById("y");
			var yn=Number(ye.value);
			if(yn<uis.BY) {ye.value=yn=uis.BY;}
			else if(yn>uis.EY) {ye.value=yn=uis.EY;}
			else {ye.value=yn;}
			uis.y=yn;
			var me = document.getElementById("m");
			uis.m=Number(me.value);
			me.innerHTML=mSelector(uis.y,uis.m);
			break;//year
		case 2:
			var me = document.getElementById("m");
			uis.m=Number(me.value);
			break;//month
		case 3:
			var te = document.getElementById("calType");
			uis.Type=te.value;
			break;//type
		case 4:
			var le = document.getElementById("calLang");
			uis.Lang=le.value;
			SelectLang(uis.Lang);
			break;//Language
			//SelectLang: set a global variable in mc.js for translation
	}
	var oce = document.getElementById("oc");
	oce.innerHTML=UIContent(uis);
}
//-------------------------------------------------------------------------
//Produce html string for calendar content
//output: (str: html string)
function UIContent() {
	var ema=["January","February","March","April","May","June","July",
	"August","September","October","November","December"];
	var r,eml,i,js,je,MS,ME,ES,EE,A,E,M,tstr;
	//------------------------------------------------------------------------
	//Find julian day number of start of the month according to calendar type
	var mmt=Math.floor(uis.m/13);
	var mm=(uis.m+mmt)%13;
	js=m2j(uis.y,mm,mmt,0,1);
	MS=j2m(js); je=js+MS.mml-1; ME=j2m(je);
	ES=j2w(js,uis.Type); EE=j2w(je,uis.Type);
	//------------------------------------------------------------------------
	//Start of the table for calendar days
	var str=" <table class='TableMC'> ";
	str+=tHead(MS,ME,ES,EE) ;	//header
	str+=tFoot();//footer
	str+="<tbody>";

	str+=tWeek(); //Weekday header row
	//Calendar days are populated starting from second row
	r=(MS.wd+6)%7; eml=Math.ceil((MS.mml+r)/7)*7;

	for(i=0;i<eml;i++){
		if ((i%7)==0) str+="<tr>";
		//start of checking valid day to display
		if ((i>=r)&&(js<=je)) {
			
	   		
			E=j2w(js,uis.Type);//English date according to calendar type
			M=j2m(js); A=astro(M.mm,M.mml,M.md,M.wd);
			tstr="PriDay";//Myanmar date and astrological days
			//Check holidays, weekend, inaccurate days and change style
			var hde=ehol(E.y,E.m,E.d);
			var hdm=mhol(M.my,M.mm,M.md,M.mp);
			var hdt=thingyan(js,M.my,M.mmt);
			var hdo=ohol(js);
			if ((M.my==uis.cy) && (uis.cm==(M.mm+12*M.mmt)) && (M.md==uis.cd)) tstr="PriDayToday";
			else if ((hde.h) || (hdm.h) || (hdo.h) || (hdt.h)) tstr="PriDayHoliday";
			else if ((M.wd==0) || (M.wd==1)) tstr="PriDayWeekend";
			else if (uis.y<uis.LT || uis.y>uis.UT) tstr="PriDayInaccu";
			str+="<td class='TdMC' onclick='ShowDay("+js+")'>";
			str+="<p class='PTdMC'>";
			str+="<span class='"+tstr+"'>"+E.d+" </span>";//display English day
			str+=T(ema[E.m-1]);
			str+="</p>";
			//Displaying Myanmar date
			if (M.my>=2) { 	str+=mMDStr(M,A,E,hde,hdm,hdt,hdo,js);	}
			str+="</td>";

			js++;//Julian day number for next day			
		}//end of checking valid day to display
		else { 
			str+="<td class='TdMC'><p class='PTdMC'>";
			str+="&nbsp;"; 
			str+="</p></td>";
		} //if no day to display
		if ((i%7)==6) str+="</tr>";//next row
	}//end of for loop
	str+="</tbody></table>	";
	//------------------------------------------------------------------------
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for calendar day table header
//input: (MS: Myanmar date start ,
// ME: Myanmar date end, ES: English date start, EE: En date end)
//output: (str: html string)
function tHead(MS,ME,ES,EE) {
	var ema=["January","February","March","April","May","June","July",
	"August","September","October","November","December"];
	var mma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
	"Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung"];
	var str="<thead> <tr> <th colspan=7 class='ThMC'>\
	<p class='PThMC'>";//table header
		str+=n2s(ES.y);
		if (ES.y!=EE.y) str+="-"+n2s(EE.y);
		str+=" "+T(ema[ES.m-1]);
		if (ES.m!=EE.m) str+="-"+T(ema[EE.m-1]);
		str+=T(',')+" ";
		str+=T('Sasana Year')+" "+n2s(MS.my+1182); //Sasana year
		if (MS.my!=ME.my) str+="-"+n2s(ME.my+1182);
		str+=" "+T('Ku')+T(',');
		if (ME.my>=2) { //if Myanmar year after 0 ME
			str+=" "+T("Myanmar Year")+" ";
			if (MS.my>=2) {str+=n2s(MS.my);if(MS.my!=ME.my) str+="-";}
			if (MS.my!=ME.my) str+=n2s(ME.my);
			str+=" "+T('Ku')+T(',')+" ";
			if (MS.my>=2) {
				if(MS.myt && MS.mm==4) str+=T('Second');
				//if(MS.mmt) str+=T('Late');
				str+=T(mma[MS.mm]);
				if (MS.mm!=ME.mm) str+="-";
			}
			if (MS.mm!=ME.mm) {
				if(ME.myt && ME.mm==4) str+=T('Second');
				//if(ME.mmt) str+=T('Late');
				str+=T(mma[ME.mm]);
			}
			str+=T('.');
		}
	str+="</p></th></tr></thead>";
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for calendar day table footer
//output: (str: html string)
function tFoot() {
	//table footer consists of various links
	var str="<tfoot> <tr> <td colspan=7 class='TdFootMC'> \
	<p class='PTdMC'>";
		str+="<a class='AnchorFootMC' href='./'>\
		E&gt;M Calendar</a> ";
		str+="| <a class='AnchorFootMC' href=\
		'http://cool-emerald.blogspot.sg"+
		"/2013/06/algorithm-program-and-calculation-of.html'>\
		Learn</a> ";
		str+="<a  class='AnchorFootMC'  style='float: right;' href=\
		'./more.htm'>About</a>";
	str+="</p></td></tr></tfoot>";
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for calendar day table weekday header row
//output: (str: html string)
function tWeek() {
	//first row of table body is weekdays starting from Sunday to Saturday
	return "<tr><td class='TdMC'><p class='PTdWeekendMC'>"+T("Sunday")+"</p></td> \
	<td class='TdMC'><p class='PTdWeekdayMC'>"+T("Monday")+"</p></td> \
	<td class='TdMC'><p class='PTdWeekdayMC'>"+T("Tuesday")+"</p></td> \
	<td class='TdMC'><p class='PTdWeekdayMC'>"+T("Wednesday")+"</p></td>\
	<td class='TdMC'><p class='PTdWeekdayMC'>"+T("Thursday")+"</p></td> \
	<td class='TdMC'><p class='PTdWeekdayMC'>"+T("Friday")+"</p></td> \
	<td class='TdMC'><p class='PTdWeekendMC'>"+T("Saturday")+"</p></td></tr>";
}
//-------------------------------------------------------------------------
//Produce html string for Myanmar day display
//input: (M: Myanmar date object, A: Astrological object)
//E: English date object,
// hde,hdm,hdt,hdo: holiday objects,jd: Julian day number)
//output: (str: html string)
function mMDStr(M,A,E,hde,hdm,hdt,hdo,jd) {
	var mma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
	"Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung"];
	var msa=["waxing","full moon","waning","new moon"];
	var str="",tstr="";

	//month name
	str+="<p class='PTdMC'>";
	if(M.mmt) str+=T('Late');
	if(M.myt && M.mm==4) str+=T('Second');
	str+=T(mma[M.mm]);
	str+="</p>";

	//moon phase and day
	tstr="SecDay"; if (A.sabbath) tstr="SecDayH";
	str+="<p class='"+tstr+"'>";
		str+=T(msa[M.mp]);
		if((M.mp%2)==0) {str+=" "+n2s(M.fd);}
	str+="</p>";

	//sabbath and moon
	if (A.sabbath) {
		str+=" <p class='MCSabbath'> "+T("Sabbath");
		if(M.mp==1) str+=" <canvas class='FM'></canvas> ";
		else if(M.mp==3) str+=" <canvas class='NM'></canvas> ";
		str+="</p>";
	}
	else if (A.sabbatheve) {str+=" <p class='MCSabbath'> "+T("Sabbath Eve")+"</p>";}

	//holiday
	str+=Holiday2String(hde,"MCPubHol")
		+Holiday2String(hdm,"MCPubHol")
		+Holiday2String(hdt,"MCPubHol")
		+Holiday2String(hdo,"MCPubHol");
	str+=Holiday2String(ecd(jd),"MCHol");
	str+=Holiday2String(mcd(M.my,M.mm,M.md,M.mp),"MCHol");

	//astroligical days
	if(A.yatyaza) {	str+="<p class='MCYatyaza'>"+T('Yatyaza')+"</p>";}
	if(A.pyathada==1) {	str+="<p class='MCYatyaza'>"+T('Pyathada')+"</p>";}
	else if(A.pyathada==2) {str+="<p class='MCYatyaza'>"+T('Afternoon Pyathada')+"</p>";	}
	str+=tAstro(A,"MCAstro");

	//historical dates
	try {
		var hs=hSearch(jd); //search for historical date defined in mc_h.js
		if (hs.f) {
			str+="<br/><p class='HLabel'>History</p>";
		}
	}	
	catch(err) {}

	return str;
}
//-------------------------------------------------------------------------
//Produce html string for calendar astrological days
//input: (A)
//output: (str: html string)
function tAstro(A,c) {
	var str="";
	if(A.amyeittasote) str+="<p class='"+c+"'>"+T('Amyeittasote')+"</p>";
	if(A.warameittugyi) str+="<p class='"+c+"'>"+T('Warameittugyi')+"</p>";
	if(A.warameittunge) str+="<p class='"+c+"'>"+T('Warameittunge')+"</p>";
	if(A.thamanyo) str+="<p class='"+c+"'>"+T('Thamanyo')+"</p>";
	if(A.thamaphyu) str+="<p class='"+c+"'>"+T('Thamaphyu')+"</p>";
	if(A.yatpote) str+="<p class='"+c+"'>"+T('Yatpote')+"</p>";
	if(A.nagapor) str+="<p class='"+c+"'>"+T('Nagapor')+"</p>";
	if(A.yatyotema) str+="<p class='"+c+"'>"+T('Yatyotema')+"</p>";
	if(A.mahayatkyan) str+="<p class='"+c+"'>"+T('Mahayatkyan')+"</p>";
	if(A.shanyat) str+="<p class='"+c+"'>"+T('Shanyat')+"</p>";
	return str;
}
//-------------------------------------------------------------------------
//Show day and hide month
//input: js (Julian day) 
//output: void
function ShowDay(js) {
	var E,M,str="",tstr="";

	E=j2w(js,uis.Type);//English date according to calendar type
	M=j2m(js); //Myanmar date
	A=astro(M.mm,M.mml,M.md,M.wd);//Astrological days

	tstr="PriDay";
	//Check holidays, weekend, inaccurate days and change style
	var hde=ehol(E.y,E.m,E.d);
	var hdm=mhol(M.my,M.mm,M.md,M.mp);
	var hdt=thingyan(js,M.my,M.mmt);
	var hdo=ohol(js);

	var ema=["January","February","March","April","May","June","July",
	"August","September","October","November","December"];

	//display English day
	str+="<div class='DayHead'  onclick='ShowMonth();'>"+E.y+" "+ema[E.m]+" "+E.d+"</div>";

	//displaying Myanmar date
	if (M.my>=2) {
		var mma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
			"Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung"];
		var msa=["waxing","full moon","waning","new moon"];
		str+="<p class='DayFontSize'>"+T('Sasana Year')+" "+n2s(M.my+1182)+"</p>"; //Sasana year
		str+="<p class='DayFontSize'>"+T('Myanmar Year')+" "+n2s(M.my)+"</p>"; //Myanmar year

		//month name, moon phase and day
		tstr="SecDay"; if (A.sabbath) tstr="SecDayH";
		str+="<p class='"+tstr+" DayFontSize'>";
			if(M.mmt) str+=T('Late');
			if(M.myt && M.mm==4) str+=T('Second');
			str+=T(mma[M.mm]);
			str+=" "+T(msa[M.mp]);
			if((M.mp%2)==0) {str+=" "+n2s(M.fd);}
		str+="</p>"

		//weekday
		var wda=['Saturday','Sunday','Monday','Tuesday','Wednesday',
			 'Thursday','Friday'];
		str+="<p>"+T(wda[M.wd])+T('Nay')+"</p>"; 

		//sabbath and moon
		if (A.sabbath) {
			str+="<p class='MCSabbath DayFontSize'>"+T("Sabbath");
			if(M.mp==1) str+=" <canvas class='FM'></canvas> ";
			else if(M.mp==3) str+=" <canvas class='NM'></canvas> ";
			str+="</p>";
		}
		else if (A.sabbatheve) {
			str+="<p class='MCSabbath DayFontSize'>"+T("Sabbath Eve")+"</p>";
		}
				
		//holiday  DayFontSize
		str+=Holiday2String(hde,"MCPubHol DayFontSize")
			+Holiday2String(hdm,"MCPubHol DayFontSize")
			+Holiday2String(hdt,"MCPubHol DayFontSize")
			+Holiday2String(hdo,"MCPubHol DayFontSize");
		str+=Holiday2String(ecd(js),"MCHol DayFontSize");
		str+=Holiday2String(mcd(M.my,M.mm,M.md,M.mp),"MCHol DayFontSize");

		//astroligical days
		if(A.yatyaza) {	str+="<p class='MCYatyaza DayFontSize'>"+T('Yatyaza')+"</p>";}
		if(A.pyathada==1) {	str+="<p class='MCYatyaza DayFontSize'>"+T('Pyathada')+"</p>";}
		else if(A.pyathada==2) {str+="<p class='MCYatyaza DayFontSize'>"+T('Afternoon Pyathada')+"</p>";	}
		str+=tAstro(A,"MCAstro DayFontSize");

		//Thingyan
		if (hdt.h) {
		str+="<p><a class='AnchorFootMC' href='https://yan9a.github.io/mcal/Thingyan.htm'>\
			နှစ်သစ်ကူးချိန် အတိအကျ အတွက် သင်္ကြန်တွက်စက် ကိုကြည့်ပါ &gt;&gt;</a></p>";
		}
	}

	//historical dates
	try {
		var hs=hSearch(js); //search for historical date defined in mc_h.js
		if (hs.f) {
			str+="<p> A historical day: <a class='AnchorFootMC' href='./Chronicle/"+hs.link+"'>"+hs.dt+"</a> ";
			if(hs.my!=M.my || hs.mm!=M.mm || hs.mp!=M.mp || hs.fd!=M.fd || hs.wd!=M.wd)	{ str+= "It is inconsistent!";}
			str+="</p>";
		}
	}	
	catch(err) {}

	var pa=["ဘင်္ဂ","အထွန်း","ရာဇ","အဓိပတိ","မရဏ","သိုက်","ပုတိ"];
	var r= (M.my-M.wd) % 7;
	str+="<p class='DayFoot'>"+pa[r]+"ဖွား၊  JDN: "+js+"</p>"; //julian day number
	//rulers
	try { 
		mc_rClear();
		mc_rSearch(js); 
		var u=mc_rLength();
		if(u){							
			var dt=new Date(); 
			var j=w2j(dt.getFullYear(),(1+dt.getMonth()),dt.getDate());
			var i=0; var r; var dyn;
			if(js<2432555) str+="<p class='DayFoot'>Ruler(s):</p>";
			else str+="<p class='DayFoot'>President:</p> ";
			str+="<ul class='DayFoot'>";
			for(i=0;i<u;i++) {
				r=g_RulerList[i];
				str+="<li><a class='AnchorFootMC DayFoot' href='"+r.URL+"'>"+r.Name+"</a>";
				str+="<br/>"+mc_j2d(r.Beginning_JDN)+" - ";
				str+=(j>r.Ending_JDN)?mc_j2d(r.Ending_JDN):" present";
				dyn=g_dyn[r.Dynasty];
				str+="<br/>"+"<a class='AnchorFootMC DayFoot' href='"+dyn.URL+"'>"+dyn.Description+"</a>";; 	
				str+="</li>";
			}
			str+="</ul>";
		}
	}	
	catch(err) {} 

	//accuracy
	if (uis.y<uis.LT || uis.y>uis.UT) str+="<p class='DayFoot'>Important note: The accuracy of these dates is in question! \
			<a class='AnchorFootMC' href='./more.htm#Accuracy'>\
			Read more details &gt;&gt;</a></p>";

	//Back button 
	str+="<br/><input type='button' id='back2main' value='Back' onclick='ShowMonth();'  \
			class='BtnBack' title='Back to main'>";

	var ddiv=document.getElementById("divDay");
	ddiv.innerHTML=str;
	ddiv.style.display = "block";
	var mdiv=document.getElementById("divMonth");
	mdiv.style.display="none";
}
//-------------------------------------------------------------------------
//Show month and hide day
function ShowMonth() {
	var mdiv=document.getElementById("divMonth");
	mdiv.style.display="block";
	var ddiv=document.getElementById("divDay");
	ddiv.style.display = "none";
}
//-------------------------------------------------------------------------
// jdn to date string
function mc_j2d(jd) {
	var M=j2m(jd);
	var hmma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
		 "Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung"];
	var hmpa=["Waxing","Full moon","Waning","New moon"];
	var hwda=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']; 
	var str="ME "+M.my.toString()+" "; if(M.mmt) str+="Late ";
	if(M.myt && M.mm==4) str+="Second "; str+=hmma[M.mm]+" "+hmpa[M.mp];
	if((M.mp%2)==0) str+=" "+M.fd.toString(); str+=" "+hwda[M.wd];
	return str;
}
//-----------------------------------------------------------------------------
//End of UI ##################################################################