import React, { useContext } from "react"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import MessageBoard from "./messages/pages/MessageBoard"
import Messages from "./messages/pages/Messages"
import MainNavigation from "./shared/components/navigation/MainNavigation"

import { AuthContext } from "./shared/context/auth-context"
import { useAuth } from './shared/hooks/auth-hook';
import Auth from "./user/pages/Auth"
import SassHome from "./user/pages/SassHome"
import Signup from "./user/pages/Signup"

const App = () => {

  const auth = useContext(AuthContext)

  const { token, login, logout, userId } = useAuth();

  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/:userId/messageboards">
          <MessageBoard />
        </Route>
        <Route path="/:mbId/messageboard">
          <Messages />
        </Route>
        <Redirect to={`/${userId}/messageboards`} />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}
    >

      <Router>
        <SassHome>
          {routes}
        </SassHome>
      </Router>


    </AuthContext.Provider>
  )

}

export default App;
