import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { useForm } from "react-hook-form";
import axios from "../config/axiosConfig";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import useStyles from "./formStyles";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setToken } = useStoreActions((actions) => actions);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    setLoading(true);
    axios
      .post("signin", {
        ...data,
      })
      .then((response) => {
        setLoading(false);
        setToken(response.data.token);
        return history.push("/");
      })
      .catch(() => {
        setLoading(false);
        alert("Incorrect data");
      });
  }
  if (loading)
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />;
      </Box>
    );
  return (
    <div className={classes.root}>
      <Card>
        <form
          noValidate
          className={classes.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography>Name</Typography>
          <TextField
            id="name-login"
            type="name"
            name="name"
            variant="outlined"
            fullWidth
            inputRef={register}
          />
          <Typography>Password</Typography>
          <TextField
            id="password-login"
            type="password"
            name="password"
            autoComplete="current-password"
            variant="outlined"
            fullWidth
            inputRef={register}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disableElevation
              type="submit"
            >
              Login
            </Button>
          </div>
          <Link to="/signup">
            <Button size="small">Signup</Button>
          </Link>
        </form>
      </Card>
    </div>
  );
};
export default Login;
