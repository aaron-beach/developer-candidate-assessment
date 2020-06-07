<template>
  <div>
    <div @click="showAll" class="exercise-title">
      <h1>{{ exercise.name }}</h1>
      <h1 class="average-score">
        Avg. Exercise Score: {{ exercise.averageScore }}
      </h1>
    </div>
    <div
      class="exercise"
      :class="{ stripe: i % 2 === 0 }"
      v-for="(detail, i) in scores"
      :key="i"
    >
      <student-exercise :student="detail"></student-exercise>
    </div>
  </div>
</template>

<script>
import StudentService from '@/services/StudentService';
import StudentExercise from './StudentExercise';
export default {
  name: 'ExerciseDetail',
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      students: [],
    };
  },
  components: {
    StudentExercise,
  },
  async created() {
    const studentService = new StudentService();
    this.students = await studentService.getAll();
  },
  computed: {
    scores: function() {
      return this.students.map((item, i) =>
        Object.assign({}, item, this.exercise.studentScores[i])
      );
    },
  },
  methods: {
    showAll: function() {
      this.$emit('showAll');
    },
  },
};
</script>

<style scoped>
* {
  transition: all 0.3s ease;
}
.exercise {
  border-bottom: 1px solid #add8e6;
  display: flex;
  font-weight: 600;
  padding: 15px;
  width: 100%;
}
.exercise-title {
  background-color: rgba(31, 154, 255, 0);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 7rem;
  line-height: 7rem;
}

.exercise:hover,
.exercise-title:hover {
  background-color: rgba(1, 141, 255, 0.2);
}

.stripe {
  background-color: #f5f5f5;
}
</style>
