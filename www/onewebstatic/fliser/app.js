const GROUP1 = [34,40,164,169,174,190,280,844,2036,2133,2613];
const GROUP2 = [161,166,167,2065,2267,2488,2614,2624,2979,2980,2988];
let ute1 = [], ute2 = [], inne = [];
let uniqueIdCounter = 0;

const uteCol1 = document.getElementById('uteCol1');
const uteCol2 = document.getElementById('uteCol2');
const inneList = document.getElementById('inneList');
const resetBtn = document.getElementById('resetBtn');
const resetPath = document.getElementById('resetPath');
const sleepBtn = document.getElementById('sleepBtn');
const sleepOverlay = document.getElementById('sleepOverlay');

function loadState(){
  const data = JSON.parse(localStorage.getItem('taxiOrder'));
  if(data && Array.isArray(data.inne) && Array.isArray(data.ute1) && Array.isArray(data.ute2)){
    inne = data.inne;
    ute1 = data.ute1;
    ute2 = data.ute2;
    if(inne.length>0) uniqueIdCounter = Math.max(...inne.map(i=>i.id||0)) +1;
  } else {
    inne = [];
    ute1 = [...GROUP1];
    ute2 = [...GROUP2];
  }
}

function saveState(){
  localStorage.setItem('taxiOrder', JSON.stringify({inne, ute1, ute2}));
}

function renderUte(){
  renderUteCol(uteCol1,1, ute1);
  renderUteCol(uteCol2,2, ute2);
}
function renderUteCol(col, group, arr){
  col.innerHTML = '';
  let groupArray = group === 1 ? GROUP1 : GROUP2;
  let available = arr.filter(v => !inne.some(i => i.val === v));
  available.sort((a,b) => groupArray.indexOf(a) - groupArray.indexOf(b));
  for(let val of available){
    let btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = val;
    btn.dataset.val = val;
    btn.dataset.group = group;
    btn.addEventListener('pointerdown', dragStart, {passive:false});
    col.appendChild(btn);
  }
}

function renderInne(previewObj=null, previewIdx=null){
  inneList.innerHTML = '';
  for(let i=0; i < inne.length; i++){
    if(previewObj && previewIdx === i) addPlaceholder(i+1);
    addInneItem(previewObj && previewIdx <= i ? i + 2 : i + 1, inne[i]);
  }
  if(previewObj && previewIdx === inne.length) addPlaceholder(inne.length + 1);
}
function addInneItem(prefixNum, item){
  let wrap = document.createElement('div');
  wrap.className = 'inne-item';
  let pre = document.createElement('div');
  pre.className = 'prefix';
  pre.textContent = prefixNum;
  let btn = document.createElement('button');
  btn.className = `inne-btn state${item.state || 1}`;
  btn.dataset.val = item.val;
  btn.dataset.group = item.group;
  btn.dataset.state = item.state || 1;
  btn.dataset.id = item.id;
  btn.addEventListener('pointerdown', dragStart, {passive:false});
  btn.addEventListener('click', toggleInneColor);
  btn.innerHTML = `<span class="inne-emoji">${getEmojiForState(item.state||1)}</span><span class="inne-val">${item.val}</span>`;
  wrap.append(pre, btn);
  inneList.appendChild(wrap);
}
function addPlaceholder(prefixNum){
  let wrap = document.createElement('div');
  wrap.className = 'inne-item';
  let pre = document.createElement('div');
  pre.className = 'prefix';
  pre.textContent = prefixNum;
  let placeholder = document.createElement('button');
  placeholder.className = 'placeholder-btn';
  wrap.append(pre, placeholder);
  inneList.appendChild(wrap);
}

function getEmojiForState(state){
  switch(state){
    case 1: return '🚕';
    case 2: return '🚂';
    case 3: return '🔋';
    default: return '';
  }
}

function toggleInneColor(e){
  let btn = e.currentTarget;
  btn.classList.remove('pop');
  void btn.offsetWidth;
  btn.classList.add('pop');
  let id = parseInt(btn.dataset.id);
  let state = parseInt(btn.dataset.state);
  state = (state === 3) ? 1 : state + 1;
  btn.dataset.state = state;
  btn.className = `inne-btn state${state} pop`;
  btn.innerHTML = `<span class="inne-emoji">${getEmojiForState(state)}</span><span class="inne-val">${btn.dataset.val}</span>`;
  let item = inne.find(i => i.id === id);
  if(item){
    item.state = state;
    saveState();
  }
}

/* Drag & Drop - enkel implementering */
let draggingEl, dragData, offsetX=0, offsetY=0, isDragging=false, dropIdx=null, startX=0, startY=0, hasMoved=false;

