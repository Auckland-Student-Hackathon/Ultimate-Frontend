import React, { useState, useRef, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  Container,
  Button,
  Link,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Avatar,
  Snackbar,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert as MuiAlert } from '@material-ui/lab'
import { AuthContext } from '../../context'
import { socket } from '../../instances'

import { icons } from '../../utils'
import { GAME_TYPE, GAME_TYPE_URL_MAP } from '../../utils/constants'

const Alert = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  gameIcon: {
    maxWidth: '10%',
    position: 'relative',
    top: 60,
    zIndex: 5,
  },
  gameListContainer: {
    width: '100%',
    margin: '1em 0',
  },
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    color: 'black',
    fontFamily: 'Acme',
  },
  dropdownList: {
    width: '50em',
  },
  mainContainer: {
    flexGrow: 1,
    display: 'flex',
    margin: 0,
    justifyContent: 'space-between',
    marginTop: '3em',
  },
  userInfo: {
    display: 'flex',
    backgroundColor: '#c4c4c4',
    padding: '0.3em',
    fontFamily: 'Acme',
    fontSize: '2em',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '2.5em 0',
    width: '30vw',
  },
  avatar: {
    backgroundColor: 'black',
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: '1em',
  },
  score: {
    fontFamily: 'Acme',
    fontSize: '4em',
    color: 'white',
  },
  scoreIcon: {
    maxWidth: '30%',
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginTop: '1em',
    backgroundColor: '#b5b3b2',
    '&:hover': {
      backgroundColor: '#878787',
      borderRadius: 20,
      cursor: 'pointer',
    },
  },
}))

