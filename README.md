# mcal
Description: Modern Myanmar Calendrical Calculations
WebSite: https://yan9a.github.io/mcal/
MIT License (https://opensource.org/licenses/MIT)
Copyright (c) 2018 Yan Naing Aye

See detail explanation about Myanmar Calendar at
[http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html](http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html)

Usage example to calculate Myanmar calendar date

```
 j=w2j(year,month,day); //get julian day number
 
 M=j2m(j); //get Myanmar date
```
 Then
 
 >    M.my = Myanmar year
     
 >    M.mm = Myanmar month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
     
 >     Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12 ]
      
 >    M.mp = [0=waxing, 1=full moon, 2=waning, or 3=new moon]
     
 >    M.d = fortnight day
     
Getting the source from github
```
$ git clone https://github.com/yan9a/mcal.git
```
If you want the version 1.0 javascript
```
$ git checkout 1.0
```
