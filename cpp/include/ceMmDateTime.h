// File: ceMmDateTime.h
// Description: Modern Myanmar Calendrical Calculations
// WebSite: https://yan9a.github.io/mcal/
// MIT License (https://opensource.org/licenses/MIT)
// Copyright (c) 2018 Yan Naing Aye
// Doc: http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
//-------------------------------------------------------------------------
#ifndef CEMMDATETIME_H
#define CEMMDATETIME_H

#include"ceDateTime.h"
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
	long sy(); // Sasana year
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

} // namespace ce

#endif // CEMMDATETIME_H