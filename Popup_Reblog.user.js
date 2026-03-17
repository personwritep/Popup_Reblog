// ==UserScript==
// @name        Popup Reblog
// @namespace        http://tampermonkey.net/
// @version        1.2
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
                // カードが生成されない場合
                '.rb-card.alternative { display: block; border-radius: 4px; text-decoration: none; } '+
                '.rb-card__icon.alternative { font-size: 14px; padding: 0; } '+
                '.rb-card__main.alternative { padding: 4px 16px; height: 74px; } '+
                '.rb-card__author-title.alternative { word-break: break-word; } '+
                '</style>';

            if(!iframe_doc.querySelector('.r_style')){
                iframe_doc.body.insertAdjacentHTML('beforeend', style); }


            let p_reblog=
                '<style class="p_reblog">'+
                'iframe[data-entry-id] { max-height: 192px; }</style>';

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
                    let reblog_iframe=document.querySelector('.reblogCard');
                    if(reblog_iframe){
                        let reblog_src=reblog_iframe.getAttribute('src');
                        if(reblog_src){
                            let reblog_href=reblog_src.substring(0, reblog_src.indexOf('?reblogAmeba'));
                            reblog_href=reblog_href.replace('s/embed/reblog-card/', '');

                            let alt_card=
                                '<a class="rb-card alternative" href="'+ reblog_href +'">'+
                                '<div class="rb-card__main alternative">'+
                                '<div class="rb-card__icon alternative">Reblog Card</div>'+
                                '<div class="rb-card__head alternative">'+
                                '<div class="rb-card__author-title alternative">'+ reblog_href +'</div>'+
                                '</div></div></a>';

                            let iframe_body=iframe_doc.body;
                            if(iframe_body){
                                iframe_body.insertAdjacentHTML('beforeend', alt_card); }}}

                } // リブログカードが壊れている場合

            } // set_reblog()

        } // if(iframe_doc)

    } // wait_iframe_doc

} // new_retry
