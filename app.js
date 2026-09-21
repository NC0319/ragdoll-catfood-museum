/**
 * 布偶猫猫粮展览馆 · 交互逻辑 v2
 * 基于技术文档重新设计 · 20款猫粮 · 5层展架 · 伪3D视觉
 */

(function () {
  'use strict';

  // ═══ 阶段定义 ═══
  const STAGE_META = {
    kitten:   { name: '幼猫期',   color: '#e9c46a', icon: '🐱', desc: '4-12月龄 · 高蛋白高脂肪' },
    adult:    { name: '成猫期',   color: '#7fae7a', icon: '🐈', desc: '1-7岁 · 营养均衡维持' },
    special:  { name: '功能型',   color: '#6f9bc9', icon: '💊', desc: '泌尿/控重/化毛处方' },
    senior:   { name: '老年期',   color: '#c98b5b', icon: '🐾', desc: '7岁+ · 易消化低负担' },
    raw:      { name: '冻干高肉', color: '#d4756b', icon: '🥩', desc: '风干/冻干 · 高含肉量' },
    domestic: { name: '国货精选', color: '#5bb0a8', icon: '⭐', desc: '国产优质品牌' }
  };

  // ═══ 20款猫粮数据 ═══
  const FOODS = [
    // 幼猫期 4款
    { id:1, name:'皇家 幼猫粮 K36', en:'Royal Canin K36', brand:'皇家 Royal Canin', origin:'法国', stage:'幼猫期 4-12月', stageKey:'kitten', protein:'34%', fat:'20%', body:'#f5ead0', accent:'#c4915c', fit:'4-12月龄幼猫，需高能量高蛋白支持生长发育', pros:['品牌历史悠久品控稳定','K36专为幼猫设计','适口性优秀','添加益生元支持消化'], cons:['含谷物成分','蛋白质34%偏低','价格中等偏上'] },
    { id:2, name:'渴望 幼猫无谷', en:'Orijen Kitten', brand:'渴望 Orijen', origin:'加拿大', stage:'幼猫期 / 全阶段', stageKey:'kitten', protein:'40%', fat:'20%', body:'#f5ead0', accent:'#5b8c5a', fit:'追求顶级营养的幼猫家庭，预算充足', pros:['蛋白质40%极高','全阶段可用','无谷物无人工添加','适口性好'], cons:['价格昂贵','高脂肪可能软便','假货多需注意渠道'] },
    { id:3, name:'诚实一口 P40 幼猫粮', en:'Honest Bite P40', brand:'诚实一口', origin:'中国', stage:'幼猫期', stageKey:'kitten', protein:'40%', fat:'20%', body:'#f5ead0', accent:'#e07856', fit:'注重高蛋白的幼猫，预算有限的国货支持者', pros:['国产高蛋白40%','双层颗粒适口性好','添加鱼油美毛','性价比高'], cons:['品牌较新长期数据少','渠道有限','批次波动'] },
    { id:4, name:'卫仕 幼猫粮', en:'WOWO Kitten', brand:'卫仕 WOWO', origin:'中国', stage:'幼猫期', stageKey:'kitten', protein:'38%', fat:'18%', body:'#f5ead0', accent:'#8b6d4a', fit:'需要均衡营养的幼猫，注重肠胃调理', pros:['38%蛋白适中均衡','添加益生菌护肠','国产品控稳定','适口性好'], cons:['含谷物','蛋白质不够高','品牌知名度一般'] },

    // 成猫期 4款
    { id:5, name:'渴望 六种鱼', en:'Orijen Six Fish', brand:'渴望 Orijen', origin:'加拿大', stage:'成猫期', stageKey:'adult', protein:'40%', fat:'20%', body:'#f5ead0', accent:'#4a7a9c', fit:'追求顶级营养的成猫，美毛需求强烈', pros:['六种深海鱼Omega-3极高','蛋白质40%+','无谷物','美毛效果顶级'], cons:['价格昂贵','高脂可能软便','假货多'] },
    { id:6, name:'爱肯拿 海洋盛宴', en:'Acana Sea', brand:'爱肯拿 Acana', origin:'加拿大', stage:'成猫期', stageKey:'adult', protein:'37%', fat:'18%', body:'#f5ead0', accent:'#3a6b8a', fit:'追求高品质但预算略低于渴望的成猫', pros:['性价比高(对比渴望)','多鱼源营养均衡','无谷物低敏','适口性好'], cons:['蛋白质略低于渴望','多肉源敏感猫注意','颗粒偏小'] },
    { id:7, name:'冠能 成猫粮', en:'Pro Plan Adult', brand:'冠能 Pro Plan', origin:'美国', stage:'成猫期', stageKey:'adult', protein:'36%', fat:'16%', body:'#f5ead0', accent:'#6b8e5a', fit:'需要稳定均衡营养的成猫，注重消化健康', pros:['品牌大厂品控稳','添加益生元益生菌','适口性稳定','价格亲民'], cons:['含谷物玉米','蛋白质36%中等','原料透明度一般'] },
    { id:8, name:'网易严选 全价成猫粮', en:'Yanxuan Adult', brand:'网易严选', origin:'中国', stage:'成猫期', stageKey:'adult', protein:'38%', fat:'18%', body:'#f5ead0', accent:'#5a7a6b', fit:'追求性价比的国货用户，成猫日常喂养', pros:['38%蛋白性价比高','无谷物配方','供应链透明','适口性好'], cons:['品牌跨界经验少','部分猫不吃','渠道单一'] },

    // 功能型 4款
    { id:9, name:'希尔思 c/d 泌尿处方粮', en:"Hill's c/d", brand:'希尔思 Hill\'s', origin:'美国', stage:'功能 · 泌尿', stageKey:'special', protein:'32%', fat:'15%', body:'#f5ead0', accent:'#4a6f9c', fit:'有泌尿系统问题的猫咪，需处方管理', pros:['泌尿处方权威','有效预防结石复发','兽医推荐度高','品控严格'], cons:['需兽医处方','蛋白质32%偏低','价格高','适口性一般'] },
    { id:10, name:'皇家 泌尿 S/O', en:'Royal Canin S/O', brand:'皇家 Royal Canin', origin:'法国', stage:'功能 · 泌尿', stageKey:'special', protein:'34%', fat:'15%', body:'#f5ead0', accent:'#5a8aaa', fit:'有尿路结石风险的猫咪，溶解鸟粪石', pros:['溶解鸟粪石结石','皇家处方线权威','适口性好','渠道广泛'], cons:['需遵医嘱使用','蛋白质34%偏低','长期使用需监测'] },
    { id:11, name:'冠能 绝育猫体重管理', en:'Pro Plan Sterilized', brand:'冠能 Pro Plan', origin:'美国', stage:'功能 · 控重', stageKey:'special', protein:'34%', fat:'12%', body:'#f5ead0', accent:'#7a8a4a', fit:'已绝育、需控制体重的成猫', pros:['低脂12%控重友好','高纤维增加饱腹感','添加L-肉碱','价格亲民'], cons:['蛋白质34%偏低','适口性一般','含谷物'] },
    { id:12, name:'皇家 长毛猫化毛粮', en:'Royal Canin Hairball', brand:'皇家 Royal Canin', origin:'法国', stage:'功能 · 化毛', stageKey:'special', protein:'33%', fat:'14%', body:'#f5ead0', accent:'#9c7b5a', fit:'长毛猫（尤其布偶猫）有毛球问题', pros:['专为长毛猫设计','添加甜菜浆促排毛球','适口性好','渠道广泛'], cons:['蛋白质33%偏低','含谷物','价格中等'] },

    // 老年期 2款 + 冻干 2款
    { id:13, name:'希尔思 老年猫粮', en:"Hill's Senior 7+", brand:"希尔思 Hill's", origin:'美国', stage:'老年期 7+', stageKey:'senior', protein:'30%', fat:'14%', body:'#f5ead0', accent:'#b8784a', fit:'7岁以上老年猫，需易消化低负担', pros:['专为老年猫设计','易消化配方','添加关节保护成分','品控严格'], cons:['蛋白质30%偏低','适口性一般','价格较高'] },
    { id:14, name:'渴望 老年猫粮', en:'Orijen Senior', brand:'渴望 Orijen', origin:'加拿大', stage:'老年期 7+', stageKey:'senior', protein:'38%', fat:'15%', body:'#f5ead0', accent:'#a8734a', fit:'7岁以上老年猫，追求高蛋白低脂', pros:['蛋白质38%远超同类','低脂15%控体重','无谷物','适口性好'], cons:['价格昂贵','老年猫肠胃可能不适应高蛋白','假货多'] },
    { id:15, name:'巅峰 风干粮', en:'Ziwi Peak', brand:'巅峰 Ziwi Peak', origin:'新西兰', stage:'全阶段 · 高肉', stageKey:'raw', protein:'38%', fat:'30%', body:'#f5ead0', accent:'#c45a4a', fit:'追求顶级食材的全阶段猫，预算充足', pros:['风干工艺保留营养','96%含肉量','单一肉源低敏','适口性极佳'], cons:['价格极昂贵','脂肪30%偏高','能量密度大需控量'] },
    { id:16, name:'K9 主食冻干', en:'K9 Natural', brand:'K9 Natural', origin:'新西兰', stage:'全阶段 · 高肉', stageKey:'raw', protein:'45%', fat:'25%', body:'#f5ead0', accent:'#b84a3a', fit:'追求冻干生骨肉喂养的全阶段猫', pros:['蛋白质45%行业顶尖','冻干锁鲜','含内脏骨骼完整','可复水喂食'], cons:['价格极贵','需复水耗时','高脂高能量需控量','保存需防潮'] },

    // 国货精选 4款
    { id:17, name:'弗列加特 高蛋白鲜肉粮', en:'FREGATE', brand:'弗列加特 FREGATE', origin:'中国', stage:'全阶段 · 高鲜肉', stageKey:'domestic', protein:'40%', fat:'18%', body:'#f5ead0', accent:'#3a9b8a', fit:'追求高鲜肉含量的国货用户，全阶段猫', pros:['40%高蛋白','70%鲜肉含量','无谷物','供应链透明'], cons:['品牌较新','价格中等偏上','渠道有限'] },
    { id:18, name:'蓝氏 鲜肉幼猫粮', en:'LEGEND SANDY', brand:'蓝氏 LEGEND SANDY', origin:'中国', stage:'幼猫期 · 国产高肉', stageKey:'domestic', protein:'38%', fat:'17%', body:'#f5ead0', accent:'#4a9b7a', fit:'国产高肉路线支持者，幼猫期', pros:['38%蛋白适中','鲜肉含量高','无谷物','性价比好'], cons:['品牌知名度低','渠道有限','适口性个体差异'] },
    { id:19, name:'凯锐思 全价成猫粮', en:'KERUISI', brand:'凯锐思 KERUISI', origin:'中国', stage:'成猫期 · 国民口粮', stageKey:'domestic', protein:'30%', fat:'14%', body:'#f5ead0', accent:'#5a8b7a', fit:'预算有限的养猫家庭，成猫日常', pros:['价格极亲民','渠道广泛易购','适口性尚可','品控基本稳定'], cons:['蛋白质30%偏低','含谷物','原料透明度一般'] },
    { id:20, name:'麦富迪 营养均衡成猫粮', en:'Myfoodie', brand:'麦富迪 Myfoodie', origin:'中国（乖宝宠物）', stage:'全阶段 · 国民均衡', stageKey:'domestic', protein:'32%', fat:'14%', body:'#f5ead0', accent:'#3a7b8a', fit:'追求均衡性价比的国民用户', pros:['大厂出品(乖宝)','品类丰富','价格亲民','渠道广泛'], cons:['蛋白质32%偏低','含谷物','适口性波动'] }
  ];

  // ═══ 知识卡片 ═══
  const KNOWLEDGE = [
    { icon:'🧬', title:'粗蛋白质', desc:'布偶猫需32%以上。动物蛋白优于植物蛋白，鲜肉>肉粉>谷物蛋白。幼猫需更高。', range:'32%-45%', color:'#e53935' },
    { icon:'🐟', title:'Omega脂肪酸', desc:'深海鱼油EPA/DHA是毛发亮泽关键。布偶猫长毛需额外补充Omega-3。', range:'0.5-2.8%', color:'#1e88e5' },
    { icon:'🌾', title:'无谷物', desc:'布偶猫肠胃敏感，避免玉米小麦大豆。选择豌豆红薯等低碳水替代。', range:'0% 谷物', color:'#43a047' },
    { icon:'🦠', title:'益生菌', desc:'益生元FOS和益生菌调节肠道菌群，改善布偶猫常见软便。', range:'添加0.3-0.5%', color:'#8e24aa' },
    { icon:'⚖️', title:'脂肪控制', desc:'布偶猫易胖，成猫脂肪14-18%。绝育后建议12-14%，搭配运动。', range:'14-18%', color:'#fb8c00' },
    { icon:'🔄', title:'换粮过渡', desc:'布偶猫肠胃需7-14天过渡。新旧比例25:75→50:50→75:25→100。', range:'7-14天', color:'#00897b' },
    { icon:'💧', title:'水分补充', desc:'干粮水分8-10%。布偶猫易尿路问题，建议搭配湿粮或流动饮水器。', range:'每日50ml/kg', color:'#039be5' },
    { icon:'🦴', title:'牛磺酸', desc:'必需氨基酸，缺乏致心脏病和失明。猫粮应含0.1%以上。', range:'≥0.15%', color:'#3949ab' }
  ];

  // ═══ 展架布局 ═══
  // 5层 × 4列 = 20罐
  // 第1层(顶) 幼猫 4款, 第2层 成猫 4款, 第3层 功能型 4款, 第4层 老年2+冻干2, 第5层(底) 国货4
  const SHELF_LAYOUT = [
    { stageKey: 'kitten',   label: '幼猫期',   color: STAGE_META.kitten.color },
    { stageKey: 'adult',    label: '成猫期',   color: STAGE_META.adult.color },
    { stageKey: 'special',  label: '功能型',   color: STAGE_META.special.color },
    { stageKey: 'mixed_4',  label: '老年 · 冻干', color: '#b07060' }, // 混合层
    { stageKey: 'domestic', label: '国货精选', color: STAGE_META.domestic.color }
  ];

  // ═══ 初始化 ═══
  const shelfContainer = document.getElementById('shelfContainer');
  const detailPanel = document.getElementById('detailPanel');
  const filterBar = document.getElementById('filterBar');
  const knowledgeGrid = document.getElementById('knowledgeGrid');
  const compareBody = document.getElementById('compareBody');

  let currentFilter = 'all';
  let selectedFoodId = null;

  // 渲染展架
  function renderShelves() {
    let foodIndex = 0;
    const shelvesHtml = SHELF_LAYOUT.map((shelf, shelfIdx) => {
      const foods = FOODS.filter(f => {
        if (shelf.stageKey === 'mixed_4') {
          // 第4层：老年2款(id 13,14) + 冻干2款(id 15,16)
          return f.stageKey === 'senior' || f.stageKey === 'raw';
        }
        return f.stageKey === shelf.stageKey;
      });

      const cansHtml = foods.map((food, colIdx) => {
        foodIndex++;
        return `
          <div class="can-wrapper" data-food-id="${food.id}" style="--delay:${(shelfIdx * 4 + colIdx) * 0.08}s">
            <div class="can-3d" style="--body:${food.body}; --accent:${food.accent}">
              <div class="can-top"></div>
              <div class="can-body">
                <div class="can-label">
                  <div class="can-label-brand">${food.brand.split(' ')[0]}</div>
                  <div class="can-label-name">${food.name.split(' ')[1] || food.name.split(' ')[0]}</div>
                  <div class="can-label-stage" style="color:${food.accent}">${STAGE_META[food.stageKey].name}</div>
                </div>
                <div class="can-band" style="background:${food.accent}"></div>
              </div>
              <div class="can-bottom"></div>
              <div class="can-glow" style="--g:${food.accent}"></div>
            </div>
            <div class="can-tag">${food.name}</div>
          </div>
        `;
      }).join('');

      return `
        <div class="shelf-row" style="--shelf-color:${shelf.color}" data-stage="${shelf.stageKey}">
          <div class="shelf-label">
            <span class="shelf-dot" style="background:${shelf.color}"></span>
            <span class="shelf-name">${shelf.label}</span>
          </div>
          <div class="shelf-board">
            <div class="cans-row">${cansHtml}</div>
          </div>
        </div>
      `;
    }).join('');

    shelfContainer.innerHTML = shelvesHtml;

    // 绑定点击
    document.querySelectorAll('.can-wrapper').forEach(w => {
      w.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(w.dataset.foodId);
        const food = FOODS.find(f => f.id === id);
        if (food) showDetail(food);
      });
    });
  }

  // 渲染筛选条
  function renderFilters() {
    const filters = [
      { key: 'all', label: '全部', color: '#d4a574', icon: '🎯' },
      { key: 'kitten', label: '幼猫', color: STAGE_META.kitten.color, icon: '🐱' },
      { key: 'adult', label: '成猫', color: STAGE_META.adult.color, icon: '🐈' },
      { key: 'special', label: '功能型', color: STAGE_META.special.color, icon: '💊' },
      { key: 'senior', label: '老年', color: STAGE_META.senior.color, icon: '🐾' },
      { key: 'raw', label: '冻干高肉', color: STAGE_META.raw.color, icon: '🥩' },
      { key: 'domestic', label: '国货精选', color: STAGE_META.domestic.color, icon: '⭐' }
    ];

    filterBar.innerHTML = filters.map(f => `
      <button class="filter-pill ${f.key === currentFilter ? 'active' : ''}"
              data-filter="${f.key}"
              style="--pill:${f.color}">
        <span class="pill-icon">${f.icon}</span>
        <span>${f.label}</span>
      </button>
    `).join('');

    filterBar.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        applyFilter();
      });
    });
  }

  // 应用筛选
  function applyFilter() {
    document.querySelectorAll('.can-wrapper').forEach(w => {
      const id = parseInt(w.dataset.foodId);
      const food = FOODS.find(f => f.id === id);
      if (!food) return;
      const match = currentFilter === 'all' || food.stageKey === currentFilter;
      w.classList.toggle('dimmed', !match);
      w.classList.toggle('clickable', match);
    });

    document.querySelectorAll('.shelf-row').forEach(row => {
      const stage = row.dataset.stage;
      if (currentFilter === 'all') {
        row.classList.remove('dimmed');
      } else {
        let match = false;
        if (stage === currentFilter) match = true;
        if (stage === 'mixed_4' && (currentFilter === 'senior' || currentFilter === 'raw')) match = true;
        row.classList.toggle('dimmed', !match);
      }
    });
  }

  // 显示详情
  function showDetail(food) {
    selectedFoodId = food.id;
    const stage = STAGE_META[food.stageKey];

    // 高亮选中罐
    document.querySelectorAll('.can-wrapper').forEach(w => {
      w.classList.toggle('selected', parseInt(w.dataset.foodId) === food.id);
    });

    detailPanel.innerHTML = `
      <div class="detail-panel-inner" style="--accent:${food.accent}; --stage:${stage.color}">
        <div class="detail-header">
          <div class="detail-can-icon" style="background:${food.accent}">
            <span>${stage.icon}</span>
          </div>
          <div class="detail-title-area">
            <h2>${food.name}</h2>
            <p>${food.brand} · ${food.origin}</p>
            <div class="detail-stage-tag" style="background:${stage.color}">${food.stage}</div>
          </div>
          <button class="detail-close" onclick="closeDetail()">×</button>
        </div>

        <div class="detail-nutrition">
          <div class="nut-card">
            <span class="nut-label">粗蛋白</span>
            <span class="nut-value" style="color:${food.accent}">${food.protein}</span>
          </div>
          <div class="nut-card">
            <span class="nut-label">粗脂肪</span>
            <span class="nut-value" style="color:${food.accent}">${food.fat}</span>
          </div>
          <div class="nut-card">
            <span class="nut-label">阶段</span>
            <span class="nut-value" style="color:${food.accent}">${stage.name}</span>
          </div>
        </div>

        <div class="detail-fit">
          <span class="fit-icon">🎯</span>
          <span>${food.fit}</span>
        </div>

        <div class="detail-pros-cons">
          <div class="detail-pros">
            <h4>✅ 优点</h4>
            <ul>${food.pros.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>
          <div class="detail-cons">
            <h4>⚠️ 注意</h4>
            <ul>${food.cons.map(c => `<li>${c}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    `;

    detailPanel.classList.add('active');
  }

  // 关闭详情
  window.closeDetail = function() {
    detailPanel.classList.remove('active');
    document.querySelectorAll('.can-wrapper').forEach(w => w.classList.remove('selected'));
    selectedFoodId = null;
  };

  // 渲染知识卡片
  function renderKnowledge() {
    knowledgeGrid.innerHTML = KNOWLEDGE.map(k => `
      <div class="knowledge-card" style="--k-color:${k.color}">
        <div class="k-icon">${k.icon}</div>
        <h4>${k.title}</h4>
        <p>${k.desc}</p>
        <span class="k-range">${k.range}</span>
      </div>
    `).join('');
  }

  // 渲染对比表
  function renderCompare() {
    compareBody.innerHTML = FOODS.map(f => `
      <tr>
        <td>${f.name}</td>
        <td>${f.origin}</td>
        <td class="best">${f.protein}</td>
        <td>${f.fat}</td>
        <td><span class="stage-badge" style="background:${STAGE_META[f.stageKey].color}">${STAGE_META[f.stageKey].name}</span></td>
      </tr>
    `).join('');
  }

  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
  });

  // 点击背景关闭
  detailPanel.addEventListener('click', (e) => {
    if (e.target === detailPanel) closeDetail();
  });

  // 滚动动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 初始化
  renderShelves();
  renderFilters();
  renderKnowledge();
  renderCompare();
  applyFilter();

  setTimeout(() => {
    document.querySelectorAll('.can-wrapper, .knowledge-card, .shelf-row').forEach(el => observer.observe(el));
  }, 100);

  console.log('🐱 布偶猫猫粮展览馆 v2 已加载 · 20款猫粮 · 5层展架');
})();
