import {
  Datagrid,
  ExportButton,
  Filter,
  FunctionField,
  List,
  Pagination,
  SearchInput,
  TextField,
  TextInput,
  TopToolbar,
  downloadCSV,
  sanitizeListRestProps,
  useListContext,
} from "react-admin";
import { Typography, makeStyles } from "@material-ui/core";

import React from "react";
import { cloneElement } from "react";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  return (
    <Filter {...props}>
      <SearchInput placeholder="Company Name" source="company_name" alwaysOn />
      <TextInput label="District" source="district_name#name@_ilike" />
      <TextInput label="Mobile Number" source="mobile_number" />
      <TextInput label="pincode" source="pincode" />
      <TextInput label="CRN" source="CRN" />
      <TextInput label="GSTN" source="GSTN" />
    </Filter>
  );
};
const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    return {
      "Mobile Number": record.mobile_number,
      "Company Name": record.company_name,
      "District Name": record.district_name?.name,
      Pincode: record.pincode,
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

const ListActions = (props) => {
  const { className, maxResults, filters, ...rest } = props;
  const { total } = useListContext();

  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {cloneElement(filters, { context: "button" })}
      <ExportButton exporter={exporter} maxResults={maxResults} />
    </TopToolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100% - 0px)",
    height: "86vh",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    overflowY: "scroll",
    marginLeft: "1rem",
  },
  tablecss: {
    marginRight: "1rem",
  },
  headerCell: {
    color: "black",
  },
}));
export const RecruiterData = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Recruiter Data"}
        actions={<ListActions maxResults={100000} />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={
          <Pagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            perPage={1}
            style={{ float: "left" }}
          />
        }
      >
        <div className={classes.tablecss}>
          <Datagrid classes={classes}>
            <TextField label="Company Name" source="company_name" />

            <TextField label="Mobile Number" source="mobile_number" />

            <FunctionField
              label="District Name"
              render={(record) => {
                return record?.district_name?.name;
              }}
            />

            <TextField label="pincode" source="pincode" />

            <TextField label="GSTN" source="GSTN" />
          </Datagrid>
        </div>
      </List>
    </div>
  );
};
