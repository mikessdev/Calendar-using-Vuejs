<script setup lang="ts">
import EmployeePicture from '@/components/EmployeePicture.vue'

const props = defineProps({
  employeeName: {
    type: String,
  },
  employeePosition: {
    type: String
  },
  employeePicture: {
    type: String
  }
});

</script>

<template>
  <div id="employeeCard">
    <EmployeePicture :employee-picture="props.employeePicture"/>
    <h2>
      {{ props.employeeName }}
    </h2>
    <p>
      {{ props.employeePosition }}
    </p>
    <p>
      Escala semanal
    </p>
    
  </div>
</template>

<style scoped>
  #employeeCard {
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    

    background-color: red;

  }
</style>
