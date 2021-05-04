import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Button,
  Link,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { icons } from '../../utils'

const useStyles = makeStyles((theme) => ({
  gameIcon: {
    maxWidth: '10%',
    position: 'relative',
    top: 60,
    zIndex: 5,
  },
  gameListContainer: {
    width: '100%',
    margin: '1em 0',
  },
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    color: 'black',
    fontFamily: 'Acme',
  },
  dropdownList: {
    width: '50em',
  },
  mainContainer: {
    flexGrow: 1,
    display: 'flex',
    margin: 0,
    justifyContent: 'space-between',
    marginTop: '3em',
  },
  userInfo: {
    display: 'flex',
    backgroundColor: '#c4c4c4',
    padding: '0.3em',
    fontFamily: 'Acme',
    fontSize: '2em',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '2.5em 0',
    width: '30vw',
  },
  avatar: {
    backgroundColor: 'black',
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: '1em',
  },
  score: {
    fontFamily: 'Acme',
    fontSize: '4em',
    color: 'white',
  },
  scoreIcon: {
    maxWidth: '30%',
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginTop: '1em',
    backgroundColor: '#b5b3b2',
    '&:hover': {
      backgroundColor: '#878787',
      borderRadius: 20,
      cursor: 'pointer',
    },
  },
}))

const Room = (props) => {
  const [open, setOpen] = useState(false)

  const anchorRef = useRef(null)
  const history = useHistory()
  const classes = useStyles()

  const { location } = props
  const { roomInfo } = location
  const imgSrc = roomInfo.game === 'tic-tac-toe' ? icons.ticTacToe : icons.puzzle

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleStartGame = () => {
    history.push({ pathname: `/room/${roomInfo.code}/puzzle`, roomInfo })
  }

  const renderPlayer = () => {
    return (
      <div>
        <div className={classes.userInfo}>
          <Avatar className={classes.avatar} alt="Avatar Image">
            N
          </Avatar>
          <div>{roomInfo.owner}</div>
        </div>
        <div className={classes.userInfo}>
          <Avatar className={classes.avatar} alt="Avatar Image">
            ?
          </Avatar>
          <div>Waiting...</div>
        </div>
      </div>
    )
  }

  const prevOpen = React.useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <Container maxWidth="md">
      <div className={classes.gameListContainer}>
        <img src={imgSrc} alt="Game Icon" className={classes.gameIcon} />
        <Button
          className={classes.listContainer}
          fullWidth
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Puzzle
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.dropdownList}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Puzzle</MenuItem>
                    <MenuItem onClick={handleClose}>Tic tac toe</MenuItem>
                    <MenuItem onClick={handleClose}>Take away</MenuItem>
                    <MenuItem onClick={handleClose}>Connect Four</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div className={classes.mainContainer}>
        {renderPlayer()}
        <div className={classes.scoreContainer}>
          <img src={icons.score} alt="Score Icon" className={classes.scoreIcon} />
          <div className={classes.score}>3 - 5</div>
          <Button className={classes.button} onClick={handleStartGame}>
            Start game!
          </Button>
          <Link underline="none" href="/lobby" className={classes.link2}>
            <Button className={classes.backButton}>Back to lobby</Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default Room
