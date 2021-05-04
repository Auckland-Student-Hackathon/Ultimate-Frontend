import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Input, Backdrop, CircularProgress, Snackbar } from '@material-ui/core'
import { Label } from '@material-ui/icons'
import { Alert as MuiAlert } from '@material-ui/lab'
import { icons } from '../../utils'
import { AuthContext } from '../../context'

const Alert = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  icon: {
    maxWidth: '20vh',
    position: 'absolute',
    top: '25vh',
    left: '15vh',
  },
  title: {
    fontSize: 'Acme',
    color: 'white',
    marginBottom: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  formInput: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  groupInput: {
    padding: '0 auto',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    margin: '1em 0',
  },
  label: {
    color: 'white',
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#DCD2E9',
    borderRadius: 20,
    padding: '1% 2%',
    textAlign: '',
  },
  goLink: {
    width: '20%',
    height: '90%',
    margin: '0 auto',
    marginTop: '1.5em',
  },
  link: {
    color: 'white',
    margin: '0 auto',
    marginTop: '2em',
  },
}))

function Login() {
  const classes = useStyles()

  const AuthObj = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleLogin = async () => {
    if (String(email).trim() === '') {
      setShowSnackbar(true)
      setSnackbarSeverity('error')
      setSnackbarMessage('The email field cannot be empty')
      return
    }
    if (String(password).trim() === '') {
      setShowSnackbar(true)
      setSnackbarSeverity('error')
      setSnackbarMessage('The password field cannot be empty')
      return
    }
    try {
      setWaiting(true)
      await AuthObj.signIn(email, password)
      window.location.replace('/profile')
    } catch (err) {
      setShowSnackbar(true)
      setSnackbarSeverity('error')
      setSnackbarMessage(err.message)
    } finally {
      setWaiting(false)
    }
  }

  return (
    <>
      <Container component="main" maxWidth="md">
        <img src={icons.login} alt="Login" className={classes.icon} />
        <div className={classes.paper}>
          <Typography variant="h4" className={classes.title}>
            LOGIN LOGIN LOGIN ...
          </Typography>

          <form className={classes.form}>
            <div className={classes.formInput}>
              <div className={classes.groupInput}>
                <div className={classes.label}>Your email</div>
                <Input
                  type="text"
                  className={classes.input}
                  id="name"
                  name="name"
                  disableUnderline
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>
              <div className={classes.groupInput}>
                <div className={classes.label}>Your password</div>
                <Input
                  type="password"
                  className={classes.input}
                  id="password"
                  name="password"
                  disableUnderline
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
            </div>

            <Button
              className={classes.goLink}
              onClick={() => {
                handleLogin()
              }}
            >
              Let&apos;s go
            </Button>

            <Link href="/login" variant="body2" className={classes.link}>
              Forgot my password
            </Link>
            <Link href="/register" variant="body2" className={classes.link}>
              Go to register!
            </Link>
          </form>
        </div>
      </Container>
      <Backdrop open={waiting} style={{ zIndex: 10000 }}>
        <CircularProgress />
      </Backdrop>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return
          }
          setShowSnackbar(false)
        }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
export default Login
