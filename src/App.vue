<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="app">
    <Header/>
    <main>
      <router-view />
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
.app{
  background-color: var(--pontotel-white-gray);
}
main {
  display: flex;
  flex-direction: column;
}
</style>
