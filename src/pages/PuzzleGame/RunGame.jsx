import React, { useState, useRef } from 'react'
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
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { icons } from '../../utils'
import { Board } from '../../components'

const useStyles = makeStyles((theme) => ({
  gameIcon: {
    maxWidth: '10%',
    position: 'absolute',
    top: 0,
    zIndex: 5,
  },
  gameListContainer: {
    width: '100%',
    marginTop: '3em',
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
  mainboard: {
    marginTop: '5em',
  },
}))

function RunGame(props) {
  const classes = useStyles()

  const { location } = props
  const { roomInfo } = location
  // const imgSrc = roomInfo.game === 'tic-tac-toe' ? icons.ticTacToe : icons.puzzle
  const imgSrc = icons.puzzle

  return (
    <Container maxWidth="md">
      <div className={classes.gameListContainer}>
        <img src={imgSrc} alt="Game Icon" className={classes.gameIcon} />
        <Button className={classes.listContainer} fullWidth>
          Puzzle
        </Button>
      </div>

      <Grid container align="center" maxWidth="xs" className={classes.mainboard}>
        <Board />
      </Grid>
      <div>
        <div>One More!</div>
        <div>1:21</div>
      </div>
    </Container>
  )
}

export default RunGame
