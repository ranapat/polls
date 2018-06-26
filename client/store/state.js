/**
 * Store states
 */

import { view } from '../config'

const state = {
  entryPoints: null,
  entryPointsLoading: false,
  entryPointsLoadError: null,

  questions: null,
  questionsLoading: false,
  questionsLoadError: null,

  question: null,
  questionLoading: false,
  questionLoadError: null,

  votingInProgress: false,
  votingError: null,

  sidebarOpened: true,

  view: view.list.key,

  status: '',
  statuses: [],
  statusesOpened: false
}

export default state
