import state from '@/store/state'
import * as config from '@/config'

describe('store.state', () => {

  it('check initial values', () => {
    expect(state.entryPoints).toEqual(null)
    expect(state.entryPointsLoading).toEqual(false)
    expect(state.entryPointsLoadError).toEqual(null)

    expect(state.questions).toEqual(null)
    expect(state.questionsLoading).toEqual(false)
    expect(state.questionsLoadError).toEqual(null)

    expect(state.question).toEqual(null)
    expect(state.questionLoading).toEqual(false)
    expect(state.questionLoadError).toEqual(null)

    expect(state.votingInProgress).toEqual(false)
    expect(state.votingError).toEqual(null)


    expect(state.sidebarOpened).toEqual(true)
    expect(state.view).toEqual(config.view.list.key)
    expect(state.status).toEqual('')
    expect(state.statuses).toEqual([])
    expect(state.statusesOpened).toEqual(false)
  })

})
