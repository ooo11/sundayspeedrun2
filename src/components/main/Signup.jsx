import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./formStyles";
import axios from "../config/axiosConfig";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be longer than 2 character.")
    .required(),

  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, "Password must contain a special character.")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter.")
    .matches(/[0-9]/, "Password must contain a number.")
    .required(),
});

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { setToken } = useStoreActions((actions) => actions);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    if (data.password !== data.password2) {
      alert("passwords should be the same!");
      return;
    }
    setLoading(true);
    axios
      .post("signup", {
        ...data,
      })
      .then((response) => {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        return history.push("/");
      })
      .catch(() => {
        setLoading(false);
        alert("Incorrect data");
      });
  };
  if (loading)
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />;
      </Box>
    );

  return (
    <div>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={classes.formContainer}
        >
          <Typography>Name</Typography>
          <TextField
            inputRef={register}
            fullWidth
            name="name"
            type="text"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />

          <Typography>Password</Typography>
          <TextField
            inputRef={register}
            fullWidth
            name="password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Typography>Password</Typography>
          <TextField
            inputRef={register}
            fullWidth
            name="password2"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
              type="submit"
            >
              Create account
            </Button>
          </div>
          <Link to="/login">
            <Button size="small">Login</Button>
          </Link>
        </form>
      </Card>
    </div>
  );
};
export default Signup;
