import {
  ButtonBase,
  Grid,
  Paper,
  StylesProvider,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import FlagIcon from "@material-ui/icons/Flag";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useTheme, withTheme } from "@material-ui/styles";
import styled from "styled-components";

const TipInfoPaper = styled(Paper)`
  padding: 8px 15px;
`;

const RootGrid = withTheme(
  styled(Grid)`
    padding: 20px;
    ${(props) => props.theme.breakpoints.down("sm")} {
      flex-direction: column;
    }
  `
);

const UserSharePost = withTheme(
  styled(Grid)`
    ${(props) => props.theme.breakpoints.down("sm")} {
      flex-direction: row;
      padding-bottom: 1rem;
    }
  `
);

const FeedbackBtnGroup = styled(Grid)`
  margin-bottom: 8px;
`;

const FeedbackBtn = styled(ButtonBase)`
  border-radius: 5px;
  padding: 4px 7px 4px 7px;
`;

const FlagBtn = styled(ButtonBase)`
  border-radius: 5px;
  padding: 3px 5px 3px 5px;
`;

const StyledThumbUpIcon = styled(ThumbUpIcon)`
  margin-right: 5px;
  color: green;
  width: 13;
  height: 13;
`;
const StyledThumbDownIcon = styled(ThumbDownIcon)`
  margin-right: 5px;
  color: darkorange;
  width: 13;
  height: 13;
`;
const StyledFlagIcon = styled(FlagIcon)`
  color: red;
  width: 13;
  height: 13;
`;

const TipInfoGrid = withTheme(
  styled(Grid)`
    ${(props) => props.theme.breakpoints.down("sm")} {
      flex-direction: column;
    }
  `
);

const TipPostUserShareItem = () => {
  const muiTheme = useTheme();

  return (
    <TipInfoPaper>
      <StylesProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <RootGrid wrap="nowrap" item container justify="space-around">
            <UserSharePost
              item
              sm={12}
              md={3}
              container
              alignItems="center"
              justify="space-evenly"
              direction="row"
            >
              <TipInfoGrid
                xs={4}
                md={12}
                item
                container
                justify="space-evenly"
                alignItems="center"
              >
                <Typography variant="subtitle1">Lowest</Typography>
                <TipInfoPaper>$10/hr</TipInfoPaper>
              </TipInfoGrid>
              <TipInfoGrid
                xs={4}
                md={12}
                item
                container
                justify="space-evenly"
                alignItems="center"
              >
                <Typography variant="subtitle1">Typical</Typography>
                <TipInfoPaper>$15/hr</TipInfoPaper>
              </TipInfoGrid>
              <TipInfoGrid
                xs={4}
                md={12}
                item
                container
                justify="space-evenly"
                alignItems="center"
              >
                <Typography variant="subtitle1">Highest</Typography>
                <TipInfoPaper>$120/hr</TipInfoPaper>
              </TipInfoGrid>
            </UserSharePost>
            <Grid item sm={12} md={9} container direction="column" spacing={2}>
              <Grid item>
                <Typography component="p" variant="body2">
                  (Max 365 Characters) Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Rerum, earum voluptas magnam incidunt id
                  quasi labore iste impedit officiis doloribus dolorum totam
                  vitae nisi ipsum, et mollitia reprehenderit excepturi est
                  nesciunt atque. Accusantium odio cumque, quo qui provident
                  quos quia nulla cupiditate! Vitae beatae unde sapiente
                  similique perspiciatis.
                </Typography>
              </Grid>
              <Grid item container direction="column" alignItems="flex-end">
                <FeedbackBtnGroup item container justify="space-evenly">
                  <FeedbackBtn>
                    <StyledThumbUpIcon />
                    <Typography component="p" variant="subtitle2">
                      Helpful 7
                    </Typography>
                  </FeedbackBtn>
                  <FeedbackBtn>
                    <StyledThumbDownIcon />
                    <Typography component="p" variant="subtitle2">
                      Not Helpful 7
                    </Typography>
                  </FeedbackBtn>
                </FeedbackBtnGroup>
                <Grid item>
                  <FlagBtn>
                    <StyledFlagIcon />
                    <Typography component="p" variant="caption">
                      Flag this post
                    </Typography>
                  </FlagBtn>
                </Grid>
              </Grid>
            </Grid>
          </RootGrid>
        </ThemeProvider>
      </StylesProvider>
    </TipInfoPaper>
  );
};

export default TipPostUserShareItem;
