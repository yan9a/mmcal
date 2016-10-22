//Version: 201604132300
// File name: mc_main_e.js (display English-Myanmar Calendar)
// Required: mc.js (core Myanmar calendar calculation functions to be
//	included before this file is used)
// Optional:  mc_l.js (language catalog)
// Optional: mc_h.js (historical dates)
// Optional: mc_rulers.js (Rulers (kings) in Myanmar history)
//----------------------------------------------------------------------------

//Start of UI ################################################################
var ema=["January","February","March","April","May","June","July",
	"August","September","October","November","December"];
var mma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
	"Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung"];
var msa=["waxing","full moon","waning","new moon"];
var dt=new Date(); 
//User Interface setting
var uis={ 
	Size:undefined,Lang:undefined,Astro:0,Type:0,//Size,Language,Astrological
	y:dt.getFullYear(),m:(1+dt.getMonth()),//year and month to display,
	cy:dt.getFullYear(),cm:(1+dt.getMonth()),cd:dt.getDate(),//current y,m,d
	BY:640,EY:2140,LT:1700,UT:2017, //beginning and end of the calendar,
	//lower and upper threshold for accurate years
	Ref:0,hmo:0,//reference, hide mobile version option
	eFont:"Arial",mFont:"\"Myanmar Text\",Padauk,\"Myanmar MN\",\"Droid Sans\",Myanmar3,Tharlon,Arial"
};
//-------------------------------------------------------------------------
//Produce html string for user interface
//input: (u: UI setting)
//output: (str: html string)
function UI(u){
	var ema=["Jan","Feb","Mar","Apr","May","Jun"
			 ,"Jul","Aug","Sep","Oct","Nov","Dec"];
	//------------------------------------------------------------------------
	//Start of table to accommodate controls
	var i=0; var str=""; str+="<table class='HTable'> <tbody><tr>";
		//Button for previous month
		str+="<td class='TdHTable TdH1"+u.Size+"'>\
			<input type='button' id='decm' value='&lt;' onclick='emc(-1);'  \
			class='CtrlHTable"+u.Size+" CtrlH1"+u.Size+"' \
			title='Previous Month'></td>";
		//Number input for year
		str+="<td  class='TdHTable TdH2"+u.Size+"'> \
			<input type='number' id='y' min='"+u.BY+"' max='"+u.EY+"' value='"
			+u.y.toString()+"'onchange='DisplayUI(1)'  \
			class='CtrlHTable"+u.Size+" CtrlH2"+u.Size+"' title='Year'> </td> ";
		//Select input for month
		str+="<td  class='TdHTable TdH3"+u.Size+"'>\
			<select  id='m'  onchange='DisplayUI(2)'  \
			class='CtrlHTable"+u.Size+" CtrlH3"+u.Size+"' title='Month'>";
				for(i=1;i<=12;i++) { str+="<option value='"+i.toString()+"'  "
				+((i==u.m)?"selected":"")+">"+ema[i-1]+" </option> ";}
			str+="</select> </td>";
		//Button for next month
		str+="<td class='TdHTable TdH1"+u.Size+"'>\
			<input type='button' id='incm' value='&gt;' onclick='emc(1);'  \
			class='CtrlHTable"+u.Size+" CtrlH1"+u.Size+"' \
			title='Next Month'></td>";
	if (u.Size==1) {
		str+="<td class='TdHTable TdH5'>&nbsp;</td>";//empty space

		//Check box for Astro
		str+="<td class='TdHTable TdH61'>\
			<input type='checkbox' id='astro' onclick='DisplayUI(3)' \
			class='CtrlHTable1' title='Astrological Days' \
			"+(u.Astro?"checked":"")+"></td>";
		//Label for Astro
		str+="<td class='TdHTable TdH71'>\
			<span id='astro2' class='CtrlHTable1 CtrlH71' \
			title='Astrological days'>Astro</span></td>";
		
		//Check box for Mobile
		str+="<td class='TdHTable TdH61'>\
			<input type='checkbox' id='mobilec' onclick='chSize()' \
			class='CtrlHTable1' title='Mobile version' \
			"+(u.Size?"":"checked")+" style='display:"+(u.hmo?"block":"none")+
			";'></td>";
		//Label for Mobile
		str+="<td class='TdHTable TdH71'>\
			<span id='mobilec2' class='CtrlHTable1 CtrlH71' \
			title='Mobile version' style='display:"+(u.hmo?"inline":"none")+
			";'>Mobile</span></td>";
		
		//Select input for referred source
		str+="<td class='TdHTable TdH9'>\
			<select  id='calRef' class='CtrlHTable1 CtrlH9'  \
			onchange='DisplayUI(6)' title='Reference for historical dates.' \
			style='display:"+(u.y<u.LT?"block":"none")+";'>\
				<option value='0'  "+((u.Ref==0)?"selected":"")+
" title='Modified historical dates based on inscriptions, and historical evidence.'>Evidence </option> \
				<option value='1'  "+((u.Ref==1)?"selected":"")+
" title='Refered from books of  T. N. Toe and Dr. Than Tun.'>T. N. Toe </option> \
				<!--option value='2'  "+((u.Ref==2)?"selected":"")+
" title='Refered from J. C. Eade, Southeast Asian Ephemeris, 1989.'>J. C. Eade </option> \
				<option value='3'  "+((u.Ref==3)?"selected":"")+
					" title='Refered from A. M. B. Irwin'>\
					A. M. B. Irwin </option--> \
			</select> </td>";
		//Select input for calendar type
		str+="<td class='TdHTable TdH8'>\
			<select  id='calType' class='CtrlHTable"+u.Size+" CtrlH8'  \
			onchange='DisplayUI(5)' title='Calendar Type'>\
				<option value='0'  "+((u.Type==0)?"selected":"")+
					">British </option> \
				<option value='1'  "+((u.Type==1)?"selected":"")+
					">Gregorian </option> \
				<option value='2'  "+((u.Type==2)?"selected":"")+
					">Julian </option> \
			</select> </td>";
		//Select input for language
		str+="<td class='TdHTable TdH8'>\
			<select  id='calLang' class='CtrlHTable1 CtrlH8'  \
			onchange='DisplayUI(4)' title='Language'>\
				<option value='Myanmar'  "+((u.Lang=="Myanmar")?"selected":"")+
					">Myanmar </option> \
				<option value='English'  "+((u.Lang=="English")?"selected":"")+
					">English </option> \
				<option value='Mon'  "+((u.Lang=="Mon")?"selected":"")+
					">Mon </option> \
				<option value='Zawgyi'  "+((u.Lang=="Zawgyi")?"selected":"")+
					">Zawgyi </option>\
			</select> </td>";
	}
	str+="</tr></tbody></table>";
	//End of table for the controls
	//------------------------------------------------------------------------
	//Division to accommodate calendar day table
	str+="<div id='oc'>"+UIContent(u)+"</div>";
	if (u.Size==0) {
		str+="<table class='HTable'> <tbody><tr>";
		//Check box for Mobile
		str+="<td class='TdHTable TdH60'>\
			<input type='checkbox' id='mobilec' onclick='chSize()' \
			class='CtrlHTable0' title='Mobile version' "+
			(uis.Size?"":"checked")+" style='display:"+(u.hmo?"block":"none")+
			";'></td>";
		//Label for Mobile
		str+="<td class='TdHTable TdH70'>\
			<span id='mobilec2' class='CtrlHTable0 CtrlH70' \
			title='Mobile version' style='display:"+(u.hmo?"inline":"none")+
			";'>Mobile</span></td>";
		str+="</tr></tbody></table>";
	}
	return str;
}
//-------------------------------------------------------------------------
//initialize the calendar
function initc(hmo){ uis.hmo=hmo||0; //parameter to hide mobile option
	var ce = document.getElementById("mcalg");
	if (uis.Size===undefined) {
		var dw=ce.offsetWidth;
		if (dw<693)  uis.Size=0;
		else uis.Size=1;
	}	
	ce.style.width=uis.Size?"693px":"196px"; ce.style.marginLeft="auto";
	ce.style.marginRight="auto";
	if (uis.Lang===undefined) {
		var L=ce.lang; var F=ce.style.fontFamily;
		if (F=="Zawgyi-One") L="Zawgyi";
		uis.Lang=SelectLang(L);
	}
    ce.innerHTML=UI(uis);
}
//-----------------------------------------------------------------------------
//change size
function chSize() { var se = document.getElementById("mobilec");
		uis.Size=se.checked?0:1; initc(uis.hmo); }
