import React from 'react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Input } from '@material-ui/core'
import { icons } from '../../utils'

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
    margin: '1.5em auto',
  },
}))

function Register() {
  const classes = useStyles()

  return (
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
              <Input type="text" className={classes.input} id="name" name="name" disableUnderline />
            </div>
            <div className={classes.groupInput}>
              <div className={classes.label}>Your email</div>
              <Input type="text" className={classes.input} id="email" name="email" disableUnderline />
            </div>
            <div className={classes.groupInput}>
              <div className={classes.label}>Your password</div>
              <Input type="password" className={classes.input} id="password" name="password" disableUnderline />
            </div>
          </div>
          <Link href="./profile" className={classes.goLink} underline="none">
            <Button>Let&apos;s go</Button>
          </Link>
          <Link href="/login" variant="body2" className={classes.link}>
            Already have an account?
          </Link>
        </form>
      </div>
    </Container>
  )
}

export default Register
