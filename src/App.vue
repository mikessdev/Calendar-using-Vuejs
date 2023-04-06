<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="app">
    <Header/>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app{
  background-color: var(--pontotel-white-gray);
}
</style>
