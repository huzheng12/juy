/**
 * @name: .eslintrc.js
 * @author: SunSeekerX
 * @Date: 2020-04-18 11:43:35
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-27 18:48:21
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-eval': 'error',
    'no-alert': 'error',
  },
}
