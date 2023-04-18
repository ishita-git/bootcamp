import React, {useContext, useRef, useState} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';
import ProfilePicture from "@dsalvagni/react-profile-picture"

import Card from '../UI/Card/Card';
import classes from './Profile.module.css';
import ProfilePic from './ProfilePic';



const Profile = () => {

  let [name, setName] = useState('');
  let [userName, setuserName] = useState('');
  let [age, setAge] = useState('');
  let [gender, setGender] = useState('');

  const fetchData = async () => {
    try {
    
   
      let rawdata = await fetch("http://localhost:8080/user/anshk",{
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        }
      });
      let data = await rawdata.json();
      setName(data.name)
      setuserName(data.username)
      setAge(data.age)
      setGender(data.gender)
  
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

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
     <h4>Name: {name}</h4>
     <h4>User Name: {userName}</h4>
     <h4>Age: {age}</h4>
     <h4>Gender: {gender}</h4>
     </div>
     
    
    
    </Card>
  );
};

export default Profile;