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
  ListActions,
  SearchInput,
  TextInput,
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  return (
    <Filter {...props}>
      <SearchInput placeholder="Vacancy ID" source="id" alwaysOn />

      <TextInput label="job_role" source="job_role" />
    </Filter>
  );
};
const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    return {
      "Name of company": record.employer_detail?.company_name,
      "Mobile Number": record.employer_mobile_number
        ? record.employer_mobile_number
        : "",
      pincode: record.employer_detail?.pincode,
      "Vacancy ID": record.id,

      "Sector of job": record.sector_preference?.sector_preference_name,
      job_role: record.employer_detail?.job_role,
      expected_salary: record.expected_salary?.salary_range,
      "Number of candidates to recruit": record.number_of_candidates_required
        ? record.number_of_candidates_required
        : "",
      "Minimum qualification requirement":
        record.highest_level_qualification?.highest_level_qualification_name,
      "Are vacancies open for freshers?": record.freshers_open_choice
        ? record.freshers_open_choice
        : "",
      "Minimum work experience required":
        record.min_work_experience_requirement?.work_experience_choices,
      "Requirement of driving license":
        record.driver_license?.driver_license_choice,
      "English speaking skills":
        record.englishSpeakingRequiredByFreshersOpenChoice
          ?.english_speaking_required_choices,
      "Computer operating skills":
        record.englishSpeakingRequiredByIsComputerKnowledgeRequiredChoices
          ?.english_speaking_required_choices,
      "Age criteria": record.age_criteria_choice?.age_range_values,

      "Gender criteria": record.gender?.gender_name,
      "Expected interview date": record.interview_date
        ? record.interview_date
        : "",
      CRN: record.employer_detail?.CRN,
      GSTN: record.employer_detail?.GSTN,
    };
  });
  jsonExport(recordsForExport, (err, csv) => {
    downloadCSV(
      csv,
      `vacancyData_${new Date(Date.now()).toLocaleDateString()}`
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
  tablecss: {
    marginRight: "1rem",
  },
}));
export const VacancyData = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Vacancy Data"}
        actions={<ListActions />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        exporter={exporter}
      >
        <div className={classes.tablecss}>
          <Datagrid>
            <FunctionField
              label="Name of company"
              render={(record) => {
                return record?.employer_detail?.company_name;
              }}
            />
            ​
            <TextField label="Vacancy ID" source="id" />
            ​
            <FunctionField
              label="Sector of job"
              render={(record) => {
                return record?.sector_preference?.sector_preference_name;
              }}
            />
            <TextField label="job_role" source="job_role" />
            ​
            <FunctionField
              label="expected_salary"
              render={(record) => {
                return record?.expected_salary?.salary_range;
              }}
            />
            <TextField
              label="Number of candidates to recruit"
              source="number_of_candidates_required"
            />
            ​
            <FunctionField
              label="Minimum qualification requirement"
              render={(record) => {
                return record?.highest_level_qualification
                  ?.highest_level_qualification_name;
              }}
            />
            <FunctionField
              label="Are vacancies open for freshers?"
              render={(record) => {
                if (record && record.freshers_open_choice === 1) {
                  return "YES";
                } else {
                  return "NO";
                }
              }}
            />
            ​
            <FunctionField
              label="Minimum qualification requirement"
              render={(record) => {
                return record?.highest_level_qualification
                  ?.highest_level_qualification_name;
              }}
            />
            <FunctionField
              label="Minimum work experience required"
              render={(record) => {
                return record?.min_work_experience_requirement
                  ?.work_experience_choices;
              }}
            />
            ​
            <FunctionField
              label="Requirement of driving license"
              render={(record) => {
                return record?.driver_license?.driver_license_choice;
              }}
            />
            ​
            <FunctionField
              label="English speaking skills"
              render={(record) => {
                return record?.englishSpeakingRequiredByFreshersOpenChoice
                  ?.english_speaking_required_choices;
              }}
            />
            ​
            <FunctionField
              label="Computer operating skills"
              render={(record) => {
                return record
                  ?.englishSpeakingRequiredByIsComputerKnowledgeRequiredChoices
                  ?.english_speaking_required_choices;
              }}
            />
            ​
            <FunctionField
              label="Age criteria"
              render={(record) => {
                return record?.age_criteria_choice?.age_range_values;
              }}
            />
            ​
            <FunctionField
              label="Gender criteria"
              render={(record) => {
                return record?.gender?.gender_name;
              }}
            />
            ​
            <TextField
              label="Expected interview date"
              source="interview_date"
            />
          </Datagrid>
        </div>
      </List>
    </div>
  );
};
