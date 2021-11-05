import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((x, y) => (x.votes > y.votes ? -1 : 1)))
  const filter = useSelector(state => state.filter).toLowerCase()

  const dispatch = useDispatch()

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(a => id === a.id)
    dispatch(voteAnecdote(id))
    dispatch(addNotification('MESSAGE', `Added a vote to ${votedAnecdote.content}`))
  }

  return (
    anecdotes
      .filter(a => a.content.toLowerCase().includes(filter))
      .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )

}

export default AnecdoteList