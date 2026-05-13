<template>
  <header class="NavsHorizontal">
    <div class="inner">
      <h1><NuxtLink to="/">logo</NuxtLink></h1>
      <nav class="navigation">
        <NavsMenu />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.NavsHorizontal {
  width: 100%;
  padding: 1em 2em;
  background-color: var(--color-navy);
}

.inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  color: #fff;
}

.navigation {
  & > :deep(ul) {
    display: flex;
    display: none;
    flex-direction: row;

    & li {
      margin-right: 1em;

      & a {
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
