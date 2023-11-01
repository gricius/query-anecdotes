import React from 'react'
import { useNotification } from './NotificationContext'

const Notification = () => {
  const { message, visible } = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'block' : 'none',
  }

  return <div style={style}>{message}</div>
}

export default Notification