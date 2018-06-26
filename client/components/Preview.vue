/**
 * List component
 *
 * o Shows data in list and grid mode
 */

<template>
  <div class="view-wrapper" v-if="questionLoading || questionLoadError || reduced">

    <div class="row">
      <div class="col-md-12 close">
        <b-btn @click.stop="close()">close</b-btn>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12" v-if="!questionLoading && !questionLoadError && reduced === null">No data</div>
      <div class="col-md-12" v-if="questionLoading">Question loading...</div>
      <div class="col-md-12" v-if="questionLoadError">Question loading error : {{ questionLoadError && questionLoadError.response ? questionLoadError.response.data.message : '' }}</div>
    </div>

    <div class="row data" v-if="reduced">
      <div class="col-md-12 hide">
        <h1>Question Details</h1>
        <h2>{{ reduced.question }}</h2>
        <ol>
          <li v-for="choice in reduced.choices" :key="choice.choice">
            <div class="row choice">
              <div class="col-md-6">{{ choice.choice }}</div>
              <div class="col-md-2">{{ choice.votes }}</div>
              <div class="col-md-2">{{ parseFloat(choice.percents * 100).toFixed(2) }} %</div>
              <div class="col-md-1">
                <b-btn :disabled="votingInProgress" @click.stop="vote(choice.id)">vote</b-btn>
              </div>

            </div>
          </li>
        </ol>
      </div>
    </div>


  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    /**
     * Close
     */
    close () {
      this.dismissQuestion()
    },
    /**
     * Vote
     */
    vote (id) {
      this.submitVote({
        questionId: this.reduced.id,
        choiceId: id
      })
    },
    /**
     * Maps the needed actions
     */
    ...mapActions([
      'dismissQuestion', 'submitVote'
    ])
  },
  computed: {
    /**
     * Transforms the data it shall
     * in the format it needs
     */
    reduced () {
      const question = this.question
      if (question) {
        let totalVotes = 0
        question.choices.forEach(choice => {
          totalVotes += choice.votes
        })

        return {
          id: question.url.replace(/\/questions\/([0-9]+)/, '$1'),
          question: question.question,
          choices: question.choices.map(choice => {
            return {
              id: choice.url.replace(/\/questions\/[0-9]+\/choices\/([0-9]+)/, '$1'),
              choice: choice.choice,
              votes: choice.votes,
              percents: choice.votes / totalVotes
            }
          })
        }
      } else {
        return undefined
      }
    },
    /**
     * Maps the needed getters
     */
    ...mapGetters([
      'question', 'questionLoading', 'questionLoadError', 'votingInProgress'
    ])
  }
}
</script>

<style lang="scss" scoped>
.view-wrapper {
  position: absolute;
  border: 1px solid #a8a8a8;
  background-color: #efefef;
  top: 25px;
  left: 25px;
  right: 25px;
  z-index: 999;

  .row {
    .close {
      padding: 5px;
    }
  }

  .choice {
    text-align: left;
    padding: 3px;
  }
}
</style>
