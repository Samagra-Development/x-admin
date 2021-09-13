import React from "react";
import {
  List,
  Datagrid,
  Pagination,
  TopToolbar,
  TextField,
  sanitizeListRestProps,
  Filter,
  ExportButton,
  downloadCSV,
  ListActions,
  ReferenceInput,
  SelectInput,
  FunctionField
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";
import jsonExport from "jsonexport/dist";

const SearchFilter = (props) => {
  return (
    <Filter {...props}>
      <ReferenceInput
        label="Vacancy ID"
        source="vacancy_id"
        reference="candidate_vacancy_interest"
      >
        <SelectInput optionText="vacancy_id" optionValue="vacancy_id" />
      </ReferenceInput>
    </Filter>
  );
};
const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    return {
      "Vacancy ID": record.vacancy_id,
      "Name of company": record.vacancy_detail?.employer_detail?.company_name,
      "Vacancy Sector":
        record.vacancy_detail?.sector_preference?.sector_preference_name,
      "Name of candidate": record.candidate_profile?.name,
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Intrested Candidates"}
        actions={<ListActions />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
        exporter={exporter}
      >
        <Datagrid>
          <TextField label="Vacancy ID" source="vacancy_id" />
          <FunctionField
            label="Name of company"
            render={(record) => {
              return record?.vacancy_detail?.employer_detail?.company_name;
            }}
          />
          ​
          <FunctionField
            label="Vacancy Sector"
            render={(record) => {
              return record?.vacancy_detail?.sector_preference
                ?.sector_preference_name;
            }}
          />
          <FunctionField
            label="Name of candidate"
            render={(record) => {
              return record?.candidate_profile?.name;
            }}
          />
          ​
          <TextField label="Interested" source="interested" />
        </Datagrid>
      </List>
    </div>
  );
};
