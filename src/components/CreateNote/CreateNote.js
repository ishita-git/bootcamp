import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import classes from "./CreateNote.module.css";
import { Editor } from "./Editor";

const CreateNote = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.editor_container}>
      {" "}
      <Editor />
    </div>
  );
};

export default CreateNote;
