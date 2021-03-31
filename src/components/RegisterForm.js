import React, {useState} from "react";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import {Header, Form, Button, Container, Input} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    isDiner: null,
    isOperator: null,
  });

  const {push, goBack} = useHistory();
  const [dinerId, setDinerId] = useState();
  const [operatorId, setOperatorId] = useState();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is a required field")
      .min(6, "Username must be at least 6 characters"),
    email: yup.string().email().required("Email is a required field"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is a required field"),
  });

  const handleValidation = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
    handleValidation(e);
  };

  // This submit function directs to proper API based on the value of the button selected
  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    if (newUser.isDiner === true) {
      console.log(
        "username",
        newUser.username,
        "email",
        newUser.email,
        "password",
        newUser.password
      );

      axiosWithAuth()
        .post("/api/auth/register/diner", {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        })
        .then((res) => {
          console.log("New Diner Created", res);

          axiosWithAuth()
            .post("/api/auth/login", {
              username: newUser.username,
              password: newUser.password,
            })
            .then((res) => {
              setDinerId(res.data.diner.dinerId);
              localStorage.setItem("dinerId", res.data.diner.dinerId);
              localStorage.setItem("Token", res.data.token);
              push(`/home`);
            });
        })
        .catch((err) => {
          setErrors({
            ...errors,
            [e.target.name]: err.errors[0],
          });
        });
    } else if (newUser.isOperator === true) {
      axiosWithAuth()
        .post("/api/auth/register/operator", {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        })
        .then((res) => {
          console.log("New Operator Created", res);

          axiosWithAuth()
            .post("/api/auth/login", {
              username: newUser.username,
              password: newUser.password,
            })
            .then((res) => {
              setOperatorId(res.data.operator.operatorId);
              localStorage.setItem("operatorId", res.data.operator.operatorId);
              localStorage.setItem("Token", res.data.token);
              push(`/operator/dashboard`);
            });
        })
        .catch((err) => {
          setErrors({
            ...errors,
            [e.target.name]: err.errors[0],
          });
        });
    }
  };

  return (
    <Container textalign="center" style={{marginTop: "10rem"}}>
      <Form onSubmit={handleSubmit}>
        <Header size="medium" textAlign="center" style={{marginBottom: "2rem"}}>
          Sign Up to Join Our Food Truck !
        </Header>
        <Form.Field>
          <Button.Group>
            <Button
              primary
              type="button"
              name="diner"
              onClick={() =>
                setNewUser({
                  ...newUser,
                  isDiner: true,
                  isOperator: false,
                })
              }
            >
              Diner
            </Button>
            <Button.Or text="or" />
            <Button
              color="orange"
              type="button"
              name="operator"
              onClick={() =>
                setNewUser({
                  ...newUser,
                  isOperator: true,
                  isDiner: false,
                })
              }
            >
              Operator
            </Button>
          </Button.Group>
        </Form.Field>
        <Form.Field>
          <Input
            size="small"
            placeholder="Username:"
            name="username"
            type="text"
            value={newUser.username}
            onChange={inputChange}
          />
          <br />
          <br />
          <Input
            size="small"
            placeholder="Email:"
            name="email"
            type="email"
            value={newUser.email}
            onChange={inputChange}
          />
          <br />
          <br />
          <Input
            size="small"
            placeholder="Password:"
            name="password"
            type="password"
            value={newUser.password}
            onChange={inputChange}
          />
        </Form.Field>
        <Button color="teal" type="submit">
          Register
        </Button>
        <Button color="grey" type="submit" onClick={() => goBack()}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
