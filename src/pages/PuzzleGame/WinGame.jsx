import { Button, Container, Link, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { icons } from '../../utils'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5em 0',
  },
  title: {
    fontSize: 'Acme',
    color: 'white',
    marginBottom: theme.spacing(3),
  },
  img: {
    maxWidth: '30%',
  },
  scoreCointainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '4em',
  },
  score: {
    color: '#1bff84',
    fontSize: '2.5em',
    marginLeft: '1em',
  },
  button: {
    marginTop: '1.5em',
    width: '30vh',
  },
}))

function WinGame(props) {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Typography variant="h3" className={classes.title}>
        CONGRATULATIONS, YOU WIN!
      </Typography>

      <div className={classes.scoreCointainer}>
        <img src={icons.win} alt="Win" className={classes.img} />
        <div className={classes.score}>+100 SCORES</div>
      </div>

      <Link href="/lobby" className={classes.goLink} underline="none">
        <Button className={classes.button}>Okay</Button>
      </Link>
    </Container>
  )
}

export default WinGame
