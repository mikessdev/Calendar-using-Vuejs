<script setup lang="ts">
import EmployeeCard from '@/components/EmployeeCard.vue';
import Calendar from '@/components/Calendar.vue'
import { computed, reactive, ref, type Ref } from 'vue';

const holidays:Ref<any[]> = ref([]); 

const getBrazilHolidays = async (year: number) => {
    const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`)
    holidays.value =  await response.json()
}

const getHolidays = computed(()=>{
    return holidays.value
})

const viewState = reactive({
    employee: {
        name: 'Colaborador Doguineo',
        picture: 'https://img.freepik.com/fotos-gratis/lindo-retrato-de-cachorro_23-2149218450.jpg',
        position: "Desenvolvedor",
        expectedHoursForDay: 8,
        expectedHoursForMonth: 0,
        weeklyWorkSchedule: [1, 2, 3, 4, 5],
        daysOff: []
    },
})

function handleExpectedDays(value: number){
    viewState.employee.expectedHoursForMonth = value * viewState.employee.expectedHoursForDay;
}

function handleDaysOff(value: Array<never>){
    viewState.employee.daysOff = value;
}

</script>

<template>
    <div id="container-employeer-profile">
        <div id="wrapper-employeer-profile">
            <EmployeeCard :employee-data="viewState.employee"/>
            <Calendar 
                :days-off-list="viewState.employee.daysOff" 
                :holiday-list="getHolidays" 
                :free-day-list="viewState.employee.weeklyWorkSchedule"
                @expected-days-for-month="handleExpectedDays" 
                @days-off="handleDaysOff"
                @year="getBrazilHolidays"/>
        </div>
    </div>
</template>

<style scoped>
#container-employeer-profile {
    height: 100%;
    display: flex;
    width: 100%;    
}
#wrapper-employeer-profile {
    width: 1800px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
}

</style>
