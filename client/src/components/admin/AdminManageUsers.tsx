import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
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

const UserListItem = styled(Grid)`
  border: 1px solid rgba(125, 186, 229, 0.7);
  border-radius: 5px;
  margin: 8px 0;
  padding: 12px 20px;
  height: 6rem;
`;

const UserListInfo = styled(Grid)`
  flex-grow: 1;
`;

const PaginationGrid = styled(Grid)`
  padding-bottom: 2rem;
`;

const BlockBtn = styled(Button)`
  padding: 8px 12px;
`;

const AdminManageUsers = () => {
  const usernames = ["one", "two", "three", "four", "five", "six"];

  const DisplayUserList = usernames.map((user) => (
    <UserListItem key={user} item container xs={12} alignItems="center">
      <UserListInfo item>
        <Typography variant="subtitle1">Username: {user}</Typography>
        <Typography variant="subtitle1">Date Registered: 2021-03-12</Typography>
      </UserListInfo>
      <BlockBtn variant="contained" color="secondary" size="small">
        Block
      </BlockBtn>
    </UserListItem>
  ));

  return (
    <RootGrid container>
      <SearchBarGrid item container alignItems="center">
        <SearchBar name="searchTerm" variant="outlined" size="small" />
        <SearchBtn variant="outlined" color="primary">
          Search
        </SearchBtn>
      </SearchBarGrid>

      <UserListGrid item container>
        {DisplayUserList}
      </UserListGrid>

      <PaginationGrid container justify="center">
        <Pagination count={10} variant="outlined" />
      </PaginationGrid>
    </RootGrid>
  );
};

export default AdminManageUsers;
