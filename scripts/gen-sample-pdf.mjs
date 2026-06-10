// Gera um PDF de exemplo (6 páginas) para o flipbook do catálogo.
// node scripts/gen-sample-pdf.mjs -> public/catalogs/exemplo.pdf
import { writeFileSync, mkdirSync } from "node:fs";

const N = 6;
const W = 420, H = 595;
const blen = (s) => Buffer.byteLength(s, "latin1");

function content(i) {
  const n = i + 1;
  return [
    "q",
    "0.96 0.94 0.89 rg", `0 0 ${W} ${H} re f`,
    "0.79 0.63 0.37 rg", `0 ${H - 60} ${W} 60 re f`,
    `BT /F1 26 Tf 0.05 0.04 0.03 rg 40 ${H - 42} Td (CALICOLORS) Tj ET`,
    "BT /F1 16 Tf 0.2 0.18 0.14 rg 40 480 Td (Catalogo de Exemplo) Tj ET",
    `BT /F1 46 Tf 0.1 0.1 0.1 rg 40 300 Td (Pagina ${n}) Tj ET`,
    `BT /F1 14 Tf 0.45 0.42 0.36 rg 40 240 Td (de ${N}) Tj ET`,
    "BT /F1 12 Tf 0.4 0.4 0.4 rg 40 60 Td (Substitua este PDF pelo catalogo real) Tj ET",
    "Q",
  ].join("\n");
}

// monta objetos
const objs = {};
objs[1] = "<< /Type /Catalog /Pages 2 0 R >>";
objs[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
const kids = [];
for (let i = 0; i < N; i++) {
  const pageNum = 4 + i * 2;
  const contNum = 5 + i * 2;
  kids.push(`${pageNum} 0 R`);
  objs[pageNum] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contNum} 0 R >>`;
  const c = content(i);
  objs[contNum] = `<< /Length ${blen(c)} >>\nstream\n${c}\nendstream`;
}
objs[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${N} >>`;

const maxObj = 3 + N * 2;
let pdf = "%PDF-1.4\n";
const offsets = [];
for (let n = 1; n <= maxObj; n++) {
  offsets[n] = blen(pdf);
  pdf += `${n} 0 obj\n${objs[n]}\nendobj\n`;
}
const xrefStart = blen(pdf);
pdf += `xref\n0 ${maxObj + 1}\n0000000000 65535 f \n`;
for (let n = 1; n <= maxObj; n++) {
  pdf += String(offsets[n]).padStart(10, "0") + " 00000 n \n";
}
pdf += `trailer\n<< /Size ${maxObj + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

mkdirSync(new URL("../public/catalogs/", import.meta.url), { recursive: true });
writeFileSync(new URL("../public/catalogs/exemplo.pdf", import.meta.url), Buffer.from(pdf, "latin1"));
console.log(`exemplo.pdf gerado (${blen(pdf)} bytes, ${N} paginas)`);
