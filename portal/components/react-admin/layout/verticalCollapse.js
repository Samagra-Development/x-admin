import React, { createElement, useEffect, useState } from "react";
import {
  Collapse,
  IconButton,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import VerticalItem from "./verticalItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";
import PieChartIcon from "@material-ui/icons/PieChart";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    "&.open": {
      backgroundColor:
        theme.palette.type === "dark"
          ? "rgba(255,255,255,.015)"
          : "rgba(0,0,0,.05)",
    },
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
}));
const Icon = (props) => {
  if (props.type === "smartphone")
    return <SmartphoneIcon className={props.className} />;
  if (props.type === "school")
    return <SchoolIcon className={props.className} />;
  if (props.type === "person")
    return <PersonIcon className={props.className} />;
  if (props.type === "chart")
    return <PieChartIcon className={props.className} />;
  return <></>;
};

const isUrlInChildren = (parent, url) => {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i += 1) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }

    if (
      parent.children[i].url === url ||
      url.includes(parent.children[i].url)
    ) {
      return true;
    }
  }

  return false;
};

const needsToBeOpened = (location, item) => {
  return location && isUrlInChildren(item, location.pathname);
};

function VerticalCollapse({ activePath, ...props }) {
  const [open, setOpen] = useState(() =>
    needsToBeOpened(window.location, props.item)
  );
  const { item, nestedLevel, publicity } = props;

  const classes = useStyles({
    itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24,
  });

  useEffect(() => {
    if (needsToBeOpened(window.location, item)) {
      setOpen(true);
    }
  }, [item]);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <div
        button
        onClick={handleClick}
        component="li"
        to={`/${item.name}`}
        role="button"
      >
        <Icon className={classes.sidebarIcon} type={item.icon} />

        <span className={classes.listItem}>{item.label}</span>

        <IconButton
          disableRipple
          style={{ color: "white" }}
          className="w-40 h-40 p-0 focus:bg-transparent hover:bg-transparent"
          onClick={(ev) => ev.preventDefault()}
        >
          {createElement(!open ? KeyboardArrowDownIcon : KeyboardArrowUpIcon)}
        </IconButton>
      </div>

      {item.children && (
        <Collapse
          in={open}
          className="collapse-children"
          style={{ marginLeft: "16px" }}
        >
          {item.children.map((i, index) => {
            if (i.children) {
              return (
                <VerticalCollapse
                  key={index}
                  activePath={activePath}
                  item={i}
                  publicity={publicity}
                  nestedLevel={props.nestedLevel + 1}
                  permissions={permissions}
                />
              );
            }
            return (
              <VerticalItem
                activePath={activePath}
                key={index}
                item={i}
                nestedLevel={props.nestedLevel + 1}
              />
            );
          })}
        </Collapse>
      )}
    </>
  );
}

export default VerticalCollapse;
