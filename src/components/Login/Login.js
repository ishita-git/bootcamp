import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 1 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 1 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  
  const {setSignin} = props;
  console.log(props)
  console.log(setSignin)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const usernameInputRef = useRef();
  const ageInputRef = useRef();
  const genderInputRef = useRef();

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: nameIsValid } = nameState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP!");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const fetchData = async () => {
    try {
      const formdata = new FormData();
      formdata.append("username", nameState.value);
      formdata.append("email", emailState.value);
      formdata.append("password", passwordState.value);
      let rawdata = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {},
        body: formdata,
      });
      let data = await rawdata.json();

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.isValid &&
        passwordState.isValid &&
        event.target.value.trim().length > 1
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateNameHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchName({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    fetchData();

    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value, nameState.value);
      alert('user signed in')
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    } else {
      nameInputRef.current.focus();
    }
  };

  const signinHandler = () =>{
    setSignin(true)
    console.log(props.signinclick)
  }

  return (
    <>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <Input
            ref={nameInputRef}
            id="name"
            label="Name"
            type="text"
            isValid={nameIsValid}
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />

          <Input
            ref={usernameInputRef}
            id="username"
            label="User Name"
            type="text"
          />
          <Input ref={ageInputRef} id="age" label="Age" type="text" />
          <Input ref={genderInputRef} id="gender" label="Gender" type="text" />
          <Input
            ref={emailInputRef}
            id="email"
            label="E-mail"
            type="email"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />

          <Input
            ref={passwordInputRef}
            id="password"
            label="Password"
            type="password"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn}>
              Signup
            </Button>
            <br />
          </div>
          <div className={classes.actions}>
            <span>
              Already signed up?<a onClick={signinHandler} href="/signin">Login</a>
            </span>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Login;