//-----------------------------------------------------------------------------
//change month
//input: (v: value [1: increase, -1: decrease])
function emc(v) {
	var me = document.getElementById("m"); var mn=Number(me.value); 
	var ye = document.getElementById("y"); var yn=Number(ye.value);
	mn+=Number(v); if (mn<=0) { mn+=12; yn--; }
	else if (mn>12) { mn-=12; yn++; }
	uis.y=yn; uis.m=mn;
	mn--; me.selectedIndex=mn; ye.value=yn; DisplayUI(0);
}
//-------------------------------------------------------------------------
//display UI
//input: (cev: calendar element to update [1:year, 2:month, 3: astro,
//4:language, 5: type])
function DisplayUI(cev) {
	switch(cev) {
		case 1: var ye = document.getElementById("y");
			var yn=Number(ye.value);
			if(yn<uis.BY) {ye.value=yn=uis.BY;}
			else if(yn>uis.EY) {ye.value=yn=uis.EY;}
			else {ye.value=yn;}
			uis.y=yn; 
			var te = document.getElementById("calRef");
			if (yn<uis.LT) { te.style.display="block";}
			else { te.style.display="none";}
			break;//year
		case 2: var me = document.getElementById("m");
			uis.m=Number(me.value); break;//month
		case 3: var ae = document.getElementById("astro");
			uis.Astro=ae.checked?1:0; break;//astro
		case 4: var le = document.getElementById("calLang");
			uis.Lang=le.value; SelectLang(uis.Lang); break;//Language
		case 5: var te = document.getElementById("calType");
			uis.Type=te.value; break;//type
		case 6: var te = document.getElementById("calRef");
			uis.Ref=te.value; break;//type 
	}
	var oce = document.getElementById("oc"); oce.innerHTML=UIContent(uis);
}
//-------------------------------------------------------------------------
//Produce html string for calendar content
//input: (u: UI setting)
//output: (str: html string)
function UIContent(u) {
	var cFont=u.mFont; var fn={n:0,s:""};
	var r,i,js,je,eml,MS,ME,A,E,M,tstr;
	if (u.Lang=="Zawgyi") cFont="Zawgyi-One"; //if Zawgyi font is selected
	try { mc_rClear(); }	catch(err) {} //clear Myanmar rulers list
	//------------------------------------------------------------------------
	js=w2j(u.y,u.m,1,u.Type)//Find julian day number of start of
	//the month according to calendar type
	eml=emLen(u.y,u.m,u.Type);//get the length of the month
	je=js+eml-1;//Julian day number of end of the month
	MS=j2m(js,u.Ref); ME=j2m(je,u.Ref); 
	//------------------------------------------------------------------------
	//Start of the table for calendar days
	var str=" <table class='MCTable'> ";
	str+=tHead(cFont,u,MS,ME) ;	//header
	str+=tFoot(cFont,u);//footer
	str+="<tbody>"; str+=tWeek(cFont,u); //Weekday header row
	//Calendar days are populated starting from second row
	r=(MS.wd+6)%7; eml=Math.ceil((eml+r)/7)*7;
	
	for(i=0;i<eml;i++){
		if ((i%7)==0) str+="<tr>";
		str+="<td class='MCTd"+u.Size+"'>\
	   <p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>";
		
		//start of checking valid day to display
		if ((i>=r)&&(js<=je)) { 
			E=j2w(js,u.Type);//English date according to calendar type
			
			//Myanmar date and astrological days 
			M=j2m(js,u.Ref); A=astro(M.mm,M.mml,M.md,M.wd);
			tstr="MCEd"+u.Size;
			
			//Check holidays, weekend, inaccurate days and change style 
			var hde=ehol(E.y,E.m,E.d); var hdm=mhol(M.my,M.mm,M.md,M.mp);
			var hdt=thingyan(js,M.my,M.mmt); var hdo=ohol(js); 
			if ((E.y==u.cy) && (E.m==u.cm) && (E.d==u.cd))
				tstr="MCEdToday"+u.Size;
			else if ((hde.h) || (hdm.h) || (hdo.h) || (hdt.h))
				tstr="MCEdHol"+u.Size;
			else if ((M.wd==0) || (M.wd==1)) tstr="MCEdWkEnd"+u.Size;
			else if ((u.y<u.LT || u.y>u.UT) && (u.Size==1))
				tstr="MCEdInaccu"+u.Size;
			
			str+="<a href='http://mc1500.com/wiki/doku.php?id=me_"+M.my;
			str+="' class='"+tstr+"' style='text-decoration: none;'>"+E.d+"</a>";//display English day
			
			//Start of displaying Myanmar date
			if (M.my>=2) {
				if (u.Size==1) {
					str+=mMDStr(M,A,E,u.Astro,hde,hdm,hdt,hdo,js);
					//for median calendar size					
					str+=tFNote(fn,js,M,hdt,u.Ref);// modified fn (foot note)
					try { mc_rSearch(js); }	catch(err) {} //Check rulers list
				}//end of if median calendar size
				else str+=sMDStr(M,A.sabbath,MS.mm,u.eFont);
				//if small calendar size
			}//end of if (M.my>=2)
			//End of displaying Myanmar date
			
			js++;//Julian day number for next day
		}//end of checking valid day to display
		else { str+="&nbsp;"; } //if no day to display
		str+="</p></td>";
		if ((i%7)==6) str+="</tr>";//next row
	}//end of for loop
	
	str+="</tbody></table>	";
	//Start of the table for calendar days
	//------------------------------------------------------------------------
	//Foot note
	if (u.Size==1) {
		if (u.y<u.LT || u.y>u.UT) str+="<p class='MCFootIM' \
			>Important note: The accuracy of these dates is in question! <a \
			href='http://mc1500.com/wiki/doku.php?id=accuracy' class='MCThA11' \
			>Read more details &gt;&gt;</a></p>";
		if (fn.n>0) str+="<p class='MCFoot'>"+fn.s+"</p>";
		try { if(mc_rLength()) 
			str+="<p class='MCFoot'  onclick='toggleRP();' \
			title='Click to toggle displaying of the ruler(s)!' \
			style='cursor:pointer;'>Ruler(s) &gt;&gt;</p> \
			<p class='MCFoot' id='MC_RULER_P' style='display: "
			+(E.y<=1900?"block":"none")+";'>"+mc_rDescription()+"</p>";
		} catch(err) {}		
	}
	//------------------------------------------------------------------------
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for foot note
//glabal variable: ema, mma
//input: (fn: foot note object, jd: Julian day number,
// my: Myanmar date object, hdt: Thingyan holiday object, rf: Reference)
//output: (str: html string)
function tFNote(fn,jd,M,hdt,rf) {
	var SY=1577917828/4320000; //solar year (365.2587565)
	var MO=1954168.050623; //beginning of 0 ME
	var str=""; var my=M.my+M.mmt;
	var rfa=["Cool Emerald","T. N. Toe","J. C. Eade","A. M. B. Irwin"];
	//foot note indicator
	if (hdt.h && (hdt.hs[0]=="Myanmar New Year Day")) {
		fn.n++; str+="<span class='MCFNNo'>["+fn.n.toString()+"]</span> ";
		fn.s+="<br/>["+fn.n.toString()+"] အတာတက်ချိန်\
			သို့မဟုတ် နှစ်သစ်ကူးချိန် အတိအကျမှာ  သင်္ကြန်အတက်နေ့ "+jd2mstr(SY*my+MO,rf)
			+" ဖြစ်သည်။ <a \
href='https://googledrive.com/host/0B7WW8_JrpDFXTHRHbUJkV0FBdFU/Thingyan.htm'\
			class='MCThA11'> သင်္ကြန်တွက်စက် &gt;&gt;</a>";
	}
	try {
	var hs=hSearch(jd); //search for historical date defined in mc_h.js
	if (hs.f) {
	fn.n++; str+="<span class='MCFNNo'>["+fn.n.toString()+"]</span> ";
	fn.s+="<br/>["+fn.n.toString()+"] "+
	m2str(hs.my,hs.myt,hs.mm,hs.mmt,hs.mp,hs.fd,hs.wd)+" "+hs.dt+
	" <a href='http://mc1500.com/wiki/doku.php?id=me_"+hs.my+"'  class='MCThA11'>more &gt; &gt; </a>";
	if(hs.my!=M.my || hs.mm!=M.mm || hs.mp!=M.mp || hs.fd!=M.fd || hs.wd!=M.wd)
		{ fn.s+= "<span class='MCFootIM'>An inconsistency by "
		+rfa[rf]+"!</span>";}
	}
	}	catch(err) {}
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for calendar day table header
//glabal variable: ema, mma
//input: (cFont: font name, u: UI setting , MS: Myanmar date at the start , 
// ME: Myanmar date at the end)
//output: (str: html string)
function tHead(cFont,u,MS,ME) {
	var str="<thead> <tr> <th colspan=7 class='MCTh"+u.Size+"'>\
	<p class='MCThP' style='font-family: "+cFont+";'>";//table header
		if (u.Size==1) { //English year and Sasana year is not for small size
			str+="<a  class='MCThA11' href='http://mc1500.com'>"
			+n2s(u.y)+" "+T(ema[u.m-1])+" "+T(",")+" " //english year and month
			+T('Sasana Year')+" "+n2s(MS.my+1182); //Sasana year
			if (MS.my!=ME.my) str+=" - "+n2s(ME.my+1182);
			str+=" "+T('Ku')+T(',')+" </a>";
		}
		if (ME.my>=2) { //if Myanmar year after 2 ME
			str+="<a  class='MCThA1"+u.Size+"' href='http://mc1500.com'>"+
				T("Myanmar Year")+" ";
			if (MS.my>=2) {
				str+=n2s(MS.my);
				if (MS.my!=ME.my) str+=" - ";
			}
			if (MS.my!=ME.my) str+=n2s(ME.my);
			str+=" "+T('Ku')+T(',')+" </a>";
			if (MS.my>=2) {
				str+="<a  class='MCThA2"+u.Size+"' href='http://mc1500.com'>";
				if(MS.myt && MS.mm==4) str+=T('Second');
				str+=T(mma[MS.mm])+" </a>";
				if (MS.mm!=ME.mm) str+=" - ";
			}
			if (MS.mm!=ME.mm) {
				str+="<a  class='MCThA3"+u.Size+"' href='http://mc1500.com'>";
				if(ME.myt && ME.mm==4) str+=T('Second');
				str+=T(mma[ME.mm])+" </a>";
			}
		}
	str+="</p></th></tr></thead>";
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for calendar day table footer
//input: (cFont: font name, u: UI setting)
//output: (str: html string)
function tFoot(cFont,u) {
	//table footer consists of various links
	var str="<tfoot> <tr> <td colspan=7 class='MCFTd"+u.Size+"'> \
	<p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>";
		if (u.Size==1) {
			str+="<a class='MCAnchor' href=\
				 'http://mc1500.com/m.htm'>M-&gt;E Calendar</a> ";
			str+="<a  class='MCAnchor'  style='float: right;' href=\
				 'http://mc1500.com/wiki/doku.php?id=start'>About</a>";
		}
		else {
			str+="<span>*</span>\
			<span style='font-family: "+cFont+";'>  = "+
				T("Sabbath")+" "+T(',')+"</span> ";
			str+="<span style='font-family: "+u.eFont+
				";'>&uarr;</span>\
			<span style='font-family: "+cFont+";'> = "+
				T(msa[0])+" "+T(',')+"</span>   ";
			str+="<span style='font-family: "+u.eFont+
				";'>&darr;</span>\
			<span style='font-family: "+cFont+";'> = "+
				T(msa[2])+"</span>";
		}
	str+="</p></td></tr></tfoot>";
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for calendar day table weekday header row
//input: (cFont: font name, u: UI setting)
//output: (str: html string)
function tWeek(cFont,u) {
	//first row of table body is weekdays starting from Sunday to Saturday
	return "<tr><td class='MCTd"+u.Size+"'>\
	<p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>\
		<span class='MCSpan1'>"+(u.Size?T("Sunday"):"Sun")+"</span></p></td> \
	<td class='MCTd"+u.Size+"'>\
	<p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>\
		<span class='MCSpan1'>"+(u.Size?T("Monday"):"Mon")+"</span></p></td> \
	<td class='MCTd"+u.Size+"'>\
	<p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>\
		<span class='MCSpan1'>"+(u.Size?T("Tuesday"):"Tue")+"</span></p></td> \
	<td class='MCTd"+u.Size+"'>\
	<p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>\
		<span class='MCSpan1'>"+(u.Size?T("Wednesday"):"Wed")+"</span></p></td>\
	<td class='MCTd"+u.Size+"'>\
	<p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>\
		<span class='MCSpan1'>"+(u.Size?T("Thursday"):"Thu")+"</span></p></td> \
	<td class='MCTd"+u.Size+"'>\
	<p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>\
		<span class='MCSpan1'>"+(u.Size?T("Friday"):"Fri")+"</span></p></td> \
	<td class='MCTd"+u.Size+"'>\
	<p class='MCTdP"+u.Size+"' style='font-family: "+cFont+";'>\
<span class='MCSpan1'>"+(u.Size?T("Saturday"):"Sat")+"</span></p></td></tr>";
}
//-------------------------------------------------------------------------
//Produce html string for Myanmar day display for small size
//input: (M: Myanmar date object, A_sabbath: if sabbath day,
// MS_mm: Myanmar month at start, u_eFont: Font name)
//output: (str: html string)
function sMDStr(M,A_sabbath,MS_mm,u_eFont) {
	var str="",tstr="";
	//sabbath indicator just beside English day
	if (A_sabbath) str+=" <span class='MCSabbath0'>*</span>";
	str+="<br/>";//new line
	
	//set style according to month
	if (M.mm==MS_mm)  tstr="MCMd2"; else tstr="MCMd3";
	
	//full moon or new moon or day number with moon phase indicator
	if(M.mp==1) str+="<canvas class='FM'></canvas>";
	else if(M.mp==3) str+="<canvas class='NM'></canvas>";
	else if(M.mp==0) str+="<span class='"+tstr+"'>"+n2s(M.fd)+"</span>"
		+"<span class='MCArr' style='font-family: "+u_eFont+";'>&uarr;</span>";
	else if(M.mp==2) str+="<span class='"+tstr+"'>"+n2s(M.fd)+"</span>"
		+"<span class='MCArr'style='font-family: "+u_eFont+";'>&darr;</span>";
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for Myanmar day display for median size
//input: (M: Myanmar date object, A: Astrological object,
//E: English date object, u_Astro: Flag to display astrological days,
// hde,hdm,hdt,hdo: holiday objects,jd: Julian day number)
//output: (str: html string)
function mMDStr(M,A,E,u_Astro,hde,hdm,hdt,hdo,jd) {
	var hls="http://mc1500.com/wiki/doku.php?id=%E1%80%A1%E1%80%81%E1%80%AB%E1%80%95%E1%80%B1%E1%80%B8%E1%80%9B%E1%80%80%E1%80%BA%E1%80%99%E1%80%BB%E1%80%AC%E1%80%B8";
	var str="",tstr="",hd;
	//sabbath and moon just beside English day
	if (A.sabbath) {
		str+=" <a href='"+hls+"' class='MCSabbath1'>"+T("Sabbath")+" </a>";
	}
	else if (A.sabbatheve) {
		str+=" <a href='"+hls+"' class='MCSabbath1'>"+T("Sabbath Eve")+" </a>";
	}
	if(M.mp==1) str+=" <canvas class='FM'></canvas> ";
	else if(M.mp==3) str+=" <canvas class='NM'></canvas> ";
	str+="<br/>"; //new line
	
	//month name 
	str+="<a href='http://mc1500.com/wiki/doku.php?id=me_"+M.my;
	str+="' class='MCMm'>"; 	if(M.mmt) str+=T('Late');
	if(M.myt && M.mm==4) str+=T('Second');
	str+=T(mma[M.mm])+"</a>";
	str+="<br/>";//new line
	
	//moon phase and day
	str+="<a href='http://mc1500.com/wiki/doku.php?id=me_"+M.my;
	str+="' class='MCMs'>"+T(msa[M.mp])+"</a> ";
	tstr="MCMd"; if (A.sabbath) tstr="MCMdSb";
	if((M.mp%2)==0) {
		str+="<a href='http://mc1500.com/wiki/doku.php?id=me_"+M.my;
		str+="' class='"+tstr+"'>"+n2s(M.fd)+"</a>";
	}
	str+="<br/>";//new line
	
	//holiday
	str+="<a href='http://mc1500.com/wiki/doku.php?id=me_"+M.my;
	str+="' class='MCHol'>"+Holiday2String(hde)+Holiday2String(hdm)+Holiday2String(hdt)+Holiday2String(hdo)+"</a> ";
	str+="<a href='http://mc1500.com/wiki/doku.php?id=me_"+M.my;
	str+="' class='MCNote'>"+Holiday2String(ecd(jd))+"</a> ";
	str+="<a href='http://mc1500.com/wiki/doku.php?id=me_"+M.my;
	str+="' class='MCNote'>"+Holiday2String(mcd(M.my,M.mm,M.md,M.mp))+"</a> ";	
	//astroligical days
	if(A.yatyaza) {
		str+="<a  href='"+hls+"' class='MCAstro'>"+T('Yatyaza')+" </a>";
	}
	if(A.pyathada==1) {
		str+="<a  href='"+hls+"' class='MCAstro'>"+T('Pyathada')+" </a>";
	}
	else if(A.pyathada==2) {
		str+="<a  href='"+hls+"' class='MCAstro'>"+T('Afternoon Pyathada')+" </a>";
	}
	if (u_Astro) {str+=tAstro(A); str+="<span class='MCJDN' \
	title='Julian Day Number'>"+jd.toString()+" </span>";}
	return str;
}
//-------------------------------------------------------------------------
//Produce html string for calendar astrological days
//input: (A)
//output: (str: html string)
function tAstro(A) {
	var hls="http://mc1500.com/wiki/doku.php?id=%E1%80%A1%E1%80%81%E1%80%AB%E1%80%95%E1%80%B1%E1%80%B8%E1%80%9B%E1%80%80%E1%80%BA%E1%80%99%E1%80%BB%E1%80%AC%E1%80%B8";
	var str="";
	if(A.amyeittasote) str+="<a  href='"+hls+"' class='MCAstro'>"+
		T('Amyeittasote')+" </a>";
	if(A.warameittugyi) str+="<a  href='"+hls+"' class='MCAstro'>"
		+T('Warameittugyi')+" </a>";
	if(A.warameittunge) str+="<a  href='"+hls+"' class='MCAstro'>"+T('Warameittunge')+
		" </a>";
	if(A.thamanyo) str+="<a  href='"+hls+"' class='MCAstro'>"+T('Thamanyo')+" </a>";
	if(A.thamaphyu) str+="<a  href='"+hls+"' class='MCAstro'>"+T('Thamaphyu')+" </a>";
	if(A.yatpote) str+="<a  href='"+hls+"' class='MCAstro'>"+T('Yatpote')+" </a>";
	if(A.nagapor) str+="<a  href='"+hls+"' class='MCAstro'>"+T('Nagapor')+" </a>";
	if(A.yatyotema) str+="<a  href='"+hls+"' class='MCAstro'>"+T('Yatyotema')+" </a>";
	if(A.mahayatkyan) str+="<a  href='"+hls+"' class='MCAstro'>"+T('Mahayatkyan')+" </a>";
	if(A.shanyat) str+="<a  href='"+hls+"' class='MCAstro'>"+T('Shanyat')+" </a>";
	return str;
}
//-----------------------------------------------------------------------------
//Convert a number to Myanmar string
//input: (n=number) output: (s: string)
function n2ms(n) { var hNum=["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"];
var r=0,s="",g=""; if(n<0){g="-"; n=Math.abs(n);} n=Math.floor(n);
do{	r=n%10; n=Math.floor(n/10);	s=hNum[r]+s;	}while(n>0); return (g+s);}
//-------------------------------------------------------------------------
//Produce a Myanmar date string
//input: (my: year, myt: year type, mm: month [0-12], mmt: month type,
//mp: moon phase, d: day, wd: day of the week)
//output: (str: string)
function m2str(my,myt,mm,mmt,mp,d,wd){
	var hmma=["ပဝါဆို","တန်ခူး","ကဆုန်","နယုန်","ဝါဆို","ဝါခေါင်","တော်သလင်း",
		 "သီတင်းကျွတ်","တန်ဆောင်မုန်း","နတ်တော်","ပြာသို","တပို့တွဲ","တပေါင်း"];
	var hmpa=["လဆန်း","လပြည့်","လဆုတ်","လကွယ်"];
	var hwda=['စနေ','တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ']; 
	var str="မြန်မာနှစ် "+n2ms(my)+" ခု၊ "; if(mmt) str+="နှောင်း";
	if(myt && mm==4) str+="ဒု"; str+=hmma[mm]+" "+hmpa[mp];
	if((mp%2)==0) str+=" "+n2ms(d)+" ရက်"; str+="၊ "+hwda[wd]+"နေ့၊ ";
	return str;
}
//-----------------------------------------------------------------------------
function jd2mstr(jd,rf){
	M=j2m(jd,rf); var jf=jd+0.5-Math.round(jd); jf*=24; var h=Math.floor(jf);
	jf=(jf-h)*60; var n=Math.floor(jf); var s=Math.round((jf-n)*60);
	var str=""; if (h==0) {str="မွန်းတက် ၁၂ နာရီ၊";}
	else if (h<12) { str="မနက် "+n2ms(h)+"နာရီ၊";}
	else if (h>18) { str="ည "+n2ms(h-12)+"နာရီ၊";}
	else if (h>15) { str="ညနေ "+n2ms(h-12)+"နာရီ၊";}
	else if (h>12) { str="နေ့လယ် "+n2ms(h-12)+"နာရီ၊";}
	else {str="မွန်းလွဲ ၁၂ နာရီ၊";}
	str+=" "+n2ms(n)+" မိနစ်၊ "+n2ms(s)+" စက္ကန့် ";
	return (m2str(M.my,M.myt,M.mm,M.mmt,M.mp,M.fd,M.wd)+str);
}
//-----------------------------------------------------------------------------
//Toggle displaying Rulers info
function toggleRP(){
	var re = document.getElementById("MC_RULER_P");
	if (re.style.display=="block") re.style.display="none";
	else re.style.display="block";
}
//End of UI ##################################################################