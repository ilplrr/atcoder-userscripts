// ==UserScript==
// @name         atcoder-submission-code-replace-tab-to-spaces
// @namespace    https://github.com/ilplrr
// @version      1.0
// @description  提出ページのソースコードのタブ文字をスペースに置き換えます。
// @author       You
// @include      /https:\/\/atcoder\.jp\/contests\/[^/]+\/submissions\/\d+/
// @grant        none
// ==/UserScript==

setTimeout((function() {
    'use strict';
    const SCRIPT_NAME = GM.info.script.name;

    const orgCode = document.querySelector('#for_copy0').textContent;
    const orgLines = orgCode.split(/(?<=\n)/m);
    const lines = document.querySelectorAll('#submission-code li');

    if (orgLines.length !== lines.length) return;

    const notation = document.createElement('span');
    const p = document.querySelector('div hr').nextElementSibling;
    p.appendChild(notation);
    const updateNotation = (tabWidth) => {
        notation.textContent = tabWidth < 0 ? '' : `Replaced: Tab → ${tabWidth} spaces`;
        notation.style = 'margin-left: 1rem;';
    };

    const replace = (tabWidth) => {
        let replacedFlag = false;

        const nlines = lines.length;
        for (let i = 0; i < nlines; i++) {
            const elm = lines[i].firstChild;
            const s = orgLines[i];
            const tabs = s.match(/^\t*/).toString();
            if (tabs.length <= 0) continue;
            const spacesNum = tabWidth * tabs.length;
            elm.textContent = elm.textContent.replace(/^\s+/, ' '.repeat(spacesNum));
            replacedFlag = true;
        }

        if (replacedFlag) updateNotation(tabWidth);
    };
    replace(2);
}), 100);