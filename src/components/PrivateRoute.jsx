import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
  const {isLogedIn, checkingAuthStatus} = useAuthStatus()

  if (checkingAuthStatus) {
    return (
      <Spinner />
    )
  }

  return (
    isLogedIn ? <Outlet /> : <Navigate to="/sign-in" />
  )
}

export default PrivateRoute