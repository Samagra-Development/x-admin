import {
  FunctionField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";

import React from "react";
import ViewIcon from "@material-ui/icons/Visibility";

export const VacancyDataShow = (props) => {
  const ViewInterested = (props) => {
    const { source, label } = props;
    const record = useRecordContext(props);
    const url =
      `${process.env.NEXT_PUBLIC_URL}/admin#/candidate_vacancy_interest?filter=` +
      encodeURIComponent(`{"vacancy_id":"${record.id}"}`);
    return (
      <div>
        View Interested Candidate list
        <div>
          <a href={url} rel="noopener noreferrer">
            <ViewIcon />
          </a>
        </div>
      </div>
    );
  };

  const CallRecruiter = (props) => {
    const record = useRecordContext(props);

    const number = record.employer_detail?.mobile_number;
    return (
      <div>
        <a href={`tel:${number}`} rel="noopener noreferrer">
          {number}
        </a>
      </div>
    );
  };

  return (
    <Show {...props} title="Vacancy details">
      <TabbedShowLayout style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        <Tab label="Vacancy Details">
          <TextField label="Job Role" source="job_role" />

          <FunctionField
            label="Sector of job"
            render={(record) => {
              return record?.sector_preference?.sector_preference_name;
            }}
          />
          <FunctionField
            width="120%"
            label="Expected Salary"
            render={(record) => {
              return record?.expected_salary?.salary_range;
            }}
          />
          <FunctionField
            label="Work Experience"
            render={(record) => {
              return record?.min_work_experience_requirement
                ?.work_experience_choices;
            }}
          />
          <FunctionField
            label="Minimum qualification requirement"
            render={(record) => {
              return record?.highest_level_qualification
                ?.highest_level_qualification_name;
            }}
          />
          <TextField
            label="Number of candidates to recruit"
            source="number_of_candidates_required"
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
        </Tab>
        <Tab label="General requirements">
          <FunctionField
            label="Requirement of driving license"
            render={(record) => {
              return record?.driver_license?.driver_license_choice;
            }}
          />

          <FunctionField
            label="English speaking skills"
            render={(record) => {
              return record?.englishSpeakingRequiredByFreshersOpenChoice
                ?.english_speaking_required_choices;
            }}
          />

          <FunctionField
            label="Computer operating skills"
            render={(record) => {
              return record
                ?.englishSpeakingRequiredByIsComputerKnowledgeRequiredChoices
                ?.english_speaking_required_choices;
            }}
          />

          <FunctionField
            label="Age criteria"
            render={(record) => {
              return record?.age_criteria_choice?.age_range_values;
            }}
          />

          <FunctionField
            label="Gender criteria"
            render={(record) => {
              return record?.gender?.gender_name;
            }}
          />
          <CallRecruiter label="Recruiter Mobile Number" source="id" />
          <ViewInterested
            label="Vacancy Interest"
            source="id"
            sortable={false}
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
