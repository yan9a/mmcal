/////////////////////////////////////////////////////////////////////////////
// File: cemmdt.h
// Description: Modern Myanmar Calendrical Calculations
// WebSite: https://yan9a.github.io/mmcal/
// MIT License (https://opensource.org/licenses/MIT)
// Copyright (c) 2018 Yan Naing Aye
// Doc: http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
/////////////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------------
#ifndef CEMMDATETIME_H
#define CEMMDATETIME_H

#include"cedt.h"
#include<vector>
#include<string>
namespace ce {

class ceMmDateTime : public ceDateTime
{
private:
public:
	//-------------------------------------------------------------------------
	// default constructor
    ceMmDateTime();
	//-------------------------------------------------------------------------
	// Get Myanmar year constants depending on era
	// Thanks to Myo Zarny and Wunna Ko for earlier Myanmar years data
	// input: my -myanmar year
	// output:  
	//  EI = Myanmar calendar era id [1-3] : calculations methods/constants depends on era
	//  WO = watat offset to compensate
	//  NM = number of months to find excess days
	//  EW = exception in watat year
	static void GetMyConst(long my,double& EI,double& WO,double& NM,long& EW);
	//-------------------------------------------------------------------------
	// Search first dimension in a 2D array
	// input: (k=key,A=array,u=size)
	// output: (i=index)
	static long bSearch2(long k,long (*A)[2], long u);
	//-----------------------------------------------------------------------------
	// Search a 1D array
	// input: (k=key,A=array,u=size)
	// output: (i=index)
	static long bSearch1(long k,long* A, long u);
	//-------------------------------------------------------------------------
	// Check watat (intercalary month)
	// input: (my -myanmar year)
	// output:  ( 
	//  watat - intercalary month [1=watat, 0=common]
	//  fm - full moon day of 2nd Waso in jdn_mm (jdn+6.5 for MMT) 
	//       [only valid when watat=1])
	// dependency: GetMyConst(my)
	static void cal_watat(long my, long& watat, long& fm); //get data for respective era
	//-------------------------------------------------------------------------
	// Check Myanmar Year
	// input: (my -myanmar year)
	// output:  ( myt :year type [0=common, 1=little watat, 2=big watat],
	// tg1 : the 1st day of Tagu as jdn_mm (Julian Day Number for MMT)
	// fm : full moon day of [2nd] Waso as Julain Day Number
	// werr: watat error [0=ok, 1= error])
	// dependency: cal_watat(my)
	static void cal_my(long my, long& myt, long& tg1, long& fm, long& werr);
	//-------------------------------------------------------------------------
	// Julian day number to Myanmar date
	// input: (jdn -julian day number)
	// output:  (
	// myt =year type [0=common, 1=little watat, 2=big watat],
	// my = year,
	// mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//   Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, 
	//   Tabaung=12, Late Tagu=13, Late Kason=14 ],
	// md = day of the month [1 to 30])
	// dependency: cal_my(my)
	static void j2m(double jd, long& myt, long& my, long& mm, long& md);
	//-------------------------------------------------------------------------
	// Get moon phase from day of the month, month, and year type.
	// input: (
	//    md= day of the month [1-30], 
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//           Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//           Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    myt = year type [0=common, 1=little watat, 2=big watat])
	// output: (mp =moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon])
	static long cal_mp(long md,long mm,long myt);
	//-------------------------------------------------------------------------
	// Get length of month from month, and year type.
	// input: (
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//           Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//           Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    myt = year type [0=common, 1=little watat, 2=big watat])
	// output: (mml = length of the month [29 or 30 days])
	static long cal_mml(long mm,long myt);
	//-------------------------------------------------------------------------
	// Get the apparent length of the year from year type.
	// input: ( myt = year type [0=common, 1=little watat, 2=big watat])
	// output: ( myl= year length [354, 384, or 385 days])
	static long cal_myl(long myt);
	//-------------------------------------------------------------------------
	// Get fortnight day from month day
	// input: ( md= day of the month [1-30])
	// output: (mf= fortnight day [1 to 15])
	static long cal_mf(long md);
	//-------------------------------------------------------------------------
	// Get day of month from fortnight day, moon phase, and length of the month
	// input: ( 
	//   mf = fortnight day [1 to 15], 
	//   mp = moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon]
	//   mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//          Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//          Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//   myt = year type [0=common, 1=little watat, 2=big watat])
	// output: ( md = day of the month [1-30])
	static long cal_md(long mf,long mp,long mm,long myt);
	//-------------------------------------------------------------------------
	// Myanmar date to Julian day number
	// input:  (
	//  my = year,
	//  mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//    Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//    Tabaung=12 , Late Tagu=13, Late Kason=14 ],
	//  md = day of the month [1-30]
	// output: (jd -julian day number)
	// dependency: cal_my(my)
	static long m2j(long my,long mm,long md);
	//-------------------------------------------------------------------------
	// Myanmar year to Sasana year
	// input:  (
	//  my = year,
	//  mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//      Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//      Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//  md= day of the month [1-30], 
	//  k = optional argument [
	//		default 0 = do not take account kason full moon day for Sasana year
	//		1 = Sasana year starts on Kason full moon day
	//	]
	// output: (sy -Sasana year)
	// 
	// Description: Pull Request #9 by Chan Mrate Ko Ko
	// Proposal to mark Kason full moon day (Buddha's birthday) as the start of the Sasana year.
	// This suggestion references certain versions of the Shan and Rakhine Calendars.
	// It aligns with Shan culture, where the new year begins on the first day of Nadaw,
	// incorporating the lunar phase into the new year calculation.
	// Conversely, Burmese culture sets the new year independently of the moon phase.
	// This update offers flexibility in defining the Sasana year which is preferable to enforcing a single fixed approach.
	static long my2sy(long my, long mm, long md, long k = 0);
	//-------------------------------------------------------------------------
	// Checking Astrological days
	// More details @ http://cool-emerald.blogspot.sg/2013/12/myanmar-astrological-calendar-days.html
	//-------------------------------------------------------------------------
	// Get sabbath day and sabbath eve from day of the month, month, and year type.
	// input: (
	//    md= day of the month [1-30], 
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    myt = year type [0=common, 1=little watat, 2=big watat])
	// output: ( [1=sabbath, 2=sabbath eve, 0=else])
	static long cal_sabbath(long md, long mm, long myt);
	//-------------------------------------------------------------------------
	// Get yatyaza from month, and weekday
	// input: (
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=yatyaza, 0=else])
	static long cal_yatyaza(long mm, long wd);
	//-------------------------------------------------------------------------
	// Get pyathada from month, and weekday
	// input: (
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=pyathada, 2=afternoon pyathada, 0=else])
	static long cal_pyathada(long mm, long wd);
	//-------------------------------------------------------------------------
	// nagahle 
	// input: (
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//         Tabaung=12, Late Tagu=13, Late Kason=14 ])
	// output: ( [0=west, 1=north, 2=east, 3=south])
	static long cal_nagahle(long mm);
	//-------------------------------------------------------------------------
	// mahabote 
	// input: (
	//  my = year,
	//  wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [0=Binga, 1=Atun, 2=Yaza, 3=Adipati, 4= Marana, 5=Thike, 6=Puti])
	static long cal_mahabote(long my, long wd);
	//-------------------------------------------------------------------------
	// nakhat 
	// input: ( my = year )
	// output: ( [0=orc, 1=elf, 2=human] )
	static long cal_nakhat(long my);
	//-------------------------------------------------------------------------
	// thamanyo 
	// input: (
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=thamanyo, 0=else])
	static long cal_thamanyo(long mm, long wd);
	//-------------------------------------------------------------------------
	// Get amyeittasote
	// input: (
	//    md= day of the month [1-30], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=amyeittasote, 0=else])
	static long cal_amyeittasote(long md, long wd);
	//-------------------------------------------------------------------------
	// Get warameittugyi
	// input: (
	//    md= day of the month [1-30], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=warameittugyi, 0=else])
	static long cal_warameittugyi(long md, long wd);
	//-------------------------------------------------------------------------
	// Get warameittunge
	// input: (
	//    md= day of the month [1-30], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=warameittunge, 0=else])
	static long cal_warameittunge(long md, long wd);
	//-------------------------------------------------------------------------
	// Get yatpote
	// input: (
	//    md= day of the month [1-30], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=yatpote, 0=else])
	static long cal_yatpote(long md, long wd);
	//-------------------------------------------------------------------------
	// Get thamaphyu
	// input: (
	//    md= day of the month [1-30], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=thamaphyu, 0=else])
	static long cal_thamaphyu(long md, long wd);
	//-------------------------------------------------------------------------
	// Get nagapor
	// input: (
	//    md= day of the month [1-30], 
	//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
	// output: ( [1=nagapor, 0=else])
	static long cal_nagapor(long md, long wd);
	//-------------------------------------------------------------------------
	// yatyotema 
	// input: (
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    md= day of the month [1-30])
	// output: ( [1=yatyotema, 0=else])
	static long cal_yatyotema(long mm, long md);
	//-------------------------------------------------------------------------
	// mahayatkyan 
	// input: (
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    md= day of the month [1-30])
	// output: ( [1=mahayatkyan, 0=else])
	static long cal_mahayatkyan(long mm, long md);
	//-------------------------------------------------------------------------
	// shanyat 
	// input: (
	//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
	//    md= day of the month [1-30])
	// output: ( [1=shanyat, 0=else])
	static long cal_shanyat(long mm, long md);
	//-------------------------------------------------------------------------
	// get astrological information
	// input: (jdn: Julian Day Number)
	// output: (array of strings)
	static std::vector<std::string> cal_astro(long jdn);
	// End of checking Astrological days
	//-------------------------------------------------------------------------
	// Get holidays
	// input: (jdn=Julian Day Number)
	// output: ( array of strings)
	// Thanks to Ye Lin Kyaw and Aye Nyein for the knowledge about 
	// the Myanmar calendar and the new year
	static std::vector<std::string> cal_holiday(long jdn);
	//-------------------------------------------------------------------------
	// DoE : Date of Easter using  "Meeus/Jones/Butcher" algorithm
	// Reference: Peter Duffett-Smith, Jonathan Zwart',
	//  "Practical Astronomy with your Calculator or Spreadsheet,"
	//  4th Etd, Cambridge university press, 2011. Page-4.
	// input: (y=year)
	// output: (j=julian day number)
	// dependency: w2j()
	static long DoE(long y);
	//-------------------------------------------------------------------------
	// Get other holidays
	// input: (jdn: Julian Day Number)
	// output: (array of strings)
	// dependency: DoE(), j2w()
	static std::vector<std::string> cal_holiday2(long jdn);
	//-------------------------------------------------------------------------
	// jd to date string in Myanmar calendar 
	// input: (jd:julian date,
	//  fs: format string [Optional argument: "&y &M &P &ff"]
	//  tz : time zone offset in hours (Optional, e.g. 8 for GMT +8))
	// output: date string in Myanmar calendar according to fm 
	// where formatting strings are as follows
	// &yyyy : Myanmar year [0000-9999, e.g. 1380]
	// &YYYY : Sasana year [0000-9999, e.g. 2562]
	// &y : Myanmar year [0-9999, e.g. 138]
	// &mm : month with zero padding [01-14]
	// &M : month [e.g. January]
	// &m : month [1-14]
	// &P : moon phase [e.g. waxing, waning, full moon, or new moon]
	// &dd : day of the month with zero padding [01-31]
	// &d : day of the month [1-31]
	// &ff : fortnight day with zero padding [01-15]
	// &f : fortnight day [1-15]
	static std::string j2ms(double jd, std::string fs="&y &M &P &ff", double tz=0);
	//-------------------------------------------------------------------------
	// get properties	
	long myt(); // Myanmar year type	
	long my(); // Myanmar year

	// Sasana year
	//  k = optional argument [
	//		default 0 = do not take account kason full moon day for Sasana year
	//		1 = Sasana year starts on Kason full moon day
	//	]
	long sy(long k = 0); 
	std::string my_name(); // Myanmar year name
		
	long mm(); // Myanmar month [1-14]
	// [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
	//  Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
	//  Tabaung=12, Late Tagu=13, Late Kason=14 ]
	
	long md(); // Myanmar day of the month [1-30]
	long mp(); // Moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon]
	long mf(); // Fortnight day [1-15]	
	std::string sabbath(); // get sabbath string
	std::string yatyaza(); // get yatyaza string
	std::string pyathada(); // get pyathada string
	std::string nagahle(); // get nagahle direction
	std::string mahabote(); // get mahabote direction
	std::vector<std::string>  astro(); // get the array of astrological days
	std::vector<std::string> holidays(); // get the array of public holidays
	std::vector<std::string> holidays2(); // get the array of other holidays
	//-------------------------------------------------------------------------
	// get Myanmar Date String
	// input: (
	//  fs: format string [Optional argument: "&y &M &P &ff"]
	//  tz : time zone offset in hours (Optional, e.g. 8 for GMT +8))
	// output: date string in Myanmar calendar according to fm 
	// where formatting strings are as follows
	// &yyyy : Myanmar year [0000-9999, e.g. 1380]
	// &YYYY : Sasana year [0000-9999, e.g. 2562]
	// &y : Myanmar year [0-9999, e.g. 138]
	// &mm : month with zero padding [01-14]
	// &M : month [e.g. January]
	// &m : month [1-14]
	// &P : moon phase [e.g. waxing, waning, full moon, or new moon]
	// &dd : day of the month with zero padding [01-31]
	// &d : day of the month [1-31]
	// &ff : fortnight day with zero padding [01-15]
	// &f : fortnight day [1-15]
	std::string ToMString(std::string fs="&y &M &P &ff");
	//-------------------------------------------------------------------------
};

