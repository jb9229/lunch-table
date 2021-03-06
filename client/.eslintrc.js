module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    "require-jsdoc": 0,
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
    "max-len": ["error", { "code": 120 }],
    "valid-jsdoc": ["error", { "requireParamType": false, "requireReturnType": false }],
    "brace-style": ["error", "allman", { "allowSingleLine": true }],
    "block-spacing": "error"
  },
};
