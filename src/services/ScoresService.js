import RestService from './RestService';

/**
 * Service implementation for getting and modifying Scores resources.
 */
export default class ScoresService extends RestService {
  scores = this.getAll();
  constructor() {
    super('studentScores');
  }

  getScoresByExerciseId(id) {
    const suffix = `?exerciseId=${id}`;
    const scoresById = this._getAllIncluding(suffix);
    return scoresById;
  }

  async getExerciseAverage(id) {
    const suffix = `?exerciseId=${id}`;
    const exercise = this._getAllIncluding(suffix);
    let average = 0;
    for (const score in exercise) {
      isNaN(score) ? '' : (average += score);
    }
    return (average / exercise.length).toFixed(1);
  }

  classAverage() {
    let average = 0;
    for (const student in this.scores) {
      isNaN(student.score) ? '' : (average += student.score);
    }
    return (average / this.scores.length).toFixed(1);
  }
}
