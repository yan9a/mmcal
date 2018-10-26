// File: ceDateTime.cpp
// Description: Simple C++ Date/time class
// WebSite: https://yan9a.github.io/mcal/
// MIT License (https://opensource.org/licenses/MIT)
// Copyright (c) 2018 Yan Naing Aye

#include "ceDateTime.h"
#include<math.h>
#include <algorithm>
#ifdef ceWINDOWS
	#include<windows.h>	
#elif defined(ceLINUX)
	#include<sys/time.h>
#endif
using namespace std;

namespace ce {
//-------------------------------------------------------------------------
// Time to Fraction of day starting from 12 noon
// input: (h=hour, n=minute, s=second) output: (d: fraction of day)
double ceDateTime::t2d(long h,long n,double s) 
{ 
    return ((double(h)-12)/24.0+double(n)/1440.0+s/86400.0);
}
//-------------------------------------------------------------------------
//Western date to Julian date
//Credit4 Gregorian2JD: http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html
//input: (y: year, m: month, d: day, h=hour, n=minute, s=second
  // ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
  // SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
  //     Gregorian start in British calendar (1752/Sep/14 = 2361222)
//output: Julian date
double ceDateTime::w2j(long y, long m, long d, long h, long n, double s, long ct, long SG)
{
	long  a = long(floor((14 - m) / 12)); y = y + 4800 - a; m = m + (12 * a) - 3;
	long jd =long( d + floor((153 * m + 2) / 5) + (365 * y) + floor(y / 4));
	if (ct == 1) jd = long( jd - floor(y / 100) + floor(y / 400) - 32045);
	else if (ct == 2) jd = jd - 32083;
	else {
		jd = long( jd - floor(y / 100) + floor(y / 400) - 32045);
		if (jd<SG) {
			jd = long( d + floor((153 * m + 2) / 5) + (365 * y) + floor(y / 4) - 32083);
			if (jd>SG) jd = SG;
		}
	}
    return double(jd)+t2d(h,n,s);
}
//-------------------------------------------------------------------------
//Julian date to Western date
//Credit4 Gregorian date: http://pmyers.pcug.org.au/General/JulianDates.htm
//Credit4 Julian Calendar: http://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
//input: (jd:julian date,
  // ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
  // SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
//output: Western date (y=year, m=month, d=day, h=hour, n=minute, s=second)
void ceDateTime::j2w(double jd,long& year, long& month, long& day, long& hour, long& minute, double& second, long ct, long SG) 
{
    long j,y,m,d,h,n;
    double jf,s;
	if (ct==2 || (ct==0 && (jd<SG))) {
		long b,c,f,e;
		j= long(floor(jd+0.5)); jf=jd+0.5-j;
		b=j+1524; c= long(floor((double(b)-122.1)/365.25)); f= long(floor(365.25*double(c)));
		e= long(floor(double(b-f)/30.6001)); m=(e>13)?(e-13):(e-1);
		d=b-f- long(floor(30.6001*double(e))); y=m<3?(c-4715):(c-4716);
	}
	else{
		j= long(floor(jd+0.5)); jf=jd+0.5-j; j-=1721119;
		y=(long)(((double)(4*j-1))/146097);
        j=4*j-1-146097*y;
        d=(long)(((double)(j))/4);
        j=(long)((4*(double)d+3)/1461);
        d=4*d+3-1461*j;
        d=(long)(((double)d+4)/4); m=(long)((5*(double)d-3)/153); d=5*d-3-153*m;
        d=(long)(((double)d+5)/5); y=100*y+j;
        if(m<10) {m+=3;}
        else {m-=9; y=y+1;}
	}
	jf*=24; h=(long)(jf); jf=(jf-h)*60; n=(long)(jf); s=((jf-n)*60);
	year=y;	month=m; day=d;	hour=h;	minute=n; second=s;
}
//-------------------------------------------------------------------------
// convert unix timestamp to jd 
double ceDateTime::u2j(time_t ut)
{
	//number of seconds from 1970 Jan 1 00:00:00 (UTC)
	return (2440587.5+double(ut)/86400.0);//converte to day(/24h/60min/60sec) and to JD
}
//-------------------------------------------------------------------------
// julian date to unix time
time_t ceDateTime::j2u(double jd)
{
	return long(floor((jd-2440587.5)*86400.0+0.5));
}
//-------------------------------------------------------------------------
// Compile time string
string ceDateTime::compiletime()
{
	string s=__DATE__;
    s+=" ";
    s+=__TIME__;
	//s+=" ";
    //s+=__cplusplus;
	return s;
}
//-------------------------------------------------------------------------
#ifndef ceSYSTEMINDEPENDENT
// get current time in julian date
double ceDateTime::jdnow()
{
    //number of seconds from 1970 Jan 1 00:00:00 (UTC)
    time_t ut = time(0);//now
    double jd=ceDateTime::u2j(ut);
    double ms=0;//milliseconds
#ifdef ceWINDOWS	
	SYSTEMTIME wt;
	GetSystemTime(&wt);
	ms=double(wt.wMilliseconds);
#elif defined(ceLINUX)
	timeval time;
	gettimeofday(&time,NULL);
	ms=double(time.tv_usec)/1000.0;	
#endif
    jd+=ms/86400000.0;
    return jd;
}
//-------------------------------------------------------------------------
// get local time zone offset between local time and UTC in hours (e.g. 8 for GMT +8)
double ceDateTime::ltzoh()
{
	double jdu= ceDateTime::jdnow();//utc
	//http://pubs.opengroup.org/onlinepubs/7908799/xsh/time.h.html
    time_t ut = time(0);//number of seconds from 1970 Jan 1 00:00:00 (UTC)
	struct tm * ts=localtime(&ut);
	double jdl= ceDateTime::w2j(ts->tm_year+1900,ts->tm_mon+1,ts->tm_mday,ts->tm_hour,ts->tm_min,ts->tm_sec);
    double stz=jdl-jdu;// local and utc day difference
    //round to 1 min quantization
    stz=double(floor(stz*1440.0+0.5))/60.0;
    return stz;
}
//-------------------------------------------------------------------------
// Set local date time of the system
// need super user privileges
// https://www.linuxquestions.org/questions/programming-9/c-code-to-change-date-time-on-linux-707384/
// https://msdn.microsoft.com/en-us/library/windows/desktop/ms724936(v=vs.85).aspx
void ceDateTime::SetSystemLocalTime(int year, int month, int day,int hour, int minute, int second)
{
#ifdef ceWINDOWS
  //For Windows
  SYSTEMTIME lt;
  GetLocalTime(&lt);
  lt.wYear=year;
  lt.wMonth=month;
  lt.wDay=day;
  lt.wHour=hour;
  lt.wMinute=minute;
  lt.wSecond=second;
  SetLocalTime(&lt);
#elif defined(ceLINUX)
  //For POSX
  time_t mytime = time(0);
  struct tm* tm_ptr = localtime(&mytime);

  if (tm_ptr)
  {
    tm_ptr->tm_mon  = month - 1;
    tm_ptr->tm_mday = day;
    tm_ptr->tm_year = year - 1900;

    tm_ptr->tm_hour = hour;
    tm_ptr->tm_min = minute;
    tm_ptr->tm_sec = second;

    const struct timeval tv = {mktime(tm_ptr), 0};
    settimeofday(&tv, 0);//need super user privileges
  }
#endif
}

//-------------------------------------------------------------------------
// set local time zone
void ceDateTime::SetTimezone()
{
	this->m_tz = ceDateTime::ltzoh();
}
//-------------------------------------------------------------------------
// set time to now
void ceDateTime::Set2Now()
{
	this->m_jd = ceDateTime::jdnow();
}
//-------------------------------------------------------------------------
#endif // ceSYSTEMINDEPENDENT
ceDateTime::ceDateTime()
{
#ifndef ceSYSTEMINDEPENDENT
	this->SetTimezone();
	this->Set2Now();
#else
	this->SetTimezone(0);
	this->SetUnixTime(0);
#endif // ceSYSTEMINDEPENDENT
	this->m_ct=0;
	this->m_SG=2361222;
}
//-------------------------------------------------------------------------
// jd to date time string
// input: (jd:julian date,
//  fm: format [Optional argument: "%Www %yyyy-%mm-%d %HH:%nn:%ss %zz"]
//  tz : time zone offset in hours (e.g. 8 for GMT +8)
//  ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
//  SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
// output: date time string according to fm where formatting strings are as follows
// %yyyy : year [0000-9999, e.g. 2018]
// %yy : year [00-99 e.g. 18]
// %MMM : month [e.g. JAN]
// %Mmm : month [e.g. Jan]
// %mm : month with zero padding [01-12]
// %M : month [e.g. January]
// %m : month [1-12]
// %dd : day with zero padding [01-31]
// %d : day [1-31]
// %HH : hour [00-23]
// %hh : hour [01-12]
// %H : hour [0-23]
// %h : hour [1-12]
// %AA : AM or PM
// %aa : am or pm
// %nn : minute with zero padding [00-59]
// %n : minute [0-59]
// %ss : second [00-59]
// %s : second [0-59]
// %lll : millisecond [000-999]
// %l : millisecond [0-999]
// %WWW : Weekday [e.g. SAT]
// %Www : Weekday [e.g. Sat]
// %W : Weekday [e.g. Saturday]
// %w : Weekday number [0=sat, 1=sun, ..., 6=fri]
// %zz : time zone (e.g. +08, +06:30)
string ceDateTime::j2s(double jd, string fm, double tz, long ct, long SG)
{
	long year,month,day,hour,minute;
	double second;
    jd+=tz/24.0;
	ceDateTime::j2w(jd,year,month,day,hour,minute,second,ct,SG);
	long s= long(floor(second));//shold not take round to make sure s<60
	long l= long(floor((second-double(s))*1000)); // not rounding
    long jdn= long(floor(jd+0.5));
    long wd=(jdn+2)%7;//week day [0=sat, 1=sun, ..., 6=fri]
	long h = hour % 12;
	if (h == 0) h = 12;
    string W[]={"Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"};
	string M[] = {"January","February","March","April","May","June","July","August","September","October","November","December"};

    // replace format string with values
	string fstr,rstr;
	//--------------------------------------------------------
	fstr = "%yyyy";
	rstr = string(4, '0') + to_string(year); 
	rstr = rstr.substr(rstr.length() - 4);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%yy";
	long y = year % 100;
	rstr = string(2, '0') + to_string(y);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%MMM";
	rstr = M[month-1];
	std::transform(rstr.begin(), rstr.end(), rstr.begin(), ::toupper);
	rstr = rstr.substr(0,3);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%Mmm";
	rstr = M[month - 1];
	rstr = rstr.substr(0, 3);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%mm";
	rstr = string(2, '0') + to_string(month);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%M";
	rstr = M[month - 1];
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%m";
	rstr = to_string(month);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%dd";
	rstr = string(2, '0') + to_string(day);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%d";
	rstr = to_string(day);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%HH";
	rstr = string(2, '0') + to_string(hour);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%hh";
	rstr = string(2, '0') + to_string(h);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%H";
	rstr = to_string(hour);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%h";
	rstr = to_string(h);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%AA";
	rstr = hour<12?"AM":"PM";
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%aa";
	rstr = hour<12 ? "am" : "pm";
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%nn";
	rstr = string(2, '0') + to_string(minute);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%n";
	rstr = to_string(minute);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%ss";
	rstr = string(2, '0') + to_string(s);
	rstr = rstr.substr(rstr.length() - 2);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%s";
	rstr = to_string(s);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%lll";
	rstr = string(3, '0') + to_string(l);
	rstr = rstr.substr(rstr.length() - 3);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%l";
	rstr = to_string(l);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%WWW";
	rstr = W[wd];
	std::transform(rstr.begin(), rstr.end(), rstr.begin(), ::toupper);
	rstr = rstr.substr(0, 3);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%Www";
	rstr = W[wd];
	rstr = rstr.substr(0, 3);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%W";
	rstr = W[wd];
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%w";
	rstr = to_string(wd);
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	fstr = "%zz";
	string tzs = tz < 0 ? "-" : "+";
	string tzh = string(2, '0') + to_string(long(floor(tz)));
	tzh = tzh.substr(tzh.length() - 2);
	rstr = tzs+tzh;
	double tzf = tz - floor(tz);
	if (tzf > 0) {
		tzh = string(2, '0') + to_string(long(floor(tzf*60.0+0.5)));
		tzh = tzh.substr(tzh.length() - 2);
		rstr += ":"+tzh;
	}
	fm = ceDateTime::ReplaceAll(fm, fstr, rstr);
	//--------------------------------------------------------
	return fm;
}
//-------------------------------------------------------------------------
// convert date time string to jd
// inputs
//  tstr : time string
//    accepts following formats
//    1: yyyy-mm-dd hh:nn:ss
//    2: yyyy-mm-dd hh:nn:ss.ttt
//    3: yyyymmddhhnnss
//    4: yyyymmddhhnnssttt
//    5: yyyy-mm-dd (default time is 12:00:00)
//    6: yyyymmdd (default time is 12:00:00)
//  tz : time zone offset in hours
//   [optional argument: 0 - UTC]
//  ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
//  SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
// output 
//  jd: julian date 
//    positive integer: ok
//    -1 : error
double ceDateTime::s2j(string tstr, double tz, long ct, long SG)
{
    string str,pstr;
    long y=0,m=0,d=0,h=12,n=0;
    double jd=-1;
    double s=0,ls=0;
    str= ceDateTime::GetDigits(tstr);
    if(str.length() == 8 || str.length()==14 || str.length()==17){
        pstr=str.substr(0,4); y=stol(pstr); //get year
        pstr=str.substr(4,2); m=stol(pstr); //get month
        pstr=str.substr(6,2); d=stol(pstr); //get day
		if (str.length() == 14 || str.length() == 17) {
			pstr = str.substr(8, 2); h = stol(pstr); //get hour
			pstr = str.substr(10, 2); n = stol(pstr); //get minute
			pstr = str.substr(12, 2); s = double(stol(pstr)); //get second
			if (str.length() == 17) {
				pstr = str.substr(14, 3); ls = double(stol(pstr)); //get millisecond
				s += ls / 1000.0;
			}
		}
        jd= ceDateTime::w2j(y,m,d,h,n,s,ct,SG)-tz/24.0;  // convert to UTC      
    }
    return jd;
}
//-------------------------------------------------------------------------
// set time zone in hours for this instance
void ceDateTime::SetTimezone(double tz)//set time zone
{
    if(tz<=14 || tz>=(-12)){ this->m_tz=tz; }
}
//-------------------------------------------------------------------------
// set time in jd
void ceDateTime::SetJD(double jd)
{
	this->m_jd=jd;
}
//-------------------------------------------------------------------------
// set in unix time
void ceDateTime::SetUnixTime(time_t ut)
{
    this->m_jd= ceDateTime::u2j(ut);
}
//-------------------------------------------------------------------------
// set date time for a timezone and a calendar type
void ceDateTime::SetDateTime(long year, long month, long day, long hour, long minute, double second, double tz, long ct, long SG)
{
    this->m_jd= ceDateTime::w2j(year,month,day,hour,minute,second,ct,SG)-tz/24.0;
}
//-------------------------------------------------------------------------
// set calendar type [0=British (default), 1=Gregorian, 2=Julian]
void ceDateTime::SetCT(long ct)
{
    this->m_ct=ct%3;
}
//-------------------------------------------------------------------------
// set Beginning of Gregorian calendar in JDN [default=2361222]
void ceDateTime::SetSG(long sg)
{
    this->m_SG=sg;
}
//-------------------------------------------------------------------------
// set time using a date time string
// inputs
//  tstr : time string
//    accepts following formats
//    1: yyyy-mm-dd hh:nn:ss
//    2: yyyy-mm-dd hh:nn:ss.ttt
//    3: yyyymmddhhnnss
//    4: yyyymmddhhnnssttt
//  tz : time zone offset in hours
//   [optional argument: 0 - UTC]
//  ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
//  SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
void ceDateTime::SetDateTimeString(std::string tstr, double tz, long ct, long SG)
{
	double jd= ceDateTime::s2j(tstr, tz, ct, SG);
	if (jd >= 0) this->m_jd = jd;
}
//-------------------------------------------------------------------------
// Get Date Time string
// input: (fm: format [Optional argument: "%Www %yyyy-%mm-%d %HH:%nn:%ss %zz"])
// output: date time string according to fm where formatting strings are as follows
// %yyyy : year [0000-9999, e.g. 2018]
// %yy : year [00-99 e.g. 18]
// %MMM : month [e.g. JAN]
// %Mmm : month [e.g. Jan]
// %mm : month with zero padding [01-12]
// %M : month [e.g. January]
// %m : month [1-12]
// %dd : day with zero padding [01-31]
// %d : day [1-31]
// %HH : hour [00-23]
// %hh : hour [01-12]
// %H : hour [0-23]
// %h : hour [1-12]
// %AA : AM or PM
// %aa : am or pm
// %nn : minute with zero padding [00-59]
// %n : minute [0-59]
// %ss : second [00-59]
// %s : second [0-59]
// %lll : millisecond [000-999]
// %l : millisecond [0-999]
// %WWW : Weekday [e.g. SAT]
// %Www : Weekday [e.g. Sat]
// %W : Weekday [e.g. Saturday]
// %w : Weekday number [0=sat, 1=sun, ..., 6=fri]
// %zz : time zone (e.g. +08, +06:30)
string ceDateTime::ToString(string fm)
{
	return ceDateTime::j2s(this->m_jd, fm, this->m_tz,this->m_ct,this->m_SG);
}
//-------------------------------------------------------------------------
// filter input string to get digits only
string ceDateTime::GetDigits(string str)
{
	string ostr = "";
	size_t len = str.length();
	if (len>0) {
		for (size_t i = 0; i<len; i++)
			if (str[i] >= '0' && str[i] <= '9') ostr += str[i];
	}
	return ostr;
}
//-------------------------------------------------------------------------
// find a string and replace all occurances
std::string ceDateTime::ReplaceAll(std::string str, std::string fstr, std::string rstr)
{
	size_t i = 0;
	while (true) {
		i = str.find(fstr, i);
		if (i == string::npos) break;
		str.replace(i, fstr.length(), rstr);
		i += rstr.length();
	}
	return str;
}
//-------------------------------------------------------------------------
double ceDateTime::jd() { return this->m_jd; }
double ceDateTime::jdl() { return (this->m_jd+this->m_tz/24.0); } // jd for this time zone
long ceDateTime::jdn() { return long(round(this->m_jd)); }
long ceDateTime::jdnl() { return (long)round(this->m_jd+this->m_tz/24.0); } // jdn for this time zone
long ceDateTime::y() { 
	long y,m,d,h,n; double s;
	ceDateTime::j2w(this->jdl(),y,m,d,h,n,s,this->m_ct,this->m_SG);
	return y; 
} // year

long ceDateTime::m() { 
	long y,m,d,h,n; double s;
	ceDateTime::j2w(this->jdl(),y,m,d,h,n,s,this->m_ct,this->m_SG);
	return m; 
} // month

long ceDateTime::d() { 
	long y,m,d,h,n; double s;
	ceDateTime::j2w(this->jdl(),y,m,d,h,n,s,this->m_ct,this->m_SG);
	return d; 
} // day
long ceDateTime::h() { 
	long y,m,d,h,n; double s;
	ceDateTime::j2w(this->jdl(),y,m,d,h,n,s,this->m_ct,this->m_SG);
	return h; 
} // hour [0-23]

long ceDateTime::n() { 
	long y,m,d,h,n; double s;
	ceDateTime::j2w(this->jdl(),y,m,d,h,n,s,this->m_ct,this->m_SG);
	return n; 
} // minute

long ceDateTime::s() { 
	long y,m,d,h,n; double s;
	ceDateTime::j2w(this->jdl(),y,m,d,h,n,s,this->m_ct,this->m_SG);
	long si=(long)floor(s); //shold not take round to make sure s<60
	return si;  
} // second

long ceDateTime::l() { 
	long y,m,d,h,n; double s;
	ceDateTime::j2w(this->jdl(),y,m,d,h,n,s,this->m_ct,this->m_SG);
	long si=(long)floor(s); //shold not take round to make sure s<60
	long l= long(floor((s-double(si))*1000)); // not rounding
	return l;
} // millisecond

long ceDateTime::w() { return (this->jdnl()+2)%7;} // weekday [0=sat, 1=sun, ..., 6=fri]

long ceDateTime::ut() { return ceDateTime::j2u(this->m_jd);} // unix time
double ceDateTime::tz() { return this->m_tz; } // time zone in hour 
long ceDateTime::ct(){ return this->m_ct; } // calendar type [0=British (default), 1=Gregorian, 2=Julian]
long ceDateTime::SG(){ return this->m_SG; } // Beginning of Gregorian calendar in JDN [default=2361222]
long ceDateTime::mlen() // length of this month
	{ return ceDateTime::wml(this->y(),this->m(),m_ct,m_SG); } 
//-------------------------------------------------------------------------
// find the length of western month
// input: (y=year, m=month [Jan=1, ... , Dec=12],
//  ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian])
//  SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
// output: (wml = length of the month)
long ceDateTime::wml(long y,long m,long ct,long SG) {
	long j1,j2; long m2=m+1; long  y2=y;
	if(m2>12){y2++; m2%=12;}
	j1=long(ceDateTime::w2j(y,m,1,12,0,0,ct,SG));
	j2=long(ceDateTime::w2j(y2,m2,1,12,0,0,ct,SG));
	return (j2-j1);
}
//-------------------------------------------------------------------------
} //namespace ce