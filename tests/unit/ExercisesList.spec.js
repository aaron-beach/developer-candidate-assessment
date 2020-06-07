/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import ExerciseService from '@/services/ExerciseService';
import ExercisesList from '@/components/ExercisesList.vue';
jest.mock('@/services/ExerciseService');

describe('ExercisesList.vue', () => {
  /** @type {Wrapper<Vue>} */
  let wrapper;

  beforeEach(() => {
    ExerciseService.mockClear();
    wrapper = shallowMount(ExercisesList);
  });

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('loads exercises when the page is created', () => {
    expect(ExerciseService).toHaveBeenCalledTimes(1);
    expect(
      ExerciseService.mock.instances[0].exercisesWithScores
    ).toHaveBeenCalledTimes(1);
  });

  it('sets exercises on the vue instance from the service', async () => {
    const exercises = ['test', 'test2', 'test3'];

    ExerciseService.mockImplementation(() => {
      return {
        async exercisesWithScores() {
          return exercises;
        },
      };
    });

    wrapper = shallowMount(ExercisesList);
    await Vue.nextTick();

    expect(wrapper.vm.exercises).toBe(exercises);
  });

  it('returns average score from array', async () => {
    expect(wrapper.vm.getAverageNumberFromArray([4, 2])).toBe('3.0');
    expect(wrapper.vm.getAverageNumberFromArray([2, 2, 2, 2])).toBe('2.0');
    expect(wrapper.vm.getAverageNumberFromArray([-4, 2])).toBe('-1.0');
  });

  it('emits object when called', async () => {
    wrapper.vm.$emit('averageScore');
    expect(wrapper.emitted('averageScore')).toBeTruthy();
  });
  it('emits object when called', async () => {
    wrapper.vm.$emit('showDetail');

    expect(wrapper.emitted('showDetail')).toBeTruthy();
  });

  it('calls showDetail when click on Exercise', () => {
    spyOn(wrapper.vm, 'showDetail');

    wrapper.find('.exercise').trigger('click');
    expect(wrapper.vm.showDetail).toBeCalled();
  });

  it('calls handleClick when click on exercise', () => {
    const stub = jest.fn();
    wrapper.setMethods({ showDetail: stub });

    const el = wrapper.find('.exercise').trigger('click');
    expect(stub).toBeCalled();
  });

  it('return array from object', () => {
    expect(wrapper.vm.getArrayFromObject({ key: 1 }, 'key')).toEqual([]);
  });
  it('exercise element exists', () => {
    expect(wrapper.find('.exercise').exists()).toBe(true);
  });
  it('average score element exists', () => {
    expect(wrapper.find('.exercise-average-score').exists()).toBe(true);
  });
});
