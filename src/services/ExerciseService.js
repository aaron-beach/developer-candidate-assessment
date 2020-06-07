import RestService from './RestService';

/**
 * Service implementation for getting and modifying Exercise resources.
 */
export default class ExerciseService extends RestService {
  exercises = this.getAll();
  scores = [];
  constructor() {
    super('exercises');
  }

  get exercises() {
    return this._exercises;
  }

  getExerciseByIdAndScores(id) {
    const suffix = `${id}?_embed=studentScores`;
    this.scores = this._getAllIncluding(suffix);
    return this.scores;
  }

  exercisesWithScores() {
    const includeStudentScores = '?_embed=studentScores';
    this.scores = this._getAllIncluding(includeStudentScores);
    return this.scores;
  }
}
