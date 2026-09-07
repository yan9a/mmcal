#include "cemmdt.h"
#include <cmath>
#include <cstdio>
using namespace ce;
using namespace std;

// helper to report a check and remember whether any check has failed
static bool g_failed = false;
static void check(bool cond, const char *what) {
    printf("[%s] %s\n", cond ? "PASS" : "FAIL", what);
    if (!cond)
        g_failed = true;
}

int main() {
    ceMmDateTime dt;
    // use a fixed reference date/timezone so the test is deterministic across runs and machines
    dt.SetTimezone(0);
    dt.SetDateTime(2024, 1, 1, 12, 0, 0, 0, 1);
    printf("%s \n", dt.ToString().c_str());
    printf("%s \n", dt.ToMString().c_str());
    printf("%s \n", dt.ToString("%W").c_str());
    printf("Sasana year: %ld \n", dt.sy());
    printf("Year name: %s \n", dt.my_name().c_str());
    vector<string> hs = dt.holidays();
    for (int i = 0; i < hs.size(); i++) {
        printf("%s \n", hs[i].c_str());
    }
    hs = dt.holidays2();
    for (int i = 0; i < hs.size(); i++) {
        printf("%s \n", hs[i].c_str());
    }
    string str = dt.sabbath();
    if (str.length() > 0) {
        printf("%s \n", str.c_str());
    }
    str = dt.yatyaza();
    if (str.length() > 0) {
        printf("%s \n", str.c_str());
    }
    str = dt.pyathada();
    if (str.length() > 0) {
        printf("%s \n", str.c_str());
    }
    str = "Naga facing: " + dt.nagahle();
    printf("%s \n", str.c_str());
    str = "Mahabote: " + dt.mahabote();
    printf("%s \n", str.c_str());
    hs = dt.astro();
    for (int i = 0; i < hs.size(); i++) {
        printf("%s \n", hs[i].c_str());
    }

    // regression checks against the known conversion for the fixed reference date above
    check(dt.y() == 2024 && dt.m() == 1 && dt.d() == 1, "western date round-trips to 2024-01-01");
    check(dt.w() == 2, "2024-01-01 is a Monday");
    check(dt.my() == 1385 && dt.mm() == 9 && dt.md() == 20, "Myanmar date is 1385 Nadaw 20");
    check(dt.mp() == 2 && dt.mf() == 5, "moon phase is waning, fortnight day 5");
    check(dt.sy() == 2567, "Sasana year is 2567");
    check(dt.my_name() == "Jyeshtha", "Myanmar year name is Jyeshtha");
    check(dt.nagahle() == "South", "naga faces South");
    check(dt.mahabote() == "Marana", "mahabote is Marana");
    check(hs.empty(), "no astrological days on this date");
    hs = dt.holidays();
    check(!hs.empty() && hs[0] == "New Year Day", "1-Jan-2024 is New Year Day");

    return g_failed ? 1 : 0;
}