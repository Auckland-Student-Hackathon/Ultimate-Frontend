import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import withRoot from '../theme/withRoot'
import { Login, Register } from './Auth'
import { Welcome, LeaderBoard, Profile } from './General'
import { Lobby, Room } from './Lobby'
import { RunGame, WinGame, LoseGame, DrawGame } from './PuzzleGame'
import TicTacToeGame from './TicTacToeGame'
import ProtectedRoute from '../routes'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Welcome} />
        {/* Private */}
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/leaderboard" component={LeaderBoard} />
        <ProtectedRoute exact path="/lobby" component={Lobby} />
        <ProtectedRoute path="/room/:id/puzzle" component={RunGame} />
        <ProtectedRoute path="/win" component={WinGame} />
        <ProtectedRoute path="/lose" component={LoseGame} />
        <ProtectedRoute path="/draw" component={DrawGame} />
        <ProtectedRoute path="/room/:id" component={Room} />
        <ProtectedRoute path="/ticTacToe/:id" component={TicTacToeGame} />
        {/* Private */}
      </Switch>
    </Router>
  )
}

export default withRoot(App)
