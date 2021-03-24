import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useAppDispatch } from "app/store";
import NormalCheckbox from "components/componentUtils/inputUtils/NormalCheckbox";
import TextFieldWithError from "components/componentUtils/inputUtils/TextFieldWithError";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { LoginUserDto } from "./auth.dto";
import { loginUser } from "./authSlice";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues: LoginUserDto = {
  username: "",
  password: "",
  rememberMe: false,
};

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  let timer: ReturnType<typeof setTimeout> | null = null;

  useEffect(() => {
    return () => clearTimeout(timer as NodeJS.Timeout);
  }, [timer]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);

            timer = setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);

            dispatch(loginUser(values, history));
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextFieldWithError
                variant="outlined"
                fullWidth
                autoFocus
                name="username"
                label="Username"
              />
              <TextFieldWithError
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              <NormalCheckbox
                name="rememberMe"
                color="primary"
                label="Remember Me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
