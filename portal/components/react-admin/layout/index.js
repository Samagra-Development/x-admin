import React from "react";
import { connect, useDispatch } from "react-redux";
import {
  getResources,
  Notification,
  setSidebarVisibility,
  Sidebar,
} from "react-admin";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import CustomSidebar from "./customSidebar";
import AppBar from "./customAppBar";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
    display: "grid",
    gridTemplateRows: "8vh auto",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "18vw auto",
    },
  },
  sidebar: {
    gridColumn: "1 / 2", //Start End
    gridRow: "1 / 3",
    inset: "unset!important",
    "& > div": {
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "8vh auto",
      [theme.breakpoints.down("sm")]: {
        width: "70vw",
      },
      [theme.breakpoints.up("sm")]: {
        width: "18vw",
      },
      backgroundColor: theme.palette.grey.main,
    },
  },
  container: {
    display: "grid",
    gridTemplateRows: "9vh auto",
    gridTemplateColumns: "auto",
    "& > header": {
      position: "inherit",
    },
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1 / 3",
    },
    [theme.breakpoints.up("sm")]: {
      gridColumn: "2 / 3",
    },
    gridRow: "1 / 3",
  },
}));

const CustomLayout = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { children, logout, open, title } = props;
  return (
    <main className={classes.wrapper}>
      <Sidebar id="sidebar" className={classes.sidebar}>
        <CustomSidebar resources={props.resources} />
      </Sidebar>
      <div
        onClick={() => {
          if (props.sidebarOpen) {
            dispatch(setSidebarVisibility(false));
          }
        }}
        className={classes.container}
      >
        <AppBar title={title} open={open} logout={logout} />
        <div>{children}</div>
      </div>
      <Notification />
    </main>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.admin.loading > 0,
  resources: getResources(state),
  sidebarOpen: state.admin.ui.sidebarOpen,
});
export default connect(mapStateToProps, { setSidebarVisibility })(CustomLayout);
