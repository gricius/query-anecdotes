import axios from "axios";

export const getAnecdotes =  () =>
  axios.get("http://localhost:3001/anecdotes").then((response) => response.data)

export const createAnecdote = (content) =>
  axios
    .post("http://localhost:3001/anecdotes", { content, votes: 0 })
    .then((response) => response.data)

export const updateAnecdote = (id, updatedAnecdote) =>
  axios
    .put(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote)
    .then((response) => response.data)