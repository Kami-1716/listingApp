import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = () => {
  const {isLogedIn, checkingAuthStatus} = useAuthStatus()

  if (checkingAuthStatus) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    )
  }

  return (
    isLogedIn ? <Outlet /> : <Navigate to="/sign-in" />
  )
}

export default PrivateRoute