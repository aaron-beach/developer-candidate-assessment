<template>
  <div>
    <!--
    triggered on click
    @event click
    @property {number} id - filter called
  -->
    <div
      class="exercise"
      :class="{ stripe: i % 2 === 0 }"
      v-for="(exercise, i) in exercises"
      :key="exercise.id"
      @click="showDetail(exercise.id)"
    >
      {{ exercise.name }}
      <span class="exercise-average-score">
        {{ exercise.averageScore }}
      </span>
    </div>
  </div>
</template>

<script>
import ExerciseService from '@/services/ExerciseService';

export default {
  props: {
    /**
     * The class average sync'ed for the views to access.
     */
    averageScore: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      exercises: [],
    };
  },
  async created() {
    const exerciseService = new ExerciseService();
    this.exercises = await exerciseService.exercisesWithScores();
  },
  watch: {
    /**
     * Gets called when on exercises change.
     *
     */
    exercises: {
      handler() {
        this.setAverageScore(this.exercises);
        this.setClassScore();
      },
    },
  },
  methods: {
    /**
     * Gets called when on exercises change.
     *
     * @param {Object} object Exercises from api call.
     */
    async setAverageScore(object) {
      for (let i = 0; i < object.length; i++) {
        const scores = this.getArrayFromObject(
          object[i].studentScores,
          'score'
        );
        object[i].averageScore = this.getAverageNumberFromArray(scores);
      }
    },
    /**
     * Gets called when on exercises change.
     *
     */
    async setClassScore() {
      const scores = this.getArrayFromObject(this.exercises, 'averageScore');
      const score = this.getAverageNumberFromArray(scores);
      process.nextTick(() => {
        /**
         * Triggers when the Average number changes
         *
         * @property {number} newValue new value set
         */
        this.$emit('update:averageScore', Number(score));
      });
    },
    /**
     * Gets called when the user clicks on the exercise
     * 
     * @event showDetail
     * @type {object}
     */
    showDetail: function(exercise) {
      const exerciseAverage = this.exercises.find(
        (elem) => elem.id === exercise
      );
      process.nextTick(() => {
        this.$emit('showDetail', exerciseAverage);
      });
    },
     /**
     * Gets called when averages are set.
     *
     * @param {Array} array Array of Numbers.
     */
    getAverageNumberFromArray: function(array) {
      const total = array.reduce((sum, value) => +sum + +value, 0);
      const average = total / array.length;
      return average.toFixed(1);
    },
     /**
     * Gets called when averages are set.
     *
     * @param {Object} object Exercise from api call.
     * @param {String} key name of key in the object.
     */
    getArrayFromObject: function(object, key) {
      let array = [];
      for (let i = 0; i < object.length; i++) {
        array.push(object[i][key]);
      }
      return array;
    },
  },
};
</script>

<style scoped>
.exercise {
  display: flex;
  border-bottom: 1px solid #add8e6;
  width: 100%;
  padding: 15px;
  font-weight: 600;
  cursor: pointer;
}

.exercise:hover {
  background-color: rgba(1, 141, 255, 0.1);
}

.stripe {
  background-color: #f5f5f5;
}

.exercise-average-score {
  margin-left: auto;
  margin-right: 0;
}
</style>
