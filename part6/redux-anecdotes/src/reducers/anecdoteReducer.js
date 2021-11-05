import anecdoteService from '../services/anecdote'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.vote(anecdote.id, newAnecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'VOTE':
      return state.map(a => a.id !== action.data.id ? a : action.data)
    case 'INIT':
      return action.data

    default: return state
  }
}

export function addAnecdote(anecdote) {
  return async dispatch => {
    const response = await anecdoteService
      .createNew(asObject(anecdote))
    dispatch({ type: 'ADD', data: response })
  }
}

export default reducer