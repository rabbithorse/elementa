<template>
  <ul div class="Attentions">
    <li>Apple と Apple ロゴ、App Storeは米国およびその他の国で登録された Apple Inc. の商標です。</li>
    <li>Google Play および Google Play ロゴは、Google LLC の商標です。</li>
  </ul>
</template>

<style scoped>
  ul {
    width: 100%;
    padding: 0 1em 2em;
    margin: 2em auto 0;
    list-style-position: inside;
    list-style-type: none;

    li {
      padding-left: 1.5em;
      font-size: 1.1rem;
      text-align: center;
      text-indent: -1.5em;

      &:before {
        padding-right: .5em;
        content: "※";
      }
    }
  }
</style>
