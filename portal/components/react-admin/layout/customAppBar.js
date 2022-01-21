// in src/MyAppBar.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarVisibility } from "react-admin";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserMenu from "./customUserMenu";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useSession, signOut } from "next-auth/client";
import {
  getOrCreateFingerprint,
  verifyFingerprint,
  deleteFingerprint,
} from "../../../utils/tokenManager";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontWeight: 500,
  },
  appBarStyle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.heading.main,
  },
  menuButton: {
    [theme.breakpoints.down("sm")]: {
      width: "1.5rem",
      marginRight: "1rem",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: theme.palette.heading.main,
  },
  userMenuButton: {
    position: "fixed",
    right: "1rem",
  },
}));

const AppBarCustom = (props) => {
  const [session, loading] = useSession();
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const toggleSidebarOpen = () => {
    if (open) dispatch(setSidebarVisibility(false));
    else dispatch(setSidebarVisibility(true));
  };

  useEffect(() => {
    verifyFingerprint(session, signOut);
  });

  return (
    <>
      <AppBar id="toolbar" className={classes.appBarStyle} color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => {
              toggleSidebarOpen();
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            id="react-admin-title"
            className={classes.title}
          ></Typography>
          <UserMenu className={classes.userMenuButton} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default React.memo(AppBarCustom);
