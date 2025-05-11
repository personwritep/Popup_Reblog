// ==UserScript==
// @name        Popup Reblog
// @namespace        http://tampermonkey.net/
// @version        1.1
// @description        リブログリンクを別タブで開く
// @author        Ameba Blog User
// @match        https://ameblo.jp/*
// @exclude        https://ameblo.jp/*/image*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @noframes
// @grant        none
// @updateURL        https://github.com/personwritep/Popup_Reblog/raw/main/Popup_Reblog.user.js
// @downloadURL        https://github.com/personwritep/Popup_Reblog/raw/main/Popup_Reblog.user.js
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
                '.rb-card__main { padding: 4px 16px 0; height: 174px; } '+
                '.rb-card__icon { font-size: 24px; height: 24px; border: none; } '+
                '.rb-card__icon-text { font-size: 14px; top: -7px; } '+
                '.rb-card__head { padding: 4px 20px 0; margin: 0 -12px; background: #009688; } '+
                '.rb-card__author-thumb>img { width: 36px; height: 36px; } '+
                '.rb-card__author-title { font: bold 16px/22px Meiryo; color: #fff; } '+
                '.rb-card__author-title p { margin: 0; } '+
                '.rb-card__button-more { display: none; } '+
                '.transfer .rb-card__head { background: #fff; } '+
                '.transfer .rb-card__author-title { color: #000; }'+
                // リブログカードが壊れた場合
                '.sorry { margin: 20px; } '+
                '.sorry .ambHeader { background: #00d8c3; cursor: pointer; } '+
                '.sorry .ambHeader:hover { opacity: 0.8; } '+
                '.sorry .contents { padding: 6px; background: #fff; } '+
                '.sorry .contents__text, .sorry .sp_footer__list { display: none; } '+
                '.sorry .sp_footer { padding: 20px; } '+
                '</style>';

            if(!iframe_doc.querySelector('.r_style')){
                iframe_doc.body.insertAdjacentHTML('beforeend', style); }


            let p_reblog=
                '<style class="p_reblog">'+
                'iframe[data-entry-id] { height: 192px !important; }</style>';

            if(!document.querySelector('.p_reblog')){
                document.body.insertAdjacentHTML('beforeend', p_reblog); }


            set_reblog(iframe_doc);

            function set_reblog(iframe_doc){
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

                } // if(reblog_card)

                else{ // リブログカードが壊れている場合
                    let iframe=document.querySelector('.reblogCard');
                    //           iframe.style.outline='1px solid #009688';
                    //           iframe.style.outlineOffset='-15px';
                    //           iframe.style.borderRadius='19px';

                    let if_src=iframe.getAttribute('src');
                    if(if_src){
                        let if_href=if_src.substring(0, if_src.indexOf('?reblogAmeba'));
                        if_href=if_href.replace('s/embed/reblog-card/', '');

                        let header_link=iframe_doc.querySelectorAll('.sorry .my_page a');
                        if(header_link[0]){
                            header_link[0].setAttribute('href', if_href); }

                        for(let k=1; k<header_link.length; k++){
                            header_link[k].remove(); }

                        let contents_title=iframe_doc.querySelector('.sorry .contents__title');
                        if(contents_title){
                            contents_title.textContent=if_href; }

                        let ambHeader=iframe_doc.querySelector('.ambHeader');
                        if(ambHeader){
                            ambHeader.onclick=function(event){
                                event.preventDefault();
                                window.open(if_href); }}}

                } // リブログカードが壊れている場合

            } // set_reblog()

        } // if(iframe_doc)

    } // wait_iframe_doc
} // new_retry
