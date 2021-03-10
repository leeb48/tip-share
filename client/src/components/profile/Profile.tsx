import Box from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ProfileAccountPage from "./ProfileAccount";
import ProfileAccountEdit from "./ProfileAccountEdit";
import ProfileMyShares from "./ProfileMyShares";
import ProfileSavedPlaces from "./ProfileSavedPlaces";

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
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="h4" variant="h4">
        Hello, User
      </Typography>
      {/* Tab Component */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        indicatorColor="primary"
        centered
      >
        <Tab label="Account" {...a11yProps(0)} />
        <Tab label="My Shares" {...a11yProps(1)} />
        <Tab label="Saved Places" {...a11yProps(2)} />
        <Tab
          style={{ display: "none" }}
          label="Edit Account"
          {...a11yProps(3)}
        />
      </Tabs>
      {/* Tab List */}
      <TabPanel value={value} index={0}>
        <ProfileAccountPage handleChange={handleChange} tabChangeIdx={3} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileMyShares />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileSavedPlaces />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProfileAccountEdit />
      </TabPanel>
    </div>
  );
}
