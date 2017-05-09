

function Banner(banner,url,interval) {
    this.interval=interval||2000;
    this.banner=banner;
    this.bannerInner=utils.getElesByClass("bannerInner",this.banner)[0];
    this.focusUl=utils.getElesByClass("focusUl",this.banner)[0];
    this.left=utils.getElesByClass("left",this.banner)[0];
    this.right=utils.getElesByClass("right",this.banner)[0];
    this.imgs=this.bannerInner.getElementsByTagName("img");
    this.lis=this.focusUl.getElementsByTagName("li");
    this.data=null;
    this.url=url;
    this.index=0;
    this.timer=null;
    this.init();

}
Banner.prototype.getData=function () {
        var that=this;
        var xhr=new XMLHttpRequest();
        xhr.open("get",this.url+"?_="+Math.random(),false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&xhr.status==200){
                that.data=JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
};
Banner.prototype.bindData=function () {
    if (this.data) {
        var str = "";
        var strLi = "";
        var ary=[1];
        for (var i = 0; i < 6; i++) {
            while (ary.length===i+1){
                var a=Math.round(Math.random()*(this.data.length-1));
                if(ary.indexOf(a)===-1){
                    ary.push(a);
                }
            }
            console.log(a);
            str += "<div><img src='' real='" + this.data[i].src + "'></div>";
            strLi += i == 0 ? "<li class='li-cur'></li>" : "<li></li>";
        }
        this.bannerInner.innerHTML = str;
        this.focusUl.innerHTML = strLi;
    }
};
Banner.prototype.imgsDelayLoad=function () {
    var banner=document.getElementById("banner");//
    var that=this;
    for(var i=0;i<this.imgs.length;i++){
        var canvas=document.createElement("canvas");//
        var tempImg=document.createElement("img");
        tempImg.ctx=canvas.getContext('2d');//
        tempImg.index=i;
        tempImg.src=this.imgs[i].getAttribute("real");
        tempImg.onload=function () {
            this.ctx.drawImage(this,0,0,1120,500);//
            that.imgs[this.index].imageData=this.ctx.getImageData(0,0,1,1);//
            banner.style.backgroundColor="rgb("+that.imgs[0].imageData.data[0]+","+that.imgs[0].imageData.data[1]+","+that.imgs[0].imageData.data[2]+")";//
            that.imgs[this.index].color ="rgb("+that.imgs[this.index].imageData.data[0]+","+that.imgs[this.index].imageData.data[1]+","+that.imgs[this.index].imageData.data[2]+")";//
            that.imgs[this.index].src=this.src;
            if(this.index==0){
                utils.setCss(that.imgs[0].parentNode,"zIndex",1);
                animate({
                    ele:that.imgs[0].parentNode,
                    target:{
                        opacity:1
                    },
                    duration:500
                })
            }

        }

    }
};
Banner.prototype.autoPlay=function () {
    this.index++;
    if(this.index==this.imgs.length){
        this.index=0;
    }
    this.setImg();
};
Banner.prototype.setImg=function () {
    var banner=document.getElementById("banner");//
    for(var i=0;i<this.imgs.length;i++){
        var that=this;
        if(i==this.index){
            utils.setCss(this.imgs[i].parentNode,"zIndex",1);
            banner.style.backgroundColor=this.imgs[i].color;//
            animate({
                ele:this.imgs[i].parentNode,
                target:{
                    opacity:1
                },
                duration:500,
                callback:function () {
                    var siblings=utils.siblings(this);
                    for(var i=0;i<siblings.length;i++){
                        utils.setCss(siblings[i],"opacity",0);
                    }

                }
            });
          /*  RGBaster.colors(this.imgs[i], {
             success: function(payload) {
             // payload.dominant是主色，RGB形式表示
             // payload.secondary是次色，RGB形式表示
             // payload.palette是调色板，含多个主要颜色，数组
             $("#banner").css("background-color",payload.dominant)
             }
             });
*/        }else {
            utils.setCss(this.imgs[i].parentNode,"zIndex",0);
        }
    }
    for(var i=0;i<this.lis.length;i++){
        i==this.index?this.lis[i].className="li-cur":this.lis[i].className="";
    }
};
Banner.prototype.bindEventForBanner=function () {
    var that=this;
    this.banner.onmouseover=function () {
        window.clearInterval(that.timer);

    };
    this.banner.onmouseout=function () {
        that.timer = window.setInterval(function(){that.autoPlay();}, that.interval);

    };
};
Banner.prototype.bindEventForLis=function () {
    var that=this;
    for(var i=0;i<this.lis.length;i++){
       this.lis[i].index=i;
       this.lis[i].onclick=function () {
            that.index=this.index;
            that.setImg();
        }
    }
};
Banner.prototype.init=function () {
    var that=this;
    this.getData();
    this.bindData();
    this.imgsDelayLoad();
    this.timer=window.setInterval(function(){that.autoPlay()},that.interval);
    this.setImg();
   this.bindEventForBanner();
     this.bindEventForLis();
};

