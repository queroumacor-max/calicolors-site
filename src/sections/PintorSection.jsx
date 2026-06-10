import React, { useState } from "react";

const DISPLAY = "'Bodoni Moda', serif";
const SANS = "Archivo, sans-serif";
const GOLD = "#c9a25e";

const S = {
  section: {
    position: "relative",
    zIndex: 5,
    padding: "96px 5vw",
    fontFamily: SANS,
    color: "#ece6db",
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  tagline: {
    fontSize: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: GOLD,
    textAlign: "center",
    marginBottom: 12,
    fontFamily: SANS,
    fontWeight: 700,
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
    color: "#cfc6b6",
    fontSize: 14,
    marginBottom: 36,
    textAlign: "center",
    lineHeight: 1.6,
  },
  card: {
    background: "#0c0a08aa",
    border: "1px solid #ffffff1a",
    borderRadius: 20,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
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
    display: "inline-block",
    fontFamily: SANS,
  },
  btnGhost: {
    border: "1px solid #ffffff44",
    color: "#ece6db",
    background: "transparent",
    padding: "13px 24px",
    borderRadius: 8,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: 700,
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    fontFamily: SANS,
  },
  subTagline: {
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: GOLD,
    marginBottom: 10,
    fontWeight: 700,
  },
  subHeading: {
    fontFamily: DISPLAY,
    fontSize: "clamp(24px,3.5vw,40px)",
    color: "#fff",
    margin: "0 0 12px",
    fontWeight: 500,
  },
};

const COURSES = [
  "Técnicas de pintura premium",
  "Acabamento de paredes lisas",
  "Texturas e efeitos decorativos",
  "Preparação de superfícies",
];

export default function PintorSection({ whatsapp }) {
  const [magNote, setMagNote] = useState(false);

  const wa = (text) => `${whatsapp}?text=${encodeURIComponent(text)}`;

  const linkDestaque = wa(
    "Olá! Quero ser o Pintor Destaque do Mês da Calicolors. Pode me contar como funciona?"
  );
  const linkCurso = wa(
    "Olá! Quero enviar um curso para a Academia do Pintor da Calicolors."
  );

  return (
    <section style={S.section}>
      <div style={S.inner}>
        <div style={S.tagline}>Espaço do Profissional</div>
        <h2 style={S.h2}>Pintores</h2>
        <p style={S.note}>
          Um mundo feito para quem vive da arte de pintar: reconhecimento,
          inspiração e conhecimento para elevar o seu trabalho.
        </p>

        {/* 1) PINTOR DESTAQUE DO MÊS */}
        <div
          style={{
            ...S.card,
            padding: "clamp(20px,4vw,40px)",
            marginBottom: 64,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(20px,4vw,40px)",
            alignItems: "center",
          }}
        >
          {/* photo placeholder */}
          <div
            style={{
              position: "relative",
              minHeight: 320,
              borderRadius: 16,
              background:
                "linear-gradient(145deg, #211c14 0%, #14110c 60%, #0c0a08 100%)",
              border: "1px solid #ffffff14",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 64, lineHeight: 1 }} aria-hidden="true">
              📷
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#b8b0a2",
                fontWeight: 700,
              }}
            >
              Foto do Pintor
            </div>
            <span
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                background: GOLD,
                color: "#0c0a08",
                fontSize: 10,
                letterSpacing: 1.5,
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              Destaque do Mês
            </span>
          </div>

          {/* info */}
          <div>
            <div style={S.subTagline}>Pintor Destaque</div>
            <h3
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(28px,4vw,46px)",
                color: "#fff",
                margin: "0 0 8px",
                fontWeight: 500,
              }}
            >
              Seu nome aqui
            </h3>
            <div
              style={{
                color: GOLD,
                fontSize: 14,
                marginBottom: 18,
                fontWeight: 600,
              }}
            >
              Sua cidade • Sua especialidade
            </div>
            <p
              style={{
                color: "#cfc6b6",
                fontSize: 15,
                lineHeight: 1.7,
                margin: "0 0 18px",
                fontStyle: "italic",
              }}
            >
              “Aqui entra uma frase sua sobre a paixão pela pintura, sua
              trajetória e o que torna o seu trabalho único. Conte a sua
              história.”
            </p>
            <p
              style={{
                color: "#b8b0a2",
                fontSize: 13,
                lineHeight: 1.6,
                margin: "0 0 24px",
              }}
            >
              A arte do pintor destaque vira a capa da Revista Calicolors do mês.
              Seu talento ganha o reconhecimento que merece.
            </p>
            <a href={linkDestaque} target="_blank" rel="noopener noreferrer" style={S.btnPrimary}>
              Quero ser o destaque
            </a>
          </div>
        </div>

        {/* 2) REVISTA CALICOLORS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(24px,4vw,48px)",
            alignItems: "center",
            marginBottom: 64,
          }}
        >
          {/* magazine cover placeholder */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "100%",
                maxWidth: 340,
                aspectRatio: "3 / 4",
                borderRadius: 14,
                border: `2px solid ${GOLD}`,
                boxShadow: `0 0 0 1px #00000040, 0 20px 50px #00000066`,
                background:
                  "linear-gradient(160deg, #1a1610 0%, #100d09 50%, #0c0a08 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "28px 22px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: GOLD,
                  fontWeight: 700,
                }}
              >
                Edição 01
              </div>
              <div>
                <div
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: "clamp(28px,4vw,40px)",
                    color: "#fff",
                    fontWeight: 500,
                    lineHeight: 1.1,
                  }}
                >
                  Revista
                  <br />
                  Calicolors
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#b8b0a2",
                  letterSpacing: 1,
                }}
              >
                Capa: arte do pintor destaque
              </div>
            </div>
          </div>

          {/* magazine text */}
          <div>
            <div style={S.subTagline}>Editorial</div>
            <h3 style={S.subHeading}>Revista Calicolors</h3>
            <p
              style={{
                color: "#cfc6b6",
                fontSize: 15,
                lineHeight: 1.7,
                margin: "0 0 24px",
              }}
            >
              Uma revista que celebra a arte da pintura, com histórias dos nossos
              profissionais, tendências de cores e inspirações para cada projeto.
              A cada edição, um novo pintor na capa.
            </p>
            <button
              type="button"
              onClick={() => setMagNote(true)}
              style={S.btnGhost}
            >
              Folhear edição
            </button>
            {magNote && (
              <span
                style={{
                  marginLeft: 16,
                  color: GOLD,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Em breve ✨
              </span>
            )}
          </div>
        </div>

        {/* 3) ACADEMIA DO PINTOR */}
        <div>
          <div style={{ ...S.subTagline, textAlign: "center" }}>Conhecimento</div>
          <h3 style={{ ...S.subHeading, textAlign: "center" }}>
            Academia do Pintor
          </h3>
          <p style={S.note}>
            Cursos e ensinamentos enviados pelos nossos pintores.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              marginBottom: 36,
            }}
          >
            {COURSES.map((title, i) => (
              <div
                key={i}
                style={{
                  ...S.card,
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 9",
                    background:
                      "linear-gradient(135deg, #211c14 0%, #14110c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "#0c0a08cc",
                      border: `1px solid ${GOLD}`,
                      color: GOLD,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      paddingLeft: 4,
                    }}
                    aria-hidden="true"
                  >
                    ▶
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "#ffffff14",
                      border: "1px solid #ffffff22",
                      color: "#cfc6b6",
                      fontSize: 9,
                      letterSpacing: 1.5,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      padding: "5px 10px",
                      borderRadius: 999,
                    }}
                  >
                    Em breve
                  </span>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <div
                    style={{
                      color: "#ece6db",
                      fontSize: 15,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a href={linkCurso} target="_blank" rel="noopener noreferrer" style={S.btnPrimary}>
              Enviar meu curso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
