import React from "react";
import {
  List,
  Datagrid,
  Pagination,
  FunctionField,
  TopToolbar,
  TextField,
  sanitizeListRestProps,
  Filter,
  SearchInput,
  ExportButton,
  downloadCSV,
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  console.log("Props:", props);
  return (
    <Filter {...props}>
      <SearchInput
        placeholder="Search by Name *"
        source="name"
        className="searchBar"
        alwaysOn
      />
    </Filter>
  );
};
const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    return {
      "Mobile Number": record.mobile_number,
      "Company Name": record.company_name,
      "District Name": record.district_name.name,
      pincode: record.pincode,
      CRN: record.CRN,
      GSTN: record.GSTN,
    };
  });
  jsonExport(recordsForExport, (err, csv) => {
    downloadCSV(
      csv,
      `recruiterData_${new Date(Date.now()).toLocaleDateString()}`
    );
  });
};

const CandidateActions = (props) => (
  <TopToolbar {...sanitizeListRestProps(props)}>
    <ExportButton exporter={exporter} maxResults={100000} />
  </TopToolbar>
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100% - 0px)",
    height: "86vh",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    overflowY: "scroll",
    marginLeft: "1rem",
  },
}));
export const RecruiterData = (props) => {
  console.log("Entered Recruiter");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Recruiter"}
        actions={<CandidateActions />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        exporter={exporter}
      >
        <Datagrid>
          <TextField label="Company Name" source="company_name" />
          <TextField label="Mobile Number" source="mobile_number" />
          <TextField label="District Name" source="district_name.name" />
          <TextField label="pincode" source="pincode" />
          <TextField label="CRN" source="CRN" />
          <TextField label="GSTN" source="GSTN" />
        </Datagrid>
      </List>
    </div>
  );
};