/////////////////////////////////////////////////////////////////////////////
// Implementation

//-------------------------------------------------------------------------
// default constructor
inline ceMmDateTime::ceMmDateTime():ceDateTime()
{

}
//-------------------------------------------------------------------------
// Get Myanmar year constants depending on era
// Thanks to Myo Zarny and Wunna Ko for earlier Myanmar years data
// input: my -myanmar year
// output:  
//  EI = Myanmar calendar era id [1-3] : calculations methods/constants depends on era
//  WO = watat offset to compensate
//  NM = number of months to find excess days
//  EW = exception in watat year
inline void ceMmDateTime::GetMyConst(long my, double& EI, double& WO, double& NM, long& EW)
{
	EW = 0; long (*fme)[2]; long* wte; long i=-1,uf,uw;
	// The third era (the era after Independence 1312 ME and after)
	if (my >= 1312) {
		EI = 3; WO = -0.5; NM = 8;
		long fme3[][2] = { {1377, 1} };
		long wte3[] = { 1344, 1345 };
		fme = fme3; wte = wte3;
		uf=long(sizeof(fme3)/sizeof(fme3[0]));
		uw=long(sizeof(wte3)/sizeof(wte3[0]));
	}
	// The second era (the era under British colony: 1217 ME - 1311 ME)
	else if (my >= 1217) {
		EI = 2; WO = -1; NM = 4;
		long fme2[][2] = { {1234, 1},{1261, -1} };
		long wte2[] = { 1263, 1264 };
		fme = fme2; wte = wte2;
		uf=long(sizeof(fme2)/sizeof(fme2[0]));
		uw=long(sizeof(wte2)/sizeof(wte2[0]));
	}
	// The first era (the era of Myanmar kings: ME1216 and before)
	// Thandeikta (ME 1100 - 1216)
	else if (my >= 1100) {
		EI = 1.3; WO = -0.85; NM = -1;
		long fme13[][2] = {{1120, 1}, {1126, -1}, {1150, 1}, {1172, -1}, {1207, 1}};
		long wte13[] = {1201, 1202};
		fme = fme13; wte = wte13;
		uf=long(sizeof(fme13)/sizeof(fme13[0]));
		uw=long(sizeof(wte13)/sizeof(wte13[0]));
	}
	// Makaranta system 2 (ME 798 - 1099)
	else if (my >= 798) {
		EI = 1.2; WO = -1.1; NM = -1;
		long fme12[][2] = {{813, -1}, {849, -1}, {851, -1}, {854, -1}, {927, -1}, 
		{933, -1}, {936, -1}, {938, -1}, {949, -1}, {952, -1}, {963, -1}, {968, -1}, {1039, -1}};
		long wte12[] = {-9999};
		fme = fme12; wte = wte12;
		uf=long(sizeof(fme12)/sizeof(fme12[0]));
		uw=long(sizeof(wte12)/sizeof(wte12[0]));
	}
	// Makaranta system 1 (ME 0 - 797)
	else {
		EI = 1.1; WO = -1.1; NM = -1;
		long fme11[][2] = {{205, 1}, {246, 1}, {471, 1}, {572, -1}, {651, 1}, 
		{653, 2}, {656, 1}, {672, 1}, {729, 1}, {767, -1}};
		long wte11[] = {-9999};
		fme = fme11; wte = wte11;
		uf=long(sizeof(fme11)/sizeof(fme11[0]));
		uw=long(sizeof(wte11)/sizeof(wte11[0]));
	}
	i = ceMmDateTime::bSearch2(my, fme,uf); if (i >= 0) WO += fme[i][1]; // full moon day offset exceptions
	i = ceMmDateTime::bSearch1(my, wte,uw); if (i >= 0) EW = 1; //correct watat exceptions
}
//----------------------------------------------------------------------------
// Search first dimension in a 2D array
// input: (k=key,A=array,u=size)
// output: (i=index)
inline long ceMmDateTime::bSearch2(long k,long (*A)[2], long u) {
	long i = 0; long l = 0; u--;
	while(u>=l) {
		i=long(floor((l+u)/2));
		if (A[i][0]>k)  u=i-1;
		else if (A[i][0]<k) l=i+1;
		else return i;
	} return -1;
}
//-----------------------------------------------------------------------------
// Search a 1D array
// input: (k=key,A=array,u=size)
// output: (i=index)
inline long ceMmDateTime::bSearch1(long k,long* A, long u) {
	long i=0; long l=0; u--;
	while(u>=l) {
		i=long(floor((l+u)/2));
		if (A[i]>k)  u=i-1;
		else if (A[i]<k) l=i+1;
		else return i;
	} return -1;
}
//-------------------------------------------------------------------------
// Check watat (intercalary month)
// input: (my -myanmar year)
// output:  ( 
//  watat - intercalary month [1=watat, 0=common]
//  fm - full moon day of 2nd Waso in jdn_mm (jdn+6.5 for MMT) 
//       [only valid when watat=1])
// dependency: GetMyConst(my)
inline void ceMmDateTime::cal_watat(long my, long& watat, long& fm) {//get data for respective era	
	double SY=1577917828.0/4320000.0; //solar year (365.2587565)
	double LM=1577917828.0/53433336.0; //lunar month (29.53058795)
	double MO=1954168.050623; //beginning of 0 ME for MMT
	double EI,WO,NM; long EW;
	ceMmDateTime::GetMyConst(my,EI,WO,NM,EW); // get constants for the corresponding calendar era
	double TA=(SY/12-LM)*(12-NM); //threshold to adjust
	double ed=fmod(SY*(my+3739),LM); // excess day
	if(ed < TA) ed+=LM;//adjust excess days
	fm=long(round(SY*my+MO-ed+4.5*LM+WO));//full moon day of 2nd Waso
	double TW = 0; watat = 0;//find watat
	if (EI >= 2) {//if 2nd era or later find watat based on excess days
		TW=LM-(SY/12-LM)*NM;
		if(ed >= TW) watat=1;
	}
	else {//if 1st era,find watat by 19 years metonic cycle
	//Myanmar year is divided by 19 and there is intercalary month
	//if the remainder is 2,5,7,10,13,15,18
	//https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
		watat=(my*7+2)%19; if (watat < 0) watat+=19;
		watat=long(floor(watat/12));
	}
	watat^=EW;//correct watat exceptions
}
//-------------------------------------------------------------------------
// Check Myanmar Year
// input: (my -myanmar year)
// output:  ( myt :year type [0=common, 1=little watat, 2=big watat],
// tg1 : the 1st day of Tagu as jdn_mm (Julian Day Number for MMT)
// fm : full moon day of [2nd] Waso as Julain Day Number
// werr: watat error [0=ok, 1= error])
// dependency: cal_watat(my)
inline void ceMmDateTime::cal_my(long my, long& myt, long& tg1, long& fm, long& werr) {
	long yd = 0, nd = 0, y1watat, y1fm, y2watat, y2fm;  werr = 0;
	ceMmDateTime::cal_watat(my,y2watat,y2fm); myt = y2watat;
	do { yd++; ceMmDateTime::cal_watat(my - yd,y1watat,y1fm); } while (y1watat == 0 && yd < 3);
	if (myt) {
		nd = (y2fm - y1fm) % 354; myt = long(floor(nd / 31)+ 1);
		fm = y2fm; if (nd != 30 && nd != 31) { werr = 1; }
	}
	else fm = y1fm + 354 * yd;
	tg1 = y1fm + 354 * yd - 102;
}
//-------------------------------------------------------------------------
// Julian day number to Myanmar date
// input: (jdn -julian day number)
// output:  (
  // myt =year type [0=common, 1=little watat, 2=big watat],
  // my = year,
  // mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
  //   Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, 
  //   Tabaung=12, Late Tagu=13, Late Kason=14 ],
  // md = day of the month [1 to 30])
