import React, {useContext, useRef} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';
import ProfilePicture from "@dsalvagni/react-profile-picture"

import Card from '../UI/Card/Card';
import classes from './Profile.module.css';
import ProfilePic from './ProfilePic';

const fetchData = async () => {
  try {
  
 
    let rawdata = await fetch("http://localhost:8080/api/note/home");
    let data = await rawdata.json();

    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const Profile = ({name}) => {

  const authCtx = useContext(AuthContext);
  console.log(name)

  const profilePictureRef = useRef();
  return (
    <Card className={classes.profile}>
      <h1>Profile</h1>

        <ProfilePicture
      ref={profilePictureRef}
     
     
    />  
    {/* <ProfilePic/> */}
    <br/>
     
     <a href=''>Edit Profile</a>
     <div className={classes.info}>
     <h4>Name: {localStorage.getItem("isLoggedIn")}</h4>
     <h4>User Name:</h4>
     <h4>Age:</h4>
     <h4>Gender:</h4>
     </div>
     
    
    
    </Card>
  );
};

export default Profile;