// File: ceDateTime.h
// Description: Simple C++ Date/time class
// WebSite: https://yan9a.github.io/mcal/
// MIT License (https://opensource.org/licenses/MIT)
// Copyright (c) 2018 Yan Naing Aye

#ifndef CEDATETIME_H
#define CEDATETIME_H

#include<string> 
#if defined(_WIN64) || defined(__WIN32__) || defined(_WIN32) || defined(WIN32) || defined(__WINDOWS__) || defined(__TOS_WIN__)
    #define ceWINDOWS 
	#include<time.h>
#elif defined(unix) || defined(__unix) || defined(__unix__)
    #define ceLINUX
	#include<time.h>
#else 
    #define ceSYSTEMINDEPENDENT  //the system might not even have RTC, like microcontrollers

#endif // defined

namespace ce {

class ceDateTime
{
private:    
    double m_tz; // time zone for this particular instance 
    double m_jd; // julian date in UTC
    long m_ct; // calendar type [0=British (default), 1=Gregorian, 2=Julian]
	long m_SG; // Beginning of Gregorian calendar in JDN [default=2361222]
public:    
    // Time to Fraction of day starting from 12 noon
    // input: (h=hour, n=minute, s=second) output: (d: fraction of day)
    static double t2d(long h,long n,double s);

    //Western date to Julian date
	//Credit4 Gregorian2JD: http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html
    //input: (y: year, m: month, d: day, h=hour, n=minute, s=second
    // ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
    // SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
    //     Gregorian start in British calendar (1752/Sep/14 = 2361222)
    //output: Julian date
    static double w2j(long year, long month, long day, long hour=12, long minute=0, double second=0, long ct=0, long SG=2361222);

    //Julian date to Western date
    //Credit4 Gregorian date: http://pmyers.pcug.org.au/General/JulianDates.htm
    //Credit4 Julian Calendar: http://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
    //input: (jd:julian date,
    // ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
    // SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
    //output: Western date (y=year, m=month, d=day, h=hour, n=minute, s=second)
    static void j2w(double jd, long& year, long& month, long& day, long& hour, long& minute, double& second, long ct=0, long SG=2361222);

    // unix time to julian date
    static double u2j(time_t ut);

    // julian date to unix time
    static time_t j2u(double jd);

    // Compile time string
    static std::string compiletime();

#ifndef ceSYSTEMINDEPENDENT
    // get current time in julian date
    static double jdnow();

    // get local time zone offset between local time and UTC in hours (e.g. 8 for UTC +8)
    static double ltzoh();

    // Set local date time of the system
    // need super user privileges
	static void SetSystemLocalTime(int year, int month, int day,int hour, int minute, int second);

	// set time to now
	void Set2Now();

	// set time zone in hours to the system's local time zone
	void SetTimezone();//set to local time zone

	ceDateTime();//default constructor

#endif //ceSYSTEMINDEPENDENT

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
    static std::string j2s(double jd, std::string fm="%Www %yyyy-%mm-%dd %HH:%nn:%ss %zz", double tz=0, long ct=0, long SG=2361222);

    // convert date time string to jd
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
    // output 
    //  jd: julian date 
    //    positive integer: ok
    //    -1 : error
    static double s2j(std::string tstr, double tz=0, long ct=0, long SG=2361222);   

    // set time zone in hours for this instance
	void SetTimezone(double tz);

    // set time in jd
    void SetJD(double jd);

    // set in unix time
    void SetUnixTime(time_t ut);

    // set date time for a timezone and a calendar type
    void SetDateTime(long year, long month, long day, long hour=12, long minute=0, double second=0, double tz=0, long ct=0, long SG=2361222);

    // set time using a date time string
    void SetDateTimeString(std::string tstr, double tz=0, long ct=0, long SG=2361222);    

    // set calendar type [0=British (default), 1=Gregorian, 2=Julian]
    void SetCT(long ct);

    //-------------------------------------------------------------------------
    // set Beginning of Gregorian calendar in JDN [default=2361222]
    void SetSG(long sg);

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
	std::string ToString(std::string fm = "%Www %yyyy-%mm-%dd %HH:%nn:%ss %zz");

	// filter input string to get digits only
	static std::string GetDigits(std::string str);

	// find a string and replace all occurances
	static std::string ReplaceAll(std::string str,std::string fstr,std::string rstr);

	double jd(); // julian date
    double jdl(); // julian date for this time zone
	long jdn(); // julian day number
    long jdnl(); // julian day number for this time zone
	long y(); // year
	long m(); // month
	long d(); // day
	long h(); // hour [0-23]
	long n(); // minute
	long s(); // second
	long l(); // millisecond
	long w(); // weekday [0=sat, 1=sun, ..., 6=fri]
	long ut(); // unix time
	double tz(); // time zone 
    long ct(); // calendar type [0=British (default), 1=Gregorian, 2=Julian]
    long SG(); // Beginning of Gregorian calendar in JDN [default=2361222]
    long mlen(); // length of this month
    //-------------------------------------------------------------------------
    // find the length of western month
    // input: (y=year, m=month [Jan=1, ... , Dec=12],
    //  ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian])
    //  SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
    // output: (wml = length of the month)
    static long wml(long y,long m,long ct=0,long SG=2361222);
    //-------------------------------------------------------------------------
};

} // namespace ce

#endif // CEDATETIME_H
