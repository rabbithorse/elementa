<template>
  <header class="NavsVertical">
    <div class="inner">
      <h1><NuxtLink to="/">logo</NuxtLink></h1>
      <nav class="navigation">
        <NavsMenu />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.NavsVertical {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: gray;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.navigation {
  & > :deep(ul) {
    display: flex;
    flex-direction: column;
    list-style-type: none;

    li {
      margin-top: 1em;

      a {
        font-weight: bold;
        color: #fff;
        text-decoration: none;
        transition: color .3s ease-in-out;

        &:hover {
          color: var(--color-yellow);
        }
      }
    }
  }
}
</style>
