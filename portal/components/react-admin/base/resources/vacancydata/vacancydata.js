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
    let age = getAge({
      start: record.DOB,
      end: null,
    }).years;
    console.log(records);

    return {
      "Name of company": record.employer_detail
        ? record.employer_detail.company_name
        : "NULL",
      GSTN: record.GSTN ? record.GSTN : "NULL",
      "Mobile Number": record.employer_mobile_number
        ? record.employer_mobile_number
        : "NULL",
      pincode: record.employer_detail ? record.employer_detail.pincode : "NULL",
      "Vacancy ID": record.vacancy_id ? id : "NULL",

      "Sector of job": record.sector_preference
        ? record.sector_preference.sector_preference_name
        : "NULL",
      job_role: record.employer_detail
        ? record.employer_detail.job_role
        : "NULL",
      expected_salary: record.expected_salary
        ? record.expected_salary.salary_range
        : "NULL",
      "Number of candidates to recruit": record.number_of_candidates_required
        ? record.number_of_candidates_required
        : "NULL",
      "Minimum qualification requirement": record.highest_level_qualification
        ? record.highest_level_qualification.highest_level_qualification_name
        : "NULL",
      "Are vacancies open for freshers?": record.freshers_open_choice
        ? record.freshers_open_choice
        : "NULL",
      "Minimum work experience required": record.min_work_experience_requirement
        ? record.min_work_experience_requirement.work_experience_choices
        : "NULL",
      "Requirement of driving license": record.driver_license
        ? record.driver_license.driver_license_choice
        : "NULL",

      "English speaking skills": record.englishSpeakingRequiredByFreshersOpenChoice
        ? record.englishSpeakingRequiredByFreshersOpenChoice
          .english_speaking_required_choices
        : "NULL",
      "Computer operating skills": record.englishSpeakingRequiredByIsComputerKnowledgeRequiredChoices
        ? record.englishSpeakingRequiredByIsComputerKnowledgeRequiredChoices
          .english_speaking_required_choices
        : "NULL",
      "Age criteria": record.age_criteria_choice
        ? record.age_criteria_choice.age_range_values
        : "NULL",

      "Gender criteria": record.gender ? record.gender.gender_name : "NULL",
      "Expected interview date": record.interview_date
        ? record.interview_date
        : "NULL",
      CRN: record.employer_detail ? record.employer_detail.CRN : "NULL",
      GSTN: record.employer_detail ? record.employer_detail.GSTN : "NULL",
    };
  });
  jsonExport(recordsForExport, (err, csv) => {
    downloadCSV(
      csv,
      `vacancyData_${new Date(Date.now()).toLocaleDateString()}`
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
export const VacancyData = (props) => {
  console.log("Entered Vacancy");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Vacancy Data"}
        actions={<CandidateActions />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        exporter={exporter}
      >
        <Datagrid rowClick="show">
          <TextField
            label="Name of company"
            source="employer_detail.company_name"
          />
          <TextField label="GSTN" source="employer_detail.GSTN" />
          <TextField label="Mobile Number" source="employer_mobile_number" />
          <TextField label="pincode" source="employer_detail.pincode" />
          <TextField label="Vacancy ID" source="id" />
          <TextField
            label="Sector of job"
            source="sector_preference.sector_preference_name"
          />
          <TextField label="job_role" source="job_role" />
          <TextField
            label="expected_salary"
            source="expected_salary.salary_range"
          />
          <TextField
            label="Number of candidates to recruit"
            source="number_of_candidates_required"
          />
          <TextField
            label="Minimum qualification requirement"
            source="highest_level_qualification.highest_level_qualification_name"
          />

          <FunctionField
            label="Are vacancies open for freshers?"
            render={(record) => {
              if (record.freshers_open_choice === 1) {
                return "YES";
              } else {
                return "NO";
              }
            }}
          />
          <TextField
            label="Minimum work experience required"
            source="min_work_experience_requirement.work_experience_choices"
          />
          <TextField
            label="Requirement of driving license"
            source="driver_license.driver_license_choice"
          />
          <TextField
            label="English speaking skills"
            source="englishSpeakingRequiredByFreshersOpenChoice.english_speaking_required_choices"
          />
          <TextField
            label="Computer operating skills"
            source="englishSpeakingRequiredByIsComputerKnowledgeRequiredChoices.english_speaking_required_choices"
          />
          <TextField
            label="Age criteria"
            source="age_criteria_choice.age_range_values"
          />
          <TextField label="Gender criteria" source="gender.gender_name" />
          <TextField label="Expected interview date" source="interview_date" />
          <TextField label="CRN" source="employer_detail.CRN" />
          <TextField label="GSTN" source="employer_detail.GSTN" />
        </Datagrid>
      </List>
    </div>
  );
};
