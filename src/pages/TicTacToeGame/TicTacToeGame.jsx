/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Button, Grid, Snackbar, CircularProgress, Backdrop, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert as MuiAlert } from '@material-ui/lab'
import { socket } from '../../instances'
import { AuthContext } from '../../context'

import { icons } from '../../utils'
import { Board } from '../../components'

const Alert = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  yourTurn: {
    textAlign: 'center',
    marginTop: '3em',
  },
  gameIcon: {
    maxWidth: '10%',
    position: 'absolute',
    top: 0,
    zIndex: 5,
  },
  gameListContainer: {
    width: '100%',
    marginTop: '10%',
  },
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    color: 'black',
    fontFamily: 'Acme',
    '&:hover': {
      backgroundColor: '#ddd',
      color: 'black',
    },
  },
  gameStateContainer: {
    display: 'flex',
    marginTop: '3em',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30vh',
  },
  mainboard: {
    width: '80%',
  },
  gameState: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  level: {
    fontSize: '2em',
    fontFamily: 'Acme',
    margin: '1em 0',
    marginTop: '2em',
    width: '4em',
    textAlign: 'center',
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    width: '5em',
    height: '5em',
    borderRadius: '50%',
    color: 'black',
    fontSize: '1.5em',
  },
  quitButton: {
    marginTop: '2em',
    width: '5em',
    alignSelf: 'center',
  },
}))

const TicTacToeGame = (props) => {
  const classes = useStyles()
  const history = useHistory()

  const { location } = props
  const { roomInfo } = location
  const { id } = useParams()
  const roomId = id
  const imgSrc = icons.ticTacToe

  const [waiting, setWaiting] = useState(true)
  const [started, setStarted] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const AuthObj = useContext(AuthContext)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [failed, setFailed] = useState(false)
  const [roomDetails, setRoomDetails] = useState({})
  const [playerData, setPlayerData] = useState({})

  const [roomObj, setRoomObj] = useState(null)
  const [isCircle, setIsCircle] = useState(true)
  const [isMyTurn, setIsMyTurn] = useState(false)
  const [gameData, setGameData] = useState([])
  const [winnerFound, setWinnerFound] = useState(false)
  const [winnerUid, setWinnerUid] = useState('')

  useEffect(() => {
    socket.emit('getGameStatus', {
      roomId,
    })

    socket.on('getGameStatusResponse', (response) => {
      const { success } = response
      console.log('getGameStatusResponse', response)
      if (!success) {
        setSnackbarSeverity('error')
        setSnackbarMessage(response.message)
        setShowSnackbar(true)
        if (isInitialRender) {
          setIsInitialRender(false)
          setWaiting(false)
        }
      } else {
        setRoomObj(response.data)
        setIsCircle(response.data.firstPlayer === AuthObj.uid)
        setIsMyTurn(response.data.currentPlayersTurn === AuthObj.uid)
        setGameData(response.data.gameObject)
        if (isInitialRender) {
          setIsInitialRender(false)
          setWaiting(false)
        }
      }
    })

    socket.on('gameMoveResponse', (response) => {
      const { data } = response
      setRoomObj(data)
      setIsMyTurn(data.currentPlayersTurn === AuthObj.uid)
      setGameData(data.gameObject)
    })

    socket.on('gameWinnerFound', (response) => {
      const newWinnerUid = response.winner
      if (newWinnerUid === 'draw') {
        return history.push('/draw')
      }
      const userWon = newWinnerUid === AuthObj.uid
      if (userWon) {
        history.push('/win')
      } else {
        history.push('/lose')
      }
      setWinnerUid(newWinnerUid)
      setWinnerFound(true)
      return null
    })

    return () => {
      socket.removeAllListeners()
    }
  }, [AuthObj.uid, history, isInitialRender, roomId])

  const handleReturn = () => {
    history.goBack()
  }

  const handleSelectMove = (index) => {
    if (gameData[index - 1].empty && isMyTurn) {
      socket.emit('gameMove', {
        roomId,
        index,
      })
    }
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <div className={classes.gameListContainer}>
        <img src={imgSrc} alt="Game Icon" className={classes.gameIcon} />
        <Button className={classes.listContainer} fullWidth>
          Tic-Tac-Toe
        </Button>
      </div>

      {isInitialRender ? null : (
        <div className={classes.gameStateContainer}>
          <Board board={gameData} isCircle={isCircle} onSelectMove={handleSelectMove} />
          <div className={classes.gameState}>
            <div className={classes.level}>{isMyTurn ? 'Your turn!' : 'Waiting...'}</div>
            <div className={classes.timer}>
              <div>2:00</div>
            </div>
            <Button className={classes.quitButton} onClick={handleReturn}>
              X
            </Button>
          </div>
        </div>
      )}

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
    </Container>
  )
}

export default TicTacToeGame
