// ==UserScript==
// @name         atcoder-change-submission-pages-favicon
// @namespace    https://github.com/ilplrr
// @version      1.0
// @description  提出結果ページと自分の提出一覧ページの favicon を提出結果のラベルに変えます。
// @author       ilplrr
// @match        https://atcoder.jp/contests/*/submissions/*
// @match        https://atcoder.jp/contests/*/submissions/me
// @match        https://atcoder.jp/contests/*/submissions/me?*
// @require      https://cdn.jsdelivr.net/npm/html2canvas@1.3.2/dist/html2canvas.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const favicon = document.querySelector('link[rel="shortcut icon"]');

    function f() {
        const target = document.querySelector('span.label');
        const s = target.textContent;
        if (!s.match(/^[^\W0-9]+$/) || s.match(/WJ/)) setTimeout(f, 3000);

        html2canvas(target, {backgroundColor: 'transparent'}).then(orgCanvas => {
            const canvas = document.createElement('canvas');
            const orgW = orgCanvas.width;
            const orgH = orgCanvas.height;
            const len = orgW;
            canvas.height = canvas.width = len; // 正方形に拡張

            const ctx = canvas.getContext('2d');
            const dx = 0;
            const dy = parseInt(len/2 - orgH/2);
            ctx.drawImage(orgCanvas, dx, dy, orgW, orgH);

            favicon.href = canvas.toDataURL('image/png');
        });
    };
    f();
})();
