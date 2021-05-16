import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from "mobx-react-lite";
import { Context } from './index';
import { chek } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      chek().then(data => {
        user.setId(data.id)
        user.setUser(true)
        user.setIsAuth(true)
        data.role ==="ADMIN" ? user.setAdmin(true) :  user.setAdmin(false)
      }).finally(() => setLoading(false))
  }, []);

  if(loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
    <NavBar />
      <AppRoter />
    </BrowserRouter>
  )
});

export default App;