<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
    yearInputValidation,
    monthInputValidation,
    dayInputValidation,
} from "@/validators/dateInputValidation";

interface Date {
    day: number;
    month: number;
    year: number;
    isHoliday: boolean;
    isCurrentMonth: boolean;
}

const props = defineProps({
    holidayList: {
        type: Array,
        default: [],
    },
});

const emit = defineEmits(["expectedDays"]);

const expectedDaysValue = ref(0);

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

function checkHoliday(date: Date) {
    let dateStr: string;
    let monthStr: string;
    let dayStr: string;

    //making data compatible with the api
    dayStr = date.day < 10 ? "0" + date.day : "" + date.day;
    monthStr = date.month < 10 ? "0" + date.month : "" + date.month;
    dateStr = `${date.year}-${monthStr}-${dayStr}`;

    if (props.holidayList) {
        props.holidayList.find((element) => {
            return (date.isHoliday = element.date == dateStr);
        });
        return date;
    }
}

const daysGenerator = computed(() => {
    const numberDaysCurrentMonth = new Date(viewState.year.value, viewState.month.value, 0).getDate();
    const firstDayOfCurrentMonth = new Date(`${viewState.year.value}-${viewState.month.value}-1`).getDay() - 1;
    const lastDayMonthOfPrevius = new Date(viewState.year.value,viewState.month.value - 1,0).getDate();

    let days = [];

    //days of last month
    for (let i = lastDayMonthOfPrevius-firstDayOfCurrentMonth; i <= lastDayMonthOfPrevius; i++) {
        if(firstDayOfCurrentMonth > 0){
            let date = {} as Date;
            date.day = i;
            date.month = viewState.month.value - 1;
            date.year = viewState.month.value == 1 ? viewState.year.value - 1 : viewState.year.value;
            date.isCurrentMonth = false;
            checkHoliday(date);
            days.push(date);

        }
         
    }

    //TODO
    // expectedDaysValue.value = days.length 
    // emit("expectedDays", expectedDaysValue.value);

    //days of the current month
    for (let i = 1; i <= numberDaysCurrentMonth; i++) {
        let date = {} as Date;

        date.day = i;
        date.month = viewState.month.value;
        date.year = viewState.year.value;
        date.isCurrentMonth = true;

        checkHoliday(date);
        days.push(date);
    }

    //days of next month
    let remainingSpace = 42 - days.length;
    for (let i = 1; i <= remainingSpace ; i++) {
        let date = {} as Date;

        date.day = i;
        date.month = viewState.month.value + 1;
        date.year = viewState.month.value == 12 ? viewState.year.value + 1 : viewState.year.value;
        date.isCurrentMonth = false;

        checkHoliday(date);
        days.push(date);
    }

    return separatingDaysIntoWeeks(days);
});

function separatingDaysIntoWeeks(days: Array<Date>) {
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
</script>

<template>
    <div id="container">
        <h1>Calendário</h1>
        <div id="input-container">
            <div id="input-container">
                <div class="input-wrapper">
                    <div>
                        <label :class="viewState.year.error ? 'input-label-erro' : 'input-label'" for="year">Ano:</label>
                        <input type="number" :class="
                            viewState.year.error ? 'custom-input-error' : 'custom-input'
                        " v-model="viewState.year.value" @input="viewState.year.validation" />
                    </div>
                    <label v-if="viewState.year.error" class="label-error">{{
                        viewState.year.error
                    }}</label>
                </div>
                <div class="input-wrapper">
                    <div>
                        <label :class="
                            viewState.month.error ? 'input-label-erro' : 'input-label'
                        " for="month">Mês:</label>
                        <input type="number" :class="
                            viewState.month.error ? 'custom-input-error' : 'custom-input'
                        " id="month" v-model="viewState.month.value" @input="viewState.month.validation" />
                    </div>
                    <label v-if="viewState.month.error" class="label-error">{{
                        viewState.month.error
                    }}</label>
                </div>
                <div class="input-wrapper">
                    <div>
                        <label :class="viewState.day.error ? 'input-label-erro' : 'input-label'" for="day">Dia:</label>
                        <input type="number" :class="
                            viewState.day.error ? 'custom-input-error' : 'custom-input'
                        " id="day" v-model="viewState.day.value" @input="viewState.day.validation" />
                    </div>
                    <label v-if="viewState.day.error" class="label-error">{{
                        viewState.day.error
                    }}</label>
                </div>
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
                    <td :class="day.isCurrentMonth ? 'current-month' : 'no-current-month'" v-for="day in week" :key="day">
                        <div :class="day.isHoliday ? 'holiday' : ''">{{ day.day }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<style scoped>
#container {
    display: flex;
    max-width: 800px;
    flex-direction: column;
    line-height: 1.125em;
    text-align: center;
    padding-bottom: 32px;
}

h1 {
    margin-top: 32px;
    margin-bottom: 32px;
    font-size: 32px;
}

#input-container {
    display: flex;
    margin: 0 auto;
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

.day-clicked {
    background-color: rgba(103, 181, 211, 0.1);
    color: var(--pontotel-light-blue);
}

.no-current-month {
    color: #777;
}

.holiday {
    background-color: var(--pontotel-orange);
    border-radius: 8px;
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
}

.custom-input {
    width: 60px;
    padding: 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    color: #333;
}
.label-error {
    color: var(--pontotel-red);
    width: 60px;
    padding: 10px;
    border: none;
    background-color: transparent;
    font-size: 10px;
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