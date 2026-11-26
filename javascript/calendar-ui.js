// Interface labels shared by the Western and Myanmar month views.
const calendarLabels = {
  westernYear: ['Western year', 'အနောက်တိုင်းနှစ်'],
  myanmarYear: ['Myanmar year', 'မြန်မာနှစ်'],
  month: ['Month', 'လ'],
  nextYear: ['Next year', 'နောက်နှစ်'],
  today: ['Today', 'ယနေ့'],
  previousYear: ['Previous year', 'ယခင်နှစ်'],
  previous: ['Previous month', 'ယခင်လ'],
  next: ['Next month', 'နောက်လ'],
  language: ['Language', 'ဘာသာစကား'],
  system: ['Western calendar system', 'အနောက်တိုင်း ပြက္ခဒိန်စနစ်'],
  british: ['British', 'ဗြိတိသျှ'],
  gregorian: ['Gregorian', 'ဂရီဂေါရီးယန်း'],
  julian: ['Julian', 'ဂျူလီယန်'],
  range: [
    'Accepted years: {min}–{max}',
    'လက်ခံသည့် နှစ်အပိုင်းအခြား — {min}–{max}',
  ],
  invalidYear: [
    'Enter a whole year from {min} to {max}.',
    '{min} မှ {max} အတွင်း ကိန်းပြည့်နှစ်ကို ထည့်ပါ။',
  ],
  scroll: [
    'Scroll sideways to see the full week.',
    'တစ်ပတ်လုံးကို ကြည့်ရန် ဘေးတိုက် ရွှေ့ပါ။',
  ],
  browseMyanmar: ['Browse by Myanmar date', 'မြန်မာရက်စွဲဖြင့် ကြည့်ရန်'],
  browseWestern: ['Browse by Western date', 'အနောက်တိုင်းရက်စွဲဖြင့် ကြည့်ရန်'],
  about: ['About', 'အကြောင်း'],
  back: ['Back to month', 'လပြက္ခဒိန်သို့ ပြန်ရန်'],
  accuracy: [
    'This Myanmar date is outside the verified accuracy range.',
    'ဤမြန်မာရက်စွဲသည် တိကျမှု စစ်ဆေးအတည်ပြုထားသော အပိုင်းအခြားပြင်ပတွင် ဖြစ်သည်။',
  ],
};

function calendarLanguage() {
  return ['en', 'my', 'my-Qaag', 'mnw', 'shn', 'ksw'][uis.Lang];
}

function uiLanguage() {
  return uis.Lang === 1 ? 'my' : 'en';
}

function uiLabel(key) {
  return calendarLabels[key][uis.Lang === 1 ? 1 : 0];
}

function yearText(year) {
  const digits = String(year);
  return uis.Lang === 1
    ? digits.replace(/[0-9]/g, (digit) => '၀၁၂၃၄၅၆၇၈၉'[digit])
    : digits;
}

function yearMessage(key) {
  return uiLabel(key)
    .replace('{min}', yearText(uis.BY))
    .replace('{max}', yearText(uis.EY));
}

function initialLanguage(fallback) {
  const preferred = new URLSearchParams(location.search).get('lang');
  return /^[0-5]$/.test(preferred) ? Number(preferred) : fallback;
}

