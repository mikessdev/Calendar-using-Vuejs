// import { shallowMountsim  } from '@vue/test-utils';
// import Calendar from '@/components/Calendar.vue';

// describe('Calendar.vue', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = shallowMount(Calendar, {
//       props: {
//         holidayList: [
//           // mock holiday list data
//         ],
//         daysOffList: [
//           // mock days off list data
//         ],
//         freeDayList: [
//           // mock free day list data
//         ],
//       },
//     });
//   });

//   afterEach(() => {
//     wrapper.unmount();
//   });

//   it('renders the component correctly', () => {
//     expect(wrapper.exists()).toBe(true);
//   });

//   it('calculates expectedDaysValue correctly', () => {
//     // Set the values for year, month, and day
//     wrapper.vm.viewState.year.value = 2023;
//     wrapper.vm.viewState.month.value = 4;
//     wrapper.vm.viewState.day.value = 8;

//     // Call the computed property to trigger the calculation
//     const daysGenerator = wrapper.vm.daysGenerator;

//     // Assert the expectedDaysValue is calculated correctly
//     expect(wrapper.vm.expectedDaysValue.value).toBe(/* expected value */);
//   });