// dependency: cal_my(my)
inline void ceMmDateTime::j2m(double jd, long& myt, long& my, long& mm, long& md) {
	long jdn=long(round(jd));//convert jdn to integer
	double SY=1577917828.0/4320000.0; //solar year (365.2587565)
	double MO=1954168.050623; //beginning of 0 ME
	long dd,myl,mmt,a,b,c,e,f;
	long tg1,fm,werr;
	my=long(floor((jdn-0.5-MO)/SY));//Myanmar year
	ceMmDateTime::cal_my(my,myt,tg1,fm,werr);//check year
	dd=jdn-tg1+1;//day count
	b=long(floor(myt/2)); c=long(floor(1/(myt+1))); //big wa and common yr
	myl=354+(1-c)*30+b;//year length
	mmt=long(floor((dd-1)/myl));//month type: late =1 or early = 0
	dd-=mmt*myl; a=long(floor((dd+423)/512)); //adjust day count and threshold
	mm=long(floor((dd-b*a+c*a*30+29.26)/29.544));//month
	e=long(floor((mm+12)/16)); f=long(floor((mm+11)/16));
    md=dd-long(floor(29.544*mm-29.26))-b*e+c*f*30;//day
    mm+=f*3-e*4+12*mmt; // adjust month numbers for late months
}
//-------------------------------------------------------------------------
// Get moon phase from day of the month, month, and year type.
// input: (
//    md= day of the month [1-30], 
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//           Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//           Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    myt = year type [0=common, 1=little watat, 2=big watat])
// output: (mp =moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon])
inline long ceMmDateTime::cal_mp(long md,long mm,long myt) {
	long mml=ceMmDateTime::cal_mml(mm,myt);
	return long(floor((md+1)/16)+floor(md/16)+floor(md/mml));
}
//-------------------------------------------------------------------------
// Get length of month from month, and year type.
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//           Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//           Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    myt = year type [0=common, 1=little watat, 2=big watat])
// output: (mml = length of the month [29 or 30 days])
inline long ceMmDateTime::cal_mml(long mm,long myt) {
	long mml=30-mm%2;//month length
	if(mm==3) mml+=long(floor(myt/2));//adjust if Nayon in big watat
	return mml;
}
//-------------------------------------------------------------------------
// Get the apparent length of the year from year type.
// input: ( myt = year type [0=common, 1=little watat, 2=big watat])
// output: ( myl= year length [354, 384, or 385 days])
inline long ceMmDateTime::cal_myl(long myt) {
	return (354+(1-long(floor(1/(myt+1))))*30+long(floor(myt/2)));
}
//-------------------------------------------------------------------------
// Get fortnight day from month day
// input: ( md= day of the month [1-30])
// output: (mf= fortnight day [1 to 15])
inline long ceMmDateTime::cal_mf(long md) {
	return (md-15*long(floor(md/16)));
}
//-------------------------------------------------------------------------
// Get day of month from fortnight day, moon phase, and length of the month
// input: ( 
//   mf = fortnight day [1 to 15], 
//   mp = moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon]
//   mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//          Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//          Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//   myt = year type [0=common, 1=little watat, 2=big watat])
// output: ( md = day of the month [1-30])
inline long ceMmDateTime::cal_md(long mf,long mp,long mm,long myt) {
	long mml=ceMmDateTime::cal_mml(mm,myt);
	long m1=mp%2; long m2=long(floor(mp/2));
	return (m1*(15+m2*(mml-15))+(1-m1)*(mf+15*m2));
}
//-------------------------------------------------------------------------
// Myanmar date to Julian day number
// input:  (
//  my = year,
//  mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//    Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//    Tabaung=12 , Late Tagu=13, Late Kason=14 ],
//  md = day of the month [1-30]
// output: (jd -julian day number)
// dependency: cal_my(my)
inline long ceMmDateTime::m2j(long my,long mm,long md) {
	long b,c,dd,myl,mmt;
	long myt,tg1,fm,werr;
	ceMmDateTime::cal_my(my,myt,tg1,fm,werr);//check year
	mmt=long(floor(mm/13)); mm=mm%13+mmt; // to 1-12 with month type
	b=long(floor(myt/2)); c=1-long(floor((myt+1)/2)); //if big watat and common year	 
	mm+=4-long(floor((mm+15)/16))*4+long(floor((mm+12)/16));//adjust month
	dd=md+long(floor(29.544*mm-29.26))-c*long(floor((mm+11)/16))*30
		+b*long(floor((mm+12)/16));	
	myl=354+(1-c)*30+b; dd+=mmt*myl;//adjust day count with year length
	return (dd+tg1-1);
}
//-------------------------------------------------------------------------
// Myanmar year to Sasana year
// input:  (
//  my = year,
//  mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//      Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//      Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//  md= day of the month [1-30], 
//  k = optional argument [
//		default 0 = do not take account kason full moon day for Sasana year
//		1 = Sasana year starts on Kason full moon day
//	]
// output: (sy -Sasana year)
// 
// Description: Pull Request #9 by Chan Mrate Ko Ko
// Proposal to mark Kason full moon day (Buddha's birthday) as the start of the Sasana year.
// This suggestion references certain versions of the Shan and Rakhine Calendars.
// It aligns with Shan culture, where the new year begins on the first day of Nadaw,
// incorporating the lunar phase into the new year calculation.
// Conversely, Burmese culture sets the new year independently of the moon phase.
// This update offers flexibility in defining the Sasana year which is preferable to enforcing a single fixed approach.
inline long ceMmDateTime::my2sy(long my, long mm, long md, long k) {
	long buddhistEraOffset = ((mm == 1 || (mm == 2 && md < 15)) && (k==1)) ? 1181 : 1182;
	return (my + buddhistEraOffset); 
}
//-------------------------------------------------------------------------
//Checking Astrological days
// More details @ http://cool-emerald.blogspot.sg/2013/12/myanmar-astrological-calendar-days.html
//-------------------------------------------------------------------------
// Get sabbath day and sabbath eve from day of the month, month, and year type.
// input: (
//    md= day of the month [1-30], 
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    myt = year type [0=common, 1=little watat, 2=big watat])
// output: ( [1=sabbath, 2=sabbath eve, 0=else])
inline long ceMmDateTime::cal_sabbath(long md, long mm, long myt) {
	long mml = ceMmDateTime::cal_mml(mm, myt);
	long s = 0; if ((md == 8) || (md == 15) || (md == 23) || (md == mml)) s = 1;
	if ((md == 7) || (md == 14) || (md == 22) || (md == (mml - 1))) s = 2;
	return s;
}
//-------------------------------------------------------------------------
// Get yatyaza from month, and weekday
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=yatyaza, 0=else])
inline long ceMmDateTime::cal_yatyaza(long mm, long wd) {
	//first waso is considered waso
	long m1 = mm % 4; long yatyaza = 0; long wd1 = long(floor(m1 / 2)) + 4;
	long wd2 = ((1 - long(floor(m1 / 2))) + m1 % 2)*(1 + 2 * (m1 % 2));
	if ((wd == wd1) || (wd == wd2)) yatyaza = 1;
	return yatyaza;
}
//-------------------------------------------------------------------------
// Get pyathada from month, and weekday
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=pyathada, 2=afternoon pyathada, 0=else])
inline long ceMmDateTime::cal_pyathada(long mm, long wd) {
	//first waso is considered waso
	long m1 = mm % 4; long pyathada = 0; long wda[] = { 1, 3, 3, 0, 2, 1, 2 };
	if ((m1 == 0) && (wd == 4)) pyathada = 2;//afternoon pyathada
	if (m1 == wda[wd]) pyathada = 1;
	return pyathada;
}
//-------------------------------------------------------------------------
// nagahle 
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ])
// output: ( [0=west, 1=north, 2=east, 3=south])
inline long ceMmDateTime::cal_nagahle(long mm) {
	if (mm <= 0) mm = 4;//first waso is considered waso
	return long(floor((mm % 12) / 3));
}
//-------------------------------------------------------------------------
// mahabote 
// input: (
//  my = year,
//  wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [0=Binga, 1=Atun, 2=Yaza, 3=Adipati, 4= Marana, 5=Thike, 6=Puti])
inline long ceMmDateTime::cal_mahabote(long my, long wd) { return ((my - wd) % 7); }
//-------------------------------------------------------------------------
// nakhat 
// input: ( my = year )
// output: ( [0=orc, 1=elf, 2=human] )
inline long ceMmDateTime::cal_nakhat(long my) { return (my % 3); }
//-------------------------------------------------------------------------
// thamanyo 
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=thamanyo, 0=else])
inline long ceMmDateTime::cal_thamanyo(long mm, long wd) {
	long mmt = long(floor(mm / 13)); mm = mm % 13 + mmt; // to 1-12 with month type
	if (mm <= 0) mm = 4;//first waso is considered waso (looks no need here)
	long thamanyo = 0;
	long m1 = mm - 1 - (long)floor(mm / 9);
	long wd1 = (m1 * 2 - (long)floor(m1 / 8)) % 7;
	long wd2 = (wd + 7 - wd1) % 7;
	if (wd2 <= 1) thamanyo = 1;
	return thamanyo;
}
//-------------------------------------------------------------------------
// Get amyeittasote
// input: (
//    md= day of the month [1-30], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=amyeittasote, 0=else])
inline long ceMmDateTime::cal_amyeittasote(long md, long wd) {
	long mf = md - 15 * (long)floor(md / 16);//get fortnight day [0-15]
	long amyeittasote = 0; long wda[] = { 5, 8, 3, 7, 2, 4, 1 };
	if (mf == wda[wd]) amyeittasote = 1;
	return amyeittasote;
}
//-------------------------------------------------------------------------
// Get warameittugyi
// input: (
//    md= day of the month [1-30], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=warameittugyi, 0=else])
inline long ceMmDateTime::cal_warameittugyi(long md, long wd) {
	long mf = md - 15 * (long)floor(md / 16);//get fortnight day [0-15]
	long warameittugyi = 0; long wda[] = { 7, 1, 4, 8, 9, 6, 3 };
	if (mf == wda[wd]) warameittugyi = 1;
	return warameittugyi;
}
//-------------------------------------------------------------------------
// Get warameittunge
// input: (
//    md= day of the month [1-30], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=warameittunge, 0=else])
inline long ceMmDateTime::cal_warameittunge(long md, long wd) {
	long mf = md - 15 * (long)floor(md / 16);//get fortnight day [0-15]
	long warameittunge = 0; long wn = (wd + 6) % 7;
	if ((12 - mf) == wn) warameittunge = 1;
	return warameittunge;
}
//-------------------------------------------------------------------------
// Get yatpote
// input: (
//    md= day of the month [1-30], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=yatpote, 0=else])
inline long ceMmDateTime::cal_yatpote(long md, long wd) {
	long mf = md - 15 * (long)floor(md / 16);//get fortnight day [0-15]
	long yatpote = 0; long wda[] = { 8, 1, 4, 6, 9, 8, 7 };
	if (mf == wda[wd]) yatpote = 1;
	return yatpote;
}
//-------------------------------------------------------------------------
// Get thamaphyu
// input: (
//    md= day of the month [1-30], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=thamaphyu, 0=else])
inline long ceMmDateTime::cal_thamaphyu(long md, long wd) {
	long mf = md - 15 * (long)floor(md / 16);//get fortnight day [0-15]
	long thamaphyu = 0; long wda[] = { 1, 2, 6, 6, 5, 6, 7 };
	if (mf == wda[wd]) thamaphyu = 1;
	long wdb[] = { 0, 1, 0, 0, 0, 3, 3 }; if (mf == wdb[wd]) thamaphyu = 1;
	if ((mf == 4) && (wd == 5)) thamaphyu = 1;
	return thamaphyu;
}
//-------------------------------------------------------------------------
// Get nagapor
// input: (
//    md= day of the month [1-30], 
//    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
// output: ( [1=nagapor, 0=else])
inline long ceMmDateTime::cal_nagapor(long md, long wd) {
	long nagapor = 0; long wda[] = { 26, 21, 2, 10, 18, 2, 21 };
	if (md == wda[wd]) nagapor = 1;
	long wdb[] = { 17, 19, 1, 0, 9, 0, 0 }; if (md == wdb[wd]) nagapor = 1;
	if (((md == 2) && (wd == 1)) || (((md == 12) || (md == 4) || (md == 18)) && (wd == 2))) nagapor = 1;
	return nagapor;
}
//-------------------------------------------------------------------------
// yatyotema 
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    md= day of the month [1-30])
// output: ( [1=yatyotema, 0=else])
inline long ceMmDateTime::cal_yatyotema(long mm, long md) {
	long mmt = long(floor(mm / 13)); mm = mm % 13 + mmt; // to 1-12 with month type
	if (mm <= 0) mm = 4;//first waso is considered waso
	long mf = md - 15 * (long)floor(md / 16);//get fortnight day [0-15]
	long yatyotema = 0; long m1 = (mm % 2) ? mm : ((mm + 9) % 12);
	m1 = (m1 + 4) % 12 + 1; if (mf == m1) yatyotema = 1;
	return yatyotema;
}
//-------------------------------------------------------------------------
// mahayatkyan 
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    md= day of the month [1-30])
// output: ( [1=mahayatkyan, 0=else])
inline long ceMmDateTime::cal_mahayatkyan(long mm, long md) {
	if (mm <= 0) mm = 4;//first waso is considered waso
	long mf = md - 15 * (long)floor(md / 16);//get fortnight day [0-15]
	long mahayatkyan = 0; long m1 = ((long)floor((mm % 12) / 2) + 4) % 6 + 1;
	if (mf == m1) mahayatkyan = 1;
	return mahayatkyan;
}
//-------------------------------------------------------------------------
// shanyat 
// input: (
//    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//         Tabaung=12, Late Tagu=13, Late Kason=14 ], 
//    md= day of the month [1-30])
// output: ( [1=shanyat, 0=else])
inline long ceMmDateTime::cal_shanyat(long mm, long md) {
	long mmt = long(floor(mm / 13)); mm = mm % 13 + mmt; // to 1-12 with month type
	if (mm <= 0) mm = 4;//first waso is considered waso
	long mf = md - 15 * (long)floor(md / 16);//get fortnight day [0-15]
	long shanyat = 0; long sya[] = { 8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4 };
	if (mf == sya[mm - 1]) shanyat = 1;
	return shanyat;
}
//-------------------------------------------------------------------------
// get astrological information
// input: (jdn: Julian Day Number)
// output: (array of strings)
inline std::vector<std::string> ceMmDateTime::cal_astro(long jdn) {
	// jdn=(long)round(jdn);
	long myt,my,mm,md; std::vector<std::string> hs; 
	ceMmDateTime::j2m(jdn,myt,my,mm,md);
	long wd=(jdn+2)%7;//week day [0=sat, 1=sun, ..., 6=fri]
	if(ceMmDateTime::cal_thamanyo(mm,wd)) {hs.push_back("thamanyo");}
	if(ceMmDateTime::cal_amyeittasote(md,wd)) {hs.push_back("amyeittasote");}
	if(ceMmDateTime::cal_warameittugyi(md,wd)) {hs.push_back("warameittugyi");}
	if(ceMmDateTime::cal_warameittunge(md,wd)) {hs.push_back("warameittunge");}
	if(ceMmDateTime::cal_yatpote(md,wd)) {hs.push_back("yatpote");}
	if(ceMmDateTime::cal_thamaphyu(md,wd)) {hs.push_back("thamaphyu");}
	if(ceMmDateTime::cal_nagapor(md,wd)) {hs.push_back("nagapor");}
	if(ceMmDateTime::cal_yatyotema(mm,md)) {hs.push_back("yatyotema");}
	if(ceMmDateTime::cal_mahayatkyan(mm,md)) {hs.push_back("mahayatkyan");}
	if(ceMmDateTime::cal_shanyat(mm,md)) {hs.push_back("shanyat");}
	return hs;
}
//End of core functions ###############################################################

