import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button/Button";
import { NotesContext } from "../../store/notes-context";

import Card from "../UI/Card/Card";
import classes from "./Mynotes.module.css";

const Mynotes = (props) => {
  const authCtx = useContext(AuthContext);
  const notesCtx = useContext(NotesContext)
 
  return (
    <>
      <Card className={classes.mynotes}> fdffd</Card>

      <Card className={classes.mynotes}></Card>

    </>
  );
};

export default Mynotes;