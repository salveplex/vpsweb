const GROUP1=[34,40,164,169,174,190,280,844,2036,2133,2613];
const GROUP2=[161,166,167,2065,2267,2488,2614,2624,2979,2980,2988];
let ute1, ute2, inne;

const uteCol1=document.getElementById('uteCol1');
const uteCol2=document.getElementById('uteCol2');
const inneList=document.getElementById('inneList');
const resetBtn=document.getElementById('resetBtn');
const resetPath=document.getElementById('resetPath');

function loadState(){
  const data=JSON.parse(localStorage.getItem('taxiOrder'));
  if(data && Array.isArray(data.inne) && Array.isArray(data.ute1) && Array.isArray(data.ute2)){
    inne=data.inne; ute1=data.ute1; ute2=data.ute2;
  } else {
    inne=[]; ute1=[...GROUP1]; ute2=[...GROUP2];
    saveState();
  }
}
function saveState(){
  localStorage.setItem('taxiOrder', JSON.stringify({inne,ute1,ute2}));
}

/* Reset button logic */
let resetTimer;
resetBtn.addEventListener('pointerdown', ()=>{
  resetPath.setAttribute('stroke','#fff'); 
  resetPath.style.transition="stroke-dashoffset 2s linear";
  resetPath.style.strokeDashoffset="0";
  resetTimer=setTimeout(()=>{
    resetPath.setAttribute('stroke','#0f0'); 
    setTimeout(()=>{
      localStorage.removeItem('taxiOrder');
      location.reload();
    },200);
  },2000);
});
resetBtn.addEventListener('pointerup', cancelReset);
resetBtn.addEventListener('pointerleave', cancelReset);
function cancelReset(){
  clearTimeout(resetTimer);
  resetPath.style.transition="stroke-dashoffset 0.2s ease";
  resetPath.style.strokeDashoffset="100";
  resetPath.setAttribute('stroke','#fff');
}

/* Rendering */
function renderUte(){
  renderUteCol(uteCol1,1,ute1);
  renderUteCol(uteCol2,2,ute2);
}
function renderUteCol(col,g,arr){
  col.innerHTML='';
  let available=arr.filter(v=>!inne.some(i=>i.val===v)).sort((a,b)=>a-b);
  for(let val of available){
    let btn=document.createElement('button');
    btn.className='button'; btn.textContent=val;
    btn.dataset.val=val; btn.dataset.group=g;
    btn.addEventListener('pointerdown',dragStart,{passive:false});
    col.appendChild(btn);
  }
}
function renderInne(previewObj=null,previewIdx=null){
  inneList.innerHTML='';
  for(let i=0;i<inne.length+(previewObj?1:0);i++){
    if(previewObj && previewIdx===i){
      let wrap=document.createElement('div');
      wrap.className='inne-item';
      let pre=document.createElement('div');
      pre.className='prefix'; pre.textContent=i+1;
      let btn=document.createElement('button');
      btn.className='button'; btn.textContent=previewObj.val;
      wrap.append(pre,btn);
      inneList.appendChild(wrap);
    } else {
      let idx=i-(previewObj?1:0);
      if(!inne[idx]) continue;
      let wrap=document.createElement('div');
      wrap.className='inne-item';
      let pre=document.createElement('div');
      pre.className='prefix'; pre.textContent=i+1;
      let btn=document.createElement('button');
      btn.className='inne-btn'; btn.textContent=inne[idx].val;
      btn.dataset.val=inne[idx].val;
      btn.dataset.group=inne[idx].group;
      btn.addEventListener('pointerdown',dragStart,{passive:false});
      wrap.append(pre,btn);
      inneList.appendChild(wrap);
    }
  }
}

/* Drag logic */
let draggingEl,dragData,offsetX=0,offsetY=0,isDragging=false,dropIdx=null;
function getGroupForVal(val){
  if(GROUP1.includes(val))return 1;
  if(GROUP2.includes(val))return 2;
  return 0;
}
function dragStart(e){
  e.preventDefault();
  const val=parseInt(e.currentTarget.dataset.val);
  let group=parseInt(e.currentTarget.dataset.group)||getGroupForVal(val);
  dragData={val,group};
  draggingEl=document.createElement('button');
  draggingEl.className='inne-btn dragging';
  draggingEl.textContent=val;
  draggingEl.style.width=e.currentTarget.offsetWidth+'px';
  draggingEl.style.height='100px';
  document.body.appendChild(draggingEl);
  const rect=e.currentTarget.getBoundingClientRect();
  offsetX=e.clientX-rect.left; offsetY=e.clientY-rect.top;
  isDragging=true;
  document.addEventListener('pointermove',pointerMove);
  document.addEventListener('pointerup',pointerUp);
}
function pointerMove(e){
  if(!isDragging)return;
  draggingEl.style.left=(e.pageX-offsetX)+'px';
  draggingEl.style.top=(e.pageY-offsetY)+'px';
  const rect=inneList.getBoundingClientRect();
  const over=(e.pageX>rect.left && e.pageX<rect.right && e.pageY>rect.top && e.pageY<rect.bottom);
  calcDropIdx(e);
  renderInne(over?dragData:null,over?dropIdx:null);
}
function pointerUp(){
  isDragging=false;
  document.removeEventListener('pointermove',pointerMove);
  document.removeEventListener('pointerup',pointerUp);
  const rect=inneList.getBoundingClientRect();
  if(event.pageX>rect.left && event.pageX<rect.right && event.pageY>rect.top && event.pageY<rect.bottom){
    if(dropIdx===null)dropIdx=inne.length;
    inne=inne.filter(i=>i.val!==dragData.val);
    ute1=ute1.filter(v=>v!==dragData.val);
    ute2=ute2.filter(v=>v!==dragData.val);
    inne.splice(dropIdx,0,{val:dragData.val,group:getGroupForVal(dragData.val)});
  } else {
    let g=getGroupForVal(dragData.val);
    inne=inne.filter(i=>i.val!==dragData.val);
    if(g==1&&!ute1.includes(dragData.val))ute1.push(dragData.val);
    if(g==2&&!ute2.includes(dragData.val))ute2.push(dragData.val);
  }
  saveState();
  renderUte();
  renderInne();
  draggingEl.remove();
}
function calcDropIdx(e){
  const items=[...inneList.querySelectorAll('.inne-item')];
  if(items.length===0){dropIdx=0;return;}
  for(let i=0;i<items.length;i++){
    const r=items[i].getBoundingClientRect();
    if(e.pageY<r.top+r.height/2){dropIdx=i;return;}
  }
  dropIdx=items.length;
}

loadState();
renderUte();
renderInne();