//Start of checking holidays ##################################################
// Get holidays
// input: (jdn=Julian Day Number)
// output: ( array of strings)
// Thanks to Ye Lin Kyaw and Aye Nyein for the knowledge about 
// the Myanmar calendar and the new year
inline std::vector<std::string> ceMmDateTime::cal_holiday(long jdn) {
	// jdn=(long)round(jdn);
	long myt,my,mm,md,mp,mmt,gy,gm,gd,gh,gn; double gs;
	ceMmDateTime::j2m(jdn,myt,my,mm,md);
	mp=ceMmDateTime::cal_mp(md,mm,myt);
	mmt=(long)floor(mm/13); std::vector<std::string> hs;
	ceDateTime::j2w(jdn,gy,gm,gd,gh,gn,gs);
	//---------------------------------
	// Thingyan
	double SY=1577917828.0/4320000.0; //solar year (365.2587565)
	double MO=1954168.050623; //beginning of 0 ME
	long BGNTG=1100, SE3=1312;//start of Thingyan and third era
	long akn,atn; double ja,jk;
	ja=SY*(my+mmt)+MO; // atat time
	if (my >= SE3) jk=ja-2.169918982; // akya time
	else jk=ja-2.1675;
	akn=(long)round(jk); atn=(long)round(ja);
	if(jdn==(atn+1)) {hs.push_back("Myanmar New Year Day");}
	if ((my+mmt)>=BGNTG) {
		if(jdn==atn) {hs.push_back("Thingyan Atat");}
		else if((jdn>akn)&&(jdn<atn)) {hs.push_back("Thingyan Akyat");}
		else if(jdn==akn) {hs.push_back("Thingyan Akya");}
		else if(jdn==(akn-1)) {hs.push_back("Thingyan Akyo");}
		else if(((my+mmt)>=1369)&&((my+mmt)<1379)&&((jdn==(akn-2))||
			((jdn>=(atn+2))&&(jdn<=(akn+7))))) {hs.push_back("Holiday");}
	}
	//---------------------------------
	// holidays on gregorian calendar	
	if((gy>=2018) && (gm==1) && (gd==1)) {hs.push_back("New Year Day");}
	else if((gy>=1948) && (gm==1) && (gd==4)) {hs.push_back("Independence Day");}
	else if((gy>=1947) && (gm==2) && (gd==12)) {hs.push_back("Union Day");}
	else if((gy>=1958) && (gm==3) && (gd==2)) {hs.push_back("Peasants Day");}
	else if((gy>=1945) && (gm==3) && (gd==27)) {hs.push_back("Resistance Day");}
	else if((gy>=1923) && (gm==5) && (gd==1)) {hs.push_back("Labour Day");}
	else if((gy>=1947) && (gm==7) && (gd==19)) {hs.push_back("Martyrs Day");}
	else if((gy>=1752) && (gm==12) && (gd==25)) {hs.push_back("Christmas Day");}
	else if((gy==2017) && (gm==12) && (gd==30)) {hs.push_back("Holiday");}
	else if((gy>=2017) && (gm==12) && (gd==31)) {hs.push_back("Holiday");}
	//---------------------------------
	// holidays on myanmar calendar
	if((mm==2) && (mp==1)) {hs.push_back("Buddha Day");}//Vesak day
	else if((mm==4)&& (mp==1)) {hs.push_back("Start of Buddhist Lent");}//Warso day
	else if((mm==7) && (mp==1)) {hs.push_back("End of Buddhist Lent");}
	else if((my>=1379) && (mm==7) && (md==14||md==16)) {hs.push_back("Holiday");}
	else if((mm==8) && (mp==1)) {hs.push_back("Tazaungdaing");}
	else if((my>=1379) && (mm==8) && (md==14)) {hs.push_back("Holiday");}
	else if((my>=1282) && (mm==8) && (md==25)) {hs.push_back("National Day");}
	else if((mm==10) && (md==1)) {hs.push_back("Karen New Year Day");}
	else if((mm==12) && (mp==1)) {hs.push_back("Tabaung Pwe");}
	//---------------------------------
	// //other holidays	
	// long ghEid[]={2456513,2456867,2457221,2457576,2457930,2458285,2458640};	
	// if(ceMmDateTime::bSearch1(jdn,ghEid,long(sizeof(ghEid)/sizeof(ghEid[0])))>=0) 
	//   {hs.push_back("Eid");}

	// // long ghDiwali[]={2456599,2456953,2457337,2457691,2458045,2458430,2458784};
	// // if(ceMmDateTime::bSearch1(jdn,ghDiwali,long(sizeof(ghDiwali)/sizeof(ghDiwali[0])))>=0) 
	// //  {hs.push_back("Diwali");}
	// if((mm==7) && (mp==3)) {hs.push_back("~Diwali");}
	//---------------------------------
	return hs;
}
//-------------------------------------------------------------------------
// DoE : Date of Easter using  "Meeus/Jones/Butcher" algorithm
// Reference: Peter Duffett-Smith, Jonathan Zwart',
//  "Practical Astronomy with your Calculator or Spreadsheet,"
//  4th Etd, Cambridge university press, 2011. Page-4.
// input: (y=year)
// output: (j=julian day number)
// dependency: w2j()
inline long ceMmDateTime::DoE(long y) {
	long a,b,c,d,e,f,g,h,i,k,l,m,p,q,n;
	a=y%19;
	b=(long)floor(y/100); c=y%100;
	d=(long)floor(b/4); e=b%4;
	f=(long)floor((b+8)/25);
	g=(long)floor((b-f+1)/3);
	h=(19*a+b-d-g+15)%30;
	i=(long)floor(c/4); k=c%4;
	l=(32+2*e+2*i-h-k)%7;
	m=(long)floor((a+11*h+22*l)/451);
	q=h+l-7*m+114; p=(q%31)+1; n=(long)floor(q/31);
	return (long)round(ceDateTime::w2j(y,n,p,12,0,0,1));// this is for Gregorian
}
//-------------------------------------------------------------------------
// Get other holidays
// input: (jdn: Julian Day Number)
// output: (array of strings)
// dependency: DoE(), j2w()
inline std::vector<std::string> ceMmDateTime::cal_holiday2(long jdn) {
	// jdn=(long)round(jdn);
	long myt,my,mm,md,mp,mmt,gy,gm,gd,gh,gn; double gs;
	ceMmDateTime::j2m(jdn,myt,my,mm,md);
	mp=ceMmDateTime::cal_mp(md,mm,myt);
	mmt=(long)floor(mm/13); std::vector<std::string> hs;
	ceDateTime::j2w(jdn,gy,gm,gd,gh,gn,gs);
	//---------------------------------
	// holidays on gregorian calendar	
	long doe=ceMmDateTime::DoE(gy);
	if((gy<=2017) && (gm==1) && (gd==1)) {hs.push_back("New Year Day");}
	else if((gy>=1915) && (gm==2) && (gd==13)) {hs.push_back("G. Aung San BD");}
	else if((gy>=1969) && (gm==2) && (gd==14)) {hs.push_back("Valentines Day");}
	else if((gy>=1970) && (gm==4) && (gd==22)) {hs.push_back("Earth Day");}
	else if((gy>=1392) && (gm==4) && (gd==1)) {hs.push_back("April Fools Day");}
	else if((gy>=1948) && (gm==5) && (gd==8)) {hs.push_back("Red Cross Day");}
	else if((gy>=1994) && (gm==10) && (gd==5)) {hs.push_back("World Teachers Day");}
	else if((gy>=1947) && (gm==10) && (gd==24)) {hs.push_back("United Nations Day");}
	else if((gy>=1753) && (gm==10) && (gd==31)) {hs.push_back("Halloween");}
	if((gy>=1876) && (jdn==doe)) {hs.push_back("Easter");}
	else if((gy>=1876) && (jdn==(doe-2))) {hs.push_back("Good Friday");}
	//---------------------------------
	// holidays on myanmar calendar
	if((my>=1309) && (mm==11) && (md==16))
		{hs.push_back("Mon National Day");}//the ancient founding of Hanthawady
	else if((mm==9) && (md==1)) {
		hs.push_back("Shan New Year Day");
		if(my>=1306) {hs.push_back("Authors Day");}
	}//Nadaw waxing moon 1
	else if((mm==3) && (mp==1)) {hs.push_back("Mahathamaya Day");}//Nayon full moon
	else if((mm==6)&&(mp==1)){hs.push_back("Garudhamma Day");}//Tawthalin full moon
	else if((my>=1356) && (mm==10) && (mp==1))
		{hs.push_back("Mothers Day");}//Pyatho full moon
	else if((my>=1370) && (mm==12) && (mp==1))
		{hs.push_back("Fathers Day");}//Tabaung full moon
	else if((mm==5) && (mp==1)) {hs.push_back("Metta Day");}//Waguang full moon
	else if((mm==5) && (md==10)) {hs.push_back("Taungpyone Pwe");}//Taung Pyone Pwe
	else if((mm==5) && (md==23)) {hs.push_back("Yadanagu Pwe");}//Yadanagu Pwe
	//----------------------------------------------------------------------------
	// //other holidays
	// long ghEid2[]={2456936,2457290,2457644,2457998,2458353,2458707};
	// long ghCNY[]={2456689,2456690,2457073,2457074,2457427,2457428,2457782,
	// 	2457783,2458166,2458167,2458520,2458521};
	// if(ceMmDateTime::bSearch1(jdn,ghEid2,long(sizeof(ghEid2)/sizeof(ghEid2[0])))>=0) 
	// 	{hs.push_back("Eid");}
	// if(ceMmDateTime::bSearch1(jdn,ghCNY,long(sizeof(ghCNY)/sizeof(ghCNY[0])))>=0) 
	// 	{hs.push_back("Chinese New Year");}
	//----------------------------------------------------------------------------
	return hs;
}

