import {
  BooleanField,
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
import { Input, makeStyles } from "@material-ui/core";

import React from "react";
import { cloneElement } from "react";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  return (
    <div>
      <Filter {...props}>
        <SearchInput placeholder="Name" source="name" alwaysOn />
        <TextInput label="Age" source="age" />
        <TextInput label="Whatsapp" source="whatsapp_mobile_number" />
        <TextInput label="Pincode" source="pincode" />
        <TextInput label="District" source="district_name#name@_ilike" />
        <TextInput label="Gender" source="gender#gender_name@_ilike" />
        <TextInput
          label="Work Experience"
          source="work_experience_details#work_experience_choices@_like"
        />
        <TextInput
          label="Driving Licence"
          source="driver_license#driver_license_choice@_like"
        />
        <TextInput
          width="50%"
          label="Expected Salary"
          source="expected_salary#salary_range@_ilike"
        />
        <TextInput
          label="English Speaking Skills"
          source="english_knowledge_choice#english_choice@_like"
        />
        <TextInput
          label="Computer Operation Skills"
          source="computer_operator#computer_operator_choice@_like"
        />
        <TextInput
          label="Sector 1"
          source="sector_preference_1#sector_preference_name@_like"
        />
        <TextInput
          label="Sector 2"
          source="sector_preference_2#sector_preference_name@_like"
        />
        <TextInput
          label="Sector 3"
          source="sector_preference_3#sector_preference_name@_like"
        />
        <TextInput
          label="Qualification"
          source="qualification_detail#qualification_name@_ilike"
        />
        <TextInput
          label="Max Qualification"
          source="highest_level_qualification#highest_level_qualification_name@_ilike"
        />
      </Filter>
    </div>
  );
};

const exporter = (records) => {
  const recordsForExport = records.map((record) => {
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
      Age: record.age,
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
  headerCell: {
    color: "black",
  },
}));

export const CandidateList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Candidate Data"}
        actions={<ListActions maxResults="100000" />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={
          <Pagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            perPage={1}
            style={{ float: "left", color: "black" }}
          />
        }
      >
        <div className={classes.tablecss}>
          <Datagrid rowClick="show" classes={classes}>
            <TextField label="Name" source="name" />
            <TextField label="Age" source="age" />

            <TextField label="DOB" source="DOB" />
            <FunctionField
              label="Gender"
              render={(record) => {
                return record?.gender?.gender_name;
              }}
            />
            <TextField label="Whatsapp" source="whatsapp_mobile_number" />
            <TextField
              label="Work Experience"
              source="work_experience_details.work_experience_choices"
            />
            <FunctionField
              label="Expected Salary"
              render={(record) => record.expected_salary.salary_range.replaceAll("Rs ", "")}
            />
            <FunctionField source="driver_license.driver_license_choice" label="DL" render={(record, source) =>
              <BooleanField record={{ ...record, "driver_license.driver_license_choice": record.driver_license.driver_license_choice === "Yes" }} source={source} />} />

            <FunctionField source="english_knowledge_choice.english_choice" label="English" render={(record, source) =>
              <BooleanField record={{ ...record, "english_knowledge_choice.english_choice": record.english_knowledge_choice.english_choice === "Yes" }} source={source} />} />

            <FunctionField source="computer_operator.computer_operator_choice" label="Computer" render={(record, source) =>
              <BooleanField record={{ ...record, "computer_operator.computer_operator_choice": record.computer_operator.computer_operator_choice === "Yes" }} source={source} />} />

            <FunctionField
              label="District"
              render={(record) => {
                return record?.district_name?.name;
              }}
            />
            <TextField label="PinCode" source="pincode" />
            <TextField
              label="Sector 1"
              source="sector_preference_1.sector_preference_name"
            />
            <TextField
              label="Sector 2"
              source="sector_preference_2.sector_preference_name"
            />

            <FunctionField
              label="Max Qualification"
              render={(record) => {
                return record?.highest_level_qualification
                  ?.highest_level_qualification_name;
              }}
            />
            <FunctionField
              label="Qualification"
              width="120%"
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
