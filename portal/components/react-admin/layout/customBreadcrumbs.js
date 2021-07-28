import React from "react";
import config from "./config";

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

const Breadcrumbs = ({ location, source, record }) => {
  const { resource = null, id = null } = location ?? {};
  const labels = [];
  labels.push(getResourceName(resource));
  if (!id) labels.push("List");
  else labels.push(record[source]);

  return (
    <span>
      {labels.map((label, index) => {
        return (
          <>
            <span>{label}</span>
            {index === labels.length ? <span>/</span> : null}
          </>
        );
      })}
    </span>
  );
};

export default Logout;
