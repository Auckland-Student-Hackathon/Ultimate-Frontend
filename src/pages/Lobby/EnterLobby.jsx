import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Link, Typography, Container } from '@material-ui/core'

import { icons } from '../../utils'

const rooms = [
  { game: 'puzzles', owner: 'Nate' },
  { game: 'puzzles', owner: 'Hiko' },
  { game: 'tic-tac-toe', owner: 'Lol' },
  { game: 'puzzles', owner: 'Nan' },
  { game: 'puzzles', owner: 'None' },
  { game: 'tic-tac-toe', owner: 'Nate' },
  { game: 'puzzles', owner: 'Nate' },
  { game: 'puzzles', owner: 'Nate' },
  { game: 'tic-tac-toe', owner: 'Nate' },
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
    maxWidth: '12%',
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
    maxWidth: '15em',
    position: 'relative',
    top: 30,
  },
  roomContainer: {
    backgroundColor: '#c4c4c4',
    padding: '0.5em 1em',
    paddingLeft: '35%',
    width: '60vh',
    fontFamily: 'Acme',
    fontSize: '1.5em',
  },
  roomGame: {
    fontSize: '1.5em',
  },
}))

function EnterLobby(props) {
  const classes = useStyle()

  const renderRooms = (allRooms) => {
    return allRooms.map((room) => {
      const imgSrc = room.game === 'tic-tac-toe' ? icons.ticTacToe : icons.puzzle
      return (
        <Grid container justify="start" alignItems="center" item xs={6}>
          <div>
            {room.game === 'tic-tac-toe? '}
            <img src={imgSrc} alt="game icon" className={classes.logoGame} />
            <div className={classes.roomContainer}>
              <div className={classes.roomGame}>{room.game}</div>
              <div className={classes.roomOwner}>{room.owner}</div>
            </div>
          </div>
        </Grid>
      )
    })
  }

  return (
    <div>
      <div className={classes.logoBar}>
        <img src={icons.profile} alt="profile" className={classes.logoImg} />
        <img src={icons.leaderboard} alt="leaderboard" className={classes.logoImg} />
      </div>

      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography variant="h4" className={classes.title}>
            HAVE FUN!
          </Typography>

          <Grid container xs={12} space={2}>
            {renderRooms(rooms)}
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default EnterLobby
