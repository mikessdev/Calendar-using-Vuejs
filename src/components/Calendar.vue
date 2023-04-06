<script setup lang="ts">
import { ref, computed } from 'vue';
  
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);
const day = ref(new Date().getDate());
  
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
    date: "2023-10-28",
    name: "Dia do Servidor Público",
    type: "facultativo",
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

interface Date {
    day: number,
    month: number,
    year: number,
    isHoliday: boolean,
    isCurrentMonth: boolean,

}

function checkHoliday(date: Date){
    let dateStr: string;
    let monthStr: string;
    let dayStr: string;

    //making data compatible with the api
    dayStr = date.day < 10 ? '0'+date.day : ''+date.day; 
    monthStr = date.month < 10 ? '0'+date.month : ''+date.month; 
    dateStr = `${date.year}-${monthStr}-${dayStr}`

    json.find(element => {
        return date.isHoliday = element.date == dateStr;
    })
    return date;
}
  
const daysGenerator = computed(() => {

    // const firstDay = new Date(year.value, month.value - 1, 1).getDay();
    const lastDay = new Date(year.value, month.value, 0).getDate();
    const lastDayPreviousMonth = new Date(year.value, month.value - 1, 0).getDate();

    let days = [];
    
    for (let i = lastDayPreviousMonth - 5; i <= lastDayPreviousMonth; i++) {
        let date = {} as Date;

        date.day = i; 
        date.month = month.value;
        date.year = month.value == 1 ? year.value - 1 : year.value;    
        date.isCurrentMonth = false;

        checkHoliday(date);
        days.push(date);      
    }
    
    for (let i = 1; i <= lastDay; i++) {
        let date = {} as Date;

        date.day = i; 
        date.month = month.value;
        date.year = year.value;
        date.isCurrentMonth = true;
        
        checkHoliday(date)
        days.push(date);      
    }
    
    for (let i = 1; i <= 36 - lastDay; i++) {
       let date = {} as Date;

        date.day = i; 
        date.month = month.value;
        date.year = month.value == 12 ? year.value + 1 : year.value;    
        date.isCurrentMonth = false;

        checkHoliday(date);
        days.push(date);   
    }

    return separatingDaysIntoWeeks(days);
  });

function separatingDaysIntoWeeks(days: Array<Date>){
    const weeks = [];
    let week: any = [];

    days.forEach((day) => {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    });
    if (week.length > 0) {
        weeks.push(week);
    }
    return weeks;
}
  
  function updateCalendar() {
    // Fazer alguma ação quando o calendário for atualizado, por exemplo, atualizar dados ou fazer uma requisição
    // para obter eventos relacionados à nova data selecionada.
}
</script>

<template>
    <div id="container">
      <h1>Calendário</h1>
      <div id="input-container">
        <div class="input-wrapper">
        <label class="input-label" for="year">Ano:</label>
        <input type="number" class="custom-input" id="year" v-model="year" @input="updateCalendar" />
      </div>
      <div class="input-wrapper">
        <label class="input-label" for="month">Mês:</label>
        <input type="number" class="custom-input" id="month" v-model="month" @input="updateCalendar" />
      </div>
      <div class="input-wrapper">
        <label class="input-label" for="day">Dia:</label>
        <input type="number" class="custom-input" id="day" v-model="day" @input="updateCalendar" />
      </div>
    </div>   
      <div class="calendar">
        <table>
          <thead>
            <tr id="month-title">
              <th>Do</th>
              <th>Se</th>
              <th>Te</th>
              <th>Qa</th>
              <th>Qi</th>
              <th>Se</th>
              <th>Sá</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="week in daysGenerator" :key="week[0]">
              <td :class="(day.isCurrentMonth ? 'day' : 'day2')" v-for="day in week" :key="day">
                <div :class="(day.isHoliday ? 'day3' : '')">{{ day.day }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
  
<style scoped>
    #container{
        display: flex;
        flex-direction: column;
    }

    #input-container{
        display: flex;
    }

    #month-title{
        color: var(--pontotel-light-blue);
        
    }

    .calendar{
        display: flex;
    }

    .day{
        background-color: red;
    }
    .day2{
        background-color: blue;
    }
    .day3{
        background-color: yellow;
    }

    /* input style */
        .input-wrapper {

    margin-bottom: 20px;
    }

    .custom-input {
    width: 60px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    color: #333;
    }
    .input-label {
    pointer-events: none;
    transition: 0.2s ease all;
    color: #777;
    }

    .custom-input:focus + .input-label,
    .custom-input:not(:placeholder-shown) + .input-label {

    font-size: 12px;
    color: red;
    }

</style>