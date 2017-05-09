/**
 * Created by Administrator on 2017/2/9.
 */
;(function () {
    var form=document.getElementById("form");
    var input=form.getElementsByTagName("input")[0];
    var searchBox=form.getElementsByClassName("searchBox")[0];
    on(input,"input",fn);
    on(input,"focus",fn);
    function fn(e) {
        var reg=/^\s*$/;
        if(!reg.test(this.value)){
            searchBox.style.display='block';
        }else {
            searchBox.style.display='none';
        }

    }
//给列表绑定一个点击事件
    on(searchBox,'click',foo);
    function foo(e) {
        if(e.target.nodeName=='A'||e.target.nodeName=="LI"){
            input.value=e.target.innerText;
            this.style.display='none';
        }
    }
})();
//轮播图
/*;(function () {
    var bannerBox=document.getElementById("bannerBox");
    var bannerInner=bannerBox.getElementsByClassName("bannerInner")[0];
    var focusUl=bannerBox.getElementsByClassName("focusUl")[0];
    var imgs=bannerInner.getElementsByTagName("img");
    var lis=focusUl.getElementsByTagName("li");
    var innerData=null;

    ;(function () {
        var xhr=new XMLHttpRequest();
        xhr.open("get","innerData.txt?_"+Math.random(),false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&xhr.status==200){
                innerData=JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
    })();
    console.log(innerData);
    ;(function () {
        if(innerData&&innerData.length){
            var str="";
            var strLi="";
            var ary=[Math.round(Math.random()*(innerData.length-1))];
            var a=null;
            console.log(ary.length);
            for(var i=0;i<6;i++){
                while (ary.length===i+1){
                     a=Math.round(Math.random()*(innerData.length-1));
                    if(ary.indexOf(a)===-1){
                        ary.push(a);
                    }
                }

                str+="<a href='javascript:;'><div><img src='' real='"+innerData[ary[i]].src+"'></div></a>";
                /!*strLi+=i==0?"<li class='li-cur'></li>":"<li><li>";*!/
            }
            bannerInner.innerHTML=str;
           /!* focusUl.innerHTML=strLi;*!/
        }
    })();

    ;(function () {
        for(var i=0;i<imgs.length;i++){
            var tempImg=document.createElement("img");
            tempImg.index=i;
            tempImg.src=imgs[i].getAttribute("real");
            tempImg.onload=function () {
                imgs[this.index].src=this.src;
                if(this.index==0){
                    utils.setCss(imgs[0].parentNode,"zIndex",1);
                    animate({
                        ele:imgs[0].parentNode,
                        target:{
                            opacity:1
                        },
                        duration:500
                    })
                }
            }
        }
    })();


    var timer=window.setInterval(autoPlay,3000);
    console.log(timer);
    var index=0;
    function autoPlay() {
        index++;
        if(index>=6){
            index=0;
        }
        s();
    }
    function s() {
        for(var i=0;i<imgs.length;i++){
            if(i==index){
                utils.setCss(imgs[i].parentNode,"zIndex",1);
                animate({
                    ele:imgs[i].parentNode,
                    target:{
                        opacity:1
                    },
                    duration:500,
                    callback:function () {
                        var besides=utils.siblings(this);
                        for(var i=0;i<besides.length;i++){
                            utils.setCss(besides[i],"opacity",0);
                        }
                    }
                })
            }else {
                utils.setCss(imgs[i].parentNode,"zIndex",0);
            }
        }
        for(var i=0;i<lis.length;i++){
            if(i==index){
                lis[i].className="li-cur";
            }else {lis[i].className="";}
        }
    };

    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function () {
            index=this.index;
            s();
        }
    }
})();*/
var bannerBox=document.getElementById("bannerBox");
new Banner(bannerBox,"innerData.txt",3000);//轮播图结束


