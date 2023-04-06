<script setup lang="ts">
import EmployeeCard from '@/components/EmployeeCard.vue';
import Calendar from '@/components/Calendar.vue'
import { ref } from 'vue';

const employeePicture = ref('https://img.freepik.com/fotos-gratis/lindo-retrato-de-cachorro_23-2149218450.jpg')

</script>
<template>
  <EmployeeCard 
    employee-name="Mike Santana" 
    :employee-picture="employeePicture" 
    employee-position="software engineer" />
    <Calendar/>
</template>

