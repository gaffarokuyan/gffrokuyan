import subprocess,re,sys,json
P=json.load(open('prompts.json'))
def sil(f):
    o=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','silencedetect=noise=-35dB:d=0.2','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',o)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',o)]
    d=float(re.search(r'Duration: (\d+):(\d+):([\d.]+)',o).group(3))
    return list(zip(st,en)),d
def plan(key,take):
    f=f'{key}{take}.mp3'; ids=P[key]['ids']; s,d=sil(f)
    inner=[x for x in s if x[0]>0.05 and x[1]<d-0.02]
    inner.sort(key=lambda x:x[0]-x[1]); cuts=sorted(inner[:len(ids)-1]); rest=inner[len(ids)-1:]
    mn=min(b-a for a,b in cuts) if cuts else 0; mx=max([b-a for a,b in rest],default=0)
    segs=[];a=0
    for (x,y) in cuts: segs.append((a,x)); a=y
    end=d
    tail=[x for x in s if x[1]>=d-0.02]
    if tail: end=tail[0][0]
    segs.append((a,end))
    return ids,segs,mn,mx,d
if __name__=='__main__':
    for arg in sys.argv[1:]:
        key,take=arg[:2],arg[2]
        ids,segs,mn,mx,d=plan(key,take)
        print(arg,'dur',d,'minCut %.2f maxOther %.2f'%(mn,mx),' '.join('%s:%.2f'%(i,b-a) for i,(a,b) in zip(ids,segs)))
