import { Grid } from "@material-ui/core";
import React from "react";
import ProfileMySharesItem from "./ProfileMySharesItem";

const ProfileMyShares = () => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <ProfileMySharesItem />
      </Grid>
      <Grid item>
        <ProfileMySharesItem />
      </Grid>
      <Grid item>
        <ProfileMySharesItem />
      </Grid>
    </Grid>
  );
};

export default ProfileMyShares;
