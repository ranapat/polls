/**
 * Store actions
 *
 * o loads data with axios
 * o takes all api endpoints from config
 * o triggers all needed commits
 */

import axios from 'axios'
import parseLinkHeader from 'parse-link-header'

import { api } from '../config'
import { types } from './mutations'

const actions = {
  populateEntryPoints ({ commit, getters }) {
    const entryPoints = getters.entryPoints
    if (entryPoints === null) {
      commit(types.startLoadingEntryPoints)
      commit(types.populateEntryPoints, {})
      commit(types.setEntryPointsLoadError, null)

      commit(types.setStatus, 'loading entry points ...')

      return new Promise((resolve, reject) => {
        axios.get(api.rootApiEntryPoint).then(
          response => {
            commit(types.populateEntryPoints, response.data)
            commit(types.stopLoadingEntryPoints)

            commit(types.setStatus, 'entry points loaded')

            resolve()
          }, error => {
            commit(types.stopLoadingEntryPoints)
            commit(types.setEntryPointsLoadError, error)

            commit(types.setStatus, 'entry points error')

            reject()
          }
        )
      })
    } else {
      commit(types.setStatus, 'getting entry points from memory ...')

      return new Promise((resolve, reject) => {
        if (entryPoints.questions_url) {
          resolve()
        } else {
          reject()
        }
      })
    }
  },

  loadQuestions ({ commit, getters, dispatch }, url) {
    commit(types.startLoadingQuestions)
    commit(types.populateQuestions, [])
    commit(types.setQuestionsLoadError, null)

    commit(types.setStatus, 'loading questions ...')

    return new Promise((resolve, reject) => {
      dispatch('populateEntryPoints', null, { root: true })
        .then(() => {
          axios.get(
            api.rootApiEntryPoint + (url === undefined ? getters.entryPoints.questions_url : url)
          ).then(
            response => {
              commit(types.populateQuestions, {
                items: response.data,
                navigation: response.headers.link === undefined ? null : parseLinkHeader(response.headers.link)
              })
              commit(types.stopLoadingQuestions)

              commit(types.setStatus, 'questions loaded')

              resolve()
            }, error => {
              commit(types.stopLoadingQuestions)
              commit(types.setQuestionsLoadError, error)

              commit(types.setStatus, 'questions error')

              reject()
            })
        })
        .catch(err => {
          commit(types.stopLoadingQuestions)
          commit(types.setQuestionsLoadError, err)

          commit(types.setStatus, 'questions error')

          reject()
        })
    })
  },

  loadQuestion ({ commit, dispatch }, url) {
    commit(types.startLoadingQuestion)
    commit(types.populateQuestion, null)
    commit(types.setQuestionLoadError, null)

    commit(types.setStatus, 'loading question ...')

    return new Promise((resolve, reject) => {
      dispatch('populateEntryPoints', null, { root: true })
        .then(() => {
          axios.get(
            api.rootApiEntryPoint + url
          ).then(
            response => {
              commit(types.populateQuestion, response.data)
              commit(types.stopLoadingQuestion)

              commit(types.setStatus, 'question loaded')

              resolve()
            }, err => {
              commit(types.stopLoadingQuestion)
              commit(types.setQuestionLoadError, err)

              commit(types.setStatus, 'question error')

              reject()
            })
        })
        .catch(err => {
          commit(types.stopLoadingQuestion)
          commit(types.setQuestionLoadError, err)

          commit(types.setStatus, 'question error')

          reject()
        })
    })
  },

  findQuestionById ({ commit, getters }, id) {
    return new Promise((resolve, reject) => {
      const questions = getters.questions.items

      let question
      for (const _question of questions) {
        if (_question.url.replace(/\/questions\/([0-9]+)/, '$1') === id) {
          question = _question
          break
        }
      }

      if (question === undefined) {
        reject()
      } else {
        resolve(question)
      }
    })
  },

  submitVote ({ commit, getters, dispatch }, { questionId, choiceId }) {
    commit(types.startVoting)
    commit(types.setVotingError, null)

    commit(types.setStatus, 'start voting ...')

    return new Promise((resolve, reject) => {
      dispatch('populateEntryPoints', null, { root: true })
        .then(() => {
          axios.post(
            api.rootApiEntryPoint + '/questions/' + questionId + '/choices/' + choiceId
          ).then(
            response => {
              dispatch(
                'findQuestionById',
                response.data.url.replace(/\/questions\/([0-9]+)\/choices\/[0-9]+/, '$1'),
                { root: true }
              ).then(responseQuestion => {
                for (const choice of responseQuestion.choices) {
                  if (choice.url === response.data.url) {
                    choice.votes = response.data.votes
                    break
                  }
                }
                commit(types.updateQuestion, responseQuestion)

                commit(types.stopVoting)

                commit(types.setStatus, 'stop voting, update complete')

                resolve()
              }).catch(() => {
                commit(types.stopVoting)

                commit(types.setStatus, 'stop voting, update failed')

                reject()
              })
            }, err => {
              commit(types.stopVoting)
              commit(types.setVotingError, err)

              commit(types.setStatus, 'voting error')

              reject()
            })
        })
        .catch(err => {
          commit(types.stopVoting)
          commit(types.setVotingError, err)

          commit(types.setStatus, 'voting error')

          reject()
        })
    })
  },

  dismissQuestion ({ commit }) {
    commit(types.dismissQuestion, null)
    commit(types.setQuestionLoadError, null)

    commit(types.setStatus, 'question dismiss')
  },

  openSidebar ({ commit }) {
    commit(types.openSidebar)

    commit(types.setStatus, 'open sidebar')
  },
  closeSidebar ({ commit }) {
    commit(types.closeSidebar)

    commit(types.setStatus, 'close sidebar')
  },

  setView ({ commit }, view) {
    commit(types.setView, view)

    commit(types.setStatus, `set view to ${view}`)
  },
  openStatuses ({ commit }) {
    commit(types.openStatuses)

    commit(types.setStatus, 'open statuses')
  },
  closeStatuses ({ commit }) {
    commit(types.closeStatuses)

    commit(types.setStatus, 'close statuses')
  }
}

export default actions
