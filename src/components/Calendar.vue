<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import {
    yearInputValidation,
    monthInputValidation,
    dayInputValidation,
} from "@/validators/dateInputValidation";

//Interfaces
interface Date {
    day: number;
    month: number;
    year: number;
    isHoliday: boolean;
    isCurrentMonth: boolean;
    isDayOff: boolean;
    isFreeDay: boolean;
}

interface Holiday {
    date: string;
    level: string;
    name: string;
    type: string;
}

interface MonthsWithDaysOff {
    date: String,
    days: Number[]
}

const props = defineProps({
    holidayList: {
        type: Array<Holiday>,
        default: [],
    },
    daysOffList: {
        type: Array<MonthsWithDaysOff>,
        default: [],
    },
    freeDayList:{
        type: Array<Number>,
        default: [1, 2, 3, 4, 5]
        
    }
});

//Emit
const emit = defineEmits(["expectedDaysForMonth", "daysOff"]);

//ref 
const expectedDaysValue = ref(0);

//viewState
const viewState = reactive({
    day: {
        value: new Date().getDate(),
        error: "",
        validation: () => {
            viewState.day.error = dayInputValidation(viewState.day.value);
        },
    },
    month: {
        value: new Date().getMonth() + 1,
        error: "",
        validation: () => {
            viewState.month.error = monthInputValidation(viewState.month.value);
        },
    },
    year: {
        value: new Date().getFullYear(),
        error: "",
        validation: () => {
            viewState.year.error = yearInputValidation(viewState.year.value);
        },
    },
});


//Generating the days for the calendar
const daysGenerator = computed(() => {
    const daysInCurrentMonth = new Date(viewState.year.value, viewState.month.value, 0).getDate();
    const currentMonthStartNumber = new Date(`${viewState.year.value}-${viewState.month.value}-1`).getDay() - 1;
    const lastDayOfPreviousMonth = new Date(viewState.year.value,viewState.month.value - 1,0).getDate();
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let days = [];

    //Generating first days out of the month
    for (let day = lastDayOfPreviousMonth-currentMonthStartNumber; day <= lastDayOfPreviousMonth; day++) {
        let date: Date = dateConstruction(
            viewState.month.value == 1 ? viewState.year.value - 1 : viewState.year.value, 
            viewState.month.value == 1 ? 12 :  viewState.month.value - 1,
            day);
        days.push(date);
    }

    //Generating days of the current month
    expectedDaysValue.value = 0;
    for (let day = 1; day <= daysInCurrentMonth; day++) {
        const isCurrentMonth = true;
        let date: Date = dateConstruction(
            viewState.year.value, 
            viewState.month.value, day, 
            isCurrentMonth);
        days.push(date);

        let dayOfWeek = daysOfWeek[new Date(`${viewState.year.value}-${viewState.month.value}-${day}`).getDay()];
        if(!isFreeDay(date)){
            if(!date.isHoliday){
                expectedDaysValue.value++
            }

        }
    }

    expectedDays();

    //Generating last days out of the month
    let calendarLength = 42;
    let daysAlreadyFilled = days.length;

    let calendarRemainingLength = calendarLength - daysAlreadyFilled;
    for (let day = 1; day <= calendarRemainingLength ; day++) {
        let date: Date = dateConstruction(
            viewState.month.value == 12 ? viewState.year.value + 1 : viewState.year.value, 
            viewState.month.value == 12 ? viewState.month.value - 11 :  viewState.month.value + 1,
            day)
        days.push(date);
    }
    return separatingDaysIntoWeeks(days);
});


/** 
 * Function 
 */

//Responsible for building the Date object
function dateConstruction(year: number, month: number, day: number, isCurrentMonth = false):Date{
    let date = {} as Date;    
    date.year = year;
    date.month = month;
    date.day = day;
    date.isCurrentMonth = isCurrentMonth;
    date.isHoliday = isHoliday(date);  
    date.isDayOff = isDayOff(date);   
    return date;
}

//Check if the day is a day off
function isDayOff(date: Date): boolean{
    let dayOff: MonthsWithDaysOff = {
            date: `${date.year}-${date.month}`,
            days: []
        }

    let daysOff: MonthsWithDaysOff[] = props.daysOffList;

    if(daysOff){    
        let isCurrentMonth = !!daysOff.find(element => {
            return element.date == dayOff.date;
        }) 
        
        if(isCurrentMonth){
            let currentMonth = daysOff.filter((element) => {
                return element.date === dayOff.date
            })
            for(let day of currentMonth[0].days){
                if(date.day === day){
                    return true;
                }
            }
        }
        return false
    } 

    return false
}

