/**
 * Store mutations
 */

import Vue from 'vue'

const types = {
  startLoadingEntryPoints: 'START_LOADING_ENTRY_POINTS',
  stopLoadingEntryPoints: 'STOP_LOADING_ENTRY_POINTS',
  populateEntryPoints: 'POPULATE_ENTRY_POINTS',
  setEntryPointsLoadError: 'SET_ENTRY_POINTS_LOAD_ERROR',

  startLoadingQuestions: 'START_LOADING_QUESTIONS',
  stopLoadingQuestions: 'STOP_LOADING_QUESTIONS',
  populateQuestions: 'POPULATE_QUESTIONS',
  setQuestionsLoadError: 'SET_QUESTIONS_LOAD_ERROR',

  startLoadingQuestion: 'START_LOADING_QUESTION',
  stopLoadingQuestion: 'STOP_LOADING_QUESTION',
  populateQuestion: 'POPULATE_QUESTION',
  updateQuestion: 'UPDATE_QUESTION',
  dismissQuestion: 'DISMISS_QUESTION',
  setQuestionLoadError: 'SET_QUESTION_LOAD_ERROR',

  startVoting: 'START_VOTING',
  stopVoting: 'STOP_VOTING',
  setVotingError: 'SET_VOTING_ERROR',

  openSidebar: 'OPEN_SIDEBAR',
  closeSidebar: 'CLOSE_SIDEBAR',

  setView: 'SET_VIEW',
  setStatus: 'SET_STATUS',

  openStatuses: 'OPEN_STATUSES',
  closeStatuses: 'CLOSE_STATUSES'
}

const mutations = {
  [types.startLoadingEntryPoints] (state) {
    state.entryPointsLoading = true
  },
  [types.stopLoadingEntryPoints] (state) {
    state.entryPointsLoading = false
  },
  [types.populateEntryPoints] (state, payload) {
    state.entryPoints = payload
  },
  [types.setEntryPointsLoadError] (state, payload) {
    state.entryPointsLoadError = payload
  },

  [types.startLoadingQuestions] (state) {
    state.questionsLoading = true
  },
  [types.stopLoadingQuestions] (state) {
    state.questionsLoading = false
  },
  [types.populateQuestions] (state, payload) {
    state.questions = payload
  },
  [types.setQuestionsLoadError] (state, payload) {
    state.questionsLoadError = payload
  },

  [types.startLoadingQuestion] (state) {
    state.questionLoading = true
  },
  [types.stopLoadingQuestion] (state) {
    state.questionLoading = false
  },
  [types.populateQuestion] (state, payload) {
    state.question = payload
  },
  [types.updateQuestion] (state, payload) {
    const question = payload
    if (state.question.url === question.url) {
      state.question = question
    }

    const questionsItems = [ ...state.questions.items ]
    const questions = {
      items: questionsItems,
      navigation: state.questions.navigation
    }
    for (let _question of questionsItems) {
      if (_question.url === question.url) {
        questionsItems[questionsItems.indexOf(_question)] = question

        state.questions = questions
        break
      }
    }
  },
  [types.dismissQuestion] (state) {
    state.question = null
  },
  [types.setQuestionLoadError] (state, payload) {
    state.questionLoadError = payload
  },

  [types.startVoting] (state) {
    state.votingInProgress = true
  },
  [types.stopVoting] (state) {
    state.votingInProgress = false
  },
  [types.setVotingError] (state, payload) {
    state.votingError = payload
  },

  [types.openSidebar] (state) {
    state.sidebarOpened = true
  },
  [types.closeSidebar] (state) {
    state.sidebarOpened = false
  },

  [types.setView] (state, payload) {
    state.view = payload
  },

  [types.setStatus] (state, payload) {
    state.status = payload
    state.statuses.unshift(payload)

    console.log('New status set', `"${payload}"`)
  },

  [types.openStatuses] (state) {
    state.statusesOpened = true
  },
  [types.closeStatuses] (state) {
    state.statusesOpened = false
  }
}

export default mutations
export { types }
