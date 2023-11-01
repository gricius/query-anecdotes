import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotification } from './NotificationContext'

const AnecdoteForm = () => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const newMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      showNotification(`you created '${newAnecdote.content}'`, 5)
    },
    onError: (error) => {
      showNotification(error.response.data.error, 5)
    }
  })
    
  const onCreate = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate(anecdote)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
