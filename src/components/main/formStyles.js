import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formContainer: {
    margin: "2rem",
    "& .MuiFormControl-root": {
      margin: "0.5rem 0",
    },
  },
}));
