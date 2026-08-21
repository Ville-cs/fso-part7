import { useState, useEffect } from "react"
import anecdoteService from "../services/anecdotes"

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(setAnecdotes)
  }, [])

  const addAnecdote = async (content) => {
    const res = await anecdoteService.createNew(content)
    setAnecdotes([...anecdotes, res])
    return res
  }

  return { anecdotes, addAnecdote }
}
