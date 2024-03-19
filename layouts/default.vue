<script setup>
import NavbarView from '../components/navbarView.vue'
import FooterView from '../components/footerView.vue'
</script>

<template>
  <NavbarView />

  <slot />
  <FooterView />
</template>
