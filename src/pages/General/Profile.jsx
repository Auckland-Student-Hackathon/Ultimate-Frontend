import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Link } from '@material-ui/core'

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
    maxWidth: '12%',
    '&:hover': {
      backgroundColor: '#3f414d',
      borderRadius: 20,
      cursor: 'pointer',
    },
  },
  avatar: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    margin: '2em auto',
    marginTop: '20vh',
  },
  name: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5em',
    alignSelf: 'center',
  },
  recordLabel: {
    padding: '1.5em 2em',
    backgroundColor: '#e5e5e5',
    borderRadius: 15,
    margin: '5%',
    textAlign: 'center',
  },
  recordContent: {
    padding: '1.5em 2em',
    backgroundColor: '#dcd2e9',
    borderRadius: 10,
    margin: '5%',
    textAlign: 'center',
  },
  button: {
    justifySelf: 'center',
    display: 'block',
    margin: '0 auto',
  },
  buttonImg: {
    maxWidth: '30%',
    margin: '3em 0',
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
}))

const recordsData = {
  rank: 50,
  winRate: '85%',
  win: 115,
  lose: 21,
}

function Profile(props) {
  const classes = useStyle()

  const renderRecord = (records) => {
    return (
      <Grid container justify="center" alignItems="center" item xs={6}>
        <Grid item xs={6}>
          <div>
            <div className={classes.recordLabel}>Your Rank</div>
            <div className={classes.recordContent}>{records.rank}</div>
          </div>
          <div>
            <div className={classes.recordLabel}>Win rate</div>
            <div className={classes.recordContent}>{records.winRate}</div>
          </div>
        </Grid>
        <Grid item xs={6} alignItems="end">
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
        <img src={icons.logout} alt="Logout" className={classes.logoImg} />
        <img src={icons.leaderboard} alt="Leaderboard" className={classes.logoImg} />
      </div>
      <Avatar className={classes.avatar} alt="Avatar Image">
        N
      </Avatar>
      <div className={classes.name}>Nick name</div>

      <Grid container spacing={3}>
        <Grid justify="center" alignItems="center" xs={1} />
        {renderRecord(recordsData)}
        <Grid container justify="center" alignItems="center" item xs={5}>
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
