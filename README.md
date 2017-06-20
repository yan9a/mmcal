# mcal
Myanmar Calendar

WebSite: https://yan9a.github.io/mcal/

Myanmar Calendrical Calculations by mc1500 is licensed under the

     Creative Commons Attribution 4.0 International License.
     
To view a copy of this license, visit

    http://creativecommons.org/licenses/by/4.0/.
    
  You are free to:
  
   Share — copy and redistribute the material in any medium or format
   
   Adapt — remix, transform, and build upon the material
   
                   for any purpose, even commercially.
                   
  Under the following terms:
  
   Attribution — You may give appropriate credit, provide a link to the license,
   
                   but it is not a compulsory requirement.


Usage example to calculate Myanmar calendar date

 j=w2j(year,month,day); //get julian day number
 
 M=j2m(j); //get Myanmar date
 
 Then
 
     M.my = Myanmar year
     
     M.mm = Myanmar month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5,
     
      Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12 ]
      
     M.mp = [0=waxing, 1=full moon, 2=waning, or 3=new moon]
     
     M.d = fortnight day
     
     
See detail explanation about Myanmar Calendar at

http://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
