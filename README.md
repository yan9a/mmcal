# mcal

Description: Modern Myanmar Calendrical Calculations

WebSite: https://yan9a.github.io/mcal/

MIT License (https://opensource.org/licenses/MIT)

Copyright (c) 2018 Yan Naing Aye

See detail explanation about Myanmar Calendar at

[http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html](http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html)

Getting the source from github

```
$ git clone https://github.com/yan9a/mcal.git
```

### Javascript 

Javascript for Myanmar Calendrical Calculations is at **[ceMmDateTime.js](https://github.com/yan9a/mcal/blob/master/javascript/ceMmDateTime.js)** in **mcal/javascript/** folder.


If you want the version 1.0 javascript

```
$ git checkout 1.0
```

Usage example to calculate Myanmar calendar date


```

 var mdt=new ceMmDateTime();
 var str=mdt.ToMString() //get current date time string in Myanmar calendar
```

 Example html/javascript code can be seen at
 
 >    [https://github.com/yan9a/mcal/blob/master/index.htm](https://github.com/yan9a/mcal/blob/master/index.htm)
     

### C++ 

C++ class for Myanmar Calendrical Calculations is in **[cpp/](https://github.com/yan9a/mcal/tree/master/cpp)** folder.

It consists of the following files
> [ceDateTime.h](https://github.com/yan9a/mcal/blob/master/cpp/include/ceDateTime.h)
> [ceDateTime.cpp](https://github.com/yan9a/mcal/blob/master/cpp/include/ceDateTime.cpp)
> [ceMmDateTime.h](https://github.com/yan9a/mcal/blob/master/cpp/include/ceMmDateTime.h)
> [ceMmDateTime.cpp](https://github.com/yan9a/mcal/blob/master/cpp/include/ceMmDateTime.cpp)

Example C++ program can be seen at 
>    [https://github.com/yan9a/mcal/blob/master/cpp/eg/cedate/cedate.cpp](https://github.com/yan9a/mcal/blob/master/cpp/eg/cedate/cedate.cpp)

For Windows, there is a Visual Studio 2017 project.

For Linux, you can build and run using cmake.

```
$ git clone https://github.com/yan9a/mcal.git
$ cd mcal/cpp/eg/cedate/build
$ rm -r *
$ cmake ..
$ make
$ ./cedate
```