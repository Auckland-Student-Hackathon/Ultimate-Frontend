/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { AuthContext } from '../../context'

const ProtectedRoute = ({ children, ...rest }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : isLoggedIn ? (
        <Route {...rest} render={() => children} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  )
}

export default ProtectedRoute
