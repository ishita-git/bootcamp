import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button/Button";
import { NotesContext } from "../../store/notes-context";

import Card from "../UI/Card/Card";
import classes from "./PublicNotes.module.css";

const PublicNotes = (props) => {

  const [notes,setNotes] = useState([]);

  const authCtx = useContext(AuthContext);
  const notesCtx = useContext(NotesContext);

  useEffect(() => {
    fetchData();
  }, []);

  const extractData = (s) =>{
    var el = document.createElement("p");
     el.appendChild(document.createTextNode(s));
      var tmp = document.createElement("div");
       tmp.appendChild(el);
       console.log(tmp.innerHTML);
  }

  const fetchData = async () => {
    try {
      let rawdata = await fetch("http://localhost:8080/api/note/home", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await rawdata.json();
      console.log(data);
      let notes = data.map((note) => note.description);
      console.log(notes);
      setNotes(notes)
      extractData(notes[0]);

    } catch (e) {
      console.log(e);
    }
  };

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
