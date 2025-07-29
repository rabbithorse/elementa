import withNuxt from '.nuxt/eslint.config.mjs'

export default withNuxt()
  .overrideRules({
    'vue/multi-word-component-names': 'off',
    'vue/prefer-template': 'error',
    'vue/first-attribute-linebreak': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/object-property-newline': 'off',
    'vue/template-curly-spacing': ['error', 'never'],
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-len': 'off',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
  })