//选项卡
;(function () {
    var ul=document.getElementById("commodity-calss");
    var lis=ul.getElementsByTagName("li");
    var divs=ul.getElementsByClassName("commodity-box");
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        divs[i].index=i;
        lis[i].onmouseover=function () {
            this.style.backgroundColor="white";
            /*var others=utils.siblings(this);
            for(var j=0;j<others.length;j++){
                others[j].style.backgroundColor="";
            }*/
            divs[this.index].style.display="block";

        };
        lis[i].onmouseout=function () {
            this.style.backgroundColor="";
            divs[this.index].style.display="none";
        }
    }
})();//选项卡结束




//直播
;(function () {
    var live=document.getElementById("live");
    var liveTop=live.getElementsByClassName("live-top")[0];
    var ul=live.getElementsByClassName("live-list")[0];
    var left=live.getElementsByClassName("left")[0];
    var right=live.getElementsByClassName("right")[0];
    var lis=ul.getElementsByTagName("li");
    var divs=liveTop.getElementsByTagName("div");
    var data=null;
$(".live-top")
    ;(function () {

        var xhr=new XMLHttpRequest();
        xhr.open("get","data/bigData.txt?_"+Math.random(),false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&xhr.status==200){
                data=JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
    })();
    ;(function () {
        if(data&&data.length){
            var strDiv="";
            var strLi="";
            for(var i=0;i<data.length;i++){
                strDiv+="<div><img src='"+data[i].src+"' alt=''><a href='"+"javascript:;"+"'><img src='"+"image/live/bigplay.png"+"' alt=''></a><span class='icon26'><i></i>直播中</span></div>";
                strLi+="<li class='"+"live-middle"+"'><img src='"+data[i].src+"' alt=''><a href='"+"javascript:;"+"'><img src='"+"image/live/bigplay.png"+"' alt=''></a></li>";
            }
            liveTop.innerHTML=strDiv;
            ul.innerHTML=strLi;
        }
    })();

    ;(function () {
        for(var i=0;i<lis.length;i++){
            lis[i].index=i;
            if(i===0){
               lis[0].className="cur";
                divs[0].style.display="block";
            }
            lis[i].onmouseover=function () {

                this.className="cur";
                var liOthers=utils.siblings(this);
                for(var j=0;j<liOthers.length;j++){
                    liOthers[j].className="";
                }
                var cur=divs[this.index];
                cur.style.display="block";
                var others=utils.siblings(cur);
                for(var j=0;j<others.length;j++){
                    others[j].style.display="none";
                }

            }
        }
    })();

    ;(function () {
        right.onclick=function () {
            ul.style.left=-496+"px";
            left.style.display="block";
            right.style.display="none";
        };
        left.onclick=function () {
            ul.style.left=-4+"px";
            left.style.display="none";
            right.style.display="block";
        }
    })();

    ;(function () {
        var text=document.getElementById("live-text");
        var timer=null;
        var top=null;
        window.clearInterval(timer);
      timer=window.setInterval(function () {
          top-=40;
          if(top<=-120){
              top=0
          }
          text.style.top=top+"px";
      },3000)
    })()

})();//直播结束



//刷新
;(function () {
    var brandUl=document.getElementById("brand-ul");
    var flip=brandUl.getElementsByClassName("flip");
    var flipClick=brandUl.getElementsByClassName("brand-li-refresh")[0];
    flipImg();
    function flipImg() {
        var data=null;
        var n=Math.round(Math.random());
        var xhr=new XMLHttpRequest();
        xhr.open("get","data/brandData.txt",false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&xhr.status==200){
                data=JSON.parse(xhr.responseText)
            }
        };
        xhr.send();
        for(var i=0;i<flip.length;i++){
            var str="";
            str+="<div class='brand-img'><img src='"+data[n][i].src+"' alt=''></div>";
            str+=" <div class='brand-mask'><span class='icon28'></span><p>优惠券 ¥100</p><a href='javascript:;'>点击进入</a></div>";
            flip[i].innerHTML=str;
        }
    }

    flipClick.onclick=refresh;
    function refresh() {

            var i=0;
            window.clearInterval(timer);
            var timer=window.setInterval(function () {
                if(i>7){
                    i=0;
                    window.clearInterval(timer);
                    return;
                }
                for(var j=0;j<flip.length;j++){
                    if(Math.floor(j/6)+j%6===i){
                        var curDeg= flip[j].style.transform;
                        if(!flip[j].style.transform){
                            curDeg="rotateY(0deg)";
                        }
                        var reg=/^rotateY\((\d+)deg\)$/;
                        var newDeg=parseFloat(curDeg.match(reg)[1]);
                       newDeg+=180;
                        flip[j].style.webkitTransform='rotateY('+newDeg+'deg)';
                    }
                }
                i++;
            },300);
    }
})();


