import { Button, Grid, Typography } from "@material-ui/core";
import AccountEditCustomTextField from "components/componentUtils/inputUtils/AccountEditCustomTextField";
import { Form, Formik } from "formik";
import React, { Fragment } from "react";
import styled from "styled-components";

const Gutter = styled(Grid)``;
const RootGrid = styled(Grid)``;

const MainContentGrid = styled(Grid)`
  max-width: 900px;
`;
const TopRow = styled(Grid)`
  padding-top: 2rem;
  border-bottom: 1px black solid;
`;

const HeaderTypography = styled(Typography)`
  padding: 0 1rem;
`;

const InputGroup = styled(Grid)`
  padding: 2rem 1rem;
`;

const StyledTextField = styled(AccountEditCustomTextField)`
  .MuiOutlinedInput-input {
    padding: 4px 8px;
  }
`;

const MiddleRow = styled(Grid)`
  padding-top: 2rem;
  border-bottom: 1px black solid;
`;
const BottomRow = styled(Grid)`
  padding-top: 2rem;
`;

const UpdateBtn = styled(Button)`
  color: green;
  font-size: medium;
  font-weight: 300;
  letter-spacing: 3px;
`;
const DeleteAccountBtn = styled(Button)`
  color: red;
  font-size: medium;
  font-weight: 600;
  letter-spacing: 3px;
`;

interface fValues {
  //   For updating username
  newUsername: string;
  password: string;
  // For updating password
  currentPassword: string;
  newPassword: string;
}
const initialValues: fValues = {
  newUsername: "",
  password: "",
  currentPassword: "",
  newPassword: "",
};

const handleUpdateUsername = (values: fValues) => {
  console.log(values);
  //   console.log(values.newUsername, values.password);
};

const handleUpdatePassword = (values: fValues) => {
  console.log(values.currentPassword, values.newPassword);
};

const handleDeleteAccount = () => {
  console.log("Delete Acount");
};

const ProfileAccountEdit = () => {
  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={(data, { resetForm }) => {
          console.log("submitted");
        }}
      >
        {({ values }) => (
          <Form>
            <RootGrid justify="center" container>
              <Gutter item sm={1} />
              <MainContentGrid
                item
                xs={12}
                sm={10}
                container
                direction="column"
              >
                <TopRow item container direction="column">
                  <HeaderTypography variant="h6">
                    Update Username
                  </HeaderTypography>
                  <InputGroup item container spacing={4}>
                    <Grid item xs={6}>
                      <Typography variant="body1">New Username</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField name="newUsername" variant="outlined" />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1">Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField
                        name="password"
                        variant="outlined"
                        type="password"
                      />
                    </Grid>
                  </InputGroup>
                  <UpdateBtn onClick={() => handleUpdateUsername(values)}>
                    Update
                  </UpdateBtn>
                </TopRow>
                <MiddleRow item container direction="column">
                  <HeaderTypography variant="h6">
                    Update Password
                  </HeaderTypography>

                  <InputGroup item container spacing={4}>
                    <Grid item xs={6}>
                      <Typography variant="body1">Current Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField
                        name="currentPassword"
                        variant="outlined"
                        type="password"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1">New Password</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField
                        name="newPassword"
                        variant="outlined"
                        type="password"
                      />
                    </Grid>
                  </InputGroup>
                  <UpdateBtn onClick={() => handleUpdatePassword(values)}>
                    Update
                  </UpdateBtn>
                </MiddleRow>

                <BottomRow item container direction="column">
                  <DeleteAccountBtn onClick={handleDeleteAccount}>
                    Delete Account
                  </DeleteAccountBtn>
                </BottomRow>
              </MainContentGrid>
              <Gutter item sm={1} />
            </RootGrid>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default ProfileAccountEdit;
