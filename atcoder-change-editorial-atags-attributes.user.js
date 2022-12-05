// ==UserScript==
// @name         atcoder-change-editorial-atags-attributes
// @namespace    https://github.com/ilplrr
// @version      1.1
// @description  問題ページの「解説」を新しいタブで開くように設定します。また、解説ページのリンクを同じタブで開くよう設定します。
// @author       ilplrr
// @include      /^https:\/\/atcoder\.jp\/contests\/[^\/]+\/tasks\/[^\/]+$/
// @include      /^https:\/\/atcoder\.jp\/contests\/[^\/]+\/tasks\/[^\/]+\/editorial$/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const basename = location.href.split('/').pop();
    if (basename === 'editorial') {
        document.querySelectorAll('a').forEach(atag => {
            if (atag.href.indexOf('/editorial/') > 0) {
                atag.removeAttribute('target');
            }
        });
    }else{
        const elm = document.querySelector(`a[href="${location.pathname}/editorial"]`);
        elm.setAttribute('target','_blank');
        elm.setAttribute('rel','noopener');
    }
})();
