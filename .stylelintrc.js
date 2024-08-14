module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'block-no-empty': true,
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands', 'after-comment'],
      },
    ],
    indentation: [2],
    'max-empty-lines': 2,
  },
}
