// ─────────────────────────────────────────────────────────────────────────────
//  babel.config.js
//  Aggiunge il preset di react-strict-dom sopra a babel-preset-expo.
//  Il preset si occupa di ottimizzare i build e di estrarre CSS statico per web.
// ─────────────────────────────────────────────────────────────────────────────

const reactStrictPreset = require('react-strict-dom/babel-preset');

function getPlatform(caller: any) {
  return caller && caller.platform;
}

function getIsDev(caller: any) {
  if (caller?.isDev != null) return caller.isDev;
  return (
    process.env.BABEL_ENV === 'development' ||
    process.env.NODE_ENV === 'development'
  );
}

module.exports = function (api: any) {
  const platform = api.caller(getPlatform);
  const dev = api.caller(getIsDev);

  return {
    plugins: [],
    presets: [
      [
        reactStrictPreset,
        {
          debug: dev,
          dev,
          platform,
          unstable_moduleResolution: {
            type: 'commonJS',
            rootDir: __dirname
          },
        },
      ],
      'babel-preset-expo',
    ],
  };
};