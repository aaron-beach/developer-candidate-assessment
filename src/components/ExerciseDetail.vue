<template>
  <div>
    <h1>{{ exercise.name }} Avg.Score: {{ exercise.averageScore }}</h1>
    <div
      class="exercise"
      :class="{ stripe: i % 2 === 0 }"
      v-for="(detail, i) in scores"
      :key="detail.id"
    >
      {{ detail.name }} {{ detail.score }}
    </div>
  </div>
</template>

<script>
import StudentService from '@/services/StudentService';
export default {
  name: 'ExerciseDetail',
  props: {
    exercise: {
      type: Object,
    },
  },
  data: function() {
    return {
      exerciseDetails: {},
      students: {},
    };
  },
  async created() {
    const studentService = new StudentService();
    this.students = await studentService.getAll();
  },
  computed: {
    scores: function() {
      return this.students.map((item, i) =>
        Object.assign({}, item, this.exerciseDetails.studentScores[i])
      );
    },
  },
  watch: {
    exercise: function() {
      this.exerciseDetails = this.exercise;
    },
  },
};
</script>

<style>
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

.student-score {
  margin-left: auto;
  margin-right: 0;
}
</style>
