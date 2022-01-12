import React from "react";
import {
  TextField,
  FunctionField,
  Show,
  Tab,
  TabbedShowLayout,
  useRecordContext,
} from "react-admin";
import { makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ViewIcon from "@material-ui/icons/Visibility";

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
  headerCell: {
    color: "black",
  },
}));

export const CandidateInterestShow = (props) => {
  const classes = useStyles();
  const ShowCandidate = (props) => {
    const record = useRecordContext(props);

    const url = `${process.env.NEXT_PUBLIC_URL}/admin#/candidate_profile/${record.candidate_profile.id}`;
    return (
      <div>
        <a href={url} rel="noopener">
          Candidate: <ViewIcon />
        </a>
      </div>
    );
  };

  const CallCandidate = (props) => {
    const record = useRecordContext(props);

    const number = record.candidate_profile.mobile_number;
    return (
      <div>
        <a href={`tel:${number}`} rel="noopener noreferrer">
          {number}
        </a>
      </div>
    );
  };

  const CallRecruiter = (props) => {
    const record = useRecordContext(props);

    const number = record.vacancy_detail?.employer_detail?.mobile_number;
    return (
      <div>
        <a href={`tel:${number}`} rel="noopener noreferrer">
          {number}
        </a>
      </div>
    );
  };

  const CV = (props) => {
    const record = useRecordContext(props);

    const cv = record.candidate_profile?.resume_url;

    if (cv && cv.startsWith("http://cdn.samagra.io")) {
      return (
        <div>
          <a href={`${record.candidate_profile?.resume_url}`} target="_blank">
            CV <PictureAsPdfIcon />
          </a>
        </div>
      );
    } else {
      return (
        <div>
          CV : <p>No Resume</p>
        </div>
      );
    }
  };

  return (
    <Show {...props} title="Vacancy details">
      <TabbedShowLayout style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        <Tab label="Vacancy Details">
          <FunctionField
            label="Name of candidate"
            render={(record) => {
              return record?.candidate_profile?.name;
            }}
          />
          <CallCandidate label="Candidate Mobile Number" source="id" />
          <FunctionField
            label="District Name"
            render={(record) => {
              return record?.candidate_profile?.district_name?.name;
            }}
          />

          <FunctionField
            label="Company Name"
            render={(record) => {
              return record?.vacancy_detail?.employer_detail?.company_name;
            }}
          />

          <FunctionField
            label="Vacancy Sector"
            render={(record) => {
              return record?.vacancy_detail?.sector_preference
                ?.sector_preference_name;
            }}
          />

          <FunctionField
            label="Job Role"
            render={(record) => {
              return record?.vacancy_detail?.job_role;
            }}
          />
          <CallRecruiter label="Recruiter Mobile Number" source="id" />
          <FunctionField
            label="Expected Salary"
            render={(record) => {
              return record?.vacancy_detail?.expected_salary?.salary_range;
            }}
          />

          <CV label="CV" source="id" />
          <ShowCandidate
            label="Candidate Details"
            source="id"
            style={{ alignItems: "center", color: "red" }}
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
