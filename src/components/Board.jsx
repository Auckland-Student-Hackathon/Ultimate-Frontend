/* eslint-disable no-loop-func */
import { Button, CircularProgress, Grid, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../context'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gap: 5,
    gridTemplateColumns: '1fr 1fr 1fr',
    width: '40%',
    marginRight: '10em',
  },
  slot: {
    backgroundColor: '#c4c4c4',
    margin: '0.1em',
    padding: '3em',
    width: '100%',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: '#bbb',
    },
  },
}))

function Board(props) {
  const [gameBoard, setGameBoard] = useState([])
  const [isLoading, setLoading] = useState(true)
  const AuthObj = useContext(AuthContext)
  const classes = useStyles()

  const { board, isCircle, onSelectMove } = props

  useEffect(() => {
    setGameBoard(board)
    setLoading(false)
  }, [board])

  const renderSlot = (position) => {
    if (gameBoard[position].empty) {
      return ` `
    }

    if (gameBoard[position].playerUid === AuthObj.uid) {
      return isCircle ? `O` : `X`
    }

    return isCircle ? `X` : `O`
  }

  const renderBoard = () => {
    let position = 0
    const rows = []
    for (let y = 0; y < 3; y += 1) {
      const cols = []
      for (let x = 0; x < 3; x += 1) {
        const currentPosition = position
        cols.push(
          <Button
            key={currentPosition}
            className={classes.slot}
            item
            xs={11}
            onClick={() => onSelectMove(currentPosition + 1)}
          >
            {renderSlot(currentPosition)}
          </Button>
        )

        position += 1
      }

      rows.push(<div key={position}>{cols}</div>)
    }

    return rows
  }

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          weight: '100vw',
        }}
      >
        <CircularProgress />
      </div>
    )

  if (gameBoard == null || gameBoard.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          weight: '100vw',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return <div className={classes.container}>{renderBoard()}</div>
}

export default Board
