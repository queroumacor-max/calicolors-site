# Calicolors — notas para o Claude

## Regras do projeto
- **Sempre fazer merge/push das alterações para a branch `main`.** Commitar e dar
  `git push origin main` ao concluir cada mudança (não usar branch de feature a menos
  que pedido explicitamente).

## Stack
- Vite + React 18 + Three.js (shader de metal líquido no fundo).
- App principal: `src/App.jsx` (componente único `Calicolors`).
- Build: `npm run build` (deve passar antes de cada push).

## Estrutura relevante de `src/App.jsx`
- `LiquidCanvas` — fundo WebGL. Uniforms controláveis: `u_speed`, `u_warp`, `u_mouseAmt`.
- Painel "Cor do Efeito" — paletas do efeito + sliders de animação.
- Muro de cores — layout estilo Sherwin-Williams ColorSnap (blocos por família,
  matiz no eixo X, valor claro→escuro no eixo Y; hover = tooltip, clique = pinta o
  fundo, duplo-clique = adiciona à paleta).
