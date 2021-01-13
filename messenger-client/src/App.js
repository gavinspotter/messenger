import React, { useCallback, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MessageBoard from "./messages/pages/MessageBoard"
import Messages from "./messages/pages/Messages"
import MainNavigation from "./shared/components/navigation/MainNavigation"

import { AuthContext } from "./shared/context/auth-context"
import Auth from "./user/pages/Auth"
import Signup from "./user/pages/Signup"

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  let routes

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="messages">
          <Messages />
        </Route>
        <Route path="/:userId/messageboards">
          <MessageBoard />
        </Route>
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
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >

      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>


    </AuthContext.Provider>
  )

}

export default App;
