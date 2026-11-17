# prompts.json içindeki grupları ElevenLabs ile seslendirir → <anahtar><deneme>.mp3
# Kullanım: python3 gen.py [aB,aR,...] [deneme_no]
# API anahtarı: ELEVENLABS_API_KEY ortam değişkeni (yoksa ağ proxy'sinin eklediği varsayılır)
import json,subprocess,sys,os
from concurrent.futures import ThreadPoolExecutor
P=json.load(open('prompts.json')); V={'B':'9UoAU5im7Rl44J2IvBHU','R':'aB3kjBYXGX3jTKxg1bsE'}
keys=[k for k in P if len(sys.argv)<2 or k in sys.argv[1].split(',')]
take=sys.argv[2] if len(sys.argv)>2 else '1'
def go(k):
    body=json.dumps({'text':P[k]['prompt'],'model_id':'eleven_v4'})
    r=subprocess.run(['curl','-sS','-o',f'{k}{take}.mp3','-w','%{http_code}','-X','POST',f'https://api.elevenlabs.io/v1/text-to-speech/{V[k[1]]}?output_format=mp3_44100_128','-H','Content-Type: application/json',*(['-H','xi-api-key: '+os.environ['ELEVENLABS_API_KEY']] if os.environ.get('ELEVENLABS_API_KEY') else []),'-d',body],capture_output=True,text=True)
    return k,r.stdout,r.stderr[:200]
with ThreadPoolExecutor(3) as ex:
    for k,c,e in ex.map(go,keys): print(k,c,e, '' if c=='200' else open(f'{k}{take}.mp3',errors='ignore').read()[:200])
