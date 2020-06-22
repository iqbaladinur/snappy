//contructor
var randomNumber = Math.floor(Math.random() * 3) + 1;

document.getElementById("bg").className += " splash-"+randomNumber;

// Initialize your app
var myApp = new Framework7({ 
    modalTitle: 'Caution',
    material:true,
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {});
//===========================global variable=============================================
var imgurl;
var att;
//===========================Function Apps===============================================
//openfile from page 1
var openFile = function(event) {
    var input = event.target;
    att=input.files[0];
    var reader = new FileReader();
    reader.onload = function(e){
      imgurl = e.target.result;
    };
    reader.onloadend=function(){
      mainView.router.loadPage('editapp.html');   
    };
    reader.readAsDataURL(input.files[0]);
};


//draw image
function draw(img){
    var vas = document.getElementById("effect");
    var konteks = vas.getContext("2d");
    vas.width=img.width;
    vas.height=img.height;
    konteks.drawImage(img,0,0);
};

//take value from canvas
function takearrayimg(canvas){
    var konteks=canvas.getContext("2d");
    var imgdata= konteks.getImageData(0,0,canvas.width,canvas.height);
    return imgdata;
};

//print value to canvas
function puteffect(imgData){
    var canvas = document.getElementById("effect");
    var konteks = canvas.getContext("2d");
    konteks.putImageData(imgData,0,0);
};

//switch display
function switchDisplay(){
    document.getElementById('img').style.display="inline"; 
    document.getElementById('effect').style.display="none";
};
//displayswitch
function displayswitch(){
    document.getElementById('img').style.display="none"; 
    document.getElementById('effect').style.display="inline";
};

//====================================Here the effects function=====================================

//negative
function invert(imgData){
    for (var i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i] = 255 - imgData.data[i];        //red
        imgData.data[i+1] = 255 - imgData.data[i+1];    //green
        imgData.data[i+2] = 255 - imgData.data[i+2];    //blue
    }
    return imgData;
};

//grayscale
function grayscale(imgData){
    for (var i = 0; i < imgData.data.length; i+=4) {
        var x =(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
        imgData.data[i]   = x;   //red
        imgData.data[i+1] = x;   //green
        imgData.data[i+2] = x;   //blue/
    }
    return imgData;
};

//black&white
function blackandwhite(imgData){

    for (var i = 0; i < imgData.data.length; i+=4) {
        var x =(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
        if (x>128) {
            imgData.data[i]   = imgData.data[i+1] = imgData.data[i+2] = 255;   //rgbA    
        }else{
            imgData.data[i]   = imgData.data[i+1] = imgData.data[i+2] = 0;   //rgb
        }
        
    }
    return imgData;
};

//transparantsi
function transparent(imgData,value){
    for (var i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i+3]=value; //alpha channel
    };
    return imgData;
};

//brightness
function bright(imgData,value){
    for (var i = 0; i < imgData.data.length; i+=4) {
        if (
            imgData.data[i]+value<255 && imgData.data[i]+value>0 
            || imgData.data[i+1]+value<255 && imgData.data[i+1]+value>0 
            || imgData.data[i+2]+value<255 && imgData.data[i+2]+value>0
        ) {
            imgData.data[i]+=value;
            imgData.data[i+1]+=value;
            imgData.data[i+2]+=value;
        };    
    };
    return imgData;
};
//contras
function con(imgData,value){
    var P=150;                                          //nilai pusaran
    for (var i=0;i<imgData.data.length;i+=4){
        imgData.data[i]  =value*(imgData.data[i]-P)+P;      //r
        imgData.data[i+1]=value*(imgData.data[i+1]-P)+P;    //g
        imgData.data[i+2]=value*(imgData.data[i+2]-P)+P;    //b
    }
    return imgData;
};  
//contrass streching
function contrass(imgData){
    for (var i = 0; i < imgData.data.length; i+=4) {
        var max=Math.max(imgData.data[i],imgData.data[i+1],imgData.data[i+2]);
        var min=Math.min(imgData.data[i],imgData.data[i+1],imgData.data[i+2]);
        var b  =255/(max-min);
        imgData.data[i]  =(imgData.data[i]-min)*b;
        imgData.data[i+1]=(imgData.data[i+1]-min)*b;
        imgData.data[i+2]=(imgData.data[i+2]-min)*b;
    };
    return imgData;
};
//Alien Color filter
function Alien(imgData){
     for (var i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i] = imgData.data[i+2];      //red to blue
        imgData.data[i+2] = imgData.data[i];      //blue to red
    }
    return imgData;
};
function Alien1(imgData){
     for (var i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i+1] = imgData.data[i+2];    //green to blue
        imgData.data[i+2] = imgData.data[i];      //blue to red
    }
    return imgData;
};
function Alien2(imgData){
     for (var i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i+1] = imgData.data[i+2];    //green to blue
        imgData.data[i+2] = imgData.data[i+1];    //blue to green
    }
    return imgData;
};
function Alien3(imgData){
     for (var i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i]   = imgData.data[i+1];    //red to green
        imgData.data[i+1] = imgData.data[i+2];    //green to blue
    }
    return imgData;
};
function Alien4(imgData){
     for (var i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i+1]   = imgData.data[i];      //green to red
        imgData.data[i+2]   = imgData.data[i+1];    //blue to green
    }
    return imgData;
};

