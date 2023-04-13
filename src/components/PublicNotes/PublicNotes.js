import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import classes from './PublicNotes.module.css';

const PublicNotes = (props) => {

  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.notes}>

    
    
    </Card>
  );
};

export default PublicNotes;
