import React from 'react'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Container, GridList } from '@material-ui/core'

import { icons } from '../../utils'

const rooms = [
  { game: 'puzzles', owner: 'Nate', code: 'JUHHG' },
  { game: 'puzzles', owner: 'Hiko', code: 'JUHHG' },
  { game: 'tic-tac-toe', owner: 'Lol', code: 'JUHHG' },
  { game: 'puzzles', owner: 'Nan', code: 'JUHHG' },
  { game: 'puzzles', owner: 'None', code: 'JUHHG' },
  { game: 'tic-tac-toe', owner: 'Nate', code: 'JUHHG' },
  { game: 'puzzles', owner: 'Nate', code: 'JUHHG' },
  { game: 'puzzles', owner: 'Nate', code: 'JUHHG' },
  { game: 'tic-tac-toe', owner: 'Nate', code: 'JUHHG' },
]

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

  const handleJoinRoom = (room) => {
    history.push({ pathname: `room/${room.code}`, roomInfo: room })
  }

  const goToLeaderboard = () => {
    history.push('/leaderboard')
  }

  const goToProfile = () => {
    history.push('/profile')
  }

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

          <GridList cellHeight={180} className={classes.gridList}>
            {renderRooms(rooms)}
          </GridList>

          <div className={classes.button}>
            <Button>Create new Room</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Lobby
