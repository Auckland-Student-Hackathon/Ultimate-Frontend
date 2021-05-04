import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Input, Backdrop, CircularProgress, Snackbar } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { icons } from '../../utils'
import { AuthContext } from '../../context'
import { axios } from '../../instances'

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
    margin: '1.5em auto',
  },
}))

function Register() {
  const classes = useStyles()

  const AuthObj = useContext(AuthContext)
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [waiting, setWaiting] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSignup = async () => {
    if (String(name).trim() === '') {
      setSnackbarMessage('Your nickname is empty!')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
      return
    }
    if (String(email).trim() === '') {
      setSnackbarMessage('Your email is empty!')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
      return
    }
    if (String(password).trim() === '' || String(passwordConfirm).trim() === '') {
      setSnackbarMessage('Your password is empty!')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
      return
    }
    if (password !== passwordConfirm) {
      setSnackbarMessage('Your password does not match!')
      setSnackbarSeverity('error')
      setShowSnackbar(true)
      return
    }
    try {
      setWaiting(true)
      const userObj = await AuthObj.signUp(email, password)
      const payload = {
        name,
        uid: userObj.uid,
        email: userObj.email,
      }
      await axios.post('/user', payload)
      history.push('/profile')
    } catch (err) {
      setShowSnackbar(true)
      setSnackbarSeverity('error')
      // axios error will be due to the user already existing
      setSnackbarMessage(err?.message || 'The user already exist')
    } finally {
      setWaiting(false)
    }
  }

  return (
    <>
      <Container component="main" maxWidth="md">
        <img src={icons.register} alt="Register" className={classes.icon} />
        <div className={classes.paper}>
          <Typography variant="h4" className={classes.title}>
            WELCOME TO REGISTER!
          </Typography>
          <form className={classes.form}>
            <div className={classes.formInput}>
              <div className={classes.groupInput}>
                <div className={classes.label}>Your nick name</div>
                <Input
                  type="text"
                  className={classes.input}
                  id="name"
                  name="name"
                  disableUnderline
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={classes.groupInput}>
                <div className={classes.label}>Your email</div>
                <Input
                  type="text"
                  className={classes.input}
                  id="email"
                  name="email"
                  disableUnderline
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={classes.groupInput}>
                <div className={classes.label}>Confirm password</div>
                <Input
                  type="password"
                  className={classes.input}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  disableUnderline
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value)
                  }}
                />
              </div>
            </div>
            <Button className={classes.goLink} onClick={() => handleSignup()}>
              Register
            </Button>
            <Link href="/login" variant="body2" className={classes.link}>
              Already have an account?
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

export default Register
