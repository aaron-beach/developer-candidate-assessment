import RestService from './RestService';

/**
 * Service implementation for getting and modifying Scores resources.
 */
export default class ExerciseService extends RestService {
  constructor() {
    super('studentScores');
  }
}