//=========================filter3x3====================================
//global variabel filter
sharpen     = [0, -1, 0, -1, 5, -1, 0, -1, 0];
blur        = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
gaussian    = [1/16,1/8,1/16,1/8,1/4,1/8,1/16,1/8,1/16];
edgedetect1 = [1,0,-1,0,0,0,-1,0,1];
edgedetect2 = [0,1,0,1,-4,1,0,1,0];
edgedetect3 = [-1,-1,-1,-1,8,-1,-1,-1,-1];
emboss      = [-7,0,7,-7,1,7,-7,0,7];
sobelx      = [-1,0,1,-2,0,2,-1,0,1];
sobely      = [1,2,1,0,0,0,-1,-2,-1];

function filter(bobot, ctx, w, h, mix) {
        pembulatan = Math.round(Math.sqrt(bobot.length)),
        half       = (pembulatan * 0.5) | 0,
        dstData    = ctx.createImageData(w, h),
        dstBuff    = dstData.data,
        srcBuff    = ctx.getImageData(0, 0, w, h).data,
        y = h;
    while (y--) {
        x = w;
        while (x--) {
            var sy = y,
                sx = x,
                dstOff = (y * w + x) * 4,
                r = 0,
                g = 0,
                b = 0,
                a = 0;
            for (var cy = 0; cy < pembulatan; cy++) {
                for (var cx = 0; cx < pembulatan; cx++) {
                    var scy = sy + cy - half;
                    var scx = sx + cx - half;
                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        var srcOff = (scy * w + scx) * 4;
                        var wt = bobot[cy * pembulatan + cx];
                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }
            dstBuff[dstOff]     = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix)
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }

    return dstData;
};

function onSaveImage() {
    FB.AppEvents.logEvent("Saved Image");
    console.log('saved');
};

//=======================================transformation===========================
//horizontal mirror
function horizontal_mirror(imgdata) {
   for (var i = 0; i<imgdata.height; i++) {
       for (var j = 0; j <imgdata.width/2; j++) {
           var index      =i*4*imgdata.width+(j*4);
           var mirorrindex=((i+1)*4)*imgdata.width-((j+1)*4);
           for (var k =0; k<4; k++) {
              var temp=imgdata.data[index+k];
              imgdata.data[index+k]=imgdata.data[mirorrindex+k];
              imgdata.data[mirorrindex+k]=temp;
           };
       };
   };
   return imgdata;
};
//vertical mirror
function vertical_mirror(imgdata) {
    imgdata=horizontal_mirror(imgdata);
    for (var i = 0; i<imgdata.height; i++) {
       for (var j = 0; j <imgdata.width/2; j++) {
           var index      =i*4*imgdata.width+(j*4);
           var mirorrindex=(imgdata.width*(imgdata.height-i)-j-1)*4;
           for (var k =0; k<4; k++) {
              var temp=imgdata.data[index+k];
              imgdata.data[index+k]=imgdata.data[mirorrindex+k];
              imgdata.data[mirorrindex+k]=temp;
           };
       };
   };
   return imgdata;
};

function rotateright(canvas,img,degrees){
    var ctx=canvas.getContext('2d');
    if (img.width==img.height) {
        ctx.translate(canvas.width,0);
        ctx.rotate(90*Math.PI/180);
        ctx.drawImage(img,0,0);
    }else{
        myApp.alert(":'[ its too embarrassing, we're gonna fix soon.","Error_255");
    };
};
function rotateleft(canvas,img,degrees){
    if (img.width==img.height) {
        rotateright(canvas,img,degrees);
        rotateright(canvas,img,degrees);
        rotateright(canvas,img,degrees);
    }else{
        myApp.alert(":'[ its too embarrassing, we're gonna fix soon.","Error_255");
    };
    
};

//===================main page execute=============
myApp.onPageInit('mainapp', function (page) {
    //variabel
    var d= new Date();
        var hari =String(d.getDay());
        var bulan=String(d.getMonth());
        var tahun=String(d.getFullYear());
        var jam=String(d.getHours());
        var menit=String(d.getMinutes());
        var detik=String(d.getMilliseconds());
    img_prop=document.getElementById('img');
    var fileinme=document.getElementById('input').files;
    var target=document.getElementsByClassName('filter');
    //loadpicture
    myApp.showIndicator();
    setTimeout(function(){ 
        //display
         img_prop.src=imgurl;
         setTimeout(function(){
            draw(img_prop);
            myApp.hideIndicator();
         },100);
         vascan=document.getElementById('effect');
    },300);

    $$('#input').on('change',function(event){
        myApp.showIndicator();
        openFile(event);
        setTimeout(function () {
            img_prop.src=imgurl;
            setTimeout(function () {
                draw(img_prop);         
                myApp.hideIndicator();
            }, 100);
        }, 300);

        FB.AppEvents.logEvent("open from main menu");
    });

    //save button
    $$('.savepanel').on('click',function(){
        var filecanvas=document.getElementById('effect');
        if (att.size>700000) {
            var UrltoDownload=filecanvas.toDataURL("image/jpeg",0.5);
        }else{
            UrltoDownload=filecanvas.toDataURL("image/jpeg",1.0);
        }
        var fixurl=UrltoDownload;//.replace("image/png","image/octet-stream");
        var linkdon=document.createElement('a');
        linkdon.href=fixurl;
        linkdon.download=jam+menit+detik+"_"+bulan+hari+tahun+".png";
        linkdon.click();
        onSaveImage();
        //window.open(fixurl,'_blank');
    }); 

//effect button
var actionSheetButtons = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Choose Effects',
                label: true
            },
            //normal button
            {
                text: 'Default',
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                        draw(img_prop);
                        myApp.hideIndicator();
                    }, 1000);
                    FB.AppEvents.logEvent("using default filter");
                }
            },
            // negative button
            {
                text: 'Invert Color',
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                    myApp.hideIndicator();
                    var imagei=takearrayimg(vascan);
                    var imagej=invert(imagei);
                    puteffect(imagej);
                    }, 1300);
                    FB.AppEvents.logEvent("using invert color");
                }
                //functionhere
            },
            {
                text: 'Black and White',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {myApp.hideIndicator();
                        var imagei=takearrayimg(vascan);
                        var imagej=blackandwhite(imagei);
                        puteffect(imagej);
                    }, 1300);
                    FB.AppEvents.logEvent("using black and white");
                }
            },
            {
                text: 'Grayscale',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {myApp.hideIndicator();
                        var imagei=takearrayimg(vascan);
                        var imagej=grayscale(imagei);
                        puteffect(imagej);
                    }, 1300);

                    FB.AppEvents.logEvent("using grayscale");
                }
            },
            {
                text: 'Brightness, Transparantsi & Contras',
                //functionhere
                onClick: function () {
                    myApp.pickerModal('.picker-modal-demo');
                }
            },
            {
                text: 'Contras Stretch',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                    myApp.hideIndicator();
                    var imagei=takearrayimg(vascan);
                    var imagej=contrass(imagei);
                    puteffect(imagej);
                    }, 1300);
                    FB.AppEvents.logEvent("using contras strech");
                   // myApp.pickerModal('.picker-modal-demo2');
                }
            },
            {
                text: 'More Effects',
                //functionhere
                onClick: function () {
                  myApp.actions(target,actionSheetButtons2);
                }
            },
        ]
    ];

