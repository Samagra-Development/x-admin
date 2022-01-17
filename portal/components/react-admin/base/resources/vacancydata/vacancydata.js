import {
  BooleanField,
  BooleanInput,
  Datagrid,
  EditButton,
  ExportButton,
  Filter,
  FunctionField,
  List,
  Pagination,
  ReferenceField,
  SearchInput,
  TextField,
  TextInput,
  TopToolbar,
  downloadCSV,
  sanitizeListRestProps,
  useListContext,
  useMutation,
  useRecordContext,
} from "react-admin";
import { Route, Switch } from "react-router";
import { Typography, makeStyles, useMediaQuery } from "@material-ui/core";

import { Drawer } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/More";
import React from "react";
import SwitchButton from "@material-ui/core/Switch";
import TagEdit from "./TagEdit";
import ViewIcon from "@material-ui/icons/Visibility";
import { cloneElement } from "react";
import jsonExport from "jsonexport/dist";

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
        label="District"
        source="employer_detail#district_name#name@_ilike"
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
      TimeStamp: record.created_at,
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
    marginTop: theme.spacing(3),
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

export const VacancyData = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const ViewInterested = (props) => {
    const { source, label } = props;
    const record = useRecordContext(props);
    const url =
      `${process.env.NEXT_PUBLIC_URL}/admin#/candidate_vacancy_interest?filter=` +
      encodeURIComponent(`{"vacancy_id":"${record.id}"}`);
    return (
      <div style={{ textAlign: "center" }}>
        <a href={url} rel="noopener noreferrer">
          <ViewIcon />
        </a>
      </div>
    );
  };

  const IS_Live = (props) => {
    const record = useRecordContext(props);
    let live = record.is_live ? "Open" : "Close";
    return <div style={{ textAlign: "center" }}>{live}</div>;
  };

  const MoreDetails = () => {
    const record = useRecordContext(props);
    const url = `${process.env.NEXT_PUBLIC_URL}/admin#/vacancy_details/${record.id}/show`;
    return (
      <div style={{ textAlign: "center" }}>
        <a href={url} rel="noopener">
          <MoreIcon />
        </a>
      </div>
    );
  };

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleClose = () => {
    setChecked(props.is_live);
    <Route path="/admin#/vacancy_details"></Route>;
  };

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Vacancy Data"}
        actions={<ListActions maxResults={100000} />}
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
          {isSmall ? (
            <Datagrid rowClick="show">
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
              <MoreDetails
                label="Vacancy Details"
                source="id"
                sortable={false}
              />
            </Datagrid>
          ) : (
            <Datagrid classes={classes}>
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
              <TextField
                label="Number of candidates to recruit"
                source="number_of_candidates_required"
              />

              <FunctionField
                label="Minimum qualification requirement"
                render={(record) => {
                  return record?.highest_level_qualification
                    ?.highest_level_qualification_name;
                }}
              />

              <FunctionField
                label="Work Experience"
                render={(record) => {
                  return record?.min_work_experience_requirement
                    ?.work_experience_choices;
                }}
              />
              {/* ​<EditButton />
              <TextField source="is_live"/> */}
              <IS_Live label="Is_Live" source="id" sortable={false} />
              <EditButton label="" />
              <ViewInterested
                label="Vacancy Interest"
                source="id"
                sortable={false}
              />
              <MoreDetails
                label="Vacancy Details"
                source="id"
                sortable={false}
              />
            </Datagrid>
          )}
        </div>
      </List>
      <Route path="/vacancy_details/:id">
        {({ match }) => {
          const isMatch = match && match.params && match.params.id !== "create";

          return (
            <Drawer open={isMatch} anchor="right" onClose={handleClose}>
              {isMatch ? (
                <TagEdit
                  className={classes.drawerContent}
                  id={isMatch ? match.params.id : null}
                  onCancel={handleClose}
                  {...props}
                />
              ) : (
                <div className={classes.drawerContent} />
              )}
            </Drawer>
          );
        }}
      </Route>
    </div>
  );
};
