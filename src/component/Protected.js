import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected