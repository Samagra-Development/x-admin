import React from "react";
import {
  List,
  Datagrid,
  Pagination,
  FunctionField,
  TopToolbar,
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
    let age = getAge({
      start: record.DOB,
      end: null,
    }).years;

    return {
      "Candidate Name": record.name ? record.name : "NONE",
      "Mobile Number": record.mobile_number ? record.mobile_number : "NONE",
      "Whatsapp Number": record.whatsapp_mobile_number
        ? record.whatsapp_mobile_number
        : "NONE",
      District: record.district_name.name ? record.district_name.name : "NONE",
      Pincode: record.pincode ? record.pincode : "NONE",
      "Max Qualification": record.highest_level_qualification
        .highest_level_qualification_name
        ? record.highest_level_qualification.highest_level_qualification_name
        : "NONE",
      Qualification: record.qualification_detail.qualification_name
        ? record.qualification_detail.qualification_name
        : "NONE",
      Marks: record.final_score_highest_qualification
        ? record.final_score_highest_qualification
        : "NONE",
      "Date of Birth": record.DOB,
      Age: age,
      Gender: record.gender.gender_name,
      "Have you ever been employed": record.ever_employment.employment_status
        ? record.ever_employment.employment_status
        : "NONE",
      "Job Role": record.job_role ? record.job_role : "NONE",
      "Company Name": record.employer_organization_name
        ? record.employer_organization_name
        : "NONE",
      "Total work experience (months)": record.work_experience_details
        ? record.work_experience_details.work_experience_choices
        : "NONE",
      "Monthly salary (Rs.)": record.monthly_salary_details
        ? record.monthly_salary_details.salary_range
        : "NONE",
      "Driving License": record.driver_license.driver_license_choice,
      "Distance willing to travel":
        record.district_travel.district_travel_choice,
      "PAN Card Availability": record.pan_card.pan_card_choice,
      "English speaking competency":
        record.english_knowledge_choice.english_choice,
      "Computer operating competencies":
        record.computer_operator.computer_operator_choices,
      // "Preferred Sectors": `${record.sector_preference_1.sector_preference_name},${record.sector_preference_2.sector_preference_name},${record.sector_preference_3.sector_preference_name}`,
      "Preferred Skill #1": record.skill_1,
      "Preferred Skill #2": record.skill_2,
      "Preferred Skill #3": record.skill_3,
      "Preferred Skill #4": record.skill_4,
      "Expected Salary": record.expected_salary.salary_range,
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
    marginLeft: "1rem",
  },
}));
export const CandidateList = (props) => {
  console.log("Entered Candidate");
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
          <FunctionField label="Name" render={(record) => `${record.name}`} />
          <FunctionField
            label="Age"
            render={(record) => {
              if (record && record.DOB) {
                console.log(record);
                return getAge({
                  start: record.DOB,
                  end: null,
                }).years;
              }
            }}
          />
          <FunctionField
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
          />
        </Datagrid>
      </List>
    </div>
  );
};
