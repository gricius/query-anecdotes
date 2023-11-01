import React, { createContext, useContext, useReducer, useEffect } from 'react'

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

const initialState = {
  message: '',
  visible: false,
}

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { message: action.message, visible: true }
    case HIDE_NOTIFICATION:
      return { ...state, visible: false }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  useEffect(() => {
    if (state.visible) {
      const timeout = setTimeout(() => {
        dispatch({ type: HIDE_NOTIFICATION })
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [state.visible])

  const showNotification = (message) => {
    dispatch({ type: SHOW_NOTIFICATION, message })
  }

  const hideNotification = () => {
    dispatch({ type: HIDE_NOTIFICATION })
  }

  return (
    <NotificationContext.Provider value={{ ...state, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
