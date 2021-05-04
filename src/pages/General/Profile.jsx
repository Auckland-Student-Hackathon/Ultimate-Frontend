import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Link, Avatar, Grid, makeStyles, Backdrop, CircularProgress, Snackbar } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import { axios } from '../../instances'
import { AuthContext } from '../../context'

import { icons } from '../../utils'

const Alert = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyle = makeStyles((theme) => ({
  logoBar: {
    position: 'absolute',
    right: 20,
    top: 0,
    margin: '1em 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logoImg: {
    maxWidth: '80%',
    '&:hover': {
      backgroundColor: '#3f414d',
      borderRadius: 20,
      cursor: 'pointer',
    },
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: '2em auto',
    marginTop: '10vh',
  },
  name: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.8em',
    alignSelf: 'center',
    marginBottom: '2em',
  },
  recordLabel: {
    padding: '1.5em 2em',
    backgroundColor: '#e5e5e5',
    borderRadius: 15,
    margin: '5%',
    textAlign: 'center',
    fontSize: '1.5em',
  },
  recordContent: {
    padding: '1.5em 2em',
    backgroundColor: '#dcd2e9',
    borderRadius: 10,
    margin: '5%',
    textAlign: 'center',
    fontSize: '1.5em',
    marginBottom: '4em',
  },
  button: {
    justifySelf: 'center',
    display: 'block',
    margin: '0 auto',
    marginBottom: '3em',
  },
  buttonImg: {
    maxWidth: '30%',
    marginBottom: '3em',
    marginTop: '1em',
  },
  buttonGroup: {
    textAlign: 'center',
  },
  helpBox: {
    backgroundColor: '#d2e9e8',
    maxWidth: '50%',
    padding: '2em',
    borderRadius: 20,
    margin: '4em auto',
  },
  menuButton: {
    backgroundColor: 'inherit',
    border: 0,
    textAlign: 'right',
    width: '18%',
  },
}))

const Profile = (props) => {
  const classes = useStyle()
  const history = useHistory()

  const [recordsData, setRecordsData] = useState({
    rank: 100,
    winRate: '0%',
    win: 0,
    lose: 0,
  })
  const [name, setName] = useState('')

  const [waiting, setWaiting] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const [showHelp, setShowHelp] = useState(false)

  const goToLeaderboard = () => {
    history.push('/leaderboard')
  }

  const handleLogout = () => {
    history.push('/')
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const userResponse = await axios.get('/user')
        const userDoc = userResponse.data
        setName(userDoc?.name || '')
        const win = userDoc?.wins || 0
        const lose = userDoc?.loses || 0
        let winRate = 0

        if (win === 0) {
          winRate = 0
        } else {
          const total = win + lose
          const percentage = Math.round((win / total) * 100 * 100) / 100
          winRate = percentage
        }

        setRecordsData({
          rank: 100,
          winRate: `${winRate}%`,
          win,
          lose,
        })
      } catch (err) {
        setSnackbarMessage('Your password is empty!')
        setSnackbarSeverity('error')
        setShowSnackbar(true)
      } finally {
        setWaiting(false)
      }
    }
    getData()
  }, [])

  const renderRecord = (records) => {
    return (
      <Grid container justify="center" alignItems="center" item xs={6}>
        <Grid alignItems="center" item xs={6}>
          <div>
            <div className={classes.recordLabel}>Your Rank</div>
            <div className={classes.recordContent}>{`#${records.rank}`}</div>
          </div>
          <div>
            <div className={classes.recordLabel}>Win rate</div>
            <div className={classes.recordContent}>{records.winRate}</div>
          </div>
        </Grid>
        <Grid alignItems="end" item xs={6}>
          <div>
            <div className={classes.recordLabel}>You won</div>
            <div className={classes.recordContent}>{records.win}</div>
          </div>
          <div>
            <div className={classes.recordLabel}>You lost</div>
            <div className={classes.recordContent}>{records.lose}</div>
          </div>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <div>
        <div className={classes.logoBar}>
          <button type="button" onClick={handleLogout} className={classes.menuButton}>
            <img src={icons.logout} alt="Logout" className={classes.logoImg} />
          </button>
          <button type="button" onClick={goToLeaderboard} className={classes.menuButton}>
            <img src={icons.leaderboard} alt="Leaderboard" className={classes.logoImg} />
          </button>
        </div>
        <Avatar className={classes.avatar} alt="Avatar Image" src={icons.avatar} />
        <div className={classes.name}>{name}</div>

        <Grid container spacing={3}>
          <Grid justify="center" alignItems="center" xs={1} />
          {renderRecord(recordsData)}
          <Grid container justify="center" alignItems="start" item xs={5}>
            <div className={classes.buttonGroup}>
              <img src={icons.gotoLobby} alt="Go to lobby" className={classes.buttonImg} />
              <Link underline="none" href="/lobby">
                <Button className={classes.button}>Let&apos;s play!</Button>
              </Link>
              <img src={icons.whereToTtart} alt="Where to start" className={classes.buttonImg} />
              <Button
                className={classes.button}
                onClick={() => {
                  setShowHelp(true)
                }}
              >
                Where to start?
              </Button>
            </div>
          </Grid>
        </Grid>

        {showHelp ? (
          <div className={classes.helpBox}>
            Hi, Welcome to the Ultimate Game Center!
            <br />
            <br />
            Press &quot;Go to Lobby&quot; to join or create a room.
            <br />
            <br />
            In the room you created, you can choose the game you like, wait for another person, or play alone with the
            machine.
            <br />
            <br />
            If you win, you will get 100 scores. If you lose, you will lose 20 scores.
            <br />
            <br />
            Every Sunday 9pm, the top 3 leaderboards will receive a present from us!
            <br />
            <br />
            So... what are you waiting for? LET’S PLAY!
          </div>
        ) : null}
      </div>
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

export default Profile
