import React, { useEffect } from "react";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Filter,
  SearchInput,
} from "react-admin";

import { Typography, makeStyles, useMediaQuery } from "@material-ui/core";
import EditNoDeleteToolbar from "../components/EditNoDeleteToolbar";
import BackButton from "../components/BackButton";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { useSession, signOut } from "next-auth/client";
import {
  getOrCreateFingerprint,
  verifyFingerprint,
  deleteFingerprint,
} from "../../../../utils/tokenManager";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    "& > div": {
      fontSize: "1rem",
    },
  },
  smSearchBar: {
    "& > div": {
      fontSize: "1.2rem",
    },
  },
  smList: {
    margin: "1rem 4rem",
    "& > div": {
      paddingLeft: 0,
      backgroundColor: "unset",
      "&:first-child > div": {
        backgroundColor: "unset",
      },
      "&:last-child > div": {
        backgroundColor: "#FFF",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      },
    },
  },
  list: {
    margin: "0rem 2rem",
  },
  filter: {
    paddingLeft: 0,
  },
  grid: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridRowGap: "1ch",
    gridColumnGap: "1ch",
    margin: "1rem 0",
    "& > td": theme.overrides.MuiTableCell.head,
    "& > span": {
      fontSize: "1.1rem",
    },
  },
  heading: {
    fontSize: "1.4rem",
    lineHeight: "0.5rem",
    fontWeight: 700,
    fontVariant: "all-small-caps",
  },
  grey: {
    color: blueGrey[300],
  },
}));

const UserSamikshaFilter = (props) => {
  const classes = useStyles();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Filter {...props} className={classes.filter}>
      <SearchInput
        placeholder="Full Name"
        source="fullName"
        className={isSmall ? classes.smSearchBar : classes.searchBar}
        alwaysOn
      />
    </Filter>
  );
};

/**
 * Donate Device Request List
 * @param {*} props
 */
export const UserSamikshaList = (props) => {
  const [session] = useSession();
  useEffect(() => {
    verifyFingerprint(session, signOut);
  });
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title="Samiksha User List"
      className={isSmall ? classes.smList : classes.list}
      sort={{ field: "id", order: "DESC" }}
      filters={<UserSamikshaFilter />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.district}
          tertiaryText={(record) => record.device_tracking_key}
          linkType="edit"
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField label="id" source="id" />
          <TextField label="Full Name" source="name" />
          <TextField label="Grade" source="grade" />
          <TextField label="Father's Name" source="fatherName" />
        </Datagrid>
      )}
    </List>
  );
};

export const UserSamikshaEdit = (props) => {
  const classes = useStyles();
  const [session] = useSession();

  useEffect(() => {
    verifyFingerprint(session, signOut);
  });

  const Title = ({ record }) => {
    return (
      <span>
        Edit {"User"}
        {/* <span className={classes.grey}>#{record.id}</span> */}
      </span>
    );
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const transform = (data) => ({
    ...data,
    fullName: escapeHtml(data.fullName),
    username: escapeHtml(data.username),
    email: escapeHtml(data.email),
    mobilePhone: escapeHtml(data.mobilePhone),
  });

  return (
    <div>
      <Edit
        mutationMode={"pessimistic"}
        title={<Title />}
        transform={transform}
        {...props}
      >
        <SimpleForm toolbar={<EditNoDeleteToolbar />}>
          <BackButton history={props.history} />
          <span className={classes.heading}>User Details</span>
          <div className={classes.grid}>
            <TextInput label="Full Name" source="fullName" variant="outlined" />
            <TextInput label="Username" source="username" variant="outlined" />
            <TextInput label="Email" source="email" variant="outlined" />
            <TextInput
              label="Mobile Phone"
              source="mobilePhone"
              variant="outlined"
            />
          </div>
        </SimpleForm>
      </Edit>
    </div>
  );
};
