<template>
  <div>
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
    this.exercises = await exerciseService.getAll();
    this.exercises = await exerciseService.exercisesWithScores();
    this.getAverageScore();
    this.classScore();
  },
  methods: {
    async classScore() {
      const score = this.getClassAverageScore();
      process.nextTick(() => {
        this.$emit('update:averageScore', Number(score));
      });
    },
    calculateAverageScore: function(scores) {
      const totalScore = scores.reduce((sum, score) => +sum + +score, 0);
      const averageScore = totalScore / scores.length;
      return averageScore.toFixed(1);
    },
    getArrayOfStudentScores: function(object) {
      let exerciseScores = [];
      object.forEach((student) => exerciseScores.push(student.score));
      return exerciseScores;
    },
    getClassAverageScore: function() {
      let scores = [];
      this.exercises.forEach((exercise) => {
        scores.push(exercise.averageScore);
      });
      return this.calculateAverageScore(scores);
    },
    showDetail: function(exercise) {
      const exerciseAverage = this.exercises.find(
        (elem) => elem.id === exercise
      );
      // Emit only after the constructor has finished
      process.nextTick(() => {
        this.$emit('showDetail', exerciseAverage);
      });
    },
    async getAverageScore() {
      try {
        this.exercises.forEach((exercise) => {
          const scores = this.getArrayOfStudentScores(exercise.studentScores);
          exercise.averageScore = this.calculateAverageScore(scores);
        });
      } catch (ex) {
        console.log(ex);
      }
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
