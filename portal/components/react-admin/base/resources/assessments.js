import React from "react";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  SelectInput,
  Filter,
  BooleanField,
} from "react-admin";

import { makeStyles, useMediaQuery } from "@material-ui/core";
import config from "@/components/config";

const useStyles = makeStyles((theme) => ({
  smList: {
    margin: "1rem 4rem",
    "& > div": {
      paddingLeft: 0,
      backgroundColor: "unset",
      "&:first-child > div": {
        backgroundColor: "unset",
      },
      "&:last-child > div": {
        backgroundColor: "#FFF",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      },
    },
  },
  filter: {
    paddingLeft: 0,
  },
  filterSelect: {
    width: "15vw",
    alignSelf: "center",
    "& > label": {
      opacity: "0.7",
      fontSize: "1rem",
    },
    "& > div": {
      transform: "translate(0 5px)",
    },
    " .MuiInputLabel-shrink": {
      transform: "translate(12px, 7px) scale(0.75)",
    },
    "& > div > div": {
      paddingTop: "15px",
      paddingBottom: "5px",
    },
  },
}));

const DevicesFilter = (props) => {
  const classes = useStyles();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Filter {...props} className={classes.filter}>
      <SelectInput
        label="Is Enabled"
        source="is_enabled"
        className={classes.filterSelect}
        choices={config.isEnabled}
      />
    </Filter>
  );
};


export const AssessmentsList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title="Employees list"
      className={isSmall ? classes.smList : classes.list}
      filters={<DevicesFilter  />}
      exporter={false}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.id }
          secondaryText={(record) => record.is_enabled}
          tertiaryText={(record) => record.is_final}
          linkType="edit"
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField label="ID" source="id" sortable={false} />
          <TextField label="Assessment type" source="type" sortable={false} />
          <TextField label="Submission type" source="submission_type" sortable={false} />
          <BooleanField label="Is Enabled" source="is_enabled" />
          <TextField label="Final" source="is_final" />
        </Datagrid>
      )}
    </List>
  );
};

export const AssessmentsCreate = (props) => {
  return (
    <>
      {props?.options?.formUrl && (
        <iframe
          src={`${process.env.NEXT_PUBLIC_ENKETO_EXPRESS}/preview?xform=${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/${props?.options?.formUrl}`}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          width="100%"
          height="100%"
          title="Assessments Module"
        >
          Your browser does not support iframe. Visit the
          <a
            href={`${process.env.NEXT_PUBLIC_ENKETO_EXPRESS}/preview?xform=${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/${props?.options?.formUrl}`}
          >
            Assessment Module
          </a>
        </iframe>
      )}
    </>
  );
};
