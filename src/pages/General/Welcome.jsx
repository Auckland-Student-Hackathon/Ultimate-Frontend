import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Link, AppBar, Container, Toolbar, Typography } from '@material-ui/core'

import { icons } from '../../utils'

const useStyle = makeStyles((theme) => ({
  link: {
    position: 'absolute',
    right: '1em',
    top: '1.5em',
  },
  link2: {
    marginTop: '3em',
    display: 'flex',
    justifyContent: 'center',
  },
  button2: {
    width: '100%',
  },
  button3: {
    justifySelf: 'center',
    width: '20%',
    marginBottom: '5em',
  },
  container: {
    marginTop: '20vh',
    display: 'flex',
    color: 'white',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: '25%',
  },
  header: {
    fontSize: '3.5em',
  },
  description: {
    fontSize: '1.5em',
    fontFamily: 'Albe',
    width: '80%',
  },
  description2: {
    fontSize: '1.5em',
    fontFamily: 'Albe',
    marginBottom: '15%',
  },
  nestedContainer: {
    display: 'flex',
    padding: '5%',
    marginLeft: '7em',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  description3: {
    fontSize: '1.5em',
    fontFamily: 'Albe',
    width: '62%',
    marginTop: '3em',
  },
  footerContainer: {
    flexGrow: 1,
    backgroundColor: '#17287a',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  footerImage: {
    maxWidth: '2.2%',
    marginLeft: '0.5em',
  },
}))

const Welcome = () => {
  const classes = useStyle()

  return (
    <div>
      <Container component="main" maxWidth="md">
        <Link underline="none" href="/register" className={classes.link}>
          <Button>Getting Started</Button>
        </Link>

        <div className={classes.container}>
          <div>
            <div className={classes.header}>_</div>
            <div className={classes.header}>ULTIMATE GAME CENTER</div>
            <div className={classes.description}>
              Have fun with our board games and and win the prize of $500 every week!
            </div>
          </div>
          <img className={classes.logo} src={icons.logo1} alt="logo-1" />
        </div>

        <div className={classes.container}>
          <img className={classes.logo} src={icons.logo2} alt="logo-1" />
          <div>
            <div className={classes.header}>_</div>
            <div className={classes.header}>IMPROVING SKILLS</div>
            <div className={classes.description2}>Using your brain to win and become a master in the leaderboard.</div>
            <Link underline="none" href="/login" className={classes.link2}>
              <Button className={classes.button2}>I already have an account</Button>
            </Link>
          </div>
        </div>

        <div className={classes.container}>
          <div>
            <div className={classes.header}>_</div>
            <div className={classes.header}>MAKING FRIENDS</div>
            <div className={classes.nestedContainer}>
              <img className={classes.logo} src={icons.logo3} alt="logo-1" />
              <div className={classes.description3}>
                Meet, beat, and connect to people having the same interests with you that you never know before!
              </div>
            </div>
          </div>
        </div>

        <Link underline="none" href="/register" className={classes.link2}>
          <Button className={classes.button3}>Let’s play!</Button>
        </Link>
      </Container>
      <AppBar position="static" className={classes.footerContainer}>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1">@New Zealand, 2021 with</Typography>
            <img className={classes.footerImage} src={icons.heart} alt="Love" />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Welcome
