// ─────────────────────────────────────────────────────────────────────────────
//  postcss.config.js
//  Estrae gli stili css.create() in CSS statico durante i build web.
//  Senza questo, gli stili vengono iniettati a runtime (più lento).
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  plugins: [
    require('react-strict-dom/postcss-plugin')({
      include: [
        // Sii specifico per evitare rallentamenti durante il build
        'components/**/*.{js,jsx,ts,tsx}',
        'views/**/*.{js,jsx,ts,tsx}',
        'tokens/*.stylex.ts',
      ],
    }),
    require('autoprefixer'),
  ],
};