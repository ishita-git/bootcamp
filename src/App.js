import React, {useContext, useState} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './components/Profile/Profile';
import PublicNotes from './components/PublicNotes/PublicNotes';
import CreateNote from './components/CreateNote/CreateNote';
import Signin from './components/Signin/Signin';
import Mynotes from './components/Mynotes/Mynotes';

function App() {
  const ctx = useContext(AuthContext);
  const [signin , setSignin] = useState(false);
  

  return (
    <React.Fragment>
  
      <MainHeader  />
      <main></main>
      <Router>
        <Routes>
          <Route exact path="/profile"element={ctx.isLoggedIn &&<Profile/>}/>
          <Route exact path="/publicnotes"element={ctx.isLoggedIn &&<PublicNotes/>}/>
          <Route exact path="/publicnotes"element={ctx.isLoggedIn &&<Mynotes/>}/>
          <Route exact path="/createnotes"element={ctx.isLoggedIn &&<CreateNote/>}/>
          <Route exact path="/signin" element={ !ctx.isLoggedIn && <Signin />}/>
          <Route exact path="/login" element={!ctx.isLoggedIn && <Login />}/>
          <Route exact path="/" element={!ctx.isLoggedIn && <Login />}/>
        </Routes>
      </Router>
      
    </React.Fragment>
  );
}

export default App;
