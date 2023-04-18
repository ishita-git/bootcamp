import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button/Button";
import { NotesContext } from "../../store/notes-context";

import Card from "../UI/Card/Card";
import classes from "./PublicNotes.module.css";

const PublicNotes = (props) => {
  const authCtx = useContext(AuthContext);
  const notesCtx = useContext(NotesContext)
 
  return (
    <>
      <Card className={classes.notes}> </Card>

      <Card className={classes.notes}></Card>

      <Card className={classes.notes}></Card>

      <Card className={classes.notes}></Card>
    </>
  );
};

export default PublicNotes;
