# Uzun grup kaydını sessizliklerden, beklenen kelime sayılarına göre (dinamik programlama) satırlara böler → audio/<id>.mp3
# Kullanım: python3 align.py <episode.js> <audio klasörü> aB1 aR1 ...
import json,re,sys,subprocess,os,split
P=json.load(open('prompts.json'))
EP=None
def kuwords(id):
    l=[x for x in SEQ if x['id']==id][0]
    src=l.get('ku') or l.get('txt') or re.sub(r'\[.*?\]','',l.get('tts',''))
    t=re.sub(r'[*!?.,…—:"]',' ',src); return len(t.split())
import subprocess as sp
SEQ=json.loads(sp.run(['node','-e',"const fs=require('fs'),vm=require('vm');const w={};vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),{window:w,location:{search:''}});console.log(JSON.stringify(w.EP.seq.filter(l=>l.who)))",sys.argv[1]],capture_output=True,text=True).stdout)
A=sys.argv[2]; os.makedirs(A,exist_ok=True)
for key in sys.argv[3:]:
    k=key[:2]; ids=P[k]['ids']; d=json.load(open(key+'.json'))
    W=[w for w in d['words'] if w['type']=='word']
    s,dur=split.sil(key+'.mp3')
    tail=[x for x in s if x[1]>=dur-0.02]; end=tail[0][0] if tail else dur
    cand=[x for x in s if x[0]>0.05 and x[1]<dur-0.02]
    exp=[kuwords(i) for i in ids]; n=len(ids)
    # words before each candidate
    cb=[sum(1 for w in W if w['end']<=(a+b)/2) for a,b in cand]
    INF=1e9; import functools
    @functools.lru_cache(None)
    def best(j,ci):  # j lines placed, last cut index ci (-1 start)
        prev=0 if ci<0 else cb[ci]
        if j==n-1: return (abs(len(W)-prev-exp[j]),())
        r=(INF,())
        for c in range(ci+1,len(cand)):
            seg=cb[c]-prev; cost=abs(seg-exp[j])+0.3/ (cand[c][1]-cand[c][0])*0.1
            if seg<=0: continue
            sub=best(j+1,c)
            if cost+sub[0]<r[0]: r=(cost+sub[0],(c,)+sub[1])
        return r
    cost,cuts=best(0,-1)
    segs=[];a=0
    for c in cuts: segs.append((a,cand[c][0])); a=cand[c][1]
    segs.append((a,end))
    print(f'{key} cost={cost:.2f}')
    for i,(x,y) in zip(ids,segs):
        txt=' '.join(w['text'] for w in W if x-0.05<=w['start']<y+0.05)
        print(f'   {i} {y-x:.2f}s  {txt}')
        x0=max(0,x-0.06); y0=min(dur,y+0.10); L=y0-x0
        subprocess.run(['ffmpeg','-y','-v','error','-ss',str(x0),'-t',str(L),'-i',key+'.mp3','-af',f'afade=t=in:d=0.03,afade=t=out:st={L-0.07}:d=0.07','-ar','44100','-b:a','160k',A+'/'+i+'.mp3'],check=True)
