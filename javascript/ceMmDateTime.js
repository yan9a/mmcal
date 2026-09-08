// File: ceMmDateTime.js
// Description: Modern Myanmar Calendrical Calculations
// Version: 20250726
//-------------------------------------------------------------------------
// WebSite: https://yan9a.github.io/mmcal/
// MIT License (https://opensource.org/licenses/MIT)
// Copyright (c) 2018 Yan Naing Aye
// Doc: http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
//-------------------------------------------------------------------------
// Usage: <script src="./javascript/ceMmDateTime.js"></script>
// Await ceMmChronicleDataReady before creating or rendering ceMmChronicle data.
// Example: ceMmChronicleDataReady.then(() => new ceMmChronicle());
(() => {
  const baseUrl = new URL('.', document.currentScript.src);
  const chronicleData = [
    ['chronicle-rulers.json', 'ceMmChronicleRulers'],
    ['chronicle-dynasties.json', 'ceMmChronicleDynasties', {}],
    ['chronicle-events.json', 'ceMmChronicleEvents'],
  ];

  for (const [, globalName, fallback = []] of chronicleData) {
    globalThis[globalName] = fallback;
  }

  globalThis.ceMmChronicleDataReady = Promise.all(
    chronicleData.map(async ([filename, globalName, fallback = []]) => {
      const dataUrl = new URL(filename, baseUrl);
      try {
        const response = await fetch(dataUrl, {
          signal: AbortSignal.timeout(3000),
        });
        if (!response.ok)
          throw new Error(`Unable to load chronicle data: ${dataUrl}`);
        globalThis[globalName] = JSON.parse(await response.text());
      } catch {
        globalThis[globalName] = fallback;
      }
    }),
  );
})();
//-------------------------------------------------------------------------
class ceDateTime {
  constructor(m_jd, m_tz, m_ct = 0, m_SG = 2361222) {
    // 2361222 - Gregorian start in British calendar (1752/Sep/14)
    if (m_tz == undefined) this.m_tz = ceDateTime.ltzoh();
    else this.m_tz = m_tz; // time zone for this particular instance
    if (m_jd == undefined) this.m_jd = ceDateTime.jdnow();
    else this.m_jd = m_jd; // julian date in UTC
    this.m_ct = m_ct; // calendar type [0=British (default), 1=Gregorian, 2=Julian]
    this.m_SG = m_SG; // Beginning of Gregorian calendar in JDN [default=2361222]
  }
  //Start of core functions #############################################################
  //-------------------------------------------------------------------------
  //Julian date to Western date
  //Credit4 Gregorian date: http://pmyers.pcug.org.au/General/JulianDates.htm
  //Credit4 Julian Calendar: http://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
  //input: (jd:julian date,
  // ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
  // SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
  //output: Western date (y=year, m=month, d=day, h=hour, n=minute, s=second)
  static j2w(jd, ct = 0, SG = 2361222) {
    // 2361222-Gregorian start in British calendar (1752/Sep/14)
    var j, jf, y, m, d, h, n, s;
    if (ct == 2 || (ct == 0 && jd < SG)) {
      var b, c, f, e;
      j = Math.floor(jd + 0.5);
      jf = jd + 0.5 - j;
      b = j + 1524;
      c = Math.floor((b - 122.1) / 365.25);
      f = Math.floor(365.25 * c);
      e = Math.floor((b - f) / 30.6001);
      m = e > 13 ? e - 13 : e - 1;
      d = b - f - Math.floor(30.6001 * e);
      y = m < 3 ? c - 4715 : c - 4716;
    } else {
      j = Math.floor(jd + 0.5);
      jf = jd + 0.5 - j;
      j -= 1721119;
      y = Math.floor((4 * j - 1) / 146097);
      j = 4 * j - 1 - 146097 * y;
      d = Math.floor(j / 4);
      j = Math.floor((4 * d + 3) / 1461);
      d = 4 * d + 3 - 1461 * j;
      d = Math.floor((d + 4) / 4);
      m = Math.floor((5 * d - 3) / 153);
      d = 5 * d - 3 - 153 * m;
      d = Math.floor((d + 5) / 5);
      y = 100 * y + j;
      if (m < 10) {
        m += 3;
      } else {
        m -= 9;
        y = y + 1;
      }
    }
    jf *= 24;
    h = Math.floor(jf);
    jf = (jf - h) * 60;
    n = Math.floor(jf);
    s = (jf - n) * 60;
    return { y: y, m: m, d: d, h: h, n: n, s: s };
  }
  //-------------------------------------------------------------------------
  //Time to Fraction of day starting from 12 noon
  //input: (h=hour, n=minute, s=second) output: (d: fraction of day)
  static t2d(h, n, s) {
    return (h - 12) / 24 + n / 1440 + s / 86400;
  }
  //-------------------------------------------------------------------------
  //Western date to Julian date
  //Credit4 Gregorian2JD: http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html
  //input: (y: year, m: month, d: day, h=hour, n=minute, s=second,
  // ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
  // SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
  //output: Julian date
  static w2j(y, m, d, h = 12, n = 0, s = 0, ct = 0, SG = 2361222) {
    // 2361222-Gregorian start in British calendar (1752/Sep/14)
    var a = Math.floor((14 - m) / 12);
    y = y + 4800 - a;
    m = m + 12 * a - 3;
    var jd = d + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4);
    if (ct == 1) jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    else if (ct == 2) jd = jd - 32083;
    else {
      jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
      if (jd < SG) {
        jd =
          d +
          Math.floor((153 * m + 2) / 5) +
          365 * y +
          Math.floor(y / 4) -
          32083;
        if (jd > SG) jd = SG;
      }
    }
    return jd + ceDateTime.t2d(h, n, s);
  }
  //-------------------------------------------------------------------------
  // convert unix timestamp to jd
  static u2j(ut) {
    //number of seconds from 1970 Jan 1 00:00:00 (UTC)
    var jd = 2440587.5 + ut / 86400.0; //converte to day(/24h/60min/60sec) and to JD
    return jd;
  }
  //-------------------------------------------------------------------------
  // julian date to unix time
  static j2u(jd) {
    return (jd - 2440587.5) * 86400.0 + 0.5;
  }
  //-------------------------------------------------------------------------
  // get current time in julian date
  static jdnow() {
    var dt = new Date();
    // the number of milliseconds since 1 January 1970 00:00:00 / 1000
    var ut = dt.getTime() / 1000.0;
    return ceDateTime.u2j(ut);
  }
  //-------------------------------------------------------------------------
  // get local time zone offset between local time and UTC in days
  static ltzoh() {
    var dt = new Date();
    // the difference, in minutes, between UTC and local time
    var tz = dt.getTimezoneOffset() / 60.0;
    return -tz; // between local time and UTC
  }
  //-------------------------------------------------------------------------
  // jd to date time string
  // input: (jd:julian date,
  //  fs: format string [Optional argument: "%Www %y-%mm-%dd %HH:%nn:%ss %zz"]
  //  tz : time zone offset in hours (e.g. 8 for GMT +8)
  //  ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
  //  SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
  // output: date time string according to fm where formatting strings are as follows
  // %yyyy : year [0000-9999, e.g. 2018]
  // %yy : year [00-99 e.g. 18]
  // %y : year [0-9999, e.g. 201]
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
  static j2s(
    jd,
    fs = '%Www %y-%mm-%dd %HH:%nn:%ss %zz',
    tz = 0,
    ct = 0,
    SG = 2361222,
  ) {
    jd += tz / 24.0;
    var dt = ceDateTime.j2w(jd, ct, SG);
    var s = Math.floor(dt.s); //shold not take round to make sure s<60
    var l = Math.floor((dt.s - s) * 1000); // not rounding
    var jdn = Math.floor(jd + 0.5);
    var wd = (jdn + 2) % 7; //week day [0=sat, 1=sun, ..., 6=fri]
    var h = dt.h % 12;
    if (h == 0) h = 12;
    var W = [
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ];
    var M = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // replace format string with values
    var fm = fs;
    var fstr, rstr, re;
    //--------------------------------------------------------
    fstr = '%yyyy';
    re = new RegExp(fstr, 'g');
    rstr = '0000' + dt.y.toString();
    rstr = rstr.substr(rstr.length - 4);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%yy';
    var y = dt.y % 100;
    re = new RegExp(fstr, 'g');
    rstr = '00' + y.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%y';
    re = new RegExp(fstr, 'g');
    rstr = dt.y.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%MMM';
    re = new RegExp(fstr, 'g');
    rstr = M[dt.m - 1];
    rstr = rstr.substr(0, 3);
    rstr = rstr.toUpperCase();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%Mmm';
    re = new RegExp(fstr, 'g');
    rstr = M[dt.m - 1];
    rstr = rstr.substr(0, 3);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%mm';
    re = new RegExp(fstr, 'g');
    rstr = '00' + dt.m.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%M';
    re = new RegExp(fstr, 'g');
    rstr = M[dt.m - 1];
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%m';
    re = new RegExp(fstr, 'g');
    rstr = dt.m.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%dd';
    re = new RegExp(fstr, 'g');
    rstr = '00' + dt.d.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%d';
    re = new RegExp(fstr, 'g');
    rstr = dt.d.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%HH';
    re = new RegExp(fstr, 'g');
    rstr = '00' + dt.h.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%H';
    re = new RegExp(fstr, 'g');
    rstr = dt.h.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%hh';
    re = new RegExp(fstr, 'g');
    rstr = '00' + h.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%h';
    re = new RegExp(fstr, 'g');
    rstr = h.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%AA';
    re = new RegExp(fstr, 'g');
    rstr = dt.h < 12 ? 'AM' : 'PM';
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%aa';
    re = new RegExp(fstr, 'g');
    rstr = dt.h < 12 ? 'am' : 'pm';
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%nn';
    re = new RegExp(fstr, 'g');
    rstr = '00' + dt.n.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%n';
    re = new RegExp(fstr, 'g');
    rstr = dt.n.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%ss';
    re = new RegExp(fstr, 'g');
    rstr = '00' + s.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%s';
    re = new RegExp(fstr, 'g');
    rstr = s.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%lll';
    re = new RegExp(fstr, 'g');
    rstr = '000' + l.toString();
    rstr = rstr.substr(rstr.length - 3);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%l';
    re = new RegExp(fstr, 'g');
    rstr = l.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%WWW';
    re = new RegExp(fstr, 'g');
    rstr = W[wd];
    rstr = rstr.substr(0, 3);
    rstr = rstr.toUpperCase();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%Www';
    re = new RegExp(fstr, 'g');
    rstr = W[wd];
    rstr = rstr.substr(0, 3);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%W';
    re = new RegExp(fstr, 'g');
    rstr = W[wd];
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%w';
    re = new RegExp(fstr, 'g');
    rstr = wd.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '%zz';
    re = new RegExp(fstr, 'g');
    var tzs = tz < 0 ? '-' : '+';
    var tzi = Math.floor(tz);
    var tzh = '00' + tzi.toString();
    tzh = tzh.substr(tzh.length - 2);
    rstr = tzs + tzh;
    var tzf = tz - tzi;
    if (tzf > 0) {
      tzh = '00' + Math.floor(tzf * 60.0 + 0.5).toString();
      tzh = tzh.substr(tzh.length - 2);
      rstr += ':' + tzh;
    }
    fm = fm.replace(re, rstr);
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
  static s2j(tstr, tz = 0, ct = 0, SG = 2361222) {
    var str, pstr;
    var y = 0,
      m = 0,
      d = 0,
      h = 12,
      n = 0,
      s = 0,
      ls = 0;
    var jd = -1;
    str = ceDateTime.GetDigits(tstr);
    if (str.length == 8 || str.length == 14 || str.length == 17) {
      pstr = str.substr(0, 4);
      y = parseInt(pstr); //get year
      pstr = str.substr(4, 2);
      m = parseInt(pstr); //get month
      pstr = str.substr(6, 2);
      d = parseInt(pstr); //get day
      if (str.length == 14 || str.length == 17) {
        pstr = str.substr(8, 2);
        h = parseInt(pstr); //get hour
        pstr = str.substr(10, 2);
        n = parseInt(pstr); //get minute
        pstr = str.substr(12, 2);
        s = parseInt(pstr); //get second
        if (str.length == 17) {
          pstr = str.substr(14, 3);
          ls = parseInt(pstr);
          s += ls / 1000.0;
        }
      }
      jd = ceDateTime.w2j(y, m, d, h, n, s, ct, SG) - tz / 24.0; // convert to UTC
    }
    return jd;
  }
  //-------------------------------------------------------------------------
  // set time zone in hours for this instance
  SetTimezone(tz) {
    //set time zone
    if (tz == undefined) {
      this.m_tz = ceDateTime.ltzoh();
    } else if (tz <= 14 || tz >= -12) {
      this.m_tz = tz;
    }
  }
  //-------------------------------------------------------------------------
  // set time to now
  Set2Now() {
    this.m_jd = ceDateTime.jdnow();
  }
  //-------------------------------------------------------------------------
  // set time in jd
  SetJD(jd) {
    this.m_jd = jd;
  }
  //-------------------------------------------------------------------------
  // set in unix time
  SetUnixTime(ut) {
    this.m_jd = ceDateTime.u2j(ut);
  }
  //-------------------------------------------------------------------------
  // set date time for a timezone and a calendar type
  // timezone and calendar type won't be affected (tz and ct remain unchanged)
  SetDateTime(
    year,
    month,
    day,
    hour = 12,
    minute = 0,
    second = 0,
    tz = 0,
    ct = 0,
    SG = 2361222,
  ) {
    this.m_jd =
      ceDateTime.w2j(year, month, day, hour, minute, second, ct, SG) -
      tz / 24.0;
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
  SetDateTimeString(tstr, tz = 0, ct = 0, SG = 2361222) {
    var jd = ceDateTime.s2j(tstr, tz, ct, SG);
    if (jd >= 0) this.m_jd = jd;
  }
  //-------------------------------------------------------------------------
  // set calendar type [0=British (default), 1=Gregorian, 2=Julian]
  SetCT(ct) {
    ct = Math.round(ct % 3);
    this.m_ct = ct;
  }
  //-------------------------------------------------------------------------
  // set Beginning of Gregorian calendar in JDN [default=2361222]
  SetSG(sg) {
    sg = Math.round(sg);
    this.m_SG = sg;
  }
  //-------------------------------------------------------------------------
  // Get Date Time string
  // input: (fs: format string [Optional argument: "%Www %y-%mm-%dd %HH:%nn:%ss %zz"])
  // output: date time string according to fm where formatting strings are as follows
  // %yyyy : year [0000-9999, e.g. 2018]
  // %yy : year [00-99 e.g. 18]
  // %y : year [0-9999, e.g. 201]
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
  ToString(fs = '%Www %y-%mm-%dd %HH:%nn:%ss %zz') {
    return ceDateTime.j2s(this.m_jd, fs, this.m_tz, this.m_ct, this.m_SG);
  }
  //-------------------------------------------------------------------------
  // filter input string to get digits only
  static GetDigits(str) {
    var ostr = '';
    var len = str.length;
    var i = 0;
    if (len > 0) {
      for (i = 0; i < len; i++)
        if (str[i] >= '0' && str[i] <= '9') ostr += str[i];
    }
    return ostr;
  }
  //-------------------------------------------------------------------------
  // get properties
  get jd() {
    return this.m_jd;
  } // julian date
  get jdl() {
    return this.m_jd + this.m_tz / 24.0;
  } // julian date for this time zone
  get jdn() {
    return Math.round(this.m_jd);
  } // julian date number
  get jdnl() {
    return Math.round(this.m_jd + this.m_tz / 24.0);
  } // julian date number for this time zone
  get y() {
    var dt = ceDateTime.j2w(this.jdl, this.m_ct, this.m_SG);
    return dt.y;
  } // year

  get m() {
    var dt = ceDateTime.j2w(this.jdl, this.m_ct, this.m_SG);
    return dt.m;
  } // month

  get d() {
    var dt = ceDateTime.j2w(this.jdl, this.m_ct, this.m_SG);
    return dt.d;
  } // day

  get h() {
    var dt = ceDateTime.j2w(this.jdl, this.m_ct, this.m_SG);
    return dt.h;
  } // hour [0-23]

  get n() {
    var dt = ceDateTime.j2w(this.jdl, this.m_ct, this.m_SG);
    return dt.n;
  } // minute

  get s() {
    var dt = ceDateTime.j2w(this.jdl, this.m_ct, this.m_SG);
    var s = Math.floor(dt.s); //shold not take round to make sure s<60
    return s;
  } // second

  get l() {
    var dt = ceDateTime.j2w(this.jdl, this.m_ct, this.m_SG);
    var s = Math.floor(dt.s); //shold not take round to make sure s<60
    var l = Math.floor((dt.s - s) * 1000); // not rounding
    return l;
  } // millisecond

  get w() {
    return (this.jdnl + 2) % 7;
  } // weekday [0=sat, 1=sun, ..., 6=fri]
  get ut() {
    return ceDateTime.j2u(this.m_jd);
  } // unix time
  get tz() {
    return this.m_tz;
  } // time zone
  get ct() {
    return this.m_ct;
  } // calendar type
  get SG() {
    return this.m_SG;
  } // Beginning of Gregorian calendar in JDN [default=2361222]
  get mlen() {
    return ceDateTime.wml(this.y, this.m, this.m_ct, this.m_SG);
  } // length of this month
  //----------------------------------------------------------------------------
  // find the length of western month
  // input: (y=year, m=month [Jan=1, ... , Dec=12],
  //  ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian])
  //  SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)])
  // output: (wml = length of the month)
  static wml(y, m, ct = 0, SG = 2361222) {
    var j1, j2;
    var m2 = m + 1;
    var y2 = y;
    if (m2 > 12) {
      y2++;
      m2 %= 12;
    }
    j1 = ceDateTime.w2j(y, m, 1, 12, 0, 0, ct, SG);
    j2 = ceDateTime.w2j(y2, m2, 1, 12, 0, 0, ct, SG);
    return j2 - j1;
  }
  //-------------------------------------------------------------------------
} //ceDateTime

//-------------------------------------------------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//-------------------------------------------------------------------------

class ceMmDateTime extends ceDateTime {
  //-------------------------------------------------------------------------
  constructor(m_jd, m_tz, m_ct = 0, m_SG = 2361222, m_syt = 0) {
    super(m_jd, m_tz, m_ct, m_SG);
    this.m_syt = m_syt; // Sasana year type
    // default 0 = year depends only on the sun, do not take account moon phase for Sasana year
    // 1 = Sasana year starts on the first day of Tagu
    // 2 = Sasana year starts on Kason full moon day
  }
  //-------------------------------------------------------------------------
  // Get Myanmar year constants depending on era
  // Thanks to Myo Zarny and Wunna Ko for earlier Myanmar years data
  // input: my = myanmar year
  // output:
  //  EI = Myanmar calendar era id [1-3] : calculations methods/constants depends on era
  //  WO = watat offset to compensate
  //  NM = number of months to find excess days
  //  EW = exception in watat year
  static GetMyConst(my) {
    var EI,
      WO,
      NM,
      EW = 0,
      i;
    var fme, wte;
    // The third era (the era after Independence 1312 ME and after)
    if (my >= 1312) {
      EI = 3;
      WO = -0.5;
      NM = 8;
      fme = [[1377, 1]];
      wte = [1344, 1345];
    }
    // The second era (the era under British colony: 1217 ME - 1311 ME)
    else if (my >= 1217) {
      EI = 2;
      WO = -1;
      NM = 4;
      fme = [
        [1234, 1],
        [1261, -1],
      ];
      wte = [1263, 1264];
    }
    // The first era (the era of Myanmar kings: ME1216 and before)
    // Thandeikta (ME 1100 - 1216)
    else if (my >= 1100) {
      EI = 1.3;
      WO = -0.85;
      NM = -1;
      fme = [
        [1120, 1],
        [1126, -1],
        [1150, 1],
        [1172, -1],
        [1207, 1],
      ];
      wte = [1201, 1202];
    }
    // Makaranta system 2 (ME 798 - 1099)
    else if (my >= 798) {
      EI = 1.2;
      WO = -1.1;
      NM = -1;
      fme = [
        [813, -1],
        [849, -1],
        [851, -1],
        [854, -1],
        [927, -1],
        [933, -1],
        [936, -1],
        [938, -1],
        [949, -1],
        [952, -1],
        [963, -1],
        [968, -1],
        [1039, -1],
      ];
      wte = [];
    }
    // Makaranta system 1 (ME 0 - 797)
    else {
      EI = 1.1;
      WO = -1.1;
      NM = -1;
      fme = [
        [205, 1],
        [246, 1],
        [471, 1],
        [572, -1],
        [651, 1],
        [653, 2],
        [656, 1],
        [672, 1],
        [729, 1],
        [767, -1],
      ];
      wte = [];
    }
    i = ceMmDateTime.bSearch2(my, fme);
    if (i >= 0) WO += fme[i][1]; // full moon day offset exceptions
    i = ceMmDateTime.bSearch1(my, wte);
    if (i >= 0) EW = 1; //correct watat exceptions

    return { EI: EI, WO: WO, NM: NM, EW: EW };
  }
  //----------------------------------------------------------------------------
  // Search first dimension in a 2D array
  // input: (k=key,A=array)
  // output: (i=index)
  static bSearch2(k, A) {
    var i = 0;
    var l = 0;
    var u = A.length - 1;
    while (u >= l) {
      i = Math.floor((l + u) / 2);
      if (A[i][0] > k) u = i - 1;
      else if (A[i][0] < k) l = i + 1;
      else return i;
    }
    return -1;
  }
  //-----------------------------------------------------------------------------
  // Search a 1D array
  // input: (k=key,A=array)
  // output: (i=index)
  static bSearch1(k, A) {
    var i = 0;
    var l = 0;
    var u = A.length - 1;
    while (u >= l) {
      i = Math.floor((l + u) / 2);
      if (A[i] > k) u = i - 1;
      else if (A[i] < k) l = i + 1;
      else return i;
    }
    return -1;
  }
  //-------------------------------------------------------------------------
  // Check watat (intercalary month)
  // input: (my = myanmar year)
  // output:  ( watat = intercalary month [1=watat, 0=common]
  //  fm = full moon day of 2nd Waso in jdn_mm (jdn+6.5 for MMT) [only valid when watat=1])
  // dependency: GetMyConst(my)
  static cal_watat(my) {
    //get data for respective era
    var SY = 1577917828.0 / 4320000.0; //solar year (365.2587565)
    var LM = 1577917828.0 / 53433336.0; //lunar month (29.53058795)
    var MO = 1954168.050623; //beginning of 0 ME for MMT
    var c = ceMmDateTime.GetMyConst(my); // get constants for the corresponding calendar era
    var TA = (SY / 12 - LM) * (12 - c.NM); //threshold to adjust
    var ed = (SY * (my + 3739)) % LM; // excess day
    if (ed < TA) ed += LM; //adjust excess days
    var fm = Math.round(SY * my + MO - ed + 4.5 * LM + c.WO); //full moon day of 2nd Waso
    var TW = 0,
      watat = 0; //find watat
    if (c.EI >= 2) {
      //if 2nd era or later find watat based on excess days
      TW = LM - (SY / 12 - LM) * c.NM;
      if (ed >= TW) watat = 1;
    } else {
      //if 1st era,find watat by 19 years metonic cycle
      //Myanmar year is divided by 19 and there is intercalary month
      //if the remainder is 2,5,7,10,13,15,18
      //https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
      watat = (my * 7 + 2) % 19;
      if (watat < 0) watat += 19;
      watat = Math.floor(watat / 12);
    }
    watat ^= c.EW; //correct watat exceptions
    return { fm: fm, watat: watat };
  }
  //-------------------------------------------------------------------------
  // Check Myanmar Year
  // input: (my -myanmar year)
  // output:  (myt =year type [0=common, 1=little watat, 2=big watat],
  // tg1 = the 1st day of Tagu as jdn_mm (Julian Day Number for MMT)
  // fm = full moon day of [2nd] Waso as Julain Day Number
  // werr= watat discrepancy [0=ok, 1= error] )
  // dependency: cal_watat(my)
  static cal_my(my) {
    var yd = 0,
      y1,
      nd = 0,
      werr = 0,
      fm = 0;
    var y2 = ceMmDateTime.cal_watat(my);
    var myt = y2.watat;
    do {
      yd++;
      y1 = ceMmDateTime.cal_watat(my - yd);
    } while (y1.watat == 0 && yd < 3);
    if (myt) {
      nd = (y2.fm - y1.fm) % 354;
      myt = Math.floor(nd / 31) + 1;
      fm = y2.fm;
      if (nd != 30 && nd != 31) {
        werr = 1;
      }
    } else fm = y1.fm + 354 * yd;
    var tg1 = y1.fm + 354 * yd - 102;
    return { myt: myt, tg1: tg1, fm: fm, werr: werr };
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
  static j2m(jdn) {
    jdn = Math.round(jdn); //convert jdn to integer
    var SY = 1577917828.0 / 4320000.0; //solar year (365.2587565)
    var MO = 1954168.050623; //beginning of 0 ME
    var my, yo, dd, myl, mmt, a, b, c, e, f, mm, md;
    my = Math.floor((jdn - 0.5 - MO) / SY); //Myanmar year
    yo = ceMmDateTime.cal_my(my); //check year
    dd = jdn - yo.tg1 + 1; //day count
    b = Math.floor(yo.myt / 2);
    c = Math.floor(1 / (yo.myt + 1)); //big wa and common yr
    myl = 354 + (1 - c) * 30 + b; //year length
    mmt = Math.floor((dd - 1) / myl); //month type: late =1 or early = 0
    dd -= mmt * myl;
    a = Math.floor((dd + 423) / 512); //adjust day count and threshold
    mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544); //month
    e = Math.floor((mm + 12) / 16);
    f = Math.floor((mm + 11) / 16);
    md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30; //day
    mm += f * 3 - e * 4 + 12 * mmt; // adjust month numbers for late months
    return { myt: yo.myt, my: my, mm: mm, md: md };
  }
  //-------------------------------------------------------------------------
  // Get moon phase from day of the month, month, and year type.
  // input: (
  //    md= day of the month [1-30],
  //    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
  //         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,
  //         Tabaung=12, Late Tagu=13, Late Kason=14 ],
  //    myt = year type [0=common, 1=little watat, 2=big watat])
  // output: (mp =moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon])
  static cal_mp(md, mm, myt) {
    var mml = ceMmDateTime.cal_mml(mm, myt);
    return (
      Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml)
    );
  }
  //-------------------------------------------------------------------------
  // Get length of month from month, and year type.
  // input: (
  //    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
  //         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,
  //         Tabaung=12, Late Tagu=13, Late Kason=14 ],
  //    myt = year type [0=common, 1=little watat, 2=big watat])
  // output: (mml = length of the month [29 or 30 days])
  static cal_mml(mm, myt) {
    var mml = 30 - (mm % 2); //month length
    if (mm == 3) mml += Math.floor(myt / 2); //adjust if Nayon in big watat
    return mml;
  }
  //-------------------------------------------------------------------------
  // Get the apparent length of the year from year type.
  // input: ( myt = year type [0=common, 1=little watat, 2=big watat])
  // output: ( myl= year length [354, 384, or 385 days])
  static cal_myl(myt) {
    return 354 + (1 - Math.floor(1 / (myt + 1))) * 30 + Math.floor(myt / 2);
  }
  //-------------------------------------------------------------------------
  // Get fortnight day from month day
  // input: ( md= day of the month [1-30])
  // output: (mf= fortnight day [1 to 15])
  static cal_mf(md) {
    return md - 15 * Math.floor(md / 16);
  }
  //-------------------------------------------------------------------------
  // Get day of month from fortnight day, moon phase, and length of the month
  // input: (
  //   mf = fortnight day [1 to 15],
  //   mp = moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon]
  //   mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
  //        Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,
  //        Tabaung=12, Late Tagu=13, Late Kason=14 ],
  //   myt = year type [0=common, 1=little watat, 2=big watat])
  // output: ( md = day of the month [1-30])
  static cal_md(mf, mp, mm, myt) {
    var mml = ceMmDateTime.cal_mml(mm, myt);
    var m1 = mp % 2;
    var m2 = Math.floor(mp / 2);
    return m1 * (15 + m2 * (mml - 15)) + (1 - m1) * (mf + 15 * m2);
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
  static m2j(my, mm, md) {
    var b, c, dd, myl, mmt;
    var yo = ceMmDateTime.cal_my(my); //check year
    mmt = Math.floor(mm / 13);
    mm = (mm % 13) + mmt; // to 1-12 with month type
    b = Math.floor(yo.myt / 2);
    c = 1 - Math.floor((yo.myt + 1) / 2); //if big watat and common year
    mm += 4 - Math.floor((mm + 15) / 16) * 4 + Math.floor((mm + 12) / 16); //adjust month
    dd =
      md +
      Math.floor(29.544 * mm - 29.26) -
      c * Math.floor((mm + 11) / 16) * 30 +
      b * Math.floor((mm + 12) / 16);
    myl = 354 + (1 - c) * 30 + b;
    dd += mmt * myl; //adjust day count with year length
    return dd + yo.tg1 - 1;
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
  //  	default 0 = year depends only on the sun, do not take account moon phase for Sasana year
  //  	1 = Sasana year starts on the first day of Tagu
  //  	2 = Sasana year starts on Kason full moon day
  //	]
  // output: (sy -Sasana year)
  //
  // Description: Pull Request #9 by Chan Mrate Ko Ko
  // Proposal to mark Kason full moon day (Buddha's birthday) as the start of the Sasana year.
  // This suggestion references certain versions of the Shan and Rakhine Calendars.
  // On the other hand, the Sasana year starts on the first day of Tagu
  // Ref: https://my.wikipedia.org/wiki/%E1%80%9E%E1%80%AC%E1%80%9E%E1%80%94%E1%80%AC_%E1%80%9E%E1%80%80%E1%80%B9%E1%80%80%E1%80%9B%E1%80%AC%E1%80%87%E1%80%BA
  // It aligns with Shan culture, where the new year begins on the first day of Nadaw,
  // incorporating the lunar phase into the new year calculation.
  // Conversely, Burmese culture sets the new year independently of the moon phase.
  // This update offers flexibility in defining the Sasana year which is preferable to enforcing a single fixed approach.
  static my2sy(my, mm, md, k = 0) {
    var buddhistEraOffset = 1182; // traditional offset for Sasana year
    if (k == 1) {
      if (mm >= 13) buddhistEraOffset = 1183; // if late Tagu or late Kason, then Sasana year is next year
    } else if (k == 2) {
      if (mm == 1 || (mm == 2 && md < 15)) buddhistEraOffset = 1181; // if before Kason full moon, then previous year
    }
    return my + buddhistEraOffset;
  }
  //-------------------------------------------------------------------------
  // set Myanmar date time for a timezone and a calendar type
  // timezone and calendar type won't be affected (tz and ct remain unchanged)
  // input:  (
  //  my = year,
  //  mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
  //    Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,
  //    Tabaung=12 , Late Tagu=13, Late Kason=14 ],
  //  md = day of the month [1-30]
  // ... )
  SetMDateTime(my, mm, md, hour = 12, minute = 0, second = 0, tz = 0) {
    this.m_jd =
      ceMmDateTime.m2j(my, mm, md) +
      ceDateTime.t2d(hour, minute, second) -
      tz / 24.0;
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
  static cal_sabbath(md, mm, myt) {
    var mml = ceMmDateTime.cal_mml(mm, myt);
    var s = 0;
    if (md == 8 || md == 15 || md == 23 || md == mml) s = 1;
    if (md == 7 || md == 14 || md == 22 || md == mml - 1) s = 2;
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
  static cal_yatyaza(mm, wd) {
    //first waso is considered waso
    var m1 = mm % 4;
    var yatyaza = 0;
    var wd1 = Math.floor(m1 / 2) + 4;
    var wd2 = (1 - Math.floor(m1 / 2) + (m1 % 2)) * (1 + 2 * (m1 % 2));
    if (wd == wd1 || wd == wd2) yatyaza = 1;
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
  static cal_pyathada(mm, wd) {
    //first waso is considered waso
    var m1 = mm % 4;
    var pyathada = 0;
    var wda = [1, 3, 3, 0, 2, 1, 2];
    if (m1 == 0 && wd == 4) pyathada = 2; //afternoon pyathada
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
  static cal_nagahle(mm) {
    if (mm <= 0) mm = 4; //first waso is considered waso
    return Math.floor((mm % 12) / 3);
  }
  //-------------------------------------------------------------------------
  // mahabote
  // input: (
  //  my = year,
  //  wd= weekday  [0=sat, 1=sun, ..., 6=fri])
  // output: ( [0=Binga, 1=Atun, 2=Yaza, 3=Adipati, 4= Marana, 5=Thike, 6=Puti])
  static cal_mahabote(my, wd) {
    return (my - wd) % 7;
  }
  //-------------------------------------------------------------------------
  // nakhat
  // input: ( my = year )
  // output: ( [0=Ogre, 1=Elf, 2=Human] )
  static cal_nakhat(my) {
    return my % 3;
  }
  //-------------------------------------------------------------------------
  // thamanyo
  // input: (
  //    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
  //         Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,
  //         Tabaung=12, Late Tagu=13, Late Kason=14 ],
  //    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
  // output: ( [1=thamanyo, 0=else])
  static cal_thamanyo(mm, wd) {
    var mmt = Math.floor(mm / 13);
    mm = (mm % 13) + mmt; // to 1-12 with month type
    if (mm <= 0) mm = 4; //first waso is considered waso (looks no need here)
    var thamanyo = 0;
    var m1 = mm - 1 - Math.floor(mm / 9);
    var wd1 = (m1 * 2 - Math.floor(m1 / 8)) % 7;
    var wd2 = (wd + 7 - wd1) % 7;
    if (wd2 <= 1) thamanyo = 1;
    return thamanyo;
  }
  //-------------------------------------------------------------------------
  // Get amyeittasote
  // input: (
  //    md= day of the month [1-30],
  //    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
  // output: ( [1=amyeittasote, 0=else])
  static cal_amyeittasote(md, wd) {
    var mf = md - 15 * Math.floor(md / 16); //get fortnight day [0-15]
    var amyeittasote = 0;
    var wda = [5, 8, 3, 7, 2, 4, 1];
    if (mf == wda[wd]) amyeittasote = 1;
    return amyeittasote;
  }
  //-------------------------------------------------------------------------
  // Get warameittugyi
  // input: (
  //    md= day of the month [1-30],
  //    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
  // output: ( [1=warameittugyi, 0=else])
  static cal_warameittugyi(md, wd) {
    var mf = md - 15 * Math.floor(md / 16); //get fortnight day [0-15]
    var warameittugyi = 0;
    var wda = [7, 1, 4, 8, 9, 6, 3];
    if (mf == wda[wd]) warameittugyi = 1;
    return warameittugyi;
  }
  //-------------------------------------------------------------------------
  // Get warameittunge
  // input: (
  //    md= day of the month [1-30],
  //    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
  // output: ( [1=warameittunge, 0=else])
  static cal_warameittunge(md, wd) {
    var mf = md - 15 * Math.floor(md / 16); //get fortnight day [0-15]
    var warameittunge = 0;
    var wn = (wd + 6) % 7;
    if (12 - mf == wn) warameittunge = 1;
    return warameittunge;
  }
  //-------------------------------------------------------------------------
  // Get yatpote
  // input: (
  //    md= day of the month [1-30],
  //    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
  // output: ( [1=yatpote, 0=else])
  static cal_yatpote(md, wd) {
    var mf = md - 15 * Math.floor(md / 16); //get fortnight day [0-15]
    var yatpote = 0;
    var wda = [8, 1, 4, 6, 9, 8, 7];
    if (mf == wda[wd]) yatpote = 1;
    return yatpote;
  }
  //-------------------------------------------------------------------------
  // Get thamaphyu
  // input: (
  //    md= day of the month [1-30],
  //    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
  // output: ( [1=thamaphyu, 0=else])
  static cal_thamaphyu(md, wd) {
    var mf = md - 15 * Math.floor(md / 16); //get fortnight day [0-15]
    var thamaphyu = 0;
    var wda = [1, 2, 6, 6, 5, 6, 7];
    if (mf == wda[wd]) thamaphyu = 1;
    var wdb = [0, 1, 0, 0, 0, 3, 3];
    if (mf == wdb[wd]) thamaphyu = 1;
    if (mf == 4 && wd == 5) thamaphyu = 1;
    return thamaphyu;
  }
  //-------------------------------------------------------------------------
  // Get nagapor
  // input: (
  //    md= day of the month [1-30],
  //    wd= weekday  [0=sat, 1=sun, ..., 6=fri])
  // output: ( [1=nagapor, 0=else])
  static cal_nagapor(md, wd) {
    var nagapor = 0;
    var wda = [26, 21, 2, 10, 18, 2, 21];
    if (md == wda[wd]) nagapor = 1;
    var wdb = [17, 19, 1, 0, 9, 0, 0];
    if (md == wdb[wd]) nagapor = 1;
    if ((md == 2 && wd == 1) || ((md == 12 || md == 4 || md == 18) && wd == 2))
      nagapor = 1;
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
  static cal_yatyotema(mm, md) {
    var mmt = Math.floor(mm / 13);
    mm = (mm % 13) + mmt; // to 1-12 with month type
    if (mm <= 0) mm = 4; //first waso is considered waso
    var mf = md - 15 * Math.floor(md / 16); //get fortnight day [0-15]
    var yatyotema = 0;
    var m1 = mm % 2 ? mm : (mm + 9) % 12;
    m1 = ((m1 + 4) % 12) + 1;
    if (mf == m1) yatyotema = 1;
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
  static cal_mahayatkyan(mm, md) {
    if (mm <= 0) mm = 4; //first waso is considered waso
    var mf = md - 15 * Math.floor(md / 16); //get fortnight day [0-15]
    var mahayatkyan = 0;
    var m1 = ((Math.floor((mm % 12) / 2) + 4) % 6) + 1;
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
  static cal_shanyat(mm, md) {
    var mmt = Math.floor(mm / 13);
    mm = (mm % 13) + mmt; // to 1-12 with month type
    if (mm <= 0) mm = 4; //first waso is considered waso
    var mf = md - 15 * Math.floor(md / 16); //get fortnight day [0-15]
    var shanyat = 0;
    var sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
    if (mf == sya[mm - 1]) shanyat = 1;
    return shanyat;
  }
  //-------------------------------------------------------------------------
  // get astrological information
  // input: (jdn: Julian Day Number)
  // output: (array of strings)
  static cal_astro(jdn) {
    jdn = Math.round(jdn);
    var myt, my, mm, md;
    var hs = [];
    var yo = ceMmDateTime.j2m(jdn);
    myt = yo.myt;
    my = yo.my;
    mm = yo.mm;
    md = yo.md;
    var wd = (jdn + 2) % 7; //week day [0=sat, 1=sun, ..., 6=fri]
    if (ceMmDateTime.cal_thamanyo(mm, wd)) {
      hs.push('Thamanyo');
    }
    if (ceMmDateTime.cal_amyeittasote(md, wd)) {
      hs.push('Amyeittasote');
    }
    if (ceMmDateTime.cal_warameittugyi(md, wd)) {
      hs.push('Warameittugyi');
    }
    if (ceMmDateTime.cal_warameittunge(md, wd)) {
      hs.push('Warameittunge');
    }
    if (ceMmDateTime.cal_yatpote(md, wd)) {
      hs.push('Yatpote');
    }
    if (ceMmDateTime.cal_thamaphyu(md, wd)) {
      hs.push('Thamaphyu');
    }
    if (ceMmDateTime.cal_nagapor(md, wd)) {
      hs.push('Nagapor');
    }
    if (ceMmDateTime.cal_yatyotema(mm, md)) {
      hs.push('Yatyotema');
    }
    if (ceMmDateTime.cal_mahayatkyan(mm, md)) {
      hs.push('Mahayatkyan');
    }
    if (ceMmDateTime.cal_shanyat(mm, md)) {
      hs.push('Shanyat');
    }
    return hs;
  }
  // End of core functions ###############################################################

  //-----------------------------------------------------------------------------
  // Start of checking holidays ##################################################
  //-----------------------------------------------------------------------------
  // Get holidays
  // input: (jdn=Julian Day Number)
  // output: ( array of strings)
  // Thanks to Ye Lin Kyaw and Aye Nyein for the knowledge about
  // the Myanmar calendar and the new year
  static cal_holiday(jdn) {
    jdn = Math.round(jdn);
    var myt, my, mm, md, mp, mmt, gy, gm, gd;
    var yo = ceMmDateTime.j2m(jdn);
    myt = yo.myt;
    my = yo.my;
    mm = yo.mm;
    md = yo.md;
    mp = ceMmDateTime.cal_mp(md, mm, myt);
    mmt = Math.floor(mm / 13);
    var hs = [];
    var go = ceDateTime.j2w(jdn);
    gy = go.y;
    gm = go.m;
    gd = go.d;
    //---------------------------------
    // Thingyan
    var SY = 1577917828.0 / 4320000.0; //solar year (365.2587565)
    var MO = 1954168.050623; //beginning of 0 ME
    var BGNTG = 1100,
      SE3 = 1312; //start of Thingyan and third era
    var akn, atn, ja, jk;
    ja = SY * (my + mmt) + MO; // atat time
    if (my >= SE3)
      jk = ja - 2.169918982; // akya time
    else jk = ja - 2.1675;
    akn = Math.round(jk);
    atn = Math.round(ja);
    if (jdn == atn + 1) {
      hs.push("Myanmar New Year's Day");
    }
    if (my + mmt >= BGNTG) {
      if (jdn == atn) {
        hs.push('Thingyan Atat');
      } else if (jdn > akn && jdn < atn) {
        hs.push('Thingyan Akyat');
      } else if (jdn == akn) {
        hs.push('Thingyan Akya');
      } else if (jdn == akn - 1) {
        hs.push('Thingyan Akyo');
      } else if (
        my + mmt >= 1369 &&
        my + mmt < 1379 &&
        (jdn == akn - 2 || (jdn >= atn + 2 && jdn <= akn + 7))
      ) {
        hs.push('Holiday');
      } else if (
        my + mmt >= 1384 &&
        my + mmt <= 1385 &&
        (jdn == akn - 5 || jdn == akn - 4 || jdn == akn - 3 || jdn == akn - 2)
      ) {
        hs.push('Holiday');
      } else if (my + mmt >= 1386 && jdn >= atn + 2 && jdn <= akn + 7) {
        hs.push('Holiday');
      }
    }
    //---------------------------------
    // holidays on gregorian calendar
    if (gy >= 2018 && gy <= 2021 && gm == 1 && gd == 1) {
      hs.push("New Year's Day");
    } else if (gy >= 1948 && gm == 1 && gd == 4) {
      hs.push('Independence Day');
    } else if (gy >= 1947 && gm == 2 && gd == 12) {
      hs.push('Union Day');
    } else if (gy >= 1958 && gm == 3 && gd == 2) {
      hs.push("Peasants' Day");
    } else if (gy >= 1945 && gm == 3 && gd == 27) {
      hs.push('Resistance Day');
    } else if (gy >= 1923 && gm == 5 && gd == 1) {
      hs.push('Labour Day');
    } else if (gy >= 1947 && gm == 7 && gd == 19) {
      hs.push("Martyrs' Day");
    } else if (gy >= 1752 && gm == 12 && gd == 25) {
      hs.push('Christmas Day');
    } else if (gy == 2017 && gm == 12 && gd == 30) {
      hs.push('Holiday');
    } else if (gy >= 2017 && gy <= 2021 && gm == 12 && gd == 31) {
      hs.push('Holiday');
    }
    //---------------------------------
    // holidays on myanmar calendar
    if (mm == 2 && mp == 1) {
      hs.push('Buddha Day');
    } //Vesak day
    else if (mm == 4 && mp == 1) {
      hs.push('Start of Buddhist Lent');
    } //Warso day
    else if (mm == 7 && mp == 1) {
      hs.push('End of Buddhist Lent');
    } else if (my >= 1379 && mm == 7 && (md == 14 || md == 16)) {
      hs.push('Holiday');
    } else if (mm == 8 && mp == 1) {
      hs.push('Tazaungdaing');
    } else if (my >= 1379 && mm == 8 && md == 14) {
      hs.push('Holiday');
    } else if (my >= 1282 && mm == 8 && md == 25) {
      hs.push('National Day');
    } else if (mm == 10 && md == 1) {
      hs.push("Karen New Year's Day");
    } else if (mm == 12 && mp == 1) {
      hs.push('Tabaung Pwe');
    }
    //---------------------------------
    // substitute holidays 2019 to 2021
    if (gy > 2018 && gy < 2022) {
      const substituteHoliday = [
        // 2019
        2458768, 2458772, 2458785, 2458800,
        // 2020
        2458855, 2458918, 2458950, 2459051, 2459062, 2459152, 2459156, 2459167,
        2459181, 2459184,
        // 2021
        2459300, 2459303, 2459323, 2459324, 2459335, 2459548, 2459573,
      ];

      if (ceMmDateTime.bSearch1(jdn, substituteHoliday) >= 0) {
        hs.push('Holiday');
      }
    }
    //---------------------------------
    // //other holidays
    // var ghEid=[2456513, 2456867, 2457221, 2457576, 2457930, 2458285, 2458640, 2459063,
    // 2459416, 2459702, 2460125, 2460261];
    // if(ceMmDateTime.bSearch1(jdn,ghEid)>=0) {hs.push("Eid");}

    // // var ghDiwali=[2456599, 2456953, 2457337, 2457691, 2458045, 2458430, 2458784, 2459168,
    // // 2459523, 2459877];
    // // if(ceMmDateTime.bSearch1(jdn,ghDiwali)>=0) {hs.push("Diwali");}
    // if((mm==7) && (mp==3)) {hs.push("~Diwali");}
    //---------------------------------
    return hs;
  }
  //----------------------------------------------------------------------------
  // DoE : Date of Easter using  "Meeus/Jones/Butcher" algorithm
  // Reference: Peter Duffett-Smith, Jonathan Zwart',
  //  "Practical Astronomy with your Calculator or Spreadsheet,"
  //  4th Etd, Cambridge university press, 2011. Page-4.
  // input: (y=year)
  // output: (j=julian day number)
  // dependency: w2j()
  static DoE(y) {
    var a, b, c, d, e, f, g, h, i, k, l, m, p, q, n;
    a = y % 19;
    b = Math.floor(y / 100);
    c = y % 100;
    d = Math.floor(b / 4);
    e = b % 4;
    f = Math.floor((b + 8) / 25);
    g = Math.floor((b - f + 1) / 3);
    h = (19 * a + b - d - g + 15) % 30;
    i = Math.floor(c / 4);
    k = c % 4;
    l = (32 + 2 * e + 2 * i - h - k) % 7;
    m = Math.floor((a + 11 * h + 22 * l) / 451);
    q = h + l - 7 * m + 114;
    p = (q % 31) + 1;
    n = Math.floor(q / 31);
    return Math.round(ceDateTime.w2j(y, n, p, 12, 0, 0, 1)); // this is for Gregorian
  }
  //----------------------------------------------------------------------------
  // Get other holidays
  // input: (jdn: Julian Day Number)
  // output: (array of strings)
  // dependency: DoE(), j2w()
  static cal_holiday2(jdn) {
    jdn = Math.round(jdn);
    var myt, my, mm, md, mp, mmt, gy, gm, gd;
    var yo = ceMmDateTime.j2m(jdn);
    myt = yo.myt;
    my = yo.my;
    mm = yo.mm;
    md = yo.md;
    mp = ceMmDateTime.cal_mp(md, mm, myt);
    mmt = Math.floor(mm / 13);
    var hs = [];
    var go = ceDateTime.j2w(jdn);
    gy = go.y;
    gm = go.m;
    gd = go.d;
    //---------------------------------
    // holidays on gregorian calendar
    var doe = ceMmDateTime.DoE(gy);
    if (gy <= 2017 && gm == 1 && gd == 1) {
      hs.push("New Year's Day");
    } else if (gy >= 1915 && gm == 2 && gd == 13) {
      hs.push('G. Aung San BD');
    } else if (gy >= 1969 && gm == 2 && gd == 14) {
      hs.push('Valentines Day');
    } else if (gy >= 1970 && gm == 4 && gd == 22) {
      hs.push('Earth Day');
    } else if (gy >= 1392 && gm == 4 && gd == 1) {
      hs.push("April Fools' Day");
    } else if (gy >= 1948 && gm == 5 && gd == 8) {
      hs.push('Red Cross Day');
    } else if (gy >= 1994 && gm == 10 && gd == 5) {
      hs.push("World Teachers' Day");
    } else if (gy >= 1947 && gm == 10 && gd == 24) {
      hs.push('United Nations Day');
    } else if (gy >= 1753 && gm == 10 && gd == 31) {
      hs.push('Halloween');
    }
    if (gy >= 1876 && jdn == doe) {
      hs.push('Easter');
    } else if (gy >= 1876 && jdn == doe - 2) {
      hs.push('Good Friday');
    }
    //---------------------------------
    // holidays on myanmar calendar
    if (my >= 1309 && mm == 11 && md == 16) {
      hs.push("'Mon' National Day");
    } //the ancient founding of Hanthawady
    else if (mm == 9 && md == 1) {
      hs.push("Shan New Year's Day");
      if (my >= 1306) {
        hs.push("Authors' Day");
      }
    } //Nadaw waxing moon 1
    else if (mm == 3 && mp == 1) {
      hs.push('Mahathamaya Day');
    } //Nayon full moon
    else if (mm == 6 && mp == 1) {
      hs.push('Garudhamma Day');
    } //Tawthalin full moon
    else if (my >= 1356 && mm == 10 && mp == 1) {
      hs.push("Mothers' Day");
    } //Pyatho full moon
    else if (my >= 1370 && mm == 12 && mp == 1) {
      hs.push("Fathers' Day");
    } //Tabaung full moon
    else if (mm == 5 && mp == 1) {
      hs.push('Metta Day');
    } //Waguang full moon
    else if (mm == 5 && md == 10) {
      hs.push('Taungpyone Pwe');
    } //Taung Pyone Pwe
    else if (mm == 5 && md == 23) {
      hs.push('Yadanagu Pwe');
    } //Yadanagu Pwe
    //----------------------------------------------------------------------------
    // //other holidays
    // var ghEid2=[2456936,2457290,2457644,2457998,2458353,2458707];
    // var ghCNY=[2456689, 2456690, 2457073, 2457074, 2457427, 2457428, 2457782,
    // 2457783, 2458166, 2458520, 2458874, 2459257, 2459612, 2459967, 2460351,
    // 	2460705, 2461089, 2461443, 2461797, 2462181, 2462536];
    // if(ceMmDateTime.bSearch1(jdn,ghEid2)>=0) {hs.push("Eid");}
    // if(ceMmDateTime.bSearch1(jdn,ghCNY)>=0) {hs.push("Chinese New Year's Day");}
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
  // &YYYY : Sasana year regardless of moon phase [0000-9999, e.g. 2562]
  // &XXXX : Sasana year starting at the first day of Tagu [0000-9999, e.g. 2562]
  // &ZZZZ : Sasana year starting at Kason full moon day [0000-9999, e.g. 2562]
  // &y : Myanmar year [0-9999, e.g. 138]
  // &mm : month with zero padding [01-14]
  // &M : month [e.g. January]
  // &m : month [1-14]
  // &P : moon phase [e.g. waxing, waning, full moon, or new moon]
  // &dd : day of the month with zero padding [01-31]
  // &d : day of the month [1-31]
  // &ff : fortnight day with zero padding [01-15]
  // &f : fortnight day [1-15]
  static j2ms(jd, fs = '&y &M &P &ff', tz = 0) {
    jd += tz / 24.0;
    var jdn = Math.round(jd);
    var myt, my, mm, md, mp, mf;
    var yo = ceMmDateTime.j2m(jdn);
    myt = yo.myt;
    my = yo.my;
    mm = yo.mm;
    md = yo.md;
    mp = ceMmDateTime.cal_mp(md, mm, myt);
    mf = ceMmDateTime.cal_mf(md);
    var mma = [
      'First Waso',
      'Tagu',
      'Kason',
      'Nayon',
      'Waso',
      'Wagaung',
      'Tawthalin',
      'Thadingyut',
      'Tazaungmon',
      'Nadaw',
      'Pyatho',
      'Tabodwe',
      'Tabaung',
      'Late Tagu',
      'Late Kason',
    ];
    var mpa = ['Waxing', 'Full Moon', 'Waning', 'New Moon'];
    // replace format string with values
    var fm = fs;
    var fstr, rstr, re;
    //--------------------------------------------------------
    fstr = '&yyyy';
    re = new RegExp(fstr, 'g');
    rstr = '0000' + my.toString();
    rstr = rstr.substr(rstr.length - 4);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    var sy = ceMmDateTime.my2sy(my, mm, md, 0); // Sasana year neglecting moon phase
    fstr = '&YYYY';
    re = new RegExp(fstr, 'g');
    rstr = '0000' + sy.toString();
    rstr = rstr.substr(rstr.length - 4);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    var sy1 = ceMmDateTime.my2sy(my, mm, md, 1); // Sasana year to start on the first day of Tagu
    fstr = '&XXXX';
    re = new RegExp(fstr, 'g');
    rstr = '0000' + sy1.toString();
    rstr = rstr.substr(rstr.length - 4);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    var sy2 = ceMmDateTime.my2sy(my, mm, md, 1); // Sasana year to start on Kason full moon day
    fstr = '&ZZZZ';
    re = new RegExp(fstr, 'g');
    rstr = '0000' + sy2.toString();
    rstr = rstr.substr(rstr.length - 4);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&y';
    re = new RegExp(fstr, 'g');
    rstr = my.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&mm';
    re = new RegExp(fstr, 'g');
    rstr = '00' + mm.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&M';
    re = new RegExp(fstr, 'g');
    rstr = mma[mm];
    if (mm == 4 && myt > 0) {
      rstr = 'Second ' + rstr;
    }
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&m';
    re = new RegExp(fstr, 'g');
    rstr = mm.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&P';
    re = new RegExp(fstr, 'g');
    rstr = mpa[mp];
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&dd';
    re = new RegExp(fstr, 'g');
    rstr = '00' + md.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&d';
    re = new RegExp(fstr, 'g');
    rstr = md.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&ff';
    re = new RegExp(fstr, 'g');
    rstr = '00' + mf.toString();
    rstr = rstr.substr(rstr.length - 2);
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    fstr = '&f';
    re = new RegExp(fstr, 'g');
    rstr = mf.toString();
    fm = fm.replace(re, rstr);
    //--------------------------------------------------------
    return fm;
  }
  //-------------------------------------------------------------------------
  // get properties

  // Myanmar year type
  get myt() {
    var yo = ceMmDateTime.j2m(this.jdnl);
    return yo.myt;
  }

  // Myanmar year
  get my() {
    var yo = ceMmDateTime.j2m(this.jdnl);
    return yo.my;
  }

  set syt(val) {
    this.m_syt = val;
  }
  // Sasana year type
  get syt() {
    return this.m_syt;
  }

  // Sasana year
  get sy() {
    return ceMmDateTime.my2sy(this.my, this.mm, this.md, this.syt);
  }

  // Myanmar year name
  get my_name() {
    // var yna=["ပုဿနှစ်","မာခနှစ်","ဖ္လကိုန်နှစ်","စယ်နှစ်",
    // 	"ပိသျက်နှစ်","စိဿနှစ်","အာသတ်နှစ်","သရဝန်နှစ်",
    // 	"ဘဒြနှစ်","အာသိန်နှစ်","ကြတိုက်နှစ်","မြိက္ကသိုဝ်နှစ်"];
    var yna = [
      'Hpusha',
      'Magha',
      'Phalguni',
      'Chitra',
      'Visakha',
      'Jyeshtha',
      'Ashadha',
      'Sravana',
      'Bhadrapaha',
      'Asvini',
      'Krittika',
      'Mrigasiras',
    ];
    return yna[this.my % 12];
  }

  // Myanmar month [1-14]
  // [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
  //  Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,
  //  Tabaung=12, Late Tagu=13, Late Kason=14 ]
  get mm() {
    var yo = ceMmDateTime.j2m(this.jdnl);
    return yo.mm;
  }

  // Myanmar day of the month [1-30]
  get md() {
    var yo = ceMmDateTime.j2m(this.jdnl);
    return yo.md;
  }

  // Moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon]
  get mp() {
    var yo = ceMmDateTime.j2m(this.jdnl);
    return ceMmDateTime.cal_mp(yo.md, yo.mm, yo.myt);
  }

  // Fortnight day [1-15]
  get mf() {
    return ceMmDateTime.cal_mf(this.md);
  }

  // Length of this Myanmar month
  get mmlen() {
    return ceMmDateTime.cal_mml(this.mm, this.myt);
  }

  // get sabbath string
  get sabbath() {
    var yo = ceMmDateTime.j2m(this.jdnl);
    var sb = ceMmDateTime.cal_sabbath(yo.md, yo.mm, yo.myt);
    var str = '';
    if (sb == 1) str = 'Sabbath';
    else if (sb == 2) str = 'Sabbath Eve';
    return str;
  }

  // get yatyaza string
  get yatyaza() {
    var v = ceMmDateTime.cal_yatyaza(this.mm, this.w);
    return v ? 'Yatyaza' : '';
  }

  // get pyathada string
  get pyathada() {
    var v = ceMmDateTime.cal_pyathada(this.mm, this.w);
    var pa = ['', 'Pyathada', 'Afternoon Pyathada'];
    return pa[v % 3];
  }

  // get nagahle direction
  get nagahle() {
    var v = ceMmDateTime.cal_nagahle(this.mm);
    var pa = ['West', 'North', 'East', 'South'];
    return pa[v % 4];
  }

  // get mahabote
  get mahabote() {
    var v = ceMmDateTime.cal_mahabote(this.my, this.w);
    var pa = ['Binga', 'Atun', 'Yaza', 'Adipati', 'Marana', 'Thike', 'Puti'];
    return pa[v % 7];
  }

  // get nakhat
  get nakhat() {
    var v = ceMmDateTime.cal_nakhat(this.my);
    var pa = ['Ogre', 'Elf', 'Human'];
    return pa[v % 3];
  }

  // get the array of astrological days
  get astro() {
    return ceMmDateTime.cal_astro(this.jdnl);
  }

  // get the array of public holidays
  get holidays() {
    return ceMmDateTime.cal_holiday(this.jdnl);
  }

  // get the array of other holidays
  get holidays2() {
    return ceMmDateTime.cal_holiday2(this.jdnl);
  }

  //-------------------------------------------------------------------------
  // get Myanmar Date String
  // input: (
  //  fs: format string [Optional argument: "&yyyy &M &P &ff"]
  //  tz : time zone offset in hours (Optional, e.g. 8 for GMT +8))
  // output: date string in Myanmar calendar according to fm
  // where formatting strings are as follows
  // &yyyy : Myanmar year [0000-9999, e.g. 1380]
  // &YYYY : Sasana year [0000-9999, e.g. 2562] (it checks Sasana year type)
  // &mm : month with zero padding [01-14]
  // &M : month [e.g. Tagu]
  // &m : month [1-14]
  // &P : moon phase [e.g. waxing, waning, full moon, or new moon]
  // &dd : day of the month with zero padding [01-31]
  // &d : day of the month [1-31]
  // &ff : fortnight day with zero padding [01-15]
  // &f : fortnight day [1-15]
  ToMString(fs = '&yyyy &M &P &ff') {
    if (this.m_syt == 1) {
      // replace &YYYY with &XXXX
      var fstr = '&YYYY';
      var re = new RegExp(fstr, 'g');
      fs = fs.replace(re, '&XXXX');
    } else if (this.m_syt == 2) {
      // replace &YYYY with &ZZZZ
      var fstr = '&YYYY';
      var re = new RegExp(fstr, 'g');
      fs = fs.replace(re, '&ZZZZ');
    }
    return ceMmDateTime.j2ms(this.jd, fs, this.tz);
  }
} //ceMmDateTime

//-----------------------------------------------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//-----------------------------------------------------------------------
//Start of chronicle ####################################################
//-----------------------------------------------------------------------

class ceMmTranslate {
  //-------------------------------------------------------------------------
  constructor() {
    this.m_lang = ceMmTranslate.Init();
  }
  //-----------------------------------------------------------------------------
  // Translate
  // inputs ( str = string to translate,
  //    toLn = to language number [optional: 1]
  //    fromLn = from language number [optional: 0],)
  // Language number: 0: English, 1: Myanmar (Unicode), 2: Zawgyi,
  //		3: Mon, 4: Shan, 5: Karen
  T(str, toLn = 1, fromLn = 0) {
    var i;
    var l = this.m_lang.length;
    var fstr, rstr, re;
    for (i = 0; i < l; i++) {
      fstr = this.m_lang[i][fromLn];
      re = new RegExp(fstr, 'g');
      rstr = this.m_lang[i][toLn];
      str = str.replace(re, rstr);
    }
    return str;
  }
  //-----------------------------------------------------------------------------
  // Initialize the language catalog with 2 dimensional array
  // Index 0: English, 1: Myanmar (Unicode), 2: Zawgyi,
  //		3: Mon, 4: Tai, 5: Karen
  //Credit:
  //Mon language translation by 'ITVilla': http://it-villa.blogspot.com/
  //and Proof reading by Mikau Nyan
  //Tai language translation by 'Jao Tai Num'
  // and  https://www.taidictionary.com/
  static Init() {
    return [
      [
        'Myanmar Year',
        'မြန်မာနှစ်',
        'ျမန္မာႏွစ္',
        'သက္ကရာဇ်ဍုၚ်',
        'ပီ​​ၵေႃးၸႃႇ',
        'ကီၢ်ပယီၤ',
      ],
      [
        'Good Friday',
        'သောကြာနေ့ကြီး',
        'ေသာၾကာေန႔ႀကီး',
        'သောကြာနေ့ကြီး',
        'ဢၼ်လီဝၼ်းသုၵ်',
        'မုၢ်ဖီဖး',
      ],
      ["New Year's", 'နှစ်ဆန်း', 'ႏွစ္ဆန္း', 'လှာဲသၞာံ', 'ပီမႂ်ႇ', 'နှစ်ဆန်း'],
      [
        'Independence',
        'လွတ်လပ်ရေး',
        'လြတ္လပ္ေရး',
        'သၠးပွး',
        'ဢၼ်လွတ်ႈလႅဝ်',
        'လွတ်လပ်ရေး',
      ],
      [
        'Union',
        'ပြည်ထောင်စု',
        'ျပည္ေထာင္စု',
        'ကၟိန်ဍုၚ်',
        'ၸိုင်ႈမိူင်းႁူမ်ႈတုမ်ႊ',
        'ပြည်ထောင်စု',
      ],
      [
        "Peasants'",
        'တောင်သူလယ်သမား',
        'ေတာင္သူလယ္သမား',
        'သၟာဗ္ၚ',
        'ၸဝ်ႈႁႆႈၸဝ်ႈၼႃး',
        'တောင်သူလယ်သမား',
      ],
      [
        'Resistance',
        'တော်လှန်ရေး',
        'ေတာ္လွန္ေရး',
        'ပၠန်ဂတးဗၟာ',
        'လွင်ႈလုၵ်ႉၽိုၼ်',
        'တော်လှန်ရေး',
      ],
      [
        'Labour',
        'အလုပ်သမား',
        'အလုပ္သမား',
        'သၟာကမၠောန်',
        'ၵူၼ်းႁဵတ်းၵၢၼ်',
        'အလုပ်သမား',
      ],
      ["Martyrs'", 'အာဇာနည်', 'အာဇာနည္', 'အာဇာနဲ', 'ၽူႈႁတ်းငၢၼ်', 'အာဇာနည်'],
      [
        'Christmas',
        'ခရစ္စမတ်',
        'ခရစၥမတ္',
        'ခရေဿမာတ်',
        'ပွႆးၶရိတ်ႉသမတ်ႉၸ်',
        'ခရံာ်အိၣ်ဖျဲၣ်မူးပွဲန့ၣ်',
      ],
      ['Buddha', 'ဗုဒ္ဓ', 'ဗုဒၶ', 'သ္ဘၚ်ဖဍာ်ဇြဲ', 'ပုတ်ႉထ', 'ဗုဒ္ဓ'],
      [
        'Start of Buddhist Lent',
        'ဓမ္မစကြာနေ့',
        'ဓမၼစၾကာေန႔',
        'တ္ၚဲတွံဓဝ်ဓမ္မစက်',
        'ဓမ္မစကြာနေ့',
        'ဓမ္မစကြာနေ့',
      ],
      [
        'End of Buddhist Lent',
        'မီးထွန်းပွဲ',
        'မီးထြန္းပြဲ',
        'တ္ၚဲအဘိဓရ်',
        'ပွႆတႆႈၾႆး',
        'မီးထွန်းပွဲ',
      ],
      [
        'Tazaungdaing',
        'တန်ဆောင်တိုင်',
        'တန္ေဆာင္တိုင္',
        'သ္ဘၚ်ပူဇဴပၟတ်ပၞာၚ်',
        'တန်ဆောင်တိုင်',
        'တန်ဆောင်တိုင်',
      ],
      [
        'National',
        'အမျိုးသား',
        'အမ်ိဳးသား',
        'ကောန်ဂကူဗၟာ',
        'ၵူၼ်းမိူင်',
        'အမျိုးသား',
      ],
      ['Karen', 'ကရင်', 'ကရင္', 'ကရေၚ်', 'ယၢင်းၽိူၵ်ႇ', 'ကရင်'],
      ['Pwe', 'ပွဲ', 'ပြဲ', 'သ္ဘၚ်', 'ပွႆ', 'ပွဲ'],
      ['Thingyan', 'သင်္ကြန်', 'သၾကၤန္', 'အတး', 'သၢင်းၵျၢၼ်ႇ', 'သင်္ကြန်'],
      ['Akyo', 'အကြို', 'အႀကိဳ', 'ဒစး', 'အကြို', 'ႁပ်ႉ'],
      ['Akyat', 'အကြတ်', 'အၾကတ္', 'ကြာပ်', 'ၵျၢပ်ႈ', 'အကြတ်'],
      ['Akya', 'အကျ', 'အက်', 'စှေ်', 'တူၵ်း', 'အကျ'],
      ['Atat', 'အတက်', 'အတက္', 'တိုန်', 'ၶိုၼ်ႈ', 'အတက်'],
      [
        'Amyeittasote',
        'အမြိတ္တစုတ်',
        'အၿမိတၱစုတ္',
        'ကိုန်အမြိုတ်',
        'အမြိတ္တစုတ်',
        'အမြိတ္တစုတ်',
      ],
      [
        'Warameittugyi',
        'ဝါရမိတ္တုကြီး',
        'ဝါရမိတၱဳႀကီး',
        'ကိုန်ဝါရမိတ္တုဇၞော်',
        'ဝါရမိတ္တုကြီး',
        'ဝါရမိတ္တုကြီး',
      ],
      [
        'Warameittunge',
        'ဝါရမိတ္တုငယ်',
        'ဝါရမိတၱဳငယ္',
        'ကိုန်ဝါရမိတ္တုဍောတ်',
        'ဝါရမိတ္တုငယ်',
        'ဝါရမိတ္တုငယ်',
      ],
      [
        'Thamaphyu',
        'သမားဖြူ',
        'သမားျဖဴ',
        'ကိုန်လေၚ်ဒိုက်',
        'သမားဖြူ',
        'သမားဖြူ',
      ],
      ['Thamanyo', 'သမားညို', 'သမားညိဳ', 'ကိုန်ဟုံဗြမ်', 'သမားညို', 'သမားညို'],
      ['Yatpote', 'ရက်ပုပ်', 'ရက္ပုပ္', 'ကိုန်လီုလာ်', 'ရက်ပုပ်', 'ရက်ပုပ်'],
      [
        'Yatyotema',
        'ရက်ယုတ်မာ',
        'ရက္ယုတ္မာ',
        'ကိုန်ယုတ်မာ',
        'ရက်ယုတ်မာ',
        'ရက်ယုတ်မာ',
      ],
      [
        'Mahayatkyan',
        'မဟာရက်ကြမ်း',
        'မဟာရက္ၾကမ္း',
        'ကိုန်ဟွံခိုဟ်',
        'မဟာရက်ကြမ်း',
        'မဟာရက်ကြမ်း',
      ],
      ['Nagapor', 'နဂါးပေါ်', 'နဂါးေပၚ', 'နာ်မံက်', 'နဂါးပေါ်', 'နဂါးပေါ်'],
      ['Shanyat', 'ရှမ်းရက်', 'ရွမ္းရက္', 'တ္ၚဲဒတန်', 'ရှမ်းရက်', 'ရှမ်းရက်'],
      ["'Mon'", 'မွန်', 'မြန္', 'ပၠန်', 'မွၼ်း', 'မွန်'],
      [
        'G. Aung San BD',
        'ဗိုလ်ချုပ်မွေးနေ့',
        'ဗိုလ္ခ်ဳပ္ေမြးေန႔',
        'တ္ၚဲသၟိၚ်ဗၟာ အံၚ်သာန်ဒှ်မၞိဟ်',
        'ဝၼ်းၵိူတ်ၸွမ်သိုၵ်',
        'ဗိုလ်ချုပ်မွေးနေ့',
      ],
      [
        'Valentines',
        'ချစ်သူများ',
        'ခ်စ္သူမ်ား',
        'ဝုတ်ဗၠာဲ',
        'ၵေႃႈႁၵ်ႉ',
        'ချစ်သူများ',
      ],
      ['Earth', 'ကမ္ဘာမြေ', 'ကမၻာေျမ', 'ဂၠးကဝ်', 'လိၼ်မိူင်း', 'ကမ္ဘာမြေ'],
      [
        "April Fools'",
        'ဧပြီအရူး',
        'ဧၿပီအ႐ူး',
        'သ္ပပရအ်',
        'ဢေႇပရႄႇၵူၼ်းယွင်ႇ',
        'အ့ဖြ့ၣ် fool',
      ],
      [
        'Red Cross',
        'ကြက်ခြေနီ',
        'ၾကက္ေျခနီ',
        'ဇိုၚ်ခ္ဍာ်ဍာဲ',
        'ဢၼ်မီးသီလႅင်ႁၢင်ႈၶႂၢႆႇၶႃပေ',
        'ကြက်ခြေနီ',
      ],
      [
        'United Nations',
        'ကုလသမ္မဂ္ဂ',
        'ကုလသမၼဂၢ',
        'ကုလသမ္မဂ္ဂ',
        'ဢၼ်ၽွမ်ႉႁူမ်ႈၸိူဝ်ႉၶိူဝ်းၼမ်',
        'ကုလသမ္မဂ္ဂ',
      ],
      ['Halloween', 'သရဲနေ့', 'သရဲေန႔', 'ဟေဝ်လဝ်ဝိန်', 'ဝၼ်းၽဵတ်', 'သရဲနေ့'],
      ['Shan', 'ရှမ်း', 'ရွမ္း', 'သေံ', 'တႆး', 'ရှမ်း'],
      ["Mothers'", 'အမေများ', 'အေမမ်ား', 'မိအံက်', 'မႄႈ', 'မိၢ်အ'],
      ["Fathers'", 'အဖေများ', 'အေဖမ်ား', 'မအံက်', 'ပေႃ', 'ပၢ်အ'],
      [
        'Sasana Year',
        'သာသနာနှစ်',
        'သာသနာႏွစ္',
        'သက္ကရာဇ်သာသနာ',
        'ပီသႃႇသၼႃႇ',
        'နံၣ်သာသနာ',
      ],
      ['Eid', 'အိဒ်', 'အိဒ္', 'အိဒ်', 'အိဒ်', 'အိဒ်'],
      ['Diwali', 'ဒီဝါလီ', 'ဒီဝါလီ', 'ဒီဝါလီ', 'ဒီဝါလီ', 'ဒီဝါလီ'],
      [
        'Mahathamaya',
        'မဟာသမယ',
        'မဟာသမယ',
        'မဟာသမယ',
        'ဢၼ်ယႂ်ႇၽွမ်ႉႁူမ်ႈ',
        'မဟာသမယ',
      ],
      ['Garudhamma', 'ဂရုဓမ္မ', 'ဂ႐ုဓမၼ', 'ဂရုဓမ္မ', 'ဂရုဓမ္မ', 'ဂရုဓမ္မ'],
      ['Metta', 'မေတ္တာ', 'ေမတၱာ', 'မေတ္တာ', 'မႅတ်ႉတႃႇ', 'မေတ္တာ'],
      [
        'Taungpyone',
        'တောင်ပြုန်း',
        'ေတာင္ျပဳန္း',
        'တောင်ပြုန်း',
        'တောင်ပြုန်း',
        'တောင်ပြုန်း',
      ],
      ['Yadanagu', 'ရတနာ့ဂူ', 'ရတနာ့ဂူ', 'ရတနာ့ဂူ', 'ရတနာ့ဂူ', 'ရတနာ့ဂူ'],
      [
        "Authors'",
        'စာဆိုတော်',
        'စာဆိုေတာ္',
        'စာဆိုတော်',
        'ၽူႈတႅမ်ႈၽႅၼ်',
        'စာဆိုတော်',
      ],
      ['World', 'ကမ္ဘာ့', 'ကမၻာ့', 'ကမ္ဘာ့', 'လူၵ်', 'ကမ္ဘာ့'],
      ["Teachers'", 'ဆရာများ', 'ဆရာမ်ား', 'ဆရာများ', 'ၶူးသွၼ်', 'ဆရာများ'],
      [
        'Holiday',
        'ရုံးပိတ်ရက်',
        '႐ုံးပိတ္ရက္',
        'ရုံးပိတ်ရက်',
        'ဝၼ်းပိၵ်ႉလုမ်း',
        'ရုံးပိတ်ရက်',
      ],
      ['Chinese', 'တရုတ်', 'တ႐ုတ္', 'တရုတ်', 'ၵူၼ်းၸၢဝ်းၶေ', 'တရုတ်'],
      [
        'Easter',
        'ထမြောက်ရာနေ့',
        'ထေျမာက္ရာေန႔',
        'ထမြောက်ရာနေ့',
        'ပၢင်ႇပွႆးၶွပ်ႈၶူပ်ႇၸဝ်ႈၶရိတ်',
        'ထမြောက်ရာနေ့',
      ],
      ['0', '၀', '၀', '၀', '0', '၀'],
      ['1', '၁', '၁', '၁', '1', '၁'],
      ['2', '၂', '၂', '၂', '2', '၂'],
      ['3', '၃', '၃', '၃', '3', '၃'],
      ['4', '၄', '၄', '၄', '4', '၄'],
      ['5', '၅', '၅', '၅', '5', '၅'],
      ['6', '၆', '၆', '၆', '6', '၆'],
      ['7', '၇', '၇', '၇', '7', '၇'],
      ['8', '၈', '၈', '၈', '8', '၈'],
      ['9', '၉', '၉', '၉', '9', '၉'],
      [
        'Sunday',
        'တနင်္ဂနွေ',
        'တနဂၤေႏြ',
        'တ္ၚဲအဒိုတ်',
        'ဝၼ်းဢႃးတိတ်ႉ',
        'မုၢ်ဒဲး',
      ],
      ['Monday', 'တနင်္လာ', 'တနလၤာ', 'တ္ၚဲစန်', 'ဝၼ်းၸၼ်', 'မုၢ်ဆၣ်'],
      ['Tuesday', 'အင်္ဂါ', 'အဂၤါ', 'တ္ၚဲအင္ၚာ', 'ဝၼ်းဢၢင်းၵၢၼ်း', 'မုၢ်ယူာ်'],
      [
        'Wednesday',
        'ဗုဒ္ဓဟူး',
        'ဗုဒၶဟူး',
        'တ္ၚဲဗုဒ္ဓဝါ',
        'ဝၼ်းပုတ်ႉ',
        'မုၢ်ပျဲၤ',
      ],
      [
        'Thursday',
        'ကြာသပတေး',
        'ၾကာသပေတး',
        'တ္ၚဲဗြဴဗတိ',
        'ဝၼ်းၽတ်း',
        'မုၢ်လ့ၤဧိၤ',
      ],
      ['Friday', 'သောကြာ', 'ေသာၾကာ', 'တ္ၚဲသိုက်', 'ဝၼ်းသုၵ်း', 'မုၢ်ဖီဖး'],
      ['Saturday', 'စနေ', 'စေန', 'တ္ၚဲသ္ၚိသဝ်', 'ဝၼ်းသဝ်', 'မုၢ်ဘူၣ်'],
      ['Sabbath Eve', 'အဖိတ်', 'အဖိတ္', 'တ္ၚဲတိၚ်', 'ၽိတ်ႈ', 'အဖိတ်'],
      ['Sabbath', 'ဥပုသ်', 'ဥပုသ္', 'တ္ၚဲသဳ', 'သိၼ်', 'အိၣ်ဘှံး'],
      ['Yatyaza', 'ရက်ရာဇာ', 'ရက္ရာဇာ', 'တ္ၚဲရာဇာ', 'ဝၼ်းထုၼ်း', 'ရက်ရာဇာ'],
      ['Pyathada', 'ပြဿဒါး', 'ျပႆဒါး', 'တ္ၚဲပြာဗ္ဗဒါ', 'ဝၼ်းပျၢတ်ႈ', 'ပြဿဒါး'],
      ['Afternoon', 'မွန်းလွဲ', 'မြန္းလြဲ', 'မွန်းလွဲ', 'ဝၢႆးဝၼ်း', 'မွန်းလွဲ'],
      [
        'January',
        'ဇန်နဝါရီ',
        'ဇန္နဝါရီ',
        'ဂျာန်နျူအာရဳ',
        'ၸၼ်ႇဝႃႇရီႇ',
        'ယနူၤအါရံၤ',
      ],
      [
        'February',
        'ဖေဖော်ဝါရီ',
        'ေဖေဖာ္ဝါရီ',
        'ဝှေဝ်ဗျူအာရဳ',
        'ၾႅပ်ႉဝႃႇရီႇ',
        'ဖ့ၤဘြူၤအါရံၤ',
      ],
      ['March', 'မတ်', 'မတ္', 'မာတ်ချ်', 'မျၢတ်ႉၶျ်', 'မၢ်ၡး'],
      ['April', 'ဧပြီ', 'ဧၿပီ', 'ဨပြေယ်လ်', 'ဢေႇပရႄႇ', 'အ့ဖြ့ၣ်'],
      ['May', 'မေ', 'ေမ', 'မေ', 'မေ', 'မ့ၤ'],
      ['June', 'ဇွန်', 'ဇြန္', 'ဂျုန်', 'ၵျုၼ်ႇ', 'ယူၤ'],
      ['July', 'ဇူလိုင်', 'ဇူလိုင္', 'ဂျူလာၚ်', 'ၵျူႇလၢႆႇ', 'ယူၤလံ'],
      ['August', 'ဩဂုတ်', 'ဩဂုတ္', 'အဝ်ဂါတ်', 'ဢေႃးၵၢတ်ႉ', 'အီကူး'],
      [
        'September',
        'စက်တင်ဘာ',
        'စက္တင္ဘာ',
        'သိတ်ထီဗာ',
        'သႅပ်ႇထႅမ်ႇပႃႇ',
        'စဲးပတ့ဘၢၣ်',
      ],
      [
        'October',
        'အောက်တိုဘာ',
        'ေအာက္တိုဘာ',
        'အံက်ထဝ်ဗာ',
        'ဢွၵ်ႇထူဝ်ႇပႃႇ',
        'အီးကထိဘၢၣ်',
      ],
      [
        'November',
        'နိုဝင်ဘာ',
        'နိုဝင္ဘာ',
        'နဝ်ဝါမ်ဗာ',
        'ၼူဝ်ႇဝႅမ်ႇပႃႇ',
        'နိၣ်ဝ့ဘၢၣ်',
      ],
      [
        'December',
        'ဒီဇင်ဘာ',
        'ဒီဇင္ဘာ',
        'ဒီဇြေန်ဗာ',
        'တီႇသႅမ်ႇပႃႇ',
        'ဒံၣ်စ့ဘၢၣ်',
      ],
      ['Tagu', 'တန်ခူး', 'တန္ခူး', 'ဂိတုစဲ', 'ႁႃႈ', 'လါချံ'],
      ['Kason', 'ကဆုန်', 'ကဆုန္', 'ဂိတုပသာ်', 'ႁူၵ်း', 'ဒ့ၣ်ညါ'],
      ['Nayon', 'နယုန်', 'နယုန္', 'ဂိတုဇှေ်', 'ၸဵတ်း', 'လါနွံ'],
      ['Waso', 'ဝါဆို', 'ဝါဆို', 'ဂိတုဒ္ဂိုန်', 'ပႅတ်ႇ', 'လါဃိး'],
      ['Wagaung', 'ဝါခေါင်', 'ဝါေခါင္', 'ဂိတုခ္ဍဲသဳ', 'ၵဝ်ႈ', 'လါခူး'],
      ['Tawthalin', 'တော်သလင်း', 'ေတာ္သလင္း', 'ဂိတုဘတ်', 'သိပ်း', 'ဆံးမုၢ်'],
      [
        'Thadingyut',
        'သီတင်းကျွတ်',
        'သီတင္းကြ်တ္',
        'ဂိတုဝှ်',
        'သိပ်းဢဵတ်း',
        'ဆံးဆၣ်',
      ],
      [
        'Tazaungmon',
        'တန်ဆောင်မုန်း',
        'တန္ေဆာင္မုန္း',
        'ဂိတုက္ထိုန်',
        'သိပ်းသွင်',
        'လါနီ',
      ],
      ['Nadaw', 'နတ်တော်', 'နတ္ေတာ္', 'ဂိတုမြေက္ကသဵု', 'ၸဵင်', 'လါပျုၤ'],
      ['Pyatho', 'ပြာသို', 'ျပာသို', 'ဂိတုပှော်', 'ၵမ်', 'သလ့ၤ'],
      ['Tabodwe', 'တပို့တွဲ', 'တပို႔တြဲ', 'ဂိတုမာ်', 'သၢမ်', 'ထ့ကူး'],
      ['Tabaung', 'တပေါင်း', 'တေပါင္း', 'ဂိတုဖဝ်ရဂိုန်', 'သီႇ', 'သွ့ကီ'],
      ['First', 'ပ', 'ပ', 'ပ', 'ပ', '၁ '],
      ['Second', 'ဒု', 'ဒု', 'ဒု', 'တု', '၂ '],
      ['Late', 'နှောင်း', 'ေႏွာင္း', 'နှောင်း', 'ဝၢႆး', 'စဲၤ'],
      ['Waxing', 'လဆန်း', 'လဆန္း', 'မံက်', 'လိူၼ်မႂ်ႇ', 'လါထီၣ်'],
      ['Waning', 'လဆုတ်', 'လဆုတ္', 'စွေက်', 'လိူၼ်လွင်ႈ', 'လါလီၤ'],
      ['Full Moon', 'လပြည့်', 'လျပည့္', 'ပေၚ်', 'လိူၼ်မူၼ်း', 'လါပှဲၤ'],
      ['New Moon', 'လကွယ်', 'လကြယ္', 'အိုတ်', 'လိူၼ်လပ်း', 'လါဘၢ'],
      ['Nay', 'နေ့', 'ေန႔', 'တ္ၚဲ', 'ဝၼ်း', 'နံၤ'],
      ['Day', 'နေ့', 'ေန႔', 'တ္ၚဲ', 'ဝၼ်း', 'နံၤ'],
      ['Yat', 'ရက်', 'ရက္', 'ရက်', 'ဝၼ်း', 'ရက်'],
      ['Year', 'နှစ်', 'ႏွစ္', 'နှစ်', 'ပီ', 'နံၣ်'],
      ['Ku', 'ခု', 'ခု', 'သၞာံ', 'ၶု', ''],
      ['Naga', 'နဂါး', 'နဂါး', 'နဂါး', 'ႁူဝ်', 'နဂါး'],
      ['Head', 'ခေါင်း', 'ေခါင္း', 'ခေါင်း', 'ၼၵႃး', 'ခေါင်း'],
      ['Facing', 'လှည့်', 'လွည့္', 'လှည့်', 'ဝၢႆႇ', 'လှည့်'],
      ['East', 'အရှေ့', 'အေရွ႕', 'အရှေ့', 'တၢင်းဢွၵ်ႇ', 'အရှေ့'],
      ['West', 'အနောက်', 'အေနာက္', 'အနောက်', 'တၢင်းတူၵ်း', 'အနောက်'],
      ['South', 'တောင်', 'ေတာင္', 'တောင်', 'တၢင်းၸၢၼ်း', 'တောင်'],
      ['North', 'မြောက်', 'ေျမာက္', 'မြောက်', 'တၢင်းႁွင်ႇ', 'မြောက်'],
      ['Mahabote', 'မဟာဘုတ်', 'မဟာဘုတ္', 'မဟာဘုတ်', 'မဟာဘုတ်', 'မဟာဘုတ်'],
      ['Born', 'ဖွား', 'ဖြား', 'ဖွား', 'ဢၼ်မီးပႃႇရမီ', 'ဖွား'],
      ['Binga', 'ဘင်္ဂ', 'ဘဂၤ', 'ဘင်္ဂ', 'ဘင်္ဂ', 'ဘင်္ဂ'],
      ['Atun', 'အထွန်း', 'အထြန္း', 'အထွန်း', 'အထွန်း', 'အထွန်း'],
      ['Yaza', 'ရာဇ', 'ရာဇ', 'ရာဇ', 'ရာဇ', 'ရာဇ'],
      ['Adipati', 'အဓိပတိ', 'အဓိပတိ', 'အဓိပတိ', 'အဓိပတိ', 'အဓိပတိ'],
      ['Marana', 'မရဏ', 'မရဏ', 'မရဏ', 'မရဏ', 'မရဏ'],
      ['Thike', 'သိုက်', 'သိုက္', 'သိုက်', 'သိုက်', 'သိုက်'],
      ['Puti', 'ပုတိ', 'ပုတိ', 'ပုတိ', 'ပုတိ', 'ပုတိ'],
      ['Ogre', 'ဘီလူး', 'ဘီလူး', 'ဘီလူး', 'ၽီလူ', 'ဘီလူး'],
      ['Elf', 'နတ်', 'နတ္', 'နတ်', 'ၽီမႅၼ်းဢွၼ်', 'နတ်'],
      ['Human', 'လူ', 'လူ', 'လူ', 'ဢၼ်ပဵၼ်ၵူၼ်', 'လူ'],
      ['Nakhat', 'နက္ခတ်', 'နကၡတ္', 'နက္ခတ်', 'လႅင်ႊလၢဝ်', 'နက္ခတ်'],
      ['Hpusha', 'ပုဿ', 'ပုႆ', 'ပုဿ', 'ပုဿ', 'ပုဿ'],
      ['Magha', 'မာခ', 'မာခ', 'မာခ', 'မာခ', 'မာခ'],
      ['Phalguni', 'ဖ္လကိုန်', 'ဖႅကိုန္', 'ဖ္လကိုန်', 'ဖ္လကိုန်', 'ဖ္လကိုန်'],
      ['Chitra', 'စယ်', 'စယ္', 'စယ်', 'စယ်', 'စယ်'],
      ['Visakha', 'ပိသျက်', 'ပိသ်က္', 'ပိသျက်', 'ပိသျက်', 'ပိသျက်'],
      ['Jyeshtha', 'စိဿ', 'စိႆ', 'စိဿ', 'စိဿ', 'စိဿ'],
      ['Ashadha', 'အာသတ်', 'အာသတ္', 'အာသတ်', 'အာသတ်', 'အာသတ်'],
      ['Sravana', 'သရဝန်', 'သရဝန္', 'သရဝန်', 'သရဝန်', 'သရဝန်'],
      ['Bhadrapaha', 'ဘဒြ', 'ဘျဒ', 'ဘဒြ', 'ဘဒြ', 'ဘဒြ'],
      ['Asvini', 'အာသိန်', 'အာသိန္', 'အာသိန်', 'အာသိန်', 'အာသိန်'],
      ['Krittika', 'ကြတိုက်', 'ၾကတိုက္', 'ကြတိုက်', 'ကြတိုက်', 'ကြတိုက်'],
      [
        'Mrigasiras',
        'မြိက္ကသိုဝ်',
        'ၿမိကၠသိုဝ္',
        'မြိက္ကသိုဝ်',
        'မြိက္ကသိုဝ်',
        'မြိက္ကသိုဝ်',
      ],
      ['Calculator', 'တွက်စက်', 'တြက္စက္', 'တွက်စက်', 'သွၼ်', 'တွက်စက်'],
      //[". ","။ ","။ ","။ ","။ ","။ "],
      //[", ","၊ ","၊ ","၊ ","၊ ","၊ "],
    ];
  }
  //-----------------------------------------------------------------------------
} //ceMmTranslate
//-----------------------------------------------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//-----------------------------------------------------------------------
class ceMmChronicle {
  //-------------------------------------------------------------------------
  constructor() {
    this.m_ev = ceMmChronicle.InitChronicle();
    this.m_rul = ceMmChronicle.InitRulers();
    this.m_dyn = ceMmChronicle.InitDynasties();
  }
  //-----------------------------------------------------------------------------
  // get chronicle evidence
  chronicle(jdn) {
    var str = '';
    var i = this.hSearch(jdn);
    if (i >= 0) {
      str = this.m_ev[i]['Description'];
    }
    return str;
  }
  //-----------------------------------------------------------------------------
  //Search jd in chronicle
  //input: (jdn=Julian day number)
  //output: (i= index)
  hSearch(jdn) {
    var i = 0;
    var l = 0;
    var u = this.m_ev.length - 1;
    while (u >= l) {
      i = Math.floor((l + u) / 2); // calculate midpoint
      if (this.m_ev[i]['Julian Day Number'] < jdn) l = i + 1;
      else if (this.m_ev[i]['Julian Day Number'] > jdn) u = i - 1;
      else {
        return i;
      } // found
    }
    return -1; //not found
  }
  //-----------------------------------------------------------------------------
  // get rulers
  ruler(jdn) {
    var ra = []; //list of rulers
    var ro;
    var i = 0;
    var u = this.m_rul.length;
    for (i = 0; i < u; i++) {
      ro = this.m_rul[i];
      if (jdn >= ro.Beginning_JDN && jdn <= ro.Ending_JDN) ra.push(ro);
    }
    return ra;
  }
  //-------------------------------------------------------------------
  // get dynasty
  dynasty(name) {
    return this.m_dyn[name];
  }
  //-------------------------------------------------------------------
  static InitRulers() {
    return globalThis.ceMmChronicleRulers ?? []; // fallback if sidecar failed to load
  }
  //-------------------------------------------------------------------
  static InitDynasties() {
    return globalThis.ceMmChronicleDynasties ?? {};
  }
  //-------------------------------------------------------------------
  static InitChronicle() {
    return globalThis.ceMmChronicleEvents ?? [];
  }
  //-------------------------------------------------------------------
} //ceMmChronicle
//-----------------------------------------------------------------------------
