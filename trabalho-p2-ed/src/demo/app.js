/* Simulador visual de Merge Sort e Quick Sort
 * Requer os elementos do HTML (ver simulador-ordenacao.html): #algs, #cases, #custom, #apply,
 * #err, #info, #viz, #nums, #msg, #sStep, #sTot, #sCmp, #sWr, #play, #pause, #step, #restart, #spd, #size, #sizeV
 */
let alg='merge',cs='avg',N=16,base=[],frames=[],idx=0,timer=null,customArr=[],mn=1,mx=16;
const $=id=>document.getElementById(id);
const INFO={
 merge:{best:'Melhor caso (array já ordenado): menos comparações; complexidade O(n log n).',avg:'Caso médio (array aleatório): O(n log n).',worst:'Pior caso (arranjo que maximiza as comparações nos merges): O(n log n), com o maior número de comparações possível.'},
 quick:{best:'Melhor caso (pivô sempre na mediana): partições equilibradas, O(n log n).',avg:'Caso médio (array aleatório): O(n log n) esperado.',worst:'Pior caso (array já ordenado, pivô = último elemento): partições totalmente desbalanceadas, O(n²).'}
};

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function msWorst(v){if(v.length<=1)return v;const l=[],r=[];v.forEach((x,i)=>(i%2?r:l).push(x));return msWorst(l).concat(msWorst(r))}
function qsBest(v){
  if(v.length<=1)return v.slice();
  const m=Math.floor((v.length-1)/2),p=v[m],L=qsBest(v.slice(0,m)),R=qsBest(v.slice(m+1));
  if(!R.length)return L.concat([p]);
  return L.concat([R[R.length-1]],R.slice(0,-1),[p]);
}
function makeArray(){
  if(cs==='custom')return customArr.slice();
  const s=Array.from({length:N},(_,i)=>i+1);
  if(cs==='avg')return shuffle(s);
  if(cs==='best')return alg==='quick'?qsBest(s):s;
  return alg==='quick'?s:msWorst(s);
}

function genFrames(input){
  const a=input.slice(),F=[],ok=new Set();let c=0,w=0;
  const snap=(msg,o={})=>F.push({a:a.slice(),msg,cmp:o.cmp||[],wr:o.wr||[],piv:o.piv??-1,rng:o.rng||null,ok:[...ok],c,w});
  snap('Array inicial. Pressione Executar ou Próximo passo.');
  if(alg==='quick'){
    const qs=(lo,hi)=>{
      if(lo>hi)return;
      if(lo===hi){ok.add(lo);snap(`Subarray de 1 elemento: posição ${lo} já está final.`,{rng:[lo,hi]});return}
      const p=a[hi];let i=lo-1;
      snap(`Partição [${lo}..${hi}]: pivô = ${p} (último elemento).`,{piv:hi,rng:[lo,hi]});
      for(let j=lo;j<hi;j++){
        c++;snap(`Comparar ${a[j]} com o pivô ${p}.`,{cmp:[j],piv:hi,rng:[lo,hi]});
        if(a[j]<p){i++;if(i!==j){[a[i],a[j]]=[a[j],a[i]];w++;snap(`${a[i]} < ${p}: troca posições ${i} e ${j}.`,{wr:[i,j],piv:hi,rng:[lo,hi]})}
          else snap(`${a[j]} < ${p}: já está na posição correta da partição.`,{piv:hi,cmp:[j],rng:[lo,hi]})}
      }
      if(i+1!==hi){[a[i+1],a[hi]]=[a[hi],a[i+1]];w++}
      ok.add(i+1);
      snap(`Pivô ${p} colocado na posição final ${i+1}.`,{wr:[i+1],rng:[lo,hi]});
      qs(lo,i);qs(i+2,hi);
    };
    qs(0,a.length-1);
  }else{
    const n=a.length;
    const ms=(lo,hi)=>{
      if(lo>=hi)return;
      const mid=(lo+hi)>>1;
      snap(`Dividir [${lo}..${hi}] em [${lo}..${mid}] e [${mid+1}..${hi}].`,{rng:[lo,hi]});
      ms(lo,mid);ms(mid+1,hi);
      const L=a.slice(lo,mid+1),R=a.slice(mid+1,hi+1);let i=0,j=0,k=lo;
      const fin=lo===0&&hi===n-1;
      const put=(v,why)=>{a[k]=v;w++;if(fin)ok.add(k);snap(why,{wr:[k],rng:[lo,hi]});k++};
      while(i<L.length&&j<R.length){
        c++;snap(`Intercalar [${lo}..${hi}]: comparar ${L[i]} (esq.) com ${R[j]} (dir.).`,{cmp:[k],rng:[lo,hi]});
        if(L[i]<=R[j])put(L[i++],`Menor é ${a[k]??L[i-1]}: escreve na posição ${k}.`);
        else put(R[j++],`Menor é ${R[j-1]}: escreve na posição ${k}.`);
      }
      while(i<L.length)put(L[i++],`Sobrou da esquerda: copia ${L[i-1]} para ${k}.`);
      while(j<R.length)put(R[j++],`Sobrou da direita: copia ${R[j-1]} para ${k}.`);
    };
    ms(0,n-1);
  }
  for(let i=0;i<a.length;i++)ok.add(i);
  snap('Ordenação concluída!');
  return F;
}

