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
    maxWidth: '35%',
  },
  scoreCointainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '4em',
  },
  score: {
    color: '#d4fbff',
    fontSize: '2.5em',
    marginRight: '2em',
  },
  button: {
    marginTop: '1.5em',
    width: '30vh',
  },
}))

function DrawGame(props) {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Typography variant="h3" className={classes.title}>
        WOW, YOU DRAW!
      </Typography>

      <div className={classes.scoreCointainer}>
        <div className={classes.score}>0 SCORES</div>
        <img src={icons.draw} alt="Win" className={classes.img} />
      </div>

      <Link href="/lobby" className={classes.goLink} underline="none">
        <Button className={classes.button}>Okay</Button>
      </Link>
    </Container>
  )
}

export default DrawGame
