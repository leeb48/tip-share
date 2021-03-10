import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const RootGrid = styled(Grid)`
  margin-top: 3rem;
`;

const LeftColumn = styled(Grid)`
  padding: 10px;
`;
const MiddleColumn = styled(Grid)`
  padding: 10px;
`;
const RightColumn = styled(Grid)`
  padding: 10px;
`;

const EditBtn = styled(Button)`
  && {
    background-color: transparent;
    font-weight: 600;
    font-size: medium;
  }
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
  margin-bottom: 20px;
`;

interface Props {
  handleChange: (e: React.ChangeEvent<{}>, index: number) => void;
  tabChangeIdx: number;
}

const ProfileAccountPage: React.FC<Props> = ({
  handleChange,
  tabChangeIdx,
}) => {
  return (
    <RootGrid container justify="space-around">
      <LeftColumn xs={6} sm={5} item>
        <StyledTypography variant="body1">Username:</StyledTypography>
        <StyledTypography variant="body1">Password:</StyledTypography>
      </LeftColumn>
      <MiddleColumn xs={6} sm={5} item>
        <StyledTypography variant="body1">
          bongster228@gmail.com
        </StyledTypography>
        <StyledTypography variant="body1">**********</StyledTypography>
      </MiddleColumn>
      <RightColumn sm={2} item>
        <EditBtn
          onClick={(e: React.ChangeEvent<{}>) => handleChange(e, tabChangeIdx)}
        >
          Edit
        </EditBtn>
      </RightColumn>
    </RootGrid>
  );
};

export default ProfileAccountPage;
