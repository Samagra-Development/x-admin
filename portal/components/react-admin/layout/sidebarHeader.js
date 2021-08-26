import React, { useEffect, useState } from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebarHeader: {
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
    height: "9vh",
    textAlign: "center",
    boxSizing: "content-box",
    backgroundColor: theme.palette.grey.darker,
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  },
  sidebarHeaderLogo: {
    filter: "grayscale(1) invert(1)",
    [theme.breakpoints.down("sm")]: {
      width: "25%",
      height: "7vh",
    },
    [theme.breakpoints.up("sm")]: {
      width: "20%",
    },
  },
}));

const UserNavbarHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebarHeader}>
      <Image
        className={classes.sidebarHeaderLogo}
        src="/logo-haryana.png"
        alt="logo"
        width={200}
        height={60}
        layout={"intrinsic"}
      />
    </div>
  );
};

export default UserNavbarHeader;
