# FullStackOpen.com exercices Part 6

# Exercise 6.20
Implement retrieving anecdotes from the server using React Query.

The application should work in such a way that if there are problems communicating with the server, only an error page will be displayed:

<img src="https://fullstackopen.com/static/457e9cc4c44344cfb7b546caa44f9ef2/5a190/65new.png">

You can find [here](https://tanstack.com/query/latest/docs/react/guides/queries) info how to detect the possible errors.

You can simulate a problem with the server by e.g. turning off the JSON Server. Please note that in a problem situation, the query is first in the state isLoading for a while, because if a request fails, React Query tries the request a few times before it states that the request is not successful. You can optionally specify that no retries are made:

```jsx
const result = useQuery(
  {
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  }
)
```

or that the request is retried e.g. only once:
```jsx
const result = useQuery(
  {
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  }
)
```

# Exercise 6.21
Implement adding new anecdotes to the server using React Query. The application should render a new anecdote by default. Note that the content of the anecdote must be at least 5 characters long, otherwise the server will reject the POST request. You don't have to worry about error handling now.

# Exercise 6.22
Implement voting for anecdotes using again the React Query. The application should automatically render the increased number of votes for the voted anecdote.

# Exercise 6.23.
The application has a Notification component for displaying notifications to the user.

Implement the application's notification state management using the useReducer hook and context. The notification should tell the user when a new anecdote is created or an anecdote is voted on:

![Anecdote app](https://fullstackopen.com/static/624eb96335944fbc330519085b862c61/5a190/66new.png)

The notification is displayed for five seconds.

# Exercise 6.24.
As stated in exercise 6.21, the server requires that the content of the anecdote to be added is at least 5 characters long. Now implement error handling for the insertion. In practice, it is sufficient to display a notification to the user in case of a failed POST request:

![Anecdote app](https://fullstackopen.com/static/6421e83d12bd88962ba24fde52f3a719/5a190/67new.png)

The error condition should be handled in the callback function registered for it, see [here](https://tanstack.com/query/latest/docs/react/reference/useMutation) how to register a function.