function getGroupForVal(val){
  if(GROUP1.includes(val)) return 1;
  if(GROUP2.includes(val)) return 2;
  return 0;
}
function dragStart(e){
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;
  hasMoved = false;
  const val = parseInt(e.currentTarget.dataset.val);
  let group = parseInt(e.currentTarget.dataset.group) || getGroupForVal(val);
  let state = parseInt(e.currentTarget.dataset.state) || 1;
  let id = parseInt(e.currentTarget.dataset.id) || Date.now() + uniqueIdCounter++;
  dragData = {id, val, group, state};
  draggingEl = document.createElement('button');
  draggingEl.className = `inne-btn state${state} dragging`;
  draggingEl.textContent = val;
  draggingEl.style.width = e.currentTarget.offsetWidth + 'px';
  draggingEl.style.height = '100px';
  document.body.appendChild(draggingEl);
  const rect = e.currentTarget.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  isDragging = true;
  document.addEventListener('pointermove', pointerMove);
  document.addEventListener('pointerup', pointerUp);
}
function pointerMove(e){
  if(!isDragging) return;
  if(Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) hasMoved = true;
  draggingEl.style.left = (e.pageX - offsetX) + 'px';
  draggingEl.style.top = (e.pageY - offsetY) + 'px';
  if(hasMoved){
    const rect = inneList.getBoundingClientRect();
    const over = (e.pageX > rect.left && e.pageX < rect.right && e.pageY > rect.top && e.pageY < rect.bottom);
    calcDropIdx(e);
    renderInne(dragData, over ? dropIdx : inne.length);
  }
}
function pointerUp(e){
  document.removeEventListener('pointermove', pointerMove);
  document.removeEventListener('pointerup', pointerUp);
  if(!hasMoved){
    draggingEl.remove();
    isDragging = false;
    return;
  }
  isDragging = false;
  const rect = inneList.getBoundingClientRect();
  if(e.pageX > rect.left && e.pageX < rect.right && e.pageY > rect.top && e.pageY < rect.bottom){
    if(dropIdx === null) dropIdx = inne.length;
    inne = inne.filter(i => i.id !== dragData.id);
    ute1 = ute1.filter(v => v !== dragData.val);
    ute2 = ute2.filter(v => v !== dragData.val);
    inne.splice(dropIdx, 0, {id: dragData.id, val: dragData.val, group: getGroupForVal(dragData.val), state: dragData.state});
  } else {
    let g = getGroupForVal(dragData.val);
    inne = inne.filter(i => i.id !== dragData.id);
    if(g == 1 && !ute1.includes(dragData.val)){
      ute1.push(dragData.val);
      ute1.sort((a,b) => GROUP1.indexOf(a) - GROUP1.indexOf(b));
    }
    if(g == 2 && !ute2.includes(dragData.val)){
      ute2.push(dragData.val);
      ute2.sort((a,b) => GROUP2.indexOf(a) - GROUP2.indexOf(b));
    }
  }
  saveState();
  renderUte();
  renderInne();
  draggingEl.remove();
}
function calcDropIdx(e){
  const items = [...inneList.querySelectorAll('.inne-item')];
  if(items.length === 0){ dropIdx = 0; return; }
  for(let i = 0; i < items.length; i++){
    const r = items[i].getBoundingClientRect();
    if(e.pageY < r.top + r.height/2){ dropIdx = i; return; }
  }
  dropIdx = items.length;
}

/* Reset-knapp med sirkel */
let resetTimer;
resetBtn.addEventListener('pointerdown', () => {
  resetPath.style.transition = "stroke-dashoffset 2s linear";
  resetPath.style.strokeDashoffset = "0";
  resetTimer = setTimeout(() => {
    localStorage.removeItem('taxiOrder');
    location.reload();
  }, 2000);
});
resetBtn.addEventListener('pointerup', cancelReset);
resetBtn.addEventListener('pointerleave', cancelReset);
function cancelReset(){
  clearTimeout(resetTimer);
  resetPath.style.transition = "stroke-dashoffset 0.2s ease";
  resetPath.style.strokeDashoffset = "100";
}

/* Sleep overlay */
sleepBtn.addEventListener('click', () => {
  sleepOverlay.style.display = 'block';
});
sleepOverlay.addEventListener('click', () => {
  sleepOverlay.style.display = 'none';
});

/* Init */
loadState();
renderUte();
renderInne();
// 3-klikk på INNE header for dark/light toggle
const inneHeader = document.getElementById('inneHeader');
let inneClickCount = 0;
let inneClickTimer = null;

inneHeader.addEventListener('click', () => {
  inneClickCount++;
  if(inneClickCount === 3){
    toggleDarkMode();
    inneClickCount = 0;
    clearTimeout(inneClickTimer);
  } else {
    clearTimeout(inneClickTimer);
    inneClickTimer = setTimeout(() => {
      inneClickCount = 0;
    }, 600);
  }
});

// 3-klikk på UTE header for fullscreen toggle
const uteHeader = document.getElementById('uteHeader');
let uteClickCount = 0;
let uteClickTimer = null;

uteHeader.addEventListener('click', () => {
  uteClickCount++;
  if(uteClickCount === 3){
    toggleFullscreen();
    uteClickCount = 0;
    clearTimeout(uteClickTimer);
  } else {
    clearTimeout(uteClickTimer);
    uteClickTimer = setTimeout(() => {
      uteClickCount = 0;
    }, 600);
  }
});

function toggleFullscreen(){
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen().catch(() => {
      console.log('Fullscreen request blokkert av nettleser');
    });
  } else if(document.exitFullscreen){
    document.exitFullscreen();
  }
}

function toggleDarkMode(){
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('mode', isDark ? 'dark' : 'light');
}

