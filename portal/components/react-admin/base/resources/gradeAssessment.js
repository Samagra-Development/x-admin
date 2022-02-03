import React from "react";
import {
  List,  
  SimpleList,
  Datagrid, 
  TextField,
  ReferenceField,
  DateField,
  SelectInput,
  SearchInput,
  ReferenceInput,
  AutocompleteInput,
  DateInput,
  Filter  
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";
import { useStyles } from "../styles"

// school renderer
const schoolRenderer = (choice) => {
  return choice ? `UDISE: ${choice.udise}, ${choice.name}` : "";
};

const SearchFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      placeholder="Search by School(UDISE)"
      source="school#udise"
      className="searchBar"
      alwaysOn
    /> 
    <SelectInput
      label="By Grade Number"
      source="grade_number"
      choices={[
        { id: "1", name: "1" },
        { id: "2", name: "2" },
        { id: "3", name: "3" },
        { id: "4", name: "4" },
        { id: "5", name: "5" },
        { id: "6", name: "6" },
        { id: "7", name: "7" },
        { id: "8", name: "8" },
        { id: "9", name: "9" },
        { id: "10", name: "10" },
        { id: "11", name: "11" },
        { id: "12", name: "12" },
      ]}
      className="filterInput"
    />
    <TextInput
      placeholder="Assessment Type"
      source="assessment#assessment_type#name"      
      className="filterInput"
      label="Assessment Type"
    />
  </Filter>
);

export const GradeAssessmentList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();
  // eslint-disable-next-line no-shadow  
  return (
    <List
      {...props}
      filters={<SearchFilter />}
      sort={{ field: "id", order: "DESC" }}
      className={isSmall ? classes.smList : classes.list}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) =>
            `Grade: ${record.grade_number}, Section: ${record.section}`
          }
          secondaryText={(record) => (
            <ReferenceField
              record={record}
              basePath="assessment"
              source="assessment_id"
              reference="assessment"
            >
              <TextField source="type" />
            </ReferenceField>
          )}
          tertiaryText={(record) => (
            <ReferenceField
              record={record}
              basePath="school"
              source="school_id"
              reference="school"
            >
              <TextField source="udise" />
            </ReferenceField>
          )}
          linkType="edit"
        />
      ) : (
        <Datagrid size="small">
          <TextField source="id" />          
          <TextField source="assessment.assessment_type.name" label="Type"/>         
          <TextField source="school.udise" label="School(UDISE)"/>
          <TextField source="section" />
          <TextField source="grade_number" />
          <TextField source="streams_id" label="Stream" />
          <DateField source="created" />
          <DateField source="updated" />          
        </Datagrid>
      )}
    </List>
  );
};
