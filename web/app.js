(() => {
  'use strict';
  const key='studiolive-config',channel='studiolive-web-v1';
  const bus=typeof BroadcastChannel!=='undefined'?new BroadcastChannel(channel):null;
  const defaults={mode:'chua',sound:true,volume:.7,chuaMusic:true,chuaVoice:false,rapVoice:false,showChat:true,showGifts:true,showFollows:true,showShares:true,showLikeCounter:true,showViewerCounter:true,showTopGifter:true,bots:true,ambient:true};
  let cfg;try{cfg={...defaults,...JSON.parse(localStorage.getItem(key)||'{}')}}catch{cfg={...defaults}}
  let paused=false,stats={viewers:0,likes:0,comments:0,gifts:0,diamonds:0};
  const $=id=>document.getElementById(id);
  const emit=(type,data)=>{bus?.postMessage({type,data});$('preview').contentWindow?.postMessage({studioWeb:{type,data}},location.origin)};
  const save=()=>{localStorage.setItem(key,JSON.stringify(cfg));emit('config',cfg);document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===cfg.mode))};
  document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{cfg.mode=b.dataset.mode;save()});
  $('sound').value=cfg.sound?'yes':'no';$('volume').value=Math.round(cfg.volume*100);
  $('sound').onchange=e=>{cfg.sound=e.target.value==='yes';save()};
  $('volume').oninput=e=>{cfg.volume=Number(e.target.value)/100;save()};
  const user=()=>({id:'demo',uniqueId:'demo',nickname:$('nickname').value.trim()||'Khách thử',avatar:''});
  function event(type,extra={}){
    const ev={type,user:user(),...extra};
    if(type==='chat')stats.comments++;
    if(type==='like')stats.likes+=extra.count||1;
    if(type==='gift'){stats.gifts++;stats.diamonds+=extra.total||1}
    if(type==='join')stats.viewers++;
    emit('live',ev);emit('stats',{...stats});
  }
  $('send').onclick=()=>{const text=$('message').value.trim();if(!text)return;event('chat',{text});$('message').value=''};
  $('message').onkeydown=e=>{if(e.key==='Enter')$('send').click()};
  $('like').onclick=()=>event('like',{count:10,total:stats.likes+10});
  $('gift').onclick=()=>event('gift',{giftName:'Hoa hồng',name:'Hoa hồng',repeatCount:1,diamondCount:1,total:1});
  $('join').onclick=()=>event('join');
  $('pause').onclick=()=>{paused=!paused;emit('pause',paused);$('pause').textContent=paused?'Tiếp tục':'Tạm dừng'};
  $('reset').onclick=()=>{cfg={...defaults};save();location.reload()};
  window.addEventListener('message',e=>{if(e.origin===location.origin&&e.data?.studioAlive){/* preview is responsive */}});
  save();
})();