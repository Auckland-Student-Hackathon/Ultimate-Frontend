import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core'

import { icons } from '../../utils'

const columns = [{ field: 'firstName', headerName: 'Leaderboard' }]

const rows = [
  { id: 1, firstName: 'Snow', Score: 123 },
  { id: 2, firstName: 'Lannister', Score: 123 },
  { id: 3, firstName: 'Lannister', Score: 123 },
  { id: 4, firstName: 'Stark', Score: 123 },
  { id: 5, firstName: 'Targaryen', Score: 123 },
  { id: 6, firstName: 'Melisandre', Score: 123 },
  { id: 7, firstName: 'Clifford', Score: 123 },
  { id: 8, firstName: 'Frances', Score: 123 },
  { id: 9, firstName: 'Roxie', Score: 123 },
]

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '3em',
  },
  title: {
    textAlign: 'center',
    backgroundColor: 'white',
    color: 'black',
    width: '70%',
    fontSize: '3em',
    margin: '0 auto',
    borderRadius: 20,
  },
  img: {
    maxWidth: '10%',
  },
  table: {
    height: 400,
    width: '100%',
    color: 'black',
    alignItems: 'center',
  },
  slot: {
    backgroundColor: '#ffd7e5',
    textAlign: 'center',
    color: 'black',
    width: '70%',
    fontSize: '3em',
    borderRadius: 20,
    margin: '0 auto',
  },
}))

function LeaderBoard(props) {
  const classes = useStyles()

  const renderLeaderBoard = () => {
    return rows.map((row) => <div className={classes.slot}>{row.firstName}</div>)
  }

  return (
    <div>
      <div className={classes.imgContainer}>
        <img src={icons.leaderboard} alt="Leaderboard" className={classes.img} />
      </div>
      <div className={classes.table}>
        <div className={classes.title}>Leaderboard</div>
        {renderLeaderBoard()}
        {/* <DataGrid rows={rows} columns={columns} pageSize={50} /> */}
      </div>
    </div>
  )
}

export default LeaderBoard
