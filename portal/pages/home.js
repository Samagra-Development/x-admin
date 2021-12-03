import dynamic from "next/dynamic";
import { useSession } from "next-auth/client";
import Login from "./login";
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  Admin,
  Resource,
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import {
  MuiThemeProvider,
  createMuiTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import customTheme from "../components/react-admin/theme";
import customLayout from "../components/react-admin/layout/";
import blueGrey from "@material-ui/core/colors/blueGrey";

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

const Home = () => {
  const [session, loading] = useSession();
  if (loading) return null;

  if ((!loading && !session) || session?.jwt == undefined) {
    // signIn("fusionauth")
    return <Login />;
  }
  if (session) {
    return (
      <MuiThemeProvider theme={createMuiTheme(customTheme)}>
        <Admin
          disableTelemetry
          loginPage={false}
          layout={customLayout}
          dataProvider={jsonServerProvider(
            "https://jsonplaceholder.typicode.com"
          )}
        >
          <Resource key={"users"} name="users" label="users" list={UserList} />
        </Admin>
      </MuiThemeProvider>
    );
  }
};

/**
 * Donate Device Request List
 * @param {*} props
 */
export const UserList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title="User List"
      className={isSmall ? classes.smList : classes.list}
      sort={{ field: "id", order: "DESC" }}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.id}
          secondaryText={(record) => record.username}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="username" />
          <TextField source="phone" />
          <TextField source="email" />
          <TextField source="website" />
        </Datagrid>
      )}
    </List>
  );
};

export default Home;
