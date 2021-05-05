import { Button, Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gap: 5,
    gridTemplateColumns: '1fr 1fr 1fr',
    width: '50%',
    marginRight: '5em',
  },
  slot: {
    backgroundColor: '#c4c4c4',
    width: '100%',
    margin: '0.1em',
    padding: '3em',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: '#bbb',
    },
  },
}))

function Board(props) {
  const classes = useStyles()

  const rows = []
  for (let y = 0; y < 3; y += 1) {
    const cols = []
    for (let x = 0; x < 3; x += 1) {
      cols.push(
        <Button className={classes.slot} item xs={11}>
          -
        </Button>
      )
    }

    rows.push(<div>{cols}</div>)
  }

  return <div className={classes.container}>{rows}</div>
}

export default Board
