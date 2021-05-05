import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { icons } from '../../utils'
import { Board } from '../../components'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
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
    marginTop: '5em',
    width: '20%',
    alignSelf: 'center',
  },
}))

const TicTacToeGame = (props) => {
  const classes = useStyles()
  const history = useHistory()

  const { location } = props
  const { roomInfo } = location
  const { id } = useParams()
  const imgSrc = icons.ticTacToe

  const handleReturn = () => {
    history.goBack()
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <div className={classes.gameListContainer}>
        <img src={imgSrc} alt="Game Icon" className={classes.gameIcon} />
        <Button className={classes.listContainer} fullWidth>
          Tic-Tac-Toe
        </Button>
      </div>

      <div className={classes.gameStateContainer}>
        <Board />
        <div className={classes.gameState}>
          <div className={classes.level}>Waiting...</div>
          <div className={classes.timer}>
            <div>1:21</div>
          </div>
        </div>
      </div>

      <Button className={classes.quitButton} onClick={handleReturn}>
        X
      </Button>
    </Container>
  )
}

export default TicTacToeGame
