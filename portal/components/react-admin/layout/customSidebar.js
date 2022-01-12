import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader } from "@material-ui/core";
import clsx from "clsx";
import UserSidebarHeader from "./sidebarHeader";
import VerticalCollapse from "./verticalCollapse";
import VerticalItem from "./verticalItem";
import { resourceConfig } from "./config";

const useStyles = makeStyles((theme) => ({
  listTitle: {
    fontSize: "0.9rem",
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "700",
    color: theme.palette.grey[500],
  },
  sidebarHeader: {
    backgroundColor: theme.palette.grey[700],
    "& > div": {
      marginTop: "1ch;",
    },
  },
  sidebarList: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
}));

const CustomSidebar = (props) => {
  const [activePath, setActivePath] = useState(null);
  const { location, resources } = props;

  let filteredResources = resourceConfig;
  if (props.resources) {
    filteredResources = resourceConfig?.filter(
      (configResource) =>
        (resources?.some(
          (resource) => resource?.name === configResource?.name
        ) &&
          configResource.label) ||
        configResource.title
    );
  }
  useEffect(() => {
    const pathname = location.pathname.replace(/\//, "");
    if (activePath !== pathname) {
      setActivePath(pathname);
    }
  }, [location, activePath]);

  return (
    <SidebarWrapper
      activePath={activePath}
      filteredResources={filteredResources}
    />
  );
};

const SidebarWrapper = React.memo(function SidebarWrapper({
  activePath,
  filteredResources,
}) {
  const classes = useStyles();
  return (
    <>
      <UserSidebarHeader className={classes.sidebarHeader} />
      <div className={classes.sidebarList}>
        {filteredResources.map((item, index) => {
          if (item.title)
            return (
              <ListSubheader key={index}>
                <span className={classes.listTitle}>{item.label}</span>
              </ListSubheader>
            );
          if (item.children) {
            return (
              <VerticalCollapse
                key={index}
                activePath={activePath}
                item={item}
                nestedLevel={0}
              />
            );
          }
          return (
            <VerticalItem
              activePath={activePath}
              key={index}
              item={item}
              nestedLevel={0}
            />
          );
        })}
      </div>
    </>
  );
});

export default withRouter((props) => <CustomSidebar {...props} />);
