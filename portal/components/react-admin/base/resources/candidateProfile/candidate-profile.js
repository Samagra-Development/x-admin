import React from "react";
import {
  List,
  Datagrid,
  Pagination,
  FunctionField,
  TopToolbar,
  sanitizeListRestProps,
  Filter,
  ExportButton,
  downloadCSV,
  ListActions,
  TextField,
  SearchInput,
  TextInput,
  DateInput
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  return (
    <Filter {...props}>
       <SearchInput
        placeholder="Name"
        source="name"
        alwaysOn
      />
      <DateInput label="DOB" source="DOB" />
      <TextInput label="Whatsapp"
        source="whatsapp_mobile_number"/>
      <TextInput label="PinCode"
        source="pincode"/>
    </Filter>
  );
};

const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    let age = getAge({
      start: record.DOB,
      end: null,
    }).years;

    return {
      "Candidate Name": record.name ? record.name : "",
      "Mobile Number": record.mobile_number ? record.mobile_number : "",
      "Whatsapp Number": record.whatsapp_mobile_number
        ? record.whatsapp_mobile_number
        : "",
      District: record.district_name?.name,
      Pincode: record.pincode ? record.pincode : "",
      "Max Qualification":
        record.highest_level_qualification?.highest_level_qualification_name,
      Qualification: record.qualification_detail?.qualification_name,
      Marks: record.final_score_highest_qualification
        ? record.final_score_highest_qualification
        : "",
      "Date of Birth": record.DOB,
      Age: age,
      Gender: record.gender?.gender_name,
      "Have you ever been employed": record.ever_employment?.employment_status,
      "Job Role": record.job_role ? record.job_role : "",
      "Company Name": record.employer_organization_name,
      "Total work experience (months)":
        record.work_experience_details?.work_experience_choices,
      "Monthly salary (Rs.)": record.monthly_salary_details?.salary_range,
      "Driving License": record.driver_license?.driver_license_choice,
      "Distance willing to travel":
        record.district_travel?.district_travel_choice,
      "PAN Card Availability": record.pan_card?.pan_card_choice,
      "English speaking competency":
        record.english_knowledge_choice?.english_choice,
      "Computer operating competencies":
        record.computer_operator?.computer_operator_choices,
      "Preferred Skill #1": record.skill_1,
      "Preferred Skill #2": record.skill_2,
      "Preferred Skill #3": record.skill_3,
      "Preferred Skill #4": record.skill_4,
      "Expected Salary": record.expected_salary?.salary_range,
      "Resume (URL)": "",
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
    marginLeft: "1rem"
  },
  tablecss:{
    marginRight: "1rem"
  }
}));
export const CandidateList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Candidate Data"}
        actions={<ListActions />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        exporter={exporter}
      >
        <div className={classes.tablecss}>
        <Datagrid rowClick="show">
          <TextField label="Name" source="name"/>
          <FunctionField
            label="Age"
            render={(record) => {
              if (record && record.DOB) {
                return getAge({
                  start: record.DOB,
                  end: null,
                }).years;
              }
            }}
          />
          <TextField label="DOB" source="DOB"/>
          <FunctionField
            label="Gender"
            render={(record) => {
                return record?.gender?.gender_name;
            }}
          />
          <TextField
            label="Whatsapp"
            source="whatsapp_mobile_number"
          />
          <FunctionField
            label="District"
            render={(record) => {
                return record?.district_name?.name;
            }}
          />
          <TextField
            label="PinCode"
            source="pincode"
            />
          <FunctionField
            label="Max Qualification"
            render={(record) => {
                return record?.highest_level_qualification?.highest_level_qualification_name;
            }}
          />
          <FunctionField
            label="Qualification"
            render={(record) => {
                return record?.qualification_detail?.qualification_name;
            }}
          />
        </Datagrid>
        </div>
      </List>
    </div>
  );
};
