// ==UserScript==
// @name         atcoder-confirm-submit-language
// @namespace    https://github.com/ilplrr
// @version      1.0
// @description  提出前に提出言語の再確認を促します。
// @author       ilplrr
// @match        https://atcoder.jp/contests/*/tasks/*
// @match        https://atcoder.jp/contests/*/submit*
// @grant        none
// ==/UserScript==

setTimeout((function() {
    'use strict';
    const SCRIPT_NAME = GM.info.script.name;

    const submitBtn = document.querySelector('#submit');
    let select = document.querySelector('select[name="data.LanguageId"]');
    let lang = select.parentNode.querySelector('span').textContent;

    const div = document.createElement('div');
    div.style = `padding:3px; margin:5px 0px;`;
    submitBtn.parentNode.insertBefore(div, submitBtn);

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = `${SCRIPT_NAME}-checkbox`;
    div.appendChild(cb);

    const label = document.createElement('label');
    const changeConfirmText = (lang) => {
        label.innerHTML = `提出前に再確認: <span style="color:red; font-size:1.5em;">${lang}</span> で提出する`;
    };
    changeConfirmText(lang);
    label.setAttribute('for', cb.id);
    label.style = 'margin:5px; font-weight:normal;';
    div.appendChild(label);

    const MOUSE_OVER_NAME = `${SCRIPT_NAME}-mouseover`;
    submitBtn.parentNode.childNodes.forEach((e)=>{
        if (e === div) return;
        const checkbox = document.querySelector(`#${cb.id}`);
        e.addEventListener('mouseover', () => checkbox.checked || div.classList.add(MOUSE_OVER_NAME));
        e.addEventListener('mouseleave', () => checkbox.checked || div.classList.remove(MOUSE_OVER_NAME));
    });
    const style = document.createElement('style');
    style.textContent = `.${MOUSE_OVER_NAME} {background-color: rgba(255,255,0,0.5);}`;
    document.body.appendChild(style);

    const toggle = () => {
        submitBtn.parentNode.childNodes.forEach((e)=>{
            if (e === div) return;
            e.disabled = !cb.checked;
        });
    };
    toggle();
    div.addEventListener('change', toggle);

    select.parentNode.onchange = (e)=>{
        const lang = select.parentNode.querySelector('span').textContent;
        changeConfirmText(lang);
    };
}),0);
