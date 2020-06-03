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
      :key="detail.id"
    >
      <div class="student-avatar--container">
        <img :src="detail.avatar" alt="student avatar" class="student-avatar" />
      </div>
      {{ detail.name }}
      <span class="student-score">
        {{ detail.score }}
      </span>
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
      students: [],
    };
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

<style>
.exercise {
  display: flex;
  border-bottom: 1px solid #add8e6;
  width: 100%;
  padding: 15px;
  font-weight: 600;
  cursor: pointer;
}
.exercise-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.exercise:hover,
.exercise-title:hover {
  background-color: rgba(1, 141, 255, 0.1);
}

.stripe {
  background-color: #f5f5f5;
}

.student-score {
  margin-left: auto;
  margin-right: 0;
}

.student-avatar {
  width: 100%;
}
.student-avatar--container {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 100%;
}
</style>
