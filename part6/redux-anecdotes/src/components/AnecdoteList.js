import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.addNotification(`Added a vote to ${anecdote.content}`, 5)
  }

  return (
    props.anecdotes
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
  )

}

const filterAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  const filteredAnecdotes = filterAnecdotes(state)
  return {
    anecdotes: (filteredAnecdotes
      .sort((x, y) =>
        (x.votes > y.votes ? -1 : 1)))
  }
}

const mapDispatchToProps = {
  addNotification, voteAnecdote
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)