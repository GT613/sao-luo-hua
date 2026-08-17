(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const SAVE_KEY = "jinghuajie-save-v1";
  const asset = p => `assets/${p}`;
  const portraits = {
    江顾: ["jiang-gu.webp", "江家七公子 · 无情道", "眉眼萧肃，行事冷硬。此番下界，只为在十年内斩断情劫。"],
    卫风: ["wei-feng.webp", "阳华宗弟子 · 神鸢鲛", "看似不思进取的纨绔，最擅长逃命与装乖。体内藏着无人知晓的秘密。"],
    江林: ["jiang-lin.webp", "江家旁支 · 九尾狐混血", "江顾的族兄与合作者。嘴上刻薄，办事却向来妥帖。"],
    玄之衍: ["xuan-zhiyan.webp", "阳华宗弟子", "卫风旧友。会在卫风惹出麻烦时第一个骂他，也会第一个来救他。"],
    曲丰羽: ["qu-fengyu.webp", "雀鸢宗少宗主", "宗门因果的中心人物之一，后来与玄之衍共同撑起新的阳华宗。"],
    江向云: ["jiang-xiangyun.webp", "江家天纯灵根", "被江家寄予厚望的继承人，与江顾之间横亘着家族旧账。"],
    陆离雨: ["lu-liyu.webp", "魔修", "来去无踪、喜怒难测，与江向云结有斩不断的情契。"]
  };
  const state = { difficulty: "dao", node: 0, scene: "upper", clues: [], hp: 100, enemy: 100, turn: 0, talismans: 1, selectedPetal: null, petals: [], stats: { trust: 0, bond: 0, clarity: 0, edge: 0 }, unlocked: ["江顾", "卫风"], settings: { music: true, speed: 12 } };
  const nodes = [
    { scene:"upper", chapter:"序章 · 情劫", speaker:"司命", mood:"天门", text:"曜琰仙君迟了三千年的情劫终于显现。依飞升图所载，无情道配师徒，渡劫最快。", objective:"听司命讲解情劫" },
    { speaker:"江顾", mood:"曜琰仙君", portrait:"江顾", text:"区区情劫。本君没空同一群蝼蚁浪费时间。", choices:[
      ["提剑下界，不等司命安排", {edge:1}, "你的锋芒有所增长。"],
      ["多问一句：此劫落在何人身上？", {clarity:1}, "你记住了司命欲言又止的神色。"]] },
    { speaker:"旁白", mood:"命簿开卷", text:"青年一脚踹开天门，纵身坠入云海。无人知道，这场被他视作小事的劫数，将横跨山海与万年。", next:"city" },
    { scene:"city", chapter:"第一章 · 蛟龙城", speaker:"卫风", mood:"阳华宗", portrait:"卫风", text:"神鸢鲛鳞究竟藏在哪里？离秘境开启只剩两个时辰，偏偏那只花精还追在后面……", objective:"在蛟龙城寻找三条线索", next:"explore" },
    { scene:"city", speaker:"卫风", mood:"戒指共鸣", portrait:"卫风", text:"马车帘子被风掀开。那人中指上的黑戒与通音符中的虚影一模一样——找到了。", choices:[
      ["悄悄跟上江家马车", {clarity:1}, "谨慎让你避开了一队江家修士。"],
      ["直接拦车：前辈，打个商量？", {bond:1}, "车里的人似乎被你的胆量气笑了。"]] },
    { scene:"underwater", chapter:"第二章 · 朝龙秘境", speaker:"江顾", mood:"江家七公子", portrait:"江顾", text:"炼气修士也敢跟踪我的马车。你是自己交代，还是等我搜魂？", choices:[
      ["装傻：前辈认错人了", {edge:1}, "卫风的求生本能开始运转。"],
      ["坦白：我只想借戒指一用", {trust:1}, "江顾没有相信，但记住了这句话。"]] },
    { speaker:"旁白", mood:"杀机骤起", text:"花粉从石缝中涌出，寻绿循着气息追进秘境。卫风尚未看清她的动作，匕首已经逼近眉心。", next:"battle" },
    { scene:"gate", chapter:"战后 · 一念", speaker:"江顾", mood:"师尊？", portrait:"江顾", text:"连最基础的止血符都不会。你这样的资质，也敢独自进朝龙秘境？", choices:[
      ["卫风：我很有用，真的", {bond:2}, "江顾看了你一眼，没有反驳。"],
      ["卫风：所以前辈能放我走吗？", {clarity:1}, "江顾冷笑了一声。"]] },
    { speaker:"江顾", mood:"清平峰", portrait:"江顾", text:"跪下。拜师。三年结丹，五年化神，十年大乘圆满。", choices:[
      ["卫风膝盖一软：杀了我吧", {bond:1}, "江顾愉快地握住了剑柄。"],
      ["先问清楚拜师有没有月俸", {clarity:1}, "江顾第一次认真怀疑自己的情劫。"]] },
    { scene:"sect", chapter:"尾声 · 清平峰", speaker:"旁白", mood:"春夜", text:"清平峰上，庭前落花积了薄薄一层。江顾把竹帚丢进卫风怀里，命他在天亮前扫净。", objective:"整理本章留下的五片因果", next:"sweep" }
  ];
  let typing = null, timing = null, pendingMove = null;

  function loadSave(){ try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if(s) return s; } catch{} return null; }
  function save(){ localStorage.setItem(SAVE_KEY, JSON.stringify({...state, savedAt:Date.now()})); updateContinue(); flashSave(); }
  function mergeSave(s){ Object.keys(state).forEach(k => { if(s[k] !== undefined) state[k] = s[k]; }); }
  function updateContinue(){ const s=loadSave(), btn=$("#continueBtn"); btn.classList.toggle("hidden",!s); if(s) $("#saveLabel").textContent=`· ${s.chapterLabel||"序章"}`; }
  function flashSave(){ const el=$("#autosave"); if(!el)return; el.textContent="命簿已记"; el.animate([{opacity:.2},{opacity:1}],{duration:500}); }
  function toast(msg){ const el=$("#toast"); el.textContent=msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),1800); }
  function show(id){ $$(".screen").forEach(x=>x.classList.remove("active")); $(id).classList.add("active"); const title=id==="#titleScreen"; $("#topbar").classList.toggle("hidden",title||id==="#difficultyScreen"); }
  function setScene(scene){ state.scene=scene; $("#app").dataset.scene=scene; }
  function home(){ show("#titleScreen"); setScene("upper"); updateContinue(); }
  function resetGame(){ Object.assign(state,{node:0,scene:"upper",clues:[],hp:100,enemy:100,turn:0,talismans:1,selectedPetal:null,petals:[],stats:{trust:0,bond:0,clarity:0,edge:0},unlocked:["江顾","卫风"]}); }
  function start(difficulty){ resetGame(); state.difficulty=difficulty; state.chapterLabel="序章"; save(); renderNode(); }
  function continueGame(){ const s=loadSave(); if(!s)return; mergeSave(s); if(state.petals?.length) renderSweep(); else if(state.turn>0&&state.enemy>0) renderBattle(); else renderNode(); }
  function typeText(text){ clearInterval(typing); const el=$("#dialogueText"), speed=state.settings.speed||12; el.textContent=""; let i=0; if(speed<=2){el.textContent=text;return} typing=setInterval(()=>{el.textContent=text.slice(0,++i);if(i>=text.length)clearInterval(typing)},speed); }
  function renderNode(){ const n=nodes[state.node]; if(!n){finish();return} show("#storyScreen"); if(n.scene)setScene(n.scene); if(n.chapter){$("#chapterName").textContent=n.chapter;state.chapterLabel=n.chapter} if(n.objective)$("#objective").textContent=n.objective;
    $("#speaker").textContent=n.speaker;$("#mood").textContent=n.mood||"";typeText(n.text);const wrap=$("#portraitWrap");
    if(n.portrait){wrap.classList.remove("hidden");$("#portrait").src=asset(portraits[n.portrait][0]);$("#portrait").alt=n.portrait;$("#portraitSigil").textContent=portraits[n.portrait][1]}else wrap.classList.add("hidden");
    const choices=$("#choices");choices.innerHTML="";$("#nextBtn").classList.toggle("hidden",!!n.choices);
    if(n.choices)n.choices.forEach((c,i)=>{const b=document.createElement("button");b.innerHTML=`${c[0]} <small>选择 ${i+1}</small>`;b.onclick=()=>choose(c,n);choices.appendChild(b)});save(); }
  function choose(c,n){Object.entries(c[1]).forEach(([k,v])=>state.stats[k]+=v);toast(c[2]);state.node++;setTimeout(()=>advanceSpecial(n),350)}
  function next(){const n=nodes[state.node];if(!n||n.choices)return;state.node++;advanceSpecial(n)}
  function advanceSpecial(prev){if(prev.next==="city"){renderNode();return}if(prev.next==="explore"){renderExplore();return}if(prev.next==="battle"){renderBattle(true);return}if(prev.next==="sweep"){renderSweep(true);return}renderNode()}
  function renderExplore(){show("#exploreScreen");setScene("city");$("#chapterName").textContent="第一章 · 蛟龙城";updateClues();save()}
  function updateClues(){const order=["market","alley","carriage"],next=order[state.clues.length];$$("[data-hotspot]").forEach(b=>{b.classList.toggle("found",state.clues.includes(b.dataset.hotspot));b.classList.toggle("guided",b.dataset.hotspot===next);b.classList.toggle("locked-guide",b.dataset.hotspot!==next&&!state.clues.includes(b.dataset.hotspot))});$("#clueCount").textContent=state.clues.length;$("#clueBar").style.width=`${state.clues.length/3*100}%`;const tips={market:"<b>新手指引</b>点击“第一步 · 拍卖行”的金色光点",alley:"<b>新手指引</b>拍卖行线索指向偏巷，点击“第二步 · 偏巷”",carriage:"<b>新手指引</b>鳞片开始发烫，点击“第三步 · 江家马车”"};$("#exploreTip").innerHTML=tips[next]||"<b>调查完成</b>线索相互呼应：目标就在江家马车中";if(state.clues.length===3){setTimeout(()=>renderNode(),1300)}}
  const clueText={market:"拍卖行残留着神鸢鲛鳞的水灵气息，但东西已经被江家买走。",alley:"孩子的皮球上粘着银蓝鳞片。指尖碰到时，耳坠微微发烫。",carriage:"龙绡帘后，一枚金纹黑戒与通音符中的虚影产生了共鸣。"};
  function hotspot(name){const order=["market","alley","carriage"],expected=order[state.clues.length];if(state.clues.includes(name)){toast("这里已经调查过了，请跟随下一步标记");return}if(name!==expected){toast(`先调查${expected==="market"?"拍卖行":expected==="alley"?"偏巷":"江家马车"}，发光标记会为你带路`);return}state.clues.push(name);state.stats.clarity++;toast(clueText[name]);updateClues();save()}
  function renderBattle(fresh=false){if(fresh)Object.assign(state,{hp:100,enemy:100,turn:0,talismans:1});show("#battleScreen");setScene("underwater");$("#chapterName").textContent="第二章 · 朝龙秘境";$("#battleLog").innerHTML=state.turn===0?"<b>新手指引：</b>第一回合先点“凝神”，观察花毒从哪一侧袭来。":"寻绿正在重新凝聚花毒。";updateBattle();save()}
  function updateBattle(){ $("#enemyHp").style.width=state.enemy+"%";$("#playerHp").style.width=state.hp+"%";$("#playerHpText").textContent=`气血 ${state.hp}`; $$('[data-move]').forEach(b=>b.disabled=false);$('[data-move="seal"]').disabled=state.talismans<=0; }
  function battleMove(move){if(timing)return;if(state.turn===0&&move!=="observe"){toast("先用“凝神”观察敌人的攻击方向");return}const logs={observe:"看清了！花粉往左侧聚集。下一回合可用止血符反击，或用踏风闪避。",seal:"符纸贴上花藤，火光顺着妖力逆烧而去！",dodge:"光标进入金色区域时，再点击任意位置或按空格。"};$("#battleLog").textContent=logs[move];$$('[data-move]').forEach(b=>b.disabled=true);$('.recommended-move')?.classList.remove('recommended-move');
    if(move==="observe"){state.stats.clarity++;state.enemy-=10;setTimeout(()=>enemyTurn(5),600)}
    else if(move==="seal"){state.talismans--;state.enemy-=32;state.stats.edge++;setTimeout(()=>enemyTurn(12),600)}
    else startTiming();updateBattle(); }
  function startTiming(){const bar=$(".timing");bar.classList.add("active");let pos=0,dir=1;pendingMove=true;timing=setInterval(()=>{pos+=dir*1.7;if(pos>=100||pos<=0)dir*=-1;$("#battleTimer").style.left=pos+"%"},16);const stop=()=>{if(!timing)return;clearInterval(timing);timing=null;bar.classList.remove("active");pendingMove=false;document.removeEventListener("click",stop);document.removeEventListener("keydown",keyStop);const good=pos>=(state.difficulty==="trial"?40:30)&&pos<=(state.difficulty==="trial"?62:74);state.enemy-=good?38:12;state.stats[good?"clarity":"edge"]++;$("#battleLog").textContent=good?"成功！你侧身避过匕首，反手将花藤钉在石壁上。":"慢了半步，但不会失败。匕首擦过肩头，江顾的援护正在接近。";setTimeout(()=>enemyTurn(good?4:14),500)};const keyStop=e=>{if(e.code==="Space")stop()};setTimeout(()=>{document.addEventListener("click",stop,{once:true});document.addEventListener("keydown",keyStop)},80);setTimeout(stop,state.difficulty==="trial"?1800:2800)}
  function enemyTurn(damage){state.hp=Math.max(0,state.hp-damage);state.turn++;if(state.enemy<=5||state.turn>=3){state.enemy=0;updateBattle();$("#battleLog").textContent="化神威压轰然落下。雪白长剑横在你眉心之前——江顾出手了。";state.stats.trust++;setTimeout(()=>{state.node=7;renderNode()},1500);return}if(state.hp<=0){state.hp=35;state.stats.bond++;toast("江顾援护：将死之人被强行拽了回来")}updateBattle();save()}
  function renderSweep(fresh=false){if(fresh||!state.petals.length){state.petals=[
      {id:1,color:"#eee6dc",name:"天门之雪"},{id:2,color:"#a63531",name:"卫风的血"},{id:3,color:"#28313a",name:"未明鬼纹"},{id:4,color:"#d5ab55",name:"黑戒金纹"},{id:5,color:"#8eb5a8",name:"清平旧梦"}]}
    show("#sweepScreen");setScene("sect");$("#chapterName").textContent="尾声 · 清平峰";const box=$("#gamePetals");box.innerHTML="";const spots=[[16,27,-18],[33,68,24],[51,38,-32],[68,63,13],[82,25,41]];state.petals.forEach((p,i)=>{const b=document.createElement("button");b.className="game-petal";b.title=p.name;b.style.cssText=`left:${spots[i][0]}%;top:${spots[i][1]}%;--r:${spots[i][2]}deg;--pc:${p.color}`;b.onclick=()=>selectPetal(p.id,b);box.appendChild(b)});state.selectedPetal=null;updatePetals();save()}
  function selectPetal(id,el){state.selectedPetal=id;$$('.game-petal').forEach(p=>p.classList.remove('selected'));el.classList.add('selected');$$('[data-dest]').forEach(b=>b.disabled=false);toast(state.petals.find(p=>p.id===id).name)}
  function sweepTo(dest){if(!state.selectedPetal){toast("先选择一片落花");return}const map={sword:["edge","此花已斩，化为剑意。"],lamp:["clarity","灯影收住了一段记忆。"],tree:["trust","花归树下，羁绊悄然生根。"]};state.stats[map[dest][0]]++;const idx=state.petals.findIndex(p=>p.id===state.selectedPetal);const el=$$('.game-petal')[idx];el.style.opacity="0";el.style.transform+=" scale(0)";state.petals.splice(idx,1);state.selectedPetal=null;toast(map[dest][1]);setTimeout(()=>{if(!state.petals.length)finish();else renderSweep()},260)}
  function updatePetals(){const left=state.petals.length;$("#petalsLeft").textContent=left;$("#petalProgress").style.width=`${left/5*100}%`;$$('[data-dest]').forEach(b=>b.disabled=!state.selectedPetal)}
  function finish(){show("#endingScreen");setScene("sect");state.unlocked=[...new Set([...state.unlocked,"玄之衍","江林"] )];const s=state.stats;let title="花落有痕",text="你没有斩尽庭前的每一片花。江顾站在廊下看了许久，最终也没有责罚。命簿写下：此劫，尚有回音。";if(s.edge>=4){title="剑下无尘";text="你把大部分因果扫入剑下。锋芒足以破局，却也让一些尚未说出口的话随风而散。"}else if(s.trust+s.bond>=5){title="山海自逢";text="你选择留下那些看似无用的牵挂。很多年后回望，正是它们让两个人穿过山海，重新找到彼此。"}else if(s.clarity>=5){title="镜花照心";text="你看清了情劫中每一次犹疑，却没有急着替他们作出结论。有些答案，需要等到落花再开。"}$("#endingTitle").textContent=title;$("#endingText").textContent=text;$("#endingStats").innerHTML=[["信",s.trust,"信任"],["系",s.bond,"牵系"],["明",s.clarity,"清醒"],["锋",s.edge,"锋芒"]].map(x=>`<div><b>${x[0]} · ${x[1]}</b><span>${x[2]}</span></div>`).join("");state.petals=[];state.chapterLabel="序章完成";save()}
  function renderCodex(){
    try{
      const campaign=JSON.parse(localStorage.getItem("jinghuajie-campaign-v1"))||{};
      const done=campaign.completed||[];
      const earned=["江顾","卫风"];
      if(done.includes(1))earned.push("玄之衍","江林");
      if(done.includes(2))earned.push("曲丰羽");
      if(done.includes(3))earned.push("江向云","陆离雨");
      if(done.length>=18)earned.push(...Object.keys(portraits));
      state.unlocked=[...new Set([...(state.unlocked||[]),...earned])];
    }catch{}
    const list=$("#codexList");list.innerHTML="";
    Object.entries(portraits).forEach(([name,p])=>{const open=state.unlocked.includes(name),d=document.createElement("article");d.className="codex-entry"+(open?"":" locked");d.innerHTML=`<img src="${asset(p[0])}" alt="${open?name:"未解锁人物"}"><small>${open?p[1]:"因果未至"}</small><h3>${open?name:"？？？"}</h3><p>${open?p[2]:"在后续旅途中与此人相遇，即可解锁人物小传。"}</p>`;list.appendChild(d)});
    $("#codexDrawer").classList.add("open");$("#codexDrawer").setAttribute("aria-hidden","false")
  }
  function music(on){state.settings.music=on;const a=$("#bgm");if(on)a.play().catch(()=>{});else a.pause();localStorage.setItem("jinghuajie-settings",JSON.stringify(state.settings))}
  function ambient(){for(let i=0;i<13;i++){const p=document.createElement("i");p.className="ambient-petal";p.style.left=Math.random()*100+"%";p.style.animationDuration=9+Math.random()*13+"s";p.style.animationDelay=-Math.random()*15+"s";p.style.opacity=.2+Math.random()*.5;$("#ambientPetals").appendChild(p)}}
  document.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const a=b.dataset.action;if(a==="new")show("#difficultyScreen");else if(a==="continue")continueGame();else if(a==="home")home();else if(a==="next")next();else if(a==="replay"){start(state.difficulty)}else if(a==="codex")renderCodex();else if(a==="settings")$("#settingsModal").classList.add("open");else if(a==="close-drawer")$("#codexDrawer").classList.remove("open");else if(a==="close-settings")$("#settingsModal").classList.remove("open");else if(a==="clear-save"){localStorage.removeItem(SAVE_KEY);toast("命簿已焚");updateContinue()}if(b.dataset.difficulty){start(b.dataset.difficulty);music(true)}if(b.dataset.hotspot)hotspot(b.dataset.hotspot);if(b.dataset.move)battleMove(b.dataset.move);if(b.dataset.dest)sweepTo(b.dataset.dest)});
  document.addEventListener("keydown",e=>{if(e.code==="Space"&&!pendingMove&&$("#storyScreen").classList.contains("active")){e.preventDefault();next()}if(e.code==="Escape"){$("#codexDrawer").classList.remove("open");$("#settingsModal").classList.remove("open")}});
  $("#musicToggle").addEventListener("change",e=>music(e.target.checked));$("#textSpeed").addEventListener("change",e=>{state.settings.speed=+e.target.value});
  try{Object.assign(state.settings,JSON.parse(localStorage.getItem("jinghuajie-settings"))||{})}catch{}$("#musicToggle").checked=state.settings.music;$("#textSpeed").value=String(state.settings.speed);ambient();updateContinue();
})();
