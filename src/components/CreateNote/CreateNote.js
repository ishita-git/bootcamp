import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import classes from './CreateNote.module.css';

const CreateNote = (props) => {

  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.create}>
      <h1>Rich text Editor</h1>
    
    
    </Card>
  );
};

export default CreateNote;