function render(){
  const f=frames[idx],v=$('viz');
  const nm=$('nums');
  if(v.children.length!==f.a.length){v.innerHTML='';nm.innerHTML='';f.a.forEach(()=>{const d=document.createElement('div');d.className='b';v.appendChild(d);nm.appendChild(document.createElement('div'))});
    const w=v.clientWidth/f.a.length;nm.className=w<26?'rot':'';nm.style.fontSize=Math.max(12,Math.min(22,w*0.55))+'px'}
  const okS=new Set(f.ok);
  [...v.children].forEach((d,i)=>{
    d.style.height=(mx===mn?60:10+(f.a[i]-mn)/(mx-mn)*90)+'%';
    let c='b';
    if(okS.has(i))c+=' ok';
    else if(f.piv===i)c+=' piv';
    else if(f.wr.includes(i))c+=' wr';
    else if(f.cmp.includes(i))c+=' cmp';
    else if(f.rng&&(i<f.rng[0]||i>f.rng[1]))c+=' out';
    if(f.wr.includes(i)&&!okS.has(i))c='b wr';
    if(f.cmp.includes(i)&&!okS.has(i)&&f.piv!==i)c='b cmp';
    d.className=c;
    nm.children[i].textContent=f.a[i];nm.children[i].className=c.slice(1).trim();
  });
  $('msg').textContent=f.msg;
  $('sStep').textContent=idx;$('sTot').textContent=frames.length-1;
  $('sCmp').textContent=f.c;$('sWr').textContent=f.w;
  const end=idx>=frames.length-1;
  $('step').disabled=end;
  $('play').disabled=end||!!timer;
  $('pause').disabled=!timer;
}
function stop(){if(timer){clearTimeout(timer);timer=null}}
function delay(){return 1000/Math.pow(1.6,+$('spd').value-1)+30}
function tick(){
  if(idx>=frames.length-1){stop();render();return}
  idx++;render();
  timer=setTimeout(tick,delay());
}
function load(newArr){
  stop();
  if(newArr){base=makeArray();mn=Math.min(...base);mx=Math.max(...base)}
  frames=genFrames(base);idx=0;
  $('info').textContent=INFO[alg][cs]||'Array personalizado definido por você: o tempo depende da ordem dos valores informados.';
  $('viz').innerHTML='';render();
}
$('play').onclick=()=>{if(timer||idx>=frames.length-1)return;timer=setTimeout(tick,50);render()};
$('pause').onclick=()=>{stop();render()};
$('step').onclick=()=>{stop();if(idx<frames.length-1){idx++}render()};
$('restart').onclick=()=>{stop();idx=0;render()};
$('algs').onclick=e=>{const b=e.target.closest('button');if(!b)return;alg=b.dataset.a;[...$('algs').children].forEach(x=>x.classList.toggle('on',x===b));load(true)};
$('cases').onclick=e=>{const b=e.target.closest('button');if(!b)return;cs=b.dataset.c;N=+$('size').value;$('err').textContent='';[...$('cases').children].forEach(x=>x.classList.toggle('on',x===b));load(true)};
$('size').oninput=e=>{N=+e.target.value;if(cs==='custom'){cs='avg';[...$('cases').children].forEach(x=>x.classList.toggle('on',x.dataset.c==='avg'))}$('sizeV').textContent=N;load(true)};
function applyCustom(){
  const parts=$('custom').value.trim().split(/[\s,;]+/).filter(Boolean),nums=parts.map(Number),err=$('err');
  if(parts.length<2||parts.length>40||nums.some(x=>!Number.isFinite(x)||Math.abs(x)>9999)){err.textContent='Informe de 2 a 40 números (entre -9999 e 9999), separados por vírgula ou espaço.';return}
  err.textContent='';customArr=nums;cs='custom';N=nums.length;
  $('size').value=Math.min(40,Math.max(8,N));$('sizeV').textContent=N;
  [...$('cases').children].forEach(x=>x.classList.remove('on'));
  load(true);
}
$('apply').onclick=applyCustom;
window.addEventListener('resize',()=>{$('viz').innerHTML='';render()});
$('custom').addEventListener('keydown',e=>{if(e.key==='Enter')applyCustom()});
load(true);
