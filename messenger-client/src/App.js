import React, { useCallback, useState } from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import MainNavigation from "./shared/components/navigation/MainNavigation"

import { AuthContext } from "./shared/context/auth-context"

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

      </Switch>
    )
  } else {
    routes = (
      <Switch>

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
