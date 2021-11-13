import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ addAnecdote, addNotification }) => {
  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdote(content)
    addNotification(`Added ${content} to the list`, 5)
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, { addAnecdote, addNotification })(AnecdoteForm)