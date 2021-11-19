import React from "react";
import { useParams } from "react-router";


const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => Number(id) === Number(a.id))

  return (
    <div>
      <h3>{anecdote.content}</h3>
      <div>By {anecdote.author}</div>
      <div>Has {anecdote.votes} votes</div>
      <div>for more information see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

export default Anecdote