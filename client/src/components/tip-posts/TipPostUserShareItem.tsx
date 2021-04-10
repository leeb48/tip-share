import {
  Button,
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
import RemoveIcon from "@material-ui/icons/Backspace";
import EditIcon from "@material-ui/icons/Edit";
import { TipPost } from "components/interfaces/TipPost.interface";
import { Link } from "react-router-dom";

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

const FeedbackBtn = styled(({ ...rest }) => <ButtonBase {...rest} />)`
  border-radius: 5px;
  padding: 4px 7px 4px 7px;
`;

const FlagBtn = styled(({ ...rest }) => <ButtonBase {...rest} />)`
  border-radius: 5px;
  padding: 3px 5px 3px 5px;
`;

const EditBtn = styled(({ ...rest }) => <ButtonBase {...rest} />)`
  border-radius: 5px;
  padding: 4px 7px 4px 7px;
`;

const RemoveBtn = styled(({ ...rest }) => <ButtonBase {...rest} />)`
  border-radius: 5px;
  padding: 4px 7px 4px 7px;
`;

const StyledEditIcon = styled(EditIcon)`
  margin-right: 5px;
  color: teal;
  width: 13;
  height: 13;
`;
const StyledRemoveIcon = styled(RemoveIcon)`
  margin-right: 5px;
  color: grey;
  width: 13;
  height: 13;
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

const EditRemoveBtnGrid = styled(Grid)``;
const PostContentGrid = styled(Grid)`
  min-height: 5rem;
`;
const FeedbackBtnGrid = styled(Grid)``;

const TipInfoGrid = withTheme(
  styled(Grid)`
    ${(props) => props.theme.breakpoints.down("sm")} {
      flex-direction: column;
    }
  `
);

interface Props {
  tipPost: TipPost;
}

const TipPostUserShareItem: React.FC<Props> = ({ tipPost }) => {
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
                <TipInfoPaper>${tipPost.lowest}/hr</TipInfoPaper>
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
                <TipInfoPaper>${tipPost.typical}/hr</TipInfoPaper>
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
                <TipInfoPaper>${tipPost.highest}/hr</TipInfoPaper>
              </TipInfoGrid>
            </UserSharePost>
            <Grid item sm={12} md={9} container direction="column" spacing={2}>
              <EditRemoveBtnGrid item container justify="flex-end">
                <EditBtn component={Link} to={`/tip-post/edit/${tipPost.id}`}>
                  <StyledEditIcon />
                </EditBtn>
                <RemoveBtn>
                  <StyledRemoveIcon />
                </RemoveBtn>
              </EditRemoveBtnGrid>
              <PostContentGrid item>
                <Typography component="p" variant="body1">
                  {tipPost.comments
                    ? tipPost.comments
                    : "User did not provide any comments."}
                </Typography>
              </PostContentGrid>
              <FeedbackBtnGrid
                item
                container
                direction="column"
                alignItems="flex-end"
              >
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
              </FeedbackBtnGrid>
            </Grid>
          </RootGrid>
        </ThemeProvider>
      </StylesProvider>
    </TipInfoPaper>
  );
};

export default TipPostUserShareItem;
