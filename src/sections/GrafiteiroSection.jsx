import React, { useState } from "react";

const DISPLAY = "'Bodoni Moda', serif";
const SANS = "Archivo, sans-serif";
const GOLD = "#c9a25e";

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const rand = (min, max) => min + Math.random() * (max - min);

// Bias presets shift the base hue range and saturation/lightness feel.
const VIBES = {
  Neon: { hue: [120, 320], sat: [85, 100], light: [50, 62] },
  "Pôr do sol": { hue: [0, 55], sat: [78, 96], light: [48, 66] },
  Favela: { hue: [10, 200], sat: [70, 95], light: [42, 60] },
  Vaporwave: { hue: [180, 320], sat: [70, 92], light: [56, 72] },
};

function generatePalette(vibeKey) {
  const vibe = VIBES[vibeKey] || VIBES.Neon;
  const base = rand(vibe.hue[0], vibe.hue[1]);
  // Offsets to spread hues across the chosen vibe while staying cohesive.
  const offsets = [0, 28, -34, 160, 200];
  return offsets.map((off, i) => {
    const h = base + off + rand(-8, 8);
    const s = rand(vibe.sat[0], vibe.sat[1]);
    // Stagger lightness so palette has both punchy and deeper tones.
    const lBase = vibe.light[0] + ((vibe.light[1] - vibe.light[0]) * i) / 4;
    const l = lBase + rand(-6, 6);
    return hslToHex(h, s, l).toUpperCase();
  });
}

const S = {
  section: { position: "relative", zIndex: 5, padding: "96px 5vw" },
  inner: { maxWidth: 1100, margin: "0 auto" },
  tagline: {
    fontFamily: SANS,
    fontSize: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: GOLD,
    textAlign: "center",
    marginBottom: 12,
  },
  h2: {
    fontFamily: DISPLAY,
    fontSize: "clamp(32px,5vw,64px)",
    textAlign: "center",
    color: "#fff",
    margin: "0 0 14px",
    fontWeight: 500,
  },
  note: {
    fontFamily: SANS,
    color: "#cfc6b6",
    fontSize: 14,
    marginBottom: 36,
    textAlign: "center",
  },
  card: {
    background: "#0c0a08aa",
    border: "1px solid #ffffff1a",
    borderRadius: 20,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "clamp(20px,4vw,36px)",
  },
  btnPrimary: {
    background: GOLD,
    color: "#0c0a08",
    padding: "13px 24px",
    borderRadius: 8,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: 700,
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: SANS,
    display: "inline-block",
  },
  btnGhost: {
    border: "1px solid #ffffff44",
    color: "#ece6db",
    padding: "13px 24px",
    borderRadius: 8,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: 700,
    textTransform: "uppercase",
    background: "transparent",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: SANS,
    display: "inline-block",
  },
  subhead: {
    fontFamily: DISPLAY,
    fontSize: "clamp(22px,3vw,32px)",
    color: "#ece6db",
    fontWeight: 500,
    margin: "0 0 8px",
    textAlign: "center",
  },
};

// Six varied gradients for the placeholder magazine covers.
const COVER_GRADIENTS = [
  "linear-gradient(135deg,#e0479e,#7b2ff7)",
  "linear-gradient(135deg,#00d2ff,#3a47d5)",
  "linear-gradient(135deg,#f7971e,#ffd200)",
  "linear-gradient(135deg,#11998e,#38ef7d)",
  "linear-gradient(135deg,#fc466b,#3f5efb)",
  "linear-gradient(135deg,#c9a25e,#5b3a1a)",
];

