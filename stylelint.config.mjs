export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'declaration-property-value-no-unknown': null,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'selector-id-pattern': null,
    'function-name-case': null,
    'declaration-block-single-line-max-declarations': null,
    'selector-pseudo-element-colon-notation': 'single',
    'function-url-quotes': 'always',
    'selector-attribute-quotes': 'always',
    'no-descending-specificity': null,
    'no-empty-source': null,
  },
}
