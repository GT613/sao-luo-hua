(() => {
  "use strict";
  const $ = (s, el=document) => el.querySelector(s), $$ = (s,el=document) => [...el.querySelectorAll(s)];
  const KEY="jinghuajie-campaign-v1";
  const chapters=[
    [1,"朝龙秘境","1—13","神鸢鲛鳞初现，江顾与卫风因一枚黑戒相遇。","done"],
    [1,"阳华云海","14—54","拜入清平峰；从被迫晨课到溪源秘境，师徒因果初结。","open"],
    [2,"年少春衫","55—92","白瞳与鬼纹渐显，旧友、宗门与隐秘血脉彼此纠缠。","locked"],
    [2,"松绥幻境","93—105","幻境照见心中最不愿承认的执念。","locked"],
    [3,"风月无心","106—130","风月秘境中，真假情意与元神羁绊同时失控。","locked"],
    [3,"阴阳白骨","131—149","为重塑元丹踏入白骨阙，代价从来不止灵石。","locked"],
    [3,"试炼之境","150—172","烟雨台下九百九十九城，真正的试炼指向神殿旧事。","locked"],
    [4,"烟雨八阁","173—203","八阁势力交错，江家旧账与混沌阴影浮出水面。","locked"],
    [4,"生死无咎","204—226","生死之间没有无咎之人，选择开始反噬所有关系。","locked"],
    [5,"红鸢寻玉","227—246","卫风独自踏上寻回江顾的漫长旅途。","locked"],
    [5,"山重水复","247—267","沉曜大陆迷雾重重，旧日身份与上界因果重叠。","locked"],
    [5,"柳暗花明","268—277","道侣契、飞升与一场看似彻底的决裂。","locked"],
    [6,"情劫难渡","278—307","曜琰归位，临明叩天门；万年情劫迎来最终抉择。","locked"],
    [6,"山海自逢","308—317","时光倒流，镜花散尽，山海终有重逢之日。","locked"],
    [6,"大结局","318—319","重返清平峰，种花、飞升，并肩回到上界。","locked"],
    [7,"养崽与日常","320—324","尘埃落定之后，仙宫也有鸡飞狗跳的寻常岁月。","locked"],
    [7,"石头山与钟情","325—328","旧地重游，重新学习如何坦白爱与依赖。","locked"],
    [7,"上界与修仙 IF","329—335","另一条命数中，他们仍会在人海里找到彼此。","locked"]
  ];
  const volumeNames={1:"第一卷 · 神鸢鲛鳞",2:"第二卷 · 鬼面白目",3:"第三卷 · 背灯和月",4:"第四卷 · 镜中观花",5:"第五卷 · 沉曜日寒",6:"第六卷 · 九重魔障",7:"番外 · 山海日常"};
  const cs={volume:1,episode:1,node:0,cultivation:8,rapport:12,training:0,completed:[0]};
  try{Object.assign(cs,JSON.parse(localStorage.getItem(KEY))||{})}catch{}
  const episode=[
    {step:"壹 · 清平峰",speaker:"卫风",face:"wei-feng.webp",text:"拜师第一夜，卫风抱着被褥睡得正香。天还没亮，房门连同防护阵一起被江顾劈开。",choices:[["闭眼装死，赌师父懒得管",0,1],["立刻爬起来：师父早！",1,2]]},
    {step:"贰 · 晨课",speaker:"江顾",face:"jiang-gu.webp",text:"从今日起，卯时练剑，辰时引气，午后学阵法。三年结丹，一日也不能少。",choices:[["小声讨价还价：三十年行不行？",1,1],["先答应，再想办法偷懒",0,2]]},
    {step:"叁 · 运气",speaker:"旁白",face:"wei-feng.webp",text:"江顾两指点在卫风眉心，强横灵力替他开出第一道周天。接下来，只能靠卫风自己稳住灵息。",training:true},
    {step:"肆 · 云海崖",speaker:"玄之衍",face:"xuan-zhiyan.webp",text:"你失踪几日，回来就多了个师父？卫风，你可知道江顾是什么人？",unlock:"玄之衍",choices:[["他脾气差，但没有真杀我",2,1],["还能是什么人，我祖宗",1,2]]},
    {step:"伍 · 授业",speaker:"江顾",face:"jiang-gu.webp",text:"你不是学不会，只是从前无人逼你学。剑拿稳——敌人不会等你想起口诀。",choices:[["认真记住江顾的每个动作",2,1],["故意摔倒，试探他会不会接",0,3]]},
    {step:"陆 · 拢云城",speaker:"江林",face:"jiang-lin.webp",text:"江顾带回来的就是这只长毛鸟？看着不太聪明，倒是很会黏人。",unlock:"江林",choices:[["卫风笑着喊一声族兄",1,2],["问江林九尾狐掉不掉毛",0,2]]},
    {step:"柒 · 溪源令",speaker:"阮克己",face:"jiang-gu.webp",text:"雀鸢宗与灵龙宗都会进入溪源秘境。阳华宗势弱，此行不是历练，是在强敌手里争一条活路。",choices:[["跟在江顾身边，稳妥取物",2,1],["与玄之衍分头行动，多拿奖励",1,2]]},
    {step:"捌 · 秘境伏击",speaker:"卫风",face:"wei-feng.webp",text:"灵龙宗弟子封住退路。卫风第一次没有往江顾身后躲，而是把仅剩的符纸按在阵眼上。",choices:[["引爆符阵，为同门开路",2,2],["保留符纸，寻找阵法缺口",3,1]]},
    {step:"玖 · 翅根血",speaker:"旁白",face:"wei-feng.webp",text:"混乱中，卫风的血落在江顾掌心。奇异的求偶气息与神鸢鲛的力量同时苏醒，两人之间多了一道无法忽视的牵引。",choices:[["卫风装作什么都不知道",1,1],["追问江顾为何避开自己",0,3]]},
    {step:"拾 · 清平夜雪",speaker:"江顾",face:"jiang-gu.webp",text:"今日剑招勉强能看。明日加练两个时辰。",choices:[["卫风：师父，这算夸我吗？",1,3],["趁他没反悔立刻回房",2,1]]},
    {step:"篇章结算",speaker:"旁白",face:"jiang-gu.webp",text:"云海翻过清平峰，少年第一次在卯时之前醒来。江顾站在庭中，像是早已等了很久。",end:true}
  ];
  const episodeSets={
    1:episode,
    2:[
      {step:"壹 · 雷劫之后",speaker:"旁白",face:"wei-feng.webp",text:"雷劫把峡谷劈得寸草不生。卫风褪去神鸢鲛法相，攥着江顾衣襟不肯松手；一双白瞳却在暗处悄然睁开。",choices:[["先隐瞒白瞳能够视物",1,0],["告诉江顾身体出现异样",0,2]]},
      {step:"贰 · 年少春衫",speaker:"卫风",face:"wei-feng.webp",text:"回到阳华宗，往日偷懒打猎的日子像隔了一层雾。玄之衍仍等在后山，却敏锐地察觉卫风已经不同。",choices:[["像从前一样插科打诨",1,1],["请玄之衍替自己查神鸢鲛",2,0]]},
      {step:"叁 · 鬼纹",speaker:"江顾",face:"jiang-gu.webp",text:"鬼纹沿着卫风手腕向上蔓延，能吞噬元神，也会放大最隐秘的欲念。江顾以剑气将它们暂时压回经脉。",choices:[["忍住疼，不让江顾分心",2,1],["抓住江顾袖子喊疼",0,3]]},
      {step:"肆 · 旧友之隙",speaker:"玄之衍",face:"xuan-zhiyan.webp",text:"你口口声声喊他师父，可江顾从未告诉你，他最初为何收徒。卫风，你到底信他，还是怕他？",choices:[["我信他不会让我死",1,3],["这是我和江顾之间的事",2,0]]},
      {step:"伍 · 白瞳照影",speaker:"卫风",face:"wei-feng.webp",text:"白瞳第一次看清元神：江顾周身是近乎刺目的金光，自己却像一团裂开的黑雾。卫风下意识闭上眼睛。",choices:[["记住江顾元神中的裂痕",3,1],["只当自己从未看见",0,1]]},
      {step:"陆 · 江家来信",speaker:"江林",face:"jiang-lin.webp",text:"江家召江顾回族参加松绥试炼。江林带来的密信上只有一句：江向云已经出关。",choices:[["随江顾前往江家",2,2],["留在阳华宗调查鬼纹",3,0]]},
      {step:"柒 · 同行",speaker:"江顾",face:"jiang-gu.webp",text:"修行一途长路漫漫，孤身一人才是常态。江顾说得冷淡，却把能遮掩白瞳的法器扣在卫风腕间。",choices:[["把法器认真收好",1,3],["问他是不是舍不得自己",0,3]]},
      {step:"捌 · 杀意",speaker:"旁白",face:"wei-feng.webp",text:"敌人的元神近在咫尺，鬼纹发出饥饿的尖啸。吞下去便能突破，代价是任由混沌侵入神智。",choices:[["克制鬼纹，按江顾教的方法出剑",3,2],["吞噬元神，换取立刻破境",4,-1]]},
      {step:"玖 · 师徒",speaker:"卫风",face:"wei-feng.webp",text:"卫风终于承认，他想要的从来不只是一个传道授业的师父。可这句话尚不能说出口。",choices:[["把欲念压回心底",2,1],["靠近江顾，试探他的底线",0,4]]},
      {step:"篇章结算",speaker:"旁白",face:"wei-feng.webp",text:"春衫仍是旧时颜色，人却已经走出很远。江家松绥幻境开启，水镜将照见每个人最不愿面对的执念。",end:true}
    ],
    3:[
      {step:"壹 · 松绥水镜",speaker:"江向云",face:"jiang-xiangyun.webp",text:"江家试炼以元神入境。江向云立于另一面水镜前，剑锋所指，是与他结下情契的魔修陆离雨。",unlock:"江向云",choices:[["观察江向云迟迟未落的剑",3,0],["先寻找卫风的幻境入口",1,2]]},
      {step:"贰 · 情契",speaker:"陆离雨",face:"lu-liyu.webp",text:"杀了我，你们江家最看重的大公子也得陪葬。陆离雨笑得阴森，眼底却没有半分惧意。",unlock:"陆离雨",choices:[["记下情契的元神走向",3,0],["不插手江向云的因果",1,1]]},
      {step:"叁 · 清凉村",speaker:"江顾",face:"jiang-gu.webp",text:"江顾的幻境没有仙宫与权柄，只有一条毛色驳杂的小狗。要破境，他必须亲手杀死唯一陪伴自己的活物。",choices:[["相信江顾能够分清幻境",2,1],["闯入幻境阻止他落剑",0,4]]},
      {step:"肆 · 雪中旧影",speaker:"旁白",face:"jiang-gu.webp",text:"剑落时，小狗化作点点流光。江顾神色如常，垂在袖中的手指却无意识地摩挲了很久。",choices:[["不揭穿他的动摇",2,3],["告诉他：在意并非软弱",1,4]]},
      {step:"伍 · 卫风之境",speaker:"卫风",face:"wei-feng.webp",text:"卫风的幻境里，江顾转身走入天门。无论他怎样追，师父都没有回头。鬼纹开始吞噬脚下的路。",choices:[["喊江顾的名字，坚持往前走",3,3],["放任鬼纹撕开幻境",4,0]]},
      {step:"陆 · 白瞳真视",speaker:"卫风",face:"wei-feng.webp",text:"闭上肉眼，白瞳反而看见了幻境最薄弱的裂缝，也看见江顾留在自己元神上的保护禁制。",choices:[["沿禁制寻找真正出口",4,2],["借鬼纹吞掉整座幻境",5,-1]]},
      {step:"柒 · 水镜碎裂",speaker:"江顾",face:"jiang-gu.webp",text:"你在清凉村昏迷那几日，究竟对我做了什么？江顾掐住卫风脖颈，语气比剑锋更冷。",choices:[["如实承认自己越过了界限",1,3],["继续装作白瞳不能视物",2,-1]]},
      {step:"捌 · 江家暗流",speaker:"江林",face:"jiang-lin.webp",text:"江向云是江家选中的继承人，而你只是替他保驾护航的刀。江林把查到的旧账推到江顾面前。",choices:[["暂且隐忍，带卫风离开",3,2],["当众揭开江家的旧账",4,0]]},
      {step:"玖 · 同归",speaker:"旁白",face:"wei-feng.webp",text:"松绥幻境崩塌前，卫风扑向江顾。羽翼、鲛尾和鬼纹一同将两个人裹进黑暗。",choices:[["优先护住江顾元神",2,4],["吞掉坍塌的幻境力量",5,0]]},
      {step:"篇章结算",speaker:"江顾",face:"jiang-gu.webp",text:"幻境能照见执念，却不能替人作出选择。离开江家时，江顾没有让卫风松开抓着自己衣袖的手。",end:true}
    ],
    4:[
      {step:"壹 · 江家密牢",speaker:"玄之衍",face:"xuan-zhiyan.webp",text:"玄之衍与曲丰羽被困江家密牢。江顾独自前来，却没有带上卫风；牢外每一道脚步都像是审判。",unlock:"曲丰羽",choices:[["先破开曲丰羽的禁制",3,1],["追问卫风去了哪里",1,2]]},
      {step:"贰 · 风月帖",speaker:"曲丰羽",face:"qu-fengyu.webp",text:"风月秘境只认执念，不认修为。曲丰羽交出秘境请帖，也带来灵龙宗正在追查神鸢鲛的消息。",choices:[["接下请帖，主动入局",3,1],["先送玄之衍二人离开",1,3]]},
      {step:"叁 · 万佛冢",speaker:"江顾",face:"jiang-gu.webp",text:"万佛冢中遍地须弥心，菩提树精却会将来者最渴望的东西化作幻影。卫风看见了一个愿意永远留下的江顾。",choices:[["斩碎幻影，寻找真正阵眼",4,1],["让卫风自己识破虚妄",2,3]]},
      {step:"肆 · 比翼灵音",speaker:"卫风",face:"wei-feng.webp",text:"比翼灵音鸟能传递元神深处最真实的声音。卫风听见江顾冷淡的心音里，反复出现自己的名字。",choices:[["装作没有听见",2,2],["追着江顾问个明白",0,4]]},
      {step:"伍 · 元神相融",speaker:"旁白",face:"jiang-gu.webp",text:"秘境崩塌，两人的元神被迫相融。江顾的神力灼痛鬼纹，卫风的混沌却替他挡住了致命一击。",choices:[["由江顾主导元神运转",3,2],["让卫风吞噬坍塌灵力",4,0]]},
      {step:"陆 · 风月无心",speaker:"江顾",face:"jiang-gu.webp",text:"无情道并非无心。江顾越是清楚这一点，越不愿承认卫风已经成为计划之外的变数。",choices:[["继续以师徒之名划清界限",3,0],["默许卫风留在自己身边",1,4]]},
      {step:"柒 · 菩提问心",speaker:"卫风",face:"wei-feng.webp",text:"若有一日师父要杀你证道，你会如何？菩提树精问。卫风握着剑，许久没有回答。",choices:[["我会先问他为什么",2,3],["那就让他亲自动手",0,4]]},
      {step:"捌 · 师徒归途",speaker:"旁白",face:"wei-feng.webp",text:"离开秘境时，卫风元神受损，仍死死搂着江顾的腰不放。江顾没有推开，只命他闭嘴休息。",choices:[["安心在江顾身边睡去",1,4],["强撑着替江顾警戒",3,2]]},
      {step:"篇章结算",speaker:"江顾",face:"jiang-gu.webp",text:"风月本无心，动心的是入境之人。须弥心已经到手，下一程却要踏入以元神交易闻名的白骨阙。",end:true}
    ],
    5:[
      {step:"壹 · 白骨阙",speaker:"白羿",face:"qu-fengyu.webp",text:"白骨阙能买卖法器，也能买卖元神与寿数。白羿一眼看出江顾元神重伤，却不肯说明所求代价。",choices:[["交出三颗须弥心换取消息",2,1],["以江家名义逼她开价",3,0]]},
      {step:"贰 · 元丹已碎",speaker:"卫风",face:"wei-feng.webp",text:"卫风的元丹早被鬼纹侵蚀。没有新的元丹，他的修为、白瞳与神鸢鲛法相都会一起崩溃。",choices:[["接受最坏结果，先稳定鬼纹",3,1],["相信江顾一定另有办法",1,3]]},
      {step:"叁 · 阴阳楼",speaker:"江顾",face:"jiang-gu.webp",text:"重塑元丹需穿过阴阳楼九重骨阵。每走一步，阵法都会剥离一段记忆作为通行代价。",choices:[["舍弃无关的幼年记忆",3,0],["以元神承受骨阵反噬",1,3]]},
      {step:"肆 · 无名旧梦",speaker:"旁白",face:"wei-feng.webp",text:"被剥离的记忆里，有少年在云海崖等玄之衍，也有第一次被江顾按着练剑的清晨。卫风伸手去抓，却只抓到碎光。",choices:[["保留关于江顾的记忆",1,4],["保留阳华宗旧友的记忆",2,2]]},
      {step:"伍 · 生骨火",speaker:"江顾",face:"jiang-gu.webp",text:"生骨火能炼出元丹，也会焚尽鬼纹宿主的经脉。江顾将自己的元神覆在卫风经脉之外。",choices:[["与江顾共同承受火焰",3,3],["推开江顾，独自入阵",4,0]]},
      {step:"陆 · 莹润元丹",speaker:"江顾",face:"jiang-gu.webp",text:"卫风以为一切已经失败，江顾却摊开掌心。一枚莹润透亮、微微泛红的元丹静静悬在那里。",choices:[["规规矩矩喊一声师父",1,4],["先抢元丹再喊师父",2,3]]},
      {step:"柒 · 骨眼",speaker:"白羿",face:"qu-fengyu.webp",text:"白羿的骨眼看见新元丹里藏着一缕金色神力。那不是江家术法，而是远在上界的古神赐福。",choices:[["暂时封住这缕神力",3,1],["让白瞳追溯神力来源",4,0]]},
      {step:"捌 · 重塑",speaker:"卫风",face:"wei-feng.webp",text:"新元丹归位，鬼纹第一次安静下来。卫风睁开白瞳，看见江顾元神上的裂痕比自己更深。",choices:[["替江顾隐瞒伤势",2,3],["逼他停下疗伤",1,4]]},
      {step:"篇章结算",speaker:"旁白",face:"jiang-gu.webp",text:"阴阳白骨之间，新生的元丹开始转动。望月大陆烟雨台来信，邀江家弟子参加一场没有退路的试炼。",end:true}
    ],
    6:[
      {step:"壹 · 九百九十九城",speaker:"萧清焰",face:"jiang-xiangyun.webp",text:"烟雨台下九百九十九座城如棋盘铺开，古神殿的金光散落其间。萧清焰将江顾一行引向阴阳楼。",choices:[["先调查古神殿赐福",3,1],["紧跟江向云进入试炼",2,2]]},
      {step:"贰 · 淬神一重",speaker:"旁白",face:"jiang-gu.webp",text:"第一重只允许元神进入。凡低于真仙境、元神受损或找不到淬神之术者，皆会被立即淘汰。",choices:[["江顾独自寻找淬神术",4,0],["让卫风元神与自己同行",2,3]]},
      {step:"叁 · 血菩提",speaker:"卫风",face:"wei-feng.webp",text:"血菩提把卫风元神困在树根里，以混沌为食。脱离它需要撕碎已经融合的半个元神。",choices:[["等待江顾从外部破阵",2,3],["强行脱离血菩提",4,0]]},
      {step:"肆 · 楚观山",speaker:"旁白",face:"wei-feng.webp",text:"楚观山试图夺取卫风的混沌力量。白瞳照见他的元神弱点，鬼纹则催促卫风将整个人吞下。",choices:[["只毁掉楚观山的元神核心",3,2],["彻底吞噬，不留后患",5,-1]]},
      {step:"伍 · 木偶躯壳",speaker:"江顾",face:"jiang-gu.webp",text:"卫风元神裂隙遍布，江顾把他放进早已备好的木偶躯壳。卫风醒来第一件事仍是搂住他的腰。",choices:[["听江顾的话休息",1,4],["立刻提醒他试炼正在崩塌",3,2]]},
      {step:"陆 · 吞境",speaker:"卫风",face:"wei-feng.webp",text:"试炼之境以古神残骸为核，正在吞噬所有参试者。卫风可以反过来吞掉它，但没人知道他是否还能回来。",choices:[["与江顾建立元神锚点后吞境",4,3],["独自吞下试炼核心",6,-1]]},
      {step:"柒 · 神殿余响",speaker:"江顾",face:"jiang-gu.webp",text:"境内传来古老神音，称江顾为曜琰。那名字让他颈侧伤疤灼痛，也让卫风体内混沌核剧烈震动。",choices:[["记下曜琰之名",4,1],["先封住卫风的混沌核",2,3]]},
      {step:"捌 · 境碎",speaker:"旁白",face:"wei-feng.webp",text:"卫风吞掉最后一片天幕，试炼之境在众人眼前消失。烟雨台震怒，而江顾只关心怀里的元神是否完整。",choices:[["立刻离开烟雨台",3,2],["留下追查古神殿",4,1]]},
      {step:"篇章结算",speaker:"卫风",face:"wei-feng.webp",text:"试炼毁了，神殿醒了，曜琰的名字第一次落入命簿。师徒二人被迫走进烟雨八阁更深的权力中心。",end:true}
    ],
    7:[
      {step:"壹 · 八阁追令",speaker:"旁白",face:"jiang-gu.webp",text:"试炼之境消失，烟雨八阁同时发出追令。江顾带着卫风借木偶躯壳离开，身后每一座城都亮起搜魂阵。",choices:[["隐藏身份潜入第七阁",3,1],["借江家名号正面交涉",2,0]]},
      {step:"贰 · 借灵石",speaker:"江顾",face:"jiang-gu.webp",text:"逃亡消耗了所有灵石。江顾生平第一次开口向人借钱，回来却发现卫风以为他生气离开，正阴沉地守在门边。",choices:[["解释去向，让卫风安心",1,4],["把灵石袋丢给他，不作解释",2,1]]},
      {step:"叁 · 焚台殿",speaker:"陆离雨",face:"lu-liyu.webp",text:"陆离雨引他们进入焚台殿。殿中魔修不问来历，只看能否付得起代价；江向云竟也已经等在那里。",choices:[["接受陆离雨的暂时结盟",2,2],["只与江向云交换情报",3,0]]},
      {step:"肆 · 一家人",speaker:"江向云",face:"jiang-xiangyun.webp",text:"江向云在众人面前称陆离雨为一家人。陆离雨笑容几乎裂开，情契却诚实地亮起一道红光。",choices:[["顺势利用两人的情契追踪术",3,1],["不揭穿陆离雨的动摇",1,3]]},
      {step:"伍 · 古神遗址",speaker:"江顾",face:"jiang-gu.webp",text:"八阁地底埋着另一座古神殿。神像无面，掌中却托着与卫风体内一模一样的混沌核。",choices:[["由江顾触碰神像",3,2],["让白瞳读取神殿残忆",4,0]]},
      {step:"陆 · 曜琰残影",speaker:"旁白",face:"jiang-gu.webp",text:"残忆中，金衣仙君立在无尽天上，身后神鸟与苍龙俯首。那张脸与江顾一模一样，却比他更加冷酷傲慢。",choices:[["承认曜琰可能就是江顾",4,1],["先封存残忆，避免惊动仙界",2,2]]},
      {step:"柒 · 混沌饥饿",speaker:"卫风",face:"wei-feng.webp",text:"靠近混沌核后，卫风第一次听见它的饥饿。整座神殿都可以成为食物，鬼纹已经缠住江顾手腕。",choices:[["主动松开江顾并退后",3,2],["请江顾用神力压制自己",1,4]]},
      {step:"捌 · 八阁围杀",speaker:"江林",face:"jiang-lin.webp",text:"八阁封锁神殿出口。江林带来唯一的退路：毁掉一座城的护阵，让混乱掩护所有人离开。",choices:[["只破阵眼，尽量避免伤亡",4,2],["引爆护阵，彻底断绝追兵",5,-1]]},
      {step:"玖 · 镜中观花",speaker:"江顾",face:"jiang-gu.webp",text:"我们看到的也许都只是镜中花。江顾带着卫风穿过燃烧的阵门，第一次主动握紧了他的手。",choices:[["回握江顾，稳定元神锚点",2,4],["替他挡下身后的追击",4,2]]},
      {step:"篇章结算",speaker:"旁白",face:"jiang-gu.webp",text:"烟雨八阁的秩序开始崩塌，古神殿却在废墟下逐一苏醒。所有线索都指向一场被掩埋已久的生死旧案。",end:true}
    ],
    8:[
      {step:"壹 · 焚台之盟",speaker:"金盈袖",face:"qu-fengyu.webp",text:"焚台殿暂代殿主金盈袖召集各方。八阁要封死大陆，唯有联合魔修、江家与散修才能撕开出口。",choices:[["由江向云代表江家结盟",3,1],["让陆离雨统合魔修势力",2,2]]},
      {step:"贰 · 生死簿",speaker:"陆离雨",face:"lu-liyu.webp",text:"神殿深处藏着一册生死簿，记载古神以众生元神饲养混沌容器的旧事。卫风的名字出现在最后一页。",choices:[["烧毁名册，不让八阁得到",4,1],["保存名册作为神殿罪证",3,2]]},
      {step:"叁 · 无咎阵",speaker:"江顾",face:"jiang-gu.webp",text:"无咎阵声称能把灾厄转移给无罪之人。破阵者必须承认：世上没有真正与因果无关的人。",choices:[["由江顾承担阵法反噬",2,3],["师徒共同分担因果",3,3]]},
      {step:"肆 · 情契断刃",speaker:"江向云",face:"jiang-xiangyun.webp",text:"陆离雨为救江向云强行扯动情契，元神几乎被斩断。江向云终于回身，以本命剑护住那个被江家视作污点的魔修。",choices:[["协助修补两人的情契",2,3],["趁机解除情契给他们自由",4,0]]},
      {step:"伍 · 神殿坠落",speaker:"旁白",face:"wei-feng.webp",text:"古神殿从天空坠入大陆，灵脉像蛛网般断裂。卫风若释放混沌，可以吞掉冲击，也可能再无法维持人形。",choices:[["以江顾神力为锚释放混沌",4,3],["只护住同行之人撤离",2,1]]},
      {step:"陆 · 碎陆成海",speaker:"卫风",face:"wei-feng.webp",text:"陆地在脚下碎成无数块，海水倒灌。卫风的触手撑住江顾重伤的身体，却感受不到他的元神回应。",choices:[["把江顾收入墨玉镯温养",3,4],["立刻返回战神神殿求救",4,2]]},
      {step:"柒 · 镜花卷",speaker:"玄之衍",face:"xuan-zhiyan.webp",text:"玄之衍与曲丰羽决定返回平泽重建宗门。他们把镜花卷交给卫风，里面存着江顾留下的最后一道元神气息。",choices:[["与故友认真告别",1,4],["请他们替自己守住清平峰",2,3]]},
      {step:"捌 · 孤身",speaker:"卫风",face:"wei-feng.webp",text:"修行一途，孤身一人才是常态。卫风踏上赤雪剑，终于明白江顾曾经说过的话，却不肯接受那会是诀别。",choices:[["循镜花卷前往沉曜大陆",3,3],["先搜寻碎裂大陆上的幸存者",4,1]]},
      {step:"玖 · 红鸢方向",speaker:"旁白",face:"wei-feng.webp",text:"霞光尽头浮起一根红色鸢羽。它穿过海雾，指向从未有人活着返回的沉曜大陆。",choices:[["独自追随红鸢",4,2],["留下通音符后再启程",2,3]]},
      {step:"篇章结算",speaker:"卫风",face:"wei-feng.webp",text:"大陆已碎，故人各奔东西。卫风带着江顾残破的身体和一卷镜花，踏上了真正孤身一人的寻玉之路。",end:true}
    ],
    9:[
      {step:"壹 · 雪中醒来",speaker:"卫风",face:"wei-feng.webp",text:"卫风在海面上的雪中醒来，借着倒影看见自己正用江顾残破的身体行动。他小心退出躯壳，把江顾收入墨玉镯。",choices:[["先检查江顾残留的元神",2,4],["立刻赶往战神神殿",4,1]]},
      {step:"贰 · 神殿沉海",speaker:"旁白",face:"wei-feng.webp",text:"战神神殿所在之处只剩一片深海。陆地碎片随水流南下，所有熟悉坐标都从镜花卷上消失。",choices:[["潜入海底寻找神殿残骸",4,1],["沿红鸢羽指引向东",2,3]]},
      {step:"叁 · 镜花残忆",speaker:"江顾",face:"jiang-gu.webp",text:"镜花卷映出江顾留下的片段：他早已预料神殿坠落，也为卫风准备了一条前往沉曜大陆的路线。",choices:[["相信江顾的安排",2,4],["反向追查他隐瞒的危险",4,1]]},
      {step:"肆 · 独行长夜",speaker:"卫风",face:"wei-feng.webp",text:"没有师父提醒，卫风第一次独自布阵、疗伤和辨路。每做成一件事，他都更清楚江顾曾替自己挡住多少麻烦。",choices:[["按江顾教过的方法行事",3,3],["以混沌吞噬沿途障碍",5,0]]},
      {step:"伍 · 红鸢寻玉",speaker:"旁白",face:"wei-feng.webp",text:"红鸢羽落在一块温润白玉上。玉中封着江顾的一缕魂光，却需要卫风交出一段最珍贵的记忆才能唤醒。",choices:[["交出初遇时的记忆",1,3],["用自身元神温养魂光",3,2]]},
      {step:"陆 · 魂光一言",speaker:"江顾",face:"jiang-gu.webp",text:"魂光只来得及说一句：别来。随即重新熄灭。卫风攥碎掌心寒冰，仍把白玉贴在心口。",choices:[["继续前往沉曜大陆",4,3],["停下修复江顾元神",2,4]]},
      {step:"柒 · 海上追杀",speaker:"卫风",face:"wei-feng.webp",text:"八阁余党循混沌气息追来。过去卫风会等江顾出剑，如今他必须独自护住墨玉镯。",choices:[["利用海流布下困阵",4,2],["释放神鸢鲛法相迎战",5,1]]},
      {step:"捌 · 赤雪破浪",speaker:"旁白",face:"wei-feng.webp",text:"赤雪剑穿过最后一道海啸。远方大陆沉在无日的灰色天幕下，红鸢羽终于不再飘动。",choices:[["隐藏混沌气息上岸",3,2],["直接循江顾魂光入城",4,2]]},
      {step:"篇章结算",speaker:"卫风",face:"wei-feng.webp",text:"寻玉万里，所得不过一缕魂光与一句别来。卫风偏要带着这点微光，走进沉曜日寒之地。",end:true}
    ],
    10:[
      {step:"壹 · 藤妖城",speaker:"玉三郎",face:"xuan-zhiyan.webp",text:"藤妖城隐在连绵阴雨与古藤之间。这里曾因续命丹被屠城，如今所有入口都布满辨别恶意的陷阱。",choices:[["以救人来意请求入城",2,3],["找到陷阱空隙悄然潜入",4,0]]},
      {step:"贰 · 混沌不适",speaker:"江顾",face:"jiang-gu.webp",text:"江顾短暂醒来，第一句话却是问卫风哪里不舒服。卫风体内混沌正被藤妖城地下的神阵牵引。",choices:[["如实说明混沌异动",2,4],["隐瞒不适让江顾休息",3,1]]},
      {step:"叁 · 续命藤心",speaker:"旁白",face:"wei-feng.webp",text:"藤心可以续命，却需要一座城百年修为。卫风若强取，江顾或许能立刻醒来，藤妖族却会再度衰亡。",choices:[["拒绝强取，另寻办法",2,4],["用混沌交换部分藤心",4,1]]},
      {step:"肆 · 白伞旧事",speaker:"卫风",face:"wei-feng.webp",text:"神阵显出久远记忆：一团幼小秽气曾靠一柄白伞躲避雷劫，白伞遗失后，它趴在地上哭了很久。",choices:[["接住记忆中的白伞",3,2],["追随白伞主人留下的仙力",4,1]]},
      {step:"伍 · 临明之名",speaker:"旁白",face:"wei-feng.webp",text:"神阵称那团秽气为临明，称白伞主人为曜琰。卫风终于知道，他们的相遇远比朝龙秘境更早。",choices:[["把记忆告诉江顾",2,4],["暂时独自保存这段前世",3,1]]},
      {step:"陆 · 山重水复",speaker:"江顾",face:"jiang-gu.webp",text:"江顾醒来后拒绝借藤心续命。他宁可元神继续碎裂，也不肯让一城为自己付出代价。",choices:[["尊重他的决定并寻找替代品",3,3],["以道侣契强行共享生机",1,4]]},
      {step:"柒 · 藤下神门",speaker:"旁白",face:"jiang-gu.webp",text:"古藤根部藏着通向上界旧战场的神门。门后混沌会修复卫风，也可能彻底唤醒临明记忆。",choices:[["师徒共同进入神门",3,4],["让卫风先行探路",4,1]]},
      {step:"捌 · 曜琰回声",speaker:"江顾",face:"jiang-gu.webp",text:"神门认出江顾血脉，曜琰仙力短暂回归。他抬手便能镇压整片混沌，却仍想不起曾经那柄白伞。",choices:[["用镜花卷帮助他恢复记忆",3,3],["不强求过去，只守住现在",2,4]]},
      {step:"篇章结算",speaker:"旁白",face:"jiang-gu.webp",text:"山重水复处，前世名字终于重现。藤妖城外天光裂开，通往飞升的路与情劫同时摆在两人面前。",end:true}
    ],
    11:[
      {step:"壹 · 道侣契",speaker:"卫风",face:"wei-feng.webp",text:"为共享生机，江顾与卫风结下道侣契。契印落定的瞬间，卫风先是狂喜，继而察觉江顾早已准备好飞升阵。",choices:[["相信江顾不会丢下自己",1,4],["暗中修改道侣契的追踪印",3,1]]},
      {step:"贰 · 长宁神殿",speaker:"旁白",face:"jiang-gu.webp",text:"长宁神殿以仙骨为引打开天门。上界众人只要江顾飞升，不在乎卫风会被混沌雷劫撕碎。",choices:[["破坏飞升阵救出卫风",4,3],["假意配合等待天门开启",3,2]]},
      {step:"叁 · 心口一剑",speaker:"江顾",face:"jiang-gu.webp",text:"江顾一剑刺穿卫风心口，捂住他的眼睛宣称情劫已斩。道侣契却把他真正的恐惧传得一清二楚。",choices:[["顺势假死，配合江顾计划",3,4],["抓住江顾衣袖说还能抢救",1,4]]},
      {step:"肆 · 天门拒渡",speaker:"天门",face:"jiang-gu.webp",text:"江顾飞升成功，天门却说他的情劫没有渡完。回头时，卫风浑身是血，正红着眼睛穿过雷云追来。",choices:[["江顾转身护住卫风",2,4],["命天门立刻关闭",3,0]]},
      {step:"伍 · 反目之局",speaker:"卫风",face:"wei-feng.webp",text:"为了骗过上界，卫风必须扮成恩将仇报、要剔江顾仙骨的凶徒。每一句狠话都沿道侣契割回自己元神。",choices:[["把戏演到底，不泄露计划",4,2],["切断道侣契避免江顾受伤",3,-1]]},
      {step:"陆 · 穷途",speaker:"江顾",face:"jiang-gu.webp",text:"江顾重伤投向上界势力，声称与卫风彻底决裂。无人相信他会拿性命布局，正因此才愿意接纳。",choices:[["继续伪装失去仙骨",4,1],["暗中向卫风传递魂印",2,3]]},
      {step:"柒 · 柳暗花明",speaker:"旁白",face:"wei-feng.webp",text:"看似决裂的两个人沿道侣契同时找到上界神殿的破绽。真正要斩的从来不是情，而是操纵情劫的手。",choices:[["由卫风引开混沌守卫",4,2],["由江顾潜入神殿核心",3,3]]},
      {step:"捌 · 再见天门",speaker:"江顾",face:"jiang-gu.webp",text:"天门再次开启。江顾身后是仙界，卫风身后是奔涌混沌；两边都在等他作出选择。",choices:[["回到卫风身边",1,5],["先入仙界查清曜琰身份",4,0]]},
      {step:"篇章结算",speaker:"旁白",face:"jiang-gu.webp",text:"刀剑相向不过是局，伤口却都是真的。天门之上，曜琰仙君的父母已经等候万年，情劫迎来最后一重。",end:true}
    ],
    12:[
      {step:"壹 · 天门重逢",speaker:"旁白",face:"wei-feng.webp",text:"仙灵逼退混沌，卫风却劈碎屏障，一把将江顾揽回怀里。数百仙人俯首恭迎曜琰，只有天门在旁边装死。",choices:[["江顾先护住卫风的混沌核",2,4],["以曜琰身份喝退众仙",4,1]]},
      {step:"贰 · 曜朔与凌鄞",speaker:"江顾",face:"jiang-gu.webp",text:"战神曜朔与古神后裔凌鄞终于等回独子。江顾没有恢复曜琰记忆，却开口便要求见自己的徒弟与道侣。",choices:[["直言卫风是自己的道侣",1,5],["先询问临明与混沌核旧事",4,1]]},
      {step:"叁 · 仙骨容器",speaker:"旁白",face:"wei-feng.webp",text:"上界以仙骨制造混沌容器，临明正是唯一活下来的秽魔。所谓情劫，不过是天道用来回收失控容器的绳索。",choices:[["公开生死簿揭露旧案",4,2],["先救出被囚禁的秽魔",3,3]]},
      {step:"肆 · 情劫真相",speaker:"江顾",face:"jiang-gu.webp",text:"司命府早知情劫落在临明身上，却故意让曜琰仓促下界。斩断卫风，便等于替上界彻底毁掉混沌证据。",choices:[["追究司命府与天道责任",4,1],["优先解除卫风身上的劫印",2,4]]},
      {step:"伍 · 临明法相",speaker:"卫风",face:"wei-feng.webp",text:"混沌核彻底苏醒，卫风拖着腐烂白骨与血肉化作临明。每靠近江顾一步，天门雷劫便增加一重。",choices:[["以道侣契引导临明神智",2,5],["由曜琰仙力镇住混沌核",4,1]]},
      {step:"陆 · 九重魔障",speaker:"旁白",face:"jiang-gu.webp",text:"九重魔障把江顾最深的欲念逐一化作幻境：统一仙界、父母认可、从未遇见卫风的无情大道。",choices:[["逐一斩碎看似圆满的幻境",4,2],["带卫风共同走出魔障",2,4]]},
      {step:"柒 · 无情道破",speaker:"江顾",face:"jiang-gu.webp",text:"江顾终于承认，无情不是无心。剑道在承认牵挂的瞬间破而后立，曜琰仙骨重新生出金色神纹。",choices:[["以新剑道斩断天道劫印",4,3],["将劫印转入自己元神",2,4]]},
      {step:"捌 · 上界开战",speaker:"旁白",face:"wei-feng.webp",text:"天道降下灭世雷云，曜朔与凌鄞率旧部挡在两人身前。临明第一次不是被封印的怪物，而是站在众仙之间的同伴。",choices:[["卫风吞噬雷云核心",5,2],["江顾引雷劫进入神门",4,3]]},
      {step:"玖 · 神门",speaker:"江顾",face:"jiang-gu.webp",text:"无尽天神门只容一人进入。门后是混沌源头，也可能是让所有容器重获自由的唯一机会。",choices:[["江顾独自入门并留下后手",4,3],["坚持与卫风共同入门",2,5]]},
      {step:"篇章结算",speaker:"旁白",face:"jiang-gu.webp",text:"曜琰踏入神门，临明留在门外守住众仙。情劫已经斩断，真正难渡的却是门内无边混沌。",end:true}
    ],
    13:[
      {step:"壹 · 仙池苏醒",speaker:"临风",face:"jiang-xiangyun.webp",text:"众仙从仙池醒来，才知曜琰早已布置好疗伤法宝，也提前命临风与平明散尽仙元避开混沌。",choices:[["立即组织人手重开神门",4,1],["先救治被混沌所伤之人",2,3]]},
      {step:"贰 · 神门消散",speaker:"卫风",face:"wei-feng.webp",text:"无尽天神门已经消失。卫风守在原地，不吃不睡，以白瞳寻找连仙人都看不见的混沌裂隙。",choices:[["沿道侣契寻找江顾",2,5],["吞噬残余混沌追踪源头",5,1]]},
      {step:"叁 · 弥华境",speaker:"旁白",face:"wei-feng.webp",text:"裂隙通向弥华境，那里没有时间，只有无数被混沌吞没的世界倒影。卫风在每一面镜中都看见江顾死去。",choices:[["认出真正江顾留下的剑痕",4,3],["将所有镜像一同带走",2,4]]},
      {step:"肆 · 七杀树",speaker:"鸿宸",face:"jiang-gu.webp",text:"七杀树记录着临明诞生以前的因果。鸿宸抱着婴孩站在花海中，以自身消散换来一次时光倒流。",choices:[["接住婴孩落下的眼泪",2,4],["阻止秽气触碰那滴眼泪",4,2]]},
      {step:"伍 · 时光逆流",speaker:"旁白",face:"wei-feng.webp",text:"枯枝重新开花，死者沿时间长河复生。卫风看见自己与江顾所有往事倒退，像镜中花、如水中月。",choices:[["保留两人的共同记忆",2,5],["放弃记忆换取江顾归来",4,2]]},
      {step:"陆 · 山海相逢",speaker:"江顾",face:"jiang-gu.webp",text:"花瓣散尽之后，江顾从混沌中伸出手。他不记得神门内过了多久，却仍准确叫出了卫风的名字。",choices:[["先抱住他，再问伤势",1,5],["检查元神确认不是幻境",4,2]]},
      {step:"柒 · 众生归位",speaker:"旁白",face:"jiang-gu.webp",text:"被神门吞没的元神随时光回归，破碎世界重新连接。天道失去混沌容器，也失去操纵情劫的权柄。",choices:[["重建容器受害者的仙籍",3,3],["封闭所有制造容器的神殿",4,2]]},
      {step:"捌 · 临明自由",speaker:"卫风",face:"wei-feng.webp",text:"混沌核不再是枷锁。卫风可以保留神鸢鲛法相，也能以临明身份自由来去三界，不必再躲避雷劫。",choices:[["保留所有身份与记忆",3,4],["只以卫风之名活下去",2,4]]},
      {step:"玖 · 归途",speaker:"江顾",face:"jiang-gu.webp",text:"上界百废待兴，江顾却提出先回修真界。卫风立刻明白，他想回清平峰看看。",choices:[["携手返回阳华宗",1,5],["先去向所有故人报平安",2,4]]},
      {step:"篇章结算",speaker:"旁白",face:"wei-feng.webp",text:"山海迢迢，故人自会重逢。跨过神门与万年之后，两个人终于能选择一条不由天道写定的归路。",end:true}
    ],
    14:[
      {step:"壹 · 清平峰钥匙",speaker:"曲丰羽",face:"qu-fengyu.webp",text:"阳华与雀鸢已经合宗。曲丰羽把清平峰钥匙交给江顾，提起卫风离开前曾亲手修缮所有宫殿。",choices:[["向曲丰羽郑重道谢",2,3],["问玄之衍为何避而不见",3,1]]},
      {step:"贰 · 故人回避",speaker:"玄之衍",face:"xuan-zhiyan.webp",text:"玄之衍得知江顾回来，带着弟子连夜躲进秘境。临走仍认真嘱咐曲丰羽，绝不能让江顾知道。",choices:[["尊重玄之衍暂不相见",2,3],["留下书信向旧友致歉",3,2]]},
      {step:"叁 · 重修旧屋",speaker:"卫风",face:"wei-feng.webp",text:"清平峰阵法仍认卫风为主。他一边修屋顶一边抱怨江顾当年罚自己扫花，嘴角却始终没有落下。",choices:[["与卫风一起修缮庭院",1,5],["恢复江顾留下的旧阵法",3,3]]},
      {step:"肆 · 三年登峰",speaker:"旁白",face:"wei-feng.webp",text:"为疗伤与稳固境界，卫风重新从山脚修行。等他能一步步爬上清平峰顶，修真界已经过去三年。",choices:[["坚持完成每一层试炼",4,3],["用混沌抄近路再补修行",3,2]]},
      {step:"伍 · 来年种花",speaker:"卫风",face:"wei-feng.webp",text:"修真界留给他们的时间只剩两年。江顾问还有什么想做，卫风想了很久，只说来年春天种些花吧。",choices:[["在庭前种满落花树",1,5],["把旧日花种分给宗门弟子",2,4]]},
      {step:"陆 · 飞升雷劫",speaker:"旁白",face:"jiang-gu.webp",text:"卫风飞升之日，近千道雷劫照亮夜空。江顾独自护法，将所有失控混沌挡在修真界之外。",choices:[["卫风专心渡劫，相信江顾",3,5],["分出鬼纹替江顾挡雷",4,3]]},
      {step:"柒 · 临明仙君",speaker:"卫风",face:"wei-feng.webp",text:"天门为卫风赐号临明。昔日人人喊打的秽魔踏入仙界，曜琰站在门后，手中恰好留着一颗糖。",choices:[["把糖让给曜琰",1,5],["一人一半，共尝旧味",2,5]]},
      {step:"捌 · 扫落花",speaker:"江顾",face:"jiang-gu.webp",text:"仙宫庭前落花满阶。卫风拿着竹帚问该扫向哪里，江顾看了他一眼，只让他把花留在树下。",choices:[["将花拢在两人脚边",1,5],["留一片夹进镜花卷",2,4]]},
      {step:"玖 · 总是在一起",speaker:"旁白",face:"wei-feng.webp",text:"许多年后，下界孩童仍会听说临明仙君与曜琰仙君的故事。大人说，那两位仙君总是在一起。",choices:[["接受这段传说",1,4],["再添一句：他们偶尔也会吵架",1,4]]},
      {step:"篇章结算",speaker:"旁白",face:"jiang-gu.webp",text:"正文至此落卷。天门、情劫与山海都已过去，只剩仙宫庭前一地花，以及两个终于不必再分离的人。",end:true}
    ],
    15:[
      {step:"壹 · 仙宫晨乱",speaker:"卫风",face:"wei-feng.webp",text:"临明仙君醒来时，三只来历不明的小秽物正在仙宫拆阵法。曜琰坐在一旁看书，显然没有出手阻止的意思。",choices:[["先把孩子们从阵眼抱下来",1,4],["让它们把拆坏的阵法重新拼好",3,2]]},
      {step:"贰 · 如何养崽",speaker:"江顾",face:"jiang-gu.webp",text:"卫风列出十几页养崽规矩，江顾只看了一眼：不死即可。两位仙君的教育理念从第一天便南辕北辙。",choices:[["采用卫风的细致计划",1,4],["保留江顾的实战训练",3,2]]},
      {step:"叁 · 第一堂课",speaker:"旁白",face:"wei-feng.webp",text:"江顾教孩子们辨认杀阵，卫风在旁边悄悄把致命阵纹换成会喷花瓣的版本。孩子们炸得满头落花。",choices:[["承认是卫风改了阵",1,3],["假装这也是课程一部分",2,3]]},
      {step:"肆 · 秽魔来客",speaker:"卫风",face:"wei-feng.webp",text:"旧日被封印的秽魔陆续来访。它们不懂仙界礼数，却都记得临明曾替它们挡住神殿雷劫。",choices:[["开放仙宫作为秽魔歇脚处",2,4],["为它们在无尽天另建居所",4,2]]},
      {step:"伍 · 大典请柬",speaker:"江顾",face:"jiang-gu.webp",text:"仙界决定为曜琰与临明补办道侣大典。卫风兴奋地准备金红礼服，江顾只关心大典会耽误几日修行。",choices:[["按卫风心意大办一场",1,5],["只邀亲友在清平峰小聚",2,4]]},
      {step:"陆 · 故人赴宴",speaker:"曲丰羽",face:"qu-fengyu.webp",text:"玄之衍、曲丰羽、江林、江向云与陆离雨陆续登上仙宫。多年恩怨在同一张席面上变成了互相揭短。",choices:[["让故人自由叙旧",1,4],["安排一场不许动手的酒令",2,3]]},
      {step:"柒 · 一颗糖",speaker:"旁白",face:"jiang-gu.webp",text:"小秽物只带来一颗糖，临明把糖让给曜琰。江顾面无表情收下，转身却把糖分成了两半。",choices:[["一人一半",1,5],["把另一半留给孩子们",1,4]]},
      {step:"篇章结算",speaker:"卫风",face:"wei-feng.webp",text:"仙宫有了孩子、访客和永远修不完的阵法。卫风觉得吵闹得正好，江顾也始终没有把任何人赶走。",end:true}
    ],
    16:[
      {step:"壹 · 石头山",speaker:"卫风",face:"wei-feng.webp",text:"两人重回石头山，旧日洞府只剩半面石壁。卫风仍能指出当年躲懒睡觉的位置，江顾则记得他每次被罚的缘由。",choices:[["按旧样重建洞府",1,4],["保留废墟作为纪念",2,3]]},
      {step:"贰 · 旧剑痕",speaker:"江顾",face:"jiang-gu.webp",text:"石壁上留着江顾教第一式剑法时的痕迹。卫风如今随手便能使得更好，却故意把最后一招练错。",choices:[["江顾再次握着他的手纠正",1,5],["让卫风自己重演旧招",3,2]]},
      {step:"叁 · 钟情",speaker:"卫风",face:"wei-feng.webp",text:"卫风问江顾究竟从何时开始钟情。江顾沉默许久，从朝龙秘境一路回想，却找不到一个明确的瞬间。",choices:[["承认感情是在日常中累积",1,5],["把答案推给迟来的情劫",2,3]]},
      {step:"肆 · 云雨旧梦",speaker:"旁白",face:"jiang-gu.webp",text:"镜花卷映出曾被两人刻意略过的亲密记忆。过去充满试探和不安，如今终于可以不借幻境说真话。",choices:[["保留镜花中的全部记忆",1,5],["合上画卷只看眼前之人",2,4]]},
      {step:"伍 · 坦白所惧",speaker:"江顾",face:"jiang-gu.webp",text:"江顾第一次说出自己曾害怕卫风死在神门之外。那恐惧没有令剑道变弱，反而使他真正理解守护为何物。",choices:[["卫风安静听完",1,5],["以道侣契回应同样的恐惧",2,5]]},
      {step:"陆 · 再扫落花",speaker:"卫风",face:"wei-feng.webp",text:"石头山没有落花树，卫风便从仙宫移来一株。第一阵风吹过时，两人不约而同伸手去接同一片花。",choices:[["把花交给江顾",1,4],["夹入两人的旧剑谱",2,4]]},
      {step:"柒 · 山中一夜",speaker:"旁白",face:"wei-feng.webp",text:"没有仙务、雷劫与追兵，石洞外只剩风声。卫风终于确认，安稳并不意味着故事结束。",choices:[["约定每年回来一次",1,4],["把石头山留给后来修士",2,3]]},
      {step:"篇章结算",speaker:"江顾",face:"jiang-gu.webp",text:"钟情没有确切起点，也不需要一个惊天动地的证明。它只是漫长岁月里，两个人始终选择回到彼此身边。",end:true}
    ],
    17:[
      {step:"壹 · 上界日常",speaker:"江林",face:"jiang-lin.webp",text:"江林飞升后第一件事便是要求涨俸禄。曜琰仙宫旧部终于体会到，九尾狐混血的账本比战神剑阵更难应付。",choices:[["按功绩补齐江林俸禄",2,3],["让他负责仙宫全部账目",3,2]]},
      {step:"贰 · 新仙规",speaker:"卫风",face:"wei-feng.webp",text:"临明提出废除以出身区分仙、魔与秽的旧仙规。反对者挤满天门，江顾只问谁愿意先与自己论剑。",choices:[["以公开议事修改仙规",3,3],["先建立各族共同试炼",4,2]]},
      {step:"叁 · IF · 未曾下界",speaker:"旁白",face:"jiang-gu.webp",text:"镜花卷展开另一条命数：曜琰没有仓促踹开天门，临明也没有成为阳华宗的卫风。两人本该永不相识。",choices:[["继续观看这条命数",2,2],["相信因果仍会让他们相遇",1,4]]},
      {step:"肆 · IF · 仙门初见",speaker:"卫风",face:"wei-feng.webp",text:"另一条命数里，散修卫风在仙门大会偷走曜琰的令牌，被金衣仙君当场按在天门石阶上。",choices:[["归还令牌并拜师",1,4],["拿令牌换一个同行机会",3,2]]},
      {step:"伍 · IF · 同行修仙",speaker:"江顾",face:"jiang-gu.webp",text:"没有情劫命令，他们仍一起进入秘境、争夺神物、在生死之间把后背交给对方。",choices:[["让卫风选择自己的道",2,4],["曜琰亲自教他剑术",3,3]]},
      {step:"陆 · IF · 再次钟情",speaker:"旁白",face:"wei-feng.webp",text:"身份、时间与相遇方式全都改变，卫风还是会追着那个冷淡仙君说个不停，曜琰也还是会在危险来临时先护住他。",choices:[["接受万千世界皆会重逢",1,5],["让这条命数自由延续",2,4]]},
      {step:"柒 · 合卷",speaker:"江顾",face:"jiang-gu.webp",text:"江顾合上镜花卷。卫风问若重来一次是否还会收他为徒，江顾回答：会先教你用止血符。",choices:[["卫风表示自己现在也会了",1,4],["故意问止血符口诀是什么",0,5]]},
      {step:"篇章结算",speaker:"旁白",face:"jiang-gu.webp",text:"镜花卷至此全部合拢。无论哪一条命数、哪一个世界，临明仙君与曜琰仙君总会在一起。",end:true}
    ]
  };
  const episodeEndings={
    1:["阳华云海","卫风的修行才刚刚开始。清平峰多了一个总想偷懒的徒弟，也多了一盏每日卯时都会亮起的灯。","第一卷 · 阳华云海篇完成","“三年结丹。”<br><small>“师父，咱们凡事好商量……”</small>"],
    2:["年少春衫","白瞳与鬼纹已无法继续隐藏。旧友之间生出裂隙，师徒之间却有了更深、也更危险的牵系。","第二卷 · 年少春衫篇完成","“师父就只能是师父。”<br><small>可他只想要自己的师父。</small>"],
    3:["松绥幻境","镜中所见皆是心中执念。有人挥剑斩断，有人宁愿带着它走出幻境。","第二卷 · 松绥幻境篇完成","镜花虽碎，照见之心不会复原。"],
    4:["风月无心","风月秘境照见元神最深处的声音。无情道没有给出答案，江顾却已经无法再把卫风只当作一场劫。","第三卷 · 风月无心篇完成","风月本无心，入境之人却有。"],
    5:["阴阳白骨","新元丹在卫风体内转动，金色神力与黑色鬼纹暂时达成平衡。江顾付出的代价仍无人知晓。","第三卷 · 阴阳白骨篇完成","“喊声师父便给你，如何？”"],
    6:["试炼之境","卫风吞下整座试炼之境，曜琰之名随古神殿苏醒。师徒的命数开始指向更高的世界。","第三卷 · 试炼之境篇完成","试炼已碎，真正的劫才刚刚开始。"],
    7:["烟雨八阁","八阁秩序随古神殿一同崩塌。曜琰残影与混沌核将师徒二人的来处指向同一场上界旧劫。","第四卷 · 烟雨八阁篇完成","镜中观花，所见未必虚妄。"],
    8:["生死无咎","大陆碎入海中，故人各奔前程。卫风第一次真正孤身上路，却仍带着江顾留下的全部因果。","第四卷 · 生死无咎篇完成","世间因果，从来无人无咎。"],
    9:["红鸢寻玉","寻玉万里只换来一缕魂光。卫风却已经学会独自走过江顾曾替他挡住的所有风雪。","第五卷 · 红鸢寻玉篇完成","他说别来。卫风偏要去。"],
    10:["山重水复","临明与曜琰的名字从前世神阵中苏醒。原来朝龙秘境并不是因果的开始，只是一次重逢。","第五卷 · 山重水复篇完成","山重水复，故人仍在。"],
    11:["柳暗花明","道侣契是真的，刀剑与决裂也是。两个人用最痛的骗局，终于骗开了操纵情劫的天门。","第五卷 · 柳暗花明篇完成","柳暗之后，天门重开。"],
    12:["情劫难渡","曜琰归位，临明挣脱容器之命。所谓难渡，从来不是情本身，而是承认自己愿意为谁留下。","第六卷 · 情劫难渡篇完成","无情道破，情劫亦破。"],
    13:["山海自逢","镜花散尽，时光回流。山海未曾缩短，但两个记得彼此的人终会重新相逢。","第六卷 · 山海自逢篇完成","山海有尽，自会相逢。"],
    14:["大结局","清平峰花开又落，临明踏过天门。万千因果最终只化作一句：他们总是在一起。","第六卷 · 正文完","愿随夫子天坛上，闲与仙人扫落花。"],
    15:["养崽与日常","仙宫从此多了孩子、故人和永远修不完的阵法。浩劫之后的吵闹寻常，正是所有人争来的圆满。","番外 · 养崽与日常完成","一颗糖，也要一人一半。"],
    16:["石头山与钟情","钟情没有确切起点。漫长岁月里一次次回头、守护和重逢，早已是全部答案。","番外 · 石头山与钟情完成","山中无事，正好扫花。"],
    17:["上界与修仙 IF","镜花卷展示了另一条命数。即使没有既定情劫，改变身份与相遇，他们依旧会认出彼此。","番外 · 全篇完成","万千世界，故人总会相逢。"]
  };
  let activeEpisode=episodeSets[1],activeChapter=1;
  let qiTimer=null, qiPos=0, qiDir=1;
  let challengeRound=0,challengeData=null;
  const portraitOwners={"江顾":"jiang-gu.webp","卫风":"wei-feng.webp","江林":"jiang-lin.webp","玄之衍":"xuan-zhiyan.webp","曲丰羽":"qu-fengyu.webp","江向云":"jiang-xiangyun.webp","陆离雨":"lu-liyu.webp"};
  const challengeAt={7:7,9:6,12:5,15:2};
  const challenges={
    7:{kicker:"第四卷 · 八阁破阵",title:"三息寻阵",intro:"观察阵纹相克关系，连续找出三处生门。答错可以重新判断，不会中断剧情。",rounds:[
      ["火纹封住正门，哪一道灵力可以压制它？",["水灵","金灵","风灵"],0],
      ["水镜制造了两道假门，白瞳看见哪一处没有倒影？",["左门","中门","右门"],2],
      ["阵眼开始逆转，最后应切断哪一条供灵线？",["最亮的金线","震动的暗线","静止的白线"],1]]},
    9:{kicker:"第五卷 · 红鸢寻玉",title:"追羽渡海",intro:"根据红鸢羽与海风的方向选择落点，连续追上三次魂光。",rounds:[
      ["红鸢羽向东偏折，西侧海啸正在升高。",["迎浪向西","顺羽向东","原地等待"],1],
      ["魂光落入三片碎陆，只有一处映出金色剑痕。",["青色藤岛","金纹石台","黑雾礁石"],1],
      ["最后一根鸢羽被混沌风暴卷起。",["以白瞳锁定","释放全部鬼纹","放弃追踪"],0]]},
    12:{kicker:"第六卷 · 九重魔障",title:"辨认真心",intro:"魔障会伪造最圆满的选择。找出真正属于江顾与卫风的记忆。",rounds:[
      ["哪一段记忆没有被魔障篡改？",["曜琰从未下界","清平峰卯时练剑","卫风独自飞升"],1],
      ["幻境许诺江顾一条毫无牵挂的无情大道。",["接受圆满大道","带卫风走出幻境","抹去所有记忆"],1],
      ["混沌中传来三个声音，谁在叫江顾？",["恭迎仙君","师父，回头","斩断情劫"],1]]},
    15:{kicker:"番外 · 仙宫晨课",title:"花阵归位",intro:"小秽物拆散了庭前花阵。按照花瓣颜色，把三枚阵心依次放回正确位置。",rounds:[
      ["红色花瓣带着卫风的火灵，应归入哪里？",["剑下","灯前","水池"],0],
      ["金色花瓣存着曜琰神力，应放在哪处温养？",["混沌缝隙","仙灯前","山门外"],1],
      ["白色落花没有灵力，只留着共同记忆。",["焚毁","交给天门","归于树下"],2]]}
  };
  function persist(){localStorage.setItem(KEY,JSON.stringify(cs))}
  function show(id){$$('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');$('#topbar').classList.remove('hidden')}
  function scene(s){$('#app').dataset.scene=s}
  function campaign(volume=cs.volume){cs.volume=volume;show('#campaignScreen');scene(volume===1?'sect':volume>=6?'upper':'gate');$('#chapterName').textContent='镜花命簿 · 篇章选择';renderTabs();renderChapters();persist()}
  function renderTabs(){const box=$('#volumeTabs');box.innerHTML='';Object.entries(volumeNames).forEach(([v,n])=>{const b=document.createElement('button');b.textContent=n;b.className=+v===cs.volume?'active':'';b.onclick=()=>campaign(+v);box.appendChild(b)})}
  function renderChapters(){const box=$('#chapterGrid');box.innerHTML='';chapters.forEach((c,i)=>{if(c[0]!==cs.volume)return;const completed=cs.completed.includes(i),available=completed||episodeSets[i]&&cs.completed.includes(i-1);const b=document.createElement('button');b.className='chapter-card'+(completed?' completed':'');b.disabled=!available;b.innerHTML=`<small>${volumeNames[c[0]]}</small><h3>${c[1]}</h3><p>${c[3]}</p><em>第 ${c[2]} 章</em>`;if(available&&episodeSets[i])b.onclick=()=>startEpisode(i);box.appendChild(b)});$('#campaignProgress').textContent=`已历 ${cs.completed.length} / ${chapters.length} 篇`}
  function startEpisode(index=1){activeChapter=index;activeEpisode=episodeSets[index];cs.episode=index;cs.node=0;cs.training=0;show('#episodeScreen');scene(index===1?'sect':'gate');$('#chapterName').textContent=`${volumeNames[chapters[index][0]]} · ${chapters[index][1]}`;$('#episodeVolume').textContent=volumeNames[chapters[index][0]];$('#episodeTitle').textContent=chapters[index][1];$('#episodeRange').textContent=`原著第 ${chapters[index][2]} 章`;renderEpisode();persist()}
  function renderEpisode(){
    const n=activeEpisode[cs.node];
    if(!n){completeEpisode();return}
    if(n.training){startTraining();return}
    if(challengeAt[activeChapter]===cs.node){startChallenge(activeChapter);return}
    show('#episodeScreen');scene(activeChapter===1?(cs.node>=6?'gate':'sect'):(cs.node>=4?'gate':'sect'));
    $('#episodeStep').textContent=n.step;$('#episodeSpeaker').textContent=n.speaker;$('#episodeText').textContent=n.text;
    const validFace=n.speaker==='旁白'?n.face:portraitOwners[n.speaker];
    $('#episodeScreen').classList.toggle('no-portrait',!validFace);$('#episodePortrait').classList.toggle('hidden',!validFace);
    if(validFace){$('#episodePortrait img').src=`assets/${validFace}`;$('#episodePortrait img').alt=n.speaker==='旁白'?'剧情场景人物':n.speaker}
    $('#episodeChoices').innerHTML='';$('#episodeNext').classList.toggle('hidden',!!n.choices);
    if(n.unlock)unlockMain(n.unlock);
    if(n.choices)n.choices.forEach(c=>{const b=document.createElement('button');b.textContent=c[0];b.onclick=()=>{cs.cultivation+=c[1];cs.rapport+=c[2];cs.node++;persist();renderEpisode()};$('#episodeChoices').appendChild(b)});
    $('#episodeNext').onclick=()=>{if(n.end){completeEpisode()}else{cs.node++;persist();renderEpisode()}};updateBars()
  }
  function startChallenge(type){challengeData=challenges[type];challengeRound=0;show('#challengeScreen');scene(type===9?'underwater':type===12?'upper':'sect');$('#chapterName').textContent=challengeData.kicker;$('#challengeKicker').textContent=challengeData.kicker;$('#challengeTitle').textContent=challengeData.title;$('#challengeIntro').textContent=`${activeEpisode[cs.node].text} ${challengeData.intro}`;renderChallengeRound()}
  function renderChallengeRound(){const round=challengeData.rounds[challengeRound];$('#challengePrompt').textContent=round[0];$('#challengeOptions').innerHTML='';$('#challengeCount').textContent=`${challengeRound} / ${challengeData.rounds.length}`;$('#challengeProgress').style.width=`${challengeRound/challengeData.rounds.length*100}%`;$('#challengeFeedback').textContent='观察提示后作出选择';round[1].forEach((label,index)=>{const b=document.createElement('button');b.textContent=label;b.onclick=()=>answerChallenge(index,b);$('#challengeOptions').appendChild(b)})}
  function answerChallenge(index,button){const correct=challengeData.rounds[challengeRound][2];if(index!==correct){button.classList.add('wrong');button.disabled=true;$('#challengeFeedback').textContent='这条路被阵法封住了，再观察一次其他线索。';return}button.classList.add('correct');$$('#challengeOptions button').forEach(b=>b.disabled=true);challengeRound++;$('#challengeCount').textContent=`${challengeRound} / ${challengeData.rounds.length}`;$('#challengeProgress').style.width=`${challengeRound/challengeData.rounds.length*100}%`;$('#challengeFeedback').textContent=challengeRound===challengeData.rounds.length?'挑战完成，命簿已记下这次选择。':'正确，下一重正在显现……';setTimeout(()=>{if(challengeRound>=challengeData.rounds.length){cs.cultivation+=3;cs.rapport+=2;cs.node++;persist();renderEpisode()}else renderChallengeRound()},500)}
  function updateBars(){$('#cultivationBar').style.width=Math.min(100,cs.cultivation*4)+'%';$('#rapportBar').style.width=Math.min(100,cs.rapport*4)+'%';$('#cultivationText').textContent=cs.cultivation>=20?'筑基':'炼气';$('#rapportText').textContent=cs.rapport>=24?'信任':'初识'}
  function unlockMain(name){try{const k='jinghuajie-save-v1',s=JSON.parse(localStorage.getItem(k));if(s){s.unlocked=[...new Set([...(s.unlocked||[]),name])];localStorage.setItem(k,JSON.stringify(s))}}catch{}}
  function startTraining(){show('#trainingScreen');scene('sect');$('#chapterName').textContent='阳华云海 · 清平晨课';cs.training=0;$('#trainScore').textContent='○ ○ ○';$('#trainingHint').textContent='灵息靠近金色区域时点击“运气”';qiPos=0;qiDir=1;clearInterval(qiTimer);qiTimer=setInterval(()=>{qiPos+=qiDir*1.45;if(qiPos>=98||qiPos<=0)qiDir*=-1;$('#qiMarker').style.left=qiPos+'%'},16)}
  function train(){const good=qiPos>=36&&qiPos<=66;cs.training++;cs.cultivation+=good?2:1;$('#trainingHint').textContent=good?'周天圆满，额外获得一重修行。':'灵息稍有偏移，但江顾替你护住了经脉。';$('#trainScore').textContent=Array.from({length:3},(_,i)=>i<cs.training?'●':'○').join(' ');qiPos=0;if(cs.training>=3){clearInterval(qiTimer);qiTimer=null;cs.node++;setTimeout(()=>{persist();renderEpisode()},700)}}
  function completeEpisode(){if(!cs.completed.includes(activeChapter))cs.completed.push(activeChapter);const ending=episodeEndings[activeChapter];persist();show('#endingScreen');scene('sect');$('#endingTitle').textContent=ending[0];$('#endingText').textContent=ending[1];$('#endingStats').innerHTML=`<div><b>${cs.cultivation}</b><span>修行</span></div><div><b>${cs.rapport}</b><span>默契</span></div><div><b>${cs.training}</b><span>周天</span></div><div><b>${cs.cultivation>=20?'筑基':'炼气'}</b><span>境界</span></div>`;$('.ending-kicker').textContent=ending[2];$('.ending-quote').innerHTML=ending[3];const primary=$('.ending-actions .primary');primary.textContent='返回命簿';primary.dataset.action='campaign'}
  document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.action==='campaign'){e.stopImmediatePropagation();campaign()}if(b.id==='trainButton')train()},{capture:true});
})();
