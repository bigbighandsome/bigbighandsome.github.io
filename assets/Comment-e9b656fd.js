import{_ as H,u as J,b as K,i as f,U as Q,e as p,f as W,k as X,r as y,o as c,g as _,j as o,q as Y,v as Z,m as D,F as ee,x as te,p as j,t as b,h as x,w as g,a as w,c as oe,z as ne,A as se}from"./index-da111333.js";const r=m=>(ne("data-v-dcac6c98"),m=m(),se(),m),ae={class:"comment"},ce={class:"comment_bcc"},re=r(()=>o("h6",{class:"comment_title"},"留言板",-1)),le={key:0,class:"write_comment"},_e=["onClick"],me={class:"comment_user_name"},ie=r(()=>o("span",{class:"colon"},":",-1)),ue={class:"comment_user_content"},de=r(()=>o("br",null,null,-1)),pe=r(()=>o("br",null,null,-1)),ge={key:0,style:{color:"antiquewhite"}},he={key:1,style:{color:"antiquewhite"}},ve={key:2,style:{color:"antiquewhite"}},fe={class:"comment_article_title"},ye=r(()=>o("span",{class:"comment_article_title_info"},"来自:",-1)),ke={class:"comment_time_container"},be=r(()=>o("span",null," 快来第一个评论！ ",-1)),xe=r(()=>o("span",{style:{"font-size":"12px"}},"上一页",-1)),we=r(()=>o("span",{style:{"font-size":"12px"}},"下一页",-1)),Ce={__name:"Comment",props:{comment_article_id:{type:Number,default:0},comment_user_id:{type:Number,default:0},comment_article_title:{type:String,default:"主页"},user:{type:Boolean,default:!1},jumpToDetail:{type:Boolean,default:!0},canComment:{type:Boolean,default:!0}},setup(m){const l=m;J();const N=K(),C=f("axios"),i=f("message");f("dialog");const u=f("loadingBar"),q=f("server_url"),E=Q(),S=p(0);W(()=>{T(),setTimeout(()=>{z()},600),console.log(h.value),V()});const U={threshold:.9},h=p(null),V=()=>{new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(S.value++,L())})},U).observe(h.value)},L=()=>{if(console.log(S.value),!(S.value<=1))for(let e=0;e<h.value.children.length;e++){let t=h.value.children[e];t.classList.remove("hidden-element"),t.classList.remove("show-element")}},s=X({page:1,pageSize:6,pageCount:0,count:0}),$=p([]),k=p([]),d=p("");p("");const O=(e,t)=>`background-image: url(${e}`,F=()=>{console.log("error")},M=e=>{!l.jumpToDetail||e==0||P(e)},P=async e=>{N.push({path:"/detail",query:{id:e}})},T=async()=>{let e=await C.get("/user/user_list");e.data.code==200?$.value=e.data.rows.map(t=>({id:t.id,user_name:t.user_name,user_face_img:t.face_img_url,token:t.token})):i.error(`获取用户信息失败:${e.data.msg}`)},z=async()=>{u.start();let e=l.user?`/comment/comment_list?page=${s.page}&pagesize=${s.pageSize}&comment_article_id=${l.comment_article_id}&comment_user_id=${l.comment_user_id}`:`/comment/comment_list?page=${s.page}&pagesize=${s.pageSize}&comment_article_id=${l.comment_article_id}`,t=await C.get(e);t.data.code==200?(s.count=t.data.count,s.pageCount=Math.ceil(s.count/s.pageSize),k.value=t.data.rows.map(a=>{let I=$.value.find(v=>v.id==a.comment_user_id).user_name,B=$.value.find(v=>v.id==a.comment_user_id).user_face_img;return{comment_article_id:a.comment_article_id,comment_article_title:a.comment_article_title,comment_content:a.comment_content,comment_create_time:a.comment_create_time,comment_user_id:a.comment_user_id,comment_user_name:I,comment_user_face_img:q+B,comment_background_color:a.comment_background_color}}),console.log(k),u.finish(),i.success("获取评论成功",{duration:1500})):(u.error(),i.error(`获取评论失败，请重试${t.data.msg}`))},R=e=>{s.page=e,T(),z()},A=async()=>{if(d.value.trim()==""){i.warning("留言不能为空",{duration:500}),d.value="";return}u.start();let e=await C.post("/comment/_user_token/comment_add",{comment_user_id:localStorage.getItem("userid")==""?E.id:localStorage.getItem("userid"),comment_content:d.value,comment_article_id:l.comment_article_id,comment_article_title:l.comment_article_title});e.data.code==200?(i.success("发送成功"),u.finish(),z()):(i.error(`发送失败${e.data.msg}`),u.error()),d.value=""};return(e,t)=>{const a=y("n-ellipsis"),I=y("n-time"),B=y("n-empty"),v=y("n-pagination"),G=y("n-space");return c(),_("div",ae,[o("div",ce,[re,m.canComment?(c(),_("div",le,[Y(o("textarea",{class:"comment_area",name:"comment_area","onUpdate:modelValue":t[0]||(t[0]=n=>d.value=n),cols:"30",rows:"10",maxlength:"600",placeholder:"写点什么吧~"},null,512),[[Z,d.value]]),o("button",{class:"comment_btn",onClick:A}," 留言 ")])):D("",!0),o("div",{ref_key:"elementToObserve",ref:h},[(c(!0),_(ee,null,te(k.value,(n,Se)=>(c(),_("p",{class:"comment_item hidden-element",style:j({"background-color":n.comment_background_color}),onClick:$e=>M(n.comment_article_id)},[o("div",{class:"face_img",style:j(O(n.comment_user_face_img,n.comment_background_color)),onError:F},null,36),o("span",me,b(n.comment_user_name),1),ie,o("span",ue,[x(a,{"expand-trigger":"click","line-clamp":"1"},{tooltip:g(()=>[o("div",null,[w(" 写这么多不要命啦！！!（一共写了"+b(n.comment_content.length)+"个字？！） ",1),de,w(" 算了，你厉害 "),pe,n.comment_content.length===600?(c(),_("span",ge,"(好吧，是我限制了你的发挥:D)")):n.comment_content.length>600?(c(),_("span",he,"(你是怎么写这么多字的 -_- )")):(c(),_("span",ve,"(看来我的字数限制发挥了作用 ^^ )"))])]),default:g(()=>[w(b(n.comment_content)+" ",1)]),_:2},1024)]),o("span",fe,[ye,w(" "+b(n.comment_article_title),1)]),o("div",ke,[x(I,{time:n.comment_create_time,type:"relative",class:"comment_time"},null,8,["time"])])],12,_e))),256))],512),k.value.length==0?(c(),oe(B,{key:1,description:"啥也没有"},{extra:g(()=>[be]),_:1})):D("",!0),x(G,{justify:"center"},{default:g(()=>[x(v,{page:s.page,"onUpdate:page":[t[1]||(t[1]=n=>s.page=n),R],"page-count":s.pageCount,"page-slot":5,style:{"margin-bottom":"30px"}},{prev:g(()=>[xe]),next:g(()=>[we]),_:1},8,["page","page-count"])]),_:1})])])}}},Ie=H(Ce,[["__scopeId","data-v-dcac6c98"]]);export{Ie as C};
