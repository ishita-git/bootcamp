import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './components/Profile/Profile';
import PublicNotes from './components/PublicNotes/PublicNotes';
import CreateNote from './components/CreateNote/CreateNote';

function App() {
  const ctx = useContext(AuthContext);
  

  return (
    <React.Fragment>
  
      <MainHeader  />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {/* {ctx.isLoggedIn && <Home />} */}
      </main>
      <Router>
        <Routes>
          <Route exact path="/profile"element={ctx.isLoggedIn &&<Profile/>}/>
          <Route exact path="/publicnotes"element={ctx.isLoggedIn &&<PublicNotes/>}/>
          <Route exact path="/createnotes"element={ctx.isLoggedIn &&<CreateNote/>}/>
        </Routes>
      </Router>
      
    </React.Fragment>
  );
}

export default App;