function calendarToolbar(yearKey, monthOptions) {
  return `
    <div class="CalendarToolbar">
      <div id="calendarControls" class="CalendarControls">
        <button type="button" id="decm" data-label="previous" onclick="emc(-1)">‹</button>
        <div class="CalendarField">
          <label for="y" data-text="${yearKey}"></label>
          <div class="YearInput">
            <input type="text" id="y" inputmode="numeric" autocomplete="off"
              aria-describedby="yearRange yearError" value="${yearText(uis.y)}" />
            <div class="YearSteps">
              <button type="button" id="yearUp" data-label="nextYear" onclick="stepYear(1)">▴</button>
              <button type="button" id="yearDown" data-label="previousYear" onclick="stepYear(-1)">▾</button>
            </div>
          </div>
        </div>
        <div class="CalendarField">
          <label for="m" data-text="month"></label>
          <div class="CalendarSelect">
            <select id="m" onchange="DisplayUI(2)">${monthOptions}</select>
          </div>
        </div>
        <button type="button" id="incm" data-label="next" onclick="emc(1)">›</button>
        <div class="CalendarField CalendarSetting">
          <label for="calType" data-text="system"></label>
          <div class="CalendarSelect">
            <select id="calType" onchange="DisplayUI(3)">
              <option value="0" data-text="british"></option>
              <option value="1" data-text="gregorian"></option>
              <option value="2" data-text="julian"></option>
            </select>
          </div>
        </div>
        <div class="CalendarField CalendarSetting">
          <label for="calLang" data-text="language"></label>
          <div class="CalendarSelect">
            <select id="calLang" onchange="DisplayUI(4)">
              <option value="0" lang="en">English</option>
              <option value="1" lang="en">Myanmar</option>
              <option value="2" lang="en">Zawgyi</option>
              <option value="3" lang="en">Mon</option>
              <option value="4" lang="en">Tai</option>
              <option value="5" lang="en">S'Karen</option>
            </select>
          </div>
        </div>
      </div>
      <div class="CalendarToolbarMeta">
        <p id="yearRange" class="YearRange"></p>
        <button type="button" class="TodayButton" data-text="today" onclick="showToday()"></button>
      </div>
      <p id="yearError" class="YearError" aria-live="polite"></p>
      <p class="CalendarScrollHint" data-text="scroll"></p>
    </div>`;
}

function localizeToolbar() {
  const toolbar = document.querySelector('.CalendarToolbar');
  const year = document.getElementById('y');
  toolbar.lang = uiLanguage();
  for (const element of toolbar.querySelectorAll('[data-text]')) {
    element.textContent = uiLabel(element.dataset.text);
  }
  for (const element of toolbar.querySelectorAll('[data-label]')) {
    element.setAttribute('aria-label', uiLabel(element.dataset.label));
  }
  document.getElementById('m').lang = calendarLanguage();
  document.getElementById('yearRange').textContent = yearMessage('range');
  if (year.getAttribute('aria-invalid') === 'true') {
    document.getElementById('yearError').textContent =
      yearMessage('invalidYear');
  } else {
    year.value = yearText(uis.y);
  }
}

function mountToolbar() {
  document.getElementById('calType').value = uis.Type;
  document.getElementById('calLang').value = uis.Lang;
  const year = document.getElementById('y');
  year.addEventListener('blur', () => DisplayUI(1));
  year.addEventListener('keydown', (event) => {
    if (event.isComposing) return;
    if (event.key === 'Enter') DisplayUI(1);
    if (event.key === 'Escape') showSelectedYear();
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      stepYear(event.key === 'ArrowUp' ? 1 : -1);
    }
  });
  showSelectedYear();
  localizeToolbar();
}

function readYear() {
  const input = document.getElementById('y');
  const digits = input.value
    .trim()
    .replace(/[၀-၉]/g, (digit) => String(digit.charCodeAt(0) - 0x1040));
  const year = Number(digits);
  if (!/^[0-9]+$/.test(digits) || year < uis.BY || year > uis.EY) {
    input.setAttribute('aria-invalid', 'true');
    document.getElementById('yearError').textContent =
      yearMessage('invalidYear');
    return null;
  }
  return year;
}

function localTodayJdn() {
  const now = new Date();
  return ceDateTime.w2j(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    12,
    0,
    0,
    1,
  );
}

function focusToday() {
  const today = document.querySelector('#oc [aria-current="date"]');
  today?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  today?.focus({ preventScroll: true });
}

function stepYear(direction) {
  const year = uis.y + direction;
  if (year < uis.BY || year > uis.EY) return;
  document.getElementById('y').value = yearText(year);
  DisplayUI(1);
}

function showSelectedYear() {
  const input = document.getElementById('y');
  input.value = yearText(uis.y);
  input.removeAttribute('aria-invalid');
  document.getElementById('yearError').textContent = '';
  document
    .getElementById('yearUp')
    .setAttribute('aria-disabled', uis.y >= uis.EY);
  document
    .getElementById('yearDown')
    .setAttribute('aria-disabled', uis.y <= uis.BY);
}

function calendarFooter(otherPage, otherLabel) {
  const lang = uiLanguage();
  return `<tfoot><tr><td colspan="7" class="TdFootMC" lang="${lang}">
    <div class="CalendarLinks">
      <a class="AnchorFootMC" href="${otherPage}?lang=${uis.Lang}">${uiLabel(otherLabel)}</a>
      <a class="AnchorFootMC" href="./html/more.htm">${uiLabel('about')}</a>
    </div>
  </td></tr></tfoot>`;
}