const Room = (props) => {
  const [open, setOpen] = useState(false)

  const anchorRef = useRef(null)
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()
  const roomId = id

  const [waiting, setWaiting] = useState(true)
  const [gameType, setGameType] = useState(GAME_TYPE[0])
  const AuthObj = useContext(AuthContext)
  const [ready, setReady] = useState(false)

  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [failed, setFailed] = useState(false)
  const [roomDetails, setRoomDetails] = useState(null)
  const [ownerUid, setOwnerUid] = useState('')
  const [currentScore, setCurrentScore] = useState('0 - 0')
  const [isReady, setIsReady] = useState(false)

  const { location } = props
  const { roomInfo } = location

  const [imgSrc, setImgSrc] = useState(() => {
    if (gameType === GAME_TYPE[0]) {
      return icons.ticTacToe
    }
    return icons.puzzle
  })

  useEffect(() => {
    socket.emit('getRoomDetails', {
      roomId,
    })

    socket.on('getRoomDetailsResponse', (response) => {
      console.log('response', response)
      if (response.success) {
        const { data } = response
        setSnackbarSeverity('success')
        setGameType(data.mode)
        setRoomDetails(data)
        setOwnerUid(data.owner)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage(response.message)
        setShowSnackbar(true)
        setFailed(true)
      }
      setWaiting(false)
    })

    socket.on('newUserJoinedResponse', (response) => {
      const { data } = response
      const { newPlayer } = response
      setRoomDetails(data)
      setSnackbarSeverity('success')
      setSnackbarMessage(`${newPlayer.name} has joined!`)
      setShowSnackbar(true)
    })

    socket.on('playerReadyResponse', (response) => {
      const { success } = response
      if (!success) {
        setSnackbarSeverity('error')
        setSnackbarMessage(response.message)
        setShowSnackbar(true)
      } else {
        const { data } = response
        const { playerObj } = response
        if (playerObj.uid === AuthObj.uid) {
          // is myself
          setSnackbarSeverity('success')
          setSnackbarMessage(`Updated my status to ready!`)
          setShowSnackbar(true)
          setRoomDetails(data)
          setReady(true)
        } else {
          setSnackbarSeverity('success')
          setSnackbarMessage(`${playerObj.name} is ready!`)
          setShowSnackbar(true)
          setRoomDetails(data)
        }
      }
    })

    socket.on('changeGameModeResponse', (response) => {
      if (response.success) {
        setSnackbarSeverity('success')
        const { mode } = response
        if (mode === GAME_TYPE[0]) {
          setImgSrc(icons.ticTacToe)
        } else {
          setImgSrc(icons.puzzle)
        }
        setGameType(mode)
      } else {
        setSnackbarSeverity('error')
      }
      setShowSnackbar(true)
      setSnackbarMessage(response.message)
    })

    socket.on('startGameResponse', (response) => {
      const { success, message } = response
      if (success) {
        const { mode } = response
        const gameUrl = GAME_TYPE_URL_MAP[mode] || 'game'
        setSnackbarSeverity('success')
        setTimeout(() => {
          history.push(`/${gameUrl}/${roomId}`)
        }, 1000)
      } else {
        setSnackbarSeverity('error')
      }
      setSnackbarMessage(message)
      setShowSnackbar(true)
    })

    return () => {
      socket.removeAllListeners()
    }
  }, [])

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleStartGame = () => {
    // Check if all players are ready
    // Client and server side check :)
    if (gameType === 'Puzzle') {
      // Puzzle is still in development
      setSnackbarSeverity('error')
      setShowSnackbar(true)
      setSnackbarMessage('Sorry the Puzzle is still in development.')
    } else {
      socket.emit('startGame', {
        roomId,
      })
    }
  }

  const renderPlayer = () => {
    if (roomDetails == null) {
      return null
    }
    const { players } = roomDetails
    if (players.length === 1) {
      return (
        <div>
          <div className={classes.userInfo}>
            <Avatar className={classes.avatar} alt="Avatar Image">
              {`${String(players[0]?.name || 'G')[0]}`}
            </Avatar>
            <div>{`${players[0]?.name || ''} - ${players[0].ready ? 'Ready' : 'Not Ready'}`}</div>
          </div>
          <div className={classes.userInfo}>
            <Avatar className={classes.avatar} alt="Avatar Image">
              ?
            </Avatar>
            <div>Waiting...</div>
          </div>
        </div>
      )
    }

    return (
      <div>
        {players.map((player) => {
          return (
            <div className={classes.userInfo} key={player.uid}>
              <Avatar className={classes.avatar} alt="Avatar Image">
                {`${String(player?.name || 'G')[0]}`}
              </Avatar>
              <div>{`${player?.name || ''} - ${player?.ready ? 'Ready' : 'Not Ready'}`}</div>
            </div>
          )
        })}
      </div>
    )
  }

  const prevOpen = React.useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Container maxWidth="md">
        <div className={classes.gameListContainer}>
          <img src={imgSrc} alt="Game Icon" className={classes.gameIcon} />
          <Button
            className={classes.listContainer}
            fullWidth
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={() => {
              if (ownerUid !== AuthObj.uid) {
                return
              }
              handleToggle()
            }}
          >
            {gameType}
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper className={classes.dropdownList}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      {GAME_TYPE.map((gameName) => {
                        return (
                          <MenuItem
                            key={gameName}
                            onClick={(e) => {
                              handleClose(e)
                              if (gameName === GAME_TYPE[0]) {
                                setImgSrc(icons.ticTacToe)
                              } else {
                                setImgSrc(icons.puzzle)
                              }
                              socket.emit('changeGameMode', {
                                roomId,
                                mode: gameName,
                              })
                              setGameType(gameName)
                            }}
                          >
                            {gameName}
                          </MenuItem>
                        )
                      })}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

        <div className={classes.mainContainer}>
          {renderPlayer()}
          <div className={classes.scoreContainer}>
            <img src={icons.score} alt="Score Icon" className={classes.scoreIcon} />
            <div className={classes.score}>{currentScore}</div>
            {ownerUid === AuthObj.uid ? (
              <Button className={classes.button} onClick={handleStartGame}>
                Start game!
              </Button>
            ) : (
              <Button
                className={classes.button}
                onClick={() => {
                  socket.emit('playerReady', {
                    roomId,
                  })
                  setIsReady(true)
                }}
              >
                {isReady ? 'Already Ready' : 'Ready'}
              </Button>
            )}

            <Button
              className={classes.backButton}
              onClick={() => {
                history.push('/lobby')
              }}
            >
              Back to lobby
            </Button>
          </div>
        </div>
      </Container>
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

export default Room
