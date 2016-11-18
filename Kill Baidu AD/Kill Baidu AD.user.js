// ==UserScript==
// @name               Kill Baidu AD
// @name:zh-CN         百度广告(首尾推广及右侧广告)清理
// @namespace    hoothin
// @version      0.3
// @description        Just Kill Baidu AD
// @description:zh-CN  彻底清理百度搜索(www.baidu.com)结果首尾的推广广告、二次顽固广告与右侧广告，并防止反复
// @author       hoothin
// @include      http*://www.baidu.com/*
// @grant        none
// @run-at       document-body
// @license     MIT License
// @compatible        chrome 测试通过
// @compatible        firefox 测试通过
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// ==/UserScript==

(function() {
    'use strict';
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(function(records){
        clearAD();
    });
    var option = {
        'childList': true,
        'subtree': true
    };
    observer.observe(document.body, option);

    function clearAD(){
        var list=document.body.querySelectorAll("#content_left>div,#content_left>table"),i;
        for(i=0;i<list.length;i++){
            let item = list[i];
            let s = item.getAttribute("style");
            if (s && /display:(table|block)\s!important/.test(s)) {
                item.parentNode.removeChild(item);
            }else{
                var span=item.querySelector("div>span");
                if(span && span.innerHTML=="广告"){
                    item.parentNode.removeChild(item);
                }
            }
        }

        var eb = document.querySelectorAll("#content_right>table>tbody>tr>td>div");
        for(i=0;i<eb.length;i++){
            let d = eb[i];
            if (d.id!="con-ar") {
                d.parentNode.removeChild(d);
            }
        }
    }
})();