//-----------------------------------------------------------------------------
//End of checking holidays ####################################################
//-------------------------------------------------------------------------
// jd to date string in Myanmar calendar 
// input: (jd:julian date,
//  fs: format string [Optional argument: "&y &M &P &ff"]
//  tz : time zone offset in hours (Optional, e.g. 8 for GMT +8))
// output: date string in Myanmar calendar according to fm 
// where formatting strings are as follows
// &yyyy : Myanmar year [0000-9999, e.g. 1380]
// &YYYY : Sasana year neglection moon phase [0000-9999, e.g. 2562]
// &SSSS : Sasana year starting at Kason full moon day [0000-9999, e.g. 2562]
// &y : Myanmar year [0-9999, e.g. 138]
// &mm : month with zero padding [01-14]
// &M : month [e.g. January]
// &m : month [1-14]
// &P : moon phase [e.g. waxing, waning, full moon, or new moon]
// &dd : day of the month with zero padding [01-31]
// &d : day of the month [1-31]
// &ff : fortnight day with zero padding [01-15]
// &f : fortnight day [1-15]
inline std::string ceMmDateTime::j2ms(double jd, std::string fs, double tz) {	
	jd+=tz/24.0;
	long jdn=(long)round(jd);
	long myt,my,mm,md,mp,mf; 
	ceMmDateTime::j2m(jdn,myt,my,mm,md);
	mp=ceMmDateTime::cal_mp(md,mm,myt);
	mf=ceMmDateTime::cal_mf(md);
	std::string mma[]={"First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
	"Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung","Late Tagu","Late Kason"};
	std::string mpa[]={"Waxing","Full Moon","Waning","New Moon"};
	// replace format string with values
	std::string fm=fs; std::string fstr,rstr;
	//--------------------------------------------------------
	fstr = "&yyyy";
	rstr = std::string(4, '0') + std::to_string(my); 
	rstr = rstr.substr(rstr.length() - 4);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	long sy = ceMmDateTime::my2sy(my,mm,md,0); //Sasana year neglecting moon phase
	fstr = "&YYYY";
	rstr = std::string(4, '0') + std::to_string(sy); 
	rstr = rstr.substr(rstr.length() - 4);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	long sy2 = ceMmDateTime::my2sy(my,mm,md,1); //Sasana year to start on Kason full moon day
	fstr = "&SSSS";
	rstr = std::string(4, '0') + std::to_string(sy2); 
	rstr = rstr.substr(rstr.length() - 4);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&y";
	rstr = std::to_string(my);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&mm";
	rstr = std::string(2, '0') + std::to_string(mm);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&M";
	rstr = mma[mm]; if(mm==4 && myt>0){rstr="Second "+rstr;}
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&m";
	rstr = std::to_string(mm);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&P";
	rstr = mpa[mp]; 
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&dd";
	rstr = std::string(2, '0') + std::to_string(md);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&d";
	rstr = std::to_string(md);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&ff";
	rstr = std::string(2, '0') + std::to_string(mf);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "&f";
	rstr = std::to_string(mf);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	return fm;
}
//-------------------------------------------------------------------------
// get properties

