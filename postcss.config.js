module.exports = {
  plugins: {
    'postcss-easy-import': {
      prefix: '_',
    },
    'postcss-normalize': {
      forceImport: false,
    },
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
}
