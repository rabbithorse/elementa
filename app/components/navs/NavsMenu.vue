<template>
  <ul class="NavsMenu" @click="$emit('push')">
    <li><NuxtLink to="/">TOP</NuxtLink></li>
    <li><NuxtLink to="/work/">WORKS</NuxtLink></li>
    <li><NuxtLink to="/news/">NEWS</NuxtLink></li>
    <li><NuxtLink to="/contact/">CONTACT</NuxtLink></li>
    <li><NuxtLink to="/company/">COMPANY</NuxtLink></li>
    <li><NuxtLink to="/recruit/">RECRUIT</NuxtLink></li>
  </ul>
</template>
