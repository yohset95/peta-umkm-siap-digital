/*
 * LOGIKA DASHBOARD — Peta UMKM Siap Digital
 * Membaca data dari window.UMKM_DATA (data/data.js) lalu menggambar 4 menu:
 *   1. Ringkasan  2. Peta UMKM  3. Antrean Bantuan  4. Coba Hitung Skor
 * Bagian ditandai dengan komentar "// ---------- NAMA ----------".
 */

(function(){
var D = window.UMKM_DATA;
var N = D.total;
var LV = D.levels;

var COUNT = D.levelCount;
var R = D.rekomendasi;
var P = D.profil;
var G = D.antreanGrup;

function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pct(a,b){return (Math.round(a/b*1000)/10).toLocaleString('id-ID')}
function getPriority(u){

  var priority = 0;

  if(u.nib===false)
      priority += 30;

  if(u.halal===false)
      priority += 20;

  if(u.k && u.k.indexOf('< Rp1 juta') >= 0)
      priority += 25;

  if(u.w===1)
      priority += 15;

  if(u.gamis)
      priority += 40;

  return Math.min(priority,100);
}

// ---------- profil anonim (17 UMKM dari forum musyawarah kelurahan) ----------

/* data 5 RT:

P.forEach(function(u,i){u.code='UMKM '+String(i+1).padStart(2,'0');
    u.rt =
  [
  'RT 01',
  'RT 02',
  'RT 03',
  'RT 04',
  'RT 05'
  ][i % 5];
  u.level=1;u.nib=u.gamis?null:false;});
*/

P.forEach(function(u,i){

    u.code='UMKM '+String(i+1).padStart(2,'0');

    u.rt =
    [
      'RT 01',
      'RT 02',
      'RT 03',
      'RT 04',
      'RT 05',
      'RT 06',
      'RT 07',
      'RT 08',
      'RT 09',
      'RT 10'
    ][i % 10];

    u.level=1;
    u.nib=u.gamis?null:false;

});

// ---------- titik peta (posisi ilustratif) ----------
var seed=7; function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}
var pts=[];
/* data 5 RT:
var RT_ZONES = [

  {
    rt:'RT 01',
    x:20,
    y:20,
    w:220,
    h:180
  },

  {
    rt:'RT 02',
    x:260,
    y:20,
    w:220,
    h:180
  },

  {
    rt:'RT 03',
    x:500,
    y:20,
    w:220,
    h:180
  },

  {
    rt:'RT 04',
    x:140,
    y:300,
    w:220,
    h:180
  },

  {
    rt:'RT 05',
    x:420,
    y:300,
    w:220,
    h:180
  }

];
*/

var RT_ZONES = [

 {rt:'RT 01',x:20,y:20,w:160,h:120},
 {rt:'RT 02',x:200,y:20,w:160,h:120},
 {rt:'RT 03',x:380,y:20,w:160,h:120},
 {rt:'RT 04',x:560,y:20,w:160,h:120},

 {rt:'RT 05',x:20,y:170,w:160,h:120},
 {rt:'RT 06',x:200,y:170,w:160,h:120},
 {rt:'RT 07',x:380,y:170,w:160,h:120},
 {rt:'RT 08',x:560,y:170,w:160,h:120},

 {rt:'RT 09',x:140,y:330,w:220,h:140},
 {rt:'RT 10',x:400,y:330,w:220,h:140}

];
function ok(x,y){ if(Math.abs(x-300)<16||Math.abs(y-280)<15||Math.abs(x-560)<13) return false; for(var i=0;i<pts.length;i++){var q=pts[i]; if((q.x-x)*(q.x-x)+(q.y-y)*(q.y-y)<380) return false;} return true; }
var levels=[]; for(var i=0;i<COUNT[4];i++)levels.push(4); for(i=0;i<COUNT[3];i++)levels.push(3); for(i=0;i<COUNT[1];i++)levels.push(1);
for(i=levels.length-1;i>0;i--){var j=Math.floor(rnd()*(i+1));var t=levels[i];levels[i]=levels[j];levels[j]=t;}
var pi=0;
levels.forEach(function(lv,idx){
  // var x,y,n=0; do{x=30+rnd()*700;y=30+rnd()*500;n++}while(!ok(x,y)&&n<600);
  // var o={id:idx,x:x,y:y,level:lv,prof:null};
  var z =
RT_ZONES.find(function(x){
    return x.rt === P[idx % P.length].rt;
});

if(!z){
    z = RT_ZONES[0];
}

var x,y,n=0;

do{

   x = z.x + 20 +
       rnd()*(z.w-40);

   y = z.y + 20 +
       rnd()*(z.h-40);

   n++;

}
while(!ok(x,y)&&n<600);
  var o={
   id:idx,
   x:x,
   y:y,
   level:lv,
   prof:null,
   rt:getRTFromPoint(x,y)
  };
  if(lv===1 && pi<P.length && rnd()<0.25){o.prof=pi;pi++;}
  pts.push(o);
});
for(i=0;pi<P.length && i<pts.length;i++){ if(pts[i].level===1 && pts[i].prof===null){pts[i].prof=pi;pi++;} }
function countRT(){

   var result={};

   RT_ZONES.forEach(function(z){

      result[z.rt] = 0;

      pts.forEach(function(p){

         if(
            p.x>=z.x &&
            p.x<=z.x+z.w &&
            p.y>=z.y &&
            p.y<=z.y+z.h
         ){
            result[z.rt]++;
         }

      });

   });

   return result;
}

function getRTFromPoint(x, y){

   for(var i=0;i<RT_ZONES.length;i++){

      var z = RT_ZONES[i];

      if(
         x >= z.x &&
         x <= (z.x + z.w) &&
         y >= z.y &&
         y <= (z.y + z.h)
      ){
         return z.rt;
      }

   }

   return 'Di luar zona';

}

// ---------- RINGKASAN ----------
var K=[
  ['UMKM terdata', String(N), D.wilayah, 100, 'var(--accent)'],
  ['Didaftarkan ke e-Peken', String(D.kpi.eRegistered), pct(D.kpi.eRegistered,N)+'%', D.kpi.eRegistered/N*100, 'var(--l3)'],
  ['Produk tayang di e-Peken', String(D.kpi.productLive), pct(D.kpi.productLive,N)+'%', D.kpi.productLive/N*100, 'var(--l4)'],
  ['Pakai media sosial usaha', '±'+D.kpi.socialMediaPct, '%', D.kpi.socialMediaPct, 'var(--accent)'],
  ['Rekomendasi bantuan tercatat', String(D.kpi.recommendations), 'UMKM', D.kpi.recommendations/N*100, 'var(--l1)']
];
document.getElementById('kpis').innerHTML=K.map(function(k){return '<div class="kpi"><span class="t">'+k[0]+'</span><span class="v num">'+k[1]+'<small>'+k[2]+'</small></span><div class="meter"><b style="width:'+k[3]+'%;background:'+k[4]+'"></b></div></div>'}).join('');

document.getElementById('stack').innerHTML=[1,3,4].map(function(l){return '<span style="width:'+(COUNT[l]/N*100)+'%;background:'+LV[l].c+'"></span>'}).join('');
document.getElementById('levels').innerHTML=[1,3,4].map(function(l){return '<div class="lv" style="background:'+LV[l].s+'"><b class="num" style="color:'+LV[l].c+'">'+COUNT[l]+'</b><span>'+LV[l].short+' · '+LV[l].name+'</span><em>'+LV[l].d+'</em></div>'}).join('');

function bars(id, rows, max, color){
  document.getElementById(id).innerHTML=rows.map(function(f){return '<div class="fr"><span>'+f[0]+'</span><div class="b"><b style="width:'+(f[1]/max*100)+'%;'+(color?'background:'+color:'')+'"></b></div><span class="n num">'+f[2]+'</span></div>'}).join('');
}
bars('funnel',D.funnel.map(function(f){return [f[0],f[1],String(f[1])]}),N);
bars('digital',D.digital,100,'var(--l2)');
var jmax=Math.max.apply(null,D.jenisUsaha.map(function(j){return j[1]}));
bars('jenis',D.jenisUsaha.map(function(j){return [j[0],j[1],String(j[1])]}),jmax*1.1);

(function(){
  var data=D.tahunMulai;
  var top=Math.max.apply(null,data.map(function(d){return d[1]}));
  var W=680,H=240,pl=34,pr=10,pt=24,pb=34,max=Math.ceil(top*1.1/5)*5;
  var iw=W-pl-pr, ih=H-pt-pb, bw=iw/data.length*0.6;
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Jumlah UMKM menurut tahun mulai usaha">';
  var ticks=[];for(var tv=0;tv<=max;tv+=Math.max(5,Math.ceil(max/4/5)*5))ticks.push(tv);
  ticks.forEach(function(v){var y=pt+ih-v/max*ih;s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" stroke="var(--line)" stroke-width="1"/><text x="'+(pl-8)+'" y="'+(y+4)+'" text-anchor="end">'+v+'</text>';});
  data.forEach(function(d,i){var cx=pl+iw/data.length*(i+.5);var h=d[1]/max*ih;var y=pt+ih-h;
    s+='<rect x="'+(cx-bw/2)+'" y="'+y+'" width="'+bw+'" height="'+h+'" rx="5" fill="'+(d[0]===D.tahunHighlight?'var(--l4)':'var(--accent)')+'"/>';
    s+='<text class="val" x="'+cx+'" y="'+(y-7)+'" text-anchor="middle">'+d[1]+'</text><text x="'+cx+'" y="'+(H-10)+'" text-anchor="middle">'+d[0]+'</text>';});
  document.getElementById('chart').innerHTML=s+'</svg>';
})();

(function(){

  var data = D.monitoring;

  var top = Math.max.apply(
      null,
      data.map(function(d){ return d[1]; })
  );

  var W=680,
      H=220,
      pl=40,
      pr=20,
      pt=20,
      pb=40;

  var iw=W-pl-pr;
  var ih=H-pt-pb;

  var s='<svg viewBox="0 0 '+W+' '+H+'">';

  data.forEach(function(d,i){

      var x =
        pl +
        (iw/(data.length-1))*i;

      var y =
        pt +
        ih -
        (d[1]/top)*ih;

      if(i===0){

          s +=
          '<circle cx="'+x+'" cy="'+y+'" r="5" fill="var(--l4)"/>';

      }else{

          var px =
            pl +
            (iw/(data.length-1))*(i-1);

          var py =
            pt +
            ih -
            (data[i-1][1]/top)*ih;

          s +=
          '<line x1="'+px+'" y1="'+py+
          '" x2="'+x+'" y2="'+y+
          '" stroke="var(--l4)" stroke-width="3"/>';

          s +=
          '<circle cx="'+x+'" cy="'+y+
          '" r="5" fill="var(--l4)"/>';
      }

      s +=
      '<text class="val" x="'+x+
      '" y="'+(y-10)+
      '" text-anchor="middle">'+
      d[1]+'</text>';

      s +=
      '<text x="'+x+
      '" y="'+(H-10)+
      '" text-anchor="middle">'+
      d[0]+'</text>';

  });

  s += '</svg>';

  document.getElementById(
      'progressChart'
  ).innerHTML = s;

  var conversion =
   (
      D.kpi.productLive /
      D.kpi.eRegistered
   ) * 100;

  document.getElementById(
    'impactMetrics'
  ).innerHTML =

  '<div class="impact-grid">'+

    '<div class="impact-card">'+
        '<span>UMKM yang Didaftarkan di e-Peken</span>'+
        '<b class="num">'+D.kpi.eRegistered+'</b>'+
    '</div>'+

    '<div class="impact-card">'+
        '<span>UMKM Aktif di e-Peken</span>'+
        '<b class="num">'+D.kpi.productLive+'</b>'+
    '</div>'+

    '<div class="impact-card">'+
        '<span>Conversion Rate</span>'+
        '<b class="num">'+conversion.toFixed(1)+'%</b>'+
    '</div>'+

  '</div>';

})();

// ---------- PETA ----------
var lvOn={1:true,3:true,4:true}; var sel=null;
function mapSvg(){
  var xs=[16,150,318,440,574,744], ys=[16,140,296,420,544];
  var s='<svg viewBox="0 0 760 560" role="group" aria-label="Peta UMKM"><rect width="760" height="560" fill="var(--map-ground)"/>';
  for(var i=0;i<xs.length-1;i++)for(var j=0;j<ys.length-1;j++){var park=(i===1&&j===1);s+='<rect x="'+(xs[i]+8)+'" y="'+(ys[j]+8)+'" width="'+(xs[i+1]-xs[i]-16)+'" height="'+(ys[j+1]-ys[j]-16)+'" rx="10" fill="'+(park?'var(--map-park)':'var(--map-block)')+'"/>';}
  s+='<path d="M300 0V560M0 280H760M560 0V560" stroke="var(--map-road)" stroke-width="20" fill="none"/><path d="M0 140C200 130 400 160 760 140M0 420C250 410 480 432 760 412" stroke="var(--map-road)" stroke-width="9" fill="none"/>';
  s+='<text class="maplabel" x="316" y="272">JALAN UTAMA</text><text class="maplabel" x="176" y="214">TAMAN</text>';  
  var rtCount = countRT();

RT_ZONES.forEach(function(z){

   var total = rtCount[z.rt];

   var color =
      total >= 8 ? 'rgba(255,99,99,.18)' :
      total >= 5 ? 'rgba(255,200,70,.18)' :
                   'rgba(79,209,165,.18)';

   s +=

   '<rect '+
   'x="'+z.x+'" '+
   'y="'+z.y+'" '+
   'width="'+z.w+'" '+
   'height="'+z.h+'" '+
   'rx="12" '+
   'fill="'+color+'" '+
   'stroke="rgba(255,255,255,.15)"/>'+

   '<text class="rt-label" '+
   'x="'+(z.x+10)+'" '+
   'y="'+(z.y+22)+'">'+
   z.rt+
   '</text>'+

   '<text class="rt-count" '+
   'x="'+(z.x+10)+'" '+
   'y="'+(z.y+44)+'">'+
   total+' UMKM'+
   '</text>';

});
  pts.filter(function(p){return lvOn[p.level]}).forEach(function(p){
    var on=(sel===p.id), hasP=(p.prof!==null);
    s+='<g class="pin'+(on?' on':'')+'" data-id="'+p.id+'" tabindex="0" role="button" aria-label="'+(hasP?P[p.prof].code+', ':'UMKM, ')+LV[p.level].name+'"><circle class="halo" cx="'+p.x+'" cy="'+p.y+'" r="16" fill="'+LV[p.level].c+'"/><circle class="dot'+(hasP?' prof':'')+'" cx="'+p.x+'" cy="'+p.y+'" r="'+(on?9:(hasP?7:5))+'" fill="'+LV[p.level].c+'"/></g>';
  });
  return s+'</svg>';
}
function renderMap(){
  var m=document.getElementById('map'); m.innerHTML=mapSvg();
  m.querySelectorAll('.pin').forEach(function(g){
    var pick=function(){sel=+g.getAttribute('data-id');renderMap();renderProfile()};
    g.addEventListener('click',pick);
    g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}});
  });
}
function renderFilter(){
  document.getElementById('lvFilter').innerHTML=[1,3,4].map(function(l){return '<button class="chip" aria-pressed="'+lvOn[l]+'" data-l="'+l+'"><i style="background:'+LV[l].c+'"></i>'+LV[l].short+' · '+LV[l].name+' <span class="c num">'+COUNT[l]+'</span></button>'}).join('');
  document.querySelectorAll('#lvFilter .chip').forEach(function(b){b.addEventListener('click',function(){var l=+b.getAttribute('data-l');lvOn[l]=!lvOn[l];renderFilter();renderMap()})});
}

