import React from 'react'
import { makeStyles, Toolbar, IconButton, MenuItem, Menu } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  link: {
    color: 'black',
  },
}))

function ToolBar() {
  const classes = useStyles()

  return (
    <div className={classes.toolbar}>
      <Toolbar>
        <Link href="/leaderboard" underline="none" className={classes.link}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <EqualizerIcon />
          </IconButton>
        </Link>
        <Link href="/profile" underline="none" className={classes.link}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Link>
      </Toolbar>
    </div>
  )
}

export default ToolBar