// Myanmar year type
inline long ceMmDateTime::myt(){ 
	long myt,my,mm,md; 
	ceMmDateTime::j2m(this->jdnl(),myt,my,mm,md);
	return myt;
} 

// Myanmar year
inline long ceMmDateTime::my(){ 
	long myt,my,mm,md; 
	ceMmDateTime::j2m(this->jdnl(),myt,my,mm,md);
	return my;
} 

// Sasana year
inline long ceMmDateTime::sy(long k){ 
	return ceMmDateTime::my2sy(this->my(),this->mm(),this->md(),k);
} 

// Myanmar year name
inline std::string ceMmDateTime::my_name(){ 
	// "ပုဿနှစ်","မာခနှစ်","ဖ္လကိုန်နှစ်","စယ်နှစ်",
	//	"ပိသျက်နှစ်","စိဿနှစ်","အာသတ်နှစ်","သရဝန်နှစ်",
	//	"ဘဒြနှစ်","အာသိန်နှစ်","ကြတိုက်နှစ်","မြိက္ကသိုဝ်နှစ်"
	std::string yna[]={"Hpusha","Magha","Phalguni","Chitra",
		"Visakha","Jyeshtha","Ashadha","Sravana",
		"Bhadrapaha","Asvini","Krittika","Mrigasiras"};
	return yna[this->my()%12];
} 

