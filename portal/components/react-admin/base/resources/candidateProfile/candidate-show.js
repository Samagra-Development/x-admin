import React from "react";
import {
  List,
  Datagrid,
  Pagination,
  TextField,
  DateField,
  FunctionField,
  TopToolbar,
  sanitizeListRestProps,
  UrlField,
  BooleanField,
  RichTextField,
  ArrayField,
  SingleFieldList,
  FileField,
  Show,
  Tab,
  TabbedShowLayout,
  SimpleShowLayout,
  Filter,
  SelectInput,
  SearchInput,
  ExportButton,
  AutocompleteInput,
  useQuery,
  downloadCSV,
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";

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

export const CandidateShow = (props) => {
  const CustomFileField = ({ record, ...props }) => {
    const url = generateResumeLink(record?.data?.[0]?.resume?.url);
    return (
      <div
        style={{
          margin: "15px 0",
          width: "fit-content",
          borderBottom: "1px dashed black",
        }}
      >
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Typography variant="body2">Resume</Typography>
          </a>
        ) : (
          <Typography variant="body2">No Resume uploaded</Typography>
        )}
      </div>
    );
  };
  return (
    <Show {...props} title="Candiate details">
      <TabbedShowLayout>
        <Tab label="Candidate Bio">
          <TextField label="Name" source="name" />
          <DateField label="DOB" source="DOB" />
          <FunctionField
            label="Age"
            render={(record) => {
              if (record) {
                return getAge({
                  start: record.DOB,
                  end: null,
                }).years;
              }
            }}
          />

          <TextField label="Gender" source="gender.gender_name" />
          <TextField label="Mobile" source="mobile_number" />
          <TextField label="Whatsapp" source="whatsapp_mobile_number" />
          <TextField label="Distict" source="district_name.name" />
          <TextField label="Pincode" source="pincode" />
        </Tab>
        <Tab label="Educational Details">
          <TextField
            label="Max Qualification"
            source="highest_level_qualification.highest_level_qualification_name"
          />
          <TextField
            label="Qualification"
            source="qualification_detail.qualification_name"
          />
          <TextField label="Marks" source="final_score_highest_qualification" />
        </Tab>
        <Tab label="Employment History">
          <TextField
            label="Are you currently employed?"
            source="current_employment.current_employment_status"
          />
          <TextField
            label="Have you ever been employed?"
            source="ever_employment.employment_status"
          />
          <FunctionField
            label="Role and Employer"
            render={(record) => {
              if (record) {
                console.log("Role:", record);
                if (record.current_employed_status === 1) {
                  return `${record.job_role}, ${record.employer_organization_name}`;
                } else return "N/A";
              }
            }}
          />

          <FunctionField
            label="Experience"
            render={(record) => {
              if (record && record.work_experience_details) {
                return `${record.work_experience_details.work_experience_choices}`;
              } else return "N/A";
            }}
          />
          <FunctionField
            label="Salary"
            render={(record) => {
              if (record) {
                if (record.current_employed_status === 1) {
                  return `₹${record.monthly_salary_details.salary_range}`;
                } else return "N/A";
              }
            }}
          />
        </Tab>
        <Tab label="Profile and Preferences">
          <TextField
            label="Driving License"
            source="driver_license.driver_license_choice"
          />
          <TextField
            label="Travel willingness"
            source="district_travel.district_travel_choice"
          />
          <TextField label="PAN CARD" source="pan_card.pan_card_choice" />
          <TextField
            label="English Speaking Competency"
            source="english_knowledge_choice.english_choice"
          />
          <TextField
            label="Computer Skills"
            source="computer_operator.computer_operator_choice"
          />

          <FunctionField
            label="Preferred Sectors"
            render={(record) => {
              if (record) {
                return `${
                  record.sector_preference_1.sector_preference_name || "None"
                }, ${
                  record.sector_preference_2.sector_preference_name || "None"
                }, ${
                  record.sector_preference_3.sector_preference_name || "None"
                }`;
              }
            }}
          />
          <FunctionField
            label="Skills"
            render={(record) => {
              if (record) {
                return `${record.skill_1 || "None"}, ${
                  record.skill_2 || "None"
                }, ${record.skill_3 || "None"}, ${record.skill_4 || "None"}`;
              }
            }}
          />
          <TextField
            label="Expected Salary"
            source="expected_salary.salary_range"
          />

          {/* <CustomFileField /> */}
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
