import { shallowMount } from "@vue/test-utils";
import Calendar from "@/components/Calendar.vue";

describe("Calendar", () => {
  it("should render correct number of days for the current month", () => {
    const wrapper = shallowMount(Calendar);

    // Assume the current month has 30 days
    expect(wrapper.findAll(".calendar-day")).toHaveLength(30);
  });

  it("should render correct number of days for the previous month", () => {
    const wrapper = shallowMount(Calendar);

    // Assume the previous month has 5 days
    expect(wrapper.findAll(".calendar-day-previous")).toHaveLength(5);
  });

  it("should render correct number of days for the next month", () => {
    const wrapper = shallowMount(Calendar);

    // Assume the next month has 7 days
    expect(wrapper.findAll(".calendar-day-next")).toHaveLength(7);
  });

  it("should update expectedDaysValue correctly when daysOffList prop is updated", async () => {
    const wrapper = shallowMount(Calendar);

    // Set daysOffList prop to an array with 2 days off
    await wrapper.setProps({ daysOffList: [{ date: "2023-04", days: [1, 15] }] });

    // Expect expectedDaysValue to be 28 (30 days in current month minus 2 days off)
    expect(wrapper.vm.$data.expectedDaysValue).toBe(28);
  });

  it("should call expectedDays() method when daysOffList prop is updated", async () => {
    const wrapper = shallowMount(Calendar);
    const expectedDaysSpy = jest.spyOn(wrapper.vm, "expectedDays");

    // Set daysOffList prop to an array with 1 day off
    await wrapper.setProps({ daysOffList: [{ date: "2023-04", days: [1] }] });

    // Expect expectedDays() method to be called once
    expect(expectedDaysSpy).toHaveBeenCalledTimes(1);
  });
});
