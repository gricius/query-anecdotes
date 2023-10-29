import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import axios from 'axios'
import { updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const handleVote = async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await updateAnecdote(anecdote.id, updatedAnecdote)
    queryClient.setQueryData(['anecdotes'], (oldData) => {
      const newData = oldData.map((a) =>
        a.id === anecdote.id ? updatedAnecdote : a
      )
      return newData
    })
  }

  const result = useQuery({
    queryFn: getAnecdotes,
    retry: 1,
    queryKey: ['anecdotes'],
  })

  //console.log(JSON.stringify(result))

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
