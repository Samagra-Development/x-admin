import * as React from "react";
import { Typography, useMediaQuery, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Popover from "@material-ui/core/Popover";
import { useSession } from "next-auth/client";
import CustomLogoutButton from "./logoutButton";

const UserMenu = ({ logout }) => {
  const [session, loading] = useSession();
  if (session) {
    return <UserMenuComponent user={session} logout={logout} />;
  }
  return <></>;
};

const useStyles = makeStyles((theme) => ({
  userFullName: {
    fontSize: "0.8rem",
    color: theme.palette.heading.light,
    marginLeft: "1rem",
  },
  downArrow: {
    marginLeft: "0.5rem",
    fontSize: "1.2rem",
    transform: "translateY(-10%)",
    fontWeight: "400",
  },
}));

const UserMenuComponent = ({ user, logout }) => {
  const [userMenu, setUserMenu] = React.useState(null);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };
  return (
    <div>
      <Button className="h-64" onClick={userMenuClick}>
        <Avatar
          alt="user photo"
          src={`${process.env.NEXT_PUBLIC_URL}/default.png`}
        />
        {isSmall ? (
          <></>
        ) : (
          <>
            <Typography component="span" className={classes.userFullName}>
              {user.fullName}
            </Typography>
            <KeyboardArrowDownIcon className={classes.downArrow} />
          </>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        onClose={userMenuClose}
        anchorEl={userMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{
          paper: "py-2",
        }}
      >
        <CustomLogoutButton />
      </Popover>
    </div>
  );
};

export default UserMenu;
