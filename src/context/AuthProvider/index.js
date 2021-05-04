import React, { useState, useEffect } from 'react'
import { firebase } from '../../instances'
import AuthContext from '../AuthContext'

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [uid, setUid] = useState('')

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setCurrentUser(user)
      if (user) {
        setIsLoggedIn(true)
        setUid(user.uid)
      } else {
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const signIn = async (email, password) => {
    try {
      const userCred = await firebase.auth().signInWithEmailAndPassword(email, password)
      return Promise.resolve({
        email: userCred.user.email,
        uid: userCred.user.uid,
        name: userCred.user.displayName,
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const signOut = async () => {
    try {
      await firebase.auth().signOut()
      return Promise.resolve(true)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const obj = {
    currentUser,
    isLoggedIn,
    isLoading,
    uid,
    signIn,
    signOut,
  }

  const { children } = props

  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>
}

export default AuthProvider
