// ==UserScript==
// @name         atcoder-move-submission-summary-top
// @namespace    https://github.com/ilplrr
// @version      1.0
// @description  AtCoderの提出結果ページで提出情報とジャッジ結果をページの上部に移動します。
// @author       ilplrr
// @match        https://atcoder.jp/contests/*/submissions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let elm = document.querySelector('#submission-code');
    const par = elm.parentElement;
    const dst = par.lastElementChild;
    while (elm.tagName !== 'HR') {
        const nxt = elm.previousSibling;
        par.insertBefore(elm, dst.nextSibling);
        elm = nxt;
    }

    const a = document.createElement('a');
    a.href = '#submission-code';
    a.textContent = 'ソースコードは最下部に表示しています。';
    par.insertBefore(a, elm.nextSibling);
})();