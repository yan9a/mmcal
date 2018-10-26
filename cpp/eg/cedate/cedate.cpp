#include<stdio.h>
#include<math.h>
#include"ceMmDateTime.h"
using namespace ce;
using namespace std;
int main()
{
    ceMmDateTime dt;
    // dt.SetJD(dt.jd()-1);
	printf("%s \n", dt.ToString().c_str());
    printf("%s \n", dt.ToMString().c_str());
    printf("%s \n", dt.ToString("%W").c_str());
    printf("Sasana year: %ld \n", dt.sy());
    printf("Year name: %s \n", dt.my_name().c_str());
    vector<string> hs = dt.holidays();
    for(int i=0;i<hs.size();i++){
        printf("%s \n",hs[i].c_str());
    } 
    hs = dt.holidays2();
    for(int i=0;i<hs.size();i++){
        printf("%s \n",hs[i].c_str());
    }    
    string str=dt.sabbath();
    if(str.length()>0){
        printf("%s \n", str.c_str());
    }
    str=dt.yatyaza();
    if(str.length()>0){
        printf("%s \n", str.c_str());
    }
    str=dt.pyathada();
    if(str.length()>0){
        printf("%s \n", str.c_str());
    }
    str="Naga facing: "+dt.nagahle();
    printf("%s \n", str.c_str());
    str="Mahabote: "+dt.mahabote();
    printf("%s \n", str.c_str());
    hs = dt.astro();
    for(int i=0;i<hs.size();i++){
        printf("%s \n",hs[i].c_str());
    } 
    
    return 0;
}