//more effect button
var actionSheetButtons2 = [
        // First buttons group
        [
            // Group Label
            {
                text: 'More Effects',
                label: true
            },
            {
                text: 'RGB Manipulation',
                onClick: function () {
                     myApp.actions(target,actionSheetButtons3);
                }
            },
            {
                text: 'Transformation',
                onClick: function () {
                     myApp.actions(target,actionSheetButtons4);
                }
            },
            {
                text: 'Emboss',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                        myApp.hideIndicator();
                        var kontek=vascan.getContext('2d');
                        var imagej=filter(emboss,kontek,vascan.width,vascan.height, 1);
                        puteffect(imagej);

                    }, 1300);
                    FB.AppEvents.logEvent("using emboss");
                }
            },
            {
                text: 'Edge detect Sobel X',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                        myApp.hideIndicator();
                        var kontek=vascan.getContext('2d');
                        var imagej=filter(sobelx,kontek,vascan.width,vascan.height, 1);
                        puteffect(imagej);

                    }, 1300);
                    FB.AppEvents.logEvent("using sobel x");
                }
            },
            {
                text: 'Edge detect Sobel Y',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                        myApp.hideIndicator();
                        var kontek=vascan.getContext('2d');
                        var imagej=filter(sobely,kontek,vascan.width,vascan.height, 1);
                        puteffect(imagej);

                    }, 1300);
                    FB.AppEvents.logEvent("using sobel y");
                }
            },
            {
                text: 'Sharpen, Box-Blur & Gaussian Blur',
                //functionhere
                onClick: function () {
                     myApp.pickerModal('.picker-modal-sharpen');
                }
            },
            {
                text: 'Edge Detection',
                //functionhere
                onClick: function () {
                     myApp.pickerModal('.picker-modal-edgedetect');
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
            }
        ]
    ];
    var actionSheetButtons3 = [
        // First buttons group
        [
            // Group Label
            {
                text: 'RGB Manipulation',
                label: true
            },
            //Alien color
            {
                text: 'Green',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {myApp.hideIndicator();
                        var imagei=takearrayimg(vascan);
                        var imagej=Alien(imagei);
                        puteffect(imagej);

                    }, 1300);
                    FB.AppEvents.logEvent("using green filter");
                }
            },
            {
                text: 'Purple',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {myApp.hideIndicator();
                        var imagei=takearrayimg(vascan);
                        var imagej=Alien1(imagei);
                        puteffect(imagej);

                    }, 1300);
                    FB.AppEvents.logEvent("using purple filter");
                }
            },
            {
                text: 'Red',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {myApp.hideIndicator();
                        var imagei=takearrayimg(vascan);
                        var imagej=Alien2(imagei);
                        puteffect(imagej);

                    }, 1300);
                    FB.AppEvents.logEvent("using red filter");
                }
            },
            {
                text: 'Dark Red',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {myApp.hideIndicator();
                        var imagei=takearrayimg(vascan);
                        var imagej=Alien3(imagei);
                        puteffect(imagej);

                    }, 1300);
                    FB.AppEvents.logEvent("using dark red filter");
                }
            },
            {
                text: 'GrayWhiten',
                //functionhere
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {myApp.hideIndicator();
                        var imagei=takearrayimg(vascan);
                        var imagej=Alien4(imagei);
                        puteffect(imagej);

                    }, 1300);
                    FB.AppEvents.logEvent("using gray whiten filter");
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
            }
        ]
    ];
    var actionSheetButtons4 = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Transformation',
                label: true
            },
             //flip horizontal
            {
                text: 'Flip Horizontal',
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                    myApp.hideIndicator();
                    var imagei=takearrayimg(vascan);
                    var imagej=horizontal_mirror(imagei);
                    puteffect(imagej);
                    }, 1300);
                    FB.AppEvents.logEvent("using flip horizontal");
                }
            },
            {
                text: 'Flip Vertical',
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                    myApp.hideIndicator();
                    var imagei=takearrayimg(vascan);
                    var imagej=vertical_mirror(imagei);
                    puteffect(imagej);
                    }, 1300);
                    FB.AppEvents.logEvent("using flip vertical");
                }
            }, 
            {
                text: 'Rotate Left',
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                    myApp.hideIndicator();
                    rotateleft(vascan,img_prop, 1);
                    }, 1300);
                    FB.AppEvents.logEvent("using rotate left");
                }
            }, 
            {
                text: 'Rotate Right',
                onClick: function () {
                    myApp.showIndicator();
                    setTimeout(function () {
                    myApp.hideIndicator();
                    rotateright(vascan,img_prop, 1);
                    }, 1300);
                    FB.AppEvents.logEvent("using rotate right");
                }
            },   
        ],
        // Second group
        [
            {
                text: 'Cancel',
            }
        ]
    ];
    //span filter button 
    $$('.filter').on('click', function (e) {
        myApp.actions(this,actionSheetButtons);
    });
});

