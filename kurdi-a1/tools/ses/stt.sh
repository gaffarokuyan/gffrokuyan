#!/bin/bash
# Bir mp3'ü ElevenLabs Scribe ile Kurmancî olarak yazıya döker (kelime zamanlarıyla) → <dosya>.json
# Kullanım: bash stt.sh aB1   (aB1.mp3 → aB1.json)
f=$1; H=(); [ -n "$ELEVENLABS_API_KEY" ] && H=(-H "xi-api-key: $ELEVENLABS_API_KEY")
curl -sS -X POST https://api.elevenlabs.io/v1/speech-to-text "${H[@]}" -F model_id=scribe_v1 -F language_code=kmr -F timestamps_granularity=word -F file=@$f.mp3 -o $f.json
python3 -c "import json;print('$f', json.load(open('$f.json'))['text'])"
