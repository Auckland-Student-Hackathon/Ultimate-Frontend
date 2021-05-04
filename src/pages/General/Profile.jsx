import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Link, Avatar, Grid, makeStyles } from '@material-ui/core'

import { icons } from '../../utils'

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
    maxWidth: '80%',
    '&:hover': {
      backgroundColor: '#3f414d',
      borderRadius: 20,
      cursor: 'pointer',
    },
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: '2em auto',
    marginTop: '10vh',
  },
  name: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.8em',
    alignSelf: 'center',
    marginBottom: '2em',
  },
  recordLabel: {
    padding: '1.5em 2em',
    backgroundColor: '#e5e5e5',
    borderRadius: 15,
    margin: '5%',
    textAlign: 'center',
    fontSize: '1.5em',
  },
  recordContent: {
    padding: '1.5em 2em',
    backgroundColor: '#dcd2e9',
    borderRadius: 10,
    margin: '5%',
    textAlign: 'center',
    fontSize: '1.5em',
    marginBottom: '4em',
  },
  button: {
    justifySelf: 'center',
    display: 'block',
    margin: '0 auto',
    marginBottom: '3em',
  },
  buttonImg: {
    maxWidth: '30%',
    marginBottom: '3em',
    marginTop: '1em',
  },
  buttonGroup: {
    textAlign: 'center',
  },
  helpBox: {
    backgroundColor: '#d2e9e8',
    maxWidth: '50%',
    padding: '2em',
    borderRadius: 20,
    margin: '4em auto',
  },
  menuButton: {
    backgroundColor: 'inherit',
    border: 0,
    textAlign: 'right',
    width: '18%',
  },
}))

const recordsData = {
  rank: 50,
  winRate: '85%',
  win: 115,
  lose: 21,
}

function Profile(props) {
  const classes = useStyle()
  const history = useHistory()

  const goToLeaderboard = () => {
    history.push('/leaderboard')
  }

  const handleLogout = () => {
    history.push('/')
  }

  const renderRecord = (records) => {
    return (
      <Grid container justify="center" alignItems="center" item xs={6}>
        <Grid alignItems="center" item xs={6}>
          <div>
            <div className={classes.recordLabel}>Your Rank</div>
            <div className={classes.recordContent}>{records.rank}</div>
          </div>
          <div>
            <div className={classes.recordLabel}>Win rate</div>
            <div className={classes.recordContent}>{records.winRate}</div>
          </div>
        </Grid>
        <Grid alignItems="end" item xs={6}>
          <div>
            <div className={classes.recordLabel}>You won</div>
            <div className={classes.recordContent}>{records.win}</div>
          </div>
          <div>
            <div className={classes.recordLabel}>You lost</div>
            <div className={classes.recordContent}>{records.lose}</div>
          </div>
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      <div className={classes.logoBar}>
        <button type="button" onClick={handleLogout} className={classes.menuButton}>
          <img src={icons.logout} alt="Logout" className={classes.logoImg} />
        </button>
        <button type="button" onClick={goToLeaderboard} className={classes.menuButton}>
          <img src={icons.leaderboard} alt="Leaderboard" className={classes.logoImg} />
        </button>
      </div>
      <Avatar className={classes.avatar} alt="Avatar Image">
        N
      </Avatar>
      <div className={classes.name}>Nick name</div>

      <Grid container spacing={3}>
        <Grid justify="center" alignItems="center" xs={1} />
        {renderRecord(recordsData)}
        <Grid container justify="center" alignItems="start" item xs={5}>
          <div className={classes.buttonGroup}>
            <img src={icons.gotoLobby} alt="Go to lobby" className={classes.buttonImg} />
            <Link underline="none" href="/lobby">
              <Button className={classes.button}>Let&apos;s play!</Button>
            </Link>
            <img src={icons.whereToTtart} alt="Where to start" className={classes.buttonImg} />
            <Button className={classes.button}>Where to start?</Button>
          </div>
        </Grid>
      </Grid>
      <div className={classes.helpBox}>
        Hi! Welcome to our Family!
        <br />
        <br />
        Press &quot;Go to Lobby&quot; to join or create a room.
        <br />
        <br />
        In the room you created, you can choose the game you like, wait for another person, or play alone with the
        machine.
        <br />
        <br />
        If you win, you will get 100 scores. If you lose, you will lose 20 scores.
        <br />
        <br />
        Every Sunday 9pm, the top 3 leaderboards will receive a present from us!
        <br />
        <br />
        So... what are you waiting for? LET’S PLAY!
      </div>
    </div>
  )
}

export default Profile
