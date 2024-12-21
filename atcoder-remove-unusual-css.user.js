// ==UserScript==
// @name         atcoder-remove-unusual-css
// @namespace    https://github.com/ilplrr
// @version      1.3
// @description  企業コンなどの普段と違う色設定を削除します。
// @author       ilplrr
// @match        https://atcoder.jp/contests/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  function removeUnusualCss() {
    // 1 つ目の属性が一つもない style 要素に書かれているっぽい。
    // この style 要素は企業コンなどでなくても置かれている（普段は要素内テキストが空文字列）。
    const el = [...document.querySelectorAll('style')].find(e => e.attributes.length === 0);
    if (el) el.textContent = '';
  }

  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') removeUnusualCss();
  });
})();
