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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    "&.open": {
      backgroundColor:
        theme.palette.type === "dark"
          ? "rgba(255,255,255,.015)"
          : "rgba(0,0,0,.05)",
    },
    item: (props) => ({
      height: 40,
      width: "calc(100% - 16px)",
      borderRadius: "0 20px 20px 0",
      paddingRight: 12,
      flex: 1,
      paddingLeft: props.itemPadding > 60 ? 60 : props.itemPadding,
      color: theme.palette.text.primary,
      "&.active > .list-item-text > span": {
        fontWeight: 600,
      },
      "& .list-item-icon": {
        marginRight: 16,
      },
    }),
  },
}));

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
    <ul className={clsx(classes.root, open && "open")}>
      <ListItem
        button
        disableRipple
        style={{ color: "white", paddingTop: "0px", paddingBottom: "0px" }}
        className={clsx(classes.item, "list-item")}
        onClick={handleClick}
        component="li"
        to={`/${item.name}`}
        role="button"
      >
        {/* {item.icon && createElement(CustomIcons[item.icon])}      */}
        <ListItemText
          style={{ paddingLeft: "16px" }}
          primary={item.name}
          classes={{ primary: "text-14" }}
        />

        <IconButton
          disableRipple
          style={{ color: "white" }}
          className="w-40 h-40 p-0 focus:bg-transparent hover:bg-transparent"
          onClick={(ev) => ev.preventDefault()}
        >
          {createElement(!open ? KeyboardArrowDownIcon : KeyboardArrowUpIcon)}
        </IconButton>
      </ListItem>

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
    </ul>
  );
}

export default VerticalCollapse;
