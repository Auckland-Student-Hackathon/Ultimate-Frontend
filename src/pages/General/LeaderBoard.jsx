import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  List,
  makeStyles,
  Divider,
  Box,
  Avatar,
  Container,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { Alert as MuiAlert } from '@material-ui/lab'
import { icons } from '../../utils'
import { axios } from '../../instances'

const Alert = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  logoBar: {
    position: 'absolute',
    right: 20,
    top: 0,
    margin: '1em 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menuButton: {
    backgroundColor: 'inherit',
    border: 0,
    textAlign: 'right',
    width: '18%',
  },
  logoImg: {
    maxWidth: '80%',
    '&:hover': {
      backgroundColor: '#3f414d',
      borderRadius: 20,
      cursor: 'pointer',
    },
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
  const history = useHistory()

  const itemsPerPage = 10
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState([])
  const [noOfPages] = useState(Math.ceil(rows.length / itemsPerPage))

  const [waiting, setWaiting] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleChange = (event, value) => {
    setPage(value)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setWaiting(true)
        const response = await axios.get('/leaderboard')
        const { data } = response
        setRows(data)
      } catch (err) {
        setSnackbarMessage('Oh no! Something wrong happened')
        setSnackbarSeverity('error')
        setShowSnackbar(true)
      } finally {
        setWaiting(false)
      }
    }
    getData()
  }, [])

  return (
    <>
      <Container maxWidth="md">
        <div className={classes.logoBar}>
          <button type="button" onClick={() => history.push('/profile')} className={classes.menuButton}>
            <img src={icons.profile} alt="Logout" className={classes.logoImg} />
          </button>
          <button type="button" onClick={() => history.push('/lobby')} className={classes.menuButton}>
            <img src={icons.gotoLobby} alt="Leaderboard" className={classes.logoImg} />
          </button>
        </div>

        <div className={classes.imgContainer}>
          <img src={icons.leaderboard} alt="Leaderboard" className={classes.img} />
        </div>
        <div className={classes.title}>Leaderboard</div>

        <div className={classes.container}>
          {rows.length === 0 ? (
            <>
              <Typography variant="h5" style={{ color: 'white', marginTop: 60 }}>
                No results on the leaderboard :(
              </Typography>
            </>
          ) : (
            <>
              <div className={classes.sortContainer}>
                <Button className={classes.sorter}>Score</Button>
                <Button className={classes.sorter}>Rate</Button>
                <Button className={classes.sorter}>Win</Button>
              </div>
              <div className={classes.listContainer}>
                <>
                  <List dense compoent="span">
                    {rows.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row, index) => (
                      <div
                        className={classes.slotContainer}
                        style={{
                          backgroundColor: row?.uid !== undefined ? '#fff5d7' : '#ffd7e5',
                        }}
                      >
                        <div className={classes.playerInfo}>
                          <Avatar className={classes.avatar} alt="Avatar Image">
                            {index + 1}
                          </Avatar>
                          <div className={classes.slot}>{row.name}</div>
                        </div>
                        <div className={classes.score}>{row.points}</div>
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
                </>
              </div>
            </>
          )}
        </div>
      </Container>
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
    </>
  )
}

export default LeaderBoard
