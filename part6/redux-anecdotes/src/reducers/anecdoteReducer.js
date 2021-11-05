import anecdoteService from '../services/anecdote'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'VOTE':
      let aToChange = (state.find(e => e.id === action.data.id))
      aToChange = { ...aToChange, votes: aToChange.votes + 1 }
      return state.map(a => a.id !== action.data.id ? a : aToChange)
    case 'INIT':
      return action.data

    default: return state
  }
}

export function addAnecdote(anecdote) {
  return async function (dispatch, getState) {
    const initialAnecdote = asObject(anecdote)
    const response = await anecdoteService.createNew(initialAnecdote)
    dispatch({ type: 'ADD', data: response })
  }
}

export default reducer