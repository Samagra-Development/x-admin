import React from "react";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  BooleanField,
  FunctionField,
  Edit,
  SimpleForm,
  NullableBooleanInput,
  Filter,
  SearchInput,
} from "react-admin";

import { Typography, makeStyles, useMediaQuery } from "@material-ui/core";
import EditNoDeleteToolbar from "../components/EditNoDeleteToolbar";
import BackButton from "../components/BackButton";
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
  fullWidthGrid: {
    gridTemplateColumns: "1fr",
  },
  heading: {
    fontSize: "1.4rem",
    lineHeight: "0.5rem",
    fontWeight: 700,
    fontVariant: "all-small-caps",
  },
  select: {
    "& > div > div": {
      fontSize: "1.1rem",
    },
  },
  warning: {
    margin: "0",
    padding: "0",
    paddingBottom: "1rem",
    textAlign: "center",
    width: "100%",
    fontStyle: "oblique",
  },
  grey: {
    color: blueGrey[300],
  },
}));

/**
 * Donate Device Request List
 * @param {*} props
 */
export const RequestDeviceList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title="Demand list"
      className={isSmall ? classes.smList : classes.list}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.district}
          tertiaryText={(record) => record.student_count_no_smartphone}
          linkType="edit"
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField label="Name" source="name" />
          <TextField label="Phone Number" source="phone_number" />
          <FunctionField
            label="District"
            render={(record) => {
              if (record) {
                return record.district
                  ? record.district
                  : record.other_district;
              }
            }}
          />
          <TextField label="Block" source="block" />
          <TextField label="School" source="school_name" />
          <TextField
            label="Students without smartphone"
            source="student_count_no_smartphone"
          />
        </Datagrid>
      )}
    </List>
  );
};

export const RequestDeviceEdit = (props) => {
  const classes = useStyles();
  const Title = ({ record }) => {
    return (
      <span>
        School <span className={classes.grey}>#{record.udise}</span> details
      </span>
    );
  };
  return (
    <div>
      <Edit {...props} title={<Title />}>
        <SimpleForm toolbar={<EditNoDeleteToolbar />}>
          <BackButton history={props.history} />
          <span className={classes.heading}>School Details</span>
          <div className={classes.grid}>
            <td>Name</td>
            <td>Phone Number</td>
            <td>District</td>
            <TextField label="Name" source="name" disabled variant="outlined" />
            <TextField
              label="Phone Number"
              source="phone_number"
              disabled
              variant="outlined"
            />
            <TextField
              label="District"
              source="district"
              disabled
              variant="outlined"
            />
            <td>Block</td>
            <td>Pincode</td>
            <td>School Name</td>
            <TextField
              label="Block"
              source="block"
              disabled
              variant="outlined"
            />
            <TextField
              label="Pincode"
              source="pincode"
              disabled
              variant="outlined"
            />
            <TextField
              label="School Name"
              source="schoolname"
              disabled
              variant="outlined"
            />
          </div>
          <span className={classes.heading}>Demand Overview</span>
          <div className={classes.grid}>
            <td>Total Students</td>
            <td>Students without smartphone</td>
            <td></td>
            <TextField label="Total Students" source="total_students" />
            <TextField
              label="Students without smartphone"
              source="student_count_no_smartphone"
            />
            <TextField label="" source="" />
          </div>
        </SimpleForm>
      </Edit>
    </div>
  );
};
