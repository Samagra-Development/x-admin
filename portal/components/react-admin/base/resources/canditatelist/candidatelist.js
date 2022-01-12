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
  SearchInput,
  TextInput,
  FunctionField,
  useListContext,
} from "react-admin";
import { makeStyles, Typography } from "@material-ui/core";
import jsonExport from "jsonexport/dist";
import { cloneElement } from "react";

const SearchFilter = (props) => {
  return (
    <Filter {...props}>
      <SearchInput placeholder="Vacancy ID" source="vacancy_id" alwaysOn />
    </Filter>
  );
};

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

const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    let age = getAge({  
      start: record.candidate_profile?.DOB,
      end: null,
    }).years;
    return {
      "Name" : record.candidate_profile?.name,
      "District":record.candidate_profile?.district_name?.name,
      "Contact Number":record.candidate_profile?.mobile_number,
      "Gender" : record.candidate_profile?.gender?.gender_name,
      "Age":age,
      "Highest qualification" : record.candidate_profile?. highest_level_qualification?.highest_level_qualification_name,
      "Work Experience ": record.candidate_profile?.work_experience_details?. work_experience_choices,
      "Proficiency in English ": record.candidate_profile?.english_knowledge_choice?. english_choice,
      "Proficiency in computer operation": record.candidate_profile?.computer_operator?.computer_operator_choice,
      "Driving License ": record.candidate_profile?.driver_license?.driver_license_choice,
      "Resume/CV":record.candidate_profile?.resume_url,
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
}));
export const InterestedCandidateist = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        {...props}
        title={"Interested Candidates"}
        actions={<ListActions maxResults={100000} />}
        bulkActionButtons={false}
        filters={<SearchFilter />}
        pagination={<Pagination perPage={1} style={{ float: "left" }} />}
      >
        <div className={classes.tablecss}>
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
          </Datagrid>
        </div>
      </List>
    </div>
  );
};
