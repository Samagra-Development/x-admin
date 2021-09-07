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
  SearchInput,
  ExportButton,
  downloadCSV,
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  console.log("Props:", props);
  return (
    <Filter {...props}>
      <SearchInput
        placeholder="Search by Name *"
        source="name"
        className="searchBar"
        alwaysOn
      />
    </Filter>
  );
};
const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    return {
      "Vacancy ID": record.vacancy_id,
      "Name of company": record.vacancy_detail.employer_detail.company_name,
      "Vacancy Sector":
        record.vacancy_detail.sector_preference.sector_preference_name,
      "Name of candidate": record.candidate_profile
        ? record.candidate_profile.name
        : "NULL",
      Interested: record.interested,
    };
  });
  jsonExport(recordsForExport, (err, csv) => {
    downloadCSV(
      csv,
      `intrestedCandidatesList_${new Date(Date.now()).toLocaleDateString()}`
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
}));
export const InterestedCandidateist = (props) => {
  console.log("Entered Recruiter");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Intrested Candidates"}
        actions={<CandidateActions />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        exporter={exporter}
      >
        <Datagrid>
          <TextField label="Vacancy ID" source="vacancy_id" />
          <TextField
            label="Name of company"
            source="vacancy_detail.employer_detail.company_name"
          />
          <TextField
            label="Vacancy Sector"
            source="vacancy_detail.sector_preference.sector_preference_name"
          />
          <TextField
            label="Name of candidate"
            source="candidate_profile.name"
          />
          <TextField label="Interested" source="interested" />
        </Datagrid>
      </List>
    </div>
  );
};
