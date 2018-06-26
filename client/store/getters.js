/**
 * Store getters
 */

import { view } from '../config'

const getters = {
  entryPoints (state) {
    return state.entryPoints
  },
  entryPointsLoadError (state) {
    return state.entryPointsLoadError
  },
  entryPointsLoading (state) {
    return state.entryPointsLoading
  },

  questions (state) {
    return state.questions
  },
  questionsLoadError (state) {
    return state.questionsLoadError
  },
  questionsLoading (state) {
    return state.questionsLoading
  },

  question (state) {
    return state.question
  },
  questionLoadError (state) {
    return state.questionLoadError
  },
  questionLoading (state) {
    return state.questionLoading
  },

  votingInProgress (state) {
    return state.votingInProgress
  },
  votingError (state) {
    return state.votingError
  },

  sidebarOpened (state) {
    return state.sidebarOpened
  },

  views () {
    return view.default
  },

  view (state) {
    return state.view
  },

  status (state) {
    return state.status
  },
  statuses (state) {
    return state.statuses
  },
  statusesOpened (state) {
    return state.statusesOpened
  }
}

export default getters
