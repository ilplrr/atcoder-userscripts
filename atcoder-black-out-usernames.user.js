// ==UserScript==
// @name         atcoder-black-out-usernames
// @namespace    https://github.com/ilplrr
// @version      1.0
// @description  atcoder.jpで表示されるユーザー名を黒塗りで隠します。（一部ユーザー名以外も隠してしまいます……。）
// @author       ilplrr
// @match        https://atcoder.jp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const userId = (()=>{
        let ret = null;
        document.querySelectorAll('.navbar a').forEach(e => {const m = e.href.match(/\/users\/(.*)/);if(m) ret = m[1]});
        return ret;
    })();

    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = `
.username>*, /* プロフィールページのユーザー名 */
.hide-user-name, .hide-user-name:hover /* その他のユーザー名 */
{
	color: black !important;
	background-color: black !important;
}
`;
    document.querySelector('head').appendChild(style);

    const atags = document.getElementsByTagName('a');
    for(let i=0;i<atags.length;i++){
        const atag=atags[i];
        const href = atag.href;
        const text = atag.textContent;
        if (href.match(/\/users\/\w+$/)) {
            atag.classList.add('hide-user-name');
        }else if(userId && text.match(userId)){
            atag.classList.add('hide-user-name');
        }
    }
    const span = document.querySelector('div.header-mypage span.bold');
    span.classList.add('hide-user-name');
})();