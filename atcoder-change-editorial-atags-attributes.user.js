// ==UserScript==
// @name         atcoder-change-editorial-atags-attributes
// @namespace    https://github.com/ilplrr
// @version      1.3
// @description  問題ページの「解説」を新しいタブで開くように設定します。また、解説ページ内のリンク（外部サイト除く）を同じタブで開くよう設定します。
// @author       ilplrr
// @include      /^https:\/\/atcoder\.jp\/contests\/[^\/]+\/tasks\/[^\/]+$/
// @include      /^https:\/\/atcoder\.jp\/contests\/[^\/]+\/tasks\/[^\/]+\/editorial\/?$/
// @include      /^https:\/\/atcoder\.jp\/contests\/[^\/]+\/editorial\/?$/
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const m = location.pathname.match(/^\/contests\/(?<contestId>[^\/]+)/);
  const contestPathname = m ? m[0] : null;

  if (location.href.match(/\/editorial\/?$/)) {
    const editorialPathname = `${contestPathname}/editorial/`;
    document.querySelectorAll(`a[href^="${editorialPathname}"]`).forEach((a) => {
      if (a.pathname.startsWith(editorialPathname) && a.pathname !== editorialPathname) {
        a.removeAttribute('target');
      }
    });
  } else {
    const elm = document.querySelector(`a[href="${location.pathname}/editorial"]`);
    elm.setAttribute('target', '_blank');
    elm.setAttribute('rel', 'noopener');
  }
})();
