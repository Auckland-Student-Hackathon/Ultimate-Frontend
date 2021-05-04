/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Container, GridList, Snackbar, Backdrop, CircularProgress } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import { socket } from '../../instances'

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
    maxWidth: '72%',
    '&:hover': {
      backgroundColor: '#3f414d',
      borderRadius: 20,
      cursor: 'pointer',
    },
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
  logoGame: {
    maxWidth: '20%',
    position: 'relative',
    top: 30,
    zIndex: 5,
  },
  roomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    padding: '0.5em 1em',
    paddingLeft: '22%',
    width: '50vh',
    height: '5em',
    color: 'black',
    fontFamily: 'Acme',
    fontSize: '1.3em',
    borderRadius: 15,
    '&:hover': {
      backgroundColor: '#aaa',
      cursor: 'pointer',
      color: 'black',
    },
  },
  roomGame: {
    fontSize: '1.5em',
  },
  gridList: {
    width: '100%',
    height: '60vh',
  },
  roomInfoRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  roomInfoLeft: {
    backgroundColor: '#dcdcdc',
    padding: '0.3em',
    borderRadius: 15,
  },
  button: {
    marginTop: '2em',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menuButton: {
    backgroundColor: 'inherit',
    border: 0,
    textAlign: 'right',
    width: '18%',
  },
}))

function Lobby(props) {
  const classes = useStyle()
  const history = useHistory()

  const [waiting, setWaiting] = useState(true)
  const [initialRender, setInitialRender] = useState(true)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [rooms, setRooms] = useState([])

  const handleJoinRoom = (room) => {
    setWaiting(true)
    socket.emit('joinRoom', {
      roomId: room.code,
    })
  }

  const goToLeaderboard = () => {
    history.push('/leaderboard')
  }

  const goToProfile = () => {
    history.push('/profile')
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket id', socket.id)
      console.log('socket is connected?', socket.connected)
    })
    socket.io.on('reconnect_attemp', () => {
      console.log('client is attempting to reconnect')
    })
    socket.io.on('reconnect', () => {
      console.log('client has reconnected with the server')
    })

    socket.on('joinRoomResponse', (response) => {
      if (response.success) {
        setWaiting(false)
        history.push(`/room/${response.roomId}`)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage(response.message)
        setShowSnackbar(true)
      }
    })

    socket.on('createRoomResponse', (response) => {
      if (response.success) {
        setSnackbarSeverity('success')
        history.push(`/room/${response.roomId}`)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage(response.message)
        setShowSnackbar(true)
      }
    })

    socket.on('roomDetailsResponse', (response) => {
      const newList = []
      for (const [key, value] of Object.entries(response)) {
        newList.push({
          game: value?.mode,
          owner: value?.players[0]?.name || '',
          code: key,
        })
      }
      setRooms(newList)
      if (initialRender) {
        setWaiting(false)
        setInitialRender(false)
      }
    })

    const cancelFetchRoom = setInterval(() => {
      socket.emit('roomDetails')
    }, 3000)

    return () => {
      socket.removeAllListeners()
      clearInterval(cancelFetchRoom)
    }
  }, [])

  const renderRooms = (allRooms) => {
    return allRooms.map((room) => {
      const imgSrc = room.game === 'tic-tac-toe' ? icons.ticTacToe : icons.puzzle
      return (
        <Grid container justify="start" alignItems="center" item xs={6}>
          <div>
            {room.game === 'tic-tac-toe? '}
            <img src={imgSrc} alt="game icon" className={classes.logoGame} />
            <Button className={classes.roomContainer} onClick={() => handleJoinRoom(room)}>
              <div className={classes.roomInfoRight}>
                <div className={classes.roomGame}>{room.game}</div>
                <div className={classes.roomOwner}>{room.owner}</div>
              </div>
              <div className={classes.roomInfoLeft}>{room.code}</div>
            </Button>
          </div>
        </Grid>
      )
    })
  }

  return (
    <>
      <div>
        <div className={classes.logoBar}>
          <button type="button" onClick={goToProfile} className={classes.menuButton}>
            <img src={icons.profile} alt="profile" className={classes.logoImg} />
          </button>
          <button type="button" onClick={goToLeaderboard} className={classes.menuButton}>
            <img src={icons.leaderboard} alt="leaderboard" className={classes.logoImg} />
          </button>
        </div>

        <Container component="main" maxWidth="lg">
          <div className={classes.paper}>
            <Typography variant="h4" className={classes.title}>
              HAVE FUN!
            </Typography>

            {rooms.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <Typography variant="h5" style={{ color: 'white' }}>
                  No rooms are available so far. Create one!
                </Typography>
              </div>
            ) : (
              <>
                <GridList cellHeight={180} className={classes.gridList}>
                  {renderRooms(rooms)}
                </GridList>
              </>
            )}

            <div className={classes.button}>
              <Button
                onClick={() => {
                  socket.emit('createRoom')
                }}
              >
                Create new Room
              </Button>
            </div>
          </div>
        </Container>
      </div>
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
      <Backdrop open={waiting} style={{ zIndex: 10000 }}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}

export default Lobby
