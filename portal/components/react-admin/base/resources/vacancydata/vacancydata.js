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
  SearchInput,
  TextInput,
  useRecordContext,
  useListContext,
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";
import jsonExport from "jsonexport/dist";
import { cloneElement } from "react";

const SearchFilter = (props) => {
  return (
    <Filter {...props}>
      <SearchInput placeholder="Vacancy ID" source="id" alwaysOn />
      <TextInput
        label="Company Name"
        source="employer_detail#company_name@_ilike"
      />
      <TextInput
        label="Sector Of Job"
        source="sector_preference#sector_preference_name@_ilike"
      />
      <TextInput label="Job Role" source="job_role" />
      <TextInput
        label="Expected Salary"
        source="expected_salary#salary_range@_ilike"
      />
      <TextInput
        label="No Of Candidates To Recruit"
        source="number_of_candidates_required"
      />
      <TextInput
        label="Qualification"
        source="highest_level_qualification#highest_level_qualification_name@_ilike"
      />
      <TextInput
        label="Minimum Work Experience Required"
        source="min_work_experience_requirement#work_experience_choices@_ilike"
      />
      <TextInput
        label="Driving Licence"
        source="driver_license#driver_license_choice@_like"
      />
      <TextInput
        label="English Speaking Skills"
        source="englishSpeakingRequiredByFreshersOpenChoice#english_speaking_required_choices@_like"
      />
      <TextInput
        label="Computer operating skills"
        source="englishSpeakingRequiredByIsComputerKnowledgeRequiredChoices#english_speaking_required_choices@_like"
      />
      <TextInput
        label="Age"
        source="age_criteria_choice#age_range_values@_ilike"
      />
      <TextInput label="Gender" source="gender#gender_name@_ilike" />
      {/* <TextInput label="Freshers" source="freshers_open_choice"/> */}
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

  const ViewIntrested = (props) => {
    // console.log("Props:", props);
    const { source, label } = props;
    const record = useRecordContext(props);
    const url =
      `${process.env.NEXT_PUBLIC_URL}/admin#/candidate_vacancy_interest?filter=` +
      encodeURIComponent(`{"vacancy_id":"${record.id}"}`);
    return (
      <div>
        <a href={url} rel="noopener noreferrer">
          View
        </a>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Vacancy Data"}
        actions={<ListActions maxResults={100000} />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        // exporter={exporter}
      >
        <div className={classes.tablecss}>
          <Datagrid>
            <FunctionField
              label="Company Name"
              render={(record) => {
                return record?.employer_detail?.company_name;
              }}
            />
            ​
            <TextField label="Vacancy ID" source="id" />
            <FunctionField
              label="Sector of job"
              render={(record) => {
                return record?.sector_preference?.sector_preference_name;
              }}
            />
            <TextField label="Job Role" source="job_role" />
            ​
            <FunctionField
              label="Expected Salary"
              render={(record) => {
                return record?.expected_salary?.salary_range;
              }}
            />
            <TextField
              label="Driving Licence"
              source="driver_license.driver_license_choice"
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
            <ViewIntrested
              label="Vacancy Interest"
              source="id"
              sortable={false}
            />
          </Datagrid>
        </div>
      </List>
    </div>
  );
};
