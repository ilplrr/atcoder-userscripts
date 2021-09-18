// ==UserScript==
// @name         atcoder-shorten-submission-code-height
// @namespace    https://github.com/ilplrr
// @version      1.0
// @description  AtCoderの提出結果ページで、ソースコードが折り畳まれている時の表示行数を減らします。
// @author       ilplrr
// @match        https://atcoder.jp/contests/*/submissions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent=`
.submission-code-expand { max-height: none !important }
.submission-code-collapse { max-height: 57px !important }
`;
    document.querySelector('head').appendChild(style);

    const btn = document.querySelector('.source-code-expand-btn');
    const target = document.querySelector('#submission-code');
    target.classList.add('submission-code-collapse');
    btn.addEventListener('click', (e) => {
        const expanded = btn.textContent === btn.getAttribute('data-on-text');
        if (expanded) {
            target.classList.add('submission-code-collapse');
            target.classList.remove('submission-code-expand');
        } else {
            target.classList.add('submission-code-expand');
            target.classList.remove('submission-code-collapse');
        }
    });
})();