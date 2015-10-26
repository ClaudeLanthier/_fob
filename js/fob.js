(function(){
var _o={};
var $={
    dom:{
        layout:function(){
            no.targs=_o;
            no.$(document.body,{_s:'w1,h1, overflow:hidden;'},
                no.div(
                    {id:"con_pag",_s:'rel,bot.0,rg.0,b.1,w1,h1,overflow:hidden;'},
                    no.div({id:"con_lft_top",_s:'abs,w.239,h.59,l.10,t.10,b.0,o.222'},
                        no.img({src:"img/logo.png",_s:"abs,l.15,t.10,h.40"}),
                        no.div({id:"con_lft",_s:'abs,l.68,t.18,f.20,c.f'},"FORM BUILDER")
                    ),
                    no.div({id:"con_lft",_s:'abs,w.240,l.10,t.81,bot.10'}),
                    no.div({id:"con_cen",_s:'abs,l.260,bot.10,rg.10,t.10,p.10,box,o.2,b.0,overflow:auto'},
                        no.div({id:"canvas",_s:'cen,h.800,w.1200,box,o.3,background:url("img/light.png")repeat; overflow:auto;margin:0 auto'})
                    )
                )
            );
            no.targs=false;
        },
        menu:{
            forms:function(){
                no.div(_o.con_lft,{id:"forms_mnu",_c:"mnu_ssec"},
                    no.div({id:"canv_ttl",_c:"sec_ttl"}, "FORMS"),
                    no.div(
                        no.div({_s:"f.14"}, "Study"),
                        no.input({id:"forms_pr",type:"text"},function onchange(o){})
                    ),
                    no.div(
                        no.div({_s:"f.14"}, "Form name"),
                        no.input({id:"forms_nm",type:"text"},function onchange(o){})
                    )
                )
            },
            canvas:function(){
                no.div(_o.con_lft,{id:"canv_mnu",_c:"mnu_ssec"},
                    no.div({id:"canv_ttl",_c:"sec_ttl"}, "CANVAS"),
                    no.div(
                        no.div({_s:"f.14,dib,w.60"}, "Width"),
                        no.input({id:"canv_w",type:"number"},function onchange(o){_o.canvas.style.width=o.value+"px";})
                    ),
                    no.div(
                        no.div({_s:"f.14,dib,w.60"}, "Height"),
                        no.input({id:"canv_h",type:"number"},function onchange(o){_o.canvas.style.height=o.value+"px";})
                    ),
                    no.div(
                        no.div({_s:"f.14,dib,w.60"}, "Color"),
                        no.input({id:"canv_c",type:"color"},function onchange(o){_o.con_cen.style.background=o.value;})
                    )
                )
            },
            controls:function(){
                no.div(_o.con_lft,{id:"ctrl_mnu",_c:"mnu_ssec"},
                    no.div({id:"ctrl_ttl",_c:"sec_ttl"}, "CONTROLS"),
                    no.div(
                        no.img({src:"img/menu.png",_s:"h.20,dib,,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Menu")
                    ),
                    no.div(
                        no.img({src:"img/label.png",_s:"h.20,dib,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Label")
                    ),
                    no.div(
                        no.img({src:"img/radio.png",_s:"h.20,dib,,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Radio")
                    ),
                    no.div(
                        no.img({src:"img/textbox.png",_s:"h.20,dib,,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Textbox")
                    ),
                    no.div(
                        no.img({src:"img/text.png",_s:"h.20,dib,,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Text")
                    ),
                    no.div(
                        no.img({src:"img/checkbox.png",_s:"h.20,dib,,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Checkbox")
                    ),
                    no.div(
                        no.img({src:"img/image.png",_s:"h.20,dib,,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Image")
                    ),
                    no.div(
                        no.img({src:"img/number.png",_s:"h.20,dib,,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Number")
                    ),
                    no.div(
                        no.img({src:"img/date.png",_s:"h.20,dib,,m.1|5|1|0"}),
                        no.div({_s:"f.14,dib"}, "Date")
                    )
                )
            }
        },
        canvas:function(){
        }
    },
    xxx:{
        ini_size:function(){
           var h=Math.floor(_o.con_cen.clientHeight/10);
           var w=Math.floor(_o.con_cen.clientWidth/10);
           _o.canvas.style.height=(h*10-20)+"px";
           _o.canvas.style.width=(w*10-20)+"px";
        },
        new_width:function(o){
             _o.canvas.style.width=o+"px";
        }
    },
    U:{
        hex2rgb:function(h){
            var hex=(h.charAt(0)=="#") ? h.substring(1,7):h,
                r= parseInt(hex.substring(0,2),16),
                g= parseInt(hex.substring(2,4),16),
                b= parseInt(hex.substring(4,6),16);
            return [r,g,b];
        },
    }
}
this.$fob=$;
})(); 