//onscroll事件
;(function () {
    var rightTop=document.getElementById("return-top");
    var search=document.getElementById("header-search");
    var trend=document.getElementById("trend");
    var leftNav0=document.getElementById("leftNav");
    var leftTop=document.getElementById("lnb-8");
    var leftNav=document.getElementById("lnav-btm");
    var menuBox=document.getElementById("bigBox");
    var lnbs=leftNav.getElementsByClassName("lnb");
    var menus=menuBox.getElementsByClassName("menus");
    var color=["#EA5F8D","#0AA6E8","#64C333","#F15453","#19C8A9","#F7A945","red"];

    window.onscroll=scrollEvent;
    rightTop.onclick=backTop;
    leftTop.onclick=backTop;
    for(var i=0;i<lnbs.length;i++){
        lnbs[i].index=i;
        lnbs[i].onclick=function () {
            menu(menus[this.index])
        }
    }

    function scrollEvent() {
        var color=["#EA5F8D","#0AA6E8","#64C333","#F15453","#19C8A9","#F7A945","red"];
        var flag=0;
        var val=utils.win("scrollTop");
        var winHeight=utils.win("clientHeight");
        val===0?utils.setCss(rightTop,"opacity",0):utils.setCss(rightTop,"opacity",1);
        val>=698?utils.setCss(search,"top",0):utils.setCss(search,"top",-50);
        val+winHeight>=utils.offset(trend).top? $("#leftNav").css({"width":35,"height":332})/*utils.setCss(leftNav0,"display","block")*/:$("#leftNav").css({"width":0,"height":0})/*utils.setCss(leftNav0,"display","none")*/;

        for(var i=0;i<6;i++){
            lnbs[i].index=i;
            lnbs[i].color=color[i];
            lnbs[6].color=color[6];
            var a=utils.offset(menus[i]).top+menus[i].offsetHeight;
            var b=utils.win("scrollTop")+utils.win("clientHeight");
            var c=utils.win("scrollTop");
            var d=utils.offset(menus[i]).top;
            if(c>utils.offset(menus[6]).top-60){
                lnbs[6].style.backgroundColor=lnbs[6].color;
            }else {lnbs[6].style.backgroundColor="";}
            if(c<d&& !flag){
                lnbs[i].style.backgroundColor=lnbs[i].color;
                flag=1;
            }else {
                lnbs[i].style.backgroundColor="";
            }
        }

    }


    function backTop() {
        window.clearInterval(timer);
        var timer=window.setInterval(function () {
            var curVal=utils.win("scrollTop");
            if(curVal<=0){
                window.clearInterval(timer);
            }
            curVal-=50;
            utils.win("scrollTop",curVal);
            window.onscroll=scrollEvent;
        },10)
    }

    function menu(ele) {
        var curVal=utils.win("scrollTop");
        var val=ele.offsetTop-50;
        var timer=null;
        if(curVal>val){
            window.clearInterval(timer);
            timer=window.setInterval(function () {

                if(curVal<=val){
                    window.clearInterval(timer);
                    utils.win("scrollTop",val);
                    return;
                }
                curVal-=20;
                utils.win("scrollTop",curVal);
            },0.3)
        }else {
            window.clearInterval(timer);
            timer=window.setInterval(function () {
                if(curVal>=val){
                    window.clearInterval(timer);
                    utils.win("scrollTop",val);
                    return;
                }
                curVal+=10;
                utils.win("scrollTop",curVal);
            },0.3)
        }
    };
})();


