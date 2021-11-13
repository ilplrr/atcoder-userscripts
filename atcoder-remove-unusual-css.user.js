// ==UserScript==
// @name         atcoder-remove-unusual-css
// @namespace    https://github.com/ilplrr
// @version      1.1
// @description  企業コンなどの普段と違う色設定を削除します。
// @author       ilplrr
// @match        https://atcoder.jp/contests/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener('readystatechange' ,() => {
        if (document.readyState !== 'interactive') return;

        // 1 番目の style タグに書かれているっぽい。
        // この style タグは企業コンなどでなくても置かれている（普段はタグ内テキストが空文字列）。
        document.querySelector('style').textContent = '';
    });
})();