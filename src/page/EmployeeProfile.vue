<script setup lang="ts">
import EmployeeCard from '@/components/EmployeeCard.vue';
import Calendar from '@/components/Calendar.vue'
import { reactive, ref } from 'vue';

const json = [
    {
        date: "2023-01-01",
        name: "Confraternização Universal",
        type: "feriado",
        level: "nacional"
    },
    {
        date: "2023-02-20",
        name: "Carnaval",
        type: "facultativo",
        level: "nacional"
    },
    {
        date: "2023-02-21",
        name: "Carnaval",
        type: "facultativo",
        level: "nacional"
    },
    {
        date: "2023-02-22",
        name: "Quarta-feira de Cinzas",
        type: "facultativo",
        level: "nacional"
    },
    {
        date: "2023-04-07",
        name: "Sexta-feira Santa",
        type: "facultativo",
        level: "nacional"
    },
    {
        date: "2023-04-21",
        name: "Tiradentes",
        type: "feriado",
        level: "nacional"
    },
    {
        date: "2023-05-01",
        name: "Dia do Trabalhador",
        type: "feriado",
        level: "nacional"
    },
    {
        date: "2023-06-08",
        name: "Corpus Christi",
        type: "facultativo",
        level: "nacional"
    },
    {
        date: "2023-09-07",
        name: "Independência do Brasil",
        type: "feriado",
        level: "nacional"
    },
    {
        date: "2023-10-12",
        name: "Nossa Senhora Aparecida",
        type: "feriado",
        level: "nacional"
    },
    {
        date: "2023-11-02",
        name: "Finados",
        type: "feriado",
        level: "nacional"
    },
    {
        date: "2023-11-15",
        name: "Proclamação da República",
        type: "feriado",
        level: "nacional"
    },
    {
        date: "2023-12-24",
        name: "Véspera de Natal",
        type: "facultativo",
        level: "nacional"
    },
    {
        date: "2023-12-25",
        name: "Natal",
        type: "feriado",
        level: "nacional"
    },
    {
        date: "2023-12-31",
        name: "Véspera de Ano-Novo",
        type: "facultativo",
        level: "nacional"
    }
]

const viewState = reactive({
    employee: {
        name: 'Colaborador Doguineo',
        picture: 'https://img.freepik.com/fotos-gratis/lindo-retrato-de-cachorro_23-2149218450.jpg',
        position: "Desenvolvedor",
        expectedHoursForDay: 8,
        expectedHoursForMonth: 0,
        daysOff: []
    },
})

function handleExpectedDays(value: number){
    console.log("emitou: ", value)
    viewState.employee.expectedHoursForMonth = value * 8;
}

function handleDaysOff(value: Array<never>){
    viewState.employee.daysOff = value;
}

</script>

<template>
  <div id="container">
      <EmployeeCard 
        :employee-name="viewState.employee.name" 
        :employee-picture="viewState.employee.picture" 
        :employee-position="viewState.employee.position" 
        :expected-hours-for-month="viewState.employee.expectedHoursForMonth"
        :expected-hours-for-day="viewState.employee.expectedHoursForDay"/>
      <Calendar :days-off-list="viewState.employee.daysOff" :holiday-list="json" @expected-days-for-month="handleExpectedDays" @days-off="handleDaysOff"/>
  </div>
</template>

<style scoped>
#container {
    display: flex;
    width: 100%;
    height: 500px;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 8px;
    /* box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); */
    line-height: 1.125em;
    text-align: center;
    padding-bottom: 32px;
    justify-content: center;
}

</style>
