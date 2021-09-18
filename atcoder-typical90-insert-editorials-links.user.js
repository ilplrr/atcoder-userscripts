// ==UserScript==
// @name         atcoder-typical90-insert-editorials-links
// @namespace    https://github.com/ilplrr
// @version      1.0
// @description  「競プロ典型 90 問」の各問題ページに、トップページのテーブルにある「問題」、「解説」、「コード」のリンクを追加します。
// @author       ilplrr
// @include      /^https:\/\/atcoder\.jp\/contests\/typical90\/tasks\/[^\/]+$
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://atcoder.jp/contests/typical90');
    xhr.responseType = 'document';
    xhr.send('');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            insertLinks(xhr.response);
        }
    }

    function insertLinks(html) {
        const links = extractLinks(html);
        const problemId = location.href.match(/\/(\w+?)(\?.*)?$/)[1];
        const idx = parseNum(problemId.split('_').slice(-1)[0]);

        const elm = document.createElement('div');
        elm.setAttribute('style', 'font-size: 15px !important; font-weight: normal !important;');
        elm.innerHTML = [
            links[idx].problem,
            links[idx].editorials.join(' '),
            links[idx].code
        ].join(' ');
        document.querySelector('.h2').appendChild(elm);
    }

    function extractLinks(html) {
        const atags = html.querySelectorAll('table tr td a');
        let idx = 0;
        const links = {};
        atags.forEach(e => {
            const s = e.innerText;
            if (s.match('問題')) {
                idx += 1;
                links[idx] = { problem: e.outerHTML, editorials: [], code: null };
            } else if (s.match('解説')) {
                links[idx].editorials.push(e.outerHTML);
            } else if (s.match('コード')) {
                links[idx].code = e.outerHTML;
            }
        });
        return links;
    }

    function parseNum(str) { // a, b, .. , z, aa, ab, .. → 1, 2, .. , 26, 27, 28, ..
        let ret = 0;
        const baseCharCode = 'a'.charCodeAt(0);
        for (let i = 0; i < str.length; i++) {
            ret *= 26;
            ret += str.charCodeAt(i) - baseCharCode + 1;
        }
        return ret;
    }
})();