//Check if the day is a holiday
function isHoliday(date: Date) {
    let month: string = date.month < 10 ? "0" + date.month : "" + date.month;
    let day: string = date.day < 10 ? "0" + date.day : "" + date.day;
    let dateStr: string = `${date.year}-${month}-${day}`;
    let holidays: Holiday[] = props.holidayList;

     return !!holidays.find((item) => {
            return  item.date == dateStr;
        });
}

//check if date is valide
function dateIsValid(year: number, month: number, day: number){
    if(!!!yearInputValidation(year)){
        if(!!!monthInputValidation(month)){
            if( !!!dayInputValidation(day)){
                return true
            }
        }
    }
   
}

//responsible for keeping the count of days off in the correct months
function expectedDays(){
    const year = viewState.year.value;
    const month = viewState.month.value;
    let monthsWithDaysOff: MonthsWithDaysOff[] = props.daysOffList

    let currentMonth = monthsWithDaysOff.filter((element) => {
            return element.date === `${year}-${month}`})
    if(currentMonth.length > 0){
        emit("expectedDaysForMonth", expectedDaysValue.value - currentMonth[0].days.length);
    }else{
        emit("expectedDaysForMonth", expectedDaysValue.value);
    }
}

//separating the days into weeks
function separatingDaysIntoWeeks(days: Date[]) {
    const weeks = [];
    let week: any = [];

    for(let day of days){
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        weeks.push(week);
    }
    return weeks;
}

//responsible for selecting dates and emit them
function selectCalendarDay(date: Date){
    let monthsWithDaysOff: MonthsWithDaysOff[] = props.daysOffList;
    let mounthOfdayOff: MonthsWithDaysOff = {
            date: `${date.year}-${date.month}`,
            days: [date.day]
        }
    
    if(!date.isHoliday && !isFreeDay(date)){
         let isCurrentMonth = !!monthsWithDaysOff.find(element => {
             return element.date == mounthOfdayOff.date;
          }) 

        if(!isCurrentMonth){
            monthsWithDaysOff.push(mounthOfdayOff);
        }else{
            let currentMonth = findMonthBelongsToDate(monthsWithDaysOff, mounthOfdayOff)[0];
            
            dateIsSelected(currentMonth, date) ? 
            currentMonth.days = removeDayOff(currentMonth, date) : 
            currentMonth = addNewDayOff(currentMonth, date);

            monthsWithDaysOff = monthsWithDaysOff.filter((item) => {
                return item.date !== mounthOfdayOff.date
            })

            monthsWithDaysOff.push(currentMonth)
        }
            emit("daysOff", monthsWithDaysOff);                  
     }
}

//check if the date is selected
function dateIsSelected(currentMonth: MonthsWithDaysOff, date: Date){
    return !!currentMonth.days.find(element => {
            return element == date.day;
        }) 
}


//find the month corresponding to the date
function findMonthBelongsToDate(monthsWithDaysOff: MonthsWithDaysOff[], mounthOfdayOff: MonthsWithDaysOff){
    return monthsWithDaysOff.filter((element) => {
            return element.date === mounthOfdayOff.date
        })
}

//add new day off
function addNewDayOff(currentMonth: MonthsWithDaysOff, date: Date){
    currentMonth.days.push(date.day)
    return currentMonth;
}

// remove day off
function removeDayOff(mounthOfdayOff: MonthsWithDaysOff, date: Date){
    return mounthOfdayOff.days.filter(element => { return element !== date.day;})
}

// check if the day is a free day
function isFreeDay(date: Date){
    let day = new Date(`${date.year}-${date.month}-${date.day}`).getUTCDay()
    return !props.freeDayList.includes(day);
}

// set class
function setClass(date: Date){
    let dateStr = `${date.year}-${date.month}-${date.day}`; 
    let dateState = `${viewState.year.value}-${viewState.month.value}-${viewState.day.value}`; 

if(!dateIsValid(viewState.year.value, viewState.month.value, viewState.day.value)){
    return 'date-invalid'
}else{
    if(dateStr === dateState){
        if(date.isDayOff){
            return 'today-isDayOff';
        }else if(date.isHoliday) {
            return 'today-holiday';

        }else if(isFreeDay(date)){
            return 'today-freeDay'
        }
        else{
            return 'today';
        }
    }

    if(date.isHoliday){
        return 'holiday';
    }

    if(date.isDayOff){
        return 'isDayOff';
    }

    if(isFreeDay(date)){
       return 'freeDay';
    }
    if(date.isCurrentMonth){
        return 'current-month'
    }else{
        return 'no-current-month'
    }
}
   
}
</script>

