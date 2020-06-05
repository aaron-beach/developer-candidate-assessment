<template>
  <div class="student">
    <div class="student-avatar--container">
      <img :src="student.avatar" alt="student avatar" class="student-avatar" />
    </div>
    {{ student.name }}
    <input
      class="student-score edit-me"
      :placeholder="student.score"
      @keydown.enter="endEdit"
      v-model.trim="student.score"
    />
  </div>
</template>

<script>
import ScoresService from '@/services/ScoresService';
export default {
  name: 'StudentExercise',
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {};
  },
  methods: {
    endEdit() {
      event.currentTarget.blur();
      // On enter close edit input and save value to API
      this.updateScores();
    },
    async updateScores() {
      const scoresService = new ScoresService();
      const updateScore = {
        score: this.student.score,
        studentId: this.student.id,
      };
      await scoresService._updateEntry(this.student.id, updateScore);
    },
  },
};
</script>

<style>
.student {
  width: 100%;
  display: flex;
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
