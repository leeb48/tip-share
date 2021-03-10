import {
  Grid,
  Paper,
  Typography,
  IconButton,
  ThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/BookmarkBorder";
import { useTheme, withTheme } from "@material-ui/styles";
import React, { Fragment } from "react";
import styled from "styled-components";

const ResultItem = withTheme(
  styled(Paper)`
    width: 100%;
    height: 220px;
    ${(props) => props.theme.breakpoints.down("xs")} {
      height: 150px;
    }

    cursor: pointer;
    padding: 0;
    margin-bottom: 10px;
  `
);

const LeftColumn = withTheme(
  styled(Grid)`
    height: 100%;
    ${(props) => props.theme.breakpoints.down("xs")} {
      display: none;
    }
  `
);

const Photo = withTheme(
  styled(Paper)`
    ${(props) => props.theme.breakpoints.down("sm")} {
      height: 130px;
      width: 130px;
      margin-right: 10px;
    }

    ${(props) => props.theme.breakpoints.up("sm")} {
      height: 160px;
      width: 160px;
    }

    margin-top: 15px;
    margin-bottom: 10px;
    background-image: url(https://lh3.googleusercontent.com/p/AF1QipOD7S2BF3pTieo2TrZ0-N41sKDp88hXU0eRb7Ty=s1600-w400);
    background-size: cover;
    border-radius: 10px;
  `
);

const MiddleColumn = withTheme(
  styled(Grid)`
    ${(props) => props.theme.breakpoints.down("sm")} {
      padding: 15px;
    }
    height: 100%;
  `
);

const TopRow = styled(Grid)``;
const BottomRow = styled(Grid)``;

const TipInfoPaper = styled(Paper)`
  padding: 8px;
  margin-right: 5px;
`;

const StyledSaveIcon = styled(SaveIcon)`
  height: 30;
  width: 30;
  padding: 0;
`;

const ProfileSavedPlacesItem = () => {
  const bookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Bookmark Click");
  };

  const muiTheme = useTheme();

  return (
    <Fragment>
      <StylesProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          {/* Result Item */}
          <Grid item>
            <ResultItem
              onClick={() => console.log("Paper Click")}
              variant="outlined"
            >
              <Grid wrap="nowrap" justify="space-between" container>
                {/* Left Column */}
                <LeftColumn sm={4} md={3} item>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    wrap="nowrap"
                  >
                    {/* Photo */}
                    <Grid item>
                      <Photo />
                    </Grid>
                    {/* Tip share count */}
                    <Grid item>
                      <Typography component="p" variant="subtitle2">
                        15 Tip Reports
                      </Typography>
                    </Grid>
                  </Grid>
                </LeftColumn>
                {/* Middle Column */}
                <Grid sm={7} md={8} item>
                  <MiddleColumn
                    container
                    direction="column"
                    justify="space-evenly"
                  >
                    {/* Top Row */}
                    <TopRow item>
                      <Typography component="p" variant="h6">
                        Wolf + Sparrow
                      </Typography>
                      <Typography component="p" variant="body1">
                        4480 Spring Mountain Rd #100, Las Vegas, NV 89102
                      </Typography>
                      <Typography component="p" variant="subtitle2">
                        <span style={{ fontWeight: "bold" }}>Operational:</span>{" "}
                        Yes
                      </Typography>
                    </TopRow>
                    {/* Bottom Row */}
                    <BottomRow item>
                      <Grid justify="center" container>
                        <TipInfoPaper>
                          <Grid item>Highest: $18</Grid>
                        </TipInfoPaper>
                        <TipInfoPaper>
                          <Grid item>Average: $12</Grid>
                        </TipInfoPaper>
                        <TipInfoPaper>
                          <Grid item>Lowest: $8</Grid>
                        </TipInfoPaper>
                      </Grid>
                    </BottomRow>
                  </MiddleColumn>
                </Grid>
                <Grid xs={1} item>
                  <IconButton
                    style={{ paddingRight: 0, paddingLeft: 0 }}
                    onClick={bookmarkClick}
                  >
                    <StyledSaveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ResultItem>
          </Grid>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default ProfileSavedPlacesItem;