export default function GrafiteiroSection({ whatsapp }) {
  const [vibe, setVibe] = useState("Neon");
  const [palette, setPalette] = useState(() => generatePalette("Neon"));
  const [copied, setCopied] = useState(null);

  const regenerate = (v) => {
    const useVibe = v || vibe;
    setPalette(generatePalette(useVibe));
    setCopied(null);
  };

  const copyHex = async (hex, i) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(hex);
      }
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1200);
    } catch (e) {
      // Silently ignore clipboard failures (e.g. insecure context).
    }
  };

  const paletteText = encodeURIComponent(
    `Curti essa paleta urbana da Calicolors: ${palette.join("  ")}`
  );
  const paletteWa = `${whatsapp}?text=${paletteText}`;

  const clickRuaWa = `${whatsapp}?text=${encodeURIComponent(
    "Olá! Quero aparecer na revista Click Rua da Calicolors."
  )}`;

  const muralWa = `${whatsapp}?text=${encodeURIComponent(
    "Olá! Gostaria de um orçamento para um mural / arte urbana."
  )}`;

  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.tagline}>Grafiteiros</div>
        <h2 style={S.h2}>O mundo da rua</h2>
        <p style={S.note}>
          Paletas que gritam, uma revista de arte urbana e muros pra pintar.
          Feito pra quem vive de cor.
        </p>

        {/* 1) GERADOR DE PALETAS URBANAS */}
        <div style={{ ...S.card, marginBottom: 40 }}>
          <h3 style={S.subhead}>Gerador de paletas urbanas</h3>
          <p
            style={{
              ...S.note,
              marginBottom: 24,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Cinco cores vibrantes pra sua próxima intervenção. Clique numa cor
            pra copiar o HEX.
          </p>

          {/* Vibe presets */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              marginBottom: 26,
            }}
          >
            {Object.keys(VIBES).map((v) => {
              const active = v === vibe;
              return (
                <button
                  key={v}
                  onClick={() => {
                    setVibe(v);
                    regenerate(v);
                  }}
                  style={{
                    ...S.btnGhost,
                    padding: "9px 16px",
                    fontSize: 11,
                    background: active ? GOLD : "transparent",
                    color: active ? "#0c0a08" : "#ece6db",
                    border: active ? "1px solid " + GOLD : "1px solid #ffffff44",
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>

          {/* Swatches */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginBottom: 28,
            }}
          >
            {palette.map((hex, i) => (
              <button
                key={i}
                onClick={() => copyHex(hex, i)}
                title="Clique para copiar"
                style={{
                  flex: "1 1 120px",
                  minWidth: 110,
                  maxWidth: 180,
                  border: "1px solid #ffffff1a",
                  borderRadius: 14,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#0c0a08",
                  padding: 0,
                }}
              >
                <div style={{ height: 96, background: hex }} />
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 13,
                    letterSpacing: 1,
                    color: "#ece6db",
                    padding: "10px 6px",
                    textAlign: "center",
                  }}
                >
                  {copied === i ? (
                    <span style={{ color: GOLD, fontWeight: 700 }}>
                      copiado!
                    </span>
                  ) : (
                    hex
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <button style={S.btnPrimary} onClick={() => regenerate()}>
              Gerar paleta
            </button>
            <button style={S.btnGhost} onClick={() => regenerate()}>
              Gerar outra
            </button>
            <a
              style={S.btnGhost}
              href={paletteWa}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar no WhatsApp
            </a>
          </div>
        </div>

        {/* 2) REVISTA CLICK RUA */}
        <div style={{ ...S.card, marginBottom: 40 }}>
          <h3 style={S.subhead}>Revista Click Rua</h3>
          <p
            style={{
              ...S.note,
              marginBottom: 28,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            A revista de arte urbana da Calicolors — em breve.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
              marginBottom: 32,
            }}
          >
            {COVER_GRADIENTS.map((grad, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid #ffffff1a",
                  aspectRatio: "3 / 4",
                  background: grad,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: GOLD,
                    color: "#0c0a08",
                    fontFamily: SANS,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    padding: "4px 9px",
                    borderRadius: 6,
                  }}
                >
                  Em breve
                </span>
                <div
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background:
                      "linear-gradient(to top, #0c0a08cc, transparent)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 22,
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  >
                    Edição #{String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      fontFamily: SANS,
                      fontSize: 11,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "#b8b0a2",
                      marginTop: 4,
                    }}
                  >
                    Click Rua
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a
              style={S.btnPrimary}
              href={clickRuaWa}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero aparecer na Click Rua
            </a>
          </div>
        </div>

        {/* 3) MURAL CTA */}
        <div style={{ ...S.card, textAlign: "center" }}>
          <h3 style={S.subhead}>Seu próximo mural</h3>
          <p
            style={{
              ...S.note,
              marginBottom: 28,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Parede grande, ideia maior. A Calicolors entrega a tinta, a cor certa
            e o suporte pra sua obra ganhar a cidade.
          </p>
          <a
            style={S.btnPrimary}
            href={muralWa}
            target="_blank"
            rel="noopener noreferrer"
          >
            Orçar um mural
          </a>
        </div>
      </div>
    </section>
  );
}
