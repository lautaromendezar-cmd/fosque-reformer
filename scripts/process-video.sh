#!/usr/bin/env bash
# Procesa los clips crudos de /video-raw/ y deja todo en /public/video/ con los nombres
# que el sitio ya espera (ver components/Pelicula.tsx y components/VideoFondo.tsx).
#
# Para cada clip:
#   - MP4 H.264 + WebM VP9, sin audio, 1080p máximo, apuntando a 2-3 MB
#   - para entrada y hacia-el-sol, además una versión con keyframe por fotograma (-g 1)
#     para el scrub por scroll: <nombre>-scrub.mp4
#   - primer fotograma como póster WebP (<nombre>-poster.webp)
#   - último fotograma como fotograma de empalme (<nombre>-final.webp)
#
# Correr:  npm run video      (o bash scripts/process-video.sh)
# Requiere ffmpeg en el PATH.

set -euo pipefail
cd "$(dirname "$0")/.."

RAW=video-raw
OUT=public/video
mkdir -p "$OUT"

# Bitrate objetivo: ~2,5 MB por clip → 8 s ≈ 2,5 Mb/s, 10 s ≈ 2 Mb/s
bitrate_para() {
  local dur; dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$1")
  python -c "d=float('$dur'); print(int(2.5*8*1000/d))" 2>/dev/null || echo 2000
}

procesar() {
  local nombre=$1 entrada=$2 scrub=${3:-no}
  local kbps; kbps=$(bitrate_para "$entrada")
  echo "→ $nombre (${kbps}k)"

  # MP4 H.264: two-pass no hace falta con crf + maxrate; yuv420p para Safari
  ffmpeg -v error -y -i "$entrada" -an \
    -vf "scale='min(1920,iw)':-2" \
    -c:v libx264 -preset slow -crf 23 -maxrate "${kbps}k" -bufsize "$((kbps*2))k" \
    -pix_fmt yuv420p -movflags +faststart \
    "$OUT/$nombre.mp4"

  # WebM VP9
  ffmpeg -v error -y -i "$entrada" -an \
    -vf "scale='min(1920,iw)':-2" \
    -c:v libvpx-vp9 -b:v "${kbps}k" -crf 33 -row-mt 1 -deadline good -cpu-used 2 \
    "$OUT/$nombre.webm"

  if [ "$scrub" = "scrub" ]; then
    # GOP de 3 fotogramas: cada seek decodifica como mucho 2 cuadros y pesa un tercio que con keyframe por fotograma (16 MB vs 6 MB a 1440 px). Sólo la bajada de escritorio.
    ffmpeg -v error -y -i "$entrada" -an \
      -vf "scale='min(1440,iw)':-2" \
      -c:v libx264 -preset slow -crf 27 -g 3 -keyint_min 1 -sc_threshold 0 \
      -pix_fmt yuv420p -movflags +faststart \
      "$OUT/$nombre-scrub.mp4"
  fi

  # Pósters: primer y último fotograma
  ffmpeg -v error -y -i "$entrada" -frames:v 1 -update 1 -vf "scale='min(1920,iw)':-2" \
    -c:v libwebp -quality 80 "$OUT/$nombre-poster.webp"
  ffmpeg -v error -y -sseof -0.1 -i "$entrada" -frames:v 1 -update 1 -vf "scale='min(1920,iw)':-2" \
    -c:v libwebp -quality 80 "$OUT/$nombre-final.webp"
}

for clip in entrada hacia-el-sol sol-loop reformer-loop materiales-loop; do
  [ -f "$RAW/$clip.mp4" ] || { echo "· falta $RAW/$clip.mp4, salteado"; continue; }
  case $clip in entrada|hacia-el-sol) procesar "$clip" "$RAW/$clip.mp4" scrub ;; *) procesar "$clip" "$RAW/$clip.mp4" ;; esac
  # Las versiones mobile no se scrubbean: se reproducen solas (ver Pelicula.tsx)
  [ -f "$RAW/$clip-mobile.mp4" ] && procesar "$clip-mobile" "$RAW/$clip-mobile.mp4"
done

echo
echo "Empalme entrada → hacia-el-sol (diferencia media por píxel, 0 = idénticos):"
for suf in "" "-mobile"; do
  a="$OUT/entrada$suf-final.webp"; b="$OUT/hacia-el-sol$suf-poster.webp"
  [ -f "$a" ] && [ -f "$b" ] && PYTHONIOENCODING=utf-8 python - "$a" "$b" <<'PY'
import sys
from PIL import Image, ImageChops, ImageStat
a=Image.open(sys.argv[1]).convert("L").resize((320,180)); b=Image.open(sys.argv[2]).convert("L").resize((320,180))
d=ImageStat.Stat(ImageChops.difference(a,b)).mean[0]
print(f"  {sys.argv[1].split('/')[-1]} ↔ {sys.argv[2].split('/')[-1]}: {d:.1f}/255", "(bien)" if d<25 else "(cubrir con fundido)")
PY
done

echo
du -sh "$OUT"/* | sort -k2
