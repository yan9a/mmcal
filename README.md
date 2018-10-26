# mcal - Implementation of Myanmar Calendar in C++ and Javascript

Description: Modern Myanmar Calendrical Calculations

WebSite: https://yan9a.github.io/mcal/

MIT License (https://opensource.org/licenses/MIT)

Copyright (c) 2018 Yan Naing Aye

See the detail explanations about Myanmar Calendar at

[http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html](http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html)


### Getting the source from GitHub

To get the source from github, you can visit to 

[https://github.com/yan9a/mcal](https://github.com/yan9a/mcal)

and click --Clone or download-- button near the upper right corner.
It consists of both C++ and Javascript source code in **[cpp](https://github.com/yan9a/mcal/tree/master/cpp)** and **[javascript](https://github.com/yan9a/mcal/tree/master/javascript)** folders respectively.
Alternatively, you can use git clone command as follow.

```
git clone https://github.com/yan9a/mcal.git
cd mcal
```

### Javascript 

Javascript for Myanmar Calendrical Calculations is at **[ceMmDateTime.js](https://github.com/yan9a/mcal/blob/master/javascript/ceMmDateTime.js)** in **[mcal/javascript/](https://github.com/yan9a/mcal/tree/master/javascript)** folder.


If you want the version 1.0 javascript

```
git checkout 1.0
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

> [ceDateTime.cpp](https://github.com/yan9a/mcal/blob/master/cpp/source/ceDateTime.cpp)

> [ceMmDateTime.h](https://github.com/yan9a/mcal/blob/master/cpp/include/ceMmDateTime.h)

> [ceMmDateTime.cpp](https://github.com/yan9a/mcal/blob/master/cpp/source/ceMmDateTime.cpp)

Example C++ program can be seen at 

>    [https://github.com/yan9a/mcal/blob/master/cpp/eg/cedate/cedate.cpp](https://github.com/yan9a/mcal/blob/master/cpp/eg/cedate/cedate.cpp)


#### Windows

For Windows, there is a Visual Studio 2017 project in cedate_visualstudio2017 folder.
Alternatively, if you want to build the program using MinGW and CMake, you can build it as follows.

```
cd cpp/eg/cedate/
mkdir build
cd build
cmake .. -G "MinGW Makefiles"
mingw32-make.exe all
.\cedate
```

#### Linux

For Linux, you need to install the necessary tools and then you can clone from its git repository as follows.

```
$ sudo apt update
$ sudo apt install build-essential git cmake
$ git clone https://github.com/yan9a/mcal.git
$ cd mcal
```

Thereafter, you can navigate to the example folder, build it using cmake, and run it as follows.

```
$ cd cpp/eg/cedate
$ mkdir build
$ cd build
$ cmake ..
$ make
$ ./cedate
```