function renderRTSummary(){

   var el =
      document.getElementById('rtSummary');

   if(!el){
      return;
   }

   var stat={};

   P.forEach(function(u){
      stat[u.rt]=(stat[u.rt]||0)+1;
   });

   el.innerHTML =

      '<div class="rt-grid">'+

      Object.keys(stat)
      .map(function(rt){

         return '<div class="rt-card">'+
                   '<span>'+rt+'</span>'+
                   '<b>'+stat[rt]+'</b>'+
                   '<small>UMKM</small>'+
                '</div>';

      }).join('')

      +

      '</div>';

}

function yn(v){return v===null||v===undefined?'<span class="unk">Tidak dipublikasikan</span>':(v?'<span class="yes">Ada</span>':'<span class="no">Belum</span>')}
function profHtml(u){
  var L=LV[u.level];
  var priority = getPriority(u);
  var priorityLabel;

  if(priority >= 80)
      priorityLabel = 'Sangat Tinggi';
  else if(priority >= 60)
      priorityLabel = 'Tinggi';
  else if(priority >= 40)
      priorityLabel = 'Sedang';
  else
      priorityLabel = 'Rendah';
  return '<div class="ph"><h2>Profil UMKM</h2><span class="sub">dianonimkan</span></div>'+
  '<div class="prof-head"><div class="avatar" style="background:'+L.c+'">'+esc(u.p.charAt(0))+'</div><div><h3>'+esc(u.code)+' · '+esc(u.p)+'</h3><p>'+esc(u.rt)+' · '+(u.y ?'Mulai usaha '+u.y+' · '+u.w+' pekerja':'Prioritas sosial (keluarga miskin)')+'</p><p>'+(u.y?'Mulai usaha '+u.y+' · '+u.w+' pekerja':'Prioritas sosial (keluarga miskin)')+'</p></div></div>'+
  '<div><span class="badge" style="background:'+L.s+';color:'+L.c+'">'+L.short+' · '+L.name+'</span></div>'+
  '<div class="priority">'+'<span>Priority Index</span>'+'<b class="num">'+priority+'</b>'+'<small>'+priorityLabel+'</small>'+'</div>'+
  '<div class="checks"><div><span>NIB</span>'+yn(u.nib)+'</div><div><span>QRIS</span>'+yn(u.qris)+'</div><div><span>Sertifikat halal</span>'+yn(u.halal)+'</div><div><span>Akun e-Peken</span>'+(u.gamis?'<span class="unk">Tidak dipublikasikan</span>':'<span class="no">Belum</span>')+'</div><div><span>Keuntungan bersih/bulan</span><span>'+esc(u.k)+'</span></div></div>'+
  '<div class="rec"><small>Rekomendasi forum musyawarah</small>'+u.r.map(function(k){return '<b>'+R[k].t+'</b><span>→ '+R[k].to+'</span>'}).join('')+'</div>';
}
function renderProfile(){
  var box=document.getElementById('profile');
  var p=pts.find(function(x){return x.id===sel});
  if(!p){box.innerHTML='<div class="ph"><h2>Profil UMKM</h2></div><p class="prof-empty">Ketuk titik bergaris tepi di peta untuk melihat profil dan rekomendasi bantuannya.</p>';return;}
  if(p.prof===null){var L=LV[p.level];box.innerHTML='<div class="ph"><h2>UMKM RW 05</h2></div><div><span class="badge" style="background:'+L.s+';color:'+L.c+'">'+L.short+' · '+L.name+'</span></div><p class="prof-empty" style="text-align:left;padding:8px 0">'+L.d+'. Rincian profil UMKM ini tersimpan di data internal kelurahan dan tidak ditampilkan di dashboard publik.</p>';return;}
  if(p.prof !== null){
   P[p.prof].rt = p.rt;
  }
  box.innerHTML=profHtml(P[p.prof]);
}

