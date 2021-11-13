// ==UserScript==
// @name         atcoder-remove-unusual-css
// @namespace    https://github.com/ilplrr
// @version      1.0
// @description  企業コンなどの普段と違う色設定を削除します。
// @author       ilplrr
// @match        https://atcoder.jp/contests/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1 番目の style タグに書かれているっぽい。
    // この style タグは企業コンなどでなくても置かれている（普段はタグ内テキストが空文字列）。
    document.querySelector('style').textContent = '';
})();