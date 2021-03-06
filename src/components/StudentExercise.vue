<template>
  <div class="student">
    <span class="student-container">
      <div class="student-avatar--container">
        <img
          :src="student.avatar"
          alt="student avatar"
          class="student-avatar"
        />
      </div>
      <h2 v-text="student.name" class="student-name" />
    </span>
    <!--
    triggered on submit
    @event submit
  -->
    <form class="input-container" id="userInput" @submit.prevent="checkForm">
       <!--
    triggered on keyup
    @event keyup.enter
  -->
      <input
        @keyup.enter="blur"
        class="student-score edit-me"
        type="number"
        :placeholder="student.score"
        v-model.number="score"
        required
      />
      <div v-if="errors.length" class="error-container">
        <b v-text="'Please correct the following error(s):'"></b>
        <ul>
          <li class="error" v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </div>
    </form>
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
    return {
      errors: [],
      score: '',
      validateInput: false,
    };
  },
  methods: {
    /**
     * Gets called on form submit/enter.
     *
     */
    checkForm: function() {
      const invalidInput = this.wrongNumber(this.score);
      if (invalidInput) {
        event.preventDefault();
        event.currentTarget.focus();
        this.validateInput = false;
        this.errors = [];
        this.errors.push('Scores are a number between 0 and 3.');
        this.score = '';
      } else {
        event.currentTarget.blur();
        this.validateInput = true;
        this.errors = [];
        this.student.score = this.score;
        this.endEdit();
      }
    },
    /**
     * Gets called when on exercises change.
     *
     * @param {Number} score value of new input.
     */
    wrongNumber: function(score) {
      if (score > 3) {
        return true;
      }
      return false;
    },
     /**
     * Gets called by formcheck.
     *
     */
    endEdit() {
      if (this.validateInput) {
        this.updateScores();
      }
    },
     /**
     * Gets called on input Enter key.
     *
     */
    blur() {
      event.currentTarget.blur();
    },
    /**
     * Gets called by endEdit.
     *
     */
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

<style scoped>
.student {
  align-content: space-around;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.student-name {
  height: 50%;
}
.student-score {
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  cursor: pointer;
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
  background-color: rgba(167, 167, 167, 0.657);
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
.input-container {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 10px;
}
.error {
  color: red;
}
.error-container {
  color: red;
  font-weight: 100;
  font-size: 14px;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
