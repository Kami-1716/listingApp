import React, {useState, useEffect} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const useAuthStatus = () => {
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogedIn(true)
      }
      setCheckingAuthStatus(false)
    })
  }, [])

  return (
    { isLogedIn, checkingAuthStatus}
  )
}

export {useAuthStatus}