import React, {useState, useEffect} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {useHistory} from "react-router-dom";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import {Link} from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Segment,
  Grid,
  Divider,
  Header,
} from "semantic-ui-react";

// Yup validation schema
const formSchema = yup.object().shape({
  username: yup.string().required("Username is a required field"),
  password: yup.string().required("Password is a required field"),
});

const Login = () => {
  // Setting state for diner / operator
  const [dinerId, setDinerId] = useState();

  const [operatorId, setOperatorId] = useState();
  const {push} = useHistory();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // Displays errors when validation is failed
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Keeps submit button in disabled state until validation is passed
  const [btnDisabled, setBtnDisabled] = useState(true);

  // Function to keep button disabled until validation is passed
  useEffect(() => {
    formSchema.isValid(user).then((valid) => {
      setBtnDisabled(!valid);
    });
  }, [user]);

  // Form validation to display errors
  const validateChange = (e) => {
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

  const handleChange = (evt) => {
    evt.persist();
    setUser({
      ...user,
      [evt.target.name]: evt.target.value,
    });
    validateChange(evt);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/auth/login", {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        console.log("submitted", res);
        if (res.data.type === "operator") {
          setOperatorId(res.data.operator.operatorId);

          localStorage.setItem("operatorId", res.data.operator.operatorId);
          localStorage.setItem("Token", res.data.token);
          push(`/operator/dashboard`);
        } else if (res.data.type === "diner") {
          setDinerId(res.data.diner.dinerId);
          localStorage.setItem("dinerId", res.data.diner.dinerId);
          localStorage.setItem("Token", res.data.token);
          console.log(res.data.token);
          push(`/home`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container textalign="center" style={{marginTop: "10rem"}}>
      <Header size="medium" textAlign="center" style={{marginBottom: "2rem"}}>
        Welcome to Our Food Truck Stand
      </Header>
      <Segment placeholder>
        <Grid columns={2} stackable>
          <Divider vertical>Or</Divider>

          <Grid.Column>
            <Form onSubmit={submitLogin}>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Username"
                placeholder="Username"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
              {errors.username.length > 0 ? (
                <p className="error">{errors.username}</p>
              ) : null}
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              {errors.password.length > 0 ? (
                <p className="error">{errors.password}</p>
              ) : null}
              <Button
                type="submit"
                disabled={btnDisabled}
                content="Login"
                primary
              />
            </Form>
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Link to="/register">
              <Button
                content="Sign up"
                icon="signup"
                size="big"
                onClick={() => push(`/register`)}
              />
            </Link>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};

export default Login;
