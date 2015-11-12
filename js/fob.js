(function(){
var _o={};
var $={
    xy:[],
    study:{
        sel:1,
        all:[" select an option ","Add","Delete","Study_1"]
     },
    form:{
        sel:1,
        all:[" select an option ","Add","Delete","Form_1","Form_2"]
     },
    control:{
        sel:0,
        all:["a","b","c"]
     },
    dom:{
        layout:function(){
            no.targs=_o;
            no.$(document.body,{_s:'w1,h1, overflow:hidden;'},
                no.div({id:"con_pag",_s:'abs,bot.0,rg.0,b.1,w1,h1,overflow:hidden;'},
                    no.div({id:"con_lft_top",_s:'abs,w.239,h.59,l.10,t.10,b.0,o.222'},
                        no.img({src:"img/logo.png",_s:"abs,l.15,t.10,h.40"}),
                        no.div({id:"con_lft",_s:'abs,l.68,t.18,f.20,c.f'},"FORM BUILDER")
                    ),
                    no.div({id:"con_lft",_s:'abs,w.240,l.10,t.81,bot.10'}),
                    no.div({id:"con_cen",_s:'abs,l.260,bot.10,rg.10,t.10,p.10,box,o.2,b.0,overflow:auto'},
                        no.div({id:"canvas",_s:'abs,cen,box,o.3,background:url("img/light.png")repeat; overflow:auto;'},
                            function ondrop(o,e){
                                //var dro=o.getAttribute("dro");
                                if(_.drag.data(e).ctr){$.drag.icon(o,e)};
                                if(_.drag.data(e).elt){$.drag.control(o,e)};
                                _o.pdot.style.display="none"; 
                            },
                            function ondragover(o,e){
                                l=Math.floor((e.pageX-$.xy[0])/10)*10;
                                t=Math.floor((e.pageY-$.xy[1])/10)*10;
                               _o.pdot.style.display="block"; 
                               _o.pdot.style.top=t+"px";
                               _o.pdot.style.left=l+"px";
                               // e.dataTransfer.setDragImage(o, 100, 0);
                            }
                        )
                    )
                ),
                no.div({id:"blanket",_s:'abs,w1,h1,opa.50,b.000,z.2,non'}),
                no.div({id:"pdot",_s:"abs,b.f00,w.2,h.2,non"})
            );
            no.targs=false;
         },
        menu:{
            can_bgi:"img/light.png",
            form:{
                build:function(){
                    var me=this;
                    no.targs=_o;
                    no.div(_o.con_lft,{id:"form_mnu",_c:"mnu_ssec"},
                        no.div({id:"canv_ttl",_c:"sec_ttl"}, "FORMS"),
                        no.div(
                            no.div({_s:"f.14"}, "Study"),
                            no.select({id:"study_ls",_s:"w1,mb.5"},function onchange(o){
                                $.study.sel=o.options[o.selectedIndex].value;
                                if($.study.sel==1){me.popup.build({act:"add",top:82,lev:"study",ctr:"input",ob:o});}
                                if($.study.sel==2){me.popup.build({act:"delete",top:82,lev:"study",ctr:"select",ob:o});}
                            })
                        ),
                        no.div(
                            no.div({_s:"f.14"}, "Form"),
                            no.select({id:"form_ls",_s:"w1,mb.5"},function onchange(o){
                                $.form.sel=o.options[o.selectedIndex].value;
                                if($.form.sel==1){me.popup.build({act:"add",top:124,lev:"form",ctr:"input",ob:o});}
                                if($.form.sel==2){me.popup.build({act:"delete",top:124,lev:"form",ctr:"select",ob:o});}
                            })
                        )
                    )
                    no.targs=false;
                    me.update.study();
                 },
                popup:{
                    build:function(v){
                        var me=this;
                        no.targs=_o;
                        _o.blanket.style.display="block";
                        no.div(_o.form_mnu,{id:"sf_pp",_s:"abs,t."+v.top+",l.1,z.3,w.214,b.000,o.666,p.10,r.5,lft"},
                            no.div(v.act+" "+v.lev,{_s:"cen,mb.4,pb.2,text-transform: uppercase;"}),
                            no[v.ctr]({id:v.act+"_"+v.lev,_s:"w1,mb.5,lft",type:"text"}),
                            no.div({_s:"cen"},
                                no.div(v.act,   {_s:"cen,bb.333,dib,w.30%,o.666,f.10,r.10,mt.10,poi,mr.20,text-transform: uppercase;"},function(){me.save(v)}),
                                no.div("CANCEL",{_s:"cen,bb.333,dib,w.30%,o.666,f.10,r.10,mt.10,poi"},function(){me.cancel()})
                            )
                         )
                        if(v.ctr=="select"){
                            var op=$[v.lev].all;
                            for (var i = 3; i < op.length; i++) {
                                no.option(op[i],_o[v.act+"_"+v.lev],{_s:"w1",value:i})
                            };
                        }
                        no.targs=false;

                     },
                    cancel:function(o){
                        _o.blanket.style.display="none";
                        _o.sf_pp.del();
                        _o.study_ls.selectedIndex=0;
                        _o.form_ls.selectedIndex=0;
                     },
                    save:function(v){
                        _o.blanket.style.display="none";
                        $.dom.menu.form[v.act][v.lev]();
                        //_o.sf_pp.del();
                     }
                 },
                add:{
                    study:function(){ 
                        $.study.all.push(_o.add_study.value);
                        $.dom.menu.form.update.study()
                        //db
                    },
                    form:function(){
                        $.form.all.push(_o.add_form.value);
                        $.dom.menu.form.update.form();
                        //db
                    }
                 },
                delete:{
                    study:function(){
                        var o=_o.delete_study;
                        if(o.options.length>0){
                            var sx=o.options[o.selectedIndex].value;
                            $.study.all.splice(sx,1);
                            $.dom.menu.form.update.study();
                        }
                        _o.sf_pp.del();
                        _o.study_ls.selectedIndex=0;
                        //db
                        //canvas
                    },
                    form:function(){
                        var o=_o.delete_form;
                        if(o.options.length>0){
                            var sx=o.options[o.selectedIndex].value;
                            $.form.all.splice(sx,1);
                            $.dom.menu.form.update.form();
                        }
                        _o.sf_pp.del();
                        _o.form_ls.selectedIndex=0;
                        //db
                        //canvas
                    }
                 },    
                update:{
                    study:function(){
                        _o.study_ls.clear();
                        _o.form_ls.clear();
                        //cl(_o.form_ls)
                        var s=$.study.all;
                        var f=$.form.all;
                        for(var k in s){no.option(_o.study_ls,s[k],{value:k})}
                        for(var l in f){no.option(_o.form_ls,f[l],{value:l})}
                     },
                    form:function(){
                        _o.form_ls.clear()
                        var f=$.form.all;
                        for(var l in f){no.option(_o.form_ls,f[l],{value:l})}
                     }
                 }
             },
            canvas:function(){
                no.targs=_o;
                no.div(_o.con_lft,{id:"canv_mnu",_c:"mnu_ssec"},
                    no.div({id:"canv_ttl",_c:"sec_ttl"}, "CANVAS"),
                    no.div(
                        no.div({_s:"f.14,dib,w.60"}, "Width"),
                        no.input({id:"canv_w",type:"number"},function onchange(o){
                            $.dom.canvas.reset_width();
                         })
                    ),
                    no.div(
                        no.div({_s:"f.14,dib,w.60"}, "Height"),
                        no.input({id:"canv_h",type:"number"},function onchange(o){_o.canvas.style.height=o.value+"px";})
                    ),
                    no.div({_s:"vam"},
                        no.div({_s:"f.14,dib,w.60,lh.16,vam"}, "Color"),
                        no.input({id:"canv_c",type:"color",_s:"h.21,vam"},function onchange(o){
                            _o.con_cen.style.background=o.value;
                            var rgb=$.U.hex2rgb(o.value);
                            tot=rgb[0]+rgb[1]+rgb[2];
                            if(tot>600){_o.canvas.style.background='url("img/dark.png")repeat';$.dom.menu.can_bgi="img/dark.png";}
                            else{_o.canvas.style.background='url("img/light.png")repeat';$.dom.menu.can_bgi="img/light.png";}
                        })
                    ),
                    no.div(
                        no.div({_s:"f.14,dib,w.60,dib"}, "No grid"),
                        no.img({src:"img/unchecked.png",_s:"h.19,w.19,o.222,vam,dib,m.2,cen,f.20,poi"}, function(o){
                            if($.dom.canvas.grid==1){
                                _o.canvas.style.background="none";
                                o.src="img/checked.png"
                                $.dom.canvas.grid=0;
                            }else{
                                //cl($.dom.menu.can_bgi)
                                _o.canvas.style.background="url("+$.dom.menu.can_bgi+")";
                                o.src="img/unchecked.png";
                                $.dom.canvas.grid=1;
                            }
                        })
                    )

                )
                no.targs=false;
             },
            control:function(){
                no.targs=_o;
                var icon=[
                    {"ctr":"menu","elm":"ul"},
                    {"ctr":"label","elm":"div"},
                    {"ctr":"image","elm":"img"},
                    {"ctr":"text","elm":"input","typ":"text"},
                    {"ctr":"number","elm":"input","typ":"number"},
                    {"ctr":"date","elm":"input","typ":"date"},
                    {"ctr":"radio","elm":"input","typ":"radio"},
                    {"ctr":"checkbox","elm":"input","typ":"checkbox"},
                    {"ctr":"dropdown","elm":"select"},                      
                    {"ctr":"textarea","elm":"textarea"}
                 ];
                no.div(_o.con_lft,{id:"ctrl_mnu",_c:"mnu_ssec"},
                    no.div({id:"ctrl_ttl",_c:"sec_ttl"}, "CONTROLS")
                );
                for (var i = 0; i < icon.length; i++) {
                    var k=icon[i].ctr;
                    no.div(_o.ctrl_mnu,{_s:"dib,w.50%"},
                        no.img({_drag:icon[i],dro:"ico",src:"img/"+k+".png"},
                            function onmousedown(o,e){$.U.inr_xy(o,e)}
                        ),
                        no.div(k)
                    )
                 };

                no.targs=false;
             }
         },
        canvas:{
            grid:1,
            ini_size:function(){
               var h=Math.floor(_o.con_cen.clientHeight/10);
               var w=Math.floor(_o.con_cen.clientWidth/10);
               _o.canvas.style.height=(h*10-20)+"px";
               _o.canvas.style.width=(w*10-20)+"px";
            },
            reset_width:function(){
                _o.canvas.style.width=_o.canv_w.value+"px";
                var w=_o.canvas.getBoundingClientRect().width;
                var wp=_o.con_cen.getBoundingClientRect().width;
                lft=Math.ceil((wp-w)/20)*10
                _o.canvas.style.left=lft+"px";
            }
         },
        control:{
            build:{
                ul:function(v){
                    $.control.sel="";
                 },
                div:function(v){
                    $.control.sel=no.div(0,v.ob,{id:"",_drag:{elt:"div"},_s:"poi,aro,abs,l."+v.lf+",t."+v.top},
                        function onmousedown(o,e){$.U.inr_xy(o,e); $.control.sel=o}
                    )
                 },
                img:function(v){
                   $.control.sel=no.img(0,v.ob,{_drag:{},_s:"aro,abs,l."+v.lf+",t."+v.top},
                        function onmousedown(o,e){$.U.inr_xy(o,e); $.control.sel=o})
                 },
                input:function(v){
                    var c=document.getElementsByClassName("dbi").length;
                    $.control.sel=no.input(0,v.ob,{_drag:{elt:"input"},id:"id_"+c,_c:"dbi",_s:"aro,abs,l."+v.lf+",t."+v.top,type:v.d.typ},
                        function onmousedown(o,e){$.U.inr_xy(o,e); $.control.sel=o})
                 },
                textarea:function(v){
                    $.control.sel=no.textarea(0,v.ob,{_drag:{},_s:"abs,l."+v.lf+",t."+v.top},
                        function onmousedown(o,e){$.U.inr_xy(o,e); $.control.sel=o})
                 }
             },
            modify:{
                //
             },
            move:{
                //
             },           
            popup:{
                att_val:{},
                inf:{
                    menu:[],
                    label:["Text","Color","Font","Font size"],
                    image:["Path/file","Height","Width"],
                    text:["Field name","Width","Border color top"],
                    number:["Field name","Width"],
                    date:["Field name","Width"],
                    radio:["Field name"],
                    checkbox:["Field name"],
                    dropdown:["Field name","Coma seperated options","Width"],
                    textarea:["Field name","Width","Height"]
                 },
                inputs:{
                    "Text":{"elm":"input", "typ": "text","att":"innerHTML"},
                    "Color":{"elm":"input", "typ": "color","att":"style.color"},
                    "Border color top":{"elm":"input", "typ": "color","att":"style.borderTopColor"},
                    "Font":{"elm":"input", "typ": "text","att":"style.fontFamily","dfl":"Arial"},
                    "Font size":{"elm":"input", "typ": "number","att":"style.fontSize.px","dfl":"14"},
                    "Path/file":{"elm":"input", "typ": "text","att":"src"},
                    "Field name":{"elm":"input", "typ": "text","att":"field"},
                    "Height":{"elm":"input", "typ": "number","att":"style.height.px"},
                    "Width":{"elm":"input", "typ": "number","att":"style.width.px"},
                    "Coma seperated options":{"elm":"textarea","att":"innerHTML"}
                 },
                build:function(v){
                    var el={}, me=this,
                    pp=no.div(0,_o.canvas,{id:"popup",_s:"abs,t."+(v.top+50)+",l."+v.lf+",z.3,b.000,o.666,p.10,r.5,lft"}),
                    a=this.inf[v.d.ctr];
                    _o.blanket.style.display="block";
                    no.div(pp,v.d.ctr,{_s:"cen,bb.222,mb.4,pb.2,text-transform: uppercase;"})
                    for(k in a){
                        var ip=this.inputs[a[k]];
                        no.div(pp,a[k],{_s:"lft"});
                        if(ip.elm=="input"){
                            el=no.input(0,pp,{_s:"mb.5,lft",type:ip.typ,att:ip.att});
                            if(ip.dfl){el.setAttribute("value",ip.dfl);}
                        }
                        else if(ip.elm=="textarea"){el=no.textarea(0,pp,{_s:"mb.3,lft",att:ip.att});}
                        else {el=no.select(0,pp,{_s:"mb.3,lft",att:ip.att})}
                        this.att_val[a[k]]=el;
                    }
                    no.div(pp,{_s:"cen"},
                        no.div("SAVE",  {_s:"cen,bb.333,dib,w.30%,o.666,f.10,r.10,mt.10,poi,mr.20"},function(){me.save(pp)}),
                        no.div("CANCEL",{_s:"cen,bb.333,dib,w.30%,o.666,f.10,r.10,mt.10,poi"},function(){me.close(pp)})
                    )
                 },
                close:function(o){
                    _o.blanket.style.display="none";
                    o.del();
                    $.control.sel.del()
                 },
                save:function(o){
                    var v=this.att_val,
                    cs=$.control.sel;
                    _o.blanket.style.display="none";
                    for(var k in v){
                        var at=v[k].getAttribute("att").split(".");
                        if(at.length>1){
                            var p=at.length==3?at[2]:"";
                            cs.style[at[1]]=v[k].value+p;
                        }
                        else if(at[0]=="innerHTML"){cs.innerHTML=v[k].value;}
                        else{cs.setAttribute(at[0],v[k].value);}

                        
                        //cl(this.inputs[k].att)
                        //$.dom.control.modify()
                    }
                    //cl($.dom.control.attr)
                    //$.new_el;
                    o.del();
                 }
             }
         }
     },
    drag:{
        icon:function(o,e){
            var l=Math.floor((e.clientX-$.xy[0]-260)/10)*10-10,
                t=Math.floor((e.clientY-$.xy[1]-10)/10)*10-10,
                nu=$.control.all.length,
                v={d:_.drag.data(e),lf:l,top:t,ob:o,ev:e,idn:nu};
            $.dom.control.build[v.d.elm](v);
            $.dom.control.popup.build(v);
         },
        control:function(o,e){
            var ob=$.control.sel,        
                l=Math.floor((e.clientX-$.xy[0]-260)/10)*10-10,
                t=Math.floor((e.clientY-$.xy[1]-10)/10)*10-10;
            ob.style.left=l+"px";     
            ob.style.top=t+"px";
         }
     },  
    db:{
        get:{
            study:{
                //
             },
            form:{
                //
             },
            contols:{
                //
             }
         },
        update:{
            study:{
                //
             },
            form:{
                //
             },
            contols:{
                //
             }
         },
        delete:{
            study:{
                //
             },
            form:{
                //
             },
            contols:{
                //
             }
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
        inr_xy:function(o,e){
           $.xy=[e.clientX-o.getBoundingClientRect().x,e.clientY-o.getBoundingClientRect().y];

         }
     }
}
this.$fob=$;
})(); 