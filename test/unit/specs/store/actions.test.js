import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { api } from '@/config'
import actions from '@/store/actions'

const mock = new MockAdapter(axios)

const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0

  const commit = (type, payload) => {
    const mutation = expectedMutations[count]

    try {
      expect(mutation.type).toEqual(type)
      if (payload) {
        expect(mutation.payload).toEqual(payload)
      }
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }

  const dispatch = (type, payload) => {
    const mutation = expectedMutations[count]

    try {
      expect(mutation.mode).toEqual('dispatch')
      expect(mutation.type).toEqual(type)
      if (payload) {
        expect(mutation.payload).toEqual(payload)
      }
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }

    return new Promise((resolve, reject) => { resolve() })
  }

  const getters = state

  action({ commit, dispatch, getters, state }, payload)

  if (expectedMutations.length === 0) {
    expect(count).toEqual(0)
    done()
  }
}

describe('actions', () => {
  it('load data with success', done => {
    const data = [
      { url: '', question: '', published_at: '', choices: [ {} ] }
    ]
    mock.onGet(api.rootApiEntryPoint + '/questions').replyOnce(200, data)

    testAction(actions.loadQuestions, null, {
      entryPoints: { questions_url: '/questions' }
    }, [
      { type: 'START_LOADING_QUESTIONS', payload: undefined },
      { type: 'POPULATE_QUESTIONS', payload: [] },
      { type: 'SET_QUESTIONS_LOAD_ERROR', payload: null },
      { type: 'SET_STATUS', payload: 'loading questions ...' },
      { mode: 'dispatch', type: 'populateEntryPoints' },
      { type: 'POPULATE_QUESTIONS', payload: { items: data, navigation: null } },
      { type: 'STOP_LOADING_QUESTIONS', payload: null },
      { type: 'SET_STATUS', payload: 'questions loaded' }
    ], done)
  })

  it('load repositories with error', done => {
    mock.onGet(api.rootApiEntryPoint + '/questions').replyOnce(404, {})

    testAction(actions.loadQuestions, null, {
      entryPoints: { questions_url: '/questions' }
    }, [
      { type: 'START_LOADING_QUESTIONS', payload: undefined },
      { type: 'POPULATE_QUESTIONS', payload: [] },
      { type: 'SET_QUESTIONS_LOAD_ERROR', payload: null },
      { type: 'SET_STATUS', payload: 'loading questions ...' },
      { mode: 'dispatch', type: 'populateEntryPoints' },
      { type: 'STOP_LOADING_QUESTIONS', payload: null },
      { type: 'SET_QUESTIONS_LOAD_ERROR', payload: new Error('Request failed with status code 404') },
      { type: 'SET_STATUS', payload: 'questions error' }
    ], done)
  })
})