<template>
    <div id="container-calendar">
        <h1>Calendário</h1>
            <div id="input-container-calendar">
                <div class="input-wrapper">
                    <div>
                        <label :class="viewState.year.error ? 'input-label-erro' : 'input-label'" for="year">Ano:</label>
                        <input type="number" :class="
                            viewState.year.error ? 'custom-input-error' : 'custom-input'
                        " v-model="viewState.year.value" @input="viewState.year.validation" />
                    </div>
                    <label v-if="viewState.year.error" class="error-message">{{
                        viewState.year.error
                    }}</label>
                </div>
                <div class="input-wrapper">
                    <div>
                        <label :class="
                            viewState.month.error ? 'input-label-erro' : 'input-label'
                        " for="month">Mês:</label>
                        <input type="number" min="1" max="12" :class="
                            viewState.month.error ? 'custom-input-error' : 'custom-input'
                        " id="month" v-model="viewState.month.value" @input="viewState.month.validation" />
                    </div>
                    <label v-if="viewState.month.error" class="error-message">{{
                        viewState.month.error
                    }}</label>
                </div>
                <div class="input-wrapper">
                    <div>
                        <label :class="viewState.day.error ? 'input-label-erro' : 'input-label'" for="day">Dia:</label>
                        <input type="number" min="1" max="31" :class="
                            viewState.day.error ? 'custom-input-error' : 'custom-input'
                        " id="day" v-model="viewState.day.value" @input="viewState.day.validation" />
                    </div>
                    <label v-if="viewState.day.error" class="error-message">{{
                        viewState.day.error
                    }}</label>
                </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Dom</th>
                    <th>Seg</th>
                    <th>Ter</th>
                    <th>Qua</th>
                    <th>Qui</th>
                    <th>Sex</th>
                    <th>Sáb</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="week in daysGenerator" :key="week[0]">
                    <td :class="setClass(day)" v-for="day in week" :key="day" @click="selectCalendarDay(day)">
                       {{ day.day }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<style scoped>
#container-calendar {
    display: flex;
    max-width: 800px;
    flex-direction: column;
    line-height: 1.125em;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 500px;
    flex-wrap: wrap;
    background-color: var( --pontotel-white);
    border-radius: 8px;
    line-height: 1.125em;
    padding-bottom: 32px;
    justify-content: center;
}

h1 {
    margin-top: 32px;
    margin-bottom: 32px;
    font-size: 32px;
}

#input-container-calendar {
    display: flex;
    justify-content: center;
    /* margin: 0 auto; */
}

table {
    border-collapse: collapse;
    text-align: center;
}

td,
th {
    padding: 8px;
}

.current-month {
    color: var(--pontotel-light-blue);
}

.current-month:hover {
    background-color: var(--pontotel-light-red);
    color: var(--pontotel-black);
}


.no-current-month {
    color: var(--pontotel-gray);
}

.holiday {
    background-color: var(--pontotel-orange);
    color: var(--pontotel-black);
}

.freeDay {
    background-color: var(--pontotel-light-gray);
    color: var(--pontotel-white);
}
.today {
    border-bottom-style: groove;
    border-bottom-color: var(--pontotel-black);
    color: var(--pontotel-light-blue);
}
.date-invalid {
    background-color: var(--pontotel-white);
    color: var(--pontotel-light-gray);
}
.today-freeDay {
    border-bottom-style: groove;
    border-bottom-color: var(--pontotel-black);
    background-color: var(--pontotel-light-gray);
    color: var(--pontotel-white);
}
.today-holiday {
    border-bottom-style: groove;
    border-bottom-color: var(--pontotel-black);
    background-color: var(--pontotel-orange);
    color: var(--pontotel-black);
}
.today-isDayOff {
    border-bottom-style: groove;
    border-bottom-color: var(--pontotel-black);
    background-color: var(--pontotel-red);
    color: var(--pontotel-white);
}
.today:hover {
    background-color: var(--pontotel-light-violet);
    color: var(--pontotel-black);
}
.isDayOff {
    background-color: var(--pontotel-red);
    color: var(--pontotel-white);
}

/* input style */
.input-wrapper {
    margin-bottom: 20px;
}

.custom-input-error {
    color: var(--pontotel-red);
    width: 60px;
    padding: 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    outline: 0px;
}
.custom-input-error:focus-visible {
    outline: 0px;
}

.custom-input {
    width: 60px;
    padding: 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    color: #333;
}

.custom-input:focus-visible {
    outline: 0px;
}

.error-message {
    color: var(--pontotel-red);
    width: 60px;
    padding: 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
}


.input-label {
    pointer-events: none;
    transition: 0.2s ease all;
    color: var(--pontotel-gray);
}

.input-label-erro {
    pointer-events: none;
    transition: 0.2s ease all;
    color: var(--pontotel-red);
}
</style>