import React from "react";
import {
  TextField,
  DateField,
  FunctionField,
  Show,
  Tab,
  TabbedShowLayout,
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";

export const CandidateShow = (props) => {
  const CustomFileField = ({ record, ...props }) => {
    return (
      <div
        style={{
          margin: "15px 0",
          width: "fit-content",
          borderBottom: "1px dashed black",
        }}
      >
        {record.resume_url ? (
          <a href={record.resume_url} target="_blank" rel="noopener noreferrer">
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
      <TabbedShowLayout style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        <Tab label="Candidate Bio">
          <TextField label="Name" source="name" />
          <DateField label="DOB" source="DOB" />
          <TextField label="Age" source="age" />
          <FunctionField
            label="Gender"
            render={(record) => {
              return record?.gender?.gender_name;
            }}
          />
          <TextField label="Mobile" source="mobile_number" />
          <TextField label="Whatsapp" source="whatsapp_mobile_number" />
          <FunctionField
            label="District"
            render={(record) => {
              return record?.district_name?.name;
            }}
          />
          <TextField label="Pincode" source="pincode" />
        </Tab>
        <Tab label="Educational Details">
          <FunctionField
            label="Max Qualification"
            render={(record) => {
              return record?.highest_level_qualification
                ?.highest_level_qualification_name;
            }}
          />
          <FunctionField
            label="Qualification"
            render={(record) => {
              return record?.qualification_detail?.qualification_name;
            }}
          />
          <TextField label="Marks" source="final_score_highest_qualification" />
        </Tab>
        <Tab label="Employment History">
          <FunctionField
            label="Are you currently employed?"
            render={(record) => {
              return record?.current_employment?.current_employment_status;
            }}
          />

          <FunctionField
            label="Have you ever been employed?"
            render={(record) => {
              return record?.ever_employment?.employment_status;
            }}
          />
          <FunctionField
            label="Role and Employer"
            render={(record) => {
              if (record) {
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
          <FunctionField
            label="Driving License"
            render={(record) => {
              return record.driver_license.driver_license_choice;
            }}
          />
          <FunctionField
            label="Travel willingness"
            render={(record) => {
              return record?.district_travel?.district_travel_choice;
            }}
          />
          <FunctionField
            label="PAN CARD"
            render={(record) => {
              return record?.pan_card?.pan_card_choice;
            }}
          />

          <FunctionField
            label="English Speaking Competency"
            render={(record) => {
              return record?.english_knowledge_choice?.english_choice;
            }}
          />

          <FunctionField
            label="Computer Skills"
            render={(record) => {
              return record?.computer_operator?.computer_operator_choice;
            }}
          />
          <FunctionField
            label="Preferred Sectors"
            render={(record) => {
              if (record) {
                return `${record.sector_preference_1?.sector_preference_name}, ${record.sector_preference_2?.sector_preference_name}, ${record.sector_preference_3?.sector_preference_name}`;
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

          <FunctionField
            label="Expected Salary"
            render={(record) => {
              return record?.expected_salary?.salary_range;
            }}
          />

          <CustomFileField />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
