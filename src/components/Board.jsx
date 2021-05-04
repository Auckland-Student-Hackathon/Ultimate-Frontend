import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  slot: {
    backgroundColor: '#c4c4c4',
    marginTop: '1em',
    height: '50%',
  },
}))

function Board(props) {
  const classes = useStyles()

  const rows = []
  for (let y = 0; y < 3; y += 1) {
    const cols = []
    for (let x = 0; x < 3; x += 1) {
      cols.push(
        <Grid align="center" className={classes.slot} item xs={11}>
          X
        </Grid>
      )
    }

    rows.push(
      <Grid item xs={3}>
        {cols}
      </Grid>
    )
  }

  return rows
}

export default Board
