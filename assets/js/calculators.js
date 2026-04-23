/* AnvithBizCap — calculators.js
   Compliant, conservative calculators. Outputs are illustrative
   projections, not guarantees — see disclaimer in the UI.
*/
(function () {
  'use strict';

  const fmtINR = (n) => {
    if (!isFinite(n)) return '—';
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
    return '₹' + Math.round(n).toLocaleString('en-IN');
  };
  const fmtPlain = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

  function bind(el, value, setter) {
    const input = el.querySelector('input[type="range"]');
    const display = el.querySelector('.v');
    if (input) {
      input.value = value;
      if (display) display.textContent = setter(value);
      input.addEventListener('input', () => {
        const v = parseFloat(input.value);
        if (display) display.textContent = setter(v);
        if (el.__onchange) el.__onchange(v);
      });
    }
  }

  // ---------- SIP Calculator ----------
  const sipEl = document.querySelector('[data-calc="sip"]');
  if (sipEl) {
    const f = {
      amount: sipEl.querySelector('[data-field="amount"]'),
      years: sipEl.querySelector('[data-field="years"]'),
      rate: sipEl.querySelector('[data-field="rate"]'),
    };
    const state = { amount: 15000, years: 15, rate: 12 };
    bind(f.amount, state.amount, (v) => '₹' + v.toLocaleString('en-IN'));
    bind(f.years, state.years, (v) => v + ' yr');
    bind(f.rate, state.rate, (v) => v + '%');
    f.amount.__onchange = (v) => { state.amount = v; update(); };
    f.years.__onchange  = (v) => { state.years = v; update(); };
    f.rate.__onchange   = (v) => { state.rate = v; update(); };

    const oInvested = sipEl.querySelector('[data-out="invested"]');
    const oGain     = sipEl.querySelector('[data-out="gain"]');
    const oFinal    = sipEl.querySelector('[data-out="final"]');
    const barInv    = sipEl.querySelector('[data-bar="inv"]');
    const barGain   = sipEl.querySelector('[data-bar="gain"]');

    function update() {
      const P = state.amount;
      const n = state.years * 12;
      const r = state.rate / 100 / 12;
      const final = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = P * n;
      const gain = final - invested;
      oInvested.textContent = fmtINR(invested);
      oGain.textContent = fmtINR(gain);
      oFinal.textContent = fmtINR(final);
      const invPct = (invested / final) * 100;
      barInv.style.width = invPct + '%';
      barGain.style.width = (100 - invPct) + '%';
    }
    update();
  }

  // ---------- Lumpsum Calculator ----------
  const lumpEl = document.querySelector('[data-calc="lumpsum"]');
  if (lumpEl) {
    const f = {
      amount: lumpEl.querySelector('[data-field="amount"]'),
      years: lumpEl.querySelector('[data-field="years"]'),
      rate: lumpEl.querySelector('[data-field="rate"]'),
    };
    const state = { amount: 500000, years: 10, rate: 11 };
    bind(f.amount, state.amount, (v) => '₹' + (v/100000).toFixed(1) + 'L');
    bind(f.years, state.years, (v) => v + ' yr');
    bind(f.rate, state.rate, (v) => v + '%');
    f.amount.__onchange = (v) => { state.amount = v; update(); };
    f.years.__onchange  = (v) => { state.years = v; update(); };
    f.rate.__onchange   = (v) => { state.rate = v; update(); };

    const oInvested = lumpEl.querySelector('[data-out="invested"]');
    const oGain     = lumpEl.querySelector('[data-out="gain"]');
    const oFinal    = lumpEl.querySelector('[data-out="final"]');
    const barInv    = lumpEl.querySelector('[data-bar="inv"]');
    const barGain   = lumpEl.querySelector('[data-bar="gain"]');

    function update() {
      const P = state.amount;
      const n = state.years;
      const r = state.rate / 100;
      const final = P * Math.pow(1 + r, n);
      const gain = final - P;
      oInvested.textContent = fmtINR(P);
      oGain.textContent = fmtINR(gain);
      oFinal.textContent = fmtINR(final);
      const invPct = (P / final) * 100;
      barInv.style.width = invPct + '%';
      barGain.style.width = (100 - invPct) + '%';
    }
    update();
  }

  // ---------- FD Calculator (cumulative / quarterly compounding) ----------
  const fdEl = document.querySelector('[data-calc="fd"]');
  if (fdEl) {
    const f = {
      amount: fdEl.querySelector('[data-field="amount"]'),
      years: fdEl.querySelector('[data-field="years"]'),
      rate: fdEl.querySelector('[data-field="rate"]'),
    };
    const state = { amount: 200000, years: 3, rate: 8.25 };
    bind(f.amount, state.amount, (v) => '₹' + (v/100000).toFixed(1) + 'L');
    bind(f.years, state.years, (v) => v + ' yr');
    bind(f.rate, state.rate, (v) => v + '%');
    f.amount.__onchange = (v) => { state.amount = v; update(); };
    f.years.__onchange  = (v) => { state.years = v; update(); };
    f.rate.__onchange   = (v) => { state.rate = v; update(); };

    const oPrincipal = fdEl.querySelector('[data-out="principal"]');
    const oInterest  = fdEl.querySelector('[data-out="interest"]');
    const oMaturity  = fdEl.querySelector('[data-out="maturity"]');
    const barInv     = fdEl.querySelector('[data-bar="inv"]');
    const barGain    = fdEl.querySelector('[data-bar="gain"]');

    function update() {
      const P = state.amount;
      const n = state.years * 4; // quarterly compounding
      const r = state.rate / 100 / 4;
      const maturity = P * Math.pow(1 + r, n);
      const interest = maturity - P;
      oPrincipal.textContent = fmtINR(P);
      oInterest.textContent = fmtINR(interest);
      oMaturity.textContent = fmtINR(maturity);
      const invPct = (P / maturity) * 100;
      barInv.style.width = invPct + '%';
      barGain.style.width = (100 - invPct) + '%';
    }
    update();
  }

  // ---------- Goal Planner ----------
  const goalEl = document.querySelector('[data-calc="goal"]');
  if (goalEl) {
    const f = {
      target: goalEl.querySelector('[data-field="target"]'),
      years: goalEl.querySelector('[data-field="years"]'),
      rate: goalEl.querySelector('[data-field="rate"]'),
    };
    const state = { target: 5000000, years: 15, rate: 12 };
    bind(f.target, state.target, (v) => '₹' + (v/100000).toFixed(0) + 'L');
    bind(f.years, state.years, (v) => v + ' yr');
    bind(f.rate, state.rate, (v) => v + '%');
    f.target.__onchange = (v) => { state.target = v; update(); };
    f.years.__onchange  = (v) => { state.years = v; update(); };
    f.rate.__onchange   = (v) => { state.rate = v; update(); };

    const oSip = goalEl.querySelector('[data-out="sip"]');
    const oLump = goalEl.querySelector('[data-out="lumpsum"]');
    const oTotal = goalEl.querySelector('[data-out="total"]');

    function update() {
      const FV = state.target;
      const n = state.years * 12;
      const r = state.rate / 100 / 12;
      const sip = FV * r / ((Math.pow(1 + r, n) - 1) * (1 + r));
      const lumpsum = FV / Math.pow(1 + state.rate / 100, state.years);
      oSip.textContent = fmtINR(sip);
      oLump.textContent = fmtINR(lumpsum);
      oTotal.textContent = fmtINR(FV);
    }
    update();
  }

  // ---------- SGB maturity tracker (illustrative) ----------
  const sgbEl = document.querySelector('[data-calc="sgb"]');
  if (sgbEl) {
    const f = {
      grams: sgbEl.querySelector('[data-field="grams"]'),
      price: sgbEl.querySelector('[data-field="price"]'),
      cagr: sgbEl.querySelector('[data-field="cagr"]'),
    };
    const state = { grams: 10, price: 9200, cagr: 8 };
    bind(f.grams, state.grams, (v) => v + ' g');
    bind(f.price, state.price, (v) => '₹' + v.toLocaleString('en-IN'));
    bind(f.cagr, state.cagr, (v) => v + '%');
    f.grams.__onchange = (v) => { state.grams = v; update(); };
    f.price.__onchange = (v) => { state.price = v; update(); };
    f.cagr.__onchange  = (v) => { state.cagr = v; update(); };

    const oPrincipal = sgbEl.querySelector('[data-out="principal"]');
    const oInterest  = sgbEl.querySelector('[data-out="interest"]');
    const oCapital   = sgbEl.querySelector('[data-out="capital"]');
    const oMaturity  = sgbEl.querySelector('[data-out="maturity"]');

    function update() {
      const principal = state.grams * state.price;
      // 2.5% fixed interest per annum on initial investment, paid semi-annually
      const interest = principal * 0.025 * 8;
      // Illustrative gold CAGR
      const finalValue = principal * Math.pow(1 + state.cagr / 100, 8);
      const capital = finalValue - principal;
      const total = finalValue + interest;
      oPrincipal.textContent = fmtINR(principal);
      oInterest.textContent = fmtINR(interest);
      oCapital.textContent = fmtINR(capital);
      oMaturity.textContent = fmtINR(total);
    }
    update();
  }

  // ---------- Tax-exempt projection toggle for SGB ---
})();
