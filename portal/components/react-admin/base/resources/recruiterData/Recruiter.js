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
  ExportButton,
  downloadCSV,
  ReferenceInput,
  SelectInput,
  ListActions,
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  return (
    <Filter {...props}>
      <ReferenceInput
        label="Company Name"
        source="company_name"
        reference="employer_details"
      >
        <SelectInput optionText="company_name" optionValue="company_name" />
      </ReferenceInput>
      <ReferenceInput
        label="Mobile Number"
        source="mobile_number"
        reference="employer_details"
        allowEmpty
      >
        <SelectInput optionText="mobile_number" optionValue="mobile_number" />
      </ReferenceInput>

      <ReferenceInput
        label="District Name"
        source="district_name.name"
        reference="employer_details"
      >
        <SelectInput
          optionText="district_name.name"
          optionValue="district_name.name"
        />
      </ReferenceInput>
      <ReferenceInput
        label="pincode"
        source="pincode"
        reference="employer_details"
      >
        <SelectInput optionText="pincode" optionValue="pincode" />
      </ReferenceInput>
      <ReferenceInput label="CRN" source="CRN" reference="employer_details">
        <SelectInput optionText="CRN" optionValue="CRN" />
      </ReferenceInput>

      <ReferenceInput label="GSTN" source="GSTN" reference="employer_details">
        <SelectInput optionText="GSTN" optionValue="GSTN" />
      </ReferenceInput>
    </Filter>
  );
};
const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    let age = getAge({
      start: record.DOB,
      end: null,
    }).years;
    console.log(records);
    return {
      "Mobile Number": record.mobile_number,
      "Company Name": record.company_name,
      "District Name": record.district_name?.name,
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
function getAge({ start, end }) {
  var today = end ? new Date(end) : new Date();
  var birthDate = new Date(start);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  let roundedDownAge = age;
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    roundedDownAge--;
  }
  if (today < birthDate) {
    return { years: "Invalid Date", months: "Invalid Date" };
  }
  return { years: roundedDownAge, months: age * 12 + m };
}
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
        title={"Recruiter Data"}
        actions={<ListActions />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        exporter={exporter}
      >
        <Datagrid>
          <TextField label="Company Name" source="company_name" />

          <TextField label="Mobile Number" source="mobile_number" />

          <FunctionField
            label="District Name"
            render={(record) => {
              return record?.district_name?.name;
            }}
          />

          <TextField label="pincode" source="pincode" />

          <TextField label="CRN" source="CRN" />

          <TextField label="GSTN" source="GSTN" />
        </Datagrid>
      </List>
    </div>
  );
};
