import { Button, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LoginIcon from "@material-ui/icons/LockOpen";
import MoreIcon from "@material-ui/icons/MoreVert";
import RegisterIcon from "@material-ui/icons/PersonAdd";
import { useAppDispatch } from "app/store";
import { changeProfileTabIdx } from "components/profile/profileSlice";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "block",
      minWidth: "110px",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    titleBtn: {
      paddingLeft: 0,
    },

    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "auto",
      },
    },

    searchMobile: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "auto",
      },
    },

    searchBtnMobile: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },

    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    searchBarDesktop: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    searchBarMobile: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  })
);

const Navbar = () => {
  const dispatch = useAppDispatch();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // The index value corresponds to the tab index in the profile page
  const handleMenuClose = (profileTabIdx?: number) => {
    setAnchorEl(null);

    if (profileTabIdx !== undefined) {
      dispatch(changeProfileTabIdx(profileTabIdx));
    }
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={() => handleMenuClose()}
    >
      <MenuItem
        onClick={() => handleMenuClose(0)}
        component={Link}
        to="/profile"
      >
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose(0)} component={Link} to="/admin">
        Admin
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuClose(1)}
        component={Link}
        to="/profile"
      >
        My Shares
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuClose(2)}
        component={Link}
        to="/profile"
      >
        Saved Places
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose()}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <RegisterIcon />
        </IconButton>
        <p>Register</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <IconButton className={classes.titleBtn} color="inherit">
              TipShare
            </IconButton>
          </Typography>

          <div className={classes.grow} />

          <div className={classes.searchBarDesktop}>
            <div className={classes.search}>
              <InputBase
                placeholder="Restaurant Name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.search}>
              <InputBase
                placeholder="Address"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Button variant="contained">Search</Button>
          </div>

          <div className={classes.searchBarMobile}>
            <Grid container justify="center">
              <div className={classes.searchMobile}>
                <InputBase
                  placeholder="Restaurant Name"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.searchMobile}>
                <InputBase
                  placeholder="Address"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <Button className={classes.searchBtnMobile} variant="contained">
                Search
              </Button>
            </Grid>
          </div>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <Button color="inherit">Register</Button>
            <Button color="inherit">Login</Button>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Navbar;
