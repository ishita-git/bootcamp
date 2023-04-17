import React, {
  useContext,
  useRef,
  useReducer,
  useState,
  useEffect,
} from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from "./Signin.module.css";

const Signin = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: "", isValid: false };
  };

  const usernameReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.trim().length > 1 };
    }
    if (action.type === "INPUT_BLUR") {
      return { value: state.value, isValid: state.value.trim().length > 1 };
    }
    return { value: "", isValid: false };
  };

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      passwordState.isValid && event.target.value.trim().length > 1
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      usernameState.isValid && event.target.value.trim().length > 6
    );
  };

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const fetchData = async () => {
    try {


      let rawdata = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify({
           "username" : usernameState.value,
           "password" : passwordState.value
        })

      });
      let data = await rawdata.json();

      console.log(data);
     } catch (e) {
      console.log(e);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    fetchData();

    if (formIsValid) {
      authCtx.onLogin(passwordState.value, usernameState.value);
    }
  };

  return (
    <Card className={classes.home}>
      <form onSubmit={submitHandler}>
        <Input
          ref={usernameInputRef}
          id="username"
          label="User Name"
          type="text"
          value={usernameState.value}
          onChange={usernameChangeHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          onChange={passwordChangeHandler}
          value={passwordState.value}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
          <br />
        </div>
      </form>
    </Card>
  );
};

export default Signin;
