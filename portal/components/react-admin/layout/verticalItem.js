import React, { createElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  sidebarItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: "16px 0px 16px 16px",
  },
  "&:focus, &:active": {
    backgroundColor: "inherit",
  },
  selected: {
    backgroundColor: theme.palette.grey.hover,
  },
  listItem: {
    fontSize: "1.2rem",
    lineHeight: "1em",
    textAlign: "center",
    fontVariant: "all-small-caps",
    marginLeft: "1rem",
    fontWeight: "700",
    color: theme.palette.grey.light,
  },
  sidebarIcon: {
    color: "#626D74",
    fontSize: "1.2rem",
  },
}));

const Icon = (props) => {
  if (props.type === "smartphone")
    return <SmartphoneIcon className={props.className} />;
  if (props.type === "school")
    return <SchoolIcon className={props.className} />;
  if (props.type === "person")
    return <PersonIcon className={props.className} />;
  return <></>;
};

const VerticalItem = (props) => {
  const { item, nestedLevel, activePath } = props;
  const classes = useStyles({
    itemPadding: nestedLevel > 0 ? 30 + nestedLevel * 16 : 24,
  });
  const { onMenuClick } = props;

  let sidebarItemName = item.label;
  if (item.options !== undefined && item.options.label !== undefined) {
    sidebarItemName = item.options.label;
  }
  return (
    <Link
      to={`/${item.name}`}
      className={`${classes.sidebarItem} ${
        activePath?.split("/")?.includes(item.name) ? classes.selected : ""
      }`}
    >
      <Icon className={classes.sidebarIcon} type={item.icon} />
      <span className={classes.listItem}>{sidebarItemName}</span>
    </Link>
  );
};

export default VerticalItem;
