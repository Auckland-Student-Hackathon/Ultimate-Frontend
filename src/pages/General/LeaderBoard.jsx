import React from 'react'
import { List, makeStyles, Divider, Box, Avatar, Container, Button } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { icons } from '../../utils'

const columns = [{ field: 'firstName', headerName: 'Leaderboard' }]

const rows = [
  { id: 1, firstName: 'Snow', score: 123 },
  { id: 2, firstName: 'Lannister', score: 123 },
  { id: 3, firstName: 'Lannister', score: 123 },
  { id: 4, firstName: 'Stark', score: 123 },
  { id: 5, firstName: 'Targaryen', score: 123 },
  { id: 6, firstName: 'Melisandre', score: 123 },
  { id: 7, firstName: 'Clifford', score: 123 },
  { id: 8, firstName: 'Frances', score: 123 },
  { id: 9, firstName: 'Roxie', score: 123 },
  { id: 1, firstName: 'Snow', score: 123 },
  { id: 2, firstName: 'Lannister', score: 123 },
  { id: 3, firstName: 'Lannister', score: 123 },
  { id: 4, firstName: 'Stark', score: 123 },
  { id: 5, firstName: 'Targaryen', score: 123 },
  { id: 6, firstName: 'Melisandre', score: 123 },
  { id: 7, firstName: 'Clifford', score: 123 },
  { id: 8, firstName: 'Frances', score: 123 },
  { id: 9, firstName: 'Roxie', score: 123 },
  { id: 1, firstName: 'Snow', score: 123 },
  { id: 2, firstName: 'Lannister', score: 123 },
  { id: 3, firstName: 'Lannister', score: 123 },
  { id: 4, firstName: 'Stark', score: 123 },
  { id: 5, firstName: 'Targaryen', score: 123 },
  { id: 6, firstName: 'Melisandre', score: 123 },
  { id: 7, firstName: 'Clifford', score: 123 },
  { id: 8, firstName: 'Frances', score: 123 },
  { id: 9, firstName: 'Roxie', score: 123 },
  { id: 1, firstName: 'Snow', score: 123 },
  { id: 2, firstName: 'Lannister', score: 123 },
  { id: 3, firstName: 'Lannister', score: 123 },
  { id: 4, firstName: 'Stark', score: 123 },
  { id: 5, firstName: 'Targaryen', score: 123 },
  { id: 6, firstName: 'Melisandre', score: 123 },
  { id: 7, firstName: 'Clifford', score: 123 },
  { id: 8, firstName: 'Frances', score: 123 },
  { id: 9, firstName: 'Roxie', score: 123 },
]

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
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
    fontSize: '3em',
    margin: '0 auto',
    borderRadius: 20,
    width: '70%',
  },
  img: {
    maxWidth: '10%',
  },
  sortContainer: {
    marginTop: '2em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    color: 'black',
  },
  sorter: {
    marginTop: '1em',
    backgroundColor: '#eaa462',
    margin: ' 1em',
    padding: '0.2em 0.5em',
    borderRadius: 15,
    width: '8em',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#f68f30',
    },
  },
  slot: {
    color: 'black',
  },
  paginator: {
    justifyContent: 'center',
    padding: '10px',
  },
  paginatorContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: '5em',
  },
  listContainer: {
    height: '20em',
    fontFamily: 'acme',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '0 1em',
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  },
  slotContainer: {
    backgroundColor: '#ffd7e5',
    display: 'flex',
    margin: '1em',
    borderRadius: 15,
    fontSize: '2em',
    alignItems: 'center',
    height: '2.5em',
    width: '40vw',
    justifyContent: 'space-between',
    padding: '0 1em',
  },
  score: {
    backgroundColor: '#f50057',
    color: 'white',
    padding: '0.2em 0.5em',
    borderRadius: '10%',
  },
  playerInfo: {
    display: 'flex',
    flexGrow: 1,
  },
}))

function LeaderBoard(props) {
  const classes = useStyles()

  const itemsPerPage = 10
  const [page, setPage] = React.useState(1)
  const [noOfPages] = React.useState(Math.ceil(rows.length / itemsPerPage))

  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <Container maxWidth="md">
      <div className={classes.imgContainer}>
        <img src={icons.leaderboard} alt="Leaderboard" className={classes.img} />
      </div>
      <div className={classes.title}>Leaderboard</div>

      <div className={classes.container}>
        <div className={classes.sortContainer}>
          <Button className={classes.sorter}>Score</Button>
          <Button className={classes.sorter}>Rate</Button>
          <Button className={classes.sorter}>Win</Button>
        </div>
        <div className={classes.listContainer}>
          <List dense compoent="span">
            {rows.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row) => (
              <div className={classes.slotContainer}>
                <div className={classes.playerInfo}>
                  <Avatar className={classes.avatar} alt="Avatar Image">
                    N
                  </Avatar>
                  <div className={classes.slot}>{row.firstName}</div>
                </div>
                <div className={classes.score}>{row.score}</div>
              </div>
            ))}
          </List>
          <Divider />
          <Box component="span">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="secondary"
              size="large"
              showFirstButton
              showLastButton
              classes={{ ul: classes.paginator, root: classes.paginatorContainer }}
            />
          </Box>
        </div>
      </div>
    </Container>
  )
}

export default LeaderBoard
