<script setup lang="ts">
import EmployeePicture from '@/components/EmployeePicture.vue'
import { ref } from 'vue';

interface Employee{
  name: string; 
  position: string, 
  picture: string, 
  expectedHoursForDay: number, 
  expectedHoursForMonth: number, 
  weeklyWorkSchedule: number[],
}


const props = defineProps({
  employeeData: {
    type: Object,
    default: {}
  },

});

const employee = ref(props.employeeData as Employee);

function setClass(employee: number[], day: number){
  return employee.includes(day) ?  'employee-card-work-day' : 'employee-card-free-day';
}

</script>

<template>
  <div id="employee-card">
    <EmployeePicture :employee-picture="employee.picture"/>
    <h2 
      id="employee-card-name" 
      class="employee-card-text">
      {{ employee.name }}
    </h2>
    <p 
      id="employee-card-hole" 
      class="employee-card-text">
      {{ employee.position }}
    </p>
    <p id="employee-week" class="employee-card-text">
      Escala semanal
    </p>
    <div id="days-of-week">
      <p :class="setClass(employee.weeklyWorkSchedule, 0)">Dom</p>
      <p :class="setClass(employee.weeklyWorkSchedule, 1)">Seg</p>
      <p :class="setClass(employee.weeklyWorkSchedule, 2)">Ter</p>
      <p :class="setClass(employee.weeklyWorkSchedule, 3)">Qua</p>
      <p :class="setClass(employee.weeklyWorkSchedule, 4)">Qui</p>
      <p :class="setClass(employee.weeklyWorkSchedule, 5)">Sex</p>
      <p :class="setClass(employee.weeklyWorkSchedule, 6)">Sáb</p>
    </div>
    <p class="employee-card-text">
      São esperados {{ employee.expectedHoursForDay }}h de trabalho por dia!
    </p>
    <p class="employee-card-text">
      São esperados {{ employee.expectedHoursForMonth }}h mensais de trabalho para o colaborador!
    </p>
    
  </div>
</template>

<style scoped>
  #employee-card {
    display: flex;
    width: 450px;
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
    flex-wrap: wrap;
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

  .employee-card-free-day{
    border-style: dashed;
    border-width: 4px;
    border-color: var(--pontotel-red);
    padding: 4px;
    color: var(--pontotel-red);
  }

  .employee-card-work-day{
    border-style: dashed;
    border-width: 4px;
    border-color: var(--pontotel-green);
    padding: 4px;
    color: var(--pontotel-green);
  }
</style>
