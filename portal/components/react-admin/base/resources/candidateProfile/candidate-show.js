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

export const CandidateShow = (props) => {
  const CustomFileField = ({ record, ...props }) => {
    const url = generateResumeLink(record?.resume?.url);
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
  const generateResumeLink = (url) => {
    return url?.replace(/\/(.*?)\:/g, `//${config.odkAggregateUrl}:`);
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
                return record?.highest_level_qualification?.highest_level_qualification_name;
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
                return `${
                  record.sector_preference_1?.sector_preference_name
                }, ${
                  record.sector_preference_2?.sector_preference_name 
                }, ${
                  record.sector_preference_3?.sector_preference_name
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