//===================help page execute=============
myApp.onPageInit('help', function (page) {
    $$('#submit').on('click',function(){
        myApp.alert(':)','Tanks for Feedback!');
    });
});


//=======================effect button=====================
//transparentsi
$$('#alpha').on('touchend',function(){
       var inputVal = $$('#alpha').val();
       var imagei=takearrayimg(vascan);
       var imagej=transparent(imagei,inputVal);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using transparansi filter");
});

//brightness+
$$('#bright').on('touchend',function(){
       var inputVal = Number($$('#bright').val());
       draw(img_prop);
       var imagei=takearrayimg(vascan);
       var imagej=bright(imagei,inputVal);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using brightten filter");
});

//brightness-
$$('#brightmin').on('touchend',function(){
       var inputVal = Number($$('#brightmin').val());
       draw(img_prop);
       var imagei=takearrayimg(vascan);
       var imagej=bright(imagei,inputVal);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using darken filter");
});
//sharpen
$$('#sharpen').on('touchend',function(){
       var mixval  = Number($$('#sharpen').val())*0.1;
       var kontek=vascan.getContext('2d');
       var imagej=filter(sharpen,kontek,vascan.width,vascan.height, mixval);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using sharpen filter");
});
//blur
$$('#blur').on('touchend',function(){
       var mixval  = Number($$('#blur').val())*0.1;
       var kontek=vascan.getContext('2d');
       var imagej=filter(blur,kontek,vascan.width,vascan.height, mixval);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using blur filter");
});
//gaussian
$$('#gaussian').on('touchend',function(){
       var mixval  = Number($$('#gaussian').val())*0.1;
       var kontek=vascan.getContext('2d');
       var imagej=filter(gaussian,kontek,vascan.width,vascan.height, mixval);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using gaussian filter");
});
//edgedetect
$$('#ed1').on('touchend',function(){
       var mixval  = Number($$('#ed1').val())*0.1;
       draw(img_prop);
       var kontek=vascan.getContext('2d');
       var imagej=filter(edgedetect1,kontek,vascan.width,vascan.height, mixval);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using edgedetect1 filter");
});
$$('#ed2').on('touchend',function(){
       var mixval  = Number($$('#ed2').val())*0.1;
       draw(img_prop);
       var kontek=vascan.getContext('2d');
       var imagej=filter(edgedetect2,kontek,vascan.width,vascan.height, mixval);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using edgedetect2 filter");
});
$$('#ed3').on('touchend',function(){
       var mixval  = Number($$('#ed3').val())*0.1;
       draw(img_prop);
       var kontek=vascan.getContext('2d');
       var imagej=filter(edgedetect3,kontek,vascan.width,vascan.height, mixval);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using edgedetect3 filter");
});
//contrass
$$('#contras').on('touchend',function(){
       var inputVal = Number($$('#contras').val());
       var imagei=takearrayimg(vascan);
       var imagej=con(imagei,inputVal);
       myApp.showIndicator();
       setTimeout(function () {
       myApp.hideIndicator();
       puteffect(imagej);
       }, 800);
       FB.AppEvents.logEvent("using contrass filter");
});
//=======================exit===================
$$('#exit').on('click',function(){
    window.close();
});
//details pic
$$('#info').on('click',function(){
    document.getElementById('nmValue').innerHTML=att.name;
    document.getElementById('typValue').innerHTML=att.type;
    document.getElementById('sizValue').innerHTML=att.size+' bytes';
    document.getElementById('dateValue').innerHTML=att.lastModifiedDate;
    document.getElementById('resValue').innerHTML=img_prop.width+' x '+img_prop.height+' pixels';
    myApp.pickerModal('.picker-modal-detail');
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}