// Myanmar month [1-14]
// [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
//  Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
//  Tabaung=12, Late Tagu=13, Late Kason=14 ]
inline long ceMmDateTime::mm(){ 
	long myt,my,mm,md; 
	ceMmDateTime::j2m(this->jdnl(),myt,my,mm,md);
	return mm;
} 

// Myanmar day of the month [1-30]
inline long ceMmDateTime::md(){ 
	long myt,my,mm,md; 
	ceMmDateTime::j2m(this->jdnl(),myt,my,mm,md);
	return md;
} 

// Moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon]
inline long ceMmDateTime::mp(){ 
	long myt,my,mm,md; 
	ceMmDateTime::j2m(this->jdnl(),myt,my,mm,md);
	return ceMmDateTime::cal_mp(md,mm,myt);
} 

// Fortnight day [1-15]
inline long ceMmDateTime::mf() {
	return ceMmDateTime::cal_mf(this->md());
}

// get sabbath string
inline std::string ceMmDateTime::sabbath() {
	long myt,my,mm,md; 
	ceMmDateTime::j2m(this->jdnl(),myt,my,mm,md);
	long sb=ceMmDateTime::cal_sabbath(md,mm,myt);
	std::string str="";
	if(sb==1) str="Sabbath";
	else if(sb==2) str="Sabbath Eve";
	return str;
}

