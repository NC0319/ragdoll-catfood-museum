/**
 * 布偶猫猫粮展览馆 · 交互逻辑
 * Ragdoll · Cat Food Museum
 */

(function () {
  'use strict';

  // ═══ 展品数据 ═══
  const EXHIBITS = [
    {
      id: 'royal-canin-ra32',
      name: '皇家 RA32 布偶猫专用粮',
      brand: 'Royal Canin 皇家',
      origin: '法国',
      type: '成猫专用',
      protein: '32%',
      fat: '14%',
      price: '¥225 / 2kg',
      rating: 9.2,
      tags: ['美毛', '护肠胃', '大颗粒', '经典品牌'],
      color: '#d4a574',
      icon: '🐱',
      desc: '专为布偶猫生理结构设计的成猫粮，含鱼油（Omega-3）与甜菜浆，改善毛发光泽并促进毛球排出。粽子形大颗粒减缓进食速度，减少呕吐。',
      ingredients: ['鸡胸肉', '鸡肝', '深海鱼油', '蛋粉', '甜菜浆', '燕麦纤维', '益生元FOS'],
      nutrition: { protein: 32, fat: 14, fiber: 5, moisture: 8, omega3: 1.2, taurine: 0.15 },
      pros: ['品牌历史悠久，品控稳定', '大颗粒设计减缓进食', '添加益生元护肠胃', '美毛效果显著'],
      cons: ['蛋白质含量偏低(32%)', '含部分谷物成分', '价格中等偏上'],
      scene: '适合1岁以上布偶猫，尤其换毛期、肠胃敏感者'
    },
    {
      id: 'orijen-six-fish',
      name: '渴望 六种鱼无谷猫粮',
      brand: 'Orijen 渴望',
      origin: '加拿大',
      type: '全阶段',
      protein: '40%+',
      fat: '20%',
      price: '¥680 / 5.4kg',
      rating: 9.6,
      tags: ['高蛋白', '无谷', '深海鱼', '美毛'],
      color: '#4a90d9',
      icon: '🐟',
      desc: '六种深海鱼配方，提供丰富Omega-3脂肪酸，蛋白质含量40%+，食材达到人类食用级别。无谷物配方降低过敏风险，适口性极佳。',
      ingredients: ['新鲜三文鱼', '鲱鱼', '比目鱼', '鲶鱼', '梭鱼', '红鱼', '鱼油'],
      nutrition: { protein: 40, fat: 20, fiber: 3, moisture: 10, omega3: 2.8, taurine: 0.2 },
      pros: ['蛋白质极高，营养密度大', '六种深海鱼，Omega-3丰富', '无谷物无人工添加剂', '美毛效果顶级'],
      cons: ['价格昂贵', '高脂肪可能引起部分猫软便', '假货较多需注意渠道'],
      scene: '预算充足、追求顶级营养的布偶猫家庭'
    },
    {
      id: 'acana-farm',
      name: '爱肯拿 农场盛宴猫粮',
      brand: 'Acana 爱肯拿',
      origin: '加拿大',
      type: '全阶段',
      protein: '37%',
      fat: '16%',
      price: '¥480 / 5.4kg',
      rating: 9.0,
      tags: ['高蛋白', '性价比', '多肉源', '无谷'],
      color: '#7cb342',
      icon: '🥩',
      desc: '新鲜鸡肉+火鸡配方，动物蛋白含量75%。与渴望同属Champion Petfoods集团，价格低30%，性价比突出。营养均衡，适口性好。',
      ingredients: ['新鲜鸡肉', '火鸡肉', '鸡肝', '鸡心', '鲱鱼', '鱼油', '南瓜'],
      nutrition: { protein: 37, fat: 16, fiber: 4, moisture: 10, omega3: 1.0, taurine: 0.18 },
      pros: ['性价比极高（对比渴望）', '多肉源营养均衡', '无谷物低敏', '适口性好'],
      cons: ['蛋白质略低于渴望', '多肉源可能不适合极度敏感猫', '颗粒偏小'],
      scene: '追求高品质但预算有限的布偶猫家庭'
    },
    {
      id: 'instinct-raw',
      name: '百利 无谷鸡猫粮（生鲜涂层）',
      brand: 'Instinct 百利',
      origin: '美国',
      type: '全阶段',
      protein: '47%',
      fat: '17%',
      price: '¥750 / 10kg',
      rating: 9.4,
      tags: ['超高蛋白', '无谷', '单一肉源', '冻干涂层'],
      color: '#e65100',
      icon: '🐔',
      desc: '纯鲜鸡肉配方，动物原料85%+，蛋白质高达47%。颗粒表面喷涂鲜肉冻干碎，适口性极佳。添加蒙脱土有助改善软便。',
      ingredients: ['鲜鸡肉', '鸡肉粉', '火鸡肉粉', '鲱鱼粉', '鸡脂', '蒙脱土', '鱼油'],
      nutrition: { protein: 47, fat: 17, fiber: 3, moisture: 9, omega3: 0.8, taurine: 0.2 },
      pros: ['蛋白质含量行业顶尖(47%)', '单一肉源低敏', '冻干涂层适口性极佳', '添加蒙脱土改善软便'],
      cons: ['价格较高', '颗粒小，易吃快导致呕吐', '蒙脱土成分有争议'],
      scene: '追求极高蛋白、能监督进食速度的布偶猫家长'
    },
    {
      id: 'halo-spot',
      name: '自然光环 鲜鸡肉猫粮',
      brand: 'Halo 自然光环',
      origin: '美国',
      type: '全阶段',
      protein: '33%',
      fat: '15%',
      price: '¥550 / 10kg',
      rating: 8.6,
      tags: ['单一肉源', '低敏', '稳定', '适口性一般'],
      color: '#26a69a',
      icon: '🌿',
      desc: '鲜鸡肉为主，单一肉源配方。蛋白质33%，稳定不软便，但适口性一般。适合对多肉源过敏的布偶猫。',
      ingredients: ['鲜鸡肉', '鸡肉粉', '鸡脂', '蛋粉', '豌豆', '鱼油', '亚麻籽'],
      nutrition: { protein: 33, fat: 15, fiber: 5, moisture: 10, omega3: 0.6, taurine: 0.15 },
      pros: ['单一肉源，低敏安全', '软便改善效果稳定', '配方简洁透明'],
      cons: ['适口性一般', '蛋白质偏低', '含豌豆成分'],
      scene: '多肉源过敏、需要极低敏配方的布偶猫'
    },
    {
      id: 'farmina-n-d',
      name: '法米娜 N&D 野猪猫粮',
      brand: 'Farmina 法米娜',
      origin: '意大利',
      type: '全阶段',
      protein: '44%',
      fat: '20%',
      price: '¥680 / 5kg',
      rating: 9.1,
      tags: ['高蛋白', '无谷', '低温慢烘', '高适口性'],
      color: '#5c6bc0',
      icon: '🍖',
      desc: '野猪+鸡肉配方，动物原料占80%+。采用低温慢烘工艺保留营养活性。蛋白质44%，适口性极佳，但高脂肪可能引起部分布偶软便。',
      ingredients: ['野猪肉', '鸡肉', '鸡脂', '鱼油', '南瓜', '亚麻籽', '益生元'],
      nutrition: { protein: 44, fat: 20, fiber: 3, moisture: 9, omega3: 1.5, taurine: 0.18 },
      pros: ['高蛋白高营养', '低温慢烘保留活性', '适口性极佳', '无谷物无人工添加剂'],
      cons: ['高脂肪可能导致软便', '价格昂贵', '野猪肉源可能过敏'],
      scene: '愿意搭配冻干/罐头平衡的高端用户'
    },
    {
      id: 'ceshi-yikou',
      name: '诚实一口 P40 猫粮',
      brand: '诚实一口',
      origin: '中国',
      type: '全阶段',
      protein: '40%',
      fat: '16%',
      price: '¥168 / 1.5kg',
      rating: 8.8,
      tags: ['双层颗粒', '美毛', '国产', '高性价比'],
      color: '#ff7043',
      icon: '✨',
      desc: '鸡肉为主原料，添加三文鱼蛋白肽和EPAX专利鱼油，美毛效果出色。双层结构颗粒——外层酥脆，内嵌冻干夹心。表面干爽无油，降低黑下巴发生率。',
      ingredients: ['鲜鸡肉', '三文鱼蛋白肽', 'EPAX鱼油', '鸡脂', '冻干夹心', '蛋黄卵磷脂'],
      nutrition: { protein: 40, fat: 16, fiber: 4, moisture: 9, omega3: 1.8, taurine: 0.16 },
      pros: ['美毛效果显著（专利鱼油）', '双层颗粒适口性好', '表面干爽预防黑下巴', '国产性价比高'],
      cons: ['品牌较新，长期数据少', '部分批次适口性波动', '渠道有限'],
      scene: '注重毛发管理、预算有限的布偶猫家庭'
    },
    {
      id: 'xifei',
      name: '希喂 烘焙猫粮',
      brand: '希喂 Ceshi',
      origin: '中国',
      type: '全阶段',
      protein: '42%',
      fat: '15%',
      price: '¥138 / 1.5kg',
      rating: 8.9,
      tags: ['单一肉源', '烘焙粮', '益生元', '低敏'],
      color: '#66bb6a',
      icon: '🌱',
      desc: '与汉欧联合研发，婴儿奶粉级无菌生产环境。鲜鸡肉为主原料，动物性原料占比82%。三阶渐进式轻度烘焙技术，消化吸收率95.82%。添加益生元和后生元呵护肠胃。',
      ingredients: ['鲜鸡肉', '鸡肝', '鸡心', '鱼油', '益生元FOS', '后生元', '海带粉', '牛磺酸'],
      nutrition: { protein: 42, fat: 15, fiber: 4, moisture: 9, omega3: 1.2, taurine: 0.18 },
      pros: ['单一肉源低敏', '烘焙工艺营养留存高', '消化率95.82%', '无菌生产品控严'],
      cons: ['品牌知名度低', '购买渠道有限', '适口性个体差异大'],
      scene: '肠胃敏感、需要低敏配方的小布偶'
    },
    {
      id: 'chani',
      name: '馋不腻 益生菌猫粮',
      brand: '馋不腻',
      origin: '中国',
      type: '全阶段',
      protein: '42%',
      fat: '14%',
      price: '¥120 / 1.5kg',
      rating: 8.5,
      tags: ['益生菌', '无谷', '美毛', '高性价比'],
      color: '#ffa726',
      icon: '🦠',
      desc: '76%含肉量+30亿活性益生菌（枯草芽孢杆菌），无谷低敏配方。粗蛋白42%，脂肪14%，营养与消化负担平衡良好。含Omega-3/Omega-6靓丽毛发。',
      ingredients: ['鸡肉', '鸡肝', '鱼油', '枯草芽孢杆菌', '果寡糖', '丝兰粉', '亚麻籽'],
      nutrition: { protein: 42, fat: 14, fiber: 5, moisture: 10, omega3: 1.0, taurine: 0.15 },
      pros: ['益生菌护肠胃效果好', '性价比极高', '美毛成分丰富', '市场口碑稳定'],
      cons: ['含肉量76%偏低', '部分猫咪不爱吃', '原料透明度一般'],
      scene: '预算有限、需要调理肠胃的布偶猫'
    },
    {
      id: 'nulo',
      name: 'Nulo 高蛋白猫粮',
      brand: 'Nulo',
      origin: '美国',
      type: '全阶段',
      protein: '40%',
      fat: '14%',
      price: '¥420 / 5kg',
      rating: 8.7,
      tags: ['高蛋白', '低脂', '体重管理', '美毛'],
      color: '#42a5f5',
      icon: '💪',
      desc: '高蛋白质(40%)、低脂肪(14%)配方，适合需要体重管理的布偶猫。添加BC30益生菌促消化，毛发状态改善明显。适口性佳，布偶猫普遍接受度高。',
      ingredients: ['鸡肉', '火鸡肉', '鲱鱼粉', '鸡脂', '鱼油', 'BC30益生菌', '蔓越莓'],
      nutrition: { protein: 40, fat: 14, fiber: 4, moisture: 10, omega3: 0.9, taurine: 0.16 },
      pros: ['高蛋白低脂，体重管理友好', '添加BC30专利益生菌', '毛发改善效果明显', '适口性好'],
      cons: ['品牌知名度一般', '部分渠道假货多', '原料透明度中等'],
      scene: '需要体重管理、毛发需要改善的布偶猫'
    },
    {
      id: 'wellness-core',
      name: 'Wellness CORE 无谷猫粮',
      brand: 'Wellness',
      origin: '美国',
      type: '全阶段',
      protein: '38%',
      fat: '18%',
      price: '¥520 / 5kg',
      rating: 8.8,
      tags: ['无谷', '高蛋白', '抗氧化', '关节保护'],
      color: '#ec407a',
      icon: '🛡️',
      desc: '无谷物高蛋白配方，蛋白质38%。添加葡萄糖胺和软骨素支持关节健康，适合中大型猫咪如布偶猫。富含抗氧化剂，增强免疫力。',
      ingredients: ['鸡肉', '火鸡肉', '鲱鱼粉', '鸡脂', '鱼油', '葡萄糖胺', '软骨素', '蔓越莓'],
      nutrition: { protein: 38, fat: 18, fiber: 4, moisture: 11, omega3: 0.8, taurine: 0.17 },
      pros: ['关节保护成分（葡萄糖胺+软骨素）', '抗氧化配方增强免疫', '无谷物低敏', '适合中大型猫'],
      cons: ['脂肪偏高(18%)', '价格中等偏上', '适口性个体差异'],
      scene: '关注关节健康的中大型布偶猫'
    },
    {
      id: 'tiki-cat',
      name: 'Tiki Cat 诞生之地猫粮',
      brand: 'Tiki Cat',
      origin: '美国',
      type: '全阶段',
      protein: '44%',
      fat: '15%',
      price: '¥580 / 4kg',
      rating: 9.0,
      tags: ['超高蛋白', '低碳水', '海鲜', '湿粮风格'],
      color: '#26c6da',
      icon: '🐠',
      desc: '以海鲜为核心的高蛋白低碳水猫粮，蛋白质44%。配料表前几位全是真实鱼肉，几乎不含碳水化合物。适口性极佳，尤其适合挑食的布偶猫。',
      ingredients: ['新鲜三文鱼', '鲱鱼', '鳕鱼', '鸡肝', '鱼汤', '鱼油', '牛磺酸'],
      nutrition: { protein: 44, fat: 15, fiber: 2, moisture: 12, omega3: 2.0, taurine: 0.22 },
      pros: ['蛋白质极高(44%)', '碳水极低', '纯海鲜配方Omega-3丰富', '适口性极佳'],
      cons: ['纯海鲜可能导致挑食', '价格较高', '部分猫咪对鱼类过敏'],
      scene: '挑食、需要高蛋白低碳水的布偶猫'
    }
  ];

  // ═══ 营养知识卡片 ═══
  const KNOWLEDGE = [
    { icon: '🧬', title: '蛋白质', desc: '布偶猫需要32%以上粗蛋白。动物蛋白优于植物蛋白，鲜肉>肉粉>谷物蛋白。', range: '32%-47%', color: '#e53935' },
    { icon: '🐟', title: 'Omega-3', desc: '深海鱼油中的EPA/DHA是毛发亮泽的关键。布偶猫每日需摄入0.5-2g/kg。', range: '0.5-2.8%', color: '#1e88e5' },
    { icon: '🌾', title: '无谷物', desc: '布偶猫肠胃敏感，避免玉米、小麦、大豆等易致敏谷物。选择豌豆、红薯等低碳水替代。', range: '0% 谷物', color: '#43a047' },
    { icon: '🦠', title: '益生菌', desc: '益生元(FOS)和益生菌(枯草芽孢杆菌)调节肠道菌群，改善布偶猫常见的软便问题。', range: '添加量0.3-0.5%', color: '#8e24aa' },
    { icon: '💧', title: '水分', desc: '干粮水分通常8-10%，需额外提供饮水。建议搭配湿粮或使用流动饮水器。', range: '8-12%', color: '#039be5' },
    { icon: '⚖️', title: '脂肪', desc: '布偶猫易胖，脂肪应控制在14-18%。搭配L-肉碱和高纤维有助于体重管理。', range: '14-18%', color: '#fb8c00' },
    { icon: '🦴', title: '牛磺酸', desc: '必需氨基酸，缺乏会导致心脏病和失明。猫粮中应含0.1%以上。', range: '≥0.15%', color: '#3949ab' },
    { icon: '🔄', title: '换粮过渡', desc: '布偶猫肠胃需要7-14天过渡期。新旧粮比例从25:75逐步调整到100:0。', range: '7-14天', color: '#00897b' }
  ];

  // ═══ 布偶猫品种特点 ═══
  const BREED_FACTS = [
    { label: '体重', value: '4.5-9kg', icon: '⚖️' },
    { label: '寿命', value: '12-17年', icon: '🕐' },
    { label: '毛发', value: '中长毛·丝绒感', icon: '✨' },
    { label: '性格', value: '温顺·粘人·聪明', icon: '💝' },
    { label: '肠胃', value: '敏感·易软便', icon: '⚠️' },
    { label: '体型', value: '大型·肌肉发达', icon: '🐱' }
  ];

  // ═══ 初始化 ═══
  const grid = document.getElementById('exhibitGrid');
  const detailModal = document.getElementById('detailModal');
  const detailBody = document.getElementById('detailBody');
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const knowledgeGrid = document.getElementById('knowledgeGrid');
  const breedFacts = document.getElementById('breedFacts');

  let currentFilter = 'all';
  let currentSearch = '';

  // 渲染展品卡片
  function renderExhibits() {
    const filtered = EXHIBITS.filter(ex => {
      const matchFilter = currentFilter === 'all' || ex.tags.includes(currentFilter);
      const matchSearch = !currentSearch ||
        ex.name.toLowerCase().includes(currentSearch) ||
        ex.brand.toLowerCase().includes(currentSearch) ||
        ex.origin.toLowerCase().includes(currentSearch);
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty">暂无匹配展品，试试其他关键词？</div>';
      return;
    }

    grid.innerHTML = filtered.map((ex, i) => `
      <article class="exhibit-card" style="--accent:${ex.color}; --delay:${i * 0.06}s" data-id="${ex.id}">
        <div class="card-glow"></div>
        <div class="card-header">
          <span class="card-icon">${ex.icon}</span>
          <span class="card-rating">${'★'.repeat(Math.round(ex.rating / 2))}</span>
        </div>
        <h3 class="card-name">${ex.name}</h3>
        <p class="card-brand">${ex.brand} · ${ex.origin}</p>
        <div class="card-stats">
          <span class="stat"><span class="stat-label">蛋白</span><span class="stat-val">${ex.protein}</span></span>
          <span class="stat"><span class="stat-label">脂肪</span><span class="stat-val">${ex.fat}</span></span>
          <span class="stat"><span class="stat-label">评分</span><span class="stat-val highlight">${ex.rating}</span></span>
        </div>
        <div class="card-tags">
          ${ex.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="card-price">${ex.price}</div>
        <button class="card-detail-btn">查看详情 →</button>
      </article>
    `).join('');

    // 绑定点击事件
    grid.querySelectorAll('.exhibit-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const ex = EXHIBITS.find(e => e.id === id);
        if (ex) showDetail(ex);
      });
    });
  }

  // 渲染详情弹窗
  function showDetail(ex) {
    detailBody.innerHTML = `
      <div class="detail-header" style="--accent:${ex.color}">
        <span class="detail-icon">${ex.icon}</span>
        <div>
          <h2>${ex.name}</h2>
          <p>${ex.brand} · ${ex.origin} · ${ex.type}</p>
        </div>
        <button class="detail-close" onclick="document.getElementById('detailModal').classList.remove('active')">×</button>
      </div>
      <p class="detail-desc">${ex.desc}</p>

      <div class="detail-section">
        <h4>📊 营养成分</h4>
        <div class="nutrition-bars">
          ${Object.entries(ex.nutrition).map(([key, val]) => {
            const labels = { protein: '粗蛋白', fat: '粗脂肪', fiber: '粗纤维', moisture: '水分', omega3: 'Omega-3', taurine: '牛磺酸' };
            const maxVals = { protein: 50, fat: 25, fiber: 8, moisture: 15, omega3: 3, taurine: 0.3 };
            const pct = Math.min(100, (val / maxVals[key]) * 100);
            return `
              <div class="nut-bar">
                <span class="nut-label">${labels[key] || key}</span>
                <div class="nut-track"><div class="nut-fill" style="width:${pct}%;background:${ex.color}"></div></div>
                <span class="nut-val">${val}${key === 'taurine' ? '%' : '%'}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="detail-section">
        <h4>🥩 主要原料</h4>
        <div class="ingredient-list">
          ${ex.ingredients.map(ing => `<span class="ingredient-chip">${ing}</span>`).join('')}
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-section">
          <h4>✅ 优点</h4>
          <ul class="pros-list">
            ${ex.pros.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
        <div class="detail-section">
          <h4>⚠️ 注意</h4>
          <ul class="cons-list">
            ${ex.cons.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="detail-scene">
        <span class="scene-icon">🎯</span>
        <span>${ex.scene}</span>
      </div>

      <div class="detail-footer">
        <span class="detail-price">${ex.price}</span>
        <span class="detail-rating">综合评分 ${ex.rating} / 10</span>
      </div>
    `;
    detailModal.classList.add('active');
  }

  // 渲染营养知识
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

  // 渲染品种特点
  function renderBreedFacts() {
    breedFacts.innerHTML = BREED_FACTS.map(f => `
      <div class="breed-fact">
        <span class="bf-icon">${f.icon}</span>
        <span class="bf-label">${f.label}</span>
        <span class="bf-value">${f.value}</span>
      </div>
    `).join('');
  }

  // 搜索
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    renderExhibits();
  });

  // 筛选
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderExhibits();
    });
  });

  // 关闭弹窗
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      detailModal.classList.remove('active');
    }
  });

  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') detailModal.classList.remove('active');
  });

  // 滚动动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
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

  // 初始渲染
  renderExhibits();
  renderKnowledge();
  renderBreedFacts();

  // 观察所有卡片
  setTimeout(() => {
    document.querySelectorAll('.exhibit-card, .knowledge-card').forEach(el => observer.observe(el));
  }, 100);

  console.log('🐱 布偶猫猫粮展览馆 已加载完成');
})();
