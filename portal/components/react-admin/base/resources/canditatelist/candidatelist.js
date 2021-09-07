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
    let age =  getAge({
      start: record.DOB,
      end: null,
    }).years;
    console.log(records)
    
    return {
      
      
    };
  });
  jsonExport(recordsForExport, (err, csv) => {
    downloadCSV(
      csv,
      `candidateData_${new Date(Date.now()).toLocaleDateString()}`
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
export const InterestedCandidateist = (props) => {
  console.log("Entered Recruiter");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Candidates"}
        actions={<CandidateActions />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        exporter={exporter}
      >
        <Datagrid rowClick="show">
       
           
           
            <TextField label='Vacancy ID' source='vacancy_id' />
            <TextField label='Name of company' source='vacancy_detail.employer_detail.company_name' />
            <TextField label='Vacancy Sector' source='company_name' />
            <TextField label='Name of candidate' source='district_id' />
            <TextField label='Interested' source='interested' />

          {/* <FunctionField label="Name" render={(record) => `${record.name}`} />
          <FunctionField
            label="Age"
            render={(record) => {
              if (record && record) {
                console.log(record);
                return getAge({
                  start: record,
                  end: null,
                }).years;
              }
            }}
          /> */}
          {/* <FunctionField
            label="Gender"
            render={(record) => {
              if (record && record.gender) {
                return record.gender.gender_name;
              }
            }}
          />
          <FunctionField
            label="Whatsapp"
            render={(record) => `${record.whatsapp_mobile_number}`}
          />
          <FunctionField
            label="District"
            render={(record) => {
              if (record && record.district_name) {
                return record.district_name.name;
              }
            }}
          />
          <FunctionField
            label="PinCode"
            render={(record) => `${record.pincode}`}
          />
          <FunctionField
            label="Max Qualification"
            render={(record) => {
              if (record && record.highest_level_qualification) {
                return record.highest_level_qualification
                  .highest_level_qualification_name;
              }
            }}
          />
          <FunctionField
            label="Qualification"
            render={(record) => {
              if (record && record.qualification_detail) {
                return record.qualification_detail.qualification_name;
              }
            }}
          />
          <FunctionField
            label="Marks"
            render={(record) => `${record.final_score_highest_qualification}`}
          /> */}
        </Datagrid>
      </List>
    </div>
  );
};
