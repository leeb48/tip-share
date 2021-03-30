import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useAppDispatch } from "app/store";
import { registerUser } from "components/auth/authSlice";
import TextFieldWithError from "components/componentUtils/inputUtils/TextFieldWithError";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  username: yup.string().required("Username is required").min(5).max(15),
  password: yup.string().required().min(5).max(15),
});

const RegisterForm = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  let timer: NodeJS.Timeout | null = null;

  // clean up setTimeout when a successful registration occurs
  // and the component dismounts
  useEffect(() => {
    return () => clearTimeout(timer as NodeJS.Timeout);
  }, [timer]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            // stop users from spamming the register button
            timer = setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);

            dispatch(registerUser(data, history));
          }}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextFieldWithError
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldWithError
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldWithError
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography component="p" variant="body1">
                    Go ahead, sign up, you're still anonymous. You're always
                    anonymous here, but logging in will save your school and
                    recent searches, helping you find professors faster. You can
                    thank us later.
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={props.isSubmitting}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <form className={classes.form}></form>
      </div>
    </Container>
  );
};

export default RegisterForm;
