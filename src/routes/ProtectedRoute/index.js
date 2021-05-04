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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            weight: '100vw',
          }}
        >
          <CircularProgress />
        </div>
      ) : isLoggedIn ? (
        <Route {...rest} render={() => children} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  )
}

export default ProtectedRoute