// ---------- ANTREAN ----------

document.getElementById('qGroups').innerHTML=G.map(function(g){return '<div class="kpi"><span class="t">'+g.to+'</span><span class="v num">'+g.n+'<small>UMKM</small></span><span class="t">'+g.t+'</span></div>'}).join('');
var AG=['Semua','DPMPTSP','Dinkopdag','Kelurahan','Baznas Kota Surabaya']; var agSel='Semua'; var done={};
// lama: var Q=P.map(function(u){return {code:u.code,p:u.p,level:u.level,items:u.r.map(function(k){return R[k]})}});
var Q=P.map(function(u){

   return {
      code:u.code,
      p:u.p,
      level:u.level,
      priority:getPriority(u),
      items:u.r.map(function(k){
          return R[k]
      })
   };

});
// lama: D.antreanKelompok.forEach(function(g){Q.push(g)});
//D.antreanKelompok.forEach(function(g){

//   g.priority = 10;

//   Q.push(g);

//});

function renderQueue(){

  document.getElementById('qFilter').innerHTML =
    AG.map(function(a){

      return '<button class="fbtn" '+
      'aria-pressed="'+(a===agSel)+'" '+
      'data-a="'+a+'">'+a+'</button>';

    }).join('');

  document.querySelectorAll('#qFilter .fbtn')
    .forEach(function(b){

      b.addEventListener('click',function(){

        agSel=b.getAttribute('data-a');

        renderQueue();

      });

    });

  var list = Q
    .filter(function(q){

      return agSel==='Semua' ||

      q.items.some(function(i){

        return i.to===agSel;

      });

    })
    .sort(function(a,b){

      return (b.priority||0) -
             (a.priority||0);

    });

  document.getElementById('queue').innerHTML =

    list.map(function(q){

      var key = q.code;

      var its =
        q.items.filter(function(i){

          return agSel==='Semua'
                 || i.to===agSel;

        });

      return '<div class="qi">' +

      '<div class="lvdot num" '+
      'style="background:'+LV[q.level].c+'">' +
      (q.level===1?'1–2':q.level) +
      '</div>' +

      '<div style="min-width:0">' +

      '<h3>'+esc(q.code)+' · '+esc(q.p)+'</h3>' +

      '<p style="margin-top:4px">' +
      'Priority Index: '+
      '<b class="num">'+(q.priority||0)+
      '</b></p>' +

      '<div class="tags">' +

      its.map(function(i){

        return '<span class="tag">'+
               esc(i.t)+
               ' <em>→ '+esc(i.to)+
               '</em></span>';

      }).join('') +

      '</div></div>' +

      '<div class="side">' +

      '<button class="act'+
      (done[key]?' done':'')+
      '" data-k="'+esc(key)+'">' +

      (done[key]
         ? 'Ditandai'
         : 'Tandai ditindak') +

      '</button></div></div>';

    }).join('');

  document
    .querySelectorAll('#queue .act')
    .forEach(function(b){

      b.addEventListener('click',function(){

        var k=b.getAttribute('data-k');

        done[k]=!done[k];

        renderQueue();

      });

    });

}

