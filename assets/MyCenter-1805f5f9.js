import{_ as Z,U as ee,u as ae,b as se,i as h,k as S,e as v,E as oe,f as te,r as d,o as C,g as z,h as a,w as o,c as E,m as U,j as n,p as re,t as ne,n as le,a as p,F as ue,z as ce,A as ie}from"./index-da111333.js";import{C as de}from"./Comment-e9b656fd.js";const _e=y=>(ce("data-v-91ee515f"),y=y(),ie(),y),me=_e(()=>n("span",null,"记住密码",-1)),pe={key:1,class:"user_info_panel"},fe={class:"top_panel"},ge={class:"left"},we={class:"face_img"},ve={class:"user_name"},he={class:"more_panel_item"},ye={class:"more_panel_item"},be={class:"more_panel_item"},ke={class:"more_panel_item"},Se={class:"more_panel_item confirmChange"},Ce={class:"more_panel_item quit_login"},Ie={class:"more_panel_item back_mycenter"},Pe={class:"comment_panel"},Ue={__name:"MyCenter",setup(y){const I=ee();ae();const x=se(),b=h("axios"),l=h("message"),q=h("dialog"),M=h("server_url"),_=h("loadingBar"),i=S({account:localStorage.getItem("useraccount")==""?"":localStorage.getItem("useraccount"),password:localStorage.getItem("userpassword")==""?"":localStorage.getItem("userpassword"),rememberPassword:localStorage.getItem("userrememberMe")==1}),t=S({account:"",password:"",confirmPassword:"",username:"",face_img_url:""}),u=S({password:"",confirmPassword:"",username:"",face_img_url:null});v(null);const k=v(!1),P=v(""),N=v(`${M}/upload/user_imgface_upload`),B=v(null),g=S({user_id:"",username:"",face_img_url:""});oe(()=>u,(s,e)=>{s.username==""&&s.password==""&&s.confirmPassword==""&&s.face_img_url==""?k.value=!1:k.value=!0},{deep:!0});const J=()=>{x.push("/")};te(()=>{F()});const O=()=>{P.value="more_panel_active"},R=()=>{P.value="more_panel_disactive"},T=({file:s,event:e})=>{console.log((e==null?void 0:e.target).response);const c=JSON.parse(e==null?void 0:e.target.response);console.log(c),t.face_img_url=c.data.url[0]},H=({file:s,event:e})=>{console.log((e==null?void 0:e.target).response);const c=JSON.parse(e==null?void 0:e.target.response);u.face_img_url=c.data.url[0]},V=({file:s,event:e})=>{console.log((e==null?void 0:e.target).response);const c=JSON.parse(e==null?void 0:e.target.response);console.log(c),k.value=!1},w=v(!1),F=async()=>{let s=await b.get("/user/_user_token/current_user");try{s.data.code==200?(w.value=!0,l.success("获取个人信息成功"),g.user_id=s.data.data[0].id,g.username=s.data.data[0].user_name,g.face_img_url=M+s.data.data[0].face_img_url):(w.value=!1,l.error("获取个人信息失败，请重新登录"))}catch(e){l.error(`错误:${e}`),w.value=!1}},A=async()=>{if(i.account.trim()==""){l.warning("就不能输个账号？",{duration:1e3});return}else if(i.password.trim()==""){l.warning("就不能输个密码？",{duration:1e3});return}_.start();const s=await b.post("/user/login",{account:i.account,password:i.password});i.rememberPassword?(localStorage.setItem("useraccount",i.account),localStorage.setItem("userpassword",i.password),localStorage.setItem("userrememberMe",i.rememberPassword==!0?1:0)):(localStorage.setItem("useraccount",""),localStorage.setItem("userpassword",""),localStorage.setItem("userrememberMe",0)),console.log(s),s.data.code==200?(l.success("登录成功",{duration:1e3}),I.id=s.data.data.id,I.token=s.data.data.token,localStorage.setItem("usertoken",s.data.data.token),localStorage.setItem("userid",s.data.data.id),I.username=s.data.data.user_name,x.push("/"),_.finish()):(l.error("账号或者密码错误，或者没有账号，请前往注册"),_.error())},D=async()=>{if(t.account.trim()==""){l.warning("就不能输个账号？",{duration:1e3});return}else if(t.password.trim()==""){l.warning("就不能输个密码？",{duration:1e3});return}else if(t.confirmPassword.trim()==""){l.warning("不确定了？输错了怎么办？",{duration:1e3});return}if(t.password.trim()!==t.confirmPassword.trim()){l.warning("两次输的密码不一样！！还好我给你检查了~",{duration:1e3});return}_.start();const s=await b.post("/user/register",{account:t.account,password:t.password,user_name:t.username,face_img_url:t.face_img_url});console.log(s),s.data.code==200?(l.success("注册成功"),_.finish()):(l.error(`注册失败：${s.data.msg}`),_.error()),t.account="",t.password="",t.confirmPassword="",t.username=""},G=async()=>{if(u.password.trim()!==u.confirmPassword.trim()){l.warning("两次输的密码不一样！！还好我给你检查了~",{duration:1e3});return}_.start(),console.log(u);const s=await b.post("/user/_user_token/change",{password:u.password,user_name:u.username,face_img_url:u.face_img_url});console.log(s),s.data.code==200?(l.success(`${s.data.msg}`),_.finish(),F(),B.value.clear()):(l.error(`${s.data.msg}`),_.error()),u.password="",u.confirmPassword="",u.username=""},K=()=>{q.create({type:"warning",title:"退出登录?",negativeText:"点错了",positiveText:"退出",onNegativeClick:()=>{},onPositiveClick:()=>{localStorage.setItem("usertoken",""),l.info("退出成功"),w.value=!1}})};return(s,e)=>{const c=d("n-button"),m=d("n-input"),f=d("n-form-item-row"),Q=d("n-switch"),W=d("n-space"),L=d("n-form"),$=d("n-tab-pane"),j=d("n-upload"),X=d("n-tabs"),Y=d("n-card");return C(),z(ue,null,[a(c,{onClick:J},{default:o(()=>[p("返回首页")]),_:1}),w.value?U("",!0):(C(),E(Y,{key:0,title:"个人中心"},{default:o(()=>[a(X,{"default-value":"signin",size:"large","justify-content":"space-evenly"},{default:o(()=>[a($,{name:"signin",tab:"登录"},{default:o(()=>[a(L,null,{default:o(()=>[a(f,{label:"用户名",request:""},{default:o(()=>[a(m,{value:i.account,"onUpdate:value":e[0]||(e[0]=r=>i.account=r),placeholder:"请输入账号"},null,8,["value"])]),_:1}),a(f,{label:"密码"},{default:o(()=>[a(m,{value:i.password,"onUpdate:value":e[1]||(e[1]=r=>i.password=r),placeholder:"请输入密码",type:"password"},null,8,["value"])]),_:1}),a(f,null,{default:o(()=>[a(W,null,{default:o(()=>[me,a(Q,{round:!1,value:i.rememberPassword,"onUpdate:value":e[2]||(e[2]=r=>i.rememberPassword=r)},null,8,["value"])]),_:1})]),_:1})]),_:1}),a(c,{type:"primary",block:"",secondary:"",strong:"",onClick:A},{default:o(()=>[p(" 登录 ")]),_:1})]),_:1}),a($,{name:"signup",tab:"注册"},{default:o(()=>[a(L,null,{default:o(()=>[a(f,{label:"用户名"},{default:o(()=>[a(m,{value:t.account,"onUpdate:value":e[3]||(e[3]=r=>t.account=r),placeholder:"请输入账号"},null,8,["value"])]),_:1}),a(f,{label:"密码"},{default:o(()=>[a(m,{value:t.password,"onUpdate:value":e[4]||(e[4]=r=>t.password=r),placeholder:"请输入密码",type:"password"},null,8,["value"])]),_:1}),a(f,{label:"重复密码"},{default:o(()=>[a(m,{value:t.confirmPassword,"onUpdate:value":e[5]||(e[5]=r=>t.confirmPassword=r),placeholder:"请输入密码",type:"password"},null,8,["value"])]),_:1}),a(f,{label:"起个昵称吧~"},{default:o(()=>[a(m,{value:t.username,"onUpdate:value":e[6]||(e[6]=r=>t.username=r),placeholder:"昵称",type:"text"},null,8,["value"])]),_:1}),a(f,{label:"上传个头像吧~"},{default:o(()=>[a(j,{action:N.value,onFinish:T},{default:o(()=>[a(c,null,{default:o(()=>[p("上传头像")]),_:1})]),_:1},8,["action"])]),_:1})]),_:1}),a(c,{type:"primary",block:"",secondary:"",strong:"",onClick:D},{default:o(()=>[p(" 注册 ")]),_:1})]),_:1})]),_:1})]),_:1})),w.value?(C(),z("div",pe,[n("div",fe,[n("div",ge,[n("div",we,[n("div",{style:re({"background-image":`url(${g.face_img_url})`}),class:"background_container"},null,4)]),n("div",ve,ne(g.username),1)]),n("div",{class:"right"},[n("div",{class:"moreBtn"},[n("button",{onClick:O},"更多")])])]),n("div",{class:le([P.value,"more_panel"])},[n("div",he,[a(j,{ref_key:"changeUpLoad",ref:B,action:N.value,onFinish:H,onError:V,"default-file-list":s.defaultFileList,class:"change_faceimg_upload"},{default:o(()=>[a(c,{class:"change_faceimg"},{default:o(()=>[p("修改头像")]),_:1})]),_:1},8,["action","default-file-list"])]),n("div",ye,[a(m,{value:u.password,"onUpdate:value":e[7]||(e[7]=r=>u.password=r),type:"password",placeholder:"修改密码"},null,8,["value"])]),n("div",be,[a(m,{value:u.confirmPassword,"onUpdate:value":e[8]||(e[8]=r=>u.confirmPassword=r),type:"password",placeholder:"确认密码"},null,8,["value"])]),n("div",ke,[a(m,{value:u.username,"onUpdate:value":e[9]||(e[9]=r=>u.username=r),placeholder:"修改昵称"},null,8,["value"])]),n("div",Se,[k.value?(C(),E(c,{key:0,onClick:e[10]||(e[10]=r=>G())},{default:o(()=>[p("确定修改")]),_:1})):U("",!0)]),n("div",Ce,[a(c,{onClick:K},{default:o(()=>[p("退出登录")]),_:1})]),n("div",Ie,[a(c,{onClick:R},{default:o(()=>[p("返回个人中心")]),_:1})])],2),n("div",Pe,[p(" 显示评论 "),a(de,{comment_user_id:g.user_id,comment_article_id:0,user:!0,"can-comment":!1},null,8,["comment_user_id"])])])):U("",!0)],64)}}},Ne=Z(Ue,[["__scopeId","data-v-91ee515f"]]);export{Ne as default};
