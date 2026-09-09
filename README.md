# mmcal - Implementation of Myanmar Calendar in C++ and Javascript

Description: Modern Myanmar Calendrical Calculations

WebSite: https://yan9a.github.io/mmcal/

MIT License (https://opensource.org/licenses/MIT)

Copyright (c) 2018 Yan Naing Aye

See the detail explanations about Myanmar Calendar at

[http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html](http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html)

### Getting the source from GitHub

To get the source from github, you can visit to

[https://github.com/yan9a/mmcal](https://github.com/yan9a/mmcal)

and click --Clone or download-- button near the upper right corner.
It consists of both C++ and Javascript source code in **[cpp](https://github.com/yan9a/mmcal/tree/master/cpp)** and **[javascript](https://github.com/yan9a/mmcal/tree/master/javascript)** folders respectively.
Alternatively, you can use git clone command as follow.

```
git clone https://github.com/yan9a/mmcal.git
cd mmcal
```

### Javascript

Javascript for Myanmar Calendrical Calculations is at **[ceMmDateTime.js](https://github.com/yan9a/mmcal/blob/master/javascript/ceMmDateTime.js)** in **[mmcal/javascript/](https://github.com/yan9a/mmcal/tree/master/javascript)** folder.

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

> [https://github.com/yan9a/mmcal/blob/master/index.htm](https://github.com/yan9a/mmcal/blob/master/index.htm)

### C++

C++ class for Myanmar Calendrical Calculations is in **[cpp/](https://github.com/yan9a/mmcal/tree/master/cpp)** folder.

It consists of the following files

> [cedt.h](https://github.com/yan9a/mmcal/blob/master/cpp/include/cedt.h)

> [cemmdt.h](https://github.com/yan9a/mmcal/blob/master/cpp/include/cemmdt.h)

Example C++ program can be seen at

> [https://github.com/yan9a/mmcal/blob/master/cpp/test/cedate/cedate.cpp](https://github.com/yan9a/mmcal/blob/master/cpp/test/cedate/cedate.cpp)

#### Windows

For Windows, you can use MSVC and cmake as follows.

```
cd cpp/test/cedate/
mkdir buildw
cd buildw
cmake ..
# multi-configuration generators
cmake --build . --config Release
.\Release\cedate.exe
ctest -C Release
```

Alternatively, if you want to build the program using MinGW and CMake, you can build it as follows.

```
cd cpp/test/cedate/
mkdir buildw
cd buildw
cmake .. -G "MinGW Makefiles"
mingw32-make.exe all
.\cedate
ctest
```

#### Linux

For Linux, you need to install the necessary tools and then you can clone from its git repository as follows.

```
$ sudo apt update
$ sudo apt install build-essential git cmake
$ git clone https://github.com/yan9a/mmcal.git
$ cd mmcal
```

Thereafter, you can navigate to the example folder, build it using cmake, and run it as follows.

```
$ cd cpp/test/cedate
$ mkdir build
$ cd build
$ cmake ..
$ make
$ ./cedate
$ ctest
```

### Chronicle data

When updating **[chronicle-events.json](javascript/chronicle-events.json)**, keep entries in non-decreasing `Julian Day Number` order. `ceMmChronicle.hSearch()` uses binary search to find events.

Run the following check from the repository root before committing event changes:

```
python3 util/check-chronicle.py
```

### Code formatting

#### Prettier (JS, CSS, HTML, Markdown, JSON)

Prettier is configured via **[.prettierrc](https://github.com/yan9a/mmcal/blob/master/.prettierrc)** and **[.prettierignore](https://github.com/yan9a/mmcal/blob/master/.prettierignore)**. Install dependencies once, then format the repo:

```
npm install
npx prettier --write .
```

Use `npx prettier --check .` to verify formatting without making changes.

#### clang-format (C, C++, headers)

clang-format is configured via **[.clang-format](https://github.com/yan9a/mmcal/blob/master/.clang-format)**. Format all C/C++ source and header files in **[cpp/](https://github.com/yan9a/mmcal/tree/master/cpp)** as follows.

```
find cpp -type f \( -name "*.cpp" -o -name "*.h" -o -name "*.c" \) -exec clang-format -i {} +
```
