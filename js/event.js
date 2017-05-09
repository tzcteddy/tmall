/**
 * Created by Administrator on 2017/2/9.
 */
/*
* 1 this事件
* 2 顺序问题
* 3 重复绑定
* */
/*div1.addEventListener("click",fn,false);
div1.attachEvent("onclick",fn);*/

//绑定
    function on(ele,type,fn) {
        if(ele.addEventListener){
            ele.addEventListener(type,fn)
        }else {
            if(!ele["AAA"+type]){
                ele["AAA"+type]=[];
                ele.attachEvent("on"+type,function(){run.call(ele)});//改变run中的this,匿名函数中的this是window
            }
            //if(ele["AAA"+type].indexOf(fn)===-1){ele["AAA"+type].push(fn);}
            for(var i=0;i<ele["AAA"+type].length;i++){
                if(ele["AAA"+type]===fn){
                    return;
                }
            }
            ele["AAA"+type].push(fn);
        }

    }
    function run(e) {
        e=window.event;
        e.target=e.srcElement;
        e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
        e.preventDefault=function () {
            e.returnValue=false;
        };
        e.stopPropagation=function () {
            e.cancelBubble=true;
        };
        var a=/*e.target*/this["AAA"+e.type];
        if(a&&a.length){
            for(var i=0;i<a.length;i++){
                if(typeof a[i]=="function"){
                    a[i].call(/*e.target*/this,e);//改变事件触发有效的函数（fn）中的this为e
                }else {
                    a.splice(i,1);//如果是null就把当前的这个null删掉，此刻是函数执行，必须保证每一项都执行
                    i--;//保证每一项都执行
                }
            }
        }
    }


//移除
    function off(ele,type,fn) {
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn)
        }else {
            var a=ele["AAA"+type];
            if(a&&a.length){
                for(var i=0;i<a.length;i++){
                    if(a[i]===fn){
                        //a.splice(i,1);
                        a[i]=null;//保证数组不塌陷，只要下run按照顺序执行的过程中如果调用off方法那么就会导致漏掉函数执行的问题，
                        break;
                    }
                }
            }
        }
    }

