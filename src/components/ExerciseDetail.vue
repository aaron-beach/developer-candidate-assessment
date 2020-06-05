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
      <div class="student-avatar--container">
        <img :src="detail.avatar" alt="student avatar" class="student-avatar" />
      </div>
      {{ detail.name }}
      <input
        class="student-score edit-me"
        :placeholder="detail.score"
        @keydown.enter="endEdit"
        v-model.trim="newScore[i]"
      />
    </div>
  </div>
</template>

<script>
import StudentService from '@/services/StudentService';
import ScoresService from '@/services/ScoresService';
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
      newScore: [],
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
    endEdit() {
      event.currentTarget.blur();
      // On enter close edit input and save value to API
      this.updateScores();
    },
    async updateScores() {
      const scoresService = new ScoresService();
      let position = 0;
      for (let i = 0; i < this.newScore.length; i++) {
        if (this.newScore[i] != undefined) {
          position = i;
        }
      }
      const updateScore = {
        score: this.newScore[position],
        studentId: this.students[position].id,
      };
      await scoresService._updateEntry(this.scores[position].id, updateScore);
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
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  font-size: 4rem;
  height: 100%;
  margin-left: auto;
  margin-right: 20px;
  text-align: center;
  width: 15rem;
}
.edit-me:focus {
  width: 15rem;
  height: 100%;
  border-radius: 20px;
  background-color: pink;
}

.student-avatar {
  width: 150px;
}
.student-avatar--container {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 150px;
}
</style>
