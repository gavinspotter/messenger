import React, { useCallback, useState } from "react"

import { AuthContext } from "./shared/context/auth-context"

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

}

export default App;
