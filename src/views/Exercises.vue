<template>
  <div>
    <div class="title" v-if="!details">
      <h1>Exercises</h1>
      <h1 class="average-score">Avg.Score: {{ averageScore }}</h1>
    </div>
    <card class="exercises">
      <exercises-list
        :averageScore.sync="averageScore"
        @showDetail="updateExerciseDetail"
        v-if="!details"
      />
      <exercise-detail
        v-if="details"
        :exercise="exerciseDetails"
        @showAll="showAllExersizes"
      />
    </card>
  </div>
</template>

<script>
import Card from '@/components/ui/Card';
import ExercisesList from '@/components/ExercisesList';
import ExerciseDetail from '@/components/ExerciseDetail';

export default {
  data() {
    return {
      details: false,
      averageScore: 0,
      exerciseDetails: {},
    };
  },
  components: { Card, ExercisesList, ExerciseDetail },
  methods: {
    updateExerciseDetail(variable) {
      this.details = !this.details;
      this.exerciseDetails = variable;
    },
    showAllExersizes: function() {
      this.details = !this.details;
    },
  },
};
</script>

<style scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.exercises {
  width: 100%;
}
</style>
