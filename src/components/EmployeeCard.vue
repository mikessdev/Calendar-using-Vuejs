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
  },
  expectedHoursForDay: {
    type: Number
  },
  expectedHoursForMonth: {
    type: Number
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
    <div>
      <p>Dom</p>
      <p>Seg</p>
      <p>Ter</p>
      <p>Qua</p>
      <p>Qui</p>
      <p>Sex</p>
      <p>Sáb</p>
    </div>
    <p>São esperados {{ expectedHoursForDay }}h de trabalho por dia!</p>
    <p>São esperados {{ expectedHoursForMonth }}h mensais de trabalho para o colaborador!</p>
    
  </div>
</template>

<style scoped>
  #employeeCard {
    display: flex;
    width: 300px;
    flex-direction: column;
    align-items: center;
  }
</style>
