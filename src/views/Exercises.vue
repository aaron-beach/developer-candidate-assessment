<template>
  <div>
    <div class="title">
      <h1>Exercises</h1>
      <h1 class="average-score">Avg.Score:</h1>
    </div>
    <card class="exercises">
      <exercises-list />
    </card>
  </div>
</template>

<script>
import Card from '@/components/ui/Card';
import ExercisesList from '@/components/ExercisesList';

export default {
  components: { Card, ExercisesList },
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
