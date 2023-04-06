<script setup lang="ts">
import IconEmployee from './icons/IconEmployee.vue';

const props = defineProps({
  employeePicture: {
    type: String,
  }
});

</script>

<template> 
  <img 
    v-if="props.employeePicture" 
    class="employeePicture" 
    :src="props.employeePicture" 
    alt="Employee Picture" 
    />
  <IconEmployee 
    v-else
    class="employeePicture" 
     />
</template>

<style scoped>
  .employeePicture {
    border-radius: 50%;
    width: 232px;
    height: 232px;
    border-style: solid;
    border-width: 2px;
    border-color: var(--pontotel-red);
  }
</style>