// ---------- SIMULASI ----------
// lama: var sim={nib:false,rek:true,halal:false,npwp:false,epeken:true,tayang:false,medsos:false,pelatihan:false,pameran:false,gamis:false,kuliner:true};
var sim={
  nib:false,
  rek:true,
  qris:false,
  halal:false,
  npwp:false,
  epeken:true,tayang:false,medsos:false,pelatihan:false,pameran:false,gamis:false,kuliner:true};
// lama: var LBL={nib:'Punya NIB',rek:'Rekening aktif',halal:'Sertifikat halal',npwp:'Punya NPWP',epeken:'Terdaftar e-Peken / marketplace',tayang:'Produk tayang / bertransaksi',medsos:'Pakai media sosial usaha',pelatihan:'Pernah ikut pelatihan',pameran:'Pernah ikut pameran'};
var LBL={
  nib:'Punya NIB',
  rek:'Rekening aktif',
  qris:'Sudah memiliki QRIS',
  halal:'Sertifikat halal',
  npwp:'Punya NPWP',
  epeken:'Terdaftar e-Peken / marketplace',
  tayang:'Produk tayang / bertransaksi',
  medsos:'Pakai media sosial usaha',
  pelatihan:'Pernah ikut pelatihan',
  pameran:'Pernah ikut pameran'
};
var TL=Object.keys(D.bobotLegalitas).map(function(k){return [k,LBL[k]||k,'bobot '+D.bobotLegalitas[k]]});
var TD=Object.keys(D.bobotDigital).map(function(k){return [k,LBL[k]||k,'bobot '+D.bobotDigital[k]]});
var TS=[['kuliner','Usaha makanan/minuman','perlu sertifikat halal'],['gamis','Keluarga miskin (data Gamis)','prioritas bantuan sosial']];
var LW=D.bobotLegalitas, DW=D.bobotDigital;
function tg(arr){return arr.map(function(t){return '<label class="tg" for="s-'+t[0]+'"><span>'+t[1]+'<em>'+t[2]+'</em></span><input type="checkbox" id="s-'+t[0]+'" data-k="'+t[0]+'" '+(sim[t[0]]?'checked':'')+'></label>'}).join('')}
function simOut(){
  var sl=0,sd=0,k; for(k in LW) if(sim[k]) sl+=LW[k]; for(k in DW) if(sim[k]) sd+=DW[k];
  // Total skor gabungan
  var totalScore = Math.round((sl + sd) / 2);
  var lv;

  if(totalScore <= 25){
      lv = 1;
  }
  else if(totalScore <= 50){
      lv = 2;
  }
  else if(totalScore <= 75){
      lv = 3;
  }
  else{
      lv = 4;
  }
  // var lv = !sim.epeken ? (sim.nib?2:1) : (sim.tayang?4:3);
  var names={1:'Belum Formal',2:'Formal Dasar',3:'Didaftarkan e-Peken',4:'Aktif di e-Peken'};
  var col={1:['var(--l1)','var(--l1s)'],2:['var(--l2)','var(--l2s)'],3:['var(--l3)','var(--l3s)'],4:['var(--l4)','var(--l4s)']};
  var recs=[];
  if(sim.gamis) recs.push(R.rombong);
  if(!sim.nib) recs.push(R.nib);
  if(sim.kuliner && !sim.halal) recs.push(R.halal);
  if(!sim.rek) recs.push({t:'Pembukaan rekening (Bank Jatim)',to:'Bank mitra'});
  if(!sim.qris) recs.push(R.qris);
  if(!sim.epeken) recs.push(R.epeken);
  else if(!sim.tayang) recs.push({t:'Edukasi menayangkan produk di e-Peken',to:'Kelurahan'});
  if(!sim.medsos) recs.push({t:'Pelatihan promosi dan desain logo (Canva)',to:'Kampus / agen statistik'});
  if(!recs.length) recs.push({t:'Pantau transaksi dan omzet bulanan',to:'Dinkopdag'});
  document.getElementById('simOut').innerHTML='<div class="bigl" style="background:'+col[lv][1]+'"><div class="circ num" style="background:'+col[lv][0]+'">'+lv+'</div><div><b>'+names[lv]+'</b><span>Level kesiapan UMKM</span></div></div>'+
  // '<div class="scores"><div class="score"><span class="t">Skor legalitas</span><div class="v num">'+sl+'</div><div class="meter"><b style="width:'+sl+'%;background:var(--l4)"></b></div></div><div class="score"><span class="t">Skor digital</span><div class="v num">'+sd+'</div><div class="meter"><b style="width:'+sd+'%;background:var(--l3)"></b></div></div></div>'+
  '<div class="scores">'+'<div class="score">'+'<span class="t">Skor Legalitas</span>'+'<div class="v num">'+sl+'</div>'+'<div class="meter"><b style="width:'+sl+'%;background:var(--l4)"></b></div>'+'</div>'+'<div class="score">'+'<span class="t">Skor Digital</span>'+
  '<div class="v num">'+sd+'</div>'+
  '<div class="meter"><b style="width:'+sd+'%;background:var(--l3)"></b></div>'+
  '</div>'+

  '<div class="score">'+
  '<span class="t">Skor Total</span>'+
  '<div class="v num">'+totalScore+'</div>'+
  '<div class="meter"><b style="width:'+totalScore+'%;background:var(--accent)"></b></div>'+
  '</div>'+

  '</div>'+
    '<div class="rec"><small>Rekomendasi bantuan berurutan</small>'+recs.slice(0,4).map(function(r){return '<b>'+r.t+'</b><span>→ '+r.to+'</span>'}).join('')+'</div>'+
    '<p class="note">Indikator mengikuti kuesioner pendataan pelaku usaha 2025. Bobot skor adalah usulan awal dan akan disepakati bersama BPS dan Dinkopdag.</p>';
}
document.getElementById('tgL').innerHTML=tg(TL);document.getElementById('tgD').innerHTML=tg(TD);document.getElementById('tgS').innerHTML=tg(TS);
document.querySelectorAll('.tg input').forEach(function(i){i.addEventListener('change',function(){sim[i.getAttribute('data-k')]=i.checked;simOut()})});

// ---------- tabs ----------
var VIEWS=['ringkasan','peta','antrean','simulasi'];
function show(v){ if(VIEWS.indexOf(v)<0) v='ringkasan'; VIEWS.forEach(function(x){document.getElementById('v-'+x).hidden=(x!==v);document.getElementById('t-'+x).setAttribute('aria-selected',x===v)}); }
document.querySelectorAll('.tab').forEach(function(t){t.addEventListener('click',function(){var v=t.getAttribute('data-v');if(location.hash!=='#'+v){location.hash=v}else{show(v)}window.scrollTo({top:0})})});
window.addEventListener('hashchange',function(){show(location.hash.slice(1))});

renderFilter();
//renderRTSummary();
renderMap();
renderProfile();
renderQueue();
simOut();
show(location.hash.slice(1));
})();