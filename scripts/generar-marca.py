# Regenera lib/marca.generado.ts a partir de public/isotipo.svg y public/logo-lockup.svg
import re, io
def leer(p):
    s=io.open(p,encoding="utf-8").read()
    return re.search(r'viewBox="([^"]+)"',s).group(1), "".join(re.findall(r'<path[^>]*/>',s))
vb1,p1=leer("public/isotipo.svg"); vb2,p2=leer("public/logo-lockup.svg")
io.open("lib/marca.generado.ts","w",encoding="utf-8").write(
"// Generado desde public/isotipo.svg y public/logo-lockup.svg (vectores del manual de marca).\n"
"// No editar a mano: regenerar con scripts/generar-marca.py si cambian los SVG.\n"
f"export const isotipo = {{ viewBox: {vb1!r}, paths: {p1!r} }};\n"
f"export const lockup = {{ viewBox: {vb2!r}, paths: {p2!r} }};\n")
