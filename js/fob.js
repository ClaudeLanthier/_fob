(function(){
var _o={};
var $={
    xy:[],
    key:0,
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
        elm:{},
        all:{}
     },
    dom:{
        layout:function(){
            window.onkeypress=function(e){$.key=e.keyCode};
            no.targs=_o;
            no.$(document.body,{_s:'w1,h1, overflow:hidden;'},
                no.div({id:"con_pag",_s:'abs,bot.0,rg.0,b.1,w1,h1,overflow:hidden;'},
                    no.div({id:"con_lft_top",_s:'abs,w.239,h.59,l.10,t.10,b.0,o.222'},
                        no.img({src:"img/logo.png",_s:"abs,l.15,t.10,h.40"}),
                        no.div({id:"con_lft",_s:'abs,l.68,t.18,f.20,c.f'},"FORM BUILDER")
                    ),
                    no.div({id:"con_lft",_s:'abs,w.240,l.10,t.81,bot.10'}),
                    no.div({id:"con_cen",_s:'abs,l.260,bot.10,rg.10,t.10,p.10,box,o.2,b.f,overflow:auto'},
                        no.div({id:"canvas",_s:'abs,cen,box,o.c,background:url("img/dark.png")repeat; overflow:auto;'},
                            function ondrop(o,e){
                                if(_.drag.data(e).ctr){$.drag.icon(o,e)};
                                if(_.drag.data(e).elt){$.drag.control(o,e)};
                                _o.pdot.style.display="none"; 
                            },
                            function ondragover(o,e){
                                l=Math.floor((e.pageX-$.xy[0])/10)*10;
                                t=Math.floor((e.pageY-$.xy[1])/10)*10;
                                if(t>=20 && l>=270){
                                   _o.pdot.style.display="block"; 
                                   _o.pdot.style.top=t+"px";
                                   _o.pdot.style.left=l+"px";
                                }
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
            can_bgi:"img/dark.png",
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
                        no.input({id:"canv_c",type:"color",_s:"h.21,vam",value:"#ffffff"},function onchange(o){
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
                    {"ctr":"menu","tagName":"ul"},
                    {"ctr":"label","tagName":"div"},
                    {"ctr":"image","tagName":"img"},
                    {"ctr":"text","tagName":"input","type":"text"},
                    {"ctr":"number","tagName":"input","type":"number"},
                    {"ctr":"date","tagName":"input","type":"date"},
                    {"ctr":"radio","tagName":"div","type":"radio"},
                    {"ctr":"checkbox","tagName":"div","type":"checkbox"},
                    {"ctr":"dropdown","tagName":"div"},                      
                    {"ctr":"textarea","tagName":"textarea"}
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
                var h=Math.floor(_o.con_cen.clientHeight/10),
                    w=Math.floor(_o.con_cen.clientWidth/10);
               _o.canvas.style.height=(h*10-20)+"px";
               _o.canvas.style.width=(w*10-20)+"px";
            },
            reset_width:function(){
                _o.canvas.style.width=_o.canv_w.value+"px";
                var w=_o.canvas.getBoundingClientRect().width,
                    wp=_o.con_cen.getBoundingClientRect().width,
                    lft=Math.ceil((wp-w)/20)*10;
                _o.canvas.style.left=lft+"px";
            }
         },
        control:{
            build:function(){
                var  v=$.control.elm, me=this;
                $.control.sel=no[v.tagName](0,v.tg,{_drag:{elt:v.tagName},_s:"abs,l."+v.att.left+",t."+v.att.top},
                function onmousedown(o,e){
                    if($.key==46){o.del();$.key=0}
                    if($.key==13){me.popup.build();o.del();$.key=0}
                    else{$.U.inr_xy(o,e); $.control.sel=o;}
                })
                if(v.typ){$.control.sel.setAttribute("type",v.typ)}
             },
            save:function(el){
                var a=el.attributes,
                c={"tagName":el.tagName};
                if(el.innerHTML){c["innerHTML"]=el.innerHTML}
                for (var i = 0; i < a.length; i++){
                    c[a[i].name]=a[i].value
                };
                var k=(a.field)?a.field.value:a.eid.value;
                $.control.all[k]=c;
             },
            modify:function(o){
                $.dom.control.build();
                var v=this.popup.attrib,
                c=$.control.sel;
                _o.blanket.style.display="none";
                for(var k in v){
                    var p=v[k]["prop"];
                    var s=("suf" in p)?p.suf:"";
                    if("style" in p){c.style[p.style]=v[k].elm.value+s;c.innerHTML.delete;}
                    if("innerHTML" in p){c.innerHTML=v[k].elm.value;}  
                    if("att" in p){c.setAttribute(p.att,v[k].elm.value);c.innerHTML.delete;}  
                }
                this.popup.attrib={};
                this.exists()
                o.del();
             },
            exists:function(){
                var c=$.control.sel,
                    fe=(c.hasAttribute("field"))?c.getAttribute("field"):c.getAttribute("eid");
                if($.db.get.control.f.indexOf(fe)<0 && fe!=""){this.save(c);}
                else{c.del();_o.blanket.style.display="none";alert("Please choose a different field or element name");}
             },
            rebuild:function(vv){
                /*
                for(var kk in vv){
                    o=no[vv.tagName](0,_o.canvas)
                    for(l in a){
                    for(var k in v){
                        var p=v[k]["prop"];
                        var s=("suf" in p)?p.suf:"";
                        if("sty" in p){c.style[p.sty]=v[k].elm.value+s;c.innerHTML.delete;}
                        if("inh" in p){c.innerHTML=v[k].elm.value;}  
                        if("att" in p){c.setAttribute(p.att,v[k].elm.value);c.innerHTML.delete;}  
                    }
                }*/
             },

            edit:function(v){
                //
             },         
            popup:{
                attrib:{},
                inf:{
                    menu:[],
                    label:["Element name","Text","Color","Font","Font size"],
                    image:["Element name","Path/file","Height","Width"],
                    text:["Field name","Width","Background color"],
                    number:["Field name","Width","Background color"],
                    date:["Field name","Width","Background color"],
                    radio:["Field name","Background color"],
                    checkbox:["Field name","Background color"],
                    dropdown:["Field name","Coma seperated options","Width"],
                    textarea:["Field name","Width","Height","Background color"]
                 },
                atts:{
                    "Text":{"tagName":"input", "type":"text","innerHTML":"innerHTML"},
                    "Color":{"tagName":"input", "type":"color","style":"color"},
                    "Background color":{"tagName":"input", "type": "color","style":"backgroundColor","dfl":"#dddddd"},
                    "Font":{"tagName":"input", "type": "text","style":"fontFamily","dfl":"Arial"},
                    "Font size":{"tagName":"input", "type": "number","style":"fontSize","suf":"px","dfl":"14"},
                    "Path/file":{"tagName":"input", "type":"text","att":"src"},
                    "Field name":{"tagName":"input", "type": "text","att":"field"},
                    "Height":{"tagName":"input", "type": "number","style":"height","suf":"px"},
                    "Width":{"tagName":"input", "type": "number","style":"width","suf":"px"},
                    "Coma seperated options":{"tagName":"textarea","innerHTML":"innerHTML"},
                    "Element name":{"tagName":"input", "type":"text","att":"eid"}
                 },
                build:function(){
                    var v=$.control.elm,el={}, me=this,
                    //pp=no.div(0,_o.canvas,{id:"popup",_s:"abs,t."+(v.top+50)+",l."+v.lf+",z.3,b.000,o.666,p.10,r.5,lft"}),
                    pp=no.div(0,_o.canvas,{id:"popup",_s:"abs,t."+(v.top+50)+",l."+v.left+",z.3,b.000,o.666,p.10,r.5,lft"}),
                    a=this.inf[v.ctr];
                    _o.blanket.style.display="block";
                    no.div(pp,v.ctr,{_s:"cen,bb.222,mb.4,pb.2,text-transform: uppercase;"})
                    for(k in a){
                        var ip=this.atts[a[k]];
                        no.div(pp,a[k],{_s:"lft"});
                        el=no[ip.tagName](0,pp,{_s:"mb.5,lft",type:ip.typ});
                        if("type" in ip){el.setAttribute("type",ip.type)}
                        //if("typ" in ip){el.setAttribute("type",ip.typ)}
                        if("dfl" in ip){el.setAttribute("value",ip.dfl);}
                   // cl(ip.dfl)
                        var prop={}
                        if("innerHTML" in ip){prop["innerHTML"]=ip.innerHTML}
                        //if("inh" in ip){prop["inh"]=ip.inh}
                        if("att" in ip){prop["att"]=ip.att}
                        if("style" in ip){prop["style"]=ip.style}
                        if("suf" in ip){prop["suf"]=ip.suf}
                        this.attrib[a[k]]={elm:el, prop:prop};
                    }

                    no.div(pp,{_s:"cen"},
                        no.div("SAVE",{_s:"cen,bb.333,dib,w.30%,o.666,f.10,r.10,mt.10,poi,mr.20"},function(){
                            $.dom.control.modify(pp);
                            }
                        ),
                        no.div("CANCEL",{_s:"cen,bb.333,dib,w.30%,o.666,f.10,r.10,mt.10,poi"},function(){me.close(pp)})
                    )
                 },
                close:function(o){
                    _o.blanket.style.display="none";
                    o.del();
                    //$.control.sel.del()
                 }
             }
         }
     },
    drag:{
        icon:function(o,e){
            var l=Math.floor((e.clientX-$.xy[0]-260)/10)*10-10,
                t=Math.floor((e.clientY-$.xy[1]-10)/10)*10-10,
                d=_.drag.data(e);
           // $.control.elm={ctr:d.ctr,tag:d.elm,tg:o,typ:d.typ,att:{lft:l,top:t}};
            $.control.elm={ctr:d.ctr,tagName:d.tagName,tg:o,type:d.type,att:{left:l,top:t}};
            $.dom.control.popup.build();
         },
        control:function(o,e){
            var ob=$.control.sel,
                l=Math.floor((e.clientX-$.xy[0]-260)/10)*10-10,
                t=Math.floor((e.clientY-$.xy[1]-10)/10)*10-10;
            ob.style.left=l+"px";     
            ob.style.top=t+"px";
            $.dom.control.save(ob);
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
            control:{
               f:["aaa","bbb"]
             }
         },
        update:{
            study:{
                //
             },
            form:{
                //
             },
            control:{
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
            control:{
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