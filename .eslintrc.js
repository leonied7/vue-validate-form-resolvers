module.exports = {
  env: {
    node: true
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended']
};
