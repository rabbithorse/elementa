<template>
  <div class="Tabbox">
    <div class="tabList -two">
      <button v-for="(item, index) in tablist" :key="index" class="item" :class="{ '-active': tabActive === index.toString() }" @click="tabChange(index.toString())">
        {{ item }}
      </button>
    </div>
    <template v-for="(val, name) in $slots">
      <section v-if="tabActive === name" :key="name" :class="`tabContents -${name}`">
        <slot :name="name" />
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tablist: {
    [value: string]: string
  }
}
const Props = withDefaults(defineProps<Props>(), {
  tablist: () => ({}),
})
const tabActive = ref('contents1')
const tabChange = (target: string) => {
  tabActive.value = target
}
</script>

<style scoped>
.Tabbox {
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
  font-size: 1.5rem;
}

.tabList {
  position: relative;
  z-index: var(--zindex-tab);
  display: flex;

  & > .item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3em;
    padding: 0 2em .5em;
    margin-right: .5em;
    font-size: 1.2em;
    line-height: 1;
    color: #fff;
    cursor: pointer;
    background-color: var(--color-navy);
    border-radius: .3em .3em 0 0;
    transition: all .3s;
    transform: translateY(.6em);

    &:hover {
      transform: translateY(.1em);
    }

    &.-active {
      cursor: inherit;
      transform: translateY(.1em);
    }

    &:nth-of-type(4n+2) {
      background-color: var(--color-pink);
    }

    &:nth-of-type(4n+3) {
      background-color: var(--color-cyan);
    }

    &:nth-of-type(4n+4) {
      background-color: var(--color-yellow);
    }
  }
}

.tabContents {
  position: relative;
  z-index: calc(var(--zindex-tab) + 1);
  padding: 2em;
  background-color: #fff;
  border: .6rem solid var(--color-navy);
  transition: all .3s;

  &.-contents2 {
    border-color: var(--color-pink);
  }

  &.-contents3 {
    border-color: var(--color-cyan);
  }

  &.-contents4 {
    border-color: var(--color-yellow);
  }

  & > p { margin: 0 auto; }
}
</style>
