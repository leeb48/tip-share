import { Button, Grid, Typography } from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/AttachMoney";
import { useAppDispatch } from "app/store";
import CommentTextField from "components/componentUtils/inputUtils/CommentTextField";
import TextFieldWithError from "components/componentUtils/inputUtils/TextFieldWithError";
import { Form, Formik } from "formik";
import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import styled from "styled-components";
import { CreateNewTipPostDto } from "./TipPost.dto";
import { createNewTipPost } from "./TipPostSlice";

const GutterGrid = styled(Grid)``;

const RootGrid = styled(Grid)`
  margin-top: 5rem;
`;

const MainContentGrid = styled(Grid)`
  padding: 2rem;
  border: 1px solid rgba(35, 65, 87, 0.2);
  max-width: 800px;
`;

const TipInputGrid = styled(Grid)`
  margin-bottom: 3rem;
`;

const TextFieldItem = styled(Grid)``;

const CommentGrid = styled(Grid)`
  margin-bottom: 2rem;
`;

const initialValues: CreateNewTipPostDto = {
  placeIdFromPlacesAPI: "",
  lowest: undefined,
  typical: undefined,
  highest: undefined,
  comments: "",
};

interface MatchParams {
  placeId: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const TipPostFormNew: React.FC<Props> = ({ match: { params } }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <RootGrid container justify="center">
      <GutterGrid item sm={1} />
      <MainContentGrid item xs={12} sm={10}>
        <Typography variant="h5" gutterBottom>
          New TipPost
        </Typography>
        <Typography style={{ marginBottom: "35px" }} variant="h6">
          The amounts do not have to be exact but please give an approximation
          that can be informative to other people.
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // this value is needed in the backend to establish
            // relationship between tip post and place
            values.placeIdFromPlacesAPI = params.placeId;
            dispatch(createNewTipPost(values, history, params.placeId));
          }}
        >
          {({ values }) => (
            <Form>
              <TipInputGrid item container justify="space-around">
                <TextFieldItem xs={3} item container alignItems="center">
                  <Grid xs={2} item>
                    <MoneyIcon />
                  </Grid>
                  <Grid xs={8} item>
                    <TextFieldWithError
                      name="lowest"
                      size="small"
                      variant="outlined"
                      label="Lowest"
                      type="number"
                    />
                  </Grid>
                </TextFieldItem>
                <TextFieldItem xs={3} item container alignItems="center">
                  <Grid xs={2} item>
                    <MoneyIcon />
                  </Grid>
                  <Grid xs={8} item>
                    <TextFieldWithError
                      name="typical"
                      size="small"
                      variant="outlined"
                      label="Typical"
                      type="number"
                    />
                  </Grid>
                </TextFieldItem>
                <TextFieldItem xs={3} item container alignItems="center">
                  <Grid xs={2} item>
                    <MoneyIcon />
                  </Grid>
                  <Grid xs={8} item>
                    <TextFieldWithError
                      name="highest"
                      size="small"
                      variant="outlined"
                      label="Highest"
                      type="number"
                    />
                  </Grid>
                </TextFieldItem>
              </TipInputGrid>
              <CommentGrid item>
                <CommentTextField
                  name="comments"
                  maxLength={365}
                  helperText={`${values.comments.length}/${365}`}
                  label="Comments (max 365 characters)"
                  variant="outlined"
                />
              </CommentGrid>
              <Button type="submit" variant="outlined" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </MainContentGrid>
      <GutterGrid item sm={1} />
    </RootGrid>
  );
};

export default TipPostFormNew;
