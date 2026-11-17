// Bölümün episode.js dosyasındaki tts metinlerini sahne+konuşmacı bazında gruplar → prompts.json
// Kullanım: node prep.js <bölüm>
const fs=require('fs'),vm=require('vm'),path=require('path');const ep=process.argv[2];const w={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','..','episodes',ep,'episode.js'),'utf8'),{window:w,location:{search:''}});
const g={};for(const l of w.EP.seq)if(l.tts){const k=l.id[0]+l.who;(g[k]||=[]).push(l)}
const o={};for(const k in g)o[k]={ids:g[k].map(l=>l.id),prompt:g[k].map(l=>l.tts).join(' [long pause] ')};
const V=w.EP.vocabTts;if(V){o.vB={ids:V.ku.map((_,i)=>`v${String(i+1).padStart(2,'0')}k`),prompt:V.ku.map(x=>x+'.').join(' [long pause] ')};o.vR={ids:V.tr.map((_,i)=>`v${String(i+1).padStart(2,'0')}t`),prompt:V.tr.map(x=>x[0].toLocaleUpperCase('tr')+x.slice(1)+'.').join(' [long pause] ')};}
fs.writeFileSync('prompts.json',JSON.stringify(o,null,1));console.log(Object.keys(o).map(k=>k+':'+o[k].ids.length).join(' '), Object.values(o).reduce((a,x)=>a+x.prompt.length,0),'chars');
