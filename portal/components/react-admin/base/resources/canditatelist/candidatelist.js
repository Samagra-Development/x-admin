import {
  Datagrid,
  ExportButton,
  Filter,
  FunctionField,
  List,
  Pagination,
  SearchInput,
  TextInput,
  TopToolbar,
  downloadCSV,
  sanitizeListRestProps,
  useListContext,
  useRecordContext,
} from "react-admin";
import { Typography, makeStyles, useMediaQuery } from "@material-ui/core";

import MoreIcon from "@material-ui/icons/More";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import React from "react";
import ViewIcon from "@material-ui/icons/Visibility";
import { cloneElement } from "react";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  return (
    <Filter {...props}>
      <SearchInput placeholder="Vacancy ID" source="vacancy_id" alwaysOn />
      <TextInput
        label="District"
        source="candidate_profile#district_name#name@_ilike"
      />
      <TextInput
        label="Job Sector"
        source="vacancy_detail#sector_preference#sector_preference_name@_ilike"
      />
      <TextInput label="Job Role" source="vacancy_detail#job_role@_ilike" />
      <TextInput
        label="Company Name"
        source="vacancy_detail#employer_detail#company_name@_ilike"
      />
      <TextInput
        label="Candidate Mobile Number"
        source="candidate_profile#mobile_number@_ilike"
      />
      <TextInput
        label="Candidate Name"
        source="candidate_profile#name@_ilike"
      />
      <TextInput
        label="Recruiter Mobile Number"
        source="vacancy_detail#employer_detail#mobile_number@_ilike"
      />
    </Filter>
  );
};

const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    return {
      Name: record.candidate_profile?.name,
      District: record.candidate_profile?.district_name?.name,
      "Contact Number": record.candidate_profile?.mobile_number,
      Gender: record.candidate_profile?.gender?.gender_name,
      Age: record.candidate_profile?.age,
      "Highest qualification":
        record.candidate_profile?.highest_level_qualification
          ?.highest_level_qualification_name,
      "Work Experience ":
        record.candidate_profile?.work_experience_details
          ?.work_experience_choices,
      "Proficiency in English ":
        record.candidate_profile?.english_knowledge_choice?.english_choice,
      "Proficiency in computer operation":
        record.candidate_profile?.computer_operator?.computer_operator_choice,
      "Driving License ":
        record.candidate_profile?.driver_license?.driver_license_choice,
      "Resume/CV": record.candidate_profile?.resume_url,
    };
  });
  jsonExport(recordsForExport, (err, csv) => {
    downloadCSV(
      csv,
      `intrestedCandidatesList_${new Date(Date.now()).toLocaleDateString()}`
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
  headerCell: {
    color: "black",
  },
}));
export const InterestedCandidateist = (props) => {
  const classes = useStyles();

  const ShowCandidate = (props) => {
    const record = useRecordContext(props);

    const url = `${process.env.NEXT_PUBLIC_URL}/admin#/candidate_profile/${record.candidate_profile.id}`;
    return (
      <div style={{ textAlign: "center" }}>
        <a href={url} rel="noopener">
          <ViewIcon />
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
        <div style={{ textAlign: "center" }}>
          <a href={record.candidate_profile?.resume_url} rel="noopener" >
            <PictureAsPdfIcon />
          </a>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <h5>No Resume</h5>
        </div>
      );
    }
  };

  const MoreDetails = () => {
    const record = useRecordContext(props);
    const url = `${process.env.NEXT_PUBLIC_URL}/admin#/candidate_vacancy_interest/${record.id}/show`;
    return (
      <div style={{ textAlign: "center" }}>
        <a href={url} rel="noopener">
          <MoreIcon />
        </a>
      </div>
    );
  };

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Interested Candidates"}
        actions={<ListActions maxResults={100000} />}
        bulkActionButtons={false}
        filter={{ interested: true }}
        filters={<SearchFilter />}
        pagination={
          <Pagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            perPage={1}
            style={{ float: "left" }}
          />
        }
      >
        <div className={classes.tablecss}>
          {isSmall ? (
            <Datagrid classes={classes}>
              <FunctionField
                label="Name of candidate"
                render={(record) => {
                  return record?.candidate_profile?.name;
                }}
              />
              <CallCandidate label="Candidate Mobile Number" source="id" />

              <FunctionField
                label="Job Role"
                render={(record) => {
                  return record?.vacancy_detail?.job_role;
                }}
              />
              <MoreDetails
                label="Candidate Details"
                source="id"
                sortable={false}
              />
            </Datagrid>
          ) : (
            <Datagrid classes={classes}>
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
            </Datagrid>
          )}
        </div>
      </List>
    </div>
  );
};
