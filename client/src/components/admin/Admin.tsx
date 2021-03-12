import Box from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { RootState } from "app/rootReducer";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import AdminManagePosts from "./AdminManagePosts";
import AdminManageUsers from "./AdminManageUsers";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "900px",
    margin: "0 auto",
    marginTop: theme.spacing(8),
  },

  title: {
    padding: theme.spacing(2),
  },

  tabs: {
    marginBottom: "2rem",
  },
}));

const Admin = () => {
  // Use this index value to navigate to certain tab from other pages
  const { profileTabIdx } = useSelector((state: RootState) => {
    return {
      profileTabIdx: state.profile.profileTabIdx,
    };
  }, shallowEqual);

  const classes = useStyles();
  const [value, setValue] = React.useState(profileTabIdx);

  useEffect(() => {
    setValue(profileTabIdx);
  }, [profileTabIdx]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="h4" variant="h4">
        Admin
      </Typography>
      {/* Tab Component */}
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        indicatorColor="primary"
      >
        <Tab label="Manage Users" {...a11yProps(0)} />
        <Tab label="Manage Posts" {...a11yProps(1)} />
      </Tabs>
      {/* Tab List */}
      <TabPanel value={value} index={0}>
        <AdminManageUsers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminManagePosts />
      </TabPanel>
    </div>
  );
};

export default Admin;
