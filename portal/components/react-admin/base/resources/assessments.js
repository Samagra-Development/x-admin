import React, { useState, useEffect } from "react";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  SelectInput,
  Filter,
  BooleanField,
} from "react-admin";
import { useSession } from "next-auth/client";
import { useMediaQuery } from "@material-ui/core";
import config from "@/components/config";
import axios from "axios";
import { useStyles } from "../styles"

const DevicesFilter = (props) => {
  const classes = useStyles();  
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
  const [session] = useSession();
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (session) {
      setRole(session.role);
    }
  }, []);
  return (
    <>
      {role === "Admin" ? (
        <List
          {...props}
          bulkActionButtons={false}
          title="Assessments list"
          className={isSmall ? classes.smList : classes.list}
          filters={<DevicesFilter />}
          exporter={false}
          filter={{ "id@_gte": 423 }}
          sort={{ field: "id", order: "DESC" }}
        >
          {isSmall ? (
            <SimpleList
              primaryText={(record) => record.id}
              secondaryText={(record) => record.is_enabled}
              tertiaryText={(record) => record.is_final}
              linkType="edit"
            />
          ) : (
            <Datagrid>
              <TextField label="ID" source="id" sortable={false} />
              <TextField
                label="Assessment type"
                source="assessment_type.name"
                sortable={false}
              />
              <TextField
                label="District"
                source="deadline.district"
                sortable={false}
              />
              <TextField label="Date" source="deadline.date" sortable={false} />
              <TextField
                label="Aggregation"
                source="submissionTypeBySubmissionTypeV2Id.aggregation"
                sortable={false}
              />
              <TextField
                label="Category"
                source="submissionTypeBySubmissionTypeV2Id.category"
                sortable={false}
              />
              <TextField
                label="Evaluation Params"
                source="evaluation_params"
                sortable={false}
              />
              <BooleanField label="Is Enabled" source="is_enabled" />
            </Datagrid>
          )}
        </List>
      ) : (
        <h2 className="text-center">Login with Admin Credentials</h2>
      )}
    </>
  );
};

export const AssessmentsCreate = (props) => {
  const [session] = useSession();
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (session) {
      setToken(session.jwt);
    }
  }, []);
  return (
    <>
      {props?.options?.formUrl && token && (
        <iframe
          src={`${process.env.NEXT_PUBLIC_ENKETO_EXPRESS}/preview?xform=${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/getForm/${props?.options?.formUrl}&token=${token}&id=-1`}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          width="100%"
          height="100%"
          title="Assessments Module"
        >
          Your browser does not support iframe. Visit the
          <a
            href={`${process.env.NEXT_PUBLIC_ENKETO_EXPRESS}/preview?xform=${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/getForm/${props?.options?.formUrl}&token=${token}&id=-1`}
          >
            Assessment Module
          </a>
        </iframe>
      )}
    </>
  );
};

export const AssessmentsEdit = (props) => {
  const [formUrl, setFormUrl] = useState(null);
  const [session] = useSession();
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (session) {
      setToken(session.jwt);
    }
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/getFormPrefilled/${props.id}`)
      .then((res) => setFormUrl(res))
      .catch((err) => {});    
  }, []);  
  return (
    <>
      {formUrl && token && (
        <iframe
          src={`${process.env.NEXT_PUBLIC_ENKETO_EXPRESS}/preview?xform=${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/getForm/${props.id}&token=${token}&id=${props.id}`}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          width="100%"
          height="100%"
          title="Assessments Module"
        >
          Your browser does not support iframe. Visit the
          <a
            href={`${process.env.NEXT_PUBLIC_ENKETO_EXPRESS}/preview?xform=${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/getForm/${props.id}&token=${token}&id=${props.id}`}
          >
            Assessment Module
          </a>
        </iframe>
      )}
    </>
  );
};
