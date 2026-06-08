// Gera um placeholder .glb (caixa estilo "equipamento") para o catálogo 3D.
// Uso: node scripts/gen-placeholder.mjs  -> public/models/placeholder.glb
import { writeFileSync, mkdirSync } from "node:fs";

// dimensões da caixa (x larg, y alt, z prof)
const sx = 0.9, sy = 1.15, sz = 0.9;
const faces = [
  { n: [1, 0, 0],  u: [0, 0, -1], v: [0, 1, 0] },
  { n: [-1, 0, 0], u: [0, 0, 1],  v: [0, 1, 0] },
  { n: [0, 1, 0],  u: [1, 0, 0],  v: [0, 0, -1] },
  { n: [0, -1, 0], u: [1, 0, 0],  v: [0, 0, 1] },
  { n: [0, 0, 1],  u: [1, 0, 0],  v: [0, 1, 0] },
  { n: [0, 0, -1], u: [-1, 0, 0], v: [0, 1, 0] },
];
const pos = [], nor = [], idx = [];
const half = [sx / 2, sy / 2, sz / 2];
faces.forEach((f, fi) => {
  const c = f.n.map((k, i) => k * half[i]);
  const signs = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (const [su, sv] of signs) {
    for (let i = 0; i < 3; i++) {
      pos.push(c[i] + (f.u[i] * su + f.v[i] * sv) * half[i]);
      nor.push(f.n[i]);
    }
  }
  const o = fi * 4;
  idx.push(o, o + 1, o + 2, o, o + 2, o + 3);
});

// buffers binários
const indices = new Uint16Array(idx);
const positions = new Float32Array(pos);
const normals = new Float32Array(nor);
const pad4 = (n) => (n + 3) & ~3;
const idxLen = pad4(indices.byteLength);
const posOff = idxLen, posLen = positions.byteLength;
const norOff = posOff + posLen, norLen = normals.byteLength;
const binLen = pad4(norOff + norLen);
const bin = new Uint8Array(binLen);
bin.set(new Uint8Array(indices.buffer), 0);
bin.set(new Uint8Array(positions.buffer), posOff);
bin.set(new Uint8Array(normals.buffer), norOff);

// min/max das posições
const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < positions.length; i += 3)
  for (let k = 0; k < 3; k++) {
    min[k] = Math.min(min[k], positions[i + k]);
    max[k] = Math.max(max[k], positions[i + k]);
  }

const gltf = {
  asset: { version: "2.0", generator: "calicolors-placeholder" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "Placeholder" }],
  meshes: [{ primitives: [{ attributes: { POSITION: 1, NORMAL: 2 }, indices: 0, material: 0 }] }],
  materials: [{
    name: "Gold",
    pbrMetallicRoughness: { baseColorFactor: [0.79, 0.63, 0.37, 1], metallicFactor: 0.35, roughnessFactor: 0.45 },
    doubleSided: true,
  }],
  buffers: [{ byteLength: binLen }],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: indices.byteLength, target: 34963 },
    { buffer: 0, byteOffset: posOff, byteLength: posLen, target: 34962 },
    { buffer: 0, byteOffset: norOff, byteLength: norLen, target: 34962 },
  ],
  accessors: [
    { bufferView: 0, componentType: 5123, count: indices.length, type: "SCALAR" },
    { bufferView: 1, componentType: 5126, count: positions.length / 3, type: "VEC3", min, max },
    { bufferView: 2, componentType: 5126, count: normals.length / 3, type: "VEC3" },
  ],
};

// monta o container GLB
const enc = new TextEncoder();
let json = enc.encode(JSON.stringify(gltf));
const jsonPad = pad4(json.length) - json.length;
const jsonChunk = new Uint8Array(json.length + jsonPad).fill(0x20);
jsonChunk.set(json, 0);

const total = 12 + 8 + jsonChunk.length + 8 + bin.length;
const out = new Uint8Array(total);
const dv = new DataView(out.buffer);
let p = 0;
dv.setUint32(p, 0x46546c67, true); p += 4; // 'glTF'
dv.setUint32(p, 2, true); p += 4;          // version
dv.setUint32(p, total, true); p += 4;      // total length
dv.setUint32(p, jsonChunk.length, true); p += 4;
dv.setUint32(p, 0x4e4f534a, true); p += 4; // 'JSON'
out.set(jsonChunk, p); p += jsonChunk.length;
dv.setUint32(p, bin.length, true); p += 4;
dv.setUint32(p, 0x004e4942, true); p += 4; // 'BIN\0'
out.set(bin, p);

mkdirSync(new URL("../public/models/", import.meta.url), { recursive: true });
writeFileSync(new URL("../public/models/placeholder.glb", import.meta.url), out);
console.log(`placeholder.glb gerado (${out.length} bytes)`);
