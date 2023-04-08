


// import { createStore } from 'vuex'

// export default createStore({
//   state() {
//     return {
//         holidays: []
//     }
//   },
//   getters: {
//     getHolidays(state){
//         return state.holidays;
//     }
// },
// mutations: {
//     setHolidays(state, holidays) {
//         state.holidays = holidays
//     }
// },
// actions: {
//       async getBrazilHolidays(context) {
//             const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${2023}`)
//             const holidays = response.json(); 
//             context.commit('setHolidays', holidays);
//       }
//   },
//   modules: {
//   }
// })
