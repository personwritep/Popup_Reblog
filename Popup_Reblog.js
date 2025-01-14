// ==UserScript==
// @name         Popup Reblog
// @namespace    http://tampermonkey.net/
// @version      0.7.2
// @description  リブログリンクを別タブで開く
// @author       Ameba Blog User
// @match        https://ameblo.jp/*
// @exclude      https://ameblo.jp/*/image*
// @noframes
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @grant        none
// @updateURL    https://raw.githubusercontent.com/personwritep/Popup_Reblog/refs/heads/main/Popup_Reblog.js
// @downloadURL    https://raw.githubusercontent.com/personwritep/Popup_Reblog/refs/heads/main/Popup_Reblog.js
// ==/UserScript==


let target=document.querySelector('head');
let monitor=new MutationObserver(new_retry);
monitor.observe(target, { childList: true });

function new_retry(){
    let iframe_doc;
    let retry=0;
    let interval=setInterval(wait_iframe_doc, 100);
    function wait_iframe_doc(){
        retry++;
        if(retry>10){ // リトライ制限 10回 1sec
            clearInterval(interval); }
        try{
            iframe_doc=
                document.querySelector('.reblogCard').contentWindow.document; } // 監視 target
        catch (e){ ; }

        if(iframe_doc){
            clearInterval(interval);
            let style=
                '<style class="r_style">'+
                '.rb-card { box-shadow: 0 0 0 1px #009688; } '+
                '.rb-card__main { height: 174px; } '+
                '.rb-card__icon { font-size: 24px; padding-bottom: 2px; border: none; } '+
                '.rb-card__icon-text { font-size: 14px; top: -7px; } '+
                '.rb-card__head { padding: 6px 8px 2px; background: #009688; } '+
                '.rb-card__author-title { font: bold 16px/22px Meiryo; color: #fff; } '+
                '.rb-card__author-title p { margin: 0; } '+
                '.rb-card__button-more { display: none; } '+
                '.transfer .rb-card__head { background: #fff; } '+
                '.transfer .rb-card__author-title { color: #000; }'+
                '</style>';

            if(!iframe_doc.querySelector('.r_style')){
                iframe_doc.body.insertAdjacentHTML('beforeend', style); }


            let reblog_card=iframe_doc.querySelector('.rb-card');
            if(reblog_card){
                let data_href=reblog_card.getAttribute('href');
                let rb_card_main=reblog_card.querySelector('.rb-card__main');
                rb_card_main.addEventListener('click', function(event){
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    if(event.ctrlKey==true){
                        window.location.href=data_href; }
                    else{
                        window.open(data_href, '_blank'); }}, false);

                document.body.addEventListener('keydown', function(event){
                    if(event.ctrlKey==true){
                        reblog_card.classList.add('transfer');
                        document.body.addEventListener('keyup', function(event){
                            reblog_card.classList.remove('transfer'); }); }});
            }}
    } // wait_iframe_doc
} // new_retry
