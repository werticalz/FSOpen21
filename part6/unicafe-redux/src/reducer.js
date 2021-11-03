const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newNumber
  switch (action.type) {
    case 'GOOD':
      newNumber = state.good + 1
      state = { ...state, good: newNumber }
      return state
    case 'OK':
      newNumber = state.ok + 1
      state = { ...state, ok: newNumber }
      return state
    case 'BAD':
      newNumber = state.bad + 1
      state = { ...state, bad: newNumber }
      return state
    case 'ZERO':
      state = { good: 0, ok: 0, bad: 0 }
      return state
    default: return state
  }

}

export default counterReducer