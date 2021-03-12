import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import ProfileMySharesItem from "components/profile/ProfileMySharesItem";
import React from "react";
import styled from "styled-components";

const RootGrid = styled(Grid)``;

const SearchBarGrid = styled(Grid)``;
const SearchBar = styled(TextField)``;
const SearchBtn = styled(Button)`
  height: 100%;
`;

const UserListGrid = styled(Grid)`
  margin: 2rem 0 2rem 0;
`;

const PaginationGrid = styled(Grid)`
  padding-bottom: 2rem;
`;

const AdminManagePosts = () => {
  return (
    <RootGrid container>
      <SearchBarGrid item container alignItems="center">
        <SearchBar name="searchTerm" variant="outlined" size="small" />
        <SearchBtn variant="outlined" color="primary">
          Search
        </SearchBtn>
      </SearchBarGrid>

      <UserListGrid item container spacing={3}>
        <Grid item>
          <Typography variant="body1">Username: user1</Typography>
          <Button variant="contained" color="primary">
            Unflag
          </Button>
          <Button variant="contained" color="secondary">
            Remove
          </Button>
          <ProfileMySharesItem />
        </Grid>
        <Grid item>
          <Typography variant="body1">Username: user2</Typography>
          <Button variant="contained" color="primary">
            Unflag
          </Button>
          <Button variant="contained" color="secondary">
            Remove
          </Button>
          <ProfileMySharesItem />
        </Grid>
        <Grid item>
          <Typography variant="body1">Username: user3</Typography>
          <Button variant="contained" color="primary">
            Unflag
          </Button>
          <Button variant="contained" color="secondary">
            Remove
          </Button>
          <ProfileMySharesItem />
        </Grid>
      </UserListGrid>

      <PaginationGrid container justify="center">
        <Pagination count={10} variant="outlined" />
      </PaginationGrid>
    </RootGrid>
  );
};

export default AdminManagePosts;
