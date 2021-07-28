import React from "react";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { signOut } from "next-auth/client";

const useStyles = makeStyles((theme) => ({
  logOutButton: {
    color: theme.palette.grey[500],
    padding: "1rem",
    fontSize: "0.8rem",
    textTransform: "capitalize",
  },
  logOutIcon: {
    fontSize: "1rem",
    marginRight: "0.5rem",
    transform: "translateY(-10%)",
  },
}));

const Logout = () => {
  const classes = useStyles();
  return (
    <Button
      className={classes.logOutButton}
      onClick={() => {
        signOut();
      }}
    >
      <PowerSettingsNewIcon className={classes.logOutIcon} />
      <span>Log out</span>
    </Button>
  );
};

export default Logout;