// get yatyaza string
inline std::string ceMmDateTime::yatyaza() {
	long v=ceMmDateTime::cal_yatyaza(this->mm(),this->w());
	return (v?"Yatyaza":"");
}

// get pyathada string
inline std::string ceMmDateTime::pyathada() {
	long v=ceMmDateTime::cal_pyathada(this->mm(),this->w());
	std::string pa[]={"","Pyathada","Afternoon Pyathada"};
	return pa[v%3];
}

// get nagahle direction
inline std::string ceMmDateTime::nagahle() {
	long v=ceMmDateTime::cal_nagahle(this->mm());
	std::string pa[]={"West","North","East","South"};
	return pa[v%4];
}

// get mahabote direction
inline std::string ceMmDateTime::mahabote() {
	long v=ceMmDateTime::cal_mahabote(this->my(),this->w());
	std::string pa[]={"Binga","Atun","Yaza","Adipati","Marana","Thike","Puti"};
	return pa[v%7];
}

// get the array of astrological days
inline std::vector<std::string> ceMmDateTime::astro() {
	return ceMmDateTime::cal_astro(this->jdnl());
}

// get the array of public holidays
inline std::vector<std::string> ceMmDateTime::holidays() {
	return ceMmDateTime::cal_holiday(this->jdnl());
}

// get the array of other holidays
inline std::vector<std::string> ceMmDateTime::holidays2() {
	return ceMmDateTime::cal_holiday2(this->jdnl());
}

//-------------------------------------------------------------------------
// get Myanmar Date String
// input: (
//  fs: format string [Optional argument: "&y &M &P &ff"]
//  tz : time zone offset in hours (Optional, e.g. 8 for GMT +8))
// output: date string in Myanmar calendar according to fm 
// where formatting strings are as follows
// &yyyy : Myanmar year [0000-9999, e.g. 1380]
// &YYYY : Sasana year [0000-9999, e.g. 2562]
// &y : Myanmar year [0-9999, e.g. 138]
// &mm : month with zero padding [01-14]
// &M : month [e.g. January]
// &m : month [1-14]
// &P : moon phase [e.g. waxing, waning, full moon, or new moon]
// &dd : day of the month with zero padding [01-31]
// &d : day of the month [1-31]
// &ff : fortnight day with zero padding [01-15]
// &f : fortnight day [1-15]
inline std::string ceMmDateTime::ToMString(std::string fs) {
	return ceMmDateTime::j2ms(this->jd(),fs,this->tz());
}
//-------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

} // namespace ce

#endif // CEMMDATETIME_H