import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import withRoot from '../theme/withRoot'
import { Login, Register } from './Auth'
import { Welcome, LeaderBoard, Profile } from './General'
import { Lobby, Room } from './Lobby'
import { RunGame, WinGame, LoseGame } from './PuzzleGame'

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
        <Route exact path="/lobby" component={Lobby} />
        <Route path="/room/:id/puzzle" component={RunGame} />
        <Route path="/win" component={WinGame} />
        <Route path="/lose" component={LoseGame} />
        <Route path="/room/:id" component={Room} />
        {/* Private */}
      </Switch>
    </Router>
  )
}

export default withRoot(App)
