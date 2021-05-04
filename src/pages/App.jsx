import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import './App.css'
import withRoot from '../theme/withRoot'
import { Login, Register } from './Auth'
import { Welcome, LeaderBoard, Profile } from './General'
import { EnterLobby, Lobby, Room } from './Lobby'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Welcome} />
        {/* Private */}
        <Route exact path="/leaderboard" component={LeaderBoard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/enter-lobby" component={EnterLobby} />
        <Route exact path="/lobby" component={Lobby} />
        <Route path="/room" component={Room} />
        {/* Private */}
      </Switch>
    </Router>
  )
}

export default withRoot(App)
