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
  <div id="employee-card">
    <EmployeePicture :employee-picture="props.employeePicture"/>
    <h2 id="employee-card-name" class="employee-card-text">
      {{ props.employeeName }}
    </h2>
    <p id="employee-card-hole" class="employee-card-text">
      {{ props.employeePosition }}
    </p>
    <p id="employee-week" class="employee-card-text">
      Escala semanal
    </p>
    <div id="days-of-week">
      <p>Dom</p>
      <p>Seg</p>
      <p>Ter</p>
      <p>Qua</p>
      <p>Qui</p>
      <p>Sex</p>
      <p>Sáb</p>
    </div>
    <p class="employee-card-text">São esperados {{ expectedHoursForDay }}h de trabalho por dia!</p>
    <p class="employee-card-text">São esperados {{ expectedHoursForMonth }}h mensais de trabalho para o colaborador!</p>
    
  </div>
</template>

<style scoped>
  #employee-card {
    display: flex;
    width: 300px;
    flex-direction: column;
    align-items: center;
    padding-bottom: 32px;
  }

  .employee-card-text{
  margin-top: 10px;
  }
  #employee-card-name {
    margin-top: 32px;
    margin-bottom: 20px;
  }

  #days-of-week{
    display: flex;
  }

  #employee-week {
    margin-top: 32px;
    border-bottom-style: dashed;
    border-bottom-width: 4px;
    border-bottom-color: var(--pontotel-light-blue);
  }

  #days-of-week p{
    margin: 10px 10px 0px 10px;
  }
  #employee-card-hole{
    background-color: var(--pontotel-orange);
    color: var(--pontotel-black);
    padding: 10px 20px